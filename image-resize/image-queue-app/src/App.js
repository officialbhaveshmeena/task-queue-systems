import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import ImageStatus from "./components/ImageStatus";
import ImageUploader from "./components/ImageUploader";
import ImageList from "./components/ImageList";

import Login from "./components/Login";
import Signup from "./components/Signup";

// --- SIMPLE AUTH CHECK USING LOCALSTORAGE ---
const isLoggedIn = () => {
  return localStorage.getItem("auth_token") ? true : false;
};

// --- PROTECT ROUTES ---
const PrivateRoute = ({ children }) => {
  return isLoggedIn() ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>

          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Protected Image Processing Area */}
          <Route
            path="/"
            element={
              <PrivateRoute>
                <div style={{ padding: "2rem", maxWidth: "600px", margin: "0 auto" }}>
                  <h1>🖼️ Image Resizer</h1>

                  <ImageUploader />
                  <ImageStatus />
                  <hr />
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
