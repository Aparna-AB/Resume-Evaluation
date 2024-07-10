import { useState } from "react";
import { Button, Form, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

import "./addResume.css";
import Footer from "../Footer/footer";

export const AddResume = () => {
    const navigate = useNavigate();
    const [resumeData, setResumeData] = useState({
        name: "Anju",
        address: "Kollam",
        dateOfBirth: "",
        contact: "",
        maritalStatus: "",
        email: "Anju@gmail.com",
        percentageHSS: "",
        degree: "B.Tech",
        institution: "Carmel",
        CGPA: "",
        workExp: "",
        companyName: "UST",
        designation: "Developer",
        expectedSalary: "",
    });

    const [validated, setValidated] = useState(false);

    const handleChange = (e) => {
        setResumeData({ ...resumeData, [e.target.name]: e.target.value });
    };

    const handleFilechange = (e) => {
        setResumeData({ ...sellerData, [e.target.name]: e.target.files[0] });
    };

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.stopPropagation();
        }
        setValidated(true);

        if (
            !resumeData.name ||
            !resumeData.address ||
            !resumeData.dateOfBirth ||
            !resumeData.contact ||
            !resumeData.maritalStatus ||
            !resumeData.email ||
            !resumeData.degree ||
            !resumeData.institution ||
            !resumeData.CGPA ||
            !resumeData.workExp ||
            !resumeData.companyName ||
            !resumeData.designation ||
            !resumeData.expectedSalary
        ) {
            console.log("Please fill all the fields");
            return;
        } else {
            if (resumeData.contact.length !== 10) {
                console.log("Phone number must be 10 digits");
                return;
            }
            let phoneNumberReg = /^[0-9]{10}$/;
            if (!phoneNumberReg.test(resumeData.contact)) {
                alert("Phone number must be 10 digits");
                return;
            }
            if (!isValidEmail(resumeData.email)) {
                alert("Invalid Email Address");
                console.log("Invalid email");
                return;
            }

            sendDataToServer(resumeData);
        }
    };

    const sendDataToServer = async () => {
        try {
            let res = await axios.post('http://localhost:8180/resume/createResume', resumeData);
            if (res.status === 200) {
                console.log("resume created successfully");
                alert("resume created successful.");
                // setTimeout(() => {
                navigate("/resume/viewAllResume");
                // }, 1500);
            }
        } catch (error) {
            console.log(error);
            if (error.response?.status === 400 || error.response?.status === 404) {
                let mssg = error.response?.data?.message || "something went wrong ,please try later";
                alert(mssg);
            } else {
                alert("Internal server error");
            }
        }
    };

    function handleBack() {
        navigate("/HomePage");
    }

    return (
        <>
            <div>
                <Row className="align-items-center">
                    <Col md={6} className="resume-mainContent">
                        <img
                            src="https://play-lh.googleusercontent.com/Rwz-6aNqcv9zsJ60sJto3K-rDnTqdRltauV2r8qE8P8__Ndh5K1hwlCCUMh2HBuRqFU"
                            alt="Iphone Cart"
                        />
                    </Col>
                    <Col md={6}>
                        <Form
                            noValidate
                            validated={validated}
                            onSubmit={handleSubmit}
                            className="resume-form"
                        >
                            <Form.Group>
                                <Form.Control
                                    required
                                    type="text"
                                    placeholder="Name"
                                    name="name"
                                    onChange={handleChange}
                                    value={resumeData?.name}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Please enter your name!
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group>
                                <Form.Control
                                    required
                                    type="text"
                                    value={resumeData?.address}
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
                                    value={resumeData?.contact}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Please enter your valid phone number!
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group>
                                <Form.Control
                                    onChange={handleChange}
                                    name="dateOfBirth"
                                    value={resumeData?.dateOfBirth}
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
                                    value={resumeData?.email}
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
                                    value={resumeData?.maritalStatus}
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
                                    value={resumeData?.degree}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Please enter your degree!
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group>
                                <Form.Control
                                    required
                                    type="text"
                                    value={resumeData?.institution}
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
                                    value={resumeData?.CGPA}
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
                                    value={resumeData?.workExp}
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
                                    value={resumeData?.companyName}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Please enter your Company name!
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group>
                                <Form.Control
                                    required
                                    type="text"
                                    value={resumeData?.designation}
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
                                    value={resumeData?.expectedSalary}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Please enter your salary expectation!
                                </Form.Control.Feedback>
                            </Form.Group>


                            <Button id="resume-signup-btn" type="submit">
                                Add Resume
                            </Button>
                            <Button variant="success" className="resume-back-btn" onClick={handleBack}>
                                Back to HomePage
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </div>
            <div>
                <Footer />
            </div>
        </>
    );
};

