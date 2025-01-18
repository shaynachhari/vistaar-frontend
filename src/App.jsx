import React, {useContext} from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthContext from "./context/AuthContext";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";

import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  console.log(AuthContext);
  
  const { authData, login, logout } = useContext(AuthContext)

  return (
    <Router>
      <div className="App" style={{width: "100vw"}}>
        {authData ? (
          <Dashboard/>
        ) : (
          <Routes>
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login login={login} />} />
            <Route path="/" element={<Landing />} />
          </Routes>
        )}
      </div>
    </Router>
  );
};

export default App
