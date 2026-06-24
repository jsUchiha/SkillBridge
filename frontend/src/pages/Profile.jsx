import {useState,useEffect} from "react";
import axios from "axios";
import "./Profile.css";

function Profile(){

    const user = JSON.parse(
        localStorage.getItem("user")
    );

    const [formData,setFormData] = useState({

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

    useEffect(()=>{

        axios.get(

            `http://127.0.0.1:8000/profile/${user.id}/`

        )

        .then((response)=>{

            setFormData(response.data);

        })

        .catch((error)=>{

            console.log(error);

        });

    },[]);

    function handleChange(e){

        const {name,value} = e.target;

        setFormData({

            ...formData,

            [name]:value

        });

    }

    function handleSubmit(e){

        e.preventDefault();

        axios.put(

            `http://127.0.0.1:8000/update-profile/${user.id}/`,

            formData

        )

        .then(()=>{

            alert(
                "Profile Updated Successfully"
            );

        })

        .catch((error)=>{

            console.log(error);

            alert(
                "Failed To Update Profile"
            );

        });

    }

    return(

        <div className="profile-page">

            <nav className="profile-navbar">

                <div className="profile-logo">

                    <h2>SkillBridge</h2>

                    <p>My Profile</p>

                </div>

            </nav>

            <div className="profile-container">

                <div className="profile-card">

                    <h1>
                        {user.name}
                    </h1>

                    <p>
                        {user.email}
                    </p>

                    <form onSubmit={handleSubmit}>

                        <div className="form-group">

                            <label>
                                Date Of Birth
                            </label>

                            <input
                                type="date"
                                name="date_of_birth"
                                value={formData.date_of_birth || ""}
                                onChange={handleChange}
                            />

                        </div>

                        <div className="form-group">

                            <label>
                                Phone
                            </label>

                            <input
                                type="text"
                                name="phone"
                                value={formData.phone || ""}
                                onChange={handleChange}
                            />

                        </div>

                        <div className="form-group">

                            <label>
                                Gender
                            </label>

                            <input
                                type="text"
                                name="gender"
                                value={formData.gender || ""}
                                onChange={handleChange}
                            />

                        </div>

                        <div className="form-group">

                            <label>
                                Address
                            </label>

                            <textarea
                                name="address"
                                value={formData.address || ""}
                                onChange={handleChange}
                            />

                        </div>

                        {user.role==="student" && (

                            <>

                                <div className="form-group">

                                    <label>
                                        College
                                    </label>

                                    <input
                                        type="text"
                                        name="college_name"
                                        value={formData.college_name || ""}
                                        onChange={handleChange}
                                    />

                                </div>

                                <div className="form-group">

                                    <label>
                                        Department
                                    </label>

                                    <input
                                        type="text"
                                        name="department"
                                        value={formData.department || ""}
                                        onChange={handleChange}
                                    />

                                </div>

                                <div className="form-group">

                                    <label>
                                        Register Number
                                    </label>

                                    <input
                                        type="text"
                                        name="register_number"
                                        value={formData.register_number || ""}
                                        onChange={handleChange}
                                    />

                                </div>

                                <div className="form-group">

                                    <label>
                                        Year Of Study
                                    </label>

                                    <input
                                        type="text"
                                        name="year_of_study"
                                        value={formData.year_of_study || ""}
                                        onChange={handleChange}
                                    />

                                </div>

                                <div className="form-group">

                                    <label>
                                        LinkedIn
                                    </label>

                                    <input
                                        type="text"
                                        name="linkedin"
                                        value={formData.linkedin || ""}
                                        onChange={handleChange}
                                    />

                                </div>

                                <div className="form-group">

                                    <label>
                                        Github
                                    </label>

                                    <input
                                        type="text"
                                        name="github"
                                        value={formData.github || ""}
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
                                        value={formData.qualification || ""}
                                        onChange={handleChange}
                                    />

                                </div>

                                <div className="form-group">

                                    <label>
                                        Specialization
                                    </label>

                                    <input
                                        type="text"
                                        name="specialization"
                                        value={formData.specialization || ""}
                                        onChange={handleChange}
                                    />

                                </div>

                                <div className="form-group">

                                    <label>
                                        Experience
                                    </label>

                                    <input
                                        type="text"
                                        name="experience"
                                        value={formData.experience || ""}
                                        onChange={handleChange}
                                    />

                                </div>

                                <div className="form-group">

                                    <label>
                                        Bank Account
                                    </label>

                                    <input
                                        type="text"
                                        name="bank_account"
                                        value={formData.bank_account || ""}
                                        onChange={handleChange}
                                    />

                                </div>

                                <div className="form-group">

                                    <label>
                                        IFSC Code
                                    </label>

                                    <input
                                        type="text"
                                        name="ifsc_code"
                                        value={formData.ifsc_code || ""}
                                        onChange={handleChange}
                                    />

                                </div>

                                <div className="form-group">

                                    <label>
                                        Account Holder
                                    </label>

                                    <input
                                        type="text"
                                        name="account_holder"
                                        value={formData.account_holder || ""}
                                        onChange={handleChange}
                                    />

                                </div>

                            </>

                        )}

                        <button
                            type="submit"
                            className="save-btn"
                        >
                            Update Profile
                        </button>

                    </form>

                </div>

            </div>

        </div>

    );

}

export default Profile;