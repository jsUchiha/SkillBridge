import { useNavigate } from "react-router-dom";
import "./StudentDashboard.css";

function StudentDashboard() {

    const navigate = useNavigate();
    const user = JSON.parse(
    localStorage.getItem("user")
);

    return (

        <div className="studentdashboard-page">

            <nav className="studentdashboard-navbar">

                <div className="studentdashboard-logo">

                    <h2>SkillBridge</h2>

                    <p>Learner Portal</p>

                </div>

                <button
                    className="studentdashboard-logout"
                    onClick={() => {

                        localStorage.removeItem("user");

                        navigate("/login");

                    }}
                >
                    Logout
                </button>

            </nav>

            <div className="studentdashboard-content">

                <div className="studentdashboard-header">

                    <h1>
    Welcome Back, {user.name} 👋
</h1>

                    <p>
                        Track your internship progress,
                        assignments, announcements and
                        live sessions.
                    </p>

                </div>

                <div className="studentdashboard-grid">

                    <div
                        className="studentdashboard-card"
                        onClick={() =>
                            navigate("/student-course")
                        }
                    >
                        <h2>📚</h2>
                        <h3>My Program</h3>
                    </div>

                    <div
                        className="studentdashboard-card"
                        onClick={() =>
                            navigate("/my-tasks")
                        }
                    >
                        <h2>📝</h2>
                        <h3>Assignments</h3>
                    </div>

                    <div
                        className="studentdashboard-card"
                        onClick={() =>
                            navigate("/announcements")
                        }
                    >
                        <h2>📢</h2>
                        <h3>Announcements</h3>
                    </div>

                    <div
                        className="studentdashboard-card"
                        onClick={() =>
                            navigate("/online-classes")
                        }
                    >
                        <h2>🎥</h2>
                        <h3>Online Classes</h3>
                    </div>

                 <div
    className="studentdashboard-card"
    onClick={() =>
        navigate("/student-attendance")
    }
>
    <h2>📋</h2>
    <h3>Attendance</h3>
</div>

<div
    className="studentdashboard-card"
    onClick={() =>
        navigate("/profile")
    }
>
    <h2>👤</h2>
    <h3>My Profile</h3>
</div>

                </div>

            </div>

        </div>

    );

}

export default StudentDashboard;