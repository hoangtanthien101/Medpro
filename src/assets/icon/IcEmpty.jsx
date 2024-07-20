import IME from '../images/empty.webp'
const IcEmpty = (props) => {
    return (
        <div className='py-8 flex flex-col items-center gap-10 justify-center'>
            <span className='text-gray-light text-xl'>{props.content ? props.content : 'Chưa có thông tin'}</span>
            <img className='h-60 w-60' src={IME} />
        </div>
    );
};

export default IcEmpty;