import { useParams } from "react-router-dom";
import Box from "../../components/Box/Box";
import UpdateProfilePatient from "../../components/Description/UpdateProfile/UpdateProfilePatient";
import { useEffect, useState } from "react";
import Factories from "../../services/FactoryApi";
import { ToastNotiError } from "../../utils/Utils";
const UpdateProfilePage = () => {
    const id = useParams()
    const [data, setData] = useState();
    useEffect(() => {
        const fetchData = async () => {
            if (id?.id) {
                try {
                    const response = await Factories.getListPatient({ _id: id.id });
                    if (response?._id) {
                        setData(response);
                    } else {
                        ToastNotiError();
                    }
                } catch (error) {
                    console.error("Error occurred while fetching data:", error);
                    ToastNotiError();
                }
            }
        };

        fetchData();
    }, [id]);

    return (
        <div className="w-full flex flex-col justify-center items-center">
            <div className="w-[1000px] py-10 flex flex-col justify-center items-center">
                <Box
                    title={<span className="text-2xl">Cập nhật thông tin bệnh nhân</span>}
                    alignTitle='center'
                    description={<UpdateProfilePatient data={data} />}
                />
            </div>
        </div>
    );
};

export default UpdateProfilePage;