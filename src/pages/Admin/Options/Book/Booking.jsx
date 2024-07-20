import { useEffect, useState } from "react";
import { Table, Input, Select, DatePicker, Space } from "antd";
import "./Booking.scss";
import Constants from "../../../../utils/constants";
import BookingFactories from "../../../../services/BookingFactories";
import { ToastNoti, ToastNotiError, convertStringToNumber, getDate, } from "../../../../utils/Utils";
import { Link } from "react-router-dom";
import Factories from "../../../../services/FactoryApi";
import { Button } from "@mui/material";

const Booking = () => {
  const [bookingList, setBookingList] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [dateCreate, setDateCreate] = useState();
  const [DateBooking, setDateBooking] = useState();
  const [loading, setLoading] = useState();

  const fetchDataBookingList = async (name, dateCreate, dateBooking) => {
    try {
      setLoading(true)
      const data = {
        keyword: name,
        dateCreate: dateCreate,
        dateBooking: dateBooking,
      }
      const resp = await Factories.getListBooking(data);
      setLoading(false)
      setBookingList(resp);
    } catch (error) {
      ToastNotiError();
      setLoading(true)

    }
  };

  useEffect(() => {
    fetchDataBookingList();
  }, [dateCreate,DateBooking]);


  const handleKeyDown = (event) => {
    if (event.key === "Enter" || event.keyCode === 13) {
      fetchDataBookingList(keyword);
    }
  };

  function handleReset() {
    setKeyword("");
    setDateCreate();
    setDateBooking();
    fetchDataBookingList()
  }
  function handleSearch() {
    fetchDataBookingList(keyword, dateCreate?.$d, DateBooking?.$d)
  }

  const columns = [
    {
      title: '#',
      dataIndex: 'id',
      key: 'id',
      width: 50,
      fixed: 'left',
      align: 'center',
      render: (id, record, index) => { ++index; return index; },
      showSorterTooltip: false,
    },
    {
      title: "Tài khoản",
      width: 120,
      fixed: 'left',
      dataIndex: "phoneUser",
      render: (text) => (
        <div className="text-data">
          {text}
        </div>
      ),
    },
    {
      title: "Bệnh nhân",
      width: 120,
      dataIndex: "username",
      render: (text, data) => (
        <div className="text-data">
          {data?.patientInfo?.fullName}
        </div>
      ),
    },
    {
      title: "Khoa khám",
      dataIndex: "department",
      width: 240,
      align: 'left',
      render: (text, data) => <div className="text-data">{data?.shiftInfo?.departmentName}</div>,
    },
    {
      title: "Tên bác sĩ",
      dataIndex: "doctor",
      width: 200,
      align: 'left',
      render: (text, data) => <div className="text-data">{data?.doctorInfo?.fullName}</div>,
    },
    {
      title: "Ngày tạo",
      dataIndex: "createAt",
      key: "created_at",
      width: 120,
      render: (text, data) => <div>{getDate(data?.created_at, 1)}</div>,
    },
    {
      title: "Ngày khám",
      key: "date",
      dataIndex: "date",
      align: "left",
      width: 120,
      render: (text, data) => <div>{getDate(data?.shiftInfo?.date, 1)}</div>,
    },
    {
      title: "Thời gian",
      key: "time_from",
      dataIndex: "time_from",
      align: "left",
      width: 160,
      render: (text, data) => <span>{`${getDate(data?.shiftInfo?.timeStart, 6)} - ${getDate(data?.shiftInfo?.timeEnd, 6)}`}</span>,
    },
    {
      title: "Tình trạng",
      key: "status",
      align: "left",
      width: 180,
      filters: Constants.optionsFilterStatusBooking,
      onFilter: (value, record) => record.status === value,
      render: (value, data) => (
        <Select
          style={{ width: '100%' }}
          onChange={(e) => handleChangeStatusBooking(data?._id, e)}
          options={Constants.optionsStatusBooking} value={data?.status}
        />
      )
    },
    {
      title: "Chi phí",
      dataIndex: "money",
      key: "price",
      align: 'right',
      width: 130,
      render: (text, data) => <div className="text-data">{convertStringToNumber(data?.shiftInfo?.price)}</div>,
    },
    {
      title: "Tác vụ",
      key: "action",
      width: 190,
      align: 'center',
      render: (_, record) =>
        <Space size="middle">
          <Link to={`/appointments/${record?._id}?v=2`} target="_blank">
            <Button onClick={() => { }} size='small' type="primary" >
              Xem chi tiết
            </Button>
          </Link>
        </Space>
    },
  ];

  const fetchDataUpdateBooking = async (id, type) => {
    try {
      const response = await Factories.updateAppointment(id, type);
      if (response?._id) {
        ToastNoti()
        fetchDataBookingList();
      }
    } catch (error) {
      ToastNotiError()
    }
  };

  function handleChangeStatusBooking(id, value) {
    fetchDataUpdateBooking(id, value)
  }

  const handleOnChangeDateCreate = (e) => {
    setDateCreate(e);
  };

  const handleOnChangeDateBooking = (e) => {
    setDateBooking(e);
  };

  const handleOnChangeInput = (e) => {
    setKeyword(e.target.value);
  };

  return (
    <div className="booking-container" style={{ height: '100vh', overflow: 'scroll' }}>
      <div className="booking-title"><span>Danh sách lịch khám</span></div>
      <div className="booking-search flex flex-row justify-between">
        <Input
          placeholder="Tìm kiếm tên bệnh nhân, bác sĩ ..."
          size="middle "
          value={keyword}
          onKeyDown={(e) => handleKeyDown(e)}
          onChange={(e) => handleOnChangeInput(e)} />

        <div className="flex flex-row gap-1">
          <DatePicker
            placeholder='Chọn ngày tạo'
            style={{ minWidth: 140 }}
            value={dateCreate ?? ''}
            onChange={(e) => handleOnChangeDateCreate(e)}
          />
          <DatePicker
            style={{ minWidth: 120 }}
            value={DateBooking ?? ''}
            onChange={(e) => handleOnChangeDateBooking(e)}
            placeholder='Chọn ngày khám booking'
          />
          <Button
            variant="outlined"
            style={{ minWidth: 120 }}
            onClick={handleReset}>
            Mặc định
          </Button>
          <Button
            variant="contained"
            style={{ minWidth: 120 }}
            onClick={handleSearch}>
            Tìm kiếm
          </Button>
        </div>
      </div>


      <div className="booking-table  p-4">
        <Table
          columns={columns}
          dataSource={bookingList}
          scroll={{
            x: 1300,
          }}
          loading={loading}
          pagination={{
            defaultPageSize: 5,
            showSizeChanger: false,
            pageSizeOptions: ["5", "20", "30"],
          }}
        />
      </div>

    </div>
  );
};

export default Booking;
