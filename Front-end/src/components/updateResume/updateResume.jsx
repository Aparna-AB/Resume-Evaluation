import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Form } from "react-bootstrap";

import axios from "axios";
import "./updateResume.css";

export const UpdateResume = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [editResume, setEditResume] = useState({
        name: "",
        address: "",
        dateOfBirth: "",
        contact: "",
        maritalStatus: "",
        email: "",
        percentageHSS: "",
        degree: "",
        institution: "",
        CGPA: "",
        workExp: "",
        companyName: "",
        designation: "",
        expectedSalary: "",
    });

    const [validated, setValidated] = useState(false);

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
                setEditResume(resume);
            } else {
                console.log("resumes not found");
            }
        } catch (error) {
            console.error("Error occurred", error);
        }
    };

    const handleChange = (e) => {
        setEditResume({ ...editResume, [e.target.name]: e.target.value });
    };

    const isValidEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.stopPropagation();
        }
        setValidated(true);

        if (!editResume.name ||
            !editResume.address ||
            !editResume.dateOfBirth ||
            !editResume.contact ||
            !editResume.maritalStatus ||
            !editResume.email ||
            !editResume.degree ||
            !editResume.institution ||
            !editResume.CGPA ||
            !editResume.workExp ||
            !editResume.companyName ||
            !editResume.designation ||
            !editResume.expectedSalary) {
            console.log("Please fill all the fields");
            return;
        } else {
            if (!isValidEmail(editResume.email)) {
                alert("Invalid Email address");
                console.log("Invalid email");
                return;
            }

            sendDataToServer();
        }
    };

    const sendDataToServer = async () => {
        try {
            const res = await axios.patch(`http://localhost:8080/resume/${id}`, editResume);
            console.log("response", res);
            if (res.status === 200) {
                alert("Profile updated");
                navigate("/resume/viewAllResume");
            }
        } catch (error) {
            console.log(error);
        }
    };

    function handleBack() {
        navigate("/resume/viewAllResume");
    }

    return (
        <div className="mx-auto">
            <h1 style={{ textAlign: "center" }}>Edit Profile</h1>
            <Form
                id="update-resume-form-input"
                onSubmit={handleSubmit}
                validated={validated}
                className="resume-form">

                <Form.Group>
                    <Form.Control
                        required
                        type="text"
                        placeholder="Name"
                        name="name"
                        onChange={handleChange}
                        value={editResume?.name}
                    />
                    <Form.Control.Feedback type="invalid">
                        Please enter your name!
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group>
                    <Form.Control
                        required
                        type="text"
                        value={editResume?.address}
                        placeholder="address"
                        name="address"
                        onChange={handleChange}
                    />
                    <Form.Control.Feedback type="invalid">
                        Please Enter your address
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group>
                    <Form.Control
                        required
                        type="number"
                        placeholder="contact Number"
                        name="contact"
                        onChange={handleChange}
                        value={editResume?.contact}
                    />
                    <Form.Control.Feedback type="invalid">
                        Please enter your valid phone number!
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group>
                    <Form.Control
                        onChange={handleChange}
                        name="dateOfBirth"
                        value={editResume?.dateOfBirth}
                        type="date"
                        placeholder="Date of Birth"
                        required
                    />

                    <Form.Control.Feedback type="invalid">
                        Please enter your DOB!
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group>
                    <Form.Control
                        required
                        type="email"
                        placeholder="Email"
                        value={editResume?.email}
                        name="email"
                        onChange={handleChange}
                    />
                    <Form.Control.Feedback type="invalid">
                        Please enter a valid email.
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group>
                    <Form.Control
                        required
                        as="select"
                        type="select"
                        name="maritalStatus"
                        onChange={handleChange}
                        value={editResume?.maritalStatus}
                    >
                        <option value="">Select your marital Status</option>
                        <option value="Married">Married</option>
                        <option value="Single">Single</option>
                    </Form.Control>
                    <Form.Control.Feedback type="invalid">
                        Please select your marital status.
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group >
                    <Form.Control
                        required
                        type="text"
                        placeholder="degree"
                        name="degree"
                        onChange={handleChange}
                        value={editResume?.degree}
                    />
                    <Form.Control.Feedback type="invalid">
                        Please enter your degree!
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group>
                    <Form.Control
                        required
                        type="text"
                        value={editResume?.institution}
                        placeholder="institution"
                        name="institution"
                        onChange={handleChange}
                    />
                    <Form.Control.Feedback type="invalid">
                        Please Enter the name of your institution.
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group >
                    <Form.Control
                        required
                        type="number"
                        placeholder="CGPA"
                        name="CGPA"
                        onChange={handleChange}
                        value={editResume?.CGPA}
                    />
                    <Form.Control.Feedback type="invalid">
                        Please enter your degree CGPA!
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group >
                    <Form.Control
                        required
                        type="number"
                        placeholder="Years of experience"
                        name="workExp"
                        onChange={handleChange}
                        value={editResume?.workExp}
                    />
                    <Form.Control.Feedback type="invalid">
                        Please enter your Years of Experience!
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group >
                    <Form.Control
                        required
                        type="text"
                        placeholder="Enter Company Name"
                        name="companyName"
                        onChange={handleChange}
                        value={editResume?.companyName}
                    />
                    <Form.Control.Feedback type="invalid">
                        Please enter your Company name!
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group>
                    <Form.Control
                        required
                        type="text"
                        value={editResume?.designation}
                        placeholder="designation"
                        name="designation"
                        onChange={handleChange}
                    />
                    <Form.Control.Feedback type="invalid">
                        Please Enter your designation.
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group >
                    <Form.Control
                        required
                        type="number"
                        placeholder="Expected Salary"
                        name="expectedSalary"
                        onChange={handleChange}
                        value={editResume?.expectedSalary}
                    />
                    <Form.Control.Feedback type="invalid">
                        Please enter your salary expectation!
                    </Form.Control.Feedback>
                </Form.Group>


                <Button id="resume-signup-btn" type="submit">
                    Add Resume
                </Button>
                <Button variant="primary" className="resume-back-btn" onClick={handleBack}>
                                Back to HomePage
                            </Button>
            </Form>

        </div>
    );
};
