import "./Admin.css";
import { useNavigate } from "react-router-dom";
import { useEffect,useState } from "react";
import axios from "axios";

function Admin() {

    const navigate = useNavigate();
    const user = JSON.parse(
    localStorage.getItem("user")
);
const [organization,setOrganization] =
useState({});

useEffect(()=>{

    axios.get(

        `http://127.0.0.1:8000/organization-details/${user.id}/`

    )

    .then((response)=>{

        setOrganization(
            response.data
        );

    })

    .catch((error)=>{

        console.log(error);

    });

},[]);

    return (

        <div className="admin-page">

            <nav className="admin-navbar">

                <div className="admin-logo">

                    <h2>SkillBridge</h2>

                    <p>
                        Company Admin Portal
                    </p>

                </div>

                <ul className="admin-nav">

                    <li>Dashboard</li>

                    <li
                        onClick={() =>
                            navigate("/admin/create-course")
                        }
                    >
                        Create Program
                    </li>

                    <li
                        onClick={() =>
                            navigate("/admin/view-course")
                        }
                    >
                        Manage Programs
                    </li>

                    <li
    onClick={() =>
        navigate("/admin/mentors")
    }
>
    Mentors
</li>
<li
    onClick={() =>
        navigate("/profile")
    }
>
    My Profile
</li>

                </ul>

                <button
                    className="logout-btn"
                    onClick={() => {

                        localStorage.removeItem(
                            "user"
                        );

                        navigate("/login");

                    }}
                >
                    Logout
                </button>

            </nav>

            <div className="dashboard-container">

                <div className="welcome-section">

    <h1>
        Welcome Back, {user.name} 👋
    </h1>

    <p>
        Manage internship programs,
        mentors and learners from
        one centralized platform.
    </p>

    <div className="org-box">

    <div className="org-name-row">

    <strong>
        Organization:
    </strong>

    <span className="org-value">

        {organization.organization_name}

    </span>

</div>

    <div className="org-code-row">

    <strong>
        Organization Code:
    </strong>

<span className="org-value">

    {organization.organization_code}

</span>

    <button

        className="copy-btn"

        onClick={() => {

            navigator.clipboard.writeText(

                organization.organization_code

            );

            alert(
                "Organization Code Copied"
            );

        }}

    >

        📋 Copy

    </button>

</div>

</div>
</div>

                <div className="stats-grid">

                    <div className="stat-card">

                        <h2>📚</h2>

                        <h3>Programs</h3>

                        <p>
                            Create and manage
                            internship programs
                        </p>

                    </div>

                    <div className="stat-card">

                        <h2>👨‍🏫</h2>

                        <h3>Mentors</h3>

                        <p>
                            Assign mentors
                            to programs
                        </p>

                    </div>

                    <div className="stat-card">

                        <h2>👨‍🎓</h2>

                        <h3>Learners</h3>

                        <p>
                            Manage learner
                            enrollments
                        </p>

                    </div>

                </div>

                <h2 className="section-title">
                    Quick Actions
                </h2>

                <div className="action-grid">

                    <div
                        className="action-card"
                        onClick={() =>
                            navigate(
                                "/admin/create-course"
                            )
                        }
                    >

                        <h2>➕</h2>

                        <h3>
                            Create Program
                        </h3>

                        <p>
                            Add a new internship
                            or training program.
                        </p>

                    </div>

                    <div
                        className="action-card"
                        onClick={() =>
                            navigate(
                                "/admin/view-course"
                            )
                        }
                    >

                        <h2>⚙️</h2>

                        <h3>
                            Manage Programs
                        </h3>

                        <p>
                            Edit programs,
                            assign mentors and
                            learners.
                        </p>

                    </div>


                    <div
    className="action-card"
    onClick={() =>
        navigate("/admin/mentors")
    }
>

    <h2>👨‍🏫</h2>

    <h3>
        Manage Mentors
    </h3>

    <p>
        Create and manage mentors.
    </p>

</div>

<div
    className="action-card"
    onClick={() =>
        navigate("/profile")
    }
>

    <h2>👤</h2>

    <h3>
        My Profile
    </h3>

    <p>
        View and update your
        personal information.
    </p>

</div>

                </div>

            </div>

        </div>

    );

}

export default Admin;