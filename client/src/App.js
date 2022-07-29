import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Navigationbar from './components/navbar/Navigationbar';
import Homepage from './pages/homepage/Homepage';
import Signin from './pages/loginpage/Signin';
import Signup from './pages/signuppage/Signup';
import Edittask from './pages/tasks/Edittask';
import Viewtasks from './pages/tasks/Viewtasks';

function App() {
  const [token, settoken] = useState()
  useEffect(() => { settoken(localStorage.getItem('token')); }, []);

  // console.log(token)

  return (
    <>
      <Navigationbar />
      <Routes>
        <Route exact path='signin' element={<Signin />} />
        <Route path='signup' element={<Signup />} />
        <Route path='home' element={localStorage.getItem('token') ? <Homepage /> : <Signin />} />
        <Route path='viewtasks' element={token ? <Viewtasks /> : <Signin />} />
        <Route path='edittasks' element={token ? <Edittask /> : <Signin />} />
      </Routes>
    </>
  );
}

export default App;
