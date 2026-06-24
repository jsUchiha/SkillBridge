import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./CompleteProfile.css";

function CompleteProfile() {

    const navigate = useNavigate();

    const user = JSON.parse(
        localStorage.getItem("user")
    );

    const [formData,setFormData] = useState({

        user:user.id,

        date_of_birth:"",
        phone:"",
        address:"",
        gender:"",

        college_name:"",
        department:"",
        register_number:"",
        year_of_study:"",
        linkedin:"",
        github:"",

        qualification:"",
        specialization:"",
        experience:"",
        bank_account:"",
        ifsc_code:"",
        account_holder:""

    });

    function handleChange(e){

        const {name,value} = e.target;

        setFormData({

            ...formData,

            [name]:value

        });

    }

    function handleSubmit(e){

        e.preventDefault();

        axios.post(

            "http://127.0.0.1:8000/create-profile/",

            formData

        )

        .then(()=>{

            alert(
                "Profile Completed Successfully"
            );

            if(user.role==="admin"){

                navigate("/admin");

            }

            else if(user.role==="teacher"){

                navigate("/teacher");

            }

            else{

                navigate("/student");

            }

        })

        .catch((error)=>{

            console.log(error);

            alert(
                "Failed To Save Profile"
            );

        });

    }

    return(

    <div className="profile-page">

        <nav className="profile-navbar">

            <div className="profile-logo">

                <h2>SkillBridge</h2>

                <p>

                    {
                        user.role==="student"
                        ?
                        "Learner Profile Setup"
                        :
                        user.role==="teacher"
                        ?
                        "Mentor Profile Setup"
                        :
                        "Admin Profile Setup"
                    }

                </p>

            </div>

        </nav>

        <div className="profile-container">

            <div className="profile-card">
                <h1>
                    Complete Profile
                </h1>

                <p>
                    Fill your details before
                    continuing.
                </p>

                <form onSubmit={handleSubmit}>

                    <div className="form-group">

                        <label>
                            Date Of Birth
                        </label>

                        <input
                            type="date"
                            name="date_of_birth"
                            value={formData.date_of_birth}
                            onChange={handleChange}
                            required
                        />

                    </div>

                    <div className="form-group">

                        <label>
                            Phone Number
                        </label>

                        <input
                            type="text"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                        />

                    </div>

                    <div className="form-group">

                        <label>
                            Gender
                        </label>

                        <select
                            name="gender"
                            value={formData.gender}
                            onChange={handleChange}
                            required
                        >

                            <option value="">
                                Select Gender
                            </option>

                            <option value="Male">
                                Male
                            </option>

                            <option value="Female">
                                Female
                            </option>

                        </select>

                    </div>

                    <div className="form-group">

                        <label>
                            Address
                        </label>

                        <textarea
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            required
                        />

                    </div>

                    {user.role==="student" && (

                        <>

                            <div className="form-group">

                                <label>
                                    College Name
                                </label>

                                <input
                                    type="text"
                                    name="college_name"
                                    value={formData.college_name}
                                    onChange={handleChange}
                                    required
                                />

                            </div>

                            <div className="form-group">

                                <label>
                                    Department
                                </label>

                                <input
                                    type="text"
                                    name="department"
                                    value={formData.department}
                                    onChange={handleChange}
                                    required
                                />

                            </div>

                            <div className="form-group">

                                <label>
                                    Register Number
                                </label>

                                <input
                                    type="text"
                                    name="register_number"
                                    value={formData.register_number}
                                    onChange={handleChange}
                                    required
                                />

                            </div>

                            <div className="form-group">

                                <label>
                                    Year Of Study
                                </label>

                                <input
                                    type="text"
                                    name="year_of_study"
                                    value={formData.year_of_study}
                                    onChange={handleChange}
                                    required
                                />

                            </div>

                            <div className="form-group">

                                <label>
                                    LinkedIn
                                </label>

                                <input
                                    type="url"
                                    name="linkedin"
                                    value={formData.linkedin}
                                    onChange={handleChange}
                                />

                            </div>

                            <div className="form-group">

                                <label>
                                    Github
                                </label>

                                <input
                                    type="url"
                                    name="github"
                                    value={formData.github}
                                    onChange={handleChange}
                                />

                            </div>

                        </>

                    )}

                    {user.role==="teacher" && (

                        <>

                            <div className="form-group">

                                <label>
                                    Qualification
                                </label>

                                <input
                                    type="text"
                                    name="qualification"
                                    value={formData.qualification}
                                    onChange={handleChange}
                                    required
                                />

                            </div>

                            <div className="form-group">

                                <label>
                                    Specialization
                                </label>

                                <input
                                    type="text"
                                    name="specialization"
                                    value={formData.specialization}
                                    onChange={handleChange}
                                    required
                                />

                            </div>

                            <div className="form-group">

                                <label>
                                    Experience
                                </label>

                                <input
                                    type="text"
                                    name="experience"
                                    value={formData.experience}
                                    onChange={handleChange}
                                    required
                                />

                            </div>

                            <div className="form-group">

                                <label>
                                    Bank Account
                                </label>

                                <input
                                    type="text"
                                    name="bank_account"
                                    value={formData.bank_account}
                                    onChange={handleChange}
                                    required
                                />

                            </div>

                            <div className="form-group">

                                <label>
                                    IFSC Code
                                </label>

                                <input
                                    type="text"
                                    name="ifsc_code"
                                    value={formData.ifsc_code}
                                    onChange={handleChange}
                                    required
                                />

                            </div>

                            <div className="form-group">

                                <label>
                                    Account Holder
                                </label>

                                <input
                                    type="text"
                                    name="account_holder"
                                    value={formData.account_holder}
                                    onChange={handleChange}
                                    required
                                />

                            </div>

                        </>

                    )}

                    <button
                        type="submit"
                        className="save-btn"
                    >
                        Save Profile
                    </button>

                                </form>

            </div>

        </div>

    </div>

);

}

export default CompleteProfile;