import { useState, useEffect } from "react";
import axios from "axios";
import "./MyTasks.css";

function MyTasks() {

    const [tasks, setTasks] = useState([]);

    const [submission, setSubmission] = useState({});

    const [submissionType,
        setSubmissionType] = useState({});

    const user = JSON.parse(
        localStorage.getItem("user")
    );

    useEffect(() => {

        axios.get(
            `http://127.0.0.1:8000/student-tasks/${user.id}`
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

    function handleSubmission(taskId, text) {

        setSubmission({

            ...submission,

            [taskId]: text

        });

    }

    function submitTask(taskId) {

        axios.post(

            "http://127.0.0.1:8000/submit-task/",

            {

                task: taskId,

                student: user.id,

                submission_type:
                    submissionType[taskId],

                submission_link:
                    submission[taskId]

            }

        )

        .then(() => {

            alert(
                "Task Submitted Successfully"
            );

        })

        .catch((error) => {

            console.log(error);

        });

    }

    return (

        <div className="studenttasks-page">

            <nav className="studenttasks-navbar">

                <div className="studenttasks-logo">

                    <h2>SkillBridge</h2>

                    <p>Learner Portal</p>

                </div>

            </nav>

            <div className="studenttasks-container">

                <div className="studenttasks-header">

                    <h1>
                        My Assignments
                    </h1>

                    <p>
                        Complete and submit your
                        assigned tasks.
                    </p>

                </div>

                <div className="studenttasks-stats">

                    <h2>
                        Total Assignments
                    </h2>

                    <h1>
                        {tasks.length}
                    </h1>

                </div>

                <div className="studenttasks-grid">

                    {
                        tasks.map((task) => (

                            <div
                                className="studenttasks-card"
                                key={task.id}
                            >

                                <h2>
                                    {task.title}
                                </h2>

                                <p
                                    className="studenttasks-description"
                                >
                                    {task.description}
                                </p>

                                <p
                                    className="studenttasks-due"
                                >
                                    📅 Due Date:
                                    {" "}
                                    {task.due_date}
                                </p>

                                <label>
                                    Submission Type
                                </label>

                                <select

                                    className="studenttasks-select"

                                    value={
                                        submissionType[task.id] || ""
                                    }

                                    onChange={(e) =>
                                        setSubmissionType({

                                            ...submissionType,

                                            [task.id]:
                                                e.target.value

                                        })
                                    }
                                >

                                    <option value="">
                                        Select Type
                                    </option>

                                    <option value="Github">
                                        Github
                                    </option>

                                    <option value="Google Drive">
                                        Google Drive
                                    </option>

                                    <option value="Other">
                                        Other
                                    </option>

                                </select>

                                <label>
                                    Submission Link
                                </label>

                                <input

                                    className="studenttasks-input"

                                    type="url"

                                    placeholder="Paste submission link"

                                    value={
                                        submission[task.id] || ""
                                    }

                                    onChange={(e) =>
                                        handleSubmission(

                                            task.id,

                                            e.target.value

                                        )
                                    }

                                />

                                <button

                                    className="studenttasks-submit-btn"

                                    onClick={() =>
                                        submitTask(
                                            task.id
                                        )
                                    }

                                >

                                    Submit Assignment

                                </button>

                            </div>

                        ))
                    }

                </div>

            </div>

        </div>

    );

}

export default MyTasks;