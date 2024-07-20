import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { EyeTwoTone, EyeInvisibleOutlined } from "@ant-design/icons";
import { AuthContext } from "../../context/auth.context";
import AccountFactories from "../../services/AccountFactories";
import { sendEmailVerification } from "firebase/auth";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import Register from "../Register/Register";
import Message from "../../components/UI/Message/Message";
import { Select, Form, Input, Modal, Button } from "antd";

const Login = (props) => {
  const { setUser } = useContext(AuthContext)
  const navigate = useNavigate();
  const [open, setIsOpen] = useState(true)
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    setIsOpen(props.isModalOpen)
  }, [props.isModalOpen])
  const [disableButtonSend, setDisableButtonSend] = useState()
  const [userFireBase, setUserFirebase] = useState()
  const { t } = useTranslation()
  const [userInput, setUserInput] = useState({
    phone: "",
    password: "",
  });

  const [check, setCheck] = useState({
    status: false,
    type: "",
    content: "",
  });

  const handleCancel = () => {
    props.onClose();
  };
  useEffect(() => {
    document.title = `MEDPRO | Đăng nhập`
    return () => {
      document.title = 'MEDPRO';
    };
  }, [])
  const changeMessage = () => {
    setCheck({
      status: false,
      type: "",
      content: "",
    });
  };

  const inputChangeHandler = (event) => {
    setUserInput((prevState) => {
      return {
        ...prevState,
        [event.target.name]: event.target.value,
      };
    });
  };

  function checkUserValidation() {
    if (!userInput.phone) {
      setCheck({
        status: true,
        type: "error",
        content: `Số điện thoại không được để trống.`,
      });
      return false;
    }

    else if (userInput.phone.length < 9 || userInput.phone.length > 10) {
      setCheck({
        status: true,
        type: "error",
        content: `Số điện thoại không đúng định dạng`,
      });
      return false;
    }
    else if (!userInput.password) {
      setCheck({
        status: true,
        type: "error",
        content: `Mật khẩu không được để trống, hãy nhập mật khẩu`,
      });
      return false;
    }
    return true;
  }

  const onSubmitLogin = async (event) => {
    setLoading(true)
    event?.preventDefault();
    if (checkUserValidation()) {
      const response = await AccountFactories.requestLogin(userInput);
      if (response?.error) {
        setCheck({
          status: true,
          type: "error",
          content: response?.error,
        });
        setLoading(false)
      }
      else if (response?.role !== 3) {
        setProfileForUser(response);
        // signInWithEmailAndPassword(auth, userInput.email, userInput.password)
        //   .then((userCredential) => {
        //     const userFireBase = userCredential.user;
        //     setUserFirebase(userFireBase);
        //     // setEmailVerified(userFireBase?.emailVerified)
        //     // if (userFireBase?.emailVerified) {
        //     if (true) {
        //       setProfileForUser(response?.user);
        //     }
        //   })
        //   .catch((error) => {
        //     // Lỗi trong quá trình đăng nhập
        //     const errorCode = error.code;
        //     const errorMessage = error.message;
        //     // Hiển thị thông báo lỗi
        //     // setCheck({
        //     //   status: true,
        //     //   type: "error",
        //     //   content: errorMessage,
        //     // });
        //   });
        setLoading(false)
        handleCancel()
      }
      else if (response?.role === 3) {
        setProfileForUser(response)
        handleCancel()
        setLoading(false)
      }

    }
    setLoading(false)
  };

  const setProfileForUser = (userDb, userFireBase = {}) => {
    let user = {
      id: userDb?._id,
      email: userDb?.email ?? '',
      fullName: userDb?.fullName ?? '',
      avatar: userDb?.avatar,
      gender: userDb?.gender,
      role_id: userDb?.role,
      status: userDb?.status,
      address: userDb?.address,
      age: userDb?.age,
      // ...userFireBase,
    };

    setUser(user)
    localStorage.setItem("user", JSON.stringify({ ...user }))
    window.dispatchEvent(new Event('storage'))
    setCheck({
      status: true,
      type: "success",
      content: `Đăng nhập thành công`,
    });

    setTimeout(() => {
      if (userDb?.role === 3) {
        return navigate("./admin");
      } else return navigate("..");
    }, 500)
  };

  const forgotPasswordHandler = () => {
    navigate("../forgot_password");
  };

  const comeRegisterHandler = () => {
    navigate("../register");
  };

  const handleReSeneEmail = async (e) => {
    e.preventDefault();
    const resp = await sendEmailVerification(userFireBase);
    toast.success('Đã gửi lại email xác thực.')
    setDisableButtonSend(true);
    setTimeout(() => {
      onSubmitLogin();
    }, 30000);
  };
  const [isOpenRes, setIsOpenRes] = useState(false);
  const registerHandler = () => {
    setIsOpenRes(true)
  };

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
        status={check.status}
        type={check.type}
        content={check.content}
        changeMessage={changeMessage}
      />
      <Modal
        open={open}
        onCancel={handleCancel}
        footer={[
          <></>
        ]}
      >
        <form onSubmit={onSubmitLogin} className="login-form">
          <div className="my-7 flex flex-row justify-between items-center w-full">
            <span className="text-4xl w-full text-blue2 font-bold text-center">
              Đăng nhập
            </span>
          </div>
          <div className="my-6 ">
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
          </div>
          <div className="my-6">
            <Input.Password
              name="password"
              onChange={inputChangeHandler}
              placeholder="Nhập mật khẩu"
              className="input-login"
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
              style={{
                width: '100%',
                borderRadius: 8,
                border: '2px solid #1fb6ff',
              }}
            />
          </div>

          <div className="my-6 flex flex-row justify-center">
            <Button
              className="w-full px-10 py-2 h-12 text-2xl font-bold bg-blue2 text-gray-light hover:bg-blue transition-all duration-300 hover:text-[#fff] rounded-lg"
              type="submit"
              disabled={loading}
              onClick={(e) => onSubmitLogin(e)}
              loading={loading}
            >Đăng nhập
            </Button >
          </div>
        </form>
        {/* <div className="my-3">
          <label
            className="line-forgot-password"
            onClick={forgotPasswordHandler}
          >
            Quên mật khẩu?
          </label>
        </div> */}
        <div className="my-3">
          <a onClick={registerHandler} className="register-line">
            Bạn chưa có tài khoản ?
          </a>
        </div>
        {isOpenRes &&
          <Register isModalOpen={isOpenRes} onClose={() => setIsOpenRes(false)} />
        }
      </Modal>
    </>
  );
};

export default Login;
