import { Link } from 'react-router-dom';
import HM1 from '../../assets/icon/header-menu-1.svg'
import HM2 from '../../assets/icon/header-menu-2.svg'
import ICNT from '../../assets/icon/ic-noti.svg'
import { useLocation } from 'react-router-dom';
import Record from '../../components/ProfileChild/Record/Record';
import Bill from '../../components/ProfileChild/Record/Bill/Bill';
import Notification from '../../components/ProfileChild/Record/Notification';
import { useContext } from 'react';
import { AuthContext } from '../../context/auth.context';
import DoctorCalendar from '../../components/ProfileChild/Record/DoctorCalendar';
const Profile = () => {
    const location = useLocation();
    const queryParameters = new URLSearchParams(location.search);
    const type = queryParameters.get("key");
    const { user } = useContext(AuthContext);

    return (
        <div className='py-10 justify-center w-full flex flex-row'>
            <div className='flex px- justify-start flex-col'>
                {user?.role_id == 2 ?
                    <Link
                        to='/user?key=calendar'
                        className="px-3 py-2 hover:bg-blue3 flex flex-row gap-2 items-center font-bold rounded cursor-pointer hover:text-blue-500 hover:bg-blue-50"
                    >
                        <img src={HM1} alt="" />
                        Lịch làm việc
                    </Link>
                    :
                    <Link
                        to='/user?key=records'
                        className="px-3 py-2 hover:bg-blue3 flex flex-row gap-2 items-center font-bold rounded cursor-pointer hover:text-blue-500 hover:bg-blue-50"
                    >
                        <img src={HM1} alt="" />
                        Hồ sơ bệnh nhân
                    </Link>
                }

                <Link
                    to='/user?key=appointment'
                    className="px-3 py-2 hover:bg-blue3 flex flex-row gap-2 items-center font-bold rounded cursor-pointer hover:text-blue-500 hover:bg-blue-50"
                >
                    <img src={HM2} alt="" />
                    Lịch hẹn khám bệnh
                </Link>
                <Link
                    to='/user?key=notifications'
                    className="px-3 py-2 hover:bg-blue3 flex flex-row gap-2 items-center font-bold rounded cursor-pointer hover:text-blue-500 hover:bg-blue-50"
                >
                    <img src={ICNT} alt="" />
                    Thông báo
                </Link>
            </div>
            <div className='px-6 border-l border-l-gray-light flex justify-start flex-col'>
                {type === 'calendar' && <DoctorCalendar value={0} onClickBox={() => { }} />}
                {type === 'records' && <Record value={0} onClickBox={() => { }} />}
                {type === 'appointment' && <Bill />}
                {type === 'notifications' && <Notification />}
            </div>
        </div>
    );
};

export default Profile;