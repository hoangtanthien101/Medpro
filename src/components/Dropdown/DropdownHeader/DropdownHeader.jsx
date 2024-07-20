import { useContext, useState } from 'react';
import HM1 from '../../../assets/icon/header-menu-1.svg'
import HM2 from '../../../assets/icon/header-menu-2.svg'
import ICLG from '../../../assets/icon/ic-logout.svg'
import AVT from '../../../assets/icon/avatar.svg'
import { Popover } from '@mui/material';
import { NavLink } from 'react-router-dom';
import Login from '../../../pages/Login';
import { AuthContext } from '../../../context/auth.context';
import { useNavigate } from 'react-router-dom';

const DropdownHeader = () => {
    const [anchorEl, setAnchorEl] = useState(null)
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate()

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleLogout = () => {
        logout()
        // Also clear the local storage
        localStorage.removeItem("user");
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        handleClose()
        navigate('/')
    };
    const [isOpenLogin, setIsOpenLogin] = useState(false);
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return (
        <>
            <button className="flex flex-col items-center justify-center" onClick={handleClick}>
                <div
                    onClick={() => {
                        if (!user) {
                            setIsOpenLogin(true)
                        }
                    }
                    }
                    className="inline-flex rounded-2xl border border-solid  border-blue items-center gap-2 justify-center px-4 py-3 font-sans font-semibold tracking-wide text-blue bg-blue-500 h-[32px] w-fit"
                >
                    <span>
                        <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" aria-label="Icon User" height="15" width="15" xmlns="http://www.w3.org/2000/svg"><path d="M256 288c79.5 0 144-64.5 144-144S335.5 0 256 0 112 64.5 112 144s64.5 144 144 144zm128 32h-55.1c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16H128C57.3 320 0 377.3 0 448v16c0 26.5 21.5 48 48 48h416c26.5 0 48-21.5 48-48v-16c0-70.7-57.3-128-128-128z"></path></svg>
                    </span>
                    {user?.role_id == 2 ?
                        <span className='w-40  text-xs '>
                            BS.{user?.fullName ? user.fullName : 'Tài khoản'}
                        </span>
                        :
                        <span className='w-24  text-xs'>
                            {user?.fullName ? user.fullName : 'Tài khoản'}
                        </span>
                    }
                </div>
                {isOpenLogin &&
                    <Login isModalOpen={isOpenLogin} onClose={() => setIsOpenLogin(false)} />
                }
            </button>
            {user?.id &&
                <Popover
                    id={id}
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                >
                    <Popover
                        id={id}
                        open={open}
                        anchorEl={anchorEl}
                        onClose={handleClose}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'center',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'center',
                        }}

                    >
                        <div className="flex flex-col p-3 pr-5 bg-[hsla(0,0%,100%,0.9)] backdrop-blur-[10px] z-[-1] shadow-[0_0_1px_0_rgba(0,0,0,0.04),0_2px_6px_0_rgba(0,0,0,0.04),0_10px_20px_0_rgba(0,0,0,0.04)] rounded-lg">
                            <div className='flex justify-start flex-row'>
                                <div className="flex justify-center p-2 flex-col">
                                    <img
                                        src={user.avatar}
                                        width={50}
                                        height={50}
                                        style={{
                                            objectFit: 'fill'
                                        }}
                                    />
                                </div>
                                <div className="flex flex-col ">
                                    <span className='text-sm text-left'>Xin chào,</span>
                                    <span className="text-blue2 text-xl text-left">
                                        {user?.role_id == 2 ? `BS.${user.fullName}` : user.fullName}
                                    </span>
                                </div>
                            </div>
                            {/* <NavLink
                                to='/user?key=records'
                                onClick={() => handleClose()}
                                className="px-3 py-2 hover:bg-blue3 flex flex-row gap-2 items-center font-bold rounded cursor-pointer hover:text-blue-500 hover:bg-blue-50"
                            >
                                <img src={HM1} alt="" />
                                Hồ sơ bệnh nhân
                            </NavLink> */}

                            {user?.role_id == 2 ?
                                <>
                                    <NavLink
                                        to='/user?key=calendar'
                                        onClick={() => handleClose()}
                                        className="px-3 py-2 hover:bg-blue3 flex flex-row gap-2 items-center font-bold rounded cursor-pointer hover:text-blue-500 hover:bg-blue-50"
                                    >
                                        <img src={HM1} alt="" />
                                        Lịch làm việc
                                    </NavLink>
                                </> :
                                <>
                                    <NavLink
                                        to='/user?key=records'
                                        onClick={() => handleClose()}
                                        className="px-3 py-2 hover:bg-blue3 flex flex-row gap-2 items-center font-bold rounded cursor-pointer hover:text-blue-500 hover:bg-blue-50"
                                    >
                                        <img src={HM1} alt="" />
                                        Hồ sơ bệnh nhân
                                    </NavLink>
                                </>}
                            <NavLink
                                to='/user?key=appointment'
                                onClick={() => handleClose()}
                                className="px-3 py-2 hover:bg-blue3 flex flex-row gap-2 items-center font-bold rounded cursor-pointer hover:text-blue-500 hover:bg-blue-50"
                            >
                                <img src={HM2} alt="" />
                                Lịch hẹn khám bệnh
                            </NavLink>
                            <NavLink
                                to='/user?key=notifications'
                                onClick={() => handleClose()}
                                className="px-3 py-2 hover:bg-blue3 flex flex-row gap-2 items-center font-bold rounded cursor-pointer hover:text-blue-500 hover:bg-blue-50"
                            >
                                <img src={HM2} alt="" />
                                Thông báo
                            </NavLink>
                            <button
                                onClick={() => handleLogout()}
                                className="px-3 py-2 border-none hover:bg-blue3 text-red flex flex-row gap-2 items-center font-bold rounded cursor-pointer hover:text-blue-500 hover:bg-blue-50"
                            >
                                <img src={ICLG} alt="" />
                                Đăng xuất
                            </button>
                        </div>
                    </Popover>
                </Popover>
            }

        </>
    );
};

export default DropdownHeader;