import { useState, useEffect } from "react";
import axios from "axios";
import "./ViewSubmissions.css";

function ViewSubmissions() {

    const [submissions, setSubmissions] = useState([]);

    const user = JSON.parse(
        localStorage.getItem("user")
    );

    useEffect(() => {

        axios.get(
            `http://127.0.0.1:8000/view-submissions/${user.id}`
        )

        .then((response) => {

            setSubmissions(
                response.data
            );

        })

        .catch((error) => {

            console.log(error);

        });

    }, []);

    return (

        <div className="viewsubmissions-page">

            <nav className="viewsubmissions-navbar">

                <div className="viewsubmissions-logo">

                    <h2>SkillBridge</h2>

                    <p>Mentor Portal</p>

                </div>

            </nav>

            <div className="viewsubmissions-container">

                <div className="viewsubmissions-header">

                    <h1>
                        Student Submissions
                    </h1>

                    <p>
                        Review assignments submitted
                        by learners.
                    </p>

                </div>

                <div className="viewsubmissions-stats">

                    <h2>
                        Total Submissions
                    </h2>

                    <h1>
                        {submissions.length}
                    </h1>

                </div>

                <div className="viewsubmissions-grid">

                    {
                        submissions.map((item) => (

                            <div
                                className="viewsubmissions-card"
                                key={item.id}
                            >

                                <h2>
                                    {item.task_title}
                                </h2>

                                <p>
                                    <strong>
                                        Learner:
                                    </strong>
                                    {" "}
                                    {item.student_name}
                                </p>

                                <p>
                                    <strong>
                                        Email:
                                    </strong>
                                    {" "}
                                    {item.student_email}
                                </p>

                                <p>
                                    <strong>
                                        Type:
                                    </strong>
                                    {" "}
                                    {item.submission_type}
                                </p>

                                <p>
                                    <strong>
                                        Submitted:
                                    </strong>
                                    {" "}
                                    {item.submitted_at}
                                </p>

                                <a
                                    className="viewsubmissions-link"
                                    href={item.submission_link}
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    Open Submission
                                </a>

                            </div>

                        ))
                    }

                </div>

            </div>

        </div>

    );

}

export default ViewSubmissions;