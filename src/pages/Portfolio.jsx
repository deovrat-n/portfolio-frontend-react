import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Container, List, ListItem, ListItemText, Typography, Button } from "@mui/material";

const Portfolio = () => {
  const [stocks, setStocks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:8080/portfolio", {
      headers: { Authorization: localStorage.getItem("auth") }
    })
    .then(response => setStocks(response.data.stockNames)) // Ensure API returns `stockNames`
    .catch(error => console.error("Error fetching portfolio:", error));
  }, []);

  return (
    <Container>
      <Typography variant="h4">My Portfolio</Typography>
      {stocks.length === 0 ? (
        <Typography>No stocks in portfolio</Typography>
      ) : (
        <List>
          {stocks.map((stock, index) => (
            <ListItem key={index} divider>
              <ListItemText primary={stock} />
              <Button
                variant="outlined"
                color="primary"
                onClick={() => navigate(`/chart/${stock}`)}
              >
                View Chart
              </Button>
            </ListItem>
          ))}
        </List>
      )}
    </Container>
  );
};

export default Portfolio;
