import { useEffect, useState } from "react";
import { Select } from "antd";
import { ToastNotiError } from "../../../../utils/Utils.js";
import Factories from "../../../../services/FactoryApi.js";
import ReactBigCalendar from "../../../../components/Calendar/Calendar.jsx";
import ButtonCustom from "../../../../components/Button/ButtonCustom.jsx";
import { Button } from "@mui/material";

const ScheduleDoctorAdmin = () => {
    const [listData, setListData] = useState()
    const [listBranches, setListBranches] = useState()
    const [searchBR, setSearchBR] = useState();
    const fetchDataBranch = async () => {
        const response = await Factories.getBranchList();
        const dataList = response?.map(item => ({
            value: item._id,
            text: item.name,
            label: item.name,

        }))
        const newList = [{
            value: 'all',
            text: 'Tất cả',
            label: 'Tất cả',
        }].concat(dataList)
        setListBranches(newList);
    };

    const fetchData = async (value) => {
        let data = {}
        if (value !== 'all') {
            data.branchId = value
        }
        const response = await Factories.getSchedule(data);
        if (response) {
            const newDate = response?.map(item => (
                {
                    id: item._id,
                    title: `${item.departmentName}`,
                    start: new Date(item.timeStart),
                    end: new Date(item.timeEnd),
                    status: item.status,
                    service: item.service,
                    note: item.note,
                    price: item.price,
                    date: item.date,
                    doctorId: item.doctorId,
                    branchId: item.branchId,
                    departmentId: item.departmentId,
                    branchName: item.branchName,
                    departmentName: item.departmentName,
                    timeStart: item.timeStart,
                    timeEnd: item.timeEnd,
                }
            ))
            setListData(newDate)
        } else {
            ToastNotiError()
        }
    };

    useEffect(() => {
        fetchDataBranch();
        fetchData('all')
    }, []);


    function handleReset() {
        setSearchBR();
        fetchData();
    }
    function handleSearch() {
        fetchData(searchBR);
    }
    const handleOnChangeInput = (event) => {
        setSearchBR(event);
        fetchData(event)
    }

    return (
        <div className="booking-container" style={{ height: '100vh', overflow: 'scroll' }}>
            <div className="booking-title"><span className="uppercase text-3xl">Lịch khám bác sĩ</span></div>
            <div className="booking-search flex flex-row justify-between">
                <Select
                    placeholder="Tất cả bệnh viện"
                    size="middle "
                    value={searchBR}
                    options={listBranches ?? []}
                    onChange={(e) => handleOnChangeInput(e)}
                    style={{ width: '80%' }}
                />
                <div className="flex flex-row gap-1">
                    <Button
                        variant="outlined"
                        onClick={handleReset}
                    >
                        Mặc định
                    </Button>
                    <Button
                        variant="contained"
                        onClick={handleSearch}
                    >
                        Tìm kiếm
                    </Button>
                </div>
            </div>
            <div className="flex w-full bg-[#fff]  rounded-xl p-2">
                <div className="flex justify-evenly w-full">
                    <div className="flex flex-row gap-3">
                        <div className="flex bg-[#CBFFCE] rounded-md w-7 h-7"></div>
                        <span className="text-xl font-bold">Chưa được duyệt</span>
                    </div>
                    <div className="flex flex-row gap-3">
                        <div className="flex bg-[#e74c3c] rounded-md w-7 h-7"></div>
                        <span className="text-xl font-bold">Bị từ chối</span>
                    </div>
                    <div className="flex flex-row gap-3">
                        <div className="flex bg-[#00b5f1] rounded-md w-7 h-7"></div>
                        <span className="text-xl font-bold">Đã được duyệt</span>
                    </div>
                    <div className="flex flex-row gap-3">
                        <div className="flex bg-[#edf03c] rounded-md w-7 h-7"></div>
                        <span className="text-xl font-bold">Đã có lịch hẹn</span>
                    </div>
                </div>
            </div>
            <div className=" bg-[#fff] w-full p-6 rounded-xl h-[120vh]">
                <ReactBigCalendar
                    onReload={() => fetchData(searchBR)}
                    canUpdate
                    data={listData}
                />
            </div>
        </div >
    )
}
export default ScheduleDoctorAdmin