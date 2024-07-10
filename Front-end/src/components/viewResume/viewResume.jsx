import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import axios from "axios";
import "./viewResume.css";

export function ViewAllResume() {
    const navigate = useNavigate();
    const [viewResume, setViewResume] = useState([]);

    useEffect(() => {
        getResumeList();
    }, []);

    const getResumeList = async () => {
        try {
            let res = await axios.get("http://localhost:8180/resume/viewAllResume");
            console.log("response", res);
            let resume = res.data.data;
            if (resume) {
                console.log("List of all the resumes uploaded", resume);
                setViewResume(resume);
            } else {
                console.log("resumes not found");
            }
        } catch (error) {
            console.error("Error occurred", error);
        }
    };

    const updateResume = (id) => {
        navigate(`/resume/updateResume`);
    }

    const handleBack = () => {
        navigate("/HomePage");
    }

    const deleteResume = async (id) => {
        try {
            const res = await axios.delete(`http://localhost:8180/resume/${id}`);
            console.log("response", res);
            if (res.status === 200) {
                alert("resume deleted");
                // navigate to profile page.
            }
        } catch (error) {
            console.log("Error on delete resume", error)
        } finally {
            getAllResumes()
        }
    };


    return (
        <>
            <div>
                <h2 className="main">List Of All Resumes Created</h2>
            </div>
            <div>
                <h5 style={{ float: "right", cursor: "pointer" }} onMouseDown={handleBack}>
                    <u>Back</u>
                </h5>
            </div>
            <div className="resumeContainer">
                {viewResume.length === 0 && <h2>Data loading...</h2>}
                {viewResume.map((ress) => (
                    <div key={ress._id} className="card">
                        <div className="card-body">
                            <h4 style={{ color:"blue" }}><u>Personal Details</u></h4><br/>
                            <h5 style={{ fontFamily: "monospace" }}>
                                Name: <span style={{ textTransform: "capitalize" }}><strong>{ress.name}</strong></span>
                            </h5>
                            <h6>Address: <span style={{ fontFamily: "cursive" }}>{ress.address}</span></h6>
                            <h6>DOB: <span style={{ fontFamily: "cursive" }}>{ress.dateOfBirth}</span></h6>
                            <h6>Contact: <span style={{ fontFamily: "cursive" }}>{ress.contact}</span></h6>
                            <h6>Marital Status: <span style={{ fontFamily: "cursive" }}>{ress.maritalStatus}</span></h6>
                            <h6>Email: <span style={{ fontFamily: "cursive" }}>{ress.email}</span></h6>
                            <hr />
                            <h4 style={{ color:"blue" }}><u>Educational Qualification</u></h4><br/>
                            <h6>Degree: <span style={{ fontFamily: "cursive" }}>{ress.degree}</span></h6>
                            <h6>Institution: <span style={{ fontFamily: "cursive" }}>{ress.institution}</span></h6>
                            <h6>CGPA in Degree: <span style={{ fontFamily: "cursive" }}>{ress.CGPA}</span></h6>
                            <hr />
                            <h4 style={{ color:"blue" }}><u>Work Experience</u></h4><br/>

                            <h6>Work Experience: <span style={{ fontFamily: "cursive" }}>{ress.workExp}</span></h6>
                            <h6>Company Name: <span style={{ fontFamily: "cursive" }}>{ress.companyName}</span></h6>
                            <h6>Designation: <span style={{ fontFamily: "cursive" }}>{ress.designation}</span></h6>
                            <h6>Years of Exp: <span style={{ fontFamily: "cursive" }}>{ress.expectedSalary}</span></h6>
                        </div><br /><br />

                        <div className="btnLast">
                            <h5 onClick={() => updateResume(ress._id)} className="updateBtn">Update Resume</h5>
                            <h5 onClick={() => {
                                deleteResume(ress._id);
                            }} className="deleteBtn">Delete Resume </h5>
                        </div>



                    </div>
                ))}
            </div>
        </>
    );
}

