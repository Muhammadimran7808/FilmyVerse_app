import Header from "./components/Header";
import Cards from "./components/Cards";
import AddMovie from "./components/AddMovie";
import { Route, Routes } from "react-router-dom";
import MovieDetail from "./components/MovieDetail";
import { createContext, useState } from "react";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { useEffect } from "react";

const appstate = createContext();

function App() {
    const [login, setLogin] = useState(false);
    const [userName, setUserName] = useState("");

    useEffect(()=>{
        function getCookie(name) {
            const cookies = document.cookie.split('; ');
            for (const cookie of cookies) {
                const [cookieName, cookieValue] = cookie.split('=');
                if (cookieName === name) {
                    return cookieValue;
                }
            }
            return false; // Return false if the cookie is not found
        }

        // Usage
        const isLoggedIn = getCookie('login');
        const userName = getCookie('userName');
        if (isLoggedIn) {
            setLogin(true)
            setUserName(userName)
        }
    },[])



    return (
        <appstate.Provider value={{ login, userName, setLogin, setUserName }}>
            <div className="App">
                <Header />
                <Routes>
                    <Route path="/" element={<Cards />} />
                    <Route path="/addmovie" element={<AddMovie />} />
                    <Route path="/detail/:id" element={<MovieDetail />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                </Routes>
            </div>
        </appstate.Provider>
    );
}

export default App;
export { appstate };

