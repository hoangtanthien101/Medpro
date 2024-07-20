import { Button, Pagination } from "@mui/material";
import InputSearch from "../Input/InputSearch";
import CardCustom from "../Card/CardCustom";
import ButonBooking from "../Button/ButonBooking";
import ButonOutLine from "../Button/ButonOutLine";
import { useState } from "react";
import BG1 from '../../assets/images/bg-book.png'
import IcLocation from '../../assets/icon/ic-location.svg'

const BookingWithDoctor = (props) => {
    const { onChangeDoctor } = props
    const [page, setPage] = useState(0);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    return (
        <div className="flex flex-col w-full bg-blue3 ">
            <div className="flex py-24 h-[500px]" style={{ background: `url(${BG1})`, backgroundSize: 'cover' }}>
                <div className='w-full flex flex-col items-left justify-start px-[20%] ' >
                    <div className="bg-[#fff] flex flex-col gap-3 w-[850px] cursor-pointer text-left p-8  rounded-3xl border border-[#fff] shadow-md">
                        <span className="flex flex-col text-4xl font-bold text-blue2">
                            Đặt khám theo bác sĩ
                        </span>
                        <span className="text-2xl  text-gray w-full leading-10">
                            Chủ động chọn bác sĩ mà bạn tin tưởng, an tâm khám bệnh
                        </span>
                    </div>
                </div >
            </div>

            <div className="flex flex-col justify-center items-center mt-14">
                <InputSearch />
                <div className="max-w-[95%] 2xl:max-w-[70%]  grid grid-cols-1 xl:grid-cols-2 gap-4 py-12 sm:w-full  rounded-2xl ">
                    <CardCustom
                        title='BS.CKII PHẠM LÊ MỸ HẠNH'
                        src="https://api.dicebear.com/7.x/miniavs/svg?seed=2"
                        content={
                            <div className="flex flex-col w-full">
                                <span className="text-sm text-gray">Trưởng khoa</span>
                                <span className="text-sm text-gray">Trung tâm Sơ sinh</span>
                                <span className="text-sm text-gray ">TTƯT.PGS.TS Triệu Triều Dương là chuyên gia hàng đầu ngành phẫu thuật tiêu hóa: phẫu thuật thực quản, dạ dày, ruột, gan mật tụy, đại trực tràng, hậu môn, sàn chậu</span>
                            </div>
                        }
                        footer={
                            <div className="flex mt-4 flex-row justify-center gap-2 items-center">
                                <ButonBooking />
                                <ButonOutLine> Xem chi tiết</ButonOutLine>
                            </div>
                        }
                    />
                    <CardCustom
                        title='BS.CKII PHẠM LÊ MỸ HẠNH'
                        src="https://api.dicebear.com/7.x/miniavs/svg?seed=2"
                        content={
                            <div className="flex flex-col w-full">
                                <span className="text-sm text-gray">Trưởng khoa</span>
                                <span className="text-sm text-gray">Trung tâm Sơ sinh</span>
                                <span className="text-sm text-gray ">TTƯT.PGS.TS Triệu Triều Dương là chuyên gia hàng đầu ngành phẫu thuật tiêu hóa: phẫu thuật thực quản, dạ dày, ruột, gan mật tụy, đại trực tràng, hậu môn, sàn chậu</span>
                            </div>
                        }
                        footer={
                            <div className="flex mt-4 flex-row justify-center gap-2 items-center">
                                <ButonBooking onClick={(id) => props.onChangeDoctor(1)} />
                                <ButonOutLine> Xem chi tiết</ButonOutLine>
                            </div>
                        }
                    />
                    <CardCustom
                        title='BS.CKII PHẠM LÊ MỸ HẠNH'
                        src="https://api.dicebear.com/7.x/miniavs/svg?seed=2"
                        content={
                            <div className="flex flex-col w-full">
                                <span className="text-sm text-gray">Trưởng khoa</span>
                                <span className="text-sm text-gray">Trung tâm Sơ sinh</span>
                                <span className="text-sm text-gray ">TTƯT.PGS.TS Triệu Triều Dương là chuyên gia hàng đầu ngành phẫu thuật tiêu hóa: phẫu thuật thực quản, dạ dày, ruột, gan mật tụy, đại trực tràng, hậu môn, sàn chậu</span>
                            </div>
                        }
                        footer={
                            <div className="flex mt-4 flex-row justify-center gap-2 items-center">
                                <ButonBooking />
                                <ButonOutLine> Xem chi tiết</ButonOutLine>
                            </div>
                        }
                    />
                </div>
                <Pagination className="pb-8" count={10} component="div" onChange={(e, page) => handleChangePage(e, page)} showFirstButton showLastButton />
            </div>
        </div>

    );
};

export default BookingWithDoctor;