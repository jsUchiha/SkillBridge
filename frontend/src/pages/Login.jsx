import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css";

function Login() {

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const [showPassword, setShowPassword] = useState(false);

    const [error, setError] = useState("");

    const navigate = useNavigate();

    function handleChange(e) {

        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value
        });

    }

    function handleSubmit(e) {

        e.preventDefault();

        setError("");

        axios.post(
            "http://127.0.0.1:8000/login/",
            formData
        )

        .then((response) => {

    if (response.data.success) {

        localStorage.setItem(

            "user",

            JSON.stringify(response.data)

        );

        if (

            !response.data.profile_completed

        ) {

            navigate(
                "/complete-profile"
            );

        }

        else {

            if (

                response.data.role ===
                "admin"

            ) {

                navigate("/admin");

            }

            else if (

                response.data.role ===
                "teacher"

            ) {

                navigate("/teacher");

            }

            else if (

                response.data.role ===
                "student"

            ) {

                navigate("/student");

            }

        }

    }

    else {

        setError(
            response.data.message
        );

    }

})

        .catch(() => {

            setError(
                "Login Failed"
            );

        });

    }

    return (

        <div className="login-page">

            <div className="login-card">

                <div className="login-header">

                    <h1>SkillBridge</h1>

                    <p>

                        Sign in to access your
                        internship management portal.

                    </p>

                </div>

                <form onSubmit={handleSubmit}>

                    <div className="input-group">

                        <label>Email Address</label>

                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter your email"
                            required
                        />

                    </div>

                    <div className="input-group">

                        <label>Password</label>

                        <input
                            type={
                                showPassword
                                    ? "text"
                                    : "password"
                            }
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Enter password"
                            required
                        />

                    </div>

                    {
                        error && (

                            <p className="error">

                                {error}

                            </p>

                        )
                    }

                    <div className="show-password">

                        <input
                            type="checkbox"
                            onChange={() =>
                                setShowPassword(
                                    !showPassword
                                )
                            }
                        />

                        <label>

                            Show Password

                        </label>

                    </div>

                    <button
                        type="submit"
                        className="login-button"
                    >
                        Login
                    </button>

                </form>

                <p className="register-text">

                    Don't have an account?

                    <Link to="/register">
                        Register
                    </Link>

                </p>

            </div>

        </div>

    );

}

export default Login;