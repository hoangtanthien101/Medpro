import { Button } from '@mui/material';
import PropTypes from 'prop-types';

const ButtonOutLine = props => {
    const { children, onClick = () => { }, size, borderRadius } = props
    const getSizeStyles = () => {
        switch (size) {
            case 'small':
                return {
                    width: '100px',
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

    return (
        <Button
            style={{
                color: '#1fb6ff',
                border: '1px solid #1fb6ff',
                background: 'transparent',
                borderRadius: borderRadius ?? 30,
                ...getSizeStyles(),
            }}

            onClick={() => onClick()}
            className='text-[#fff] rounded-lg hover:bg-[#e8f2f7] mt-4 border-[none] w-[200px] h-12 font-bold text-xl leading-[19px] text-white text-center p-[11px] rounded-[30px] border-transparent '
        >
            <span className='font-bold'>
                {children ?? 'Đặt Lịch Ngay'}
            </span>
        </Button >
    );
};

ButtonOutLine.propTypes = {
};

export default ButtonOutLine;