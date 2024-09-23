import React, { useState } from 'react'

function SearchBar(props) {
    const [jobCriteria, setJobCriteria] = useState({
        title: "",
        location: "",
        experience: "",
        type:""
    })

    const handleChange = (e) => {
        setJobCriteria((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    const search = async() => {
        // Validate if at least one filter is selected
        const { title, location, experience, type } = jobCriteria;
        if (!title && !location && !experience && !type) {
            alert("Please select at least one filter before searching.");
            return;
        }

        // Pass criteria to the parent component's fetchJobsCustom method
        await props.fetchJobsCustom(jobCriteria);
    }

    return (
        <div className='flex flex-col gap-4 my-10 justify-center  px-4 lg:flex-row lg:gap-4 lg:px-10'>
            <select onChange={handleChange} name="title" value={jobCriteria.title} className='w-full lg:w-64 py-3 pl-4 bg-zinc-200 font-semibold rounded-md'>
                <option value="" disabled hidden>Job Role</option>
                <option value="iOS Developer">iOS Developer</option>
                <option value="Frontend Developer">Frontend Developer</option>
                <option value="Backend Developer">Backend Developer</option>
                <option value="Android Developer">Android Developer</option>
                <option value="Developer Advocate">Developer Advocate</option>
                <option value="DevOps Enginner">DevOps Engineer</option>
                <option value="Data Analyst">Data Analyst</option>
                <option value="FullStack Mern">Full Stack Mern</option>
            </select>
            <select onChange={handleChange} name="location" value={jobCriteria.location} className='w-full lg:w-64 py-3 pl-4 bg-zinc-200 font-semibold rounded-md'>
                <option value="" disabled hidden>Location</option>
                <option value="Remote">Remote</option>
                <option value="In-Office">In-Office</option>
                <option value="Hybrid">Hybrid</option>
            </select>
            <select onChange={handleChange} name="experience" value={jobCriteria.experience} className='w-full lg:w-64 py-3 pl-4 bg-zinc-200 font-semibold rounded-md'>
                <option value="" disabled hidden>Experience</option>
                <option value="Fresher">Fresher</option>
                <option value="Junior Level">Junior Level</option>
                <option value="Mid Level">Mid Level</option>
                <option value="Senior Level">Senior Level</option>
            </select>
            <select onChange={handleChange} name="type" value={jobCriteria.type} className='w-full lg:w-64 py-3 pl-4 bg-zinc-200 font-semibold rounded-md'>
                <option value="" disabled hidden>Job Type</option>
                <option value="Full Time">Full Time</option>
                <option value="Part Time">Part Time</option>
                <option value="Contract">Contract</option>
            </select>
            <button onClick={search} className='w-full lg:w-64 bg-blue-500 text-white font-bold py-3 rounded-md hover:bg-blue-600'>
                Search
            </button>
        </div>
    )
}

export default SearchBar;
