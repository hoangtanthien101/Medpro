import React, { useState } from "react";
import { DatePicker, Select, Tabs } from "antd";
import ChartYear from "./ChartYear";
import Constants from "../../../../utils/constants";
import dayjs from "dayjs";

const Statistical = () => {
  const [year, setYear] = useState(2024);
  const [month, setMonth] = useState(5);
  const [Status, setStatus] = useState(1);

  const handleChangeYear = key => {
    setYear(key?.$y)
  };
  const handleChangeMonth = key => {
    setMonth(key?.month() + 1)
    setYear(key?.$y)
  };

  return (
    <div className="booking-container" style={{ overflow: 'scroll', height: '100vh' }}>
      <div className="booking-title">
        <span>Thống kê</span>
      </div>

      <div className="booking-title">
        <div style={{ float: 'right', display: 'flex', gap: 15 }}>
          <Select defaultValue={1} options={Constants.optionsStatusBooking} onChange={setStatus} placeholder="Trạng thái" />
          <DatePicker defaultValue={dayjs('2024-05-01')} onChange={handleChangeYear} picker="year" placeholder="Năm" />
          <DatePicker defaultValue={dayjs('2024-05-01')} onChange={handleChangeMonth} picker="month" placeholder="Tháng" />
        </div>
      </div>

      <div className="booking-search" style={{ width: '100%' }}>
        <ChartYear year={year} month={month} Status={Status} />
      </div>
    </div>
  );
};

export default Statistical;
