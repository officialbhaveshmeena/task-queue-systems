import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import ImageStatus from "./components/ImageStatus";
import ImageUploader from "./components/ImageUploader";
import ImageList from "./components/ImageList";

import Login from "./components/Login";
import Signup from "./components/Signup";
import Header from "./components/Header";
import UserInfo from "./components/UserInfo";

// --- SIMPLE AUTH CHECK USING LOCALSTORAGE ---
const isLoggedIn = () => {
  return localStorage.getItem("auth_token") ? true : false;
};

// --- PROTECT ROUTES ---
const PrivateRoute = ({ children }) => {
  return isLoggedIn() ? children : <Navigate to="/login" />;
};

const handleLogout = () => {
  // Clear user auth token
  localStorage.removeItem("auth_token");

  // Redirect to login page
  window.location.href = "/login";
};

function App() {
  return (
    <Router>
      <div className="App">
        <Header onLogout={handleLogout} />
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Protected Image Processing Area */}
          <Route
            path="/"
            element={
              <PrivateRoute>
                <div style={{ padding: "2rem", margin: "0 auto" }}>
                  <h1 className="image__info">🖼️ Image Resizer</h1>
                  <UserInfo/>
                  <ImageUploader />
                  <ImageStatus />
                  <ImageList />
                </div>
              </PrivateRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
