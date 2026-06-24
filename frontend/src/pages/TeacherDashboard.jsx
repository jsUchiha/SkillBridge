import { useNavigate } from "react-router-dom";
import "./TeacherDashboard.css";

function TeacherDashboard() {

    const navigate = useNavigate();
    const user = JSON.parse(
    localStorage.getItem("user")
);

    return (

        <div className="teacher-page">

            <nav className="teacher-navbar">

                <div className="teacher-logo">

                    <h2>SkillBridge</h2>

                    <p>
                        Mentor Portal
                    </p>

                </div>

                <button
                    className="logout-btn"
                    onClick={() => {

                        localStorage.removeItem("user");

                        navigate("/login");

                    }}
                >
                    Logout
                </button>

            </nav>

            <div className="teacher-content">

                <div className="welcome-section">

                    <h1>
    Welcome Back, {user.name} 👋
</h1>

                    <p>
                        Manage learners, assignments,
                        announcements and online sessions.
                    </p>

                </div>

                <div className="dashboard-grid">

                    <div
                        className="dashboard-card"
                        onClick={() =>
                            navigate("/teacher-my-course")
                        }
                    >
                        <h2>📚</h2>
                        <h3>My Program</h3>
                    </div>

                    <div
                        className="dashboard-card"
                        onClick={() =>
                            navigate("/view-students")
                        }
                    >
                        <h2>👨‍🎓</h2>
                        <h3>Learners</h3>
                    </div>

                    <div
                        className="dashboard-card"
                        onClick={() =>
                            navigate("/create-task")
                        }
                    >
                        <h2>📝</h2>
                        <h3>Create Task</h3>
                    </div>

                    <div
                        className="dashboard-card"
                        onClick={() =>
                            navigate("/view-tasks")
                        }
                    >
                        <h2>📋</h2>
                        <h3>Manage Tasks</h3>
                    </div>

                    <div
                        className="dashboard-card"
                        onClick={() =>
                            navigate("/view-submissions")
                        }
                    >
                        <h2>📂</h2>
                        <h3>Submissions</h3>
                    </div>

                    <div
                        className="dashboard-card"
                        onClick={() =>
                            navigate("/create-announcement")
                        }
                    >
                        <h2>📢</h2>
                        <h3>Create Notice</h3>
                    </div>

                    <div
                        className="dashboard-card"
                        onClick={() =>
                            navigate("/view-announcements")
                        }
                    >
                        <h2>📣</h2>
                        <h3>Announcements</h3>
                    </div>

                    <div
                        className="dashboard-card"
                        onClick={() =>
                            navigate("/create-session")
                        }
                    >
                        <h2>🎥</h2>
                        <h3>Create Session</h3>
                    </div>

                    <div
                        className="dashboard-card"
                        onClick={() =>
                            navigate("/view-sessions")
                        }
                    >
                        <h2>💻</h2>
                        <h3>Online Sessions</h3>
                    </div>

                    <div className="dashboard-card" onClick={()=>navigate("/attendance")}>
                    <h2>📋</h2>
                    <h3>Attendance</h3>
                    </div>

                    <div
    className="dashboard-card"
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

export default TeacherDashboard;