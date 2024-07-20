
import InputSearch from "../Input/InputSearch";
import CardCustom from "../Card/CardCustom";
import ButonBooking from "../Button/ButonBooking";
import ButtonOutLine from "../Button/ButonOutLine";
import { useEffect, useState } from "react";
import BG1 from '../../assets/images/bg-book.png'
import IcLocation from '../../assets/icon/ic-location.svg'
import Factories from "../../services/FactoryApi";
import { ToastNotiError } from "../../utils/Utils";
import { Spin } from "antd";

const BookingAtFacility = (props) => {
    const { type, onChangeFacility } = props
    const [page, setPage] = useState(0);
    const [listData, setListData] = useState([]);
    const [loading, setLoading] = useState();
    const fetchData = async (keyword) => {
        try {
            setLoading(true)
            const response = await Factories.getBranchList(keyword);
            setListData(response);
            setLoading(false)
        } catch (error) {
            ToastNotiError(error);
        }
    };
    useEffect(() => {
        fetchData();
    }, []);
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const handleClickFacility = (id) => {
        onChangeFacility(id)
    };
    return (
        <div className="flex flex-col w-full bg-blue3 ">
            <div className="flex py-24 h-[300px]" style={{ background: `url(${BG1})`, backgroundSize: 'cover' }}>
                <div className='w-full flex flex-col items-left justify-start px-[20%] ' >
                    <div className="bg-[#fff] flex flex-col gap-3 w-[850px] cursor-pointer text-left p-8  rounded-3xl border border-[#fff] shadow-md">
                        <span className="flex flex-col text-4xl font-bold text-blue2">
                            Đặt khám theo  {`${parseInt(type) === 1 ? 'cơ sở' : 'bác sĩ'}`}
                        </span>
                        <span className="text-2xl  text-gray w-full leading-10">
                            Đặt khám nhanh chóng, tiết kiệm thời gian, an toàn tiện lợi
                        </span>
                    </div>
                </div >
            </div>

            <div className="flex flex-col justify-center items-center mt-14 ">
                <InputSearch onChangeInput={(value) => fetchData(value)} />
                {loading ? <Spin className="my-10" size="large" />
                    :
                    <>
                        <div className="max-w-[80%] 2xl:max-w-[70%]  grid grid-cols-1 xl:grid-cols-2 gap-4 py-12 sm:w-full  rounded-2xl ">
                            {listData?.map(item => (
                                <CardCustom
                                    key={item?._id}
                                    title={item?.name}
                                    src={item?.image}
                                    content={
                                        <span className="flex flex-row gap-1 justify-start items-start">
                                            <img src={IcLocation} className="mt-1" />
                                            {item?.address}
                                        </span>
                                    }
                                    footer={
                                        <div className="flex mt-4 flex-row justify-center gap-2 items-center">
                                            <ButonBooking
                                                onClick={() => handleClickFacility(item?._id)}
                                            />
                                            {/* <ButonOutLine> Xem chi tiết</ButonOutLine> */}
                                        </div>
                                    }
                                />
                            ))}
                        </div>
                    </>
                }

                {/* <Pagination className="pb-8" count={10} component="div" onChange={(e, page) => handleChangePage(e, page)} showFirstButton showLastButton /> */}
            </div>
        </div>

    );
};

export default BookingAtFacility;