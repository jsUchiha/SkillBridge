import {useState,useEffect} from "react";
import axios from "axios";
import "./ViewCourse.css"
import { useNavigate } from "react-router-dom";

function ViewCourse (){
    const [course,setCourse]=useState([]);
    const navigate = useNavigate();
    useEffect(()=>{
        const user = JSON.parse(
    localStorage.getItem("user")
);

axios.get(

`http://127.0.0.1:8000/get-courses/${user.id}/`

)
        .then((response)=>{
            setCourse(response.data);
        })
        .catch((error)=>{
            console.log(error);
        });

    },[]);
   return(

    <div className="view-page">

        <nav className="top-navbar">

            <div className="nav-logo">

                <h2>SkillBridge</h2>

                <p>
                    Company Admin Portal
                </p>

            </div>

        </nav>

        <div className="view-container">

            <div className="page-header">

                <h1>
                    Manage Programs
                </h1>

                <p>
                    View, edit and manage
                    internship programs.
                </p>

            </div>

            <div className="course-grid">

                {course.map((course)=>(

                    <div
                        className="course-card"
                        key={course.id}
                    >

                        <div className="card-header">

                            <h2>
                                {course.title}
                            </h2>

                            <span
                                className={
                                    course.mode==="Online"
                                    ?
                                    "online-badge"
                                    :
                                    "hybrid-badge"
                                }
                            >
                                {course.mode}
                            </span>

                        </div>

                        <p className="description">

                            {course.description}

                        </p>

                        <div className="course-details">

                            <p>
                                💰 Fee :
                                ₹{course.fees}
                            </p>

                            <p>
                                ⏳ Duration :
                                {course.duration}
                            </p>

                            <p>
                                📅 Start :
                                {course.start_date}
                            </p>

                            <p>
                                📅 End :
                                {course.end_date}
                            </p>

                            {
                                course.mode==="Hybrid"
                                &&
                                <>
                                    <p>
                                        📍 Location :
                                        {course.location}
                                    </p>

                                    <p>
                                        🚪 Room :
                                        {course.room_no}
                                    </p>
                                </>
                            }

                        </div>

                        <div className="action-buttons">

                            <button
                                className="edit-btn"
                                onClick={()=>
                                    navigate(
                                        `/admin/edit-course/${course.id}`
                                    )
                                }
                            >
                                Edit
                            </button>

                            <button
                                className="mentor-btn"
                                onClick={()=>
                                    navigate(
                                        `/admin/assign-teacher/${course.id}`
                                    )
                                }
                            >
                                Mentors
                            </button>

                            <button
                                className="student-btn"
                                onClick={()=>
                                    navigate(
                                        `/admin/assign-students/${course.id}`
                                    )
                                }
                            >
                                Learners
                            </button>

                        </div>

                    </div>

                ))}

            </div>

        </div>

    </div>

);
}
export default ViewCourse;