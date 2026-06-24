import {useState,useEffect} from "react";
import "./EditCourse.css";
import axios from "axios";
import {useParams} from "react-router-dom";
function EditCourse(){

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
    const {id} = useParams();

    useEffect(()=>{
    axios.get(`http://127.0.0.1:8000/get-course/${id}/`)
    .then((response)=>{
        setCourseData(
            response.data
        );
    })
    .catch((error)=>{
        console.log(error);
    });
    },[id]);

function handleChange(e){
    const {name,value}=e.target;
    setCourseData({
        ...courseData,
        [name]:value
});
}

function handleSubmit(e){
    e.preventDefault();
    axios.put(
        `http://127.0.0.1:8000/edit-course/${id}/`,
        courseData
    )
    .then((response)=>{
        alert("Course Updated Successfully");
        console.log(response.data);
    })
    .catch((error)=>{
        console.log(error);
    });
}

   return(

    <div className="edit-page">

        <nav className="top-navbar">

            <div className="nav-logo">

                <h2>SkillBridge</h2>

                <p>
                    Company Admin Portal
                </p>

            </div>

        </nav>

        <div className="edit-container">

            <div className="page-header">

                <h1>
                    Update Internship Program
                </h1>

                <p>
                    Modify program details,
                    schedule and delivery mode.
                </p>

            </div>

            <form
                className="edit-form"
                onSubmit={handleSubmit}
            >

                <div className="form-group">

                    <label>Program Title</label>

                    <input
                        name="title"
                        type="text"
                        value={courseData.title}
                        onChange={handleChange}
                        required
                    />

                </div>

                <div className="form-group">

                    <label>Description</label>

                    <textarea
                        name="description"
                        value={courseData.description}
                        onChange={handleChange}
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
                                />

                            </div>

                            <div className="form-group">

                                <label>Room No</label>

                                <input
                                    type="text"
                                    name="room_no"
                                    value={courseData.room_no}
                                    onChange={handleChange}
                                />

                            </div>

                        </div>

                    )
                }

                <div className="form-row">

                    <div className="form-group">

                        <label>Start Date</label>

                        <input
                            type="date"
                            name="start_date"
                            value={courseData.start_date}
                            onChange={handleChange}
                            required
                        />

                    </div>

                    <div className="form-group">

                        <label>End Date</label>

                        <input
                            type="date"
                            name="end_date"
                            value={courseData.end_date}
                            onChange={handleChange}
                            required
                        />

                    </div>

                </div>

                <button
                    type="submit"
                    className="update-btn"
                >
                    Update Program
                </button>

            </form>

        </div>

    </div>

);

}
export default EditCourse;