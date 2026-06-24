import {useEffect,useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import "./Attendance.css";

function Attendance(){

    const [courses,setCourses]=useState([]);

    const navigate=useNavigate();

    const user=JSON.parse(
        localStorage.getItem("user")
    );

    useEffect(()=>{

        axios.get(

            `http://127.0.0.1:8000/teacher-attendance-courses/${user.id}/`

        )

        .then((response)=>{

            setCourses(
                response.data
            );

        })

        .catch((error)=>{

            console.log(error);

        });

    },[]);

    function openCourse(course){

        localStorage.setItem(

            "attendanceCourse",

            course.id

        );

        navigate(
            "/take-attendance"
        );

    }

    return(

        <div className="attendance-page">

            <div className="attendance-navbar">

                <div>

                    <h2>SkillBridge</h2>

                    <p>
                        Attendance Management
                    </p>

                </div>

            </div>

            <div className="attendance-container">

                <h1>
                    Select Course
                </h1>

                <div className="attendance-grid">

                    {
                        courses.map((course)=>(

                            <div
                                key={course.id}
                                className="attendance-card"
                                onClick={()=>
                                    openCourse(course)
                                }
                            >

                                <h2>
                                    {course.title}
                                </h2>

                                <p>
                                    {course.duration}
                                </p>

                                <p>
                                    {course.start_date}
                                </p>

                                <p>
                                    {course.end_date}
                                </p>

                            </div>

                        ))
                    }

                </div>

            </div>

        </div>

    );

}

export default Attendance;