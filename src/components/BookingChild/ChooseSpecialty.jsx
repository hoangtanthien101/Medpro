import BoxCustom from '../Box/Box';
import InputSearch from '../Input/InputSearch';
import { Button } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { Spin } from 'antd';
import { useEffect, useState } from 'react';
import { ToastNotiError } from '../../utils/Utils';
import Factories from '../../services/FactoryApi';

const ChooseSpecialty = props => {
    const { value, valueDoctor, onChangeSpecialty, goBack } = props
    const [loading, setLoading] = useState();

    const [branchInfo, setBranchInfo] = useState();
    const [listData, setListData] = useState([]);
    const fetchData = async (input = null, value) => {
        setLoading(true)
        try {
            const response = await Factories.getBranchList(null, value, input);

            let branch = {
                _id: response._id,
                address: response.address,
                name: response.name,
            }
            setBranchInfo(branch);

            if (valueDoctor) {
                const newListDepartments = filterDataByDoctorId(response.departments, valueDoctor)
                setListData(newListDepartments);
            } else {
                setListData(response?.departments);
            }
            setLoading(false)
        } catch (error) {
            ToastNotiError(error);
            setLoading(false)
        }
    };

    function filterDataByDoctorId(listData, valueDoctor) {
        let filterData = []
        listData.forEach(element => {
            if (element.doctorIds.includes(valueDoctor)) {
                filterData.push(element)
            }
        });
        return filterData
    }
    function handleChangeSpecialty(id) {
        onChangeSpecialty(id, branchInfo)
    }

    useEffect(() => {
        fetchData(null, value);
    }, [value]);

    return (
        <div className="flex flex-col w-full bg-blue3 justify-center items-center ">
            <div className=" py-24 w-[80%] flex flex-row justify-start items-start gap-5">
                <div className='w-[200px]'>
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

                <div className='w-[80%] flex flex-col gap-3'>
                    <BoxCustom
                        title={<span className="text-xl">
                            Vui lòng chọn Chuyên Khoa
                        </span>}
                        description={
                            <div className='flex flex-col gap-2 w-full pt-3'>
                                <InputSearch
                                    className="border rounded-md border-gray-light w-full "
                                    placeholder='Tìm kiếm chuyên khoa'
                                    onChangeInput={(valueInput) => fetchData(valueInput, value)}
                                />
                                {loading ? <Spin className="my-10" size="large" />
                                    : <>
                                        <div>
                                            {listData?.map(item => (
                                                <div key={item._id} className='border-t border-t-gray-light py-4'>
                                                    <button onClick={() => handleChangeSpecialty(item._id)} className='border-none'>
                                                        <span className="w-full text-xl uppercase hover:text-blue2 text-[#111] font-bold">
                                                            {item.name}
                                                        </span>
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    </>
                                }


                                <Button
                                    startIcon={<ArrowBackIosNewIcon />}
                                    onClick={goBack}
                                    className='w-28'>
                                    Quay lại
                                </Button>
                            </div>
                        }
                    />


                </div>

            </div>
        </div>
    );
};

ChooseSpecialty.propTypes = {

};

export default ChooseSpecialty;