
const CardSpeciality = (props) => {
    const { title, src, onClick } = props
    return (
        <div className=' select-none w-1/3 xl:w-[16.6%] justify-center items-center '>
            <div className='flex flex-col justify-center items-center '>
                <button onClick={onClick} className='hover:bg-blue3 rounded-lg p-3 w-36 h-44 flex flex-col gap-3'>
                    <div className="p-3 border-4 border-blue rounded-full">
                        <img src={src} />
                    </div>
                    <span className=' text-center w-full font-bold text-blue text-base'>{title}</span>
                </button>
            </div>
        </div>
    );
};

export default CardSpeciality;