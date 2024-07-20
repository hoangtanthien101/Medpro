import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Select, Input, Modal } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import AccountFactories from "../../services/AccountFactories";
import { toast } from "react-toastify";
import { ToastNotiError } from "../../utils/Utils";
import { useTranslation } from "react-i18next";
import Message from "../../components/UI/Message/Message";
const Register = (props) => {
  const [userInput, setUserInput] = useState({
    phone: "",
    password: "",
  });
  const [open, setIsOpen] = useState(true)
  const [loading, setLoading] = useState(false)
  const { t } = useTranslation()
  useEffect(() => {
    setIsOpen(props.isModalOpen)
  }, [props.isModalOpen])
  const handleCancel = () => {
    props.onClose();
  };
  const [showMessage, setShowMessage] = useState({
    status: false,
    type: '',
    content: '',
  })

  const changeMessage = () => {
    setShowMessage({
      status: false,
      type: '',
      content: '',
    })
  }

  const createErrorMessage = (msg) => {
    setShowMessage({ status: true, type: 'error', content: msg })
  }

  const inputChangeHandler = (event) => {
    setUserInput((prevState) => {
      return {
        ...prevState,
        [event.target.name]: event.target.value,
      };
    });
  };

  const navigator = useNavigate()

  const validateUserInput = (userInput) => {
    let res = true;
    let errMsg = '';
    if (!userInput.phone) {
      errMsg = 'Hãy nhập số điện thoại';
    }
    else if (userInput.phone.length < 9 || userInput.phone.length > 10) {
      errMsg = 'Số điện thoại không đúng định dạng';
    }
    else if (!userInput.password) {
      errMsg = 'Hãy nhập mật khẩu';
    }
    else if (userInput.password.length > 32 || userInput.password.length < 6) {
      errMsg = 'Độ dài mật khẩu từ 6 đến 36 ký tự';
    }
    else if (!userInput.confirmPassword) {
      errMsg = 'Hãy nhập mật khẩu để xác nhận';
    }
    else if (userInput.password !== userInput.confirmPassword) {
      errMsg = 'Nhập đúng mật khẩu';
    }
    if (errMsg) {
      createErrorMessage(errMsg)
      res = false;
    }
    return res;
  }

  const registerWithCredentials = async () => {
    setLoading(true)
    try {
      const response = await AccountFactories.requestLSignUp(userInput);
      if (response?._id) {
        toast.success(t('Đăng ký tài khoản thành công'))
        setLoading(false)
        handleCancel()
      }
      else if (response) {
        toast.error(response?.error)
        setLoading(false)
      }
    } catch (error) {
      ToastNotiError();
      setLoading(false)
    }

    // try {
    //   const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    //   const user = userCredential.user;
    //   if (user) {
    //     // await sendEmailVerification(user);
    //     const response = await AccountFactories.requestLSignUp(userInput);
    //     if (response?.status === 200) {
    //       toast.success('Đăng ký thành công! Vui lòng kiểm tra email để xác thực tài khoản.')
    //     }
    //     else{
    //       toast.success('Có lỗi xảy ra. Vui lòng thử lại sau.')
    //     }
    //   }
    //   navigator('/login');
    // } catch (error) {
    //   setShowMessage({
    //     status: true,
    //     type: "error",
    //     content: `Đăng ký thất bại: Địa chỉ email đã được sử dụng`,
    //   });
    // }
  }


  const handleRegister = (event) => {
    if (event) {
      event.preventDefault();
    }
    if (validateUserInput(userInput)) {
      registerWithCredentials(userInput);
    }
  }

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select
        value={84}
        defaultValue={'+84'}
        style={{
          width: 70,
        }}
      >
        <Option value="+84">+84</Option>
        <Option value="+87">+87</Option>
      </Select>
    </Form.Item>
  );
  return (
    <>
      <Message
        status={showMessage.status}
        type={showMessage.type}
        content={showMessage.content}
        changeMessage={changeMessage}
      />
      <Modal
        open={open}
        onCancel={handleCancel}
        footer={[
          <></>
        ]}
      >
        <form onSubmit={handleRegister} className="w-full">
          <div className='form-top flex flex-col gap-4'>
            <h1 className="font-bold text-4xl text-blue  my-4" style={{ textAlign: 'center' }}>{t('Thông tin đăng ký')}</h1>
            <Input
              addonBefore={prefixSelector}
              name='phone'
              onChange={inputChangeHandler}
              style={{
                width: '100%',
                borderRadius: 8,
                border: '2px solid #1fb6ff',
              }}
            />
            <div className="mt-3">
              <Input.Password
                name="password"
                onChange={inputChangeHandler}
                placeholder="Enter your password"
                className='input-register'
                style={{
                  width: '100%',
                  borderRadius: 8,
                  border: '2px solid #1fb6ff',
                }}
                iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
              />
            </div>
            <div className="mt-3">
              <Input.Password
                name="confirmPassword"
                onChange={inputChangeHandler}
                placeholder="Confirm your password"
                className='input-register'
                style={{
                  width: '100%',
                  borderRadius: 8,
                  border: '2px solid #1fb6ff',
                }}
                iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
              />
            </div>
          </div>
          <div className='form-bottom mt-6'>
            <div className="register-form__control">
              <button className="w-full px-10 py-2 text-2xl font-bold bg-blue2 text-gray-light hover:bg-blue transition-all duration-300 hover:text-[#fff] rounded-lg" type="submit" disabled={false}>Đăng ký</button>
            </div>
          </div>
        </form>
      </Modal >
    </>
  );
};

export default Register;
