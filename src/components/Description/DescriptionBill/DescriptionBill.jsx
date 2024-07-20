import { useContext, useEffect, useState } from 'react';
import CustomTable from '../../CustomTable/CustomTable';
import { useNavigate } from 'react-router-dom';
import { Spin, Tag } from 'antd';
import Constants from '../../../utils/constants';
import { AuthContext } from '../../../context/auth.context';
import Factories from '../../../services/FactoryApi';
import { ToastNotiError, getDate } from '../../../utils/Utils';
import { FlareSharp } from '@mui/icons-material';


const headCells = [
    {
        id: 'name',
        numeric: false,
        isSort: false,
        disablePadding: false,
        label: 'Tên bênh nhân',
        component: (data) => {
            return (
                <>
                    {data.patientInfo.fullName}
                </>
            )
        }
    },
    {
        id: 'doctor',
        align: 'left',
        disablePadding: false,
        label: 'Bác sĩ',
        component: (data) => {
            return (
                <>
                    {data.doctorInfo.fullName}
                </>
            )
        }
    },
    {
        id: 'speciality',
        align: 'left',
        label: 'Khoa khám',
        disablePadding: false,
        component: (data) => {
            return (
                <>
                    {data.shiftInfo.departmentName}
                </>
            )
        }
    },
    {
        id: 'date',
        align: 'center',
        disablePadding: false,
        label: 'Ngày',
        component: (data) => {
            return (
                <>
                    {getDate(data.shiftInfo.date)}
                </>
            )
        }
    },
    {
        id: 'time',
        // numeric: true,
        align: 'center',
        disablePadding: false,
        label: 'Ca khám',
        component: (data) => {
            return (
                <>
                    {`${getDate(data.shiftInfo.timeStart, 6)} - ${getDate(data.shiftInfo.timeEnd, 6)}`}
                </>
            )
        }
    },
    {
        id: 'status',
        align: 'center',
        minWidth: 100,
        maxWidth: 80,
        disablePadding: false,
        label: 'Trạng thái',
        component: (data) => {
            return (
                <Tag color={Constants.labelStatus.find(item => item?.value === data?.status)?.status}>{Constants.labelStatus.find(item => item?.value === data?.status)?.label}</Tag>
            )
        }
    },
];

const DescriptionBills = () => {
    const navigate = useNavigate()
    const { user } = useContext(AuthContext);
    const [bookingList, setBookingList] = useState([]);
    const [loading, setLoading] = useState();
    useEffect(() => {
        fetchDataBookingList();
    }, []);
    const fetchDataBookingList = async () => {
        try {
            setLoading(true)
            let data = {}
            if (user.role_id === 1) {
                data.UserId = user.id
            }
            if (user.role_id === 2) {
                data.DoctorId = user.id
            }
            const resp = await Factories.getListBooking(data);
            setLoading(false)
            setBookingList(resp);
        } catch (error) {
            ToastNotiError();
            setLoading(true)

        }
    };

    function handleClickRow(row) {
        navigate(`/appointments/${row._id}`)
    }


    return (
        <>
            {loading ? <Spin></Spin> :
                <CustomTable headCells={headCells} rows={bookingList} handleClickRow={handleClickRow} />
            }
        </>
    );
};

export default DescriptionBills;