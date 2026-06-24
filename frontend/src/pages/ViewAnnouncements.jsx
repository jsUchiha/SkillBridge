import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./ViewAnnouncements.css";

function ViewAnnouncements() {

    const [announcements,
        setAnnouncements] = useState([]);

    const navigate = useNavigate();

    const user = JSON.parse(
        localStorage.getItem("user")
    );

    useEffect(() => {

        axios.get(

            `http://127.0.0.1:8000/teacher-announcements/${user.id}/`

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

    function deleteAnnouncement(id) {

        if (
            !window.confirm(
                "Delete this announcement?"
            )
        ) {
            return;
        }

        axios.delete(

            `http://127.0.0.1:8000/delete-announcement/${id}/`

        )

        .then(() => {

            alert(
                "Announcement Deleted"
            );

            setAnnouncements(

                announcements.filter(

                    announcement =>
                    announcement.id !== id

                )

            );

        })

        .catch((error) => {

            console.log(error);

        });

    }

    return (

        <div className="viewannouncements-page">

            <nav className="viewannouncements-navbar">

                <div className="viewannouncements-logo">

                    <h2>SkillBridge</h2>

                    <p>Mentor Portal</p>

                </div>

            </nav>

            <div className="viewannouncements-container">

                <div className="viewannouncements-header">

                    <h1>
                        Manage Announcements
                    </h1>

                    <p>
                        View, edit and manage
                        announcements for learners.
                    </p>

                </div>

                <div className="viewannouncements-stats">

                    <h2>
                        Total Announcements
                    </h2>

                    <h1>
                        {announcements.length}
                    </h1>

                </div>

                <div className="viewannouncements-grid">

                    {
                        announcements.map(
                            (announcement) => (

                                <div
                                    className="viewannouncements-card"
                                    key={announcement.id}
                                >

                                    <h2><spam>Title : </spam>
                                        {announcement.title}
                                    </h2>

                                    <p><b>Message : </b>
                                        {announcement.message}
                                    </p>

                                    <div
                                        className="viewannouncements-buttons"
                                    >

                                        <button
                                            className="viewannouncements-edit-btn"
                                            onClick={() =>

                                                navigate(

                                                    `/edit-announcement/${announcement.id}`

                                                )

                                            }
                                        >

                                            Edit

                                        </button>

                                        <button
                                            className="viewannouncements-delete-btn"
                                            onClick={() =>

                                                deleteAnnouncement(
                                                    announcement.id
                                                )

                                            }
                                        >

                                            Delete

                                        </button>

                                    </div>

                                </div>

                            ))
                    }

                </div>

            </div>

        </div>

    );

}

export default ViewAnnouncements;