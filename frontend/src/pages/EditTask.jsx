import {useState,useEffect} from "react";
import {useParams,useNavigate} from "react-router-dom";
import axios from "axios";
import "./EditTask.css";

function EditTask(){

    const {id}=useParams();

    const navigate=useNavigate();

    const [task,setTask]=useState({
        title:"",
        description:"",
        due_date:"",
        course:"",
        teacher:""
    });

    useEffect(()=>{

        axios.get(
            `http://127.0.0.1:8000/get-task/${id}/`
        )

        .then((response)=>{

            setTask(
                response.data
            );

        })

        .catch((error)=>{

            console.log(error);

        });

    },[id]);

    function handleChange(e){

        const {name,value}=e.target;

        setTask({

            ...task,

            [name]:value

        });

    }

    function handleSubmit(e){

        e.preventDefault();

        axios.put(

            `http://127.0.0.1:8000/update-task/${id}/`,

            task

        )

        .then(()=>{

            alert(
                "Task Updated Successfully"
            );

            navigate(
                "/view-tasks"
            );

        })

        .catch((error)=>{

            console.log(error);

        });

    }

    return(

        <div className="create-task">

            <h1>Edit Task</h1>

            <form onSubmit={handleSubmit}>

                <label>Task Title</label>

                <input
                    type="text"
                    name="title"
                    value={task.title || ""}
                    onChange={handleChange}
                    required
                />

                <label>Description</label>

                <textarea
                    name="description"
                    value={task.description || ""}
                    onChange={handleChange}
                    required
                />

                <label>Due Date</label>

                <input
                    type="date"
                    name="due_date"
                    value={task.due_date || ""}
                    onChange={handleChange}
                    required
                />

                <button type="submit">

                    Update Task

                </button>

            </form>

        </div>

    );

}

export default EditTask;