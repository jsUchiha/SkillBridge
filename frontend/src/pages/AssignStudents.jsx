import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./AssignStudents.css";

function AssignStudents() {

    const { id } = useParams();

    const [course, setCourse] = useState(null);

    const [students, setStudents] = useState([]);

    const [enrolledStudents,
        setEnrolledStudents] = useState([]);

    const [search, setSearch] = useState("");

    useEffect(() => {

        loadData();

    }, [id]);

    function loadData() {

        axios.get(
            `http://127.0.0.1:8000/get-course/${id}/`
        )

        .then((response) => {

            setCourse(
                response.data
            );

        });

        axios.get(
            `http://127.0.0.1:8000/available-students/${id}/`
        )

        .then((response) => {

            setStudents(
                response.data
            );

        });

        axios.get(
            `http://127.0.0.1:8000/enrolled-students/${id}/`
        )

        .then((response) => {

            setEnrolledStudents(
                response.data
            );

        });

    }

    function assignStudent(studentId) {

        axios.post(
            `http://127.0.0.1:8000/assign-student/${id}/`,
            {
                student: studentId
            }
        )

        .then(() => {

            alert(
                "Learner Assigned Successfully"
            );

            loadData();

        });

    }

    function removeStudent(studentId) {

        axios.delete(
            `http://127.0.0.1:8000/remove-student/${id}/${studentId}/`
        )

        .then(() => {

            alert(
                "Learner Removed Successfully"
            );

            loadData();

        });

    }

    const filteredStudents =
        students.filter((student) =>

            student.name
                .toLowerCase()
                .includes(
                    search.toLowerCase()
                )

        );

    return (

        <div className="assign-page">

            <nav className="top-navbar">

                <div className="nav-logo">

                    <h2>SkillBridge</h2>

                    <p>
                        Company Admin Portal
                    </p>

                </div>

            </nav>

            <div className="assign-container">

                <div className="page-header">

                    <h1>
                        Assign Learners
                    </h1>

                    <p>
                        Manage learner enrollment
                        for this internship program.
                    </p>

                </div>

                {
                    course && (

                        <div className="course-info">

                            <h2>
                                {course.title}
                            </h2>

                            <p>

                                <strong>
                                    Mentor :
                                </strong>

                                {" "}

                                {
                                    course.teacher_name
                                        ?
                                        course.teacher_name
                                        :
                                        "Not Assigned"
                                }

                            </p>

                        </div>

                    )
                }

                <div className="enrolled-section">

                    <h2>
                        Enrolled Learners
                    </h2>

                    {
                        enrolledStudents.length === 0
                            ?

                            <p>
                                No Learners Assigned
                            </p>

                            :

                            enrolledStudents.map(
                                (student) => (

                                    <div
                                        className="enrolled-card"
                                        key={student.id}
                                    >

                                        <div>

                                            <h3>
                                                {student.name}
                                            </h3>

                                            <p>
                                                {student.email}
                                            </p>

                                        </div>

                                        <button
                                            className="remove-btn"
                                            onClick={() =>
                                                removeStudent(
                                                    student.id
                                                )
                                            }
                                        >
                                            Remove
                                        </button>

                                    </div>

                                )
                            )
                    }

                </div>

                <input

                    type="text"

                    placeholder=
                    "Search Learner..."

                    value={search}

                    onChange={(e) =>
                        setSearch(
                            e.target.value
                        )
                    }

                    className="search-box"

                />

                <div className="student-grid">

                    {
                        filteredStudents.map(
                            (student) => (

                                <div
                                    className="student-card"
                                    key={student.id}
                                >

                                    <h3>
                                        {student.name}
                                    </h3>

                                    <p>
                                        {student.email}
                                    </p>

                                    <button
                                        className="assign-btn"
                                        onClick={() =>
                                            assignStudent(
                                                student.id
                                            )
                                        }
                                    >
                                        Add Learner
                                    </button>

                                </div>

                            )
                        )
                    }

                </div>

            </div>

        </div>

    );

}

export default AssignStudents;