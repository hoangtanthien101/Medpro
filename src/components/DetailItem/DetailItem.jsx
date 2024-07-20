
const DetailItem = (props) => {
    const { icon, iconF, styleTitle, html = false, oneRow, content = '', title = 'title ' } = props
    return (
        <div className="inline-flex items-start gap-2 justify-start font-sans font-semibold tracking-wide text-white bg-blue-500 rounded-lg min-h-[26px]">
            <span>
                {iconF ? iconF : <img className='w-4' src={icon} />}

                {/* <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-6 h-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                        />
                    </svg> */}
            </span>
            {oneRow ?
                <span className={`w-[100%] ${styleTitle}`}>{oneRow}</span>
                : <>
                    <div className={`w-[160px] ${styleTitle}`}>
                        <span className="" >
                            {title}:
                        </span>
                    </div>
                    <span className="max-w-[75%] text-ellipsis text-gray-dark font-bold "
                        style={{
                            whiteSpace: 'pre-line'
                        }}>
                        {content ? content : ''}
                    </span>
                </>
            }
        </div >
    );
};

export default DetailItem;