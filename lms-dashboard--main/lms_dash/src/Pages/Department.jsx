import React from 'react'
import Sidebar from './Sidebar'
import Header from './Header'
import { useState,useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import axios from 'axios'
import swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'
import Adddepartment from './Adddepartment';

const Department = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const[formData,setformData]=useState({
    departmentname:'',
    manager:'',
    remark:'',
    
    
  })
  
  const Navigate=useNavigate();
  
  const handelchange=(e)=>{
    const {name,value}=e.target;
    setformData({...formData,[name]:value});
  };
  
  const departmentsubmit= async (e)=>{
    e.preventDefault();
    try{
      // api calling
      const response= await axios.post('http://localhost:3001/department',formData);
      if(response && response.data){
        console.log(response.data);
        swal.fire({
          icon:"success",
          title:'department data saved  successfully',
          text:"welcome back"
        }) 
        Navigate('/Department');
      }
      else{
        console.error('invalid response data',response);
      }
    }
    catch(error){
      console.error('error during adding department',error);
      if(error.response && error.response.data){
        console.error('error detail: ',error.response.data);
      }
      else{
        console.log('unexpected error');
      }
  
    }
  }
//fetch data
  const [department,setDepartment] = useState([]);
  useEffect(()=>{
   fetch('http://localhost:3001/department').then(response=>response.json())
   .then(data=>setDepartment(data));
   console.log(setDepartment)
  },[])


  return (
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
        Add Department
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Form onSubmit={departmentsubmit}>
        <Modal.Header closeButton>
          <Modal.Title>Add Department</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Row className="mb-3">
        
        <Form.Group as={Col} controlId="formGridEmail">
        Department Name
          <Form.Control type="text" placeholder="Department Name" name="departmentname" value={formData.departmentname} onChange={handelchange} />
        </Form.Group>

        
      </Row>
      <Row className="mb-3">
        
        <Form.Group as={Col} controlId="formGridEmail">
         Manager
          {/* <Form.Control type="tex" placeholder="From Date" name="fromdate" value={formData.fromdate} onChange={handelchange}/> */}
          <select className="select-apply-leave" name="manager" value={formData.manager} onChange={handelchange} >
                        <option value='HR Admin'>HR Admin</option>
                        <option value='Manager'>Manager</option>
                        <option value='CEO'>CEO</option>
                        <option value='CTO'>CTO</option>
                        
                    </select>
        </Form.Group>

        
      </Row>

      
      <Row className="mb-3">
      
        <Form.Group as={Col} controlId="formGridEmail">
         Remark
          <Form.Control type="text" placeholder="Add Description Here" name="remark" value={formData.remark} onChange={handelchange} />
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

      <Adddepartment/>
      
      </div>
         </div>
         


    </div>
  )
}

export default Department;