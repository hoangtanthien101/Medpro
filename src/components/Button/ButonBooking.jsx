import { Button } from '@mui/material';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

const ButonBooking = props => {
    const { children, onClick = () => { }, size, borderRadius } = props
    const getSizeStyles = () => {
        switch (size) {
            case 'small':
                return {
                    width: '130px',
                    height: '30px',
                    fontSize: '12px',
                    padding: 'px 12px',
                };
            case 'medium':
                return {
                    width: '150px',
                    height: '40px',
                    fontSize: '14px',
                    padding: '10px 20px',
                };
            case 'large':
                return {
                    width: '200px',
                    height: '50px',
                    fontSize: '16px',
                    padding: '12px 24px',
                };
            default:
                return {}; // Mặc định, không thay đổi kích thước
        }
    };
    const navigate = useNavigate()
    return (
        <Button
            style={{
                borderRadius: 30,
                color: '#ffff',
                border: '1px solid #1fb6ff',
                background: 'linear-gradient(83.63deg, #00b5f1 33.34%, #00e0ff 113.91%)',
                ...getSizeStyles(),
            }}
            onClick={() => onClick ? onClick() : navigate('/booking')}
            className='text-[#fff] hover:bg-[#e8f2f7] border-[none] w-[200px] h-12 font-bold text-xl leading-[19px] text-white text-center p-[11px] rounded-[30px] border-transparent ' >
            <span className='font-bold'>
                {children ?? 'Đặt Lịch Ngay'}
            </span>
        </Button >
    );
};

ButonBooking.propTypes = {

};

export default ButonBooking;