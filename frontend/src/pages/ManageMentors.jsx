import { useState,useEffect } from "react";
import axios from "axios";
import "./ManageMentors.css";

function ManageMentors(){

    const [teachers,setTeachers] =
    useState([]);

    const [formData,setFormData] =
    useState({

        name:"",

        email:"",

        password:""

    });

    const [showPassword,
    setShowPassword] =
    useState(false);

    const user = JSON.parse(

        localStorage.getItem(
            "user"
        )

    );
    const [loading,setLoading] =
useState(false);

const [error,setError] =
useState("");

    useEffect(()=>{

        loadTeachers();

    },[]);

    function loadTeachers(){

        axios.get(

            `http://127.0.0.1:8000/get-teachers/${user.id}/`

        )

        .then((response)=>{

            setTeachers(
                response.data
            );

        });

    }

    function handleChange(e){

        setFormData({

            ...formData,

            [e.target.name]:
            e.target.value

        });

    }

    function createTeacher(e){

    e.preventDefault();

    if(loading){

        return;

    }

    setLoading(true);

    setError("");

    axios.post(

        "http://127.0.0.1:8000/create-teacher/",

        {

            ...formData,

            admin_id:user.id

        }

    )

    .then((response)=>{

        if(response.data.success){

            alert(
                "Mentor Created Successfully"
            );

            setFormData({

                name:"",
                email:"",
                password:""

            });

            loadTeachers();

        }

        else{

            setError(
                response.data.message
            );

        }

    })

    .catch(()=>{

        setError(
            "Failed To Create Mentor"
        );

    })

    .finally(()=>{

        setLoading(false);

    });

}

    function deleteTeacher(id){

        if(

            !window.confirm(

                "Delete Mentor?"

            )

        ){

            return;

        }

        axios.delete(

            `http://127.0.0.1:8000/delete-teacher/${id}/`

        )

        .then(()=>{

            loadTeachers();

        });

    }

    return(

        <div className="mentor-page">

            <nav className="top-navbar">

                <div className="nav-logo">

                    <h2>SkillBridge</h2>

                    <p>
                        Mentor Management
                    </p>

                </div>

            </nav>

            <div className="mentor-container">

                <div className="mentor-form-card">

                    <h1>
                        Create Mentor
                    </h1>

                    <form
                        onSubmit={
                            createTeacher
                        }
                    >

                        <input

                            type="text"

                            name="name"

                            value={
                                formData.name
                            }

                            onChange={
                                handleChange
                            }

                            placeholder=
                            "Mentor Name"

                            required

                        />

                        <input

                            type="email"

                            name="email"

                            value={
                                formData.email
                            }

                            onChange={
                                handleChange
                            }

                            placeholder=
                            "Email"

                            required

                        />

                        <input

                            type={
                                showPassword
                                ?
                                "text"
                                :
                                "password"
                            }

                            name="password"

                            value={
                                formData.password
                            }

                            onChange={
                                handleChange
                            }

                            placeholder=
                            "Password"

                            required

                        />

                        <div
                        className=
                        "show-password"
                        >

                            <input

                                type="checkbox"

                                onChange={()=>

                                setShowPassword(

                                !showPassword

                                )

                                }

                            />

                            <label>

                                Show Password

                            </label>

                        </div>
{
    error &&

    <p className="error">

        {error}

    </p>
}
                <button
    type="submit"
    disabled={loading}
>

    {

        loading

        ?

        "Creating..."

        :

        "Create Mentor"

    }

</button>

                    </form>

                </div>

                <div className="mentor-list-card">

                    <h1>

                        Mentors

                    </h1>

                    {

                    teachers.length===0

                    ?

                    <p>

                    No Mentors Found

                    </p>

                    :

                    teachers.map(
                    (teacher)=>(

                    <div

                    className=
                    "mentor-card"

                    key={
                    teacher.id
                    }

                    >

                    <div>

                    <h3>

                    {
                    teacher.name
                    }

                    </h3>

                    <p>

                    {
                    teacher.email
                    }

                    </p>

                    </div>

                    <button

                    onClick={()=>

                    deleteTeacher(

                    teacher.id

                    )

                    }

                    >

                    Delete

                    </button>

                    </div>

                    ))

                    }

                </div>

            </div>

        </div>

    );

}

export default ManageMentors;