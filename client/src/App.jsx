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
import { useCookies } from 'react-cookie';

function App() {
    const [cookies, setCookie, removeCookie] = useCookies(['user'])

    const authToken = cookies.UserId

    return (
        <div className="App" style={{ minHeight: "100vh" }}>
            <Routes>
                <Route path='/' element={<SignUp />} />
                <Route path='/signIn' element={<SignIn />} />
                {authToken && <Route path='/dashboard' element={<Dashboard />} />}
                {authToken && <Route path='/onboarding' element={<OnBoarding />} />}
                {authToken && <Route path='/likes' element={<Likes />} />}
                {authToken && <Route path='/messages' element={<Messages />} />}
                {authToken && <Route path='/profile' element={<Profile />} />}
                {authToken && <Route path='/settings' element={<Setting />} />}
            </Routes>
        </div>
    );
}

export default App;
