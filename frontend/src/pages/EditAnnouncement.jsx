import { useState, useEffect } from "react";
import { useParams, useNavigate }
from "react-router-dom";

import axios from "axios";

import "./EditAnnouncement.css";

function EditAnnouncement() {

    const { id } = useParams();

    const navigate = useNavigate();

    const [announcement,
        setAnnouncement] = useState({

            title: "",
            message: ""

        });

    useEffect(() => {

        axios.get(

            `http://127.0.0.1:8000/get-announcement/${id}/`

        )

        .then((response) => {

            setAnnouncement(
                response.data
            );

        })

        .catch((error) => {

            console.log(error);

        });

    }, [id]);

    function handleChange(e) {

        const { name, value } = e.target;

        setAnnouncement({

            ...announcement,

            [name]: value

        });

    }

    function handleSubmit(e) {

        e.preventDefault();

        axios.put(

            `http://127.0.0.1:8000/update-announcement/${id}/`,

            announcement

        )

        .then(() => {

            alert(
                "Announcement Updated"
            );

            navigate(
                "/view-announcements"
            );

        })

        .catch((error) => {

            console.log(error);

        });

    }

    return (

        <div className="editannouncement-page">

            <nav className="editannouncement-navbar">

                <div className="editannouncement-logo">

                    <h2>SkillBridge</h2>

                    <p>Mentor Portal</p>

                </div>

            </nav>

            <div className="editannouncement-container">

                <div className="editannouncement-header">

                    <h1>
                        Edit Announcement
                    </h1>

                    <p>
                        Update announcement details
                        for your learners.
                    </p>

                </div>

                <form
                    className="editannouncement-form"
                    onSubmit={handleSubmit}
                >

                    <div className="editannouncement-group">

                        <label>
                            Announcement Title
                        </label>

                        <input

                            type="text"

                            name="title"

                            value={
                                announcement.title
                            }

                            onChange={
                                handleChange
                            }

                            required

                        />

                    </div>

                    <div className="editannouncement-group">

                        <label>
                            Announcement Message
                        </label>

                        <textarea

                            name="message"

                            value={
                                announcement.message
                            }

                            onChange={
                                handleChange
                            }

                            required

                        />

                    </div>

                    <button
                        className="editannouncement-btn"
                        type="submit"
                    >

                        Update Announcement

                    </button>

                </form>

            </div>

        </div>

    );

}

export default EditAnnouncement;