import { useState, useEffect } from "react";
import axios from "axios";
import "./StudentAnnouncements.css";

function StudentAnnouncements() {

    const [announcements,
        setAnnouncements] = useState([]);

    const user = JSON.parse(
        localStorage.getItem("user")
    );

    useEffect(() => {

        axios.get(

            `http://127.0.0.1:8000/student-announcements/${user.id}/`

        )

        .then((response) => {

            setAnnouncements(
                response.data
            );

        })

        .catch((error) => {

            console.log(error);

        });

    }, []);

    return (

        <div className="studentannouncements-page">

            <nav className="studentannouncements-navbar">

                <div className="studentannouncements-logo">

                    <h2>SkillBridge</h2>

                    <p>Learner Portal</p>

                </div>

            </nav>

            <div className="studentannouncements-container">

                <div className="studentannouncements-header">

                    <h1>
                        Announcements
                    </h1>

                    <p>
                        Stay updated with the latest
                        information from your mentor.
                    </p>

                </div>

                <div className="studentannouncements-stats">

                    <h2>
                        Total Announcements
                    </h2>

                    <h1>
                        {announcements.length}
                    </h1>

                </div>

                <div className="studentannouncements-grid">

                    {
                        announcements.map((item) => (

                            <div
                                className="studentannouncements-card"
                                key={item.id}
                            >

                                <div className="studentannouncements-badge">

                                    Announcement

                                </div>

                                <h2>
                                    {item.title}
                                </h2>

                                <p
                                    className="studentannouncements-message"
                                >
                                    {item.message}
                                </p>

                                <p
                                    className="studentannouncements-date"
                                >

                                    📅 {item.created_at}

                                </p>

                            </div>

                        ))
                    }

                </div>

            </div>

        </div>

    );

}

export default StudentAnnouncements;