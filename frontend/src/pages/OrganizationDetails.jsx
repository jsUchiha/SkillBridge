import {useState,useEffect} from "react";
import axios from "axios";

function OrganizationDetails(){

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

        });

    },[]);

    return(

        <div>

            <h1>
                Organization Details
            </h1>

            <h2>
                {organization.organization_name}
            </h2>

            <h3>
                Organization Code
            </h3>

            <h1>
                {organization.organization_code}
            </h1>

            <p>
                Share this code with learners
                and mentors to join your
                organization.
            </p>

        </div>

    );

}

export default OrganizationDetails;