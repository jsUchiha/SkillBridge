import { useEffect, useState } from "react";
import axios from "axios";
import "./ViewStudents.css";

function ViewStudents() {

    const [students, setStudents] = useState([]);

    const user = JSON.parse(
        localStorage.getItem("user")
    );

    useEffect(() => {

        axios.get(
            `http://127.0.0.1:8000/teacher-students/${user.id}`
        )

        .then((response) => {

            setStudents(
                response.data
            );

        })

        .catch((error) => {

            console.log(error);

        });

    }, []);

    return (

        <div className="students-page">

            <nav className="top-navbar">

                <div className="nav-logo">

                    <h2>
                        SkillBridge
                    </h2>

                    <p>
                        Mentor Portal
                    </p>

                </div>

            </nav>

            <div className="students-container">

                <div className="page-header">

                    <h1>
                        My Learners
                    </h1>

                    <p>
                        View all learners enrolled
                        in your program.
                    </p>

                </div>

                <div className="stats-card">

                    <h2>
                        Total Learners
                    </h2>

                    <h1>
                        {students.length}
                    </h1>

                </div>

                <div className="students-grid">

                    {
                        students.map((student) => (

                            <div
                                className="student-card"
                                key={student.id}
                            >

                                <div className="avatar">

                                    {student.name
                                        .charAt(0)
                                        .toUpperCase()
                                    }

                                </div>

                                <h2>
                                    {student.name}
                                </h2>

                                <p>
                                    {student.email}
                                </p>

                            </div>

                        ))
                    }

                </div>

            </div>

        </div>

    );

}

export default ViewStudents;