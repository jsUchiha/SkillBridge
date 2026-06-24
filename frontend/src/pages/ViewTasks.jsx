import { useEffect, useState } from "react";
import axios from "axios";
import "./ViewTasks.css";
import { useNavigate } from "react-router-dom";

function ViewTasks() {

    const [tasks, setTasks] = useState([]);

    const user = JSON.parse(
        localStorage.getItem("user")
    );

    const navigate = useNavigate();

    useEffect(() => {

        axios.get(
            `http://127.0.0.1:8000/teacher-tasks/${user.id}`
        )

        .then((response) => {

            setTasks(
                response.data
            );

        })

        .catch((error) => {

            console.log(error);

        });

    }, []);

    function deleteTask(id) {

        if (
            !window.confirm(
                "Delete this assignment?"
            )
        ) {
            return;
        }

        axios.delete(
            `http://127.0.0.1:8000/delete-task/${id}/`
        )

        .then(() => {

            alert(
                "Assignment Deleted"
            );

            setTasks(

                tasks.filter(

                    task => task.id !== id

                )

            );

        })

        .catch((error) => {

            console.log(error);

        });

    }

    return (

        <div className="viewtasks-page">

            <nav className="viewtasks-navbar">

                <div className="viewtasks-logo">

                    <h2>SkillBridge</h2>

                    <p>Mentor Portal</p>

                </div>

            </nav>

            <div className="viewtasks-container">

                <div className="viewtasks-header">

                    <h1>
                        Manage Assignments
                    </h1>

                    <p>
                        View, edit and manage
                        learner assignments.
                    </p>

                </div>

                <div className="viewtasks-stats-card">

                    <h2>
                        Total Assignments
                    </h2>

                    <h1>
                        {tasks.length}
                    </h1>

                </div>

                <div className="viewtasks-grid">

                    {
                        tasks.map((task) => (

                            <div
                                className="viewtasks-card"
                                key={task.id}
                            >

                                <h2>
                                    {task.title}
                                </h2>

                                <p className="viewtasks-description">

                                    {task.description}

                                </p>

                                <p className="viewtasks-due-date">

                                    📅 Due Date:
                                    {" "}
                                    {task.due_date}

                                </p>

                                <div className="viewtasks-buttons">

                                    <button
                                        className="viewtasks-edit-btn"
                                        onClick={() =>
                                            navigate(
                                                `/edit-task/${task.id}`
                                            )
                                        }
                                    >
                                        Edit
                                    </button>

                                    <button
                                        className="viewtasks-delete-btn"
                                        onClick={() =>
                                            deleteTask(task.id)
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

export default ViewTasks;