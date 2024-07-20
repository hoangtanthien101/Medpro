import { useParams } from "react-router-dom";
import BoxCustom from "../../components/Box/Box";
import DoctorInfo1 from "./DoctorInfo1";
import DoctorInfo2 from "./DoctorInfo2";
import { useEffect, useState } from "react";
import Factories from "../../services/FactoryApi";
import { toast } from "react-toastify";
import { Spin } from "antd";
import { ToastNotiError } from "../../utils/Utils";
import DoctorInfoFeedback from "./DoctorInfoFeedback";

const DoctorDetailPage = () => {
    const { id } = useParams()
    const [loading, setLoading] = useState(true);
    const [dataList, setDataList] = useState([]);
    const [branch, setBranch] = useState([]);
    const fetchData = async () => {
        setLoading(true)
        try {
            const response = await Factories.getDoctorInfo(id);
            if (response) {
                setDataList(response);
            }
        } catch (error) {
            toast.error('Hệ thống lỗi')
            setLoading(false)
        }
    };

    const fetchDataBr = async () => {
        try {
            const response = await Factories.getBranchList();
            const newData = response?.filter(item => item._id === dataList.branchId)
            setBranch({
                name: newData[0].name,
                address: newData[0].address,
            });
            setLoading(false)
        } catch (error) {
            setLoading(false)
            ToastNotiError(error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [id]);
    useEffect(() => {
        if (dataList?.branchId) {
            fetchDataBr();
        }
    }, [dataList]);

    return (
        <div className="p-1 w-full flex flex-col justify-center items-center">
            <div className="w-full flex flex-col justify-center items-center min-h-[500px]">
                {loading ? <Spin /> :
                    <div className="px-[10%] py-10 flex flex-row justify-center items-start gap-5">
                        <div className="w-[220] flex flex-col justify-start gap-5 items-center">
                            <BoxCustom
                                alignTitle='center'
                                description={<DoctorInfo1 data={dataList} branch={branch} />}
                            />
                            <BoxCustom
                                alignTitle='center'
                                description={<DoctorInfoFeedback id={dataList._id} />}
                            />
                        </div>
                        <BoxCustom
                            alignTitle='center'
                            description={<DoctorInfo2 data={dataList} />}
                        />
                    </div>
                }
            </div>
        </div>
    );
};

export default DoctorDetailPage;