/* eslint-disable react/jsx-no-undef */
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { Button, Modal, Select, Cascader, Row, Col, message, Image, Form, Input, DatePicker, Upload } from "antd";

import classes from './Dropdown.module.scss'
import Constants from '../../utils/constants';
import { toast } from 'react-toastify';
import AccountFactories from '../../services/AccountFactories';
import { ToastNoti, ToastNotiError, uploadFirebase } from '../../utils/Utils';
import CategoriesFactories from '../../services/CategoriesFatories';
import Factories from '../../services/FactoryApi';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import ButtonCustom from '../Button/ButtonCustom';
import dayjs from 'dayjs';
import { v4 } from 'uuid';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from '../../firebase';


const formItemLayout = {
    labelCol: {
        xs: {
            span: 24
        },
        sm: {
            span: 6,
        },
    },
    wrapperCol: {
        xs: {
            span: 12,
        },
        sm: {
            span: 24,
        },
    },
};

const formItemLayoutWithOutLabel = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 20,
            offset: 6,
        },
    },
};

const ModalUpdate = ({ openUpdate, dataListBranch = [], onCloseUpdateModalHandler, updateSuccess = () => { }, data, type = 2 }) => {
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();
    const [imageUrl, setImageUrl] = useState();
    const [fileUpload, setFileUpload] = useState();
    useEffect(() => {
        if (data?._id) {
            setImageUrl(data?.avatar)
            form.setFieldsValue({
                fullName: data?.fullName,
                phone: data?.phone,
                branchId: data?.branchId,
                gender: data?.gender,
                email: data?.email,
                date: data?.date,
                academicRank: parseInt(data?.academicRank),
                dateOfBirth: dayjs(data?.dateOfBirth),
                specialize: data?.specialize,
                degree: data?.degree,
                experience: data?.experience,
                introduction: data?.introduction,
            });
        }
    }, [data?._id]);

    const handleChange = (e) => {
        setFileUpload(e.target.files[0])
        const file = e.target.files[0];
        const url = URL.createObjectURL(file);
        setImageUrl(url);
    };

    const onFinishFailed = () => {
        message.error('Submit failed!');
    };
    const onFinish = async (dataForm) => {
        setLoading(true)
        let newData = { ...dataForm }
        if (fileUpload) {
            const url = await uploadFirebase(fileUpload);
            if (url) {
                newData.avatar = url
            }
        }
        try {
            const response = await Factories.updateAccountInfo(newData, data._id);
            if (response._id) {
                ToastNoti()
                onCloseUpdateModalHandler();
                updateSuccess()
            } else {
                ToastNotiError(response.error)
            }
        } catch (error) {
            // fetchData()
            ToastNotiError(error);
        }
        setLoading(false)

    };
    const prefixSelector = (
        <Form.Item name="prefix" noStyle>
            <Select
                style={{
                    width: 70,
                }}
                value={84}
                defaultValue={"+84"}
            >
                <Option value="+84">+84</Option>
                <Option value="+86">+86</Option>
            </Select>
        </Form.Item>
    );
    return (
        <div className='ant-btn'>
            <Modal
                width={800}
                title="Cập nhật thông tin"
                open={openUpdate}
                onCancel={onCloseUpdateModalHandler}
                footer={[]}
            >
                <Form
                    {...formItemLayout}
                    variant="filled"
                    onFinishFailed={onFinishFailed}
                    form={form}
                    onFinish={onFinish}
                >

                    <div className="flex md:flex-row gap-10">
                        <div className="flex md:w-full mt-4 flex-col gap-2">

                            <Form.Item
                                label="Họ và tên BS"
                                name="fullName"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Bắt buộc nhập!',
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item
                                name="phone"
                                label="Số điện thoại"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Bắt buộc nhập!',
                                    },
                                ]}
                            >
                                <Input
                                    addonBefore={prefixSelector}
                                    style={{
                                        width: '100%',
                                    }}
                                />
                            </Form.Item>

                            <Form.Item
                                label="Email"
                                name="email"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Bắt buộc nhập!',
                                    },
                                    {
                                        type: 'email',
                                    },
                                ]}
                            >
                                <Input type="email" />
                            </Form.Item>



                            <Form.Item
                                name="gender"
                                label="Giới tính"
                                defaultvalue={'Male'}
                                rules={[
                                    {
                                        required: true,
                                        message: 'Chọn giới tính',
                                    },
                                ]}
                            >
                                <Select placeholder="Chọn giới tính">
                                    <Option value="Male">Nam</Option>
                                    <Option value="Female">Nữ</Option>
                                    <Option value="Other">Khác</Option>
                                </Select>
                            </Form.Item>

                            <Form.Item
                                label="Ngày sinh"
                                name="dateOfBirth"
                            >
                                <DatePicker placeholder="yyyy/mm/dd" />
                            </Form.Item>


                            <Form.Item
                                label="Nơi làm việc"
                                name="branchId"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Bắt buộc nhập!',
                                    },
                                ]}
                            >
                                <Select
                                    placeholder="Chọn nơi làm việc " options={dataListBranch} />
                            </Form.Item>

                            <Form.Item
                                label="Cấp bậc"
                                name="academicRank"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Bắt buộc nhập!',
                                    },
                                ]}
                            >
                                <Select placeholder="Chọn trình độ" options={Constants.levelDoctor} />
                            </Form.Item>

                            <Form.List
                                name="degree"
                                label='Bằng cấp'
                            // rules={[
                            //   {
                            //     validator: async (_, names) => {
                            //       if (!names || names.length < 2) {
                            //         return Promise.reject(new Error(''));
                            //       }
                            //     },
                            //   },
                            // ]}
                            >
                                {(fields, { add, remove }) => (
                                    <>
                                        {fields.map((field, index) => (
                                            <Form.Item
                                                {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                                                label={index === 0 ? 'Bằng cấp' : ''}
                                                required={false}
                                                key={field.key}
                                            >
                                                <Form.Item
                                                    {...field}
                                                    validateTrigger={['onChange', 'onBlur']}
                                                    rules={[
                                                        {
                                                            required: true,
                                                            whitespace: true,
                                                            message: "Hãy nhập tên bằng cấp hoặc xoá field này.",
                                                        },
                                                    ]}
                                                    noStyle
                                                >
                                                    <Input
                                                        placeholder="Nhập tên bằng cấp / chứng chỉ"
                                                        style={{
                                                            width: '90%',
                                                            paddingRight: 20
                                                        }}
                                                    />
                                                </Form.Item>
                                                {fields.length > 1 ? (
                                                    <MinusCircleOutlined
                                                        className="dynamic-delete-button"
                                                        onClick={() => remove(field.name)}
                                                    />
                                                ) : null}
                                            </Form.Item>
                                        ))}
                                        <div className=" " style={{ marginLeft: 160 }}>
                                            <Form.Item>
                                                <Button
                                                    type="dashed"
                                                    onClick={() => add()}
                                                    style={{
                                                        width: '60%',
                                                    }}
                                                    icon={<PlusOutlined />}
                                                >
                                                    Thêm bằng cấp
                                                </Button>
                                            </Form.Item>
                                        </div>
                                    </>
                                )}
                            </Form.List>

                            <Form.List
                                name="specialize"
                                label='Lĩnh vực chuyên môn'
                            // rules={[
                            //   {
                            //     validator: async (_, names) => {
                            //       if (!names || names.length < 2) {
                            //         return Promise.reject(new Error(''));
                            //       }
                            //     },
                            //   },
                            // ]}
                            >
                                {(fields, { add, remove }) => (
                                    <>
                                        {fields.map((field, index) => (
                                            <Form.Item
                                                {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                                                label={index === 0 ? 'Lĩnh vực chuyên môn' : ''}
                                                required={false}
                                                key={field.key}
                                            >
                                                <Form.Item
                                                    {...field}
                                                    validateTrigger={['onChange', 'onBlur']}
                                                    rules={[
                                                        {
                                                            required: true,
                                                            whitespace: true,
                                                            message: "Hãy nhập lĩnh vực hoặc xoá field này.",
                                                        },
                                                    ]}
                                                    noStyle
                                                >
                                                    <Input
                                                        placeholder="Nhập tên lĩnh vực"
                                                        style={{
                                                            width: '90%',
                                                            paddingRight: 20
                                                        }}
                                                    />
                                                </Form.Item>
                                                {fields.length > 1 ? (
                                                    <MinusCircleOutlined
                                                        className="dynamic-delete-button"
                                                        onClick={() => remove(field.name)}
                                                    />
                                                ) : null}
                                            </Form.Item>
                                        ))}
                                        <div className=" " style={{ marginLeft: 160 }}>
                                            <Form.Item>
                                                <Button
                                                    type="dashed"
                                                    onClick={() => add()}
                                                    style={{
                                                        width: '60%',
                                                    }}
                                                    icon={<PlusOutlined />}
                                                >
                                                    Thêm lĩnh vực
                                                </Button>
                                            </Form.Item>
                                        </div>
                                    </>
                                )}
                            </Form.List>



                            <Form.List
                                name="experience"
                                label='Lĩnh vực chuyên môn'
                            // rules={[
                            //   {
                            //     validator: async (_, names) => {
                            //       if (!names || names.length < 2) {
                            //         return Promise.reject(new Error(''));
                            //       }
                            //     },
                            //   },
                            // ]}
                            >
                                {(fields, { add, remove }) => (
                                    <>
                                        {fields.map((field, index) => (
                                            <Form.Item
                                                {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                                                label={index === 0 ? 'Kinh nghiệm làm việc' : ''}
                                                required={false}
                                                key={field.key}
                                            >
                                                <Form.Item
                                                    {...field}
                                                    validateTrigger={['onChange', 'onBlur']}
                                                    rules={[
                                                        {
                                                            required: true,
                                                            whitespace: true,
                                                            message: "Hãy nhập thông tin hoặc xoá field này.",
                                                        },
                                                    ]}
                                                    noStyle
                                                >
                                                    <Input
                                                        placeholder="Nhập thông tin"
                                                        style={{
                                                            width: '90%',
                                                            paddingRight: 20
                                                        }}
                                                    />
                                                </Form.Item>
                                                {fields.length > 1 ? (
                                                    <MinusCircleOutlined
                                                        className="dynamic-delete-button"
                                                        onClick={() => remove(field.name)}
                                                    />
                                                ) : null}
                                            </Form.Item>
                                        ))}
                                        <div className=" " style={{ marginLeft: 160 }}>
                                            <Form.Item>
                                                <Button
                                                    type="dashed"
                                                    onClick={() => add()}
                                                    style={{
                                                        width: '60%',
                                                    }}
                                                    icon={<PlusOutlined />}
                                                >
                                                    Thêm kinh nghiệm làm việc
                                                </Button>
                                            </Form.Item>
                                        </div>
                                    </>
                                )}
                            </Form.List>

                            <Form.Item
                                label="Giới thiệu về bác sĩ"
                                name="introduction"
                            >
                                <Input.TextArea />
                            </Form.Item>

                        </div>
                        <div className='flex flex-col my-2 justify-start items-center'>
                            {/* <input
                                id="uploadInput"
                                type="file"
                                className='uploadInput'
                                style={{ display: 'none' }}
                                onChange={(e) => handleChange(e)}
                            /> */}
                            <Image
                                src={imageUrl ?? ''}
                                alt="avatar"
                                style={{ width: 130, height: 130, borderRadius: '50%' }}
                                fallback="data:image/png;base64,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"
                            />
                            {/* <label style={{ padding: '2px 50px', border: '1px solid #111', borderRadius: 5 }} htmlFor="uploadInput" className='uploadButton'>
                                Upload
                            </label> */}
                        </div>
                    </div>
                    <Form.Item
                        wrapperCol={{
                            offset: 20,
                            span: 24,
                        }}
                    >
                        <ButtonCustom
                            type='submit'
                            htmlType="submit"
                            loading={loading}
                        >
                            Lưu thông tin
                        </ButtonCustom>
                    </Form.Item>
                </Form>
            </Modal >
        </div>

    )
}
export default ModalUpdate