import { useContext, useState } from 'react';
import Logo from '../../assets/logo/header_logop.svg';
import hp from '../../assets/logo/hp.svg'
import { useNavigate } from "react-router-dom";
import { useEffect } from 'react';
import debounce from 'lodash/debounce';
import DropdownHeader from '../Dropdown/DropdownHeader/DropdownHeader';
import { Link } from 'react-router-dom';
import { Divider, Dropdown } from 'antd';
import { Space } from 'antd';
import NotificationIcon from './NotificationHeader/NotificationIcon';
import { AuthContext } from '../../context/auth.context';
const Header = () => {
    const navigate = useNavigate();
    const [isHidden, setIsHidden] = useState(false);
    const { user } = useContext(AuthContext)
    useEffect(() => {
        // Sử dụng debounce để giảm tần suất gọi hàm handleScroll
        const debouncedHandleScroll = debounce(() => {
            const currentScrollY = window.scrollY;

            if (currentScrollY > 120) {
                setIsHidden(true);
            } else {
                setIsHidden(false);
            }
        }, 10);
        window.addEventListener('scroll', debouncedHandleScroll);
        return () => {
            window.removeEventListener('scroll', debouncedHandleScroll);
        };
    }, []);
    const goHome = () => {
        navigate("/");
    };

    const [items, setItems] = useState([
        {
            label: (
                <button onClick={() => navigate('/create-question')} target="_blank" rel="noopener noreferrer" to="/create-question">
                    Đặt câu hỏi
                </button>
            ),
            key: '1',
        },
        {
            label: (
                <button onClick={() => navigate('/question/1')} target="_blank" rel="noopener noreferrer" to="/create-question">
                    Câu hỏi của bạn
                </button >
            ),
            key: '2',
        },
        {
            label: (
                <button onClick={() => navigate('/question/3')} target="_blank" rel="noopener noreferrer" to="/question/3">
                    Tất cả hỏi đáp
                </button >
            ),
            key: '3',
        }
    ]);

    useEffect(() => {
        if (user?.role_id == 2) {
            const noAdd = items.find(item => item.key == '0')
            if (!noAdd) {
                const list = [...items];

                const newObj = {
                    label: (
                        <button onClick={() => navigate('/question/2')} target="_blank" rel="noopener noreferrer" to="/create-question">
                            Trả lời câu hỏi
                        </button>
                    ),
                    key: '0',
                };
                list.unshift(newObj);
                setItems(list);
            }
        }
    }, [user]);

    return (
        <div
            style={{
                backgroundColor: `rgba(255, 255 ,255, 0.88)`,
                // opacity: isHidden ? 0 : 1,
                transform: isHidden ? 'translateY(-56px) translateZ(0px)' : 'none',
                transition: 'display 0.25s ease-in-out, opacity 0.2s ease-in-out, transform 0.2s ease-in-out',
                zIndex: 999
            }}
            className='sticky top-0  z-20 w-full gap-7 justify-center items-center flex flex-row px-[5%] shadow-[0_10px_20px_rgba(0,0,0,0.04),0_2px_6px_rgba(0,0,0,0.04),0_0_1px_rgba(0,0,0,0.04)] '
        >
            <div className=""
                style={{
                    backgroundColor: `rgba(255, 255 ,255, 0.88)`,
                    // opacity: isHidden ? 0 : 1,
                    transform: isHidden ? 'translateY(26px) translateZ(0px)' : 'none',
                    transition: 'display 0.25s ease-in-out, opacity 0.2s ease-in-out, transform 0.2s ease-in-out',
                }}
            >
                <img onClick={goHome} className='cursor-pointer h-26 w-28' src={Logo} alt='logo' />
            </div>
            <div >
                <div className="flex flex-col items-center justify-between mr-auto  max-w-[90%]">
                    <div
                        className="h-[50px] bg-[rgba(255, 255 ,255, 0.88)] w-full flex flex-row gap-7 justify-between">
                        <div className="min-w-[600px] flex flex-row justify-start items-center"  >
                            <button className="h-6 inline-flex items-center gap-2 justify-center px-4 py-4 font-sans font-semibold tracking-wide text-white bg-blue-500 rounded-lg ">
                                <span>
                                    <svg width="28px" height="48px" viewBox="0 0 48 48" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                                        <title>Tiktok</title>
                                        <g id="Icon/Social/tiktok-black" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                                            <path d="M38.0766847,15.8542954 C36.0693906,15.7935177 34.2504839,14.8341149 32.8791434,13.5466056 C32.1316475,12.8317108 31.540171,11.9694126 31.1415066,11.0151329 C30.7426093,10.0603874 30.5453728,9.03391952 30.5619062,8 L24.9731521,8 L24.9731521,28.8295196 C24.9731521,32.3434487 22.8773693,34.4182737 20.2765028,34.4182737 C19.6505623,34.4320127 19.0283477,34.3209362 18.4461858,34.0908659 C17.8640239,33.8612612 17.3337909,33.5175528 16.8862248,33.0797671 C16.4386588,32.6422142 16.0833071,32.1196657 15.8404292,31.5426268 C15.5977841,30.9658208 15.4727358,30.3459348 15.4727358,29.7202272 C15.4727358,29.0940539 15.5977841,28.4746337 15.8404292,27.8978277 C16.0833071,27.3207888 16.4386588,26.7980074 16.8862248,26.3604545 C17.3337909,25.9229017 17.8640239,25.5791933 18.4461858,25.3491229 C19.0283477,25.1192854 19.6505623,25.0084418 20.2765028,25.0219479 C20.7939283,25.0263724 21.3069293,25.1167239 21.794781,25.2902081 L21.794781,19.5985278 C21.2957518,19.4900128 20.7869423,19.436221 20.2765028,19.4380839 C18.2431278,19.4392483 16.2560928,20.0426009 14.5659604,21.1729264 C12.875828,22.303019 11.5587449,23.9090873 10.7814424,25.7878401 C10.003907,27.666593 9.80084889,29.7339663 10.1981162,31.7275214 C10.5953834,33.7217752 11.5748126,35.5530237 13.0129853,36.9904978 C14.4509252,38.4277391 16.2828722,39.4064696 18.277126,39.8028054 C20.2711469,40.1991413 22.3382874,39.9951517 24.2163416,39.2169177 C26.0948616,38.4384508 27.7002312,37.1209021 28.8296253,35.4300711 C29.9592522,33.7397058 30.5619062,31.7522051 30.5619062,29.7188301 L30.5619062,18.8324027 C32.7275484,20.3418321 35.3149087,21.0404263 38.0766847,21.0867664 L38.0766847,15.8542954 Z" id="Fill-1" fill="#000000"></path>
                                        </g>
                                    </svg>
                                </span>
                                <span>Tiktok</span>
                            </button>
                            <div className='h-4 border-l-2 border-l-gray border-solid' />

                            <button className='h-6 inline-flex items-center gap-2 justify-center px-4 py-4 font-sans font-semibold tracking-wide text-white bg-blue-500 rounded-lg'>
                                <span>
                                    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 320 512" aria-label="Icon FaceBook" height="16" width="16" xmlns="http://www.w3.org/2000/svg"><path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"></path></svg>

                                </span>
                                <span>Facebook</span>
                            </button>
                            <div className='h-4 border-l-2 border-l-gray border-solid' />
                            <button className="h-6 inline-flex items-center gap-2 justify-center px-4 py-4 font-sans font-semibold tracking-wide text-white bg-blue-500 rounded-lg ">
                                <span>
                                    <svg width="28px" height="28px" viewBox="0 0 48 48" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                                        <title>Youtube</title>
                                        <g id="Icon/Social/youtube-black" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                                            <path d="M20.2838235,29.7208546 L20.2817697,19.3775851 L30.0092421,24.5671906 L20.2838235,29.7208546 Z M41.6409276,17.5856462 C41.6409276,17.5856462 41.2890436,15.0488633 40.2097727,13.9319394 C38.8405739,12.4655276 37.3060444,12.4583393 36.6026186,12.3724221 C31.5649942,12 24.008044,12 24.008044,12 L23.9922983,12 C23.9922983,12 16.4356904,12 11.398066,12.3724221 C10.6939556,12.4583393 9.16045298,12.4655276 7.79091194,13.9319394 C6.71164104,15.0488633 6.36009927,17.5856462 6.36009927,17.5856462 C6.36009927,17.5856462 6,20.5646804 6,23.5437145 L6,26.3365376 C6,29.3152295 6.36009927,32.2946059 6.36009927,32.2946059 C6.36009927,32.2946059 6.71164104,34.8310466 7.79091194,35.9483127 C9.16045298,37.4147246 10.9592378,37.3681718 11.7605614,37.5218644 C14.6406709,37.8042616 24.0001711,37.8915481 24.0001711,37.8915481 C24.0001711,37.8915481 31.5649942,37.8799099 36.6026186,37.5074878 C37.3060444,37.4219129 38.8405739,37.4147246 40.2097727,35.9483127 C41.2890436,34.8310466 41.6409276,32.2946059 41.6409276,32.2946059 C41.6409276,32.2946059 42,29.3152295 42,26.3365376 L42,23.5437145 C42,20.5646804 41.6409276,17.5856462 41.6409276,17.5856462 L41.6409276,17.5856462 Z" id="Shape" fill="#000000"></path>
                                        </g>
                                    </svg>
                                </span>
                                <span>Youtube</span>
                            </button>
                        </div>
                        <NotificationIcon />
                        <DropdownHeader isHidden={isHidden}>
                        </DropdownHeader>
                    </div>
                </div>
                <div className={`h-[70px] flex flex-row border-t-gray-light  border-solid ${!isHidden ? 'border-t' : ''}`}>
                    <div className="flex flex-row py-5  items-center gap-3">
                        <img className='h-10' src={hp} />
                        <div className="min-w-[160px] flex w-full flex-col justify-center">
                            <span className='font-bold'>Hỗ trợ đặt khám</span>
                            <span className='text-[25px] font-bold text-[#ffb54a] leading-[29.3px] mb-0'>19002225</span>
                        </div>
                    </div>
                    <div className="flex items-center w-full pl-5 flex-row">
                        <ul className="w-full flex items-center justify-end gap-1  ">

                            <Link to='/doctor' className="text-base li-menu cursor-pointer hover:text-blue flex items-center font-semibold flex-row">
                                <span>
                                    CHUYÊN GIA - BÁC SĨ
                                </span>

                            </Link>
                            <Divider type='vertical' style={{ background: '#111' }} />
                            <Dropdown
                                menu={{
                                    items,
                                }}
                            >
                                <a onClick={(e) => e.preventDefault()}>
                                    <Space>
                                        <button
                                            //  onClick={() => navigate('/question')} 
                                            className="text-base li-menu cursor-pointer hover:text-blue flex items-center font-semibold flex-row">
                                            HỎI ĐÁP
                                        </button>
                                        <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 1024 1024" aria-label="Icon Caret Down" height="15" width="15" xmlns="http://www.w3.org/2000/svg"><path d="M840.4 300H183.6c-19.7 0-30.7 20.8-18.5 35l328.4 380.8c9.4 10.9 27.5 10.9 37 0L858.9 335c12.2-14.2 1.2-35-18.5-35z"></path></svg>
                                    </Space>
                                </a>
                            </Dropdown>
                            <Divider type='vertical' style={{ background: '#111' }} />
                            <Link to='/booking' className="text-base li-menu cursor-pointer hover:text-blue flex items-center font-semibold flex-row">
                                ĐẶT LỊCH KHÁM
                            </Link>
                        </ul>
                    </div>
                </div>
            </div>

        </div >
    );
};

export default Header;