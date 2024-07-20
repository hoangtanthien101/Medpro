import { Avatar, Select, Spin, Typography } from "antd";
import Box from "../../components/Box/Box";
import { useContext, useState } from "react";
import { useEffect } from "react";
import CardSpeciality from "../../components/Card/CardSpeciality";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";
import { ToastNoti, ToastNotiError } from "../../utils/Utils";
import Factories from "../../services/FactoryApi";
import { Button, Pagination } from "@mui/material";
import Constants from "../../utils/constants";
const { Title } = Typography;

const QuestionPage = () => {
    const { type } = useParams()
    // const [placeholder, setPlaceholder] = useState("Tìm kiếm với từ khoá ...");
    const { user } = useContext(AuthContext)
    const [valueDpSearch, setValueDpSearch] = useState();
    const [statusSearch, setStatusSearch] = useState();
    const [openID, setOpenId] = useState(1);
    const [valueDp, setValueDp] = useState();
    const [valueReply, setValueReply] = useState();
    const [loading, setLoading] = useState();
    const [questionList, setquestionList] = useState([]);
    const [questionListPage, setquestionListPage] = useState([]);
    const [dpList, setDpList] = useState([]);
    const [page, setPage] = useState(1);
    const pageSize = 10;
    useEffect(() => {
        // Tính chỉ số bắt đầu và kết thúc của trang hiện tại
        const startIndex = (page - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        // Dữ liệu của trang hiện tại
        const currentPageData = questionList?.slice(startIndex, endIndex);
        setquestionListPage(currentPageData)
    }, [page, questionList])


    const handleChangePage = (event, page) => {
        setPage(page);
    };

    useEffect(() => {
        if (statusSearch) {
            fetchData(null, null, statusSearch)
            setValueDpSearch()
        }
    }, [statusSearch])
    useEffect(() => {
        if (valueDpSearch) {
            setStatusSearch(2)
            fetchData(null, valueDpSearch, 2)
        }
    }, [valueDpSearch])
    async function handleSubmit(qId) {
        if (!valueDp) {
            ToastNotiError("Vui lòng chọn chuyên ngành cho câu hỏi")
        }
        if (!valueReply) {
            ToastNotiError("Vui lòng trả lời câu hỏi trước khi bấm lưu")
        }
        try {
            let data = {
                department_id: valueDp,
                reply: valueReply,
                doctor_id: user.id,
                id: qId,
                status: 2,
            }
            const response = await Factories.updateQuestion(data);
            if (response?._id) {
                ToastNoti()
            }
            fetchData(null, null, 1)
        } catch (error) {
            ToastNotiError(error);
        }
    }
    const fetchData = async (user_id, department_id, status) => {
        setLoading(true)
        try {
            let data = {}
            if (user_id) {
                data.user_id = user_id
            }
            if (department_id) {
                data.department_id = department_id
            }
            if (status) {
                data.status = status
            }
            const response = await Factories.getQuestion(data);
            setquestionList(response);
            setLoading(false)
        } catch (error) {
            setLoading(false)
            ToastNotiError(error);
        }
    };

    const fetchDataDp = async () => {
        setLoading(true)
        try {
            const response = await Factories.getDepartmentList();
            const newList = response.map(item => ({
                value: item._id,
                label: item.name
            }))
            setDpList(newList);
            setLoading(false)
        } catch (error) {
            setLoading(false)
            ToastNotiError(error);
        }
    };

    useEffect(() => { fetchDataDp() }, [])
    useEffect(() => {
        if (type == '1') {
            fetchData(user?.id)
        }
        else if (type == '2' && user?.role_id == 2) {
            fetchData(null, null, 1)
        } else {
            fetchData()
        }
    }, [type, user]);

    function handleChangeOpenId(id) {
        if (openID === id) {
            setOpenId(null)
        } else {
            setOpenId(id)
        }
    }
    // useEffect(() => {
    //     const timer = setTimeout(() => {
    //         setIndex(prevIndex => prevIndex + 1);
    //     }, 100); // Thay đổi tốc độ gõ ở đây (milliseconds)

    //     // Khi hiệu ứng đã hoàn thành, đặt index và placeholder lại
    //     if (index >= placeholder.length) {
    //         clearTimeout(timer);
    //         setIndex(0);
    //         setPlaceholder("Tìm kiếm với từ khoá ...");
    //     }

    //     return () => clearTimeout(timer);
    // }, [index, placeholder]);

    // useEffect(() => {
    //     if (!inputSearch || inputSearch === '') {
    //         setPlaceholder('Tìm kiếm với từ khoá ...')
    //     }
    // }, [inputSearch])
    // const handleInput = () => {
    //     setIndex(0);
    //     setPlaceholder("");
    // };

    // function handleChangeInput(e) {
    //     setInputSearch(e.target.value)
    // }

    // const handleChangePage = (event, page) => {
    //     setPage(page);
    // };

    // const navigate = useNavigate()
    // const handleClickCard = (value) => {
    //     navigate(`/question?sp=${value}`)

    // };

    function getLevel(id) {
        let name = Constants.levelDoctor.find(item => item.value == parseInt(id))?.label
        return name
    }
    return (
        <div className="p-10 w-full flex flex-col justify-center items-center">
            <div className="flex text-3xl text-blue">
                CHUYÊN MỤC HỎI ĐÁP
            </div>
            <div className="h-[2px] mt-2 w-44 bg-[#111]" />

            <div className='mt-10 flex justify-end gap-4 rounded-lg border-1 border border-blue2 bg-[#fff] p-2 w-[1000px]  '>
                <Select
                    onChange={setStatusSearch}
                    value={statusSearch}
                    className="w-36"
                    placeholder='Trạng thái'
                    options={Constants.labelStatusQuestion ?? []}
                />
                <Select
                    onChange={setValueDpSearch}
                    value={valueDpSearch}
                    className="min-w-52 w-fit"
                    placeholder='Chuyên ngành'
                    options={dpList ?? []}
                />
            </div>


            {/* input search */}
            {/* <div className="mt-8 w-[600px]" >
                <div className="flex items-center gap-5 w-[600px] border border-gray-200 rounded-3xl py-3 px-5">
                    <span className="flex-shrink-0 text-gray-500">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-6 h-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            />
                        </svg>
                    </span>
                    <input
                        type="text"
                        onChange={(e) => handleChangeInput(e)}
                        value={inputSearch}
                        className="w-full outline-none bg-transparent"
                        placeholder={placeholder.slice(0, index)}
                        onInput={handleInput}
                    />
                    <button onClick={() => setInputSearch('')} className=" border-none flex-shrink-0 text-slate-500">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-6 h-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>
                </div>
            </div> */}

            {/* <div className="flex flex-col p-10 w-[90%] justify-center ">
                <div className="flex flex-wrap w-full">
                    <CardSpeciality
                        onClick={() => handleClickCard(1)}
                        src={'https://tamanhhospital.vn/wp-content/uploads/2023/04/khoa-da-lieu.png'} title='Da Liễu' />
                    <CardSpeciality
                        onClick={() => handleClickCard(2)}
                        src={'https://tamanhhospital.vn/wp-content/uploads/2020/11/icon-khop.png'}
                        title='Xương khớp'
                    />
                    <CardSpeciality
                        onClick={() => handleClickCard(3)}
                        src={'https://tamanhhospital.vn/wp-content/uploads/2023/04/tai-mui-hong.png'}
                        title='Tai mũi Họng'
                    />
                    <CardSpeciality
                        onClick={() => handleClickCard(4)}
                        src={'https://tamanhhospital.vn/wp-content/uploads/2023/04/tai-mui-hong.png'}
                        title='Tai mũi Họng'
                    />
                    <CardSpeciality
                        onClick={() => handleClickCard(5)}
                        src={'https://tamanhhospital.vn/wp-content/uploads/2023/04/tai-mui-hong.png'}
                        title='Tai mũi Họng'
                    />
                    <CardSpeciality
                        src={'https://tamanhhospital.vn/wp-content/uploads/2023/04/tai-mui-hong.png'}
                        onClick={() => handleClickCard(6)}
                        title='Tai mũi Họng'
                    />
                    <CardSpeciality
                        src={'https://tamanhhospital.vn/wp-content/uploads/2023/04/khoa-da-lieu.png'} title='Da Liễu' />
                    <CardSpeciality
                        src={'https://tamanhhospital.vn/wp-content/uploads/2020/11/icon-khop.png'}
                        title='Xương khớp'
                    />
                    <CardSpeciality
                        src={'https://tamanhhospital.vn/wp-content/uploads/2023/04/tai-mui-hong.png'}
                        title='Tai mũi Họng'
                    />
                    <CardSpeciality
                        src={'https://tamanhhospital.vn/wp-content/uploads/2023/04/tai-mui-hong.png'}
                        title='Tai mũi Họng'
                    />
                    <CardSpeciality
                        src={'https://tamanhhospital.vn/wp-content/uploads/2023/04/tai-mui-hong.png'}
                        title='Tai mũi Họng'
                    />
                    <CardSpeciality
                        src={'https://tamanhhospital.vn/wp-content/uploads/2023/04/tai-mui-hong.png'}
                        title='Tai mũi Họng'
                    />
                </div>
            </div> */}
            {/* Hỏi đáp */}

            <div className="w-[1000px] py-10 flex flex-col justify-center items-center">
                <div className="w-full flex flex-col gap-4">
                    {loading ? <Spin /> : <>
                        {questionListPage?.map(item => (
                            <div key={item._id}>
                                <Box
                                    isCanHover={false}
                                    title={item?.title}
                                    description={item?.content}
                                    actions={[
                                        <button className="border-none" key={'show'} onClick={() => handleChangeOpenId(item._id)} type="button" >{type == '2' ? 'Trả lời câu hỏi ' : 'Xem câu trả lời'}</button>
                                    ]}
                                />

                                <div className={`p-6 bg-[#F0F2F1] z-10 relative w-full rounded-b-md transition-all duration-300 ${openID === item?._id ? 'top-[-10px]' : 'top-[100px]'} ${openID === item?._id ? 'opacity-100' : 'opacity-0'}  ${openID === item?._id ? '' : 'hidden'}`}>
                                    <div className="flex flex-col gap-2">
                                        {parseInt(item.status) == 1 && user?.role_id == 2 &&
                                            <>
                                                <Title level={4}>Xếp loại chuyên ngành *</Title>
                                                <Select
                                                    className="w-full border  border-slate-100 rounded-lg  outline-none  bg-transparent"
                                                    type="text"
                                                    placeholder='Chọn chuyên ngành'
                                                    onChange={(e) => setValueDp(e)}
                                                    options={dpList ?? []}
                                                />
                                                <Title level={4}>Trả lời câu hỏi *</Title>
                                                <textarea
                                                    className="w-full border min-h-44 border-slate-200 rounded-lg py-3 px-3 outline-none  bg-transparent"
                                                    type="text"
                                                    onChange={(e) => setValueReply(e.target.value)}
                                                    placeholder="Trả lời từ bác sĩ"
                                                />
                                                <div className="flex w-full justify-end">
                                                    <Button variant="contained" onClick={() => handleSubmit(item._id)}>Lưu câu trả lời</Button>
                                                </div>
                                            </>
                                        }

                                        {item?.reply ?
                                            <>
                                                <div className="flex flex-row gap-4">
                                                    <Avatar style={{ height: 70, width: 70 }} src={item?.doctor_id?.avatar} />
                                                    <div className="mt-2 flex flex-col gap-1">

                                                        <Link className="text-xl font-bold text-yellow"
                                                            to={`/doctor/${item?.doctor_id._id}`}
                                                        >BS.{item?.doctor_id?.fullName}</Link>
                                                        <span className="text-xl ">{getLevel(item?.doctor_id?.academicRank)}</span>
                                                        <span className="text-sm text-gray">{item?.branchName}</span>
                                                    </div>
                                                </div>
                                                <div className="mt-2 flex flex-row gap-4">
                                                    <span className="text-sm text-justify" style={{ whiteSpace: 'pre-line', }}>
                                                        {item?.reply}
                                                    </span>
                                                </div>
                                            </> :
                                            <span className="text-sm text-justify">
                                                {parseInt(user?.role_id) != 2 && 'Bác sĩ sẽ giải đáp trong thời gian sớm nhất'}
                                            </span>
                                        }
                                    </div>
                                </div>
                            </div>
                        ))}
                    </>}


                </div>
            </div>
            <div className='w-[1000px] mt-4 flex justify-end float-right'>
                <Pagination count={questionList?.length <= pageSize ? 1 : Math.ceil(questionList?.length / pageSize)} component="div" onChange={(e, page) => handleChangePage(e, page)} showFirstButton showLastButton />
            </div>
            {/* Paginaiton */}
            {/* <TablePagination
                component="div"
                count={100}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            /> */}
        </div >
    );
};

export default QuestionPage;