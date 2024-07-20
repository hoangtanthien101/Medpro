import BoxCustom from '../Box/Box';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import { ToastNotiError, getDate } from '../../utils/Utils';
import ButtonOutLine from '../Button/ButonOutLine';
import ReactBigCalendar from '../Calendar/Calendar';
import Factories from '../../services/FactoryApi';
import { Spin } from 'antd';


const ChooseDate = props => {
    const { goBack, data, watch, value, onChange } = props
    const [listData, setListData] = useState()
    const [listTime, setListTime] = useState();
    const [loading, setLoading] = useState();
    const [selectedValue, setSelectedValue] = useState();
    const watchValue1 = watch('Facility')
    const watchValue2 = watch('Doctor')
    const watchValue3 = watch('Service')
    const watchValue4 = watch('Specialty')
    const handleClickShift = (shiftId) => {
        onChange(shiftId)
    };

    useEffect(() => {
        if (
            watchValue1 &&
            watchValue2 &&
            watchValue3 &&
            watchValue4
        ) {
            let data = {
                dateStart: new Date(),
                branchId: watchValue1,
                doctorId: watchValue2._id,
                service: watchValue3,
                departmentId: watchValue4,
                status: 3,
            }
            fetchData(data)
        }
    }, [watchValue1, watchValue2, watchValue3, watchValue4]);

    const fetchData = async (data) => {
        setLoading(true)
        const response = await Factories.getSchedule(data);
        if (response) {
            const newDate = response?.map(item => (
                {
                    id: item._id,
                    title: `${getDate(item.timeStart, 6)}  - ${getDate(item.timeEnd, 6)}`,
                    start: new Date(item.timeStart),
                    end: new Date(item.timeEnd),
                    status: item.status,
                    service: item.service,
                    price: item.price,
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
            setLoading(false)
            setListData(newDate)
        } else {
            setLoading(false)
            ToastNotiError()
        }
    };

    function handleSelectEvent(event) {
        setSelectedValue(getDate(event.date, 1))
        const newData = listData.filter(item => item.date === event.date)
        setListTime(newData)
    }
    return (
        <div className="flex flex-col w-full bg-blue3 justify-center items-center ">
            <div className=" py-24 w-[80%] md:gap-4 md:flex-col lg:flex lg:flex-row justify-start items-start lg:gap-5">
                <div className='lg:w-[300px] md:w-full '>
                    <BoxCustom
                        title={<span className="text-xl">
                            Thông tin cơ sở y tế
                        </span>}
                        description={
                            <div className='flex flex-col gap-2'>
                                <span className="text-[#111] font-bold" >
                                    {props.data?.Branch?.name}
                                </span>
                                <span className="leading-4 text-sm" >
                                    {props.data?.Branch?.address}
                                </span>
                            </div>
                        }
                    />
                </div>

                <div className='w-full mt-4 lg:mt-0 flex flex-col gap-3 lg:w-full'>
                    <BoxCustom
                        title={<span className="text-xl">
                            Vui lòng chọn ngày khám / giờ khám
                        </span>}
                        description={
                            <div className='flex flex-col gap-2 w-full pt-3'>
                                {!selectedValue ?
                                    <>
                                        {loading ? <Spin className="my-10" size="large" />
                                            :
                                            <>
                                                <ReactBigCalendar
                                                    canView
                                                    onSelectEventDate={(event) => handleSelectEvent(event)}
                                                    data={listData}
                                                />
                                            </>
                                        }
                                    </>
                                    :
                                    <div className='flex flex-col gap-4'>
                                        <div className='flex flex-col gap-3'>
                                            <span className=' text-2xl font-bold'>
                                                Ngày khám đã chọn:
                                            </span>
                                        </div>
                                        <div className='flex flex-row gap-5 justify-start items-center'>
                                            <span className='text-2xl font-bold '>
                                                {selectedValue}
                                            </span>
                                            <div className='mt-2'>
                                                <ButtonOutLine size='small' borderRadius={6} onClick={() => setSelectedValue(null)}>
                                                    Chọn lại
                                                </ButtonOutLine>
                                            </div>
                                        </div>
                                        <span className='text-2xl font-bold' >
                                            Danh sách ca khám
                                        </span>
                                        <div className="flex flex-wrap gap-3">
                                            {loading ? <Spin className="my-10" size="large" />
                                                :
                                                <>
                                                    {listTime?.map(item =>
                                                        <ButtonOutLine key={item._id} size='small' borderRadius={6} onClick={() => handleClickShift(item)}>
                                                            {`${getDate(item.timeStart, 6)}  - ${getDate(item.timeEnd, 6)}`}
                                                        </ButtonOutLine>
                                                    )}
                                                </>
                                            }
                                        </div>
                                    </div>
                                }
                                <Button
                                    startIcon={<ArrowBackIosNewIcon />}
                                    onClick={goBack}
                                    className='w-28' >
                                    Quay lại
                                </Button>
                            </div>
                        }
                    />

                </div>
            </div>
        </div>
    );
};

export default ChooseDate;