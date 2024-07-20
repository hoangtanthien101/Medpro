import BoxCustom from '../Box/Box';
import DescriptionDoctor from '../Description/DescriptionDoctor/DescriptionDoctor';
import { Button } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useEffect, useState } from 'react';
import Factories from '../../services/FactoryApi';
import { ToastNotiError, searchNameWithoutVietnameseAccent } from '../../utils/Utils';
import { Spin } from 'antd';

const ChooseDoctor = props => {
    const { goBack, type = 1, valueBranch, value, onChangeDoctor } = props
    function handleChangeDoctor(item) {
        onChangeDoctor(
            {
                _id: item?._id,
                email: item?.email,
                fullName: item?.fullName,
                phone: item?.phone,
            }
        )
    }
    const [loading, setLoading] = useState();
    const [listData, setListData] = useState([]);
    const [listDataSearch, setListDataSearch] = useState([]);
    const [branchInfo, setBranchInfo] = useState();
    const fetchData = async (valueBranch, departmentId) => {
        setLoading(true)
        try {
            const response = await Factories.getBranchList(null, valueBranch);
            let branch = {
                _id: response._id,
                address: response.address,
                name: response.name,
            }
            setBranchInfo(branch);

            let list = [];
            if (type === 1) {
                list = response?.departments?.find(item => item?._id == departmentId)
                setListData(list?.doctors);
                setListDataSearch(list?.doctors)
            }
            else {
                response?.departments?.forEach(item => {
                    item?.doctors?.forEach(doctor => {
                        list.push(doctor);
                    });
                });
                const filteredArray = list.filter((obj, index, self) =>
                    index === self.findIndex((o) => o._id === obj._id)
                );
                setListData(filteredArray);
                setListDataSearch(filteredArray)

            }
            setLoading(false)
        } catch (error) {
            setLoading(false)
            ToastNotiError(error);
        }
    };
    useEffect(() => {
        fetchData(valueBranch, value);
    }, [value, valueBranch, type]);

    function searchDoctor(value) {
        setLoading(true)
        const search = value.trim()
        if (search) {
            const result = searchNameWithoutVietnameseAccent(listData, search);
            setListDataSearch(result);
        }
        else {
            setListDataSearch(listData)
        }
        setLoading(false)

    }
    return (
        <div className="flex flex-col w-full bg-blue3 justify-center items-center overflow-x-hidden ">
            <div className=" py-24 w-[70%] md:gap-4 md:flex-col lg:flex lg:flex-row justify-start items-start lg:gap-5">
                <div className='lg:w-[300px] md:w-full '>
                    <BoxCustom
                        title={<span className="text-xl">
                            Thông tin cơ sở y tế
                        </span>}
                        description={
                            <div className='flex flex-col gap-2'>
                                <span className="text-[#111] font-bold" >
                                    {branchInfo?.name}
                                </span>
                                <span className="leading-4 text-sm" >
                                    {branchInfo?.address}
                                </span>
                            </div>
                        }
                    />
                </div>

                <div className='w-full mt-4 lg:mt-0 flex flex-col gap-3 lg:w-full '>
                    <BoxCustom
                        title={<span className="text-xl">
                            Vui lòng chọn Bác sĩ
                        </span>}
                        description={
                            <div className='flex flex-col gap-2 w-full pt-3'>
                                {/* <InputSearch
                                    className="border rounded-md border-gray-light w-full "
                                    onChangeInput={(e) => searchDoctor(e)}
                                    placeholder={type == 1 ? 'Tìm kiếm chuyên khoa' : 'Tìm kiếm bác sĩ'}
                                /> */}

                                <div className=' overflow-hidden  gap-3 flex flex-col mt-4 w-full border-b border-b-gray-light mb-1'>
                                    {loading ? <Spin className="my-10" size="large" />
                                        : <>
                                            {type == 1 && listDataSearch?.map(item => (
                                                <BoxCustom
                                                    isCanHover={false}
                                                    key={item?._id}
                                                    onClick={() => handleChangeDoctor(item)}
                                                    description={<DescriptionDoctor data={item} />}
                                                />))
                                            }
                                            {type == 2 && listDataSearch?.map(item => (
                                                <BoxCustom
                                                    isCanHover={false}
                                                    key={item?._id}
                                                    onClick={() => handleChangeDoctor(item)}
                                                    description={<DescriptionDoctor data={item} />}
                                                />))
                                            }
                                        </>
                                    }
                                </div>
                                <Button
                                    startIcon={<ArrowBackIosNewIcon />}
                                    onClick={goBack}
                                    className='w-28'>Quay lại</Button>
                            </div>
                        }
                    />

                </div>
            </div>
        </div>
    );
};

export default ChooseDoctor;