import { Badge, Dropdown } from 'antd';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { NotificationContext } from '../../../context/Notification.context';
import { ClockCircleTwoTone } from '@ant-design/icons';
import { updateReadNotification } from '../../../services/FirebaseService';

const NotificationIcon = () => {
    const navigate = useNavigate()
    const { notifications } = useContext(NotificationContext)
    const [count, setCount] = useState(0);
    const [items, setItems] = useState([
        {
            label: (
                <div className='w-32 h-24 shadow-lg rounded-lg'  >
                    Không có tin nhắn
                </div>
            ),
            key: 0
        }
    ]);
    useEffect(() => {
        const newCount = notifications.filter(item => item.read === false).length
        const newList = notifications.map(item => ({
            label: (
                <button className='w-62 min-h-16  rounded-lg ' onClick={() => handleClickNoti(`${item?.path}/${item.action_id}`, item.toId)} target="_blank" rel="noopener noreferrer" >
                    <div className="flex flex-col min-h-16 justify-start center gap-1 " style={{ width: 350 }}>
                        <span className='text-justify font-bold text-blue2'>
                            {item.title}
                        </span>
                        <span className='text-right text-blue2 flex gap-1 justify-end'>
                            <ClockCircleTwoTone />
                            {item.createDate}
                        </span>
                    </div>
                </button>
            ),
            key: item.id
        }))
        newList.push({
            label: (
                <button className='w-62 h-4  rounded-lg ' onClick={() => navigate('/user?key=notifications')} target="_blank" rel="noopener noreferrer" >
                    <div className="flex flex-col min-h-3 items-center justify-center center gap-2 " style={{ width: 350 }}>
                        <span className='text-justify  font-bold'>
                            Xem tất cả tin nhắn
                        </span>
                    </div>
                </button>
            ),
            key: '9999'
        })
        setItems(newList)
        setCount(parseInt(newCount))
    }, [notifications]);

    function handleClickNoti(path, id) {
        updateReadNotification(id)
        navigate(path)
    }
    return (
        <Dropdown
            menu={{
                items,
            }}
        >
            <button className='mt-2 pl-2 rounded-full h-10 hover:bg-blue3 flex justify-center items-center'>
                <Badge count={count}>
                    <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill="#00b5f1"><path d="M2.45455 6.66669C2.45455 2.95644 5.35722 0 9 0C12.6428 0 15.5455 2.95644 15.5455 6.66669V9.1667C15.5455 10.2377 16.0013 10.8986 16.568 11.5529C16.6336 11.6285 16.7056 11.7093 16.7809 11.7937C17.0089 12.0493 17.2667 12.3384 17.4641 12.6199C17.748 13.0248 18 13.5319 18 14.1667C18 14.8736 17.5959 15.4234 17.1097 15.8111C16.6234 16.199 15.964 16.5047 15.2043 16.7441C14.3746 17.0055 13.366 17.2059 12.2104 17.3345C11.9168 18.878 10.6174 20 9 20C7.38259 20 6.08322 18.878 5.78958 17.3345C4.63396 17.2059 3.62536 17.0055 2.7957 16.7441C2.03598 16.5047 1.37664 16.199 0.890315 15.8111C0.404146 15.4234 0 14.8736 0 14.1667C0 13.5319 0.251957 13.0248 0.535923 12.6199C0.733335 12.3384 0.991113 12.0493 1.21907 11.7937C1.29437 11.7093 1.36641 11.6285 1.43195 11.5529C1.99874 10.8986 2.45455 10.2377 2.45455 9.1667V6.66669ZM7.54979 17.4688C7.81746 17.9941 8.351 18.3333 9 18.3333C9.649 18.3333 10.1825 17.9941 10.4502 17.4688C9.98356 17.4895 9.49965 17.5001 9 17.5001C8.50035 17.5001 8.01644 17.4895 7.54979 17.4688ZM9 1.66667C6.26096 1.66667 4.09091 3.87692 4.09091 6.66669V9.1667C4.09091 10.8457 3.31944 11.8932 2.65896 12.6556C2.55269 12.7782 2.45616 12.8865 2.36772 12.9857C2.16516 13.2129 2.00504 13.3924 1.86749 13.5886C1.69123 13.8399 1.63636 14.0099 1.63636 14.1667L1.63636 14.1668C1.63628 14.1706 1.63387 14.2873 1.89917 14.4989C2.16711 14.7126 2.61742 14.9433 3.2793 15.1519C4.59472 15.5663 6.55111 15.8334 9 15.8334C11.4489 15.8334 13.4053 15.5663 14.7207 15.1519C15.3826 14.9433 15.8329 14.7126 16.1008 14.4989C16.3661 14.2873 16.3637 14.1706 16.3636 14.1668L16.3636 14.1667C16.3636 14.0099 16.3088 13.8399 16.1325 13.5886C15.995 13.3924 15.8348 13.2129 15.6323 12.9857C15.5438 12.8865 15.4473 12.7782 15.341 12.6556C14.6806 11.8932 13.9091 10.8457 13.9091 9.1667V6.66669C13.9091 3.87692 11.739 1.66667 9 1.66667Z"></path></svg>
                </Badge>
            </button>
        </Dropdown>
    );
};

export default NotificationIcon;