import React from "react";
import { Link } from "react-router-dom";
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import SettingsIcon from '@mui/icons-material/Settings';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import LogoutIcon from '@mui/icons-material/Logout';
import Navbar from 'react-bootstrap/Navbar';
function Sidebar(){
    return(
   
   <Navbar className="sidebar-container">
      <ul className="ul-sidebar">
      <li><span className="icon-sidebar"><SpaceDashboardIcon style={{fontSize:'4vh'}}/></span><Link to="/Dashbord" className="link-sidebar">Dashboard</Link></li><br/>
      <li><span className="icon-sidebar"><PeopleOutlineIcon style={{fontSize:'4vh'}}/></span><Link to="/Employee" className="link-sidebar">Employee</Link></li><br/>
      <li><span className="icon-sidebar"><CalendarMonthIcon style={{fontSize:'4vh'}}/></span> <Link to="/Leave" className="link-sidebar">Leave</Link> </li><br/>
      <li><span className="icon-sidebar"><LeaderboardIcon style={{fontSize:'4vh'}}/></span> Administration 
      
      <ul type='square'>
        <li style={{marginLeft:'3vw'}}><Link to="/Department" className="link-sidebar" >Department</Link></li>
        <li style={{marginLeft:'3vw'}}><Link to="/Holiday" className="link-sidebar">Holiday</Link></li>
      </ul></li><br/>
      {/* <li><span className="icon-sidebar"><SettingsIcon style={{fontSize:'4vh'}}/></span> Setting</li><br/> */}
      <li><span className="icon-sidebar"><LogoutIcon style={{fontSize:'4vh'}}/></span><Link to="/Login" className="link-sidebar">Logout</Link></li><br/>
      
      </ul>
      </Navbar>
    
    );
}

export default Sidebar