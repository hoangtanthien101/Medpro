import Box from '../../Box/Box';
import { useNavigate } from 'react-router-dom';
import { EditOutlined, DeleteOutlined, InfoOutlined } from '@ant-design/icons';
import DescriptionProfile from '../../Description/DescriptionProfile/DescriptionProfile';
import { useContext, useEffect, useState } from 'react';
import { forwardRef } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { Button } from '@mui/material';
import { Modal, Avatar } from 'antd';
import DetailItem from '../../DetailItem/DetailItem';
import IC1 from '../../../assets/icon/ic-avatar.svg'
import IC2 from '../../../assets/icon/ic-born.svg'
import IC3 from '../../../assets/icon/ic-contact.svg'
import IC4 from '../../../assets/icon/ic-personnal.svg'
import IC5 from '../../../assets/icon/ic-location.svg'
import IC6 from '../../../assets/icon/ic-nation.svg'
import IC7 from '../../../assets/icon/cmnd.svg'
import IC8 from '../../../assets/icon/ic-email.svg'
import IC9 from '../../../assets/icon/ic-nationnality.svg'

import Constants from '../../../utils/constants';
import Factories from '../../../services/FactoryApi';
import { AuthContext } from '../../../context/auth.context';
import { ToastDel, ToastNotiError, getDate } from '../../../utils/Utils';
const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const Record = props => {
    const { isBooking = false, onClickBox } = props
    const navigator = useNavigate()
    const [open, setOpen] = useState();
    const [listData, setListData] = useState([]);
    const { user } = useContext(AuthContext);
    const navigate = useNavigate()
    const [isModalOpen, setIsModalOpen] = useState(false);

    async function getListPatient() {
        const response = await Factories.getListPatient(
            {
                userId: user?.id
            }
        );
        if (response) {
            setListData(response)
        } else {
            ToastNotiError()
        }
    }
    useEffect(() => {
        getListPatient()
    }, [])
    const showModal = (item) => {
        navigate(`/patient/${item?._id}`)
        // setIsModalOpen(item);
    };

    const handleClickOpen = (id) => {
        setOpen(id);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const handleDel = () => {
        console.log(open);
        /// xoas 
        setOpen(null);
    };
    const handleClickBox = (value) => {
        onClickBox(value)
    };
    const handleClicDelete = async (value) => {
        const response = await Factories.deletePatient(value)
        getListPatient()
        if (response?.message) {
            ToastDel('Đã xoá dữ liệu thành công')
        } else {
            ToastNotiError()
        }
    };

    const fakeData = {
        bloodPressure: "120/80",
        temperature: "37.5°C",
        respiratoryRate: "18 lần/phút",
        height: "170 cm",
        weight: "65 kg",
        left_eye_power: "2.0",
        right_eye_power: "2.5",
        systolic_bp: "120",
        diastolic_bp: "80",
        diagnosis: "Cảm lạnh",
        result: "Không có vấn đề đáng ngại",
        status: "Bình thường",
        created_at: "2022-04-15 10:30:00",
        note: "Bệnh nhân có triệu chứng ho và sốt nhẹ. Huyết áp và nhịp tim ổn định. Không có dấu hiệu bất thường ở mắt và tai. Đề nghị tiếp tục theo dõi và duy trì chế độ ăn uống lành mạnh. Gửi bệnh nhân về nhà và hẹn tái khám sau 1 tuần.",
        prescription: "1. Paracetamol 500mg - Uống mỗi 6 giờ khi cần\n2. Amoxicillin 250mg - Uống 1 viên/ngày trong 7 ngày\n3. Vitamin C 1000mg - Uống 1 viên/ngày để tăng cường hệ miễn dịch\n4. Ibuprofen 400mg - Uống mỗi 8 giờ khi cần giảm đau và hạ sốt"

    };

    return (
        <>
            <span className='font-bold text-xl'>
                Danh sách hồ sơ bệnh nhân
            </span>
            {!isBooking &&
                <div className="mt-6 flex flex-col gap-4 w-[900px] justify-end items-end">
                    <button
                        onClick={() => navigator(`/create-profile`)}
                        className="rounded-lg hover:bg-blue2 float-right bg-blue w-64 border-none text-[#fff] font-medium bg-transparent border border-blue-500 text-blue-500 px-6 py-3">
                        Thêm mới hồ sơ bệnh nhân
                    </button>
                </div>
            }
            <div className="mt-6 flex flex-col gap-4 w-[900px]">
                {listData?.map(item => {
                    return (
                        <div key={item._id}>
                            {isBooking ? <>
                                <Box
                                    onClick={() => handleClickBox(item)}
                                    description={<DescriptionProfile data={item} />}
                                />
                            </>
                                : <>
                                    <Box
                                        onClick={() => handleClickBox(item)}
                                        actions={[
                                            <button key="del"
                                                onClick={() => {
                                                    handleClicDelete(item?._id)
                                                }}
                                            // onClick={() => handleClickDel(item.id)}
                                            >
                                                <DeleteOutlined style={{ color: '#ff3b30' }} />
                                            </button>,
                                            <button key="edit"><EditOutlined style={{ color: '#00b5f1' }} onClick={() => navigator(`/update-profile/${item._id}`)} /> </button>,
                                            <button key="info"><InfoOutlined
                                                onClick={() => {
                                                    showModal(item)
                                                }} /> </button>,
                                        ]}
                                        description={<DescriptionProfile data={item} />}
                                    />
                                </>}

                        </div>
                    );
                })}
                <Dialog
                    open={open}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={handleClose}
                    aria-describedby="alert-dialog-slide-description"
                >
                    <DialogTitle>{"Xác nhận xoá hồ sơ ?"}</DialogTitle>
                    {/* <DialogContent>
                        <DialogContentText id="alert-dialog-slide-description">
                            Let Google help apps determine location. This means sending anonymous
                            location data to Google, even when no apps are running.
                        </DialogContentText>
                    </DialogContent> */}
                    <DialogActions>
                        <Button onClick={handleClose}>Huỷ bỏ</Button>
                        <Button onClick={handleDel}>Đồng ý</Button>
                    </DialogActions>
                </Dialog>

                <Dialog
                    open={open}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={handleClose}
                    aria-describedby="alert-dialog-slide-description"
                >
                    <DialogTitle>{"Xác nhận xoá hồ sơ ?"}</DialogTitle>
                    {/* <DialogContent>
                        <DialogContentText id="alert-dialog-slide-description">
                            Let Google help apps determine location. This means sending anonymous
                            location data to Google, even when no apps are running.
                        </DialogContentText>
                    </DialogContent> */}
                    <DialogActions>
                        <Button onClick={handleClose}>Huỷ bỏ</Button>
                        <Button onClick={handleDel}>Đồng ý</Button>
                    </DialogActions>
                </Dialog>

                <Modal
                    title={<span className='text-3xl  font-bold text-blue'>Chi tiết hồ sơ</span>}
                    open={isModalOpen}
                    width={1000}
                    onCancel={() => setIsModalOpen(null)}
                    footer=""
                >
                    <div className="p-1">

                        <div className="flex flex-row justify-between shadow-md p-6">
                            <div className="flex flex-col gap-3 ">
                                <div className="flex flex-col gap-3">
                                    <Avatar
                                        style={{ height: 100, width: 100 }}
                                        src={props?.data?.avatar ?? 'https://api.dicebear.com/7.x/miniavs/svg?seed=2'} />
                                </div>
                            </div>
                            <div className="flex flex-col gap-3 ">
                                <div className="flex flex-col gap-3">
                                    <DetailItem icon={IC1} title='Họ và tên' content={isModalOpen?.fullName} />
                                    <DetailItem icon={IC2} title='Ngày sinh' content={getDate(isModalOpen?.dateOfBirth)} />
                                    <DetailItem icon={IC3} title='Số điện thoại' content={isModalOpen?.phone} />
                                    <DetailItem icon={IC4} title='Giới tính' content={Constants.optionSex?.find(item => item.value === isModalOpen?.gender)?.label} />
                                </div>
                            </div>
                            <div className="flex flex-col gap-3">

                                <DetailItem icon={IC7} title='CMND' content={isModalOpen?.CCCD} />
                                <DetailItem icon={IC8} title='Email' content={isModalOpen?.email} />
                                <DetailItem icon={IC4} title='Nghề Nghiệp' content={isModalOpen?.job} />
                                <DetailItem icon={IC5} title='Địa chỉ' content={isModalOpen?.address} />
                                <DetailItem icon={IC6} title='Dân tộc' content={Constants.nationVN?.find(item => item.value === parseInt(isModalOpen?.nation))?.label} />
                            </div>
                        </div>

                        <div className="flex my-5 flex-col">
                            <span className='text-xl font-bold'>Hồ sơ khám bệnh</span>

                            <div className="flex flex-col shadow-md p-4">
                                <span className='text-xl pt-2 text-blue'>Khám thai: 22/04/2024 - Bệnh viên Nhi Hà Nội</span>
                                <div className="flex flex-row mt-2  justify-start gap-12">
                                    <div className="flex flex-row justify-center gap-12">
                                        <div className="flex flex-col gap-4">
                                            <DetailItem icon={IC1} title='Huyết áp' content={fakeData.bloodPressure} />
                                            <DetailItem icon={IC2} title='Nhiệt độ' content={fakeData.temperature} />
                                            <DetailItem icon={IC3} title='Tần số hô hấp' content={fakeData.respiratoryRate} />
                                            <DetailItem icon={IC4} title='Chiều cao' content={fakeData.height} />
                                            <DetailItem icon={IC7} title='Cân nặng' content={fakeData.weight} />
                                        </div>
                                        <div className="flex flex-col gap-3">
                                            <DetailItem icon={IC8} title='Nhãn áp trái' content={fakeData.left_eye_power} />
                                            <DetailItem icon={IC8} title='Nhãn áp phải' content={fakeData.right_eye_power} />
                                            <DetailItem icon={IC4} title='Huyết áp tâm thu' content={fakeData.systolic_bp} />
                                            <DetailItem icon={IC5} title='Huyết áp tâm trương' content={fakeData.diastolic_bp} />
                                        </div>
                                    </div>
                                </div>
                                <DetailItem icon={IC6} title='Kê khai thuốc' content={fakeData.prescription} />
                                <DetailItem icon={IC6} title='Chẩn đoán' content={fakeData.diagnosis} />
                                <DetailItem icon={IC6} title='Kết quả' content={fakeData.result} />
                                <DetailItem icon={IC6} title='Ghi chú' content={fakeData.note} />
                            </div>


                        </div>
                    </div>

                </Modal>
            </div >
        </>
    );
};

export default Record;