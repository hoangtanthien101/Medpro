import DetailItem from '../../DetailItem/DetailItem';
import IC1 from '../../../assets/icon/ic-avatar.svg'
import IC2 from '../../../assets/icon/ic-born.svg'
import IC3 from '../../../assets/icon/ic-contact.svg'
import IC4 from '../../../assets/icon/ic-personnal.svg'
import IC5 from '../../../assets/icon/ic-location.svg'
import IC6 from '../../../assets/icon/ic-nation.svg'
import { Avatar } from 'antd';
import Constants from '../../../utils/constants';
import { getDate } from '../../../utils/Utils';
const DescriptionProfile = (props) => {
    return (
        <div className="flex flex-col">
            <div className="flex  flex-row justify-between">
                <div className="flex flex-col w-[80%]">
                    <DetailItem icon={IC1} title='Họ và tên' content={props?.data?.fullName} />
                    <DetailItem icon={IC2} title='Ngày sinh' content={getDate(props?.data?.dateOfBirth)} />
                    <DetailItem icon={IC3} title='Số điện thoại' content={props?.data?.phone} />
                    <DetailItem icon={IC4} title='Giới tính' content={Constants.optionSex?.find(item => item.value === props?.data?.gender)?.label} />
                </div>
                <div className="flex  justify-center items-start w-[20%]">
                    <Avatar
                        style={{ height: 100, width: 100 }}
                        src={props?.data?.avatar ?? 'https://api.dicebear.com/7.x/miniavs/svg?seed=2'} />
                </div>
            </div>
            <DetailItem icon={IC5} title='Địa chỉ' content={props?.data?.address} />
            <DetailItem icon={IC6} title='Dân tộc' content={Constants.nationVN?.find(item => item.value === parseInt(props?.data?.nation))?.label} />
        </div>
    )
};



export default DescriptionProfile;