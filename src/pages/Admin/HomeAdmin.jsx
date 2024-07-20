import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AccountUser from "./Options/Enterprises/AccountUser";
import Booking from "./Options/Book/Booking";
import ScheduleDoctorAdmin from "./Options/Fields/ScheduleDoctorAdmin"
import { Layout, Menu, Button } from "antd";
import classes from './HomeAdmin.module.scss'
import AccountDoctor from './Options/Doctors/AccountDoctor';
import Statistical from "./Options/Statistical/Statistical";
import Title from "antd/es/typography/Title";
const { Sider } = Layout;
import Logo from '../../assets/logo/header_logo.svg'
import ManagerBranch from "./Options/Branch/ManagerBranch";

const HomeAdmin = () => {
  const [selectedMenuItem, setSelectedMenuItem] = useState("1");
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const handleMenuClick = (e) => {
    setSelectedMenuItem(e.key);
  };
  const logoutHandler = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    navigate("/");
  }

  return (
    <>
      <Layout theme="light" style={{ height: '100vh' }} >
        <Sider theme="light"
          style={{ width: 200 }}
        >
          <Menu
            theme="light"
            style={{ width: 200 }}
            selectedKeys={[selectedMenuItem]}
            onClick={handleMenuClick}
            mode="inline"
          >
            <Title level={3}>
              <span style={{ marginLeft: 20, color: '#706233' }} >{'Quản lý'} </span>
              <img className='text-center h-16 w-48' src={'https://medpro.vn/_next/image?url=https%3A%2F%2Fbo-api.medpro.com.vn%2Fstatic%2Fimages%2Fmedpro%2Fweb%2Fheader_logo.svg&w=1920&q=75'} />
            </Title>
            {/* <Menu.SubMenu className="submenu" key="sub1" title="Tài Khoản"> */}
            {/* <Menu.Item key="1">Enterprises</Menu.Item> */}
            {/* </Menu.SubMenu> */}
            <Menu.Item key="1">Người dùng</Menu.Item>
            <Menu.Item key="2">Bác sĩ</Menu.Item>
            <Menu.Item key="4">Chi nhánh</Menu.Item>
            <Menu.Item key="5">Lịch khám bác sĩ</Menu.Item>
            <Menu.Item key="3">Quản lý lịch hẹn</Menu.Item>
            <Menu.Item key="7">Thống kê</Menu.Item>
            <Button
              onClick={logoutHandler}
              className=" absolute bottom-2 left-10 text-[#fff] "
            >Đăng xuất</Button>
          </Menu>

        </Sider>

        <Layout className={classes['container']}>
          <Layout.Content className={classes["site-layout-content"]}>
            {selectedMenuItem === "1" && <AccountUser />}
            {selectedMenuItem === "2" && <AccountDoctor />}
            {selectedMenuItem === "3" && <Booking />}
            {selectedMenuItem === "4" && <ManagerBranch />}
            {selectedMenuItem === "5" && <ScheduleDoctorAdmin />}
            {selectedMenuItem === "7" && <Statistical />}
          </Layout.Content>
        </Layout>
      </Layout>
    </>
  );
};

export default HomeAdmin;
