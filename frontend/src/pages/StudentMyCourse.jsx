import { useState, useEffect } from "react";
import axios from "axios";
import "./StudentMyCourse.css";

function StudentMyCourse() {

    const [course, setCourse] = useState(null);

    const [message, setMessage] = useState("");

    const user = JSON.parse(
        localStorage.getItem("user")
    );

    useEffect(() => {

        axios.get(
            `http://127.0.0.1:8000/student-course/${user.id}`
        )

        .then((response) => {

            if (response.data.message) {

                setMessage(
                    response.data.message
                );

            } else {

                setCourse(
                    response.data
                );

            }

        })

        .catch((error) => {

            console.log(error);

        });

    }, []);

    if (message) {

        return (

            <div className="studentcourse-page">

                <nav className="studentcourse-navbar">

                    <div className="studentcourse-logo">

                        <h2>SkillBridge</h2>

                        <p>Learner Portal</p>

                    </div>

                </nav>

                <div className="studentcourse-container">

                    <h1>My Program</h1>

                    <h2>{message}</h2>

                </div>

            </div>

        );

    }

    if (!course) {

        return (

            <div className="studentcourse-page">

                <nav className="studentcourse-navbar">

                    <div className="studentcourse-logo">

                        <h2>SkillBridge</h2>

                        <p>Learner Portal</p>

                    </div>

                </nav>

                <div className="studentcourse-container">

                    <h1>Loading...</h1>

                </div>

            </div>

        );

    }

    return (

        <div className="studentcourse-page">

            <nav className="studentcourse-navbar">

                <div className="studentcourse-logo">

                    <h2>SkillBridge</h2>

                    <p>Learner Portal</p>

                </div>

            </nav>

            <div className="studentcourse-container">

                <div className="studentcourse-header">

                    <h1>
                        My Program
                    </h1>

                    <p>
                        Program assigned to you.
                    </p>

                </div>

                <div className="studentcourse-card">

                    <div className="studentcourse-title-row">

                        <h2>
                            {course.title}
                        </h2>

                        <span
                            className={
                                course.mode === "Online"
                                ?
                                "studentcourse-online-badge"
                                :
                                "studentcourse-hybrid-badge"
                            }
                        >
                            {course.mode}
                        </span>

                    </div>

                    <p className="studentcourse-description">

                        {course.description}

                    </p>

                    <div className="studentcourse-details">

                        <p>
                            <b>💰 Fee : </b>
                            ₹{course.fees}
                        </p>

                        <p>
                            <b>⏳ Duration : </b>
                            {course.duration}
                        </p>

                        {
                            course.mode === "Hybrid" && (
                                <>
                                    <p>
                                        <b>📍 Location : </b>
                                        {course.location}
                                    </p>

                                    <p>
                                        <b>🚪 Room No : </b>
                                        {course.room_no}
                                    </p>
                                </>
                            )
                        }

                        <p>
                            <b>📅 Start Date : </b>
                            {course.start_date}
                        </p>

                        <p>
                            <b>🏁 End Date : </b>
                            {course.end_date}
                        </p>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default StudentMyCourse;