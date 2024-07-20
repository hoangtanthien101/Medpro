import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
/* eslint-disable react/prop-types */
import DetailItem from '../../components/DetailItem/DetailItem';
import Constants from '../../utils/constants';
import { Avatar } from 'antd';
import { getDate } from '../../utils/Utils';
import BoxCustom from '../../components/Box/Box';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const PatientInfo = (props) => {
    const { data } = props
    const { users, List } = data
    const navigate = useNavigate()
    return (
        <div className='flex  w-full p-2'>
            <div className="w-full">
                <div>
                    <BoxCustom
                        title={
                            <div className='flex flex-row justify-between'>
                                <span>Thông tin bệnh nhân</span>
                            </div>
                        }
                        description={<div className="flex flex-row justify-between shadow-md p-6">
                            <div className="flex flex-col gap-3 ">
                                <div className="flex flex-col gap-3">
                                    <Avatar
                                        style={{ height: 100, width: 100 }}
                                        src={users.avatar ?? 'https://api.dicebear.com/7.x/miniavs/svg?seed=2'} />
                                </div>
                            </div>
                            <div className="flex flex-col gap-3 ">
                                <div className="flex flex-col gap-3">
                                    <DetailItem title='Họ và tên' content={users?.fullName} />
                                    <DetailItem title='Ngày sinh' content={getDate(users?.dateOfBirth)} />
                                    <DetailItem title='Số điện thoại' content={users?.phone} />
                                    <DetailItem title='Giới tính' content={Constants.optionSex?.find(item => item.value === users?.gender)?.label} />
                                </div>
                            </div>
                            <div className="flex flex-col gap-3">

                                <DetailItem title='CMND' content={users?.CCCD} />
                                <DetailItem title='Email' content={users?.email} />
                                <DetailItem title='Nghề Nghiệp' content={users?.job} />
                                <DetailItem title='Địa chỉ' content={users?.address} />
                                <DetailItem title='Dân tộc' content={Constants.nationVN?.find(item => item.value === parseInt(users?.nation))?.label} />
                            </div>
                        </div>}
                    />
                </div>

                <div className="flex mt-5 flex-col gap-5 justify-start items-center w-full">
                    {List?.map((itemD, index) =>
                    (
                        <>
                            <BoxCustom
                                key={index}
                                title={
                                    <div className='flex flex-row justify-between'>
                                        <span className='text-2xl'>Kết quả khám bệnh</span>
                                        <div className='flex flex-col gap-1 justify-end'>
                                            <span className='text-right' >{`${itemD?.branchName}`}</span>
                                            <span className='text-right'>{` ${getDate(itemD.date)} | ${getDate(itemD.timeStart, 6)} - ${getDate(itemD.timeEnd, 6)}`}</span>
                                        </div>
                                    </div>
                                }
                                description={
                                    <>
                                        {itemD?.status == 3.5 || itemD?.status == 4 ?
                                            <>
                                                <div className="flex  flex-col">
                                                    <div className="flex flex-col shadow-md">
                                                        <div className="flex flex-row mt-2  justify-start gap-12">
                                                            <div className="flex my-5 flex-row justify-start gap-44 w-full">
                                                                <div className="flex flex-col gap-4">
                                                                    <DetailItem title='Nhiệt độ' content={itemD?.temperature} />
                                                                    <DetailItem title='Tần số hô hấp' content={itemD?.respiratory_rate} />
                                                                    <DetailItem title='Chiều cao' content={itemD?.height} />
                                                                    <DetailItem title='Cân nặng' content={itemD?.weight} />
                                                                </div>
                                                                <div className="flex flex-col gap-4">
                                                                    <DetailItem title='Nhãn áp trái' content={itemD?.left_eye_power} />
                                                                    <DetailItem title='Nhãn áp phải' content={itemD?.right_eye_power} />
                                                                    <DetailItem title='Huyết áp tâm thu' content={itemD?.systolic_bp} />
                                                                    <DetailItem title='Huyết áp tâm trương' content={itemD?.diastolic_bp} />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="flex my-2 flex-col gap-4">
                                                            <DetailItem title='Triệu chứng' html content={itemD?.symptom} />
                                                            <DetailItem title='Chẩn đoán' content={itemD?.diagnosis} />
                                                            <DetailItem title='Kê khai thuốc' content={itemD?.prescription} />
                                                            <DetailItem title='Dặn dò từ bác sĩ' content={itemD?.note} />
                                                        </div>
                                                    </div>
                                                </div>
                                            </> : <><span>Đang chờ cập nhật của bác sĩ</span></>}
                                    </>
                                }
                            />

                        </>
                    )
                    )
                    }
                    <div className="flex w-full flex-row items-end justify-start">
                        <Button
                            startIcon={<ArrowBackIosNewIcon />}
                            className='w-28' onClick={() => navigate(-1)}>Quay lại</Button>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default PatientInfo;