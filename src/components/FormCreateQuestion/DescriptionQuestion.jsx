import { Typography } from 'antd';
import { useForm } from 'react-hook-form';
import { Button } from '@mui/material';
import { useContext, useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getDistricts, getProvinces, getWards } from '../../utils/Location/location';
import Factories from '../../services/FactoryApi';
import { ToastNotiError } from '../../utils/Utils';
import { AuthContext } from '../../context/auth.context';
const { Title } = Typography;
const DescriptionQuestion = () => {
    const [provincesList, setProvincesList] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);
    // const watchProvince = watch('ProvinceId')
    // const watchDistrict = watch('DistrictId')

    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    const [loading, setLoading] = useState()
    const navigate = useNavigate()
    const { user } = useContext(AuthContext);
    useEffect(() => {
        setValue('fullName', 'Hoàng Văn Nam')
        setValue('age', 22)
        setValue('phone', '0358014472')
        setValue('email', 'doctor4@gmail.com')
        setValue('content', 'Đối tượng nào nên đi khám sức khỏe định kỳ ?')
        setValue('gender', 'Female')
        setValue('title', 'Ai nên đi khám định kỳ')
    }, [])
    const onSubmit = async (data) => {
        setLoading(true)
        const newData = { ...data }
        try {
            if (user) {
                newData.user_id = user.id
            }
            const response = await Factories.createQuestion(newData);
            if (response?._id) {
                navigate('/question/1')
            } else {
                ToastNotiError(response?.message);
                setLoading(false)
            }
        } catch (error) {
            ToastNotiError(error);
            setLoading(false)
        }
    };

    // useEffect(() => {
    //     async function fetchData() {
    //         try {
    //             const provinces = await getProvinces();
    //             setProvincesList(provinces);
    //         } catch (error) {
    //             console.error("Error fetching provinces:", error);
    //         }
    //     }
    //     fetchData();
    // }, []);

    // useEffect(() => {
    //     async function fetchDataDistrict() {
    //         try {
    //             const list = await getWards(watchDistrict);
    //             setWards(list);
    //         } catch (error) {
    //             console.error("Error fetching provinces:", error);
    //         }
    //     }
    //     fetchDataDistrict();
    // }, [watchDistrict]);

    // useEffect(() => {
    //     async function fetchDataDistrict() {
    //         try {
    //             const districtList = await getDistricts(watchProvince);
    //             setDistricts(districtList);
    //         } catch (error) {
    //             console.error("Error fetching provinces:", error);
    //         }
    //     }
    //     fetchDataDistrict();
    // }, [watchProvince]);


    return (
        <div className='flex flex-col justify-start  gap-2'>
            {/* <BoxCustom
                description={'Vui lòng cung cấp thông tin chính xác để được phục vụ tốt nhất. Trong trường hợp cung cấp sai thông tin bệnh nhân & điện thoại, việc xác nhận cuộc hẹn sẽ không hiệu lực trước khi đặt khám.'}
            /> */}
            <span className='text-red text-xl '>(*) Thông tin bắt buộc nhập</span>
            <form className="mt-4 flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-row gap-10 justify-between">
                    <div className='w-1/2'>
                        <Title level={4}>Họ và tên (có dấu)*</Title>
                        <input
                            type="text"
                            placeholder="Hoàng Văn A"
                            className="w-full border border-slate-200 rounded-lg py-3 px-5 outline-none  bg-transparent"
                            {...register('fullName', { required: true })}
                        />
                        {errors.fullName && <span className="text-red">Bắt buộc nhập thông tin</span>}
                    </div>
                    <div className='w-1/2'>
                        <Title level={4}>Giới tính*</Title>
                        <select
                            type="text"
                            placeholder="dd/mm/yyyy"
                            className="w-full border border-slate-200 rounded-lg py-3 px-3 outline-none  bg-transparent"
                            {...register('gender', { required: true })}
                        >
                            <option className='rounded-sm' value="">Chọn giới tính</option>
                            <option value="Female">Nam</option>
                            <option value="Male">Nữ</option>
                            <option value="other">Khác</option>
                        </select>
                        {errors.gender && <span className="text-red">Bắt buộc nhập thông tin</span>}
                    </div>
                    <div className='w-1/2'>
                        <Title level={4}>Tuổi*</Title>
                        <input
                            type="number"
                            placeholder="Tuổi của bạn"
                            className="w-full border border-slate-200 rounded-lg py-3 px-5 outline-none  bg-transparent"
                            {...register('age', { required: true })}
                        />
                        {errors.age && <span className="text-red">Bắt buộc nhập thông tin</span>}
                    </div>
                </div>
                <div className="flex flex-row gap-10 justify-between">
                    <div className='w-1/2'>
                        <Title level={4}>Số điện thoại *</Title>
                        <input
                            type="number"
                            maxLength={10}
                            id="phone"
                            placeholder="09202020201"
                            pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                            className="w-full border border-slate-200 rounded-lg py-3 px-5 outline-none  bg-transparent"
                            {...register('phone', {
                                required: true,
                                minLength: 10, maxLength: 10
                            })}
                        />
                        {errors.phone && <span className="text-red">Bắt buộc nhập thông tin</span>}
                    </div>
                    <div className='w-1/2'>
                        <Title level={4}>Địa chỉ email *</Title>
                        <input
                            type="email"
                            placeholder="nguyenvana@gmail.com"
                            className="w-full border border-slate-200 rounded-lg py-3 px-5 outline-none  bg-transparent"
                            {...register('email', { required: true })}
                        />
                        {errors.email && <span className="text-red">Bắt buộc nhập thông tin</span>}
                    </div>
                </div>
                {/* <div className="flex flex-row gap-10 justify-between">
                    <div className='w-1/2'>
                        <Title level={4}>Tỉnh / Thành *</Title>
                        <select
                            type="text"
                            placeholder="Chọn tỉnh / thành phố"
                            className="w-full border border-slate-200 rounded-lg py-3 px-3 outline-none  bg-transparent"
                            {...register('ProvinceId', { required: true })}
                        >
                            {provincesList?.map((item, index) => (
                                <option key={index} value={item?.value}>{item?.label}</option>
                            ))}
                        </select>
                        {errors.ProvinceId && <span className="text-red">Bắt buộc nhập thông tin</span>}
                    </div>
                    <div className='w-1/2'>
                        <Title level={4}>Quận / Huyện *</Title>
                        <select
                            type="text"
                            placeholder="Chọn quận / huyện"
                            className="w-full border border-slate-200 rounded-lg py-3 px-3 outline-none  bg-transparent"
                            {...register('DistrictId', { required: true })}
                        >
                            {districts?.map((item, index) => (
                                <option key={index} value={item?.value}>{item?.label}</option>
                            ))}
                        </select>
                        {errors.DistrictId && <span className="text-red">Bắt buộc nhập thông tin</span>}
                    </div>
                </div> */}
                {/* <div className="flex flex-row gap-10 justify-between">
                    <div className='' style={{ width: 'calc(50% - 20px )' }}>
                        <Title level={4}>Phường / Xã *</Title>
                        <select
                            type="text"
                            placeholder="Chọn tỉnh / thành phố"
                            className="w-full border border-slate-200 rounded-lg py-3 px-3 outline-none  bg-transparent"
                            {...register('WardId', { required: true })}
                        >
                            {wards?.map((item, index) => (
                                <option key={index} value={item?.value}>{item?.label}</option>
                            ))}
                        </select>
                        {errors.WardId && <span className="text-red">Bắt buộc nhập thông tin</span>}
                    </div>

                </div> */}
                <div className="flex flex-row gap-10 justify-between">
                    <div className='w-full'>
                        <Title level={4}>Tiêu đề câu hỏi(*) </Title>
                        <input
                            className="w-full border  border-slate-200 rounded-lg py-3 px-3 outline-none  bg-transparent"
                            type="text"
                            placeholder="Tiêu đề câu hỏi"
                            {...register('title', { required: true })}
                        />
                        {errors.title && <span className="text-red">Bắt buộc nhập thông tin</span>}

                    </div>
                </div>
                <div className="flex flex-row gap-10 justify-between">
                    <div className='w-full'>
                        <Title level={4}>Nội dung câu hỏi(*) </Title>
                        <textarea
                            className="w-full border min-h-44 border-slate-200 rounded-lg py-3 px-3 outline-none  bg-transparent"
                            type="text"
                            placeholder="Nội dung hỏi đáp"
                            {...register('content', { required: true })}
                        />
                        {errors.content && <span className="text-red">Bắt buộc nhập thông tin</span>}

                    </div>
                </div>

                <div className="flex flex-row items-end justify-end">
                    <Button disabled={loading} type="submit" variant="contained" className='w-44 float-right rounded-md'>Gửi câu hỏi</Button>
                </div>
            </form>
        </div>
    );
};

export default DescriptionQuestion;