import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./ViewSessions.css";

function ViewSessions() {

    const [sessions, setSessions] = useState([]);

    const user = JSON.parse(
        localStorage.getItem("user")
    );

    const navigate = useNavigate();

    useEffect(() => {

        axios.get(
            `http://127.0.0.1:8000/teacher-sessions/${user.id}/`
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

    function deleteSession(id) {

        if (
            !window.confirm(
                "Delete this session?"
            )
        ) {
            return;
        }

        axios.delete(
            `http://127.0.0.1:8000/delete-session/${id}/`
        )

        .then(() => {

            alert(
                "Session Deleted Successfully"
            );

            setSessions(

                sessions.filter(
                    session => session.id !== id
                )

            );

        })

        .catch((error) => {

            console.log(error);

        });

    }

    return (

        <div className="viewsessions-page">

            <nav className="viewsessions-navbar">

                <div className="viewsessions-logo">

                    <h2>SkillBridge</h2>

                    <p>Mentor Portal</p>

                </div>

            </nav>

            <div className="viewsessions-container">

                <div className="viewsessions-header">

                    <h1>Online Sessions</h1>

                    <p>
                        View and manage all your scheduled live sessions.
                    </p>

                </div>

                <div className="viewsessions-stats">

                    <h2>Total Sessions</h2>

                    <h1>{sessions.length}</h1>

                </div>

                <div className="viewsessions-grid">

                    {sessions.map((session) => (

                        <div
                            className="viewsessions-card"
                            key={session.id}
                        >

                            <h2>
                                {session.title}
                            </h2>

                            <p className="viewsessions-description">
                                {session.description}
                            </p>

                            <p>
                                <strong>Date:</strong>{" "}
                                {session.session_date}
                            </p>

                            <p>
                                <strong>Time:</strong>{" "}
                                {session.session_time}
                            </p>

                            <div className="viewsessions-buttons">

                                <a
                                    href={session.meet_link}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="viewsessions-link"
                                >
                                    Join Session
                                </a>

                                <button
                                    className="viewsessions-edit-btn"
                                    onClick={() =>
                                        navigate(
                                            `/edit-session/${session.id}`
                                        )
                                    }
                                >
                                    Edit
                                </button>

                                <button
                                    className="viewsessions-delete-btn"
                                    onClick={() =>
                                        deleteSession(session.id)
                                    }
                                >
                                    Delete
                                </button>

                            </div>

                        </div>

                    ))}

                </div>

            </div>

        </div>

    );

}

export default ViewSessions;