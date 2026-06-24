import { useState } from "react";
import axios from "axios";
import "./CreateTask.css";

function CreateTask() {

    const user = JSON.parse(
        localStorage.getItem("user")
    );

    const [task, setTask] = useState({

        title: "",

        description: "",

        due_date: ""

    });

    function handleChange(e) {

        const { name, value } = e.target;

        setTask({

            ...task,

            [name]: value

        });

    }

    function handleSubmit(e) {

        e.preventDefault();

        axios.post(
            "http://127.0.0.1:8000/create-task/",
            {

                ...task,

                teacher: user.id

            }
        )

        .then(() => {

            alert(
                "Task Created Successfully"
            );

            setTask({

                title: "",

                description: "",

                due_date: ""

            });

        })

        .catch((error) => {

            console.log(error);

            alert(
                "Failed To Create Task"
            );

        });

    }

    return (

        <div className="task-page">

            <nav className="top-navbar">

                <div className="nav-logo">

                    <h2>SkillBridge</h2>

                    <p>Mentor Portal</p>

                </div>

            </nav>

            <div className="task-container">

                <div className="page-header">

                    <h1>
                        Create Assignment
                    </h1>

                    <p>
                        Create assignments and
                        distribute them to learners.
                    </p>

                </div>

                <form
                    className="task-form"
                    onSubmit={handleSubmit}
                >

                    <div className="form-group">

                        <label>
                            Assignment Title
                        </label>

                        <input
                            type="text"
                            name="title"
                            value={task.title}
                            onChange={handleChange}
                            placeholder="React Portfolio Project"
                            required
                        />

                    </div>

                    <div className="form-group">

                        <label>
                            Assignment Description
                        </label>

                        <textarea
                            name="description"
                            value={task.description}
                            onChange={handleChange}
                            placeholder="Describe the assignment requirements..."
                            required
                        />

                    </div>

                    <div className="form-group">

                        <label>
                            Submission Deadline
                        </label>

                        <input
                            type="date"
                            name="due_date"
                            value={task.due_date}
                            onChange={handleChange}
                            required
                        />

                    </div>

                    <button
                        type="submit"
                        className="create-btn"
                    >
                        Create Assignment
                    </button>

                </form>

            </div>

        </div>

    );

}

export default CreateTask;