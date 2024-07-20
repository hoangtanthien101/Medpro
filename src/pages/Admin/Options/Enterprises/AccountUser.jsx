import { useEffect, useState } from "react";
import { Table, Input, Select } from "antd";
import Constants from "../../../../utils/constants";
import DropdownOperation from "../../../../components/Dropdown/DropdownOperation";
import classes from './AccountUser.module.scss'
import Factories from "../../../../services/FactoryApi";
import { ToastNoti } from "../../../../utils/Utils";

const AccountUser = () => {
  const { Search } = Input;
  const [userList, setUserList] = useState([]);

  const fetchApiList = async (value) => {
    try {
      const response = await Factories.getAccountList(value, 1);
      if (response) {
        setUserList(response);
      }
    } catch (error) {
      console.error("Error while fetching API:", error);
    }
  };
  function handleSearch() {
    fetchApiList(valueSearch)
  }
  const handleKeyDown = (event) => {
    if (event.key === "Enter" || event.keyCode === 13) {
      fetchApiList(valueSearch);
    }
  };

  useEffect(() => {
    fetchApiList();
  }, []);

  function handleReload() {
    fetchApiList();
  }
  const [valueSearch, setValueSearch] = useState();

  const columns = [
    {
      title: '#',
      dataIndex: 'id',
      key: 'id',
      width: 50,
      align: 'center',
      render: (id, record, index) => { ++index; return index; },
      showSorterTooltip: false,
    },
    {
      title: 'Số tài khoản',
      width: 100,
      dataIndex: 'fullName',
      key: 'name',
      fixed: 'left',
    },
    {
      title: 'Giớt tính',
      dataIndex: 'gender',
      key: 'gender',
      width: 110,
      filters: [
        {
          text: 'Nam',
          value: "Male"
        },
        {
          text: 'Nữ',
          value: "Female"
        },
      ],
      onFilter: (value, record) => record.gender === value,
      render: (data) => <div>
        {
          (data === "Male" ? 'Nam' : 'Nữ')
        }
      </div>,
    },
    {
      title: 'SĐT',
      dataIndex: 'phone',
      width: 130,
      key: 'phone',
    },
    // {
    //   title: 'Trạng thái',
    //   dataIndex: 'status',
    //   key: 'flag',
    //   width: 200,
    //   filters: [
    //     {
    //       text: 'Đang hoạt động',
    //       value: 10,
    //     },
    //     {
    //       text: 'Khóa tài khoản',
    //       value: 20,
    //     },
    //   ],
    //   onFilter: (value, record) => record.status === value,
    //   render: (_, data) =>
    //     <Select
    //       style={{
    //         width: "100%",
    //       }}
    //       onChange={(value) => onChangeSelectHandler(value, data?._id)}
    //       value={data?.status}
    //       options={Constants.optionStatusAccount}
    //     />
    // },
    {
      title: 'Tác vụ',
      key: 'operation',
      width: 130,
      align: 'center',
      render: (_, record) => (
        <DropdownOperation isUser record={record} updateSuccess={handleReload} />
      )
    },
  ];

  const onChangeSelectHandler = async (value, id) => {
    try {
      const data = {
        status: value
      }
      const response = await Factories.updateStatus(data, id);
      if (response) {
        ToastNoti()
        fetchApiList()
      }
    } catch (error) {
      console.error("Error while fetching API:", error);
    }
  };


  return (
    <div className="p-5 flex flex-col gap-4">
      <div className={classes["header"]}>
        <div className={classes["titleTable"]}>
          <span className="text-3xl uppercase  font-bold text-blue">Danh sách người dùng</span>
        </div>
        <div className={classes["searchInput"]}>
          <Search
            allowClear
            enterButton="Search"
            className="bg-white"
            onChange={(e) => setValueSearch(e.target.value)}
            onKeyDown={(e) => handleKeyDown(e)}
            placeholder="Tìm kiếm với tên,...."
            onSearch={handleSearch} />
        </div>
      </div>

      <div className={'p-5 bg-[#fff] rounded-xl '} >
        <Table
          columns={columns}
          dataSource={userList ?? []}
        />
      </div>

    </div>
  );
};

export default AccountUser;
