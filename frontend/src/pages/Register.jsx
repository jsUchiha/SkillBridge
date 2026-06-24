import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import "./Register.css";

function Register() {

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        organization_code:""
    });

    const [showPassword, setShowPassword] = useState(false);
    const [error,setError] = useState("");
    const [loading,setLoading] = useState(false);

    function handleChange(e) {

        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value
        });

    }

    function handleSubmit(e) {

    e.preventDefault();

    if(loading){

        return;

    }

    setLoading(true);

    setError("");

    axios.post(
        "http://127.0.0.1:8000/register/",
        formData
    )

    .then((response) => {

        if(response.data.success){

            alert(
                "Registered Successfully"
            );

            setFormData({

                name:"",
                email:"",
                password:"",
                organization_code:""

            });

        }

        else{

            setError(
                response.data.message
            );

        }

    })

    .catch((error) => {

        console.log(error);

        setError(
            "Registration Failed"
        );

    })

    .finally(() => {

        setLoading(false);

    });

}

    return (

        <div className="register-page">

            <div className="register-card">

                <div className="register-header">

                    <h1>SkillBridge</h1>

                    <p>
                        Create your account and start
                        managing internship programs.
                    </p>

                </div>

                <form onSubmit={handleSubmit}>

                    <div className="input-group">

                        <label>Full Name</label>

                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Enter your name"
                            required
                        />

                    </div>

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
                            type={showPassword ? "text" : "password"}
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Enter password"
                            required
                        />

                    </div>



                    <div className="show-password">

                        <input
                            type="checkbox"
                            onChange={() =>
                                setShowPassword(!showPassword)
                            }
                        />

                        <label>
                            Show Password
                        </label>

                    </div>

                    <div className="input-group">

    <label>
        Organization Code
    </label>

    <input
        type="text"
        name="organization_code"
        value={
            formData.organization_code
        }
        onChange={handleChange}
        placeholder="Enter Organization Code"
        required
    />

</div>
{
    error &&

    <p className="error">

        {error}

    </p>
}
                    
                    <button
    type="submit"
    className="register-button"
    disabled={loading}
>
    {
        loading

        ?

        "Registering..."

        :

        "Create Account"
    }
</button>

                </form>

                <p className="login-text">

                    Already have an account?

                    <Link to="/login">
                        Login
                    </Link>

                </p>

            </div>

        </div>

    );

}

export default Register;