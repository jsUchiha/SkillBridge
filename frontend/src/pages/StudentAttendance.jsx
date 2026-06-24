import {useEffect,useState} from "react";
import axios from "axios";
import "./StudentAttendance.css";

function StudentAttendance(){

    const [attendance,setAttendance] =
    useState(null);

    const user = JSON.parse(
        localStorage.getItem("user")
    );

    useEffect(()=>{

        axios.get(

            `http://127.0.0.1:8000/student-attendance/${user.id}/`

        )

        .then((response)=>{

            setAttendance(
                response.data
            );

        })

        .catch((error)=>{

            console.log(error);

        });

    },[]);

    if(!attendance){

        return <h1>Loading...</h1>;

    }

    return(

        <div className="studentattendance-page">

            <div className="studentattendance-navbar">

                <div>

                    <h2>SkillBridge</h2>

                    <p>
                        Student Portal
                    </p>

                </div>

            </div>

            <div className="studentattendance-container">

                <h1>
                    My Attendance
                </h1>

                <div className="studentattendance-summary">

                    <div className="attendance-card">

                        <h3>
                            Attendance %
                        </h3>

                        <h1>
                            {attendance.percentage}%
                        </h1>

                    </div>

                    <div className="attendance-card">

                        <h3>
                            Present
                        </h3>

                        <h1>
                            {attendance.present}
                        </h1>

                    </div>

                    <div className="attendance-card">

                        <h3>
                            Absent
                        </h3>

                        <h1>
                            {attendance.absent}
                        </h1>

                    </div>

                    <div className="attendance-card">

                        <h3>
    Working Days
</h3>

<h1>
    {attendance.working_days}
</h1>

                    </div>

                </div>

                <div className="progress-card">

                    <h3>
                        Attendance Progress
                    </h3>

                    <div className="progress-bar">

                        <div

                            className="progress-fill"

                            style={{

                                width:
                                `${attendance.percentage}%`

                            }}

                        >

                            {attendance.percentage}%

                        </div>

                    </div>

                </div>

                <div className="history-card">

                    <h2>
                        Attendance History
                    </h2>

                    <table>

                        <thead>

                            <tr>

                                <th>
                                    Date
                                </th>

                                <th>
                                    Status
                                </th>

                            </tr>

                        </thead>

                        <tbody>

                            {
                                attendance.records.map(
                                    (record,index)=>(
                                <tr key={index}>

                                    <td>
                                        {record.date}
                                    </td>

                                    <td>
                                        {record.status}
                                    </td>

                                </tr>
                            ))
                            }

                        </tbody>

                    </table>

                </div>

            </div>

        </div>

    );

}

export default StudentAttendance;