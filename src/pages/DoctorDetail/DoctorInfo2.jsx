import { data } from 'autoprefixer';
import React from 'react';

const DoctorInfo2 = (props) => {
    const { data } = props

    const experienceElements = data.experience?.map((item, index) => (
        <li key={index}
            style={{
                textIndent: '1em',
                fontWeight: 'bold',
                marginBottom: '0.5em'
            }}
        >
            <span style={{ marginRight: '0.5em' }}>•</span>{item}.
        </li>
    ));
    const specializeElements = data.specialize?.map((item, index) => (
        <li key={index}
            style={{
                textIndent: '1em',
                fontWeight: 'bold',
                marginBottom: '0.5em'
            }}
        >
            <span style={{ marginRight: '0.5em' }}>•</span>{item}.
        </li>
    ));

    return (
        <div className='flex  p-2'>
            {/* overflow-y-auto h-[60vh] */}
            <div className='flex flex-col gap-5 justify-start items-start'>
                {/* p1 */}
                <div className='flex flex-col gap-3 justify-start items-start'>
                    <span className='text-3xl font-bold text-yellow '>1.Giới thiệu</span>
                    <span
                        style={{
                            whiteSpace: 'pre-line',
                        }}
                        className='text-justify font-bold'>{data?.introduction}
                    </span>
                </div>
                {/* p2 */}
                <div className='flex flex-col gap-3 justify-start items-start'>
                    <span className='text-3xl font-bold text-yellow '>2.Chuyên ngành</span>
                    <ul>
                        {specializeElements}
                    </ul>
                </div>
                {/* p2 */}
                <div className='flex flex-col gap-3 justify-start items-start'>
                    <span className='text-3xl font-bold text-yellow '>3.Kinh nghiệm làm việc</span>
                    <ul>
                        {experienceElements}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default DoctorInfo2;