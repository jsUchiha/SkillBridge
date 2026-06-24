import { useState } from "react";
import axios from "axios";
import "./CreateAnnouncement.css";

function CreateAnnouncement() {

    const user = JSON.parse(
        localStorage.getItem("user")
    );

    const [announcement, setAnnouncement] = useState({
        title: "",
        message: ""
    });

    function handleChange(e) {

        const { name, value } = e.target;

        setAnnouncement({
            ...announcement,
            [name]: value
        });

    }

    function handleSubmit(e) {

        e.preventDefault();

        axios.post(

            "http://127.0.0.1:8000/create-announcement/",

            {
                ...announcement,
                teacher: user.id
            }

        )

        .then(() => {

            alert(
                "Announcement Created Successfully"
            );

            setAnnouncement({
                title: "",
                message: ""
            });

        })

        .catch((error) => {

            console.log(error);

        });

    }

    return (

        <div className="createannouncement-page">

            <nav className="createannouncement-navbar">

                <div className="createannouncement-logo">

                    <h2>SkillBridge</h2>

                    <p>Mentor Portal</p>

                </div>

            </nav>

            <div className="createannouncement-container">

                <div className="createannouncement-header">

                    <h1>
                        Create Announcement
                    </h1>

                    <p>
                        Publish updates and important
                        information for learners.
                    </p>

                </div>

                <form
                    className="createannouncement-form"
                    onSubmit={handleSubmit}
                >

                    <div className="createannouncement-group">

                        <label>
                            Announcement Title
                        </label>

                        <input
                            type="text"
                            name="title"
                            placeholder="Holiday Notice"
                            value={announcement.title}
                            onChange={handleChange}
                            required
                        />

                    </div>

                    <div className="createannouncement-group">

                        <label>
                            Announcement Message
                        </label>

                        <textarea
                            name="message"
                            placeholder="Enter announcement details..."
                            value={announcement.message}
                            onChange={handleChange}
                            required
                        />

                    </div>

                    <button
                        type="submit"
                        className="createannouncement-btn"
                    >
                        Publish Announcement
                    </button>

                </form>

            </div>

        </div>

    );

}

export default CreateAnnouncement;