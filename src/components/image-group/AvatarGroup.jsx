import { UserOutlined } from '@ant-design/icons';
import { Avatar, Tooltip } from 'antd';

const AvatarGroup = (props) => {
    const { list = [], maxCount = 3 } = props
    return (
        <>
            <Avatar.Group
                maxCount={maxCount}
                maxStyle={{
                    color: '#f56a00',
                    backgroundColor: '#fde3cf',
                }}
            >
                {list?.map((item, index) => (
                    <Tooltip title={item?.fullName} key={index} placement="top">
                        <Avatar
                            src={item?.avatar}
                            icon={item?.link}
                        >
                        </Avatar>
                    </Tooltip>
                ))}
            </Avatar.Group >
        </>
    )
}

export default AvatarGroup;