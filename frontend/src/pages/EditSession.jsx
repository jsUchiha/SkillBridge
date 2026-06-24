import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./EditSession.css";

function EditSession() {

    const { id } = useParams();

    const navigate = useNavigate();

    const [session, setSession] = useState({

        title: "",
        description: "",
        meet_link: "",
        session_date: "",
        session_time: ""

    });

    useEffect(() => {

        axios.get(

            `http://127.0.0.1:8000/get-session/${id}/`

        )

        .then((response) => {

            setSession(
                response.data
            );

        })

        .catch((error) => {

            console.log(error);

        });

    }, [id]);

    function handleChange(e) {

        const { name, value } = e.target;

        setSession({

            ...session,

            [name]: value

        });

    }

    function handleSubmit(e) {

        e.preventDefault();

        axios.put(

            `http://127.0.0.1:8000/update-session/${id}/`,

            session

        )

        .then(() => {

            alert(
                "Session Updated Successfully"
            );

            navigate(
                "/view-sessions"
            );

        })

        .catch((error) => {

            console.log(error);

            alert(
                "Failed To Update Session"
            );

        });

    }

    return (

        <div className="editsession-page">

            <nav className="editsession-navbar">

                <div className="editsession-logo">

                    <h2>SkillBridge</h2>

                    <p>Mentor Portal</p>

                </div>

            </nav>

            <div className="editsession-container">

                <div className="editsession-card">

                    <h1>
                        Edit Online Session
                    </h1>

                    <form
                        onSubmit={handleSubmit}
                    >

                        <label>
                            Session Title
                        </label>

                        <input
                            type="text"
                            name="title"
                            value={session.title}
                            onChange={handleChange}
                            required
                        />

                        <label>
                            Description
                        </label>

                        <textarea
                            name="description"
                            value={session.description}
                            onChange={handleChange}
                            required
                        />

                        <label>
                            Meeting Link
                        </label>

                        <input
                            type="url"
                            name="meet_link"
                            value={session.meet_link}
                            onChange={handleChange}
                            required
                        />

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

                        <button
                            type="submit"
                        >
                            Update Session
                        </button>

                    </form>

                </div>

            </div>

        </div>

    );

}

export default EditSession;