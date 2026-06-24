import { useNavigate } from "react-router-dom";
import "./Home.css";

function Home() {

    const navigate = useNavigate();

    return (

        <div className="home">

            <nav className="navbar">

                <div className="logo">

                    <h2>SkillBridge</h2>

                    <p>
                        Industry Training Platform
                    </p>

                </div>

                <ul className="nav-links">

                    <li><a href="#home">Home</a></li>
                    <li><a href="#features">Features</a></li>
                    <li><a href="#about">About</a></li>
                    <li><a href="#contact">Contact</a></li>

                </ul>

            <div className="nav-buttons">

    <button
        className="organization-btn"
        onClick={() =>
            navigate("/create-organization")
        }
    >
        Create Organization
    </button>

    <button
        className="login-btn"
        onClick={() => navigate("/login")}
    >
        Login
    </button>

    <button
        className="register-btn"
        onClick={() => navigate("/register")}
    >
        Register
    </button>

</div>

            </nav>

            <section id="home" className="hero">

                <div className="hero-content">

                    <span className="hero-badge">
                        Trusted by Companies & Training Organizations
                    </span>

                    <h1>

                        SkillBridge

                        <br />

                        Industry Internship &
                        Training Management Platform

                    </h1>

                    <p>

                        Empower your organization to
                        manage internship programs,
                        mentors, learners, assignments,
                        announcements and live sessions
                        through one centralized platform.

                    </p>

                    <div className="hero-buttons">

    <button
        className="primary-btn"
        onClick={() =>
            navigate("/create-organization")
        }
    >
        Create Organization
    </button>

    <button
        className="secondary-btn"
        onClick={() => navigate("/register")}
    >
        Join Organization
    </button>

</div>

                </div>

            </section>

            <section className="stats">

                <div className="stat-card">
                    <h2>100+</h2>
                    <p>Organizations</p>
                </div>

                <div className="stat-card">
                    <h2>500+</h2>
                    <p>Learners</p>
                </div>

                <div className="stat-card">
                    <h2>50+</h2>
                    <p>Mentors</p>
                </div>

                <div className="stat-card">
                    <h2>200+</h2>
                    <p>Programs</p>
                </div>

            </section>

            <section id="features" className="features">

                <h2>
                    Platform Features
                </h2>

                <div className="feature-grid">

                    <div className="feature-card">
                        <h3>🏢 Program Management</h3>
                        <p>
                            Create and manage internship
                            and training programs.
                        </p>
                    </div>

                    <div className="feature-card">
                        <h3>👨‍🏫 Mentor Management</h3>
                        <p>
                            Assign mentors and manage
                            program responsibilities.
                        </p>
                    </div>

                    <div className="feature-card">
                        <h3>👨‍🎓 Learner Management</h3>
                        <p>
                            Manage learners and monitor
                            their progress.
                        </p>
                    </div>

                    <div className="feature-card">
                        <h3>📝 Assignment Tracking</h3>
                        <p>
                            Create assignments and review
                            submissions efficiently.
                        </p>
                    </div>

                    <div className="feature-card">
                        <h3>🎥 Live Sessions</h3>
                        <p>
                            Conduct online classes using
                            meeting links.
                        </p>
                    </div>

                    <div className="feature-card">
                        <h3>📢 Announcements</h3>
                        <p>
                            Share important updates and
                            notifications instantly.
                        </p>
                    </div>

                </div>

            </section>

            <section id="about" className="about">

                <h2>
                    About SkillBridge
                </h2>

                <p>

                    SkillBridge is a centralized internship
                    and training management platform
                    designed for companies, organizations
                    and training institutes.

                    It enables company administrators
                    to create internship programs,
                    assign mentors, manage learners,
                    conduct online sessions and track
                    assignment progress through a
                    single platform.

                </p>

            </section>

            <section className="workflow">

                <h2>
                    How SkillBridge Works
                </h2>

                <div className="workflow-steps">

                    <div>Company Admin</div>

                    <div>Create Program</div>

                    <div>Assign Mentors</div>

                    <div>Assign Learners</div>

                    <div>Conduct Training</div>

                    <div>Track Progress</div>

                </div>

            </section>

            <section id="contact" className="contact">

                <h2>
                    Contact Us
                </h2>

                <div className="contact-grid">

                    <div className="contact-card">

                        <h3>Email</h3>

                        <p>
                            support@skillbridge.com
                        </p>

                    </div>

                    <div className="contact-card">

                        <h3>Phone</h3>

                        <p>
                            +91 9876543210
                        </p>

                    </div>

                    <div className="contact-card">

                        <h3>Location</h3>

                        <p>
                            Chennai, Tamil Nadu
                        </p>

                    </div>

                </div>

            </section>

            <footer>

                <h2>SkillBridge</h2>

                <p>
                    Industry Internship &
                    Training Management Platform
                </p>

            </footer>

        </div>

    );

}

export default Home;