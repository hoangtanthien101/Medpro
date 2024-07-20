import PropTypes from 'prop-types';
import { Button } from 'antd';

const ButtonCustom = props => {
    const { onClick, danger, icon, style, loading = false, type = 'button' } = props
    return (
        <>
            {type === 'submit' ?
                <Button
                    type={type}
                    htmlType
                    style={{
                        background: '#1fb6ff',
                        color: '#fff',
                        ...style
                        // border: '1px solid #1fb6ff',
                    }}
                    loading={loading}
                    onClick={(e) => onClick && onClick(e)}
                >
                    {props.children}
                </Button>
                :
                <button
                    type={type}
                    style={{
                        background: '#1fb6ff',
                        borderRadius: 8,
                        padding: '4px 8px',
                        color: '#fff',
                        ...style
                        // border: '1px solid #1fb6ff',
                    }}
                    onClick={(e) => onClick && onClick(e)}
                >
                    {props.children}
                </button>
            }
        </>
    );
};

ButtonCustom.propTypes = {
    type: PropTypes.string,
    children: PropTypes.string,
    onClick: PropTypes.func,
};

export default ButtonCustom;