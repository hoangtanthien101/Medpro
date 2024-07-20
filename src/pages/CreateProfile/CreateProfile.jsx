import Box from "../../components/Box/Box";
import UpdateProfilePatient from "../../components/Description/UpdateProfile/UpdateProfilePatient";
const CreateProfilePage = () => {
   
    return (
        <div className="w-full flex flex-col justify-center items-center">
            <div className="w-[1000px] py-10 flex flex-col justify-center items-center">
                <Box
                    title={<span className="text-2xl">Tạo mới thông tin bệnh nhân</span>}
                    alignTitle='center'
                    isCanHover={false}
                    description={<UpdateProfilePatient/>}
                />
            </div>
        </div>
    );
};

export default CreateProfilePage;