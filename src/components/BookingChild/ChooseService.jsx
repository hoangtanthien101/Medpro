import BoxCustom from '../Box/Box';
import { Button, Popover } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import CustomTable from '../CustomTable/CustomTable';
import ButonBooking from '../Button/ButonBooking';
import { Modal } from 'antd';
import { useState } from 'react';


function createData(stt, id, name, detail) {
    return {
        stt,
        id,
        name,
        detail,
    };
}

const rows = [
    createData(1, 1, 'Khám trong giờ', 'Khung giờ khám từ 7h30p – 16h, từ thứ Hai đến thứ Bảy. '),
    createData(2, 2, 'Khám ngoài giờ', 'Khung giờ khám từ 16h – 18h30, từ thứ Hai đến thứ Bảy. '),
    createData(3, 3, 'Khám online', 'Khách hàng/ người bệnh sẽ được khám, trao đổi trực tiếp với bác sĩ giống như hình thức khám bệnh trực tiếp thông thường, thông qua một nền tảng/ ứng dụng/ phần mềm liên lạc trực tuyến. “Khám bệnh online” 1:1 có thể bao gồm khai thác bệnh sử, tư vấn khám chữa bệnh, chỉ định cận lâm sàng, kê toa thuốc (có điều kiện kèm theo), hướng dẫn các phương pháp đơn giản mà người bệnh có thể tự thực hiện để hỗ trợ điều trị và chăm sóc sức khoẻ. ')
];


const ChooseService = props => {
    const { goBack, data, onChangeService } = props
    const [openDetail, setOpenDetail] = useState();

    function handleChangService(id) {
        onChangeService(id)
    }
    const headCells = [
        {
            id: 'stt',
            numeric: false,
            disablePadding: false,
            label: '#',
            width: 20,
            fontWeight: 'bold',
            align: 'left',
            component: (data, index) => {
                return (
                    <div >{index}</div>
                )
            }
        },
        {
            id: 'name',
            width: 160,
            align: 'left',
            disablePadding: false,
            label: 'Tên dịch vụ',
        },
        // {
        //     id: 'cost',
        //     align: 'right',
        //     numeric: true,
        //     disablePadding: false,
        //     money: true,
        //     label: 'Giá tiền',
        //     component: (data) => {
        //         return (
        //             <div>{convertStringToNumber(data?.cost)}</div>
        //         )
        //     }
        // },
        {
            id: 'detail',
            width: 120,
            align: 'right',
            disablePadding: false,
            label: 'Thông tin',
            component: (data) => {
                return (
                    <>
                        <Button onClick={() => setOpenDetail(data.detail)} style={{ border: '1px solid #1fb6ff', fontWeight: 'bold', borderRadius: 12, padding: '4px 10px' }}>
                            Chi tiết
                        </Button>
                        <Modal
                            title={<span className='text-2xl  font-bold text-blue'>Thông tin dịch vụ</span>}
                            open={openDetail != null}
                            width={600}
                            onCancel={() => {
                                setOpenDetail(null)
                            }}
                            footer=""
                        >
                            <div>
                                {openDetail}
                            </div>
                        </Modal>
                    </>

                )
            }
        },
        {
            id: 'book',
            numeric: true,
            align: 'right',
            disablePadding: false,
            width: 120,
            label: '',
            component: (data) => {
                return (
                    <ButonBooking size='small' borderRadius={8} onClick={() => handleChangService(data?.id)}> Đặt khám ngay</ButonBooking>
                )
            }
        },
    ];

    return (
        <div className="flex flex-col w-full bg-blue3 justify-center items-center ">
            <div className=" py-24 w-[60%] md:gap-4 md:flex-col lg:flex lg:flex-row justify-start items-start lg:gap-5">
                <div className='lg:w-[300px] md:w-full '>
                    <BoxCustom
                        title={<span className="text-xl">
                            Thông tin cơ sở y tế
                        </span>}
                        description={
                            <div className='flex flex-col gap-2'>
                                <span className="text-[#111] font-bold" >
                                    {data?.Branch?.name}
                                </span>
                                <span className="leading-4 text-sm" >
                                    {data?.Branch?.address}
                                </span>
                            </div>
                        }
                    />
                </div>

                <div className='w-full mt-4 lg:mt-0 flex flex-col gap-3 lg:w-full'>
                    <BoxCustom
                        title={<span className="text-xl">
                            Vui lòng chọn dịch vụ
                        </span>}
                        description={
                            <div className='flex flex-col gap-2 w-full pt-3'>
                                {/* <InputSearch
                                    className="border rounded-md border-gray-light w-full "
                                    placeholder='Tìm kiếm chuyên khoa'
                                /> */}
                                <CustomTable headCells={headCells} rows={rows} handleClickRow={() => { }} />
                                <Button
                                    startIcon={<ArrowBackIosNewIcon />}
                                    onClick={goBack}
                                    className='w-28'>Quay lại</Button>

                            </div>
                        }
                    />
                </div>
            </div>
        </div>
    );
};

export default ChooseService;