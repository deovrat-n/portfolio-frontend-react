import { useState } from "react";
import { Button, Container } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import Discover from "./Discover";
import Portfolio from "./Portfolio";

const Dashboard = () => {
  const location = useLocation(); // Move inside the component
  const [activeTab, setActiveTab] = useState(location.state?.activeTab || "discover"); // Default: Discover
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("auth"); // Remove authentication token
    localStorage.removeItem("user"); // Remove user data
    navigate("/"); // Redirect to login page
  };

  return (
    <Container>
      <Button
        variant={activeTab === "discover" ? "contained" : "outlined"}
        onClick={() => setActiveTab("discover")}
        style={{ marginRight: "10px" }}
      >
        Discover
      </Button>

      <Button
        variant={activeTab === "portfolio" ? "contained" : "outlined"}
        onClick={() => setActiveTab("portfolio")}
        style={{ marginRight: "10px" }}
      >
        Portfolio
      </Button>

      <Button
        variant="contained"
        color="secondary"
        onClick={handleLogout}
        style={{ float: "right" }}
      >
        Logout
      </Button>

      <hr />

      {activeTab === "discover" ? <Discover /> : <Portfolio />}
    </Container>
  );
};

export default Dashboard;
