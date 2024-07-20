import { Button } from '@mui/material';
import DescriptionProfile from '../../components/Description/DescriptionProfile/DescriptionProfile';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useNavigate, useParams } from 'react-router-dom';
import BoxCustom from '../../components/Box/Box';
import DetailItem from '../../components/DetailItem/DetailItem';
import { useContext, useEffect, useState } from 'react';
import { ToastNotiError, ToastUpdate, convertStringToNumber, getDate } from '../../utils/Utils';
import Factories from '../../services/FactoryApi';
import Constants from '../../utils/constants';
import DescriptionDoctor from '../../components/Description/DescriptionDoctor/DescriptionDoctor';
import { Modal, Spin, Avatar, Rate } from 'antd';
import { AuthContext } from '../../context/auth.context';
import { CheckCircleOutlined, CloseCircleOutlined, EditOutlined, ForkOutlined } from '@ant-design/icons';
import { createNotification } from '../../services/FirebaseService';
import IC1 from '../../assets/icon/ic-avatar.svg'
import IC2 from '../../assets/icon/ic-born.svg'
import IC3 from '../../assets/icon/ic-contact.svg'
import IC4 from '../../assets/icon/ic-personnal.svg'
import IC5 from '../../assets/icon/ic-location.svg'
import IC6 from '../../assets/icon/ic-nation.svg'
import IC7 from '../../assets/icon/cmnd.svg'
import IC8 from '../../assets/icon/ic-email.svg'
import { useForm } from 'react-hook-form';

