import { useState } from "react";
import axios from "axios";
import "./CreateOrganization.css";

function CreateOrganization(){

    const [formData,setFormData] = useState({

        organization_name:"",

        admin_name:"",

        email:"",

        password:""

    });

    const [organizationCode,
    setOrganizationCode] = useState("");
    const [showPassword,
setShowPassword] = useState(false);

    function handleChange(e){

        setFormData({

            ...formData,

            [e.target.name]:
            e.target.value

        });

    }

    function handleSubmit(e){

        e.preventDefault();

        axios.post(

            "http://127.0.0.1:8000/create-organization/",

            formData

        )

        .then((response)=>{

            setOrganizationCode(

                response.data
                .organization_code

            );

        })

        .catch((error)=>{

            console.log(error);

        });

    }

    function copyCode(){

        navigator.clipboard.writeText(
            organizationCode
        );

        alert(
            "Organization Code Copied"
        );

    }

    if(organizationCode){

        return(

            <div className="org-success">

                <div className="org-success-card">

                    <h1>
                        🎉 Organization Created
                    </h1>

                    <p>

                        Share this code with
                        your learners.

                    </p>

                    <h2>

                        {organizationCode}

                    </h2>

                    <div className="warning-box">

                        ⚠️ Save this code.
                        Learners must use this
                        code during registration
                        to join your organization.

                    </div>

                <div className="org-actions">

    <button
        onClick={copyCode}
    >
        Copy Code
    </button>

</div>
                </div>

            </div>

        );

    }

    return(

        <div className="org-page">

            <form
                className="org-form"
                onSubmit={handleSubmit}
            >

                <h1>
                    Create Organization
                </h1>

                <input
                    type="text"
                    name="organization_name"
                    placeholder="Organization Name"
                    value={formData.organization_name}
                    onChange={handleChange}
                    required
                />

                <input
                    type="text"
                    name="admin_name"
                    placeholder="Admin Name"
                    value={formData.admin_name}
                    onChange={handleChange}
                    required
                />

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
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
    placeholder="Password"
    value={formData.password}
    onChange={handleChange}
    required
/>

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
                >
                    Create Organization
                </button>

            </form>

        </div>

    );

}

export default CreateOrganization;