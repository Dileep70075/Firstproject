// import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import Sidebar from './Sidebar';

function App() {
  return (
   <Router>
    <Routes>
      <Route path='/' element={<Sidebar/>}/>
    </Routes>
   </Router>
  );
}

export default App;
