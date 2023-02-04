import './App.css';
import { Routes, Route } from "react-router-dom"
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import Dashboard from "./pages/DashBoard"
import OnBoarding from './pages/OnBoarding';
import Likes from './pages/Likes';
import Messages from './pages/Messages';
import Profile from './pages/Profile';
import Setting from './pages/Setting';

function App() {
  return (
    <div className="App" style={{minHeight: "100vh"}}>
      <Routes>
        <Route path='/' element={<SignUp />} />
        <Route path='/SignIn' element={<SignIn />} />
        <Route path='/Dashboard' element={<Dashboard />} />
        <Route path='/OnBoarding' element={<OnBoarding />}/>
        <Route path='/Likes' element={<Likes />}/>
        <Route path='/Messages' element={<Messages />}/>
        <Route path='/Profile' element={<Profile />} />
        <Route path='/Settings' element={<Setting />}/>
      </Routes>
    </div>
  );
}

export default App;
