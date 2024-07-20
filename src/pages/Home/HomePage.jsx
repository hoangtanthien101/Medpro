/* eslint-disable no-dupe-keys */
import { useEffect, useState } from 'react';
import Logo from '../../assets/logo/header_logo.svg'
import BG1 from '../../assets/images/bg_home_1.webp';
import IM1 from '../../assets/images/im-home-1.webp';
import IM2 from '../../assets/images/im-home-2.webp';
import IM3 from '../../assets/images/im-home-3.webp';
import BG3 from '../../assets/images/bg-home-3.webp';
import BG4 from '../../assets/images/bg_home_4.webp';
import DT4 from '../../assets/images/doctor_4.webp';
import CAL from '../../assets/images/bg_home-cal.webp';
import ICH2 from '../../assets/images/ic-home-2.webp';
import ICH3 from '../../assets/images/ic-home-3.webp';
import ICH4 from '../../assets/images/ic-home-4.webp';
import ICH5 from '../../assets/images/ic-home-5.webp';
import ICH6 from '../../assets/images/ic-home-6.webp';
import ICH7 from '../../assets/images/ic-home-7.webp';
import ICH8 from '../../assets/images/ic-home-8.webp';
import ICH9 from '../../assets/images/ic-home-9.webp';
import ICH10 from '../../assets/images/ic-home-10.webp';
import ICH11 from '../../assets/images/ic-home-11.webp';
import ICH12 from '../../assets/images/ic-home-12.webp';
import Contact from '../../assets/icon/contact.svg';
import ZLQR from '../../assets/icon/zaloqr.webp';
import FBQR from '../../assets/icon/fbqr.webp';
import Card from '../../components/Card/Card';
import ButonBooking from '../../components/Button/ButonBooking';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
    const [index, setIndex] = useState(0);
    const [placeholder, setPlaceholder] = useState("Tìm kiếm bác sĩ, chuyên khoa...");
    const navigate = useNavigate()
    useEffect(() => {
        const timer = setTimeout(() => {
            setIndex(prevIndex => prevIndex + 1);
        }, 100); // Thay đổi tốc độ gõ ở đây (milliseconds)

        // Khi hiệu ứng đã hoàn thành, đặt index và placeholder lại
        if (index >= placeholder.length) {
            clearTimeout(timer);
            setIndex(0);
            setPlaceholder("Tìm kiếm bác sĩ, chuyên khoa...");
        }

        return () => clearTimeout(timer);
    }, [index, placeholder]);

    // Ghi đè sự kiện onInput để bắt đầu hiệu ứng
    const handleInput = () => {
        setIndex(0);
        setPlaceholder("");
    };
    const navigator = useNavigate()
    return (
        <div className='w-full  flex  flex-col justify-center'>
            <div className='flex  flex-col justify-center items-center w-full h-[600px]' style={{ backgroundSize: 'cover', background: `url(${BG1})` }}>

                <div className='relative top-[50px]'>
                    <p className='text-xl text-[#1fb6ff] text-center font-bold '  >Nền tảng công nghệ</p>
                    <p className='text-3xl py-2 font-bold'>Kết nối người dân với Cơ sở - Dịch vụ Y tế   </p>
                    <div className="py-4 min-w-[600px] relative">
                        <span className="absolute top-2/4 left-4 -translate-y-2/4 text-slate-400">
                            <i className="fa-solid fa-magnifying-glass"></i>
                        </span>
                        <input
                            type="text"
                            className="pl-12 bg-transparent outline-none text-sm font-medium rounded-3xl p-4 w-full focus:border-blue-500 transition-all pr-14"
                            placeholder={placeholder.slice(0, index)}
                            onInput={handleInput}
                        />
                    </div>
                    <p className='text-sm text-center'>
                        Đặt khám nhanh - Lấy số thứ tự trực tuyến - Tư vấn sức khỏe từ xa
                    </p>
                </div>

                <div className="flex flex-col ">
                    <div className='relative pt-40'>
                        <div className="flex flex-row gap-4">
                            <button onClick={() => navigator('/booking?type=1')} className="w-32 h-32 hover:shadow  rounded-xl gap-3 flex-col bg-[#fff] flex justify-center items-center">
                                <img className='w-12' src={CAL} />
                                <p className='text-xs text-center  border-none w-[70px] break-all'>Đặt khám tại cơ sở</p>
                            </button>
                            <button onClick={() => navigator('/booking?type=2')} className="w-32 hover:shadow   h-32 rounded-xl gap-3 flex-col bg-[#fff] flex justify-center items-center">
                                <img className='w-12' src={ICH2} />
                                <p className='border-none text-xs text-center  w-[80px] break-all'>Đặt khám theo bác sĩ</p>
                            </button>
                            <button onClick={() => navigator('/question/3')} className="w-32 h-32 hover:shadow    rounded-xl gap-3 flex-col bg-[#fff] flex justify-center items-center">
                                <img className='w-12' src={ICH3} />
                                <p className='text-xs text-center w-[105px] break-all'>Tư vấn khám bệnh trực tuyến</p>
                            </button>
                            <div className="w-32 h-32 hover:shadow    rounded-xl gap-3 flex-col bg-[#fff] flex justify-center items-center">
                                <img className='w-12' src={ICH4} />
                                <p className='text-xs text-center  w-[67px] break-all'>Đặt lịch xét nghiệm</p>
                            </div>
                            <div className="w-32 h-32 hover:shadow    rounded-xl gap-3 flex-col bg-[#fff] flex justify-center items-center">
                                <img className='w-12' src={ICH5} />
                                <p className='text-xs text-center  w-[60px] break-all'>Gói khám sức khỏe</p>
                            </div>
                            <div className="w-32 h-32 hover:shadow    rounded-xl gap-3 flex-col bg-[#fff] flex justify-center items-center">
                                <img className='w-12' src={ICH6} />
                                <p className='text-xs text-center  w-[70px] break-all'>Đặt lịch tiêm chủng</p>
                            </div>
                        </div>
                    </div>

                </div>

            </div>

            <div className="flex flex-col justify-center items-center bg-[#e8f2f7] pb-24"
                style={{
                    background: '#E0EAFC',
                    background: '-webkit-linear-gradient(to top, #CFDEF3, #E0EAFC)',
                    background: 'linear-gradient(to top, #CFDEF3, #E0EAFC)',
                }}
            >
                {/* <div className="flex flex-col justify-center items-center bg-gradient-to-t from-blue-200 to-blue-300 pb-24"> */}

                <div className="w-3/4 max-w-[1100px] flex flex-col gap-10 mt-10  bg-[#fff] p-8 rounded-2xl">
                    <div className="flex flex-row justify-center w-full gap-10 ">
                        <div className="flex flex-col w-2/5">
                            <img className='w-[150px]' src={Logo} />
                            <span className='text-3xl w-[1/5] font-bold'>
                                Đặt khám nhanh
                            </span>
                        </div>
                        <span className='mt-4 text-gray-dark text-base w-full'>
                            <span className=' font-bold w-3/4'>
                                {`Medpro `}
                            </span>
                            cung cấp dịch vụ đặt lịch khám bệnh và chăm sóc sức khỏe trực tuyến tại các bệnh viện hàng đầu Việt Nam như Bệnh viện Đại học Y Dược TP.HCM, Bệnh viện Chợ Rẫy và Bệnh viện Nhi Đồng, giúp người dùng tự lựa chọn dịch vụ và bác sĩ theo nhu cầu của mình.
                        </span>
                    </div>
                    <div className='p-8 justify-center flex flex-wrap'>
                        <div
                            className="flex items-start justify-center gap-10 "
                        >
                            <div className="flex flex-col items-start">
                                <div className="flex w-80 mb-5 text-green-500  bg-green-50">
                                    <div
                                        className="h-[230px] w-[310px]"
                                    >
                                        <img
                                            src={IM1}
                                            alt=""
                                            className="object-cover w-full h-full rounded-lg"
                                        />
                                    </div>
                                </div>
                                <h3 className="w-80 text-2xl font-bold break-before-auto leading-7">Vì thời gian của bạn là vô giá</h3>
                                <p className="w-80 mt-2 text-gray-600 font-normal text-base leading-5">
                                    Bệnh nhân chủ động chọn thông tin đặt khám (ngày khám và giờ khám)
                                </p>
                            </div>
                            <div className="flex flex-col items-start">
                                <div className="flex w-80 mb-5 text-green-500  bg-green-50">
                                    <div
                                        className="h-[230px] w-[310px]"
                                    >
                                        <img
                                            src={IM2}
                                            alt=""
                                            className="object-cover w-full h-full rounded-lg"
                                        />
                                    </div>
                                </div>
                                <h3 className="w-80 text-2xl font-bold break-before-auto leading-7">Vì thời gian của bạn là vô giá</h3>
                                <p className="w-80 mt-2 text-gray-600 font-normal text-base leading-5">
                                    Bệnh nhân sẽ nhận phiếu khám trực tuyến ngay trên phần mềm
                                </p>
                            </div>
                            <div className="flex flex-col items-start">
                                <div className="flex w-80 mb-5 text-green-500  bg-green-50">
                                    <div
                                        className="h-[230px] w-[310px]"
                                    >
                                        <img
                                            src={IM3}
                                            alt=""
                                            className="object-cover w-full h-full rounded-lg"
                                        />
                                    </div>
                                </div>
                                <h3 className="w-80 text-2xl font-bold break-before-auto leading-7">Vì thời gian của bạn là vô giá</h3>
                                <p className="w-80  mt-2 text-gray-600 font-normal text-base leading-5">
                                    Người dùng chọn và thực hiện thanh toán trên phần mềm
                                </p>
                            </div>


                        </div>
                    </div>

                    <div className='p-8 rounded-2xl justify-center flex flex-col '
                        style={{
                            background: 'linear-gradient(84.1deg, #00b5f1 33.44%, #00e0ff 132.9%)'
                        }}
                    >
                        <div className="flex justify-center text-4xl font-bold text-center text-[#fff] ">Thống kê</div>
                        <div className="flex pt-10 flex-row justify-between flex-wrap">
                            <Card
                                src={ICH7}
                                title={'2.2M+'}
                                content={'Lượt khám'}
                            />
                            <Card
                                src={ICH8}
                                title={'40+'}
                                content={'Bệnh viện'}
                            />
                            <Card
                                src={ICH9}
                                title={'50+'}
                                content={'Cơ sở Y tế'}
                            />
                            <Card
                                src={ICH10}
                                title={'1000+'}
                                content={'Bác sĩ'}
                            />
                            <Card
                                src={ICH11}
                                title={'138K+'}
                                content={'Lượt truy cập tháng'}
                            />
                            <Card
                                src={ICH12}
                                title={'4600+'}
                                content={'Lượt truy cập trong ngày'}
                            />
                        </div>
                    </div>
                </div>


            </div>
            <img src={BG4} alt="" >
            </img>
            <img className='absolute top-[1800px] right-6 w-[533px] h-[520px]' src={DT4} />
            <div className="absolute top-[1900px] w-full flex justify-between px-20" >
                <div className="pl-[20%] pt-[6%] flex flex-col gap-2 p-4">
                    <span className='font-bold text-3xl ont-bold text-[#1fb6ff]'>
                        Đặt khám nhanh - Lấy số thứ tự trực tuyến
                    </span>
                    <span className='w-[600px]'>
                        Bệnh nhân chủ động chọn thông tin đặt khám nhanh (ngày khám, giờ khám và cơ sở y tế). Bệnh nhân sẽ nhận lấy số thứ tự trực tuyến ngay trên phần mềm
                    </span>
                    <ButonBooking onClick={() => navigate('/booking')} />
                </div>
            </div>

            <div className="relative top[-100px] w-full flex flex-col justify-center items-center pb-24"
                style={{
                    background: '#E0EAFC',
                    background: '-webkit - linear - gradient(to top, #CFDEF3, #E0EAFC)',
                    background: 'linear - gradient(to top, #CFDEF3, #E0EAFC)',
                }}
            >
                <div className="flex mt-20  p-2 rounded-xl justify-center items-center bg-[#fff]">
                    <div className="flex flex-col">
                        <img className='rounded-3xl' src={BG3}></img>
                        <div className="relative w-[800px] top-[-190px] justify-between items-center left-[340px] flex flex-row gap-4">
                            <div className="flex flex-col rounded-[50%] w-[70px] h-[70px] justify-center items-center bg-[#fff]">
                                <img className='w-[40px]' src={Contact} />
                            </div>
                            <div className="flex flex-col">
                                <span className='text-[#fff] font-normal text-3xl leading-7 whitespace-no-wrap uppercase m-0'>CÁC HÌNH THỨC HỖ TRỢ</span>
                                <span className='text-[#fff] mt-2 font-bold text-5xl mb-0'>1900-2115</span>
                            </div>
                            <div className="ml-10 flex flex-row gap-4">
                                <div className="flex flex-col bg-[#fff] p-2 rounded-xl ">
                                    <img className='w-20' src={ZLQR} alt="" />
                                    <span className='text-center'> Zalo</span>
                                </div>
                                <div className="flex flex-col bg-[#fff] p-2 rounded-xl ">
                                    <img className='w-20' src={FBQR} alt="" />
                                    <span className='text-center'> Facebook</span>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div >
        </div >
    );
};

export default HomePage;
