import {useState} from "react";
import "./Form.css";

function Form() {
    const [formData,setFormData] = useState({
        name:"",
        email:"",
        phone:""
    });
function handleChange(event){
    const {name,value} = event.target;
    setFormData({
        ...formData,
        [name]:value
    });
}

function handleSubmit(event) {
    event.preventDefault();
    alert("Submitted Successfully!");
    console.log(formData);
}

return(
<div className="container-form">
    <h1>Student Form</h1>
    <form onSubmit={handleSubmit}>
        <label>Name:</label>
    <input type="text" name="name" placeholder="Enter Name" value={formData.name} onChange={handleChange} required/> 
     <label>Email:</label>
     <input type="email" name="email" placeholder="Enter Email" value={formData.email} onChange={handleChange} required/> 
     <label>Phone:</label>
      <input type="tel" name="phone" placeholder="Enter Phone" value={formData.phone} onChange={handleChange} required/> 
      <button type="submit">Submit</button>
    </form>
</div>
);
}
export default Form;