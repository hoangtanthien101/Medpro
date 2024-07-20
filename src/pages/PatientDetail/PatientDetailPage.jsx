import { useParams } from "react-router-dom";
import PatientInfo from "./DoctorInfo2";
import { useEffect, useState } from "react";
import Factories from "../../services/FactoryApi";
import { toast } from "react-toastify";
import { Spin } from "antd";
const PatientDetailPage = () => {
    const { id } = useParams()
    const [loading, setLoading] = useState(true);
    const [dataList, setDataList] = useState([]);
    const fetchData = async () => {
        setLoading(true)
        try {
            const response = await Factories.getPatientDetail(id);
            if (response) {
                setDataList(response);
                setLoading(false)
            }
        } catch (error) {
            toast.error('Hệ thống lỗi')
            setLoading(false)
        }
    };


    useEffect(() => {
        fetchData();
    }, [id]);


    return (
        <div className="p-1 w-full flex flex-col justify-center items-center">
            <div className="w-full flex flex-col justify-center items-center min-h-[500px]">
                {loading ? <Spin /> :
                    <div className="w-[1000px] py-10 flex flex-row justify-center items-center gap-5">
                        <PatientInfo data={dataList} />
                    </div>
                }
            </div>
        </div>
    );
};

export default PatientDetailPage;