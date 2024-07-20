import { Pagination } from '@mui/material';
import { Spin } from 'antd';
import { useEffect, useState } from 'react';
import CardCustom from '../../components/Card/CardCustom';
import InputSearch from '../../components/Input/InputSearch';
import Factories from '../../services/FactoryApi';
import { toast } from 'react-toastify';
import { ToastNotiError } from '../../utils/Utils';
import DescriptionDoctor from '../../components/Description/DescriptionDoctor/DescriptionDoctor';
import ButtonOutLine from '../../components/Button/ButonOutLine';
import { useNavigate } from 'react-router-dom';

const DoctorPage = () => {
    const [page, setPage] = useState(1);
    const [valueSearch, setValueSearch] = useState();
    const [dataList, setDataList] = useState([]);
    const [dataListPage, setDataListPage] = useState([]);
    const [dataListBranch, setDataListBranch] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()
    const fetchData = async (value) => {
        setLoading(true)
        try {
            const response = await Factories.getAccountList(value, 2);
            if (response) {
                setDataList(response);
            } else {
                toast.error('Hệ thống lỗi')
                console.error("API response does not contain expected data:", response);
            }
            setLoading(false)
        } catch (error) {
            toast.error('Hệ thống lỗi')
            setLoading(false)
        }
    };

    const fetchDataBranch = async (keyword) => {
        try {
            const response = await Factories.getBranchList(keyword);
            if (response) {
                const newDate = response?.map(item => ({
                    value: item._id,
                    label: item.name,
                }))
                setDataListBranch(newDate);
            }
        } catch (error) {
            ToastNotiError(error);
        }
    };

    useEffect(() => {
        fetchData();
        fetchDataBranch()
    }, []);

    function handleReload() {
        fetchData();
    }

    useEffect(() => {
        if (valueSearch && valueSearch !== '') {
            fetchData(valueSearch);
        }
        else {
            handleReload()
        }
    }, [valueSearch])


    useEffect(() => {
        // Tính chỉ số bắt đầu và kết thúc của trang hiện tại
        const startIndex = (page - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        // Dữ liệu của trang hiện tại
        const currentPageData = dataList.slice(startIndex, endIndex);
        setDataListPage(currentPageData)
    }, [page, dataList])


    const handleChangePage = (event, page) => {
        setPage(page);
    };
    const pageSize = 10;


    return (
        <div className="w-full flex flex-col justify-center items-center">
            <div className="w-[1000px] py-10 flex flex-col justify-center items-center">
                <span className='text-3xl text-blue2 font-bold '>
                    Chuyên Gia - Bác Sĩ
                </span>

                <span className='text-base '>
                    Với những cơ sở Y Tế hàng đầu sẽ giúp trải nghiệm khám, chữa bệnh của bạn tốt hơn
                </span>
                {/* input search */}
                <div className="my-8 w-[600px]" >
                    <InputSearch
                        className='border border-1 border-blue w-full'
                        onChangeInput={(e) => setValueSearch(e)}
                    />
                </div>

                {/* select search */}
                <div className="flex flex-col gap-2  w-full">
                    {loading ? <Spin></Spin> :
                        <>
                            {dataListPage?.map(item => (
                                <CardCustom
                                    key={item._id}
                                    showAvatar={false}
                                    // title={item.fullName}
                                    // src={item.avatar}
                                    content={<DescriptionDoctor data={item} />}
                                    // content={
                                    //     <ul className="w-[80%] flex flex-col">
                                    //         <li className="text-sm text-gray">Trưởng khoa</li>
                                    //         <li className="text-sm text-gray">Trung tâm Sơ sinh</li>
                                    //         <li className="text-sm text-gray">TTƯT.PGS.TS Triệu Triều Dương là chuyên gia hàng đầu ngành phẫu thuật tiêu hóa: phẫu thuật thực quản, dạ dày, ruột, gan mật tụy, đại trực tràng, hậu môn, sàn chậu</li>
                                    //     </ul>
                                    // }
                                    footer={
                                        <div className="flex mt-4 flex-row justify-center gap-2 items-center">
                                            <ButtonOutLine onClick={() => navigate(`/doctor/${item?._id}`)}> Xem chi tiết</ButtonOutLine>
                                        </div>
                                    }
                                />
                            ))}</>
                    }



                    <div className='w-full mt-4 flex justify-end float-right'>
                        <Pagination count={dataList.length <= pageSize ? 1 : Math.ceil(dataList.length / pageSize)} component="div" onChange={(e, page) => handleChangePage(e, page)} showFirstButton showLastButton />
                    </div>

                </div>
            </div>
        </div>
    );
};

export default DoctorPage;