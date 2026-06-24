import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./AssignTeacher.css";

function AssignTeacher() {

    const { id } = useParams();

    const [course, setCourse] = useState(null);

    const [teachers, setTeachers] = useState([]);

    const [search, setSearch] = useState("");

    useEffect(() => {

        axios.get(
            `http://127.0.0.1:8000/get-course/${id}/`
        )

        .then((response) => {

            setCourse(
                response.data
            );

        })

        .catch((error) => {

            console.log(error);

        });

        axios.get(
            `http://127.0.0.1:8000/get-available-teachers/${id}/`
        )

        .then((response) => {

            setTeachers(
                response.data
            );

        })

        .catch((error) => {

            console.log(error);

        });

    }, [id]);

    function assignTeacher(teacherId) {

        axios.put(
            `http://127.0.0.1:8000/assign-teacher/${id}/`,
            {
                teacher: teacherId
            }
        )

        .then(() => {

            alert(
                "Mentor Assigned Successfully"
            );

            window.location.reload();

        })

        .catch((error) => {

            console.log(error);

        });

    }

    function removeTeacher() {

        axios.put(
            `http://127.0.0.1:8000/assign-teacher/${id}/`,
            {
                teacher: ""
            }
        )

        .then(() => {

            alert(
                "Mentor Removed Successfully"
            );

            window.location.reload();

        })

        .catch((error) => {

            console.log(error);

        });

    }

    const filteredTeachers =
        teachers.filter((teacher) =>
            teacher.name
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
                        Assign Mentor
                    </h1>

                    <p>
                        Select a mentor for this
                        internship program.
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
                                    Current Mentor :
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

                            {
                                course.teacher_name && (

                                    <button
                                        className="remove-btn"
                                        onClick={
                                            removeTeacher
                                        }
                                    >
                                        Remove Mentor
                                    </button>

                                )
                            }

                        </div>

                    )
                }

                <input

                    type="text"

                    placeholder=
                    "Search Mentor..."

                    value={search}

                    onChange={(e) =>
                        setSearch(
                            e.target.value
                        )
                    }

                    className="search-box"

                />

                <div className="teacher-grid">

                    {
                        filteredTeachers.map(
                            (teacher) => (

                                <div
                                    className="teacher-card"
                                    key={teacher.id}
                                >

                                    <h3>
                                        {teacher.name}
                                    </h3>

                                    <p>
                                        {teacher.email}
                                    </p>

                                    <button
                                        className="assign-btn"
                                        onClick={() =>
                                            assignTeacher(
                                                teacher.id
                                            )
                                        }
                                    >
                                        Assign Mentor
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

export default AssignTeacher;