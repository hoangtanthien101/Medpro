import { Avatar, Rate } from 'antd';
import Factories from '../../services/FactoryApi';
import { useEffect, useState } from 'react';
import { ToastNotiError, getDate } from '../../utils/Utils';
import { Star } from '@mui/icons-material';

const DoctorInfoFeedback = (props) => {
    const { id } = props
    const [dataList, setDataList] = useState([]);

    const fetchData = async () => {
        try {
            const response = await Factories.getFeedBack(id);
            if (response) {
                setDataList(response)
            }
        } catch (error) {
            ToastNotiError(error);
        }
    };
    useEffect(() => { fetchData() }, [id])

    return (
        <div className='flex flex-col min-w-[300]'>
            <div className="flex flex-col gap-2 justify-center items-center py-2">
                <span className="text-xl text-blue2 font-bold">Đánh giá từ bệnh nhân</span>
                {/* list */}
                {dataList?.map(item => (
                    <div key={item?._id} className="flex flex-col w-full p-2 gap-2 border-b rounded-md border-1 border-spacing-1">
                        <div className="flex flex-row gap-2">
                            <Avatar
                                src={item?.patient_avatar}
                                alt=""
                                style={{
                                    width: '50px',
                                    height: '50px',
                                    borderRadius: '50%',
                                    objectFit: 'fill'
                                }}
                                className="object-cover w-full h-full rounded-lg"
                            />
                            <div className="flex w-full flex-col justify-start items-center">

                                <div className="flex  w-full flex-row justify-between items-center">
                                    <span className='font-bold text-xl text-blue2'>
                                        <Rate value={item.star} />
                                    </span>
                                    <span className='font-bold  text-xs'>
                                        {getDate(item?.createdAt)}
                                    </span>
                                </div>

                                <span className='font-bold text-sm  text-left w-full '>
                                    {item?.comment}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}

            </div>
        </div>
    );
};

export default DoctorInfoFeedback;