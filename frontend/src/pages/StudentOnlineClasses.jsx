import { useState, useEffect } from "react";
import axios from "axios";
import "./StudentOnlineClasses.css";

function StudentOnlineClasses() {

    const [sessions, setSessions] = useState([]);

    const user = JSON.parse(
        localStorage.getItem("user")
    );

    useEffect(() => {

        axios.get(

            `http://127.0.0.1:8000/student-sessions/${user.id}/`

        )

        .then((response) => {

            setSessions(
                response.data
            );

        })

        .catch((error) => {

            console.log(error);

        });

    }, []);

    return (

        <div className="studentclasses-page">

            <nav className="studentclasses-navbar">

                <div className="studentclasses-logo">

                    <h2>SkillBridge</h2>

                    <p>Learner Portal</p>

                </div>

            </nav>

            <div className="studentclasses-container">

                <div className="studentclasses-header">

                    <h1>
                        Online Classes
                    </h1>

                    <p>
                        Join your scheduled live
                        internship sessions.
                    </p>

                </div>

                <div className="studentclasses-stats">

                    <h2>
                        Total Sessions
                    </h2>

                    <h1>
                        {sessions.length}
                    </h1>

                </div>

                <div className="studentclasses-grid">

                    {
                        sessions.map((session) => (

                            <div
                                className="studentclasses-card"
                                key={session.id}
                            >

                                <span
                                    className="studentclasses-badge"
                                >
                                    Live Session
                                </span>

                                <h2>
                                    {session.title}
                                </h2>

                                <p
                                    className="studentclasses-description"
                                >
                                    {session.description}
                                </p>

                                <p>

                                    <strong>
                                        📅 Date:
                                    </strong>

                                    {" "}

                                    {session.session_date}

                                </p>

                                <p>

                                    <strong>
                                        🕒 Time:
                                    </strong>

                                    {" "}

                                    {session.session_time}

                                </p>

                                <a

                                    className="studentclasses-join-btn"

                                    href={session.meet_link}

                                    target="_blank"

                                    rel="noreferrer"

                                >

                                    Join Meeting

                                </a>

                            </div>

                        ))
                    }

                </div>

            </div>

        </div>

    );

}

export default StudentOnlineClasses;