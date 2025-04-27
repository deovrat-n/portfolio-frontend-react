import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Container, Typography, Stack } from "@mui/material";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const authHeader = "Basic " + btoa(`${username}:${password}`);
      const response = await axios.get("http://localhost:8080/users/me", {
        headers: {
          "Authorization": authHeader,
          "Content-Type": "application/json"
        },
        withCredentials: true,
      });

      localStorage.setItem("auth", authHeader);
      localStorage.setItem("user", JSON.stringify(response.data));
      navigate("/dashboard");
    } catch (err) {
      setError("Invalid credentials. Please try again.");
    }
  };

  return (
    <Container maxWidth="sm" style={{ textAlign: "center", marginTop: "50px" }}>
      <Typography variant="h4">Login</Typography>
      {error && <Typography color="error">{error}</Typography>}

      <TextField
        label="Username"
        fullWidth
        margin="normal"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <TextField
        label="Password"
        type="password"
        fullWidth
        margin="normal"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <Stack spacing={2} sx={{ mt: 2 }}>
        <Button variant="contained" color="primary" fullWidth onClick={handleLogin}>
          Login
        </Button>
        <Button variant="outlined" color="secondary" fullWidth onClick={() => navigate("/register")}>
          Register
        </Button>
      </Stack>
    </Container>
  );
};

export default Login;
