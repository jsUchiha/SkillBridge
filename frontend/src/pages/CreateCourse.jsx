import {useState} from "react";
import "./CreateCourse.css";
import axios from "axios";
function CreateCourse(){
    const [courseData,setCourseData]=useState({
        title:"",
        description:"",
        fees:"",
        duration:"",
        location:"",
        room_no:"",
        mode:"",
        start_date:"",
        end_date:""
    })

function handleChange(e){
    const {name,value}=e.target;
    setCourseData({
        ...courseData,
        [name]:value
});
}

function handleSubmit(e){
    e.preventDefault();
   const user = JSON.parse(
    localStorage.getItem("user")
);

axios.post(
    "http://127.0.0.1:8000/create-course/",
    {
        ...courseData,

        admin_id:user.id
    }
)
    .then((response)=>{
        alert("Course Created Successfully");
        console.log(response.data);
        setCourseData({
            title:"",
        description:"",
        fees:"",
        duration:"",
        location:"",
        room_no:"",
        start_date:"",
        end_date:""
        });
    })
    .catch((error)=>{

    console.log(error);

    console.log(error.response);

    console.log(error.response.data);

    alert("Failed To Create Task");

});
}

return(

    <div className="create-page">

        <nav className="top-navbar">

            <div className="nav-logo">

                <h2>SkillBridge</h2>

                <p>Company Admin Portal</p>

            </div>

        </nav>

        <div className="create-container">

            <div className="page-header">

                <h1>Create Internship Program</h1>

                <p>
                    Create and publish a new
                    internship or training program.
                </p>

            </div>

            <form
                className="create-form"
                onSubmit={handleSubmit}
            >

                <div className="form-group">

                    <label>Program Title</label>

                    <input
                        name="title"
                        type="text"
                        value={courseData.title}
                        onChange={handleChange}
                        placeholder="Full Stack Development"
                        required
                    />

                </div>

                <div className="form-group">

                    <label>Description</label>

                    <textarea
                        name="description"
                        value={courseData.description}
                        onChange={handleChange}
                        placeholder="Program Description"
                        required
                    />

                </div>

                <div className="form-row">

                    <div className="form-group">

                        <label>Program Fee</label>

                        <input
                            name="fees"
                            type="number"
                            value={courseData.fees}
                            onChange={handleChange}
                            placeholder="4999"
                            required
                        />

                    </div>

                    <div className="form-group">

                        <label>Duration</label>

                        <input
                            name="duration"
                            type="text"
                            value={courseData.duration}
                            onChange={handleChange}
                            placeholder="3 Months"
                            required
                        />

                    </div>

                </div>

                <div className="form-group">

                    <label>Program Mode</label>

                    <select
                        name="mode"
                        value={courseData.mode}
                        onChange={handleChange}
                    >

                        <option value="">
                            Select Mode
                        </option>

                        <option value="Hybrid">
                            Hybrid
                        </option>

                        <option value="Online">
                            Online
                        </option>

                    </select>

                </div>

                {
                    courseData.mode==="Hybrid" && (

                        <div className="form-row">

                            <div className="form-group">

                                <label>Location</label>

                                <input
                                    type="text"
                                    name="location"
                                    value={courseData.location}
                                    onChange={handleChange}
                                    placeholder="Chennai"
                                />

                            </div>

                            <div className="form-group">

                                <label>Room No</label>

                                <input
                                    type="text"
                                    name="room_no"
                                    value={courseData.room_no}
                                    onChange={handleChange}
                                    placeholder="A101"
                                />

                            </div>

                        </div>

                    )
                }

                <div className="form-row">

                    <div className="form-group">

                        <label>Start Date</label>

                        <input
                            name="start_date"
                            type="date"
                            value={courseData.start_date}
                            onChange={handleChange}
                            required
                        />

                    </div>

                    <div className="form-group">

                        <label>End Date</label>

                        <input
                            name="end_date"
                            type="date"
                            value={courseData.end_date}
                            onChange={handleChange}
                            required
                        />

                    </div>

                </div>

                <button
                    type="submit"
                    className="create-btn"
                >
                    Create Program
                </button>

            </form>

        </div>

    </div>

);

}
export default CreateCourse;