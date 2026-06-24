import { useState, useEffect } from "react";
import axios from "axios";
import "./TeacherMyCourse.css";

function TeacherMyCourse() {

    const [course, setCourse] = useState(null);

    const [message, setMessage] = useState("");

    const user = JSON.parse(
        localStorage.getItem("user")
    );

    useEffect(() => {

        if (!user) {

            setMessage(
                "Please Login Again"
            );

            return;

        }

        axios.get(
            `http://127.0.0.1:8000/my-course/${user.id}`
        )

        .then((response) => {

            if (
                response.data.message
            ) {

                setMessage(
                    response.data.message
                );

            }

            else {

                setCourse(
                    response.data
                );

            }

        })

        .catch((error) => {

            console.log(error);

            setMessage(
                "Something Went Wrong"
            );

        });

    }, []);

    if (message) {

        return (

            <div className="course-page">

                <nav className="top-navbar">

                    <div className="nav-logo">

                        <h2>
                            SkillBridge
                        </h2>

                        <p>
                            Mentor Portal
                        </p>

                    </div>

                </nav>

                <div className="course-container">

                    <h1>
                        My Program
                    </h1>

                    <h2>
                        {message}
                    </h2>

                </div>

            </div>

        );

    }

    if (!course) {

        return (

            <div className="course-page">

                <nav className="top-navbar">

                    <div className="nav-logo">

                        <h2>
                            SkillBridge
                        </h2>

                        <p>
                            Mentor Portal
                        </p>

                    </div>

                </nav>

                <div className="course-container">

                    <h1>
                        Loading...
                    </h1>

                </div>

            </div>

        );

    }

    return (

        <div className="course-page">

            <nav className="top-navbar">

                <div className="nav-logo">

                    <h2>
                        SkillBridge
                    </h2>

                    <p>
                        Mentor Portal
                    </p>

                </div>

            </nav>

            <div className="course-container">

                <div className="page-header">

                    <h1>
                        My Program
                    </h1>

                    <p id="teacher-course-p">Program assigned to you.</p>

                </div>

                <div className="course-card">

                    <div className="card-header">

                        <h2>
                            {course.title}
                        </h2>

                        <span
                            className={
                                course.mode === "Online"
                                ?
                                "online-badge"
                                :
                                "hybrid-badge"
                            }
                        >
                            {course.mode}
                        </span>

                    </div>

                    <p className="description">

                        {course.description}

                    </p>

                    <div className="course-details">

                        <p>
                            <b>💰 Fee : </b>
                            ₹{course.fees}
                        </p>

                        <p>
                            <b>⏳ Duration : </b>
                            {course.duration}
                        </p>

                        {
                            course.mode === "Hybrid" &&
                            <>
                                <p>
                                    <b>📍 Location : </b>
                                    {course.location}
                                </p>

                                <p>
                                    <b>🚪 Room : </b>
                                    {course.room_no}
                                </p>
                            </>
                        }

                    </div>

                </div>

            </div>

        </div>

    );

}

export default TeacherMyCourse;