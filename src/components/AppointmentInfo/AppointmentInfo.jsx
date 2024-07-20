import { useNavigate } from 'react-router-dom';
import DescriptionProfile from '../Description/DescriptionProfile/DescriptionProfile';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import BoxCustom from '../Box/Box';
import { Button } from '@mui/material';
import DetailItem from '../DetailItem/DetailItem';
import { convertStringToNumber, getDate } from '../../utils/Utils';
import Constants from '../../utils/constants';


const AppointmentInfo = (props) => {
    const { data, goBack, onClickPayment } = props
    const shiftInfo = data.Shift
    const doctorInfo = data.Doctor
    const patientInfo = data.Profile
    const navigate = useNavigate()
    return (
        <div className='w-full flex flex-col items-center justify-center py-10'>
            <div className='flex flex-col w-[80%] xl:w-[70%] xl:flex-row justify-center gap-4 '>
                <div className=" xl:w-1/3 w-full">
                    <BoxCustom
                        title='Thông tin cơ sỏ y tế'
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


                <div className="flex w-[full] xl:w-[100%] flex-col gap-4 ">
                    <BoxCustom
                        title='Thông tin lịch khám'
                        iconCol={false}
                        description={
                            <div className='flex flex-col'>
                                <DetailItem title='Chuyên khoa' content={shiftInfo?.departmentName} />
                                <DetailItem title='Dịch vụ' content={Constants.optionServices.find(item => item.value === parseInt(shiftInfo?.service))?.label} />
                                <DetailItem title='Bác sĩ' content={<span className='text-md text-yellow'>{doctorInfo?.fullName}</span>} />
                                <DetailItem title='Ngày khám' content={`${getDate(shiftInfo.timeStart)}  `} />
                                <DetailItem title='Thời gian khám' content={`${getDate(shiftInfo.timeStart, 6)} - ${getDate(shiftInfo.timeEnd, 6)}`} />
                                <DetailItem title='Chi phí khám' content={convertStringToNumber(shiftInfo?.price)} />
                            </div>
                        }
                    />
                    <BoxCustom
                        title='Thông tin bệnh nhân'
                        description={<DescriptionProfile data={patientInfo} />}
                    />
                    <div className="flex flex-row justify-between">
                        <Button
                            startIcon={<ArrowBackIosNewIcon />}
                            className='w-28' onClick={goBack}>Quay lại</Button>
                        <Button
                            variant="contained"
                            className='w-36' onClick={() => onClickPayment()}>Xác nhận</Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AppointmentInfo;

