/* eslint-disable react/prop-types */
import Box from '../../Box/Box';
import { Image, Typography } from 'antd';
import { useForm } from 'react-hook-form';
import { Button } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import Constants from '../../../utils/constants';
import { useContext, useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getDistricts, getProvinces, getWards } from '../../../utils/Location/location';
import Factories from '../../../services/FactoryApi';
import { ToastNoti, ToastNotiError, getDate, uploadFirebase } from '../../../utils/Utils';
import { AuthContext } from '../../../context/auth.context';
const { Title } = Typography;
const UpdateProfilePatient = ({ data }) => {
    const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm();
    const { user } = useContext(AuthContext);

    const navigate = useNavigate()
    const watchProvince = watch('province')
    const [loading, setLoading] = useState()
    const watchDistrict = watch('district')
    const [provincesList, setProvincesList] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);
    const onSubmit = (value) => {
        setLoading(true);
        if (!data?._id) {
            savePatient(value);
        } else {
            updatePatient(value);
        }
        setLoading(false)
    };
    async function savePatient(value) {
        const newData = { ...value }
        if (fileUpload) {
            const url = await uploadFirebase(fileUpload);
            if (url) {
                newData.avatar = url
            }
        }
        const response = await Factories.createPatient(value);
        if (response?._id) {
            ToastNoti()
            navigate('/user?key=records')
        }

        if (response?.error) {
            ToastNotiError(response?.error)
        }
    }
    async function updatePatient(value) {
        const newData = { ...value }
        if (fileUpload) {
            const url = await uploadFirebase(fileUpload);
            if (url) {
                newData.avatar = url
            }
        }
        const response = await Factories.updatePatient(newData);
        if (response?._id) {
            ToastNoti()
            navigate('/user?key=records')
        }
        if (response?.error) {
            ToastNotiError(response?.error)
        }
    }
    useEffect(() => {
        setValue('userId', user?.id)
    }, [user])
    useEffect(() => {
        if (data) {
            setValue('fullName', data?.fullName)
            setValue('avatar', data?.avatar)
            setValue('_id', data?._id)
            setValue('dateOfBirth', getDate(data?.dateOfBirth, 2))
            setValue('phone', data?.phone)
            setValue('gender', data?.gender)
            setValue('job', data?.job)
            setValue('CCCD', data?.CCCD)
            setValue('email', data?.email)
            setValue('age', data?.age)
            setValue('nation', data?.nation)
            setValue('province', data?.province)
            setValue('district', data?.district)
            setValue('ward', data?.wards)
            setValue('address', data?.address)
        }
    }, [data])

    useEffect(() => {
        fetchDataDistrict(data?.province)
    }, [data?.province])

    useEffect(() => {
        fetchDataWard(data?.district)
    }, [data?.district])

    useEffect(() => {
        async function fetchData() {
            try {
                const provinces = await getProvinces();
                setProvincesList(provinces);
            } catch (error) {
                console.error("Error fetching provinces:", error);
            }
        }
        fetchData();
    }, []);

    async function fetchDataWard(ward) {
        try {
            const list = await getWards(ward);
            setWards(list);
        } catch (error) {
            console.error("Error fetching provinces:", error);
        }
    }
    useEffect(() => {
        fetchDataWard(watchDistrict);
    }, [watchDistrict]);

    async function fetchDataDistrict(pr) {
        try {
            const districtList = await getDistricts(pr);
            setDistricts(districtList);
        } catch (error) {
            console.error("Error fetching provinces:", error);
        }
    }
    useEffect(() => {
        fetchDataDistrict(watchProvince);
    }, [watchProvince]);


    const [fileUpload, setFileUpload] = useState();
    const [imageUrl, setImageUrl] = useState();
    const handleChange = (e) => {
        setFileUpload(e.target.files[0])
        const file = e.target.files[0];
        const url = URL.createObjectURL(file);
        setImageUrl(url);
    };
    return (
        <div className='flex flex-col justify-start  gap-2'>
            <Box
                description={'Vui lòng cung cấp thông tin chính xác để được phục vụ tốt nhất. Trong trường hợp cung cấp sai thông tin bệnh nhân & điện thoại, việc xác nhận cuộc hẹn sẽ không hiệu lực trước khi đặt khám.'}
            />
            <span className='text-red text-xl '>(*) Thông tin bắt buộc nhập</span>
            <form className="mt-4 flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-row gap-10 justify-between">
                    <div className='w-1/2 flex flex-col gap-4'>
                        <div className='w-full'>
                            <Title level={4}>Họ và tên (có dấu)*</Title>
                            <input
                                type="text"
                                placeholder="Hoàng Văn A"
                                className="w-full border border-slate-200 rounded-lg py-3 px-5 outline-none  bg-transparent"
                                {...register('fullName', { required: true })}
                            />
                            {errors.fullName && <span className="text-red">Bắt buộc nhập thông tin</span>}
                        </div>

                        <div className='w-full'>
                            <Title level={4}>Ngày sinh *</Title>
                            <input
                                type="date"
                                placeholder="mm/dd/yyyy"
                                className="w-full border border-slate-200 rounded-lg py-3 px-5 outline-none  bg-transparent"
                                {...register('dateOfBirth', { required: true })}
                            />
                            {errors.dob && <span className="text-red">Bắt buộc nhập thông tin</span>}
                        </div>
                    </div>
                    <div className='w-1/2'>
                        <div className='flex flex-col my-2 justify-end w-full items-end'>
                            <input
                                id="uploadInput"
                                type="file"
                                className='uploadInput'
                                style={{ display: 'none' }}
                                onChange={(e) => handleChange(e)}
                            />
                            <Image
                                src={imageUrl ? imageUrl : data?.avatar ? data?.avatar : ''}
                                alt="avatar"
                                style={{ width: 150, height: 150 }}
                                fallback="data:image/png;base64,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"
                            />
                            <label style={{ width: 150, padding: '2px 50px', border: '1px solid #111', borderRadius: 5 }} htmlFor="uploadInput" className='uploadButton'>
                                Upload
                            </label>
                        </div>
                    </div>

                </div>
                <div className="flex flex-row gap-10 justify-between">
                    <div className='w-1/2'>
                        <Title level={4}>Số điện thoại *</Title>
                        <input
                            type="tel" id="phone"
                            placeholder="09202020201"
                            className="w-full border border-slate-200 rounded-lg py-3 px-5 outline-none  bg-transparent"
                            {...register('phone', { required: true })}
                        />
                        {errors.phone && <span className="text-red">Bắt buộc nhập thông tin</span>}
                    </div>
                    <div className='w-1/2'>
                        <Title level={4}>Giới tính*</Title>
                        <select
                            type="text"
                            {...register('gender', { required: true })}
                            className="w-full border border-slate-200 rounded-lg py-3 px-3 outline-none  bg-transparent"
                        >
                            <option className='rounded-sm' value="">Chọn giới tính</option>
                            <option value="Male">Nam</option>
                            <option value="Female">Nữ</option>
                        </select>
                        {errors.gender && <span className="text-red">Bắt buộc nhập thông tin</span>}
                    </div>
                </div>

                <div className="flex flex-row gap-10 justify-between">
                    <div className='w-1/2'>
                        <Title level={4}>Nghề nghiệp *</Title>
                        <input
                            type="text"
                            placeholder="Nhập nghề nhiệp"
                            className="w-full border border-slate-200 rounded-lg py-3 px-5 outline-none  bg-transparent"
                            {...register('job', { required: true })}
                        />
                        {errors.job && <span className="text-red">Bắt buộc nhập thông tin</span>}
                    </div>
                    <div className='w-1/2'>
                        <Title level={4}>Số CMND/CCCD *</Title>
                        <input
                            type="number"
                            placeholder="Nhập số CMND/CCCD"
                            className="w-full border border-slate-200 rounded-lg py-3 px-5 outline-none  bg-transparent"
                            {...register('CCCD', { required: true })}
                        />
                        {errors.CCCD && <span className="text-red">Bắt buộc nhập thông tin</span>}
                    </div>
                </div>
                <div className="flex flex-row gap-10 justify-between">
                    <div className='w-1/2'>
                        <Title level={4}>Tuổi *</Title>
                        <input
                            type="number"
                            placeholder="Nhập tuổi"
                            className="w-full border border-slate-200 rounded-lg py-3 px-5 outline-none  bg-transparent"
                            {...register('age', { required: true })}
                        />
                        {errors.age && <span className="text-red">Bắt buộc nhập thông tin</span>}
                    </div>
                    <div className='w-1/2'>
                        <Title level={4}>Địa chỉ email</Title>
                        <input
                            type="email"
                            placeholder="nguyenvana@gmail.com"
                            className="w-full border border-slate-200 rounded-lg py-3 px-5 outline-none  bg-transparent"
                            {...register('email',)}
                        />
                        {errors.email && <span className="text-red">Bắt buộc nhập thông tin</span>}
                    </div>

                </div>
                <div className="flex flex-row gap-10 justify-between">

                    <div className='w-1/2'>
                        <Title level={4}>Dân tộc </Title>
                        <select
                            type="text"
                            placeholder="dd/mm/yyyy"
                            className="w-full border border-slate-200 rounded-lg py-3 px-3 outline-none  bg-transparent"
                            {...register('nation',)}
                        >
                            {Constants.nationVN?.map((item, index) => (
                                <option key={index} value={item?.value}>{item?.label}</option>
                            ))}
                        </select>
                        {errors.nation && <span className="text-red">Bắt buộc nhập thông tin</span>}
                    </div>
                    <div className='w-1/2'>
                        <Title level={4}>Tỉnh / Thành</Title>
                        <select
                            type="text"
                            placeholder="Chọn tỉnh / thành phố"
                            className="w-full border border-slate-200 rounded-lg py-3 px-3 outline-none  bg-transparent"
                            {...register('province')}
                        >
                            {provincesList?.map((item, index) => (
                                <option key={index} value={item?.value}>{item?.label}</option>
                            ))}
                        </select>
                        {errors.province && <span className="text-red">Bắt buộc nhập thông tin</span>}
                    </div>
                </div>

                <div className="flex flex-row gap-10 justify-between">
                    <div className='w-1/2'>
                        <Title level={4}>Quận / Huyện </Title>
                        <select
                            type="text"
                            placeholder="Chọn quận / huyện"
                            className="w-full border border-slate-200 rounded-lg py-3 px-3 outline-none  bg-transparent"
                            {...register('district')}
                        >
                            {districts?.map((item, index) => (
                                <option key={index} value={item?.value}>{item?.label}</option>
                            ))}
                        </select>
                        {errors.district && <span className="text-red">Bắt buộc nhập thông tin</span>}
                    </div>
                    <div className='w-1/2'>
                        <Title level={4}>Phường / Xã </Title>
                        <select
                            type="text"
                            placeholder="Chọn phường / xã"
                            className="w-full border border-slate-200 rounded-lg py-3 px-3 outline-none  bg-transparent"
                            {...register('ward')}
                        >
                            {wards?.map((item, index) => (
                                <option key={index} value={item?.value}>{item?.label}</option>
                            ))}
                        </select>
                        {errors.ward && <span className="text-red">Bắt buộc nhập thông tin</span>}
                    </div>
                </div>

                <div className="flex flex-row gap-10 justify-between">
                    <div className='w-full'>
                        <Title level={4}>Địa chỉ </Title>
                        <input
                            type="text"
                            placeholder="Nhập địa chỉ"
                            className="w-full border border-slate-200 rounded-lg py-3 px-3 outline-none  bg-transparent"
                            {...register('address')}
                        />
                        {errors.address && <span className="text-red">Bắt buộc nhập thông tin</span>}
                    </div>
                </div>

                <div className="flex flex-row items-end justify-between">
                    <Button
                        startIcon={<ArrowBackIosNewIcon />}
                        className='w-28' onClick={() => navigate(-1)}>Quay lại</Button>
                    <Button type="submit" variant="contained" disabled={loading} className='w-24 float-right rounded-md'>Lưu</Button>
                </div>
            </form >
        </div >
    );
};

export default UpdateProfilePatient;