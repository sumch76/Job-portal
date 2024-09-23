import Navbar from "./Components/Navbar"
import Header from "./Components/Header"
import SearchBar from "./Components/SearchBar"
import JobCard from "./Components/JobCard"
// import jobData from "./JobDummyData"
import { useEffect, useState } from "react"
import { collection, query, orderBy, where, getDocs } from "firebase/firestore";
import {db} from "./firebase.config"

function App() {
  const [jobs, setJobs] = useState([]);
  const [customSearch, setCustomSearch] = useState(false);

  const fetchJobs = async() => {
    setCustomSearch(false);
    const tempJobs = []
    const jobsRef = query(collection(db, "jobs"));
    const q = query(jobsRef, orderBy("postedOn", "desc"));
    const req = await getDocs(q);

    req.forEach((job) => {
      // console.log(doc.id, " => ", doc.data());
      tempJobs.push({
        ...job.data(),
        id: job.id,
        postedOn: job.data().postedOn.toDate()
      })
    });
    setJobs(tempJobs);
  }

  const fetchJobsCustom = async(jobCriteria) => {
    setCustomSearch(true);
    const tempJobs = [];
    
    let jobsQuery = collection(db, "jobs");
  
    // Dynamically add filters based on selected criteria
    if (jobCriteria.type) {
      jobsQuery = query(jobsQuery, where("type", "==", jobCriteria.type));
    }
    if (jobCriteria.title) {
      jobsQuery = query(jobsQuery, where("title", "==", jobCriteria.title));
    }
    if (jobCriteria.experience) {
      jobsQuery = query(jobsQuery, where("experience", "==", jobCriteria.experience));
    }
    if (jobCriteria.location) {
      jobsQuery = query(jobsQuery, where("location", "==", jobCriteria.location));
    }
  
    jobsQuery = query(jobsQuery, orderBy("postedOn", "desc"));
  
    const req = await getDocs(jobsQuery);
    
    req.forEach((job) => {
      tempJobs.push({
        ...job.data(),
        id: job.id,
        postedOn: job.data().postedOn.toDate()
      });
    });
  
    setJobs(tempJobs);
  }
  
  useEffect(() => {
    fetchJobs()
  },[])


  return (
    <div>
      <Navbar />
      <Header />
      <SearchBar fetchJobsCustom={fetchJobsCustom}/>
      {customSearch && 
        <button onClick={fetchJobs} className="flex pl-[1250px] mb-2">
          <p className="bg-blue-500 px-10 py-2 rounded-md text-white">Clear Filters</p>
        </button>
      }
      {jobs.length > 0 ? (
        jobs.map((job)=> (
          <JobCard key={job.id} {...job}/>
        ))
      ) : (
        <p className="text-center text-gray-500">No jobs found matching your criteria</p>
      )}
    </div>
  )
}
  

export default App