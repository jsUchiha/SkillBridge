import {useEffect,useState} from "react";
import axios from "axios";
import "./TakeAttendance.css";

function TakeAttendance() {

    const [attendance, setAttendance] = useState(null);
    const [changes,setChanges] = useState([]);

    const courseId = localStorage.getItem(
        "attendanceCourse"
    );

    useEffect(() => {

        axios.get(
            `http://127.0.0.1:8000/attendance-sheet/${courseId}/`
        )

        .then((response) => {

            setAttendance(
                response.data
            );

        })

        .catch((error) => {

            console.log(error);

        });

    }, []);

    function updateAttendance(
    attendanceId,
    status
){

    setAttendance({

        ...attendance,

        students:

        attendance.students.map(

            student => ({

                ...student,

                records:

                student.records.map(

                    record =>

                    record.id === attendanceId

                    ?

                    {
                        ...record,
                        status:status
                    }

                    :

                    record

                )

            })

        )

    });

    setChanges(prev => [

        ...prev.filter(

            item =>

            item.id !== attendanceId

        ),

        {

            id:attendanceId,

            status:status

        }

    ]);

}

async function saveAttendance(){

    if(changes.length===0){

        alert(
            "No Changes Made"
        );

        return;

    }

    try{

        await Promise.all(

            changes.map(item =>

                axios.put(

                    `http://127.0.0.1:8000/update-attendance/${item.id}/`,

                    {

                        status:item.status

                    }

                )

            )

        );

        alert(
            "Attendance Saved Successfully"
        );

        setChanges([]);

    }

    catch(error){

        console.log(error);

        alert(
            "Failed To Save Attendance"
        );

    }

}

    if (!attendance) {

        return <h1>Loading...</h1>;

    }

    return (

        <div className="takeattendance-page">

            <div className="takeattendance-navbar">

                <div className="takeattendance-logo">

                    <h2>SkillBridge</h2>

                    <p>Mentor Attendance Portal</p>

                </div>

            </div>

            <div className="takeattendance-container">

                <div className="takeattendance-header">

                    <h1>
                        {attendance.course}
                    </h1>

                </div>

                <div className="takeattendance-summary">

    <div className="summary-card">

        <h3>
            Students
        </h3>

        <p>
            {attendance.students.length}
        </p>

    </div>

    <div className="summary-card">

        <h3>
            Total Days
        </h3>

        <p>
            {attendance.dates.length}
        </p>

    </div>

    <div className="summary-card">

        <h3>
            Unsaved Changes
        </h3>

        <p>
            {changes.length}
        </p>

    </div>

</div>

                <div className="takeattendance-legend">

                    <div className="legend-item">

                        <span className="legend-box legend-present">
                            P
                        </span>

                        <span>Present</span>

                    </div>

                    <div className="legend-item">

                        <span className="legend-box legend-absent">
                            A
                        </span>

                        <span>Absent</span>

                    </div>

                    <div className="legend-item">

                        <span className="legend-box legend-none">
                            N
                        </span>

                        <span>Holiday / No Class</span>

                    </div>

                </div>

                <div className="takeattendance-table-wrapper">

                    <table className="takeattendance-table">

                        <thead>

                            <tr>

                                <th>
                                    Student
                                </th>

                                {
                                    attendance.dates.map(
                                        (date) => (

                                            <th key={date}>

                                                {
                                                    new Date(
                                                        date
                                                    ).toLocaleDateString(

                                                        "en-IN",

                                                        {
                                                            weekday: "short",
                                                            day: "numeric",
                                                            month: "short"
                                                        }

                                                    )
                                                }

                                            </th>

                                        )
                                    )
                                }

                            </tr>

                        </thead>

                        <tbody>

                            {
                                attendance.students.map(
                                    (student) => (

                                        <tr
                                            key={
                                                student.student_id
                                            }
                                        >

                                            <td
                                                className="student-name"
                                            >

                                                {
                                                    student.student_name
                                                }

                                            </td>

                                            {
                                                student.records.map(
                                                    (record) => (

                                                        <td
                                                            key={record.id}
                                                        >

                                                            <div className="attendance-cell">

                                                                <button

                                                                    className={`attendance-btn attendance-present ${record.status === "Present"
                                                                            ? "active-present"
                                                                            : ""
                                                                        }`}

                                                                    onClick={() =>
                                                                        updateAttendance(
                                                                            record.id,
                                                                            "Present"
                                                                        )
                                                                    }

                                                                >

                                                                    P

                                                                </button>

                                                                <button

                                                                    className={`attendance-btn attendance-absent ${record.status === "Absent"
                                                                            ? "active-absent"
                                                                            : ""
                                                                        }`}

                                                                    onClick={() =>
                                                                        updateAttendance(
                                                                            record.id,
                                                                            "Absent"
                                                                        )
                                                                    }

                                                                >

                                                                    A

                                                                </button>

                                                                <button

                                                                    className={`attendance-btn attendance-none ${record.status === "None"
                                                                            ? "active-none"
                                                                            : ""
                                                                        }`}

                                                                    onClick={() =>
                                                                        updateAttendance(
                                                                            record.id,
                                                                            "None"
                                                                        )
                                                                    }

                                                                >

                                                                    N

                                                                </button>

                                                            </div>

                                                        </td>

                                                    )
                                                )
                                            }

                                        </tr>

                                    )
                                )
                            }

                        </tbody>

                    </table>

</div>

<div className="takeattendance-save-section">

    <button

        className="takeattendance-save-btn"

        onClick={saveAttendance}

    >

        Save Attendance

    </button>

</div>

            </div>

        </div>

    );

}

export default TakeAttendance;