import { useNavigate } from 'react-router-dom';
import { MailOutlined } from '@ant-design/icons';
import { useContext, useState } from 'react';
import Constants from '../../../utils/constants';
import { AuthContext } from '../../../context/auth.context';
import { getDate } from '../../../utils/Utils';
import { NotificationContext } from '../../../context/Notification.context';
import { Card } from 'antd';

const Notification = props => {
    const { isBooking = false, onClickBox } = props
    const navigator = useNavigate()
    const { notifications } = useContext(NotificationContext)
    const [open, setOpen] = useState();
    const { user } = useContext(AuthContext);


    return (
        <>
            <span className='font-bold text-xl'>
                Danh sách thông báo
            </span>
            <div className="mt-6 flex flex-col gap-4 w-[900px]">
                {notifications?.map(item => {
                    return (
                        <div key={item.id}>
                            <Card style={{ minHeight: 80, backgroundColor: item?.read ? 'white' : '#DFF5FF', border: '1px solid #00e0ff' }} bordered={false}>
                                <div className="flex flex-row gap-5  cursor-pointer" onClick={() => navigator(`${item.path}/${item.action_id}`)}>
                                    <div className='justify-center items-center flex flex-row bg-blue rounded-full w-10 h-10'>
                                        <MailOutlined style={{ color: 'white' }} />
                                    </div>
                                    <div className="flex flex-col  w-full">
                                        <span className='font-bold'>
                                            {item.title}
                                        </span>
                                        <div className="flex flex-row justify-end w-full">
                                            <span>
                                                {item.createDate}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    );
                })}
            </div >
        </>
    );
};

export default Notification;