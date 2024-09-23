import React from 'react'
import dayjs from 'dayjs'

function JobCard(props) {
    const date1 = dayjs(Date.now());
    const diffInDays = date1.diff(props.postedOn, 'day');

    return (
        <div className='mx-4 mb-4 lg:mx-40'>
            <div className='flex flex-col lg:flex-row justify-between items-start lg:items-center px-4 lg:px-6 py-4 bg-zinc-200 rounded-md border border-black shadow-lg hover:border-blue-500 hover:translate-y-1 hover:scale-103 transition-all'>
                <div className='flex flex-col items-start gap-3'>
                    <h1 className='text-md lg:text-lg font-semibold'>{props.title} - {props.company}</h1>
                    <p className='text-sm lg:text-base'>{props.type} &#x2022; {props.experience} &#x2022; {props.location}</p>
                    <div className='flex flex-wrap items-center gap-2'>
                        {props.skills.map((skill, i) => (
                            <p key={i} className='text-xs lg:text-sm text-gray-500 py-1 px-2 rounded-md border border-black'>
                                {skill}
                            </p>
                        ))}
                    </div>
                </div>
                <div className='flex flex-col lg:flex-row items-start lg:items-center gap-2 lg:gap-4 mt-4 lg:mt-0'>
                    <p className='text-xs lg:text-sm text-gray-500'>Posted {diffInDays > 1 ? `${diffInDays} days` : `${diffInDays} day`} ago</p>
                    <a href={props.job_link} target="_blank" rel="noopener noreferrer">
                        <button className='text-blue-500 border border-blue-500 px-6 lg:px-10 py-2 rounded-md hover:bg-blue-500 hover:text-white transition-colors'>
                            Apply
                        </button>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default JobCard;
