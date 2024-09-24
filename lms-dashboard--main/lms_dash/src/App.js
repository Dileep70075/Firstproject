import React from 'react';
import Style from './Style.css';
import Login from './Pages/Login';
import Dashbord from './Pages/Dashbord';
import { BrowserRouter as Router, Routes ,Route} from 'react-router-dom';
import Header from './Pages/Header';
import Sidebar from './Pages/Sidebar';
import Forget from './Pages/Forget';
import Thank from './Pages/Thank';
import Employee from './Pages/Employee';
import Signup from './Pages/Signup';
import Leave from './Pages/Leave';
import Adduser from './Pages/Adduser';
import Addleave from './Pages/Addleave';
import Holiday from './Pages/Holiday';
import Department from './Pages/Department';
import FAchApi from './Pages/FAchApi';

function App() {
  return (
    <Router>
       <Routes>
<Route path="/" element={<Login/>}/>
<Route path='/Login' element={<Login/>}/>
<Route path="/Header" element={<Header/>}/>
<Route path='/Dashbord' element={<Dashbord/>}/>
<Route path='/Sidebar' element={<Sidebar/>}/>
<Route path='/Forget' element={<Forget/>}/>
<Route path='/Thank' element={<Thank/>}/>
<Route path='/Employee' element={<Employee/>}/>
<Route path='/Signup' element={<Signup/>}/>
<Route path='/Leave' element={<Leave/>}/>
<Route path='/Adduser' element={<Adduser/>}/>
<Route path='/Addleave' element={<Addleave/>}/>
<Route path='/Department' element={<Department/>}/>
<Route path='/Holiday' element={<Holiday/>}/>
<Route path='/api' element={<FAchApi/>}/>
       </Routes>
    </Router>
  );
}

export default App;