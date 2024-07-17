import React , {useState} from 'react'
import pagepic from '../Images/page.jpg'
import logo from '../Images/logo.jpg'
import axios from 'axios'
import swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'



const Signup = () => {

const[formData,setformData]=useState({
  name:'',
  email:'',
  dob:'',
  address:'',
  password:'',
  profileImage:null
})

const Navigate=useNavigate();

const handelchange=(e)=>{
  const {name,value,files,type}=e.target;
  if(type==='file'){
    setformData({...formData,[name]:files[0]})
  }
  else{
    setformData({...formData,[name]:value})
  }
  // setformData({...formData,[name]:value});
};

const signupsubmit= async (e)=>{
  e.preventDefault();
  try{
    const formDataForApi = new FormData();
    for(const key in formData){
      formDataForApi.append(key,formData[key]);

    }
    // api calling
    const response= await axios.post('http://localhost:3001/Signup',formDataForApi);
    if(response && response.data){
      console.log(response.data);
      swal.fire({
        icon:"success",
        title:'Signup successfully',
        text:"welcome back"
      }) 
      Navigate('/Login');
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

  return (
    <div>
      <div className="container">
            <div className='main'>
                <img src={pagepic} className="pageimg"/>
            </div>
            <div className='second'>
                <img src={logo} className="logoimg"/><br/>
                <span className="heding">Sign up  to your dashboard</span>
                <form className="signupform" onSubmit={signupsubmit}>
                    <label>Name</label>
                    <label><input type="text" placeholder='enter name' className="inputlogin"  name="name" value={formData.name} onChange={handelchange}/></label>
                    <label>Email</label>
                    <label><input type="email" placeholder='enter email' className="inputlogin"  name="email" value={formData.email} onChange={handelchange}/></label>
                    <label>DOB</label>
                    <label><input type="date"  className="inputlogin"  name="dob" value={formData.dob} onChange={handelchange}/></label>
                    <label>Address</label>
                    <label><input type="text" placeholder='enter address' className="inputlogin"  name="address" value={formData.address} onChange={handelchange}/></label>
                    <label>Password</label>
                    <label><input type="password" placeholder='enter password' className="inputlogin" name='password' value={formData.password} onChange={handelchange}/>
                    
                    </label>
<label>profileImage</label>
                    <label><input type="file" placeholder='enter image'  className="inputlogin"  name='profileImage' onChange={handelchange} accept='image/*'/>
                    </label> <br/>
                    
                    <label><button className="buttonlogin"  type='submit'>Signup </button></label><br/>
                    <label ><input className="remeder" type="checkbox"/> Remendar me
                    
                    
                  
                    </label>
                </form><br></br><br></br>
                <span className="copyright">Copyright @ 2023 by Ritish Tripathi.</span>
            </div>
           </div>
    </div>
  )
}

export default Signup
