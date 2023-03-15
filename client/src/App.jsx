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
        <Route path='/signIn' element={<SignIn />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/onboarding' element={<OnBoarding />}/>
        <Route path='/likes' element={<Likes />}/>
        <Route path='/messages' element={<Messages />}/>
        <Route path='/profile' element={<Profile />} />
        <Route path='/settings' element={<Setting />}/>
      </Routes>
    </div>
  );
}

export default App;