const AppointmentsPage = () => {
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    const { id } = useParams()
    const [data, setData] = useState([]);
    const [star, setStar] = useState();
    const [comment, setComment] = useState();
    const [loading, setLoading] = useState(true);
    const [openEdit, setOpenEdit] = useState(false);
    const [isCanDone, setIsCanDone] = useState(true);
    const fetchData = async (id) => {
        try {
            setLoading(true)
            const response = await Factories.detailAppointment(id);
            if (response) {
                // Lấy thông tin về shift từ response
                const shiftInfo = response.shiftInfo;
                // Lấy ngày và giờ bắt đầu từ shiftInfo
                const timeStart = new Date(shiftInfo.timeStart);
                // Lấy ngày và giờ hiện tại
                const currentTime = new Date();
                // So sánh thời gian bắt đầu của shift với thời gian hiện tại
                if (timeStart <= currentTime) {
                    setIsCanDone(true)
                } else {
                    setIsCanDone(false)
                }
                setData(response);
            }
            setLoading(false)
        } catch (error) {
            ToastNotiError(error);
        }
    };
    useEffect(() => {
        fetchData(id);
    }, [id]);

    async function handleChangeStatus(stt) {
        try {
            const resp = await Factories.updateBooking(id, { status: stt })
            if (resp?._id) {
                ToastUpdate()
                // tao thông báo thanh cong 
                if (stt === 2) {
                    const noti = {
                        // fromId: user_id,
                        toId: data.user_id,
                        // toId: data.shiftInfo.doctorId,
                        type: 2,
                        fullName: data.doctorInfo.fullName,
                        // body: sss,
                        action_id: data._id,
                    }
                    createNotification(noti)
                    const noti2 = {
                        // fromId: user_id,
                        toId: data.shiftInfo.doctorId,
                        // toId: data.shiftInfo.doctorId,
                        type: 3,
                        fullName: data.patientInfo.fullName,
                        // body: sss,
                        action_id: data._id,
                    }
                    createNotification(noti2)
                } else {
                    const noti = {
                        // fromId: user_id,
                        toId: data.user_id,
                        // toId: data.shiftInfo.doctorId,
                        type: 4,
                        fullName: data.doctorInfo.fullName,
                        // body: sss,
                        action_id: data._id,
                    }
                    createNotification(noti)
                    const noti2 = {
                        // fromId: user_id,
                        toId: data.shiftInfo.doctorId,
                        // toId: data.shiftInfo.doctorId,
                        type: 5,
                        fullName: data.patientInfo.fullName,
                        // body: sss,
                        action_id: data._id,
                    }
                    createNotification(noti2)
                }
            }
            fetchData(id)
        } catch (error) {
            fetchData(id)
            ToastNotiError()
        }
    }

    const { register, handleSubmit, watch, reset, setValue, formState: { errors } } = useForm();

    useEffect(() => {
        setValue("diagnosis", data?.diagnosis)
        setValue("systolic_bp", data?.systolic_bp)
        setValue("diastolic_bp", data?.diastolic_bp)
        setValue("temperature", data?.temperature)
        setValue("height", data?.height)
        setValue("left_eye_power", data?.left_eye_power)
        setValue("right_eye_power", data?.right_eye_power)
        setValue("weight", data.weight)
        setValue("respiratory_rate", data?.respiratory_rate)
        setValue("symptom", data?.symptom)
        setValue("prescription", data?.prescription)
        setValue("note", data?.note)
    }, [openEdit, data]);

    async function onSubmit(dataInput) {
        try {
            let mergedData = { ...data, ...dataInput };
            mergedData.status = 3.5
            setData(mergedData)
            setOpenEdit()
        } catch (err) {
            console.log("🚀 ~ onSubmit ~ err:", err)
        }
    }

    async function onSubmitFeedBack() {
        try {
            if (star) {
                let mewSubmit = {
                    star: star,
                    comment: comment,
                    booking_id: id,
                    doctor_id: data.shiftInfo.doctorId,
                    shift_id: data.shiftId,
                    user_id: data.user_id,
                    patient_avatar: data.patientInfo.avatar,
                    patient_name: data.patientInfo.fullName,
                    patient_id: data.patientInfo._id,
                    departmentName: data.shiftInfo.departmentName,
                }
                const resp = await Factories.createFeedBack(mewSubmit)
                if (resp?._id) {
                    ToastUpdate()
                    fetchData(id);
                    // const noti = {
                    //     toId: data.user_id,
                    //     type: 6,
                    //     fullName: data.doctorInfo.fullName,
                    //     action_id: data._id,
                    // }
                    // createNotification(noti)
                    // const noti2 = {
                    //     toId: data.shiftInfo.doctorId,
                    //     type: 7,
                    //     fullName: data.patientInfo.fullName,
                    //     action_id: data._id,
                    // }
                    // createNotification(noti2)
                }
            }
            else {
                ToastNotiError('Vui lòng chọn số sao đánh giá')
            }
        } catch (err) {
            console.log("🚀 ~ onSubmit ~ err:", err)
        }
    }
    async function onSubmitBooking() {
        try {
            let mewSubmit = { ...data }
            mewSubmit.status = 4
            const resp = await Factories.updateBooking(id, mewSubmit)
            if (resp?._id) {
                ToastUpdate()
                setOpenEdit()
                const noti = {
                    toId: data.user_id,
                    type: 6,
                    fullName: data.doctorInfo.fullName,
                    action_id: data._id,
                }
                createNotification(noti)
                const noti2 = {
                    toId: data.shiftInfo.doctorId,
                    type: 7,
                    fullName: data.patientInfo.fullName,
                    action_id: data._id,
                }
                createNotification(noti2)
                fetchData(id);
            }
        } catch (err) {
            console.log("🚀 ~ onSubmit ~ err:", err)
        }
    }
    return (
        <div className='w-full flex flex-col items-center justify-center py-10'>
            <div className='flex flex-col w-[80%] xl:w-[70%] xl:flex-row justify-center gap-4 '>
                {loading ? <Spin className="my-10" size="large" />
                    : <>
                        <div className=" xl:w-1/3 w-full">
                            <BoxCustom
                                title='Thông tin cơ sỏ y tế'
                                description={
                                    <div className='flex flex-col gap-2'>
                                        <span className="text-[#111] font-bold" >
                                            {data?.shiftInfo?.branchName}
                                        </span>
                                        <span className="leading-4 text-sm" >
                                            {data?.address}
                                        </span>
                                    </div>
                                }
                            />
                        </div>


                        <div className="flex w-[full] xl:w-[100%] flex-col gap-4 ">

                            <BoxCustom
                                title='Thông tin lịch khám'
                                iconCol={false}
                                description={
                                    <div className='flex flex-col'>
                                        <DetailItem title='Chuyên khoa' content={data?.shiftInfo?.departmentName} />
                                        <DetailItem title='Dịch vụ' content={Constants.optionServices.find(item => item.value == parseInt(data?.shiftInfo?.service))?.label} />
                                        <DetailItem title='Bác sĩ' content={data?.doctorInfo?.fullName} />
                                        <DetailItem title='Thời gian' content={`${getDate(data?.shiftInfo?.timeStart, 6)} - ${getDate(data?.shiftInfo?.timeEnd, 6)}`} />
                                        <DetailItem title='Ngày khám' content={`${getDate(data?.shiftInfo?.timeStart, 1)} `} />
                                        <DetailItem title='Tiền khám' content={convertStringToNumber(data?.shiftInfo?.price)} />
                                    </div>
                                }
                            />
                            <BoxCustom
                                title='Thông tin bệnh nhân'
                                description={<DescriptionProfile data={data?.patientInfo} />}
                            />
                            <BoxCustom
                                isCanHover={false}
                                title='Thông tin bác sĩ'
                                description={<DescriptionDoctor data={data?.doctorInfo} />}
                            />

                            {/* {isCanDone && */}
                            <BoxCustom
                                title={
                                    <div className='flex flex-row justify-between'>
                                        <span>Kết quả khám bệnh</span>
                                        {data?.status == 2 &&
                                            <Button onClick={() => setOpenEdit(true)}><EditOutlined style={{ color: 'white' }} /></Button>
                                        }
                                    </div>
                                }
                                description={
                                    <>
                                        {data?.status == 3.5 || data?.status == 4 ?
                                            <>
                                                <div className="flex  flex-col">
                                                    <div className="flex flex-col shadow-md">
                                                        <div className="flex flex-row mt-2  justify-start gap-12">
                                                            <div className="flex my-5 flex-row justify-start gap-20 w-full">
                                                                <div className="flex flex-col gap-4">
                                                                    <DetailItem title='Nhiệt độ' content={data?.temperature} />
                                                                    <DetailItem title='Tần số hô hấp' content={data?.respiratory_rate} />
                                                                    <DetailItem title='Chiều cao' content={data?.height} />
                                                                    <DetailItem title='Cân nặng' content={data?.weight} />
                                                                </div>
                                                                <div className="flex flex-col gap-4">
                                                                    <DetailItem title='Nhãn áp trái' content={data?.left_eye_power} />
                                                                    <DetailItem title='Nhãn áp phải' content={data?.right_eye_power} />
                                                                    <DetailItem title='Huyết áp tâm thu' content={data?.systolic_bp} />
                                                                    <DetailItem title='Huyết áp tâm trương' content={data?.diastolic_bp} />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="flex my-2 flex-col gap-4">
                                                            <DetailItem title='Triệu chứng' html content={data?.symptom} />
                                                            <DetailItem title='Chẩn đoán' content={data?.diagnosis} />
                                                            <DetailItem title='Kê khai thuốc' content={data?.prescription} />
                                                            <DetailItem title='Dặn dò từ bác sĩ' content={data?.note} />
                                                        </div>
                                                    </div>
                                                </div>

                                            </> : <><span>Đang chờ cập nhật của bác sĩ</span></>}
                                    </>
                                }
                            />
                            {/* } */}

                            {user?.role_id === 1 && data?.status == 4 && <>
                                <BoxCustom
                                    title={
                                        <div className='flex flex-row justify-between'>
                                            <span>Đánh giá bác sĩ</span>
                                        </div>
                                    }
                                    description={
                                        <div className='flex flex-col gap-5`'>
                                            <div className="flex flex-col gap-3">
                                                <span className='font-2xl'>
                                                    Đánh giá trải nghiệm của bạn đối với dịch vụ cũng như với bác sĩ
                                                </span>
                                                <span className='font-2xl'>
                                                    <Rate value={data?.feedBackInfo?.star ?? star} onChange={(e) => setStar(e)} count={5} style={{ width: '100%' }} />
                                                </span>

                                            </div>
                                            <div className="flex flex-col gap-3">
                                                <span className='font-2xl'>
                                                    Để lại bình luận để giúp chúng tôi cải thiện dịch vụ
                                                </span>
                                                <textarea
                                                    type="text"
                                                    placeholder="Nhập lời nhận"
                                                    min={0}
                                                    disabled={data?.feedBackInfo?.comment}
                                                    value={data?.feedBackInfo?.comment ?? comment}
                                                    style={{ width: '100%', minHeight: 70 }}
                                                    className="w-full border border-slate-200 rounded-lg px-2 outline-none bg-transparent"
                                                    onChange={(e) => setComment(e.target.value)}
                                                />
                                            </div>
                                        </div>
                                    }
                                />
                            </>}

                            <div className="flex flex-row justify-between">
                                <Button
                                    startIcon={<ArrowBackIosNewIcon />}
                                    className='w-28' onClick={() => navigate('/user?key=appointment')}>
                                    Quay lại
                                </Button>
                                {
                                    user?.role_id === 2 && data?.status === 1 &&
                                    <div className="flex justify-end ">
                                        <Button
                                            color='error'
                                            startIcon={<CloseCircleOutlined />}
                                            className='w-28 text-red' onClick={() => handleChangeStatus(Constants.labelStatus[2].value)}>
                                            Từ chối
                                        </Button>
                                        <Button
                                            startIcon={<CheckCircleOutlined />}
                                            className='w-32' onClick={() => handleChangeStatus(Constants.labelStatus[1].value)}>
                                            Xác nhận
                                        </Button>
                                    </div>
                                }
                                {user?.role_id === 2 && data?.status == 3.5 &&
                                    <Button
                                        variant='contained'
                                        endIcon={<CheckCircleOutlined />}
                                        className='w-44' onClick={() => onSubmitBooking()}>
                                        Hoàn thành
                                    </Button>
                                }
                                {user?.role_id === 1 && data?.status == 4 && !data.feedBackInfo &&
                                    <Button
                                        variant='contained'
                                        endIcon={<CheckCircleOutlined />}
                                        className='w-44' onClick={() => onSubmitFeedBack()}>
                                        Lưu đánh giá
                                    </Button>
                                }
                            </div>
                        </div>
                    </>}



                {/* modal edit  */}
                <Modal
                    title={<span className='text-3xl  font-bold text-blue'>Kết quả khám bệnh</span>}
                    open={openEdit}
                    width={1000}
                    onCancel={() => setOpenEdit()}
                    footer=""
                >
                    <div >
                        <div className="flex flex-row justify-between shadow-md p-6">
                            <div className="flex flex-col gap-3 ">
                                <div className="flex flex-col gap-3">
                                    <Avatar
                                        style={{ height: 100, width: 100 }}
                                        src={data?.patientInfo?.avatar ?? 'https://api.dicebear.com/7.x/miniavs/svg?seed=2'} />
                                </div>
                            </div>
                            <div className="flex flex-col gap-3 ">
                                <div className="flex flex-col gap-3">
                                    <DetailItem icon={IC1} title='Họ và tên' content={data?.patientInfo?.fullName} />
                                    <DetailItem icon={IC2} title='Ngày sinh' content={getDate(data?.patientInfo?.dateOfBirth)} />
                                    <DetailItem icon={IC3} title='Số điện thoại' content={data?.patientInfo?.phone} />
                                    <DetailItem icon={IC4} title='Giới tính' content={Constants.optionSex?.find(item => item.value === data?.patientInfo?.gender)?.label} />
                                </div>
                            </div>
                            <div className="flex flex-col gap-3">
                                <DetailItem icon={IC7} title='CMND' content={data?.patientInfo?.CCCD} />
                                <DetailItem icon={IC8} title='Email' content={data?.patientInfo?.email} />
                                <DetailItem icon={IC4} title='Nghề Nghiệp' content={data?.patientInfo?.job} />
                                <DetailItem icon={IC5} title='Địa chỉ' content={data?.patientInfo?.address} />
                                <DetailItem icon={IC6} title='Dân tộc' content={Constants.nationVN?.find(item => item.value === parseInt(data?.patientInfo?.nation))?.label} />
                            </div>
                        </div>

                        <div className="flex mt-5 flex-col">
                            <span className='text-xl font-bold'>Hồ sơ khám bệnh</span>
                            <form className="mt-4 flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>

                                <div className="flex flex-col shadow-md px-2">
                                    <div className="flex flex-row mt-2  justify-start gap-12">
                                        <div className="flex flex-row justify-center gap-12">
                                            <div className="flex flex-col gap-4">
                                                <DetailItem
                                                    title='Nhiệt độ'
                                                    content={
                                                        <input
                                                            type="decimal"
                                                            placeholder="0"
                                                            min={0}
                                                            className="w-full border border-slate-200 rounded-lg px-2 outline-none bg-transparent"
                                                            {...register('temperature')}
                                                        />
                                                    }
                                                />
                                                <DetailItem
                                                    title='Tần số hô hấp'
                                                    content={
                                                        <input
                                                            type="number"
                                                            placeholder="0 lần/phút"
                                                            min={0}
                                                            className="w-full border border-slate-200 rounded-lg px-2 outline-none bg-transparent"
                                                            {...register('respiratory_rate')}
                                                        />
                                                    }
                                                />
                                                <DetailItem
                                                    title='Chiều cao'
                                                    content={
                                                        <input
                                                            type="decimal"
                                                            placeholder="cm"
                                                            min={0}
                                                            className="w-full border border-slate-200 rounded-lg px-2 outline-none bg-transparent"
                                                            {...register('height')}
                                                        />
                                                    } />
                                                <DetailItem
                                                    title='Cân nặng'
                                                    content={
                                                        <input
                                                            type="decimal"
                                                            placeholder="kg"
                                                            min={0}
                                                            className="w-full border border-slate-200 rounded-lg px-2 outline-none bg-transparent"
                                                            {...register('weight')}
                                                        />} />
                                            </div>
                                            <div className="flex flex-col gap-4">
                                                <DetailItem
                                                    title='Nhãn áp trái'
                                                    content={<input
                                                        type="decimal"
                                                        placeholder="cmH2O "
                                                        min={0}
                                                        className="w-full border border-slate-200 rounded-lg px-2 outline-none bg-transparent"
                                                        {...register('left_eye_power')}
                                                    />}
                                                />
                                                <DetailItem
                                                    title='Nhãn áp phải'
                                                    content={<input
                                                        type="decimal"
                                                        placeholder="cmH2O "
                                                        min={0}
                                                        className="w-full border border-slate-200 rounded-lg px-2 outline-none bg-transparent"
                                                        {...register('right_eye_power')}
                                                    />} />
                                                <DetailItem
                                                    title='Huyết áp tâm thu'
                                                    content={<input
                                                        type="decimal"
                                                        placeholder="mmHg"
                                                        min={0}
                                                        className="w-full border border-slate-200 rounded-lg px-2 outline-none bg-transparent"
                                                        {...register('systolic_bp')}
                                                    />} />
                                                <DetailItem
                                                    title='Huyết áp tâm trương'
                                                    content={<input
                                                        type="decimal"
                                                        placeholder="mmHg"
                                                        min={0}
                                                        className="w-full border border-slate-200 rounded-lg px-2 outline-none bg-transparent"
                                                        {...register('diastolic_bp')}
                                                    />} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-3 flex flex-col gap-2">
                                        <DetailItem
                                            title='Triệu chứng'
                                            content={
                                                <textarea
                                                    type="text"
                                                    placeholder="Nhập dữ liệu"
                                                    min={0}
                                                    style={{ width: '650px', minHeight: 70 }}
                                                    className="w-full border border-slate-200 rounded-lg px-2 outline-none bg-transparent"
                                                    {...register('symptom')}
                                                />} />
                                        <DetailItem
                                            title='Chẩn đoán'
                                            content={
                                                <textarea
                                                    type="text"
                                                    placeholder="Nhập dữ liệu"
                                                    min={0}
                                                    style={{ width: '650px', minHeight: 70 }}
                                                    className="w-full border border-slate-200 rounded-lg px-2 outline-none bg-transparent"
                                                    {...register('diagnosis')}
                                                />} />
                                        <DetailItem
                                            title='Kê khai thuốc'
                                            content={<textarea
                                                type="text"
                                                placeholder="Nhập dữ liệu"
                                                min={0}
                                                style={{ width: '650px', minHeight: 70 }}
                                                className="w-full border border-slate-200 rounded-lg px-2 outline-none bg-transparent"
                                                {...register('prescription')}
                                            />} />
                                        {/* <DetailItem 
                                            title='Kết quả'
                                            content={fakeData.result} /> */}
                                        <DetailItem
                                            title='Dặn dò từ bác sĩ'
                                            content={
                                                <textarea
                                                    type="text"
                                                    placeholder="Nhập dữ liệu"
                                                    min={0}
                                                    style={{ width: '650px', minHeight: 70 }}
                                                    className="w-full border border-slate-200 rounded-lg px-2 outline-none bg-transparent"
                                                    {...register('note')}
                                                />
                                            }
                                        />
                                    </div>

                                </div>

                                <div className='flex flex-row justify-end gap-3'>
                                    <Button type="button" variant="outline" color='secondary'
                                        onClick={() => setOpenEdit()}
                                        disabled={loading} className='border border-red border-1 w-24 float-right rounded-md'>Hủy bỏ</Button>
                                    <Button type="submit" variant="contained" disabled={loading} className='w-24 float-right rounded-md'>Lưu</Button>
                                </div>

                            </form>
                        </div>
                    </div>
                </Modal>

            </div>
        </div >
    );
};

export default AppointmentsPage;