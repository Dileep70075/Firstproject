import React from "react";
import Header from './Header';
import Addholiday from "./Addholiday";
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

function Holiday(){
    const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const[formData,setformData]=useState({
    name:'',
    fromdate:'',
    todate:'',
    remark:'',
    
  })
  
  const Navigate=useNavigate();
  
  const handelchange=(e)=>{
    const {name,value}=e.target;
    setformData({...formData,[name]:value});
  };
  
  const holidaysubmit= async (e)=>{
    e.preventDefault();
    try{
      // api calling
      const response= await axios.post('http://localhost:3001/holiday',formData);
      if(response && response.data){
        console.log(response.data);
        swal.fire({
          icon:"success",
          title:'holiday data saved  successfully',
          text:"welcome back"
        }) 
        Navigate('/Holiday');
      }
      else{
        console.error('invalid response data',response);
      }
    }
    catch(error){
      console.error('error during adding holiday',error);
      if(error.response && error.response.data){
        console.error('error detail: ',error.response.data);
      }
      else{
        console.log('unexpected error');
      }
  
    }
  }
//fetch data
  const [holiday,setHoliday] = useState([]);
  useEffect(()=>{
   fetch('http://localhost:3001/holiday').then(response=>response.json())
   .then(data=>setHoliday(data));
   console.log(setHoliday)
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
        Add Holiday
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Form onSubmit={holidaysubmit}>
        <Modal.Header closeButton>
          <Modal.Title>Add Holiday</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Row className="mb-3">
        
        <Form.Group as={Col} controlId="formGridEmail">
       Name
          <Form.Control type="text" placeholder="Name" name="name" value={formData.name} onChange={handelchange} />
        </Form.Group>

        
      </Row>
      <Row className="mb-3">
        
        <Form.Group as={Col} controlId="formGridEmail">
         From Date
          <Form.Control type="date" placeholder="From Date" name="fromdate" value={formData.fromdate} onChange={handelchange}/>
        </Form.Group>

        <Form.Group as={Col} controlId="formGridPassword">
          To Date
          <Form.Control type="date" placeholder="To Date" name="todate" value={formData.todate} onChange={handelchange}/>
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

      <Addholiday/>
      
      </div>
         </div>
         

        
          

         </div>
    )
}
export default Holiday;