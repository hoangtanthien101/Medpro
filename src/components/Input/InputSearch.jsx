import { Select } from 'antd';
import { useState } from 'react';

const InputSearch = (props) => {
    const { className, isHaveSelect = false, onChangeInput = () => { }, placeholder, placeholderSelect = 'Tìm kiếm thành phố', options = [] } = props
    const [inputSearch, setInputSearch] = useState();
    function handleChangeInput(e) {
        setInputSearch(e.target.value)
        const timeoutId = setTimeout(() => {
            onChangeInput(e.target.value)
            clearTimeout(timeoutId)
        }, 600);
    }
    return (
        <div>
            <div className={`flex bg-[#fff] s border-[#fff] items-center gap-5 w-[600px] border border-gray-200 rounded-3xl py-2 px-5 ${className}`}>
                <span className="flex-shrink-0 text-gray-500">
                    <svg
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
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                    </svg>
                </span>
                <input
                    type="text"
                    onChange={(e) => handleChangeInput(e)}
                    value={inputSearch}
                    className="w-full outline-none bg-transparent"
                    placeholder={placeholder ? placeholder : 'Tìm kiếm ...'}
                />
                <button onClick={() => {
                    setInputSearch('')
                    onChangeInput()
                }
                } className=" border-none flex-shrink-0 text-slate-500">
                    <svg
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
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                </button>
                {isHaveSelect &&
                    <Select placeholder={placeholderSelect} className='selectAntd' options={options} />
                }
            </div>
        </div>
    );
};

export default InputSearch;