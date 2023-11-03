import './App.css';

import {Container} from "react-bootstrap";
import {Route, Routes} from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import Home from "./pages/Home/Home";
import Header from "./components/Header/Header";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Dashboard from "./pages/Dashboard/Dashboard";
import RideHistory from "./pages/RideHistory/RideHistory";


function App() {
  return (
    <div className="App">
     <Header></Header>
        <Container className="mt-3">
            <Routes>
                <Route
                    exact
                    path="/"
                    element={
                        <PrivateRoute>
                            <Home />
                        </PrivateRoute>
                    }
                />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route
                    path="/dashboard"
                    element={
                        <PrivateRoute>
                            <Dashboard />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/ridehistory"
                    element={
                        <PrivateRoute>
                            <RideHistory />
                        </PrivateRoute>
                    }
                />
            </Routes>
        </Container>
    </div>
  );
}

export default App;
