import React, { useState } from 'react';
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBRow,
  MDBCol,
  MDBBtn
} from 'mdb-react-ui-kit';
import Navbar from './Navbar';
import './Jobs.css';
// import SearchBar from './Searchbar'
const Jobs = () => {
  const [keyword, setKeyword] = useState('');
  const [jobsInfo, setJobsInfo] = useState([]);

  const handleSubmit = async (e) => { 
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/user/jobs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          keyword: keyword
        }),
      });
      const data = await response.json();
      setJobsInfo(data.jobsInfo);
    } catch (error) {
      console.error('Error fetching data:', error);
      console.log(error);
    }
  };

  return (
    <div className='body-wrap boxed-container margin'>
      <Navbar />
      <div className="flex items-center justify-center">
        <form onSubmit={handleSubmit} className="flex">
          <label className="sr-only">Enter your field of interest:</label>
          <input
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="Enter your field of interest"
            className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mr-2"
          />
          <button
            type="submit"
            className='bg-blue-500 border-0 focus:outline-none hover:bg-blue-500 inline-flex items-center px-3 py-2 rounded text-base text-white'>
            Submit
          </button>
        </form>
      </div>
  
      <div>
  
        {jobsInfo && jobsInfo.map((job, index) => (
          <div key={index}>
          <MDBCard>
          <MDBCardBody>
            <MDBCardTitle>
              <div className="card-cont">
                <div className="job-title">{job.jobTitle}</div><br></br>
                <a href={job.url} className="job-url"> Click here for the link </a>  
            </div>
            </MDBCardTitle>
            {/* <a href={job.url}>{job.jobTitle}</a> */}
            {/* <p>{job.jobDescription}</p> */}
            {/* <MDBCardText> */}
            {/* <p>{job.jobDescription}</p> */}
            {/* </MDBCardText> */}
            
          </MDBCardBody>
          </MDBCard>

          </div>
        ))}
      </div>
    </div>
  
    );
};

export default Jobs;