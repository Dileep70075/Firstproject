import React from "react";
import Header from './Header';
import Adduser from "./Adduser";
import Sidebar from './Sidebar';
import { useState,useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import axios from 'axios'
import swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'

function Employee(){
    const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const[formData,setformData]=useState({
    Firstname:'',
    lastname:'',
    email:'',
    password:'',
    countryCode:'',
    mobile:'',
    gender:'',
  })
  
  const Navigate=useNavigate();
  
  const handelchange=(e)=>{
    const {name,value}=e.target;
    setformData({...formData,[name]:value});
  };
  
  const employeesubmit= async (e)=>{
    e.preventDefault();
    try{
      // api calling
      const response= await axios.post('http://localhost:3001/employee',formData);
      if(response && response.data){
        console.log(response.data);
        swal.fire({
          icon:"success",
          title:'employee data saved  successfully',
          text:"welcome back"
        }) 
        Navigate('/Employee');
      }
      else{
        console.error('invalid response data',response);
      }
    }
    catch(error){
      console.error('error during signup',error);
      if(error.response && error.response.data){
        console.error('error detail: ',error.response.data);
      }
      else{
        console.log('unexpected error');
      }
  
    }
  }
//fetch data
  const [employee,setEmployee] = useState([]);
  useEffect(()=>{
   fetch('http://localhost:3001/employee').then(response=>response.json())
   .then(data=>setEmployee(data));
   console.log(setEmployee)
  },[])


    return(

        <div>
            <Header/>
        <Sidebar/>
       
         <div className="main-container">
            <div style={{display:'flex'}}>
            <h2>Users</h2>
            <input className="search-user-emp" type="search" placeholder="Search..."/>
            </div>
            <div>
      <Button variant="primary" onClick={handleShow} className="add-employee-btn">
        Add Empolyee
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Form onSubmit={employeesubmit}>
        <Modal.Header closeButton>
          <Modal.Title>Add Employee</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Row className="mb-3">
        
        <Form.Group as={Col} controlId="formGridEmail">
       First Name*
          <Form.Control type="text" placeholder="First Name" name="Firstname" value={formData.Firstname} onChange={handelchange} />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridPassword">
          Last Name*
          <Form.Control type="text" placeholder="Last Name" name="lastname" value={formData.lastname} onChange={handelchange}/>
        </Form.Group>
      </Row>
      <Row className="mb-3">
        
        <Form.Group as={Col} controlId="formGridEmail">
         Email*
          <Form.Control type="email" placeholder="Enter email" name="email" value={formData.email} onChange={handelchange}/>
        </Form.Group>

        <Form.Group as={Col} controlId="formGridPassword">
          Password*
          <Form.Control type="password" placeholder="Password" name="password" value={formData.password} onChange={handelchange}/>
        </Form.Group>
      </Row>

      
      <Row className="mb-3">
      <Form.Group as={Col} controlId="formGridEmail">
         Country Code
          <Form.Control style={{width:'50px'}} type="text" placeholder="+91" name="countryCode" value={formData.countryCode} onChange={handelchange}/>
        </Form.Group>
        <Form.Group as={Col} controlId="formGridEmail">
         Mobile*
          <Form.Control type="text" placeholder="Enter Contact" name="mobile" value={formData.mobile} onChange={handelchange} />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridPassword">
          Gender*<br/>
          <input type="radio" value='male' name="gender"  onChange={handelchange}/> Male <input type="radio"  name="gender" value="female" onChange={handelchange}/> Female
        </Form.Group>
      </Row>
    
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" type="submit" onClick={handleClose}>
            Save
          </Button>
        </Modal.Footer>
    </Form>
      </Modal>


      <Adduser/>
      </div>
         </div>
         

        
          

         </div>
    )
}
export default Employee;