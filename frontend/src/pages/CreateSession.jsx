import { useState, useEffect } from "react";
import axios from "axios";
import "./CreateSession.css";

function CreateSession() {

    const user = JSON.parse(
        localStorage.getItem("user")
    );

    const [courseId, setCourseId] = useState("");

    const [session, setSession] = useState({

        title: "",
        description: "",
        meet_link: "",
        session_date: "",
        session_time: ""

    });

    useEffect(() => {

        axios.get(

            `http://127.0.0.1:8000/my-course/${user.id}`

        )

        .then((response) => {

            setCourseId(
                response.data.id
            );

        })

        .catch((error) => {

            console.log(error);

        });

    }, []);

    function handleChange(e) {

        const { name, value } = e.target;

        setSession({

            ...session,

            [name]: value

        });

    }

    function handleSubmit(e) {

        e.preventDefault();

        axios.post(

            "http://127.0.0.1:8000/create-session/",

            {

                ...session,

                teacher: user.id,

                course: courseId

            }

        )

        .then(() => {

            alert(
                "Online Session Created"
            );

            setSession({

                title: "",
                description: "",
                meet_link: "",
                session_date: "",
                session_time: ""

            });

        })

        .catch((error) => {

            console.log(error);

        });

    }

    return (

        <div className="createsession-page">

            <nav className="createsession-navbar">

                <div className="createsession-logo">

                    <h2>SkillBridge</h2>

                    <p>Mentor Portal</p>

                </div>

            </nav>

            <div className="createsession-container">

                <div className="createsession-header">

                    <h1>
                        Create Online Session
                    </h1>

                    <p>
                        Schedule a live class and
                        share the meeting link with learners.
                    </p>

                </div>

                <form
                    className="createsession-form"
                    onSubmit={handleSubmit}
                >

                    <div className="createsession-group">

                        <label>
                            Session Title
                        </label>

                        <input
                            type="text"
                            name="title"
                            placeholder="React Workshop"
                            value={session.title}
                            onChange={handleChange}
                            required
                        />

                    </div>

                    <div className="createsession-group">

                        <label>
                            Session Description
                        </label>

                        <textarea
                            name="description"
                            placeholder="Describe the session..."
                            value={session.description}
                            onChange={handleChange}
                            required
                        />

                    </div>

                    <div className="createsession-group">

                        <label>
                            Google Meet Link
                        </label>

                        <input
                            type="url"
                            name="meet_link"
                            placeholder="https://meet.google.com/..."
                            value={session.meet_link}
                            onChange={handleChange}
                            required
                        />

                    </div>

                    <div className="createsession-row">

                        <div className="createsession-group">

                            <label>
                                Session Date
                            </label>

                            <input
                                type="date"
                                name="session_date"
                                value={session.session_date}
                                onChange={handleChange}
                                required
                            />

                        </div>

                        <div className="createsession-group">

                            <label>
                                Session Time
                            </label>

                            <input
                                type="time"
                                name="session_time"
                                value={session.session_time}
                                onChange={handleChange}
                                required
                            />

                        </div>

                    </div>

                    <button
                        className="createsession-btn"
                        type="submit"
                    >

                        Create Session

                    </button>

                </form>

            </div>

        </div>

    );

}

export default CreateSession;