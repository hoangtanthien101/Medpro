import { Avatar } from 'antd';

const DoctorInfo1 = (props) => {
    const { data, branch } = props
    return (
        <div className='flex flex-col w-[200]'>
            <div className="flex flex-col gap-4 justify-center items-center">
                <div className="flex-shrink-0 mt-5">
                    <Avatar
                        src={data?.avatar}
                        alt=""
                        style={{
                            width: '150px',
                            height: '150px',
                        }}
                        className="object-cover w-full h-full rounded-lg"
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <span className='font-bold text-2xl text-blue2'>
                        BS.{data?.fullName}
                    </span>
                    <span className='font-bold text-xl '>
                        Giới tính: {data?.gender}
                    </span>
                    <span className='font-bold text-xl '>
                        Tuổi: {data?.age}
                    </span>
                    <span className='font-bold text-xl '>
                        Cấp bậc: {data?.academicRank}
                    </span>
                    <span className='font-bold text-xl '>
                        Làm việc tại: {branch?.name}
                    </span>
                    <span className='font-bold text-xl  '>
                        Địa chỉ làm: {branch?.address}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default DoctorInfo1;