import React from 'react';

const Card = (props) => {
    return (
        <div aria-label="card-item-v1" className="flex flex-col w-[100px]">
            <div className="relative flex-shrink-0 mb-5 h-[100px]">
                <img
                    src={props?.src}
                    alt=""
                    className="object-cover w-full h-full rounded-lg"
                />
            </div>
            <div className="flex flex-col  flex-1">
                <h3 className="text-center text-[#fff] text-3xl font-bold">
                    {props.title}
                </h3>
                <div className="text-center text-[#fff] ">
                    {props.content}
                </div>
            </div>
        </div>
    );
};

export default Card;