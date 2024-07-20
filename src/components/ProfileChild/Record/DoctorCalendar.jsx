import { useContext, useEffect, useState } from 'react';
import { Modal, Form, Select, DatePicker, TimePicker, Radio, InputNumber, Input } from 'antd';
import Factories from '../../../services/FactoryApi';
import { AuthContext } from '../../../context/auth.context';
import { ToastNoti, ToastNotiError, getDate, } from '../../../utils/Utils';
import ReactBigCalendar from '../../Calendar/Calendar';
import moment from 'moment';
import ButtonCustom from '../../Button/ButtonCustom';

const DoctorCalendar = () => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState();
    const [listDataBranch, setListDataBranch] = useState([]);
    const [listDataDP, setListDataDP] = useState([]);
    const [listData, setListData] = useState([]);
    const { user } = useContext(AuthContext);
    const [isModalOpen, setIsModalOpen] = useState(false);

    function disabledDate(current) {
        return current && current < moment().startOf('day');
    }

    async function fetchDataDepartment() {
        const response = await Factories.getDepartmentListForDoctor(user.id, listDataBranch[0].value);
        if (response) {
            const newDate = response?.map(item => ({
                value: item._id,
                label: item.name
            }))
            setListDataDP(newDate)
        } else {
            ToastNotiError()
        }
    }

    async function fetchDataBranch() {
        const response = await Factories.getBranchListForDoctor(user?.id);
        if (response) {
            const newDate = response?.map(item => ({
                value: item._id,
                label: item.name
            }))
            setListDataBranch(newDate)
        } else {
            ToastNotiError()
        }
    }

    async function fetchData() {
        const response = await Factories.getSchedule({
            doctorId: user.id
        });
        if (response) {
            const newDate = response?.map(item => (
                {
                    id: item._id,
                    title: `${item.departmentName}`,
                    start: new Date(item.timeStart),
                    end: new Date(item.timeEnd),
                    status: item.status,
                    service: item.service,
                    price: item.price,
                    note: item?.note,
                    date: item.date,
                    doctorId: item.doctorId,
                    branchId: item.branchId,
                    departmentId: item.departmentId,
                    branchName: item.branchName,
                    departmentName: item.departmentName,
                    timeStart: item.timeStart,
                    timeEnd: item.timeEnd,
                }
            ))
            setListData(newDate)
        } else {
            ToastNotiError()
        }
    }
    useEffect(() => {
        fetchDataBranch()
        fetchData()
    }, [user])

    const watchService = Form.useWatch('service', form);
    const watchTime = Form.useWatch('time', form);

    // function checkTimeService() {
    //     if (watchTime) {
    //         if (watchService == 1) {
    //             console.log("🚀 ~ checkTimeService ~ watchService:", watchService)
    //             if (
    //                 (watchTime[0]?.$H < 7 && watchTime[1]?.$H > 17) // Cả hai
    //                 || (watchTime[0]?.$H < 7 || watchTime[1]?.$H > 17) // Thời gian bắt đầu nhỏ hơn 7 hoặc thời gian kết thúc lớn hơn 17
    //             ) {
    //                 form.setFields([
    //                     {
    //                         name: 'time',
    //                         errors: ['Thời gian Khám trong giờ bắt đầu từ 07h00 - 17h00'],
    //                     },
    //                 ]);
    //             }
    //             return false
    //         }
    //         else if (
    //             watchService === 2 &&
    //             (

    //                 (watchTime[0]?.$H < 17 && watchTime[1]?.$H > 19) // Cả hai
    //                 || (watchTime[0]?.$H < 17 || watchTime[1]?.$H > 19) // Thời gian bắt đầu nhỏ hơn 7 hoặc thời gian kết thúc lớn hơn 17
    //             )
    //         ) {
    //             form.setFields([
    //                 {
    //                     name: 'time',
    //                     errors: ['Thời gian Khám trong giờ bắt đầu từ 17h00 - 19h00'],
    //                 },
    //             ]);
    //             return false
    //         }
    //         else {
    //             form.setFields([
    //                 {
    //                     name: 'time',
    //                     errors: null,
    //                 },
    //             ]);
    //             return true
    //         }
    //     }
    //     return true
    // }

    function checkTimeService() {
        if (watchTime) {
            if (watchService === 1) {
                if (watchTime[0]?.$H < 7 || watchTime[1]?.$H > 17) {
                    form.setFields([
                        {
                            name: 'time',
                            errors: ['Thời gian Khám trong giờ bắt đầu từ 07h00 - 17h00'],
                        },
                    ]);
                    return false;
                } else {
                    form.setFields([
                        {
                            name: 'time',
                            errors: null,
                        },
                    ]);
                    return true;
                }
            } else if (watchService === 2) {
                if (watchTime[0]?.$H < 17 || watchTime[1]?.$H > 19) {
                    form.setFields([
                        {
                            name: 'time',
                            errors: ['Thời gian Khám trong giờ bắt đầu từ 17h00 - 19h00'],
                        },
                    ]);
                    return false;
                } else {
                    form.setFields([
                        {
                            name: 'time',
                            errors: null,
                        },
                    ]);
                    return true;
                }
            }
        }
        return true;
    }


    useEffect(() => {
        if (watchTime) {
            checkTimeService()
        }
    }, [watchService, watchTime])
    useEffect(() => {
        if (listDataBranch.length > 0) {
            form.setFieldsValue({
                branchName: listDataBranch[0].label,
            })
            fetchDataDepartment()
        }

    }, [listDataBranch])



    const onFinish = async (data) => {
        // setLoading(true)
        console.log('sss', checkTimeService());

        if (!checkTimeService()) {
            ToastNotiError('Thời gian tạo lịch làm việc không đúng.')
        } else {
            try {
                let newData = { ...data }
                newData.doctorId = user.id
                newData.departmentName = listDataDP.find(item => item.value == newData.departmentId)?.label
                newData.branchName = listDataBranch[0].label
                newData.branchId = listDataBranch[0].value
                const parsedNewDate = new Date(newData.date);

                // Lặp qua danh sách và thay đổi ngày
                const time = newData.time.map(dateString => {
                    const parsedDate = new Date(dateString);
                    parsedDate.setFullYear(parsedNewDate.getFullYear());
                    parsedDate.setMonth(parsedNewDate.getMonth());
                    parsedDate.setDate(parsedNewDate.getDate());
                    return parsedDate.toISOString();
                });
                newData.time = time
                const response = await Factories.createDoctorSchedule(newData);
                if (response._id) {
                    ToastNoti()
                    setIsModalOpen();
                    fetchData()
                    setLoading(false)
                } else {
                    ToastNotiError(response?.message)
                    const logTime = response?.schedule
                    if (logTime) {
                        const errorMessage = `Lịch khám đã tồn lại lúc: ${getDate(logTime?.overlappingTimeStart, 6)} - ${getDate(logTime?.overlappingTimeEnd, 6)}`
                        setLoading(false)
                        form.setFields([
                            {
                                name: 'time',
                                errors: [errorMessage],
                            },
                        ]);
                    }
                }
            } catch (error) {
                fetchData()
                ToastNotiError(error);
            }
        }
    };

    const formItemLayout = {
        labelCol: {
            xs: {
                span: 24
            },
            sm: {
                span: 6,
            },
        },
        wrapperCol: {
            xs: {
                span: 12,
            },
            sm: {
                span: 24,
            },
        },
    };


    return (
        <>
            <span className='font-bold text-xl'>
                Danh sách lịch khám
            </span>
            <div className="mt-6 flex flex-col gap-4 w-[900px] justify-end items-end">
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="rounded-lg hover:bg-blue2 float-right bg-blue w-64 border-none text-[#fff] font-medium bg-transparent border border-blue-500 text-blue-500 px-6 py-3">
                    Thêm mới lịch khám bệnh
                </button>
            </div>
            <div className="mt-6 flex flex-col gap-4 w-[900px]">
                <ReactBigCalendar onReload={() => fetchData()} data={listData} />
                {/* <Dialog
                    open={open}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={handleClose}
                    aria-describedby="alert-dialog-slide-description"
                >
                    <DialogTitle>{"Xác nhận xoá hồ sơ ?"}</DialogTitle>
                    <DialogActions>
                        <Button onClick={handleClose}>Huỷ bỏ</Button>
                        <Button onClick={handleDel}>Đồng ý</Button>
                    </DialogActions>
                </Dialog> */}

                {/* <Dialog
                    open={open}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={handleClose}
                    aria-describedby="alert-dialog-slide-description"
                >
                    <DialogTitle>{"Xác nhận xoá hồ sơ ?"}</DialogTitle>
                    <DialogActions>
                        <Button onClick={handleClose}>Huỷ bỏ</Button>
                        <Button onClick={handleDel}>Đồng ý</Button>
                    </DialogActions>
                </Dialog> */}

                <Modal
                    title={<span className='text-2xl  font-bold text-blue'>Thêm mới lịch khám</span>}
                    open={isModalOpen}
                    width={700}
                    onCancel={() => {
                        form.re
                        setIsModalOpen()
                    }
                    }
                    footer=""
                >
                    <Form
                        {...formItemLayout}
                        variant="filled"
                        form={form}
                        onFinish={onFinish}
                    >

                        <Form.Item
                            label="Bệnh viện"
                            name="branchName"
                            rules={[
                                {
                                    required: true,
                                    message: 'Bạn chưa thuộc bệnh viên nào cả.',
                                },
                            ]}
                        >
                            <Input disabled placeholder="Chọn bênh viện" placement='Chọn bệnh viện' />
                        </Form.Item>

                        <Form.Item
                            label="Chuyên khoa"
                            name="departmentId"
                            rules={[
                                {
                                    required: true,
                                    message: 'Bắt buộc nhập!',
                                },
                            ]}
                        >
                            <Select
                                options={listDataDP}
                            />
                        </Form.Item>

                        <Form.Item
                            label="Chọn dịch vụ khám"
                            name="service"
                            rules={[
                                {
                                    required: true,
                                    message: 'Bắt buộc chọn',
                                },
                            ]}
                        >

                            <Radio.Group buttonStyle="solid">
                                <Radio.Button value={1}>Khám trong giờ</Radio.Button>
                                <Radio.Button value={2}>Khám ngoài giờ</Radio.Button>
                                <Radio.Button value={3}>Khám online</Radio.Button>
                            </Radio.Group>
                        </Form.Item>

                        <Form.Item
                            label="Ngày khám"
                            name="date"
                            rules={[
                                {
                                    required: true,
                                    message: 'Bắt buộc nhập!',
                                },
                            ]}
                        >
                            <DatePicker disabledDate={disabledDate} placeholder="yyyy/mm/dd" />
                        </Form.Item>

                        <Form.Item
                            label="Giờ khám"
                            name="time"
                            rules={[
                                {
                                    required: true,
                                    message: 'Bắt buộc nhập!',
                                },
                            ]}
                        >
                            <TimePicker.RangePicker format={'HH:mm'} />
                        </Form.Item>

                        <Form.Item
                            label="Giá khám"
                            name="price"
                        // rules={[
                        //     {
                        //         required: true,
                        //         message: 'Bắt buộc nhập!',
                        //     },
                        // ]}
                        >

                            <InputNumber
                                addonAfter={'VNĐ'}
                                // initialValues={0}
                                max={1000000000}
                                formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                parser={(value) => value?.replace(/\$\s?|(,*)/g, '')}
                            />
                        </Form.Item>

                        <Form.Item
                            wrapperCol={{
                                offset: 20,
                                span: 24,
                            }}
                        >
                            <ButtonCustom
                                type='submit'
                                htmlType="submit"
                                loading={loading}
                            >
                                Lưu thông tin
                            </ButtonCustom>
                        </Form.Item>


                    </Form>
                </Modal>
            </div >
        </>
    );
};

export default DoctorCalendar;