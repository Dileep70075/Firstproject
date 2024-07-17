import React from 'react'
import Header from './Header';
import Sidebar from './Sidebar';
import { useState,useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import axios from 'axios'
import swal from 'sweetalert2'
import Addleave from './Addleave';
// import { useState } from 'react';
import { useNavigate } from 'react-router-dom'

const Leave = () => {

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

    const[formData,setformData]=useState({
        name:'',
        email:'',
        starting_date:'',
        ending_date:'',
        
      })

      const Navigate=useNavigate();

      const handelchange=(e)=>{
        const {name,value}=e.target;
        setformData({...formData,[name]:value});
      };

      const leaveSave= async (e)=>{
        e.preventDefault();
        try{
          // api calling
          const response= await axios.post('http://localhost:3001/leave',formData);
          if(response && response.data){
            console.log(response.data);
            swal.fire({
              icon:"success",
              title:'leave data saved  successfully',
              text:"welcome back"
            }) 
            Navigate('/Leave');
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
  const [leave,setLeave] = useState([]);
  useEffect(()=>{
   fetch('http://localhost:3001/leave').then(response=>response.json())
   .then(data=>setLeave(data));
   console.log(setLeave)
  },[])

      

  return (
    <div>
        <Header/>
        <Sidebar/>
        <div className="main-container">
            <div style={{display:'flex'}}>
            <h2>Leave</h2>
            <input className="search-user-emp" type="search" placeholder="Search..."/>
            </div>
            <div>
      <Button variant="primary" onClick={handleShow} className="add-employee-btn">
        Add leave
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Form onSubmit={leaveSave}>
        <Modal.Header closeButton>
          <Modal.Title>Add Employee</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Row className="mb-3">
        
        <Form.Group as={Col} controlId="formGridEmail">
       Name*
          <Form.Control type="text" placeholder="Enter Name" name="name" value={formData.name} onChange={handelchange} />
        </Form.Group>

        
      </Row>
      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridEmail">
         Email*
          <Form.Control type="email" placeholder="Enter email" name="email" value={formData.email} onChange={handelchange}/>
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridEmail">
         Leave Starting Date:
          <Form.Control type="date" placeholder="enter Date" name="starting_date" value={formData.starting_date} onChange={handelchange}/>
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridEmail">
         Leave Ending  Date:
          <Form.Control type="date" placeholder="enter Date" name="ending_date" value={formData.ending_date} onChange={handelchange}/>
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

    <Addleave/>
      
      </div>
         </div>
      
    </div>
  )
}

export default Leave;