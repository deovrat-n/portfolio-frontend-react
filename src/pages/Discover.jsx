import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button, Container, Typography, List, ListItem, ListItemText } from "@mui/material";

const Discover = () => {
  const [stocks, setStocks] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:8080/stocks", {
      headers: { Authorization: localStorage.getItem("auth") }
    })
    .then(response => setStocks(response.data))
    .catch(() => setError("Failed to fetch stocks."));
  }, []);

  const addToPortfolio = (stockId) => {
    axios.post(`http://localhost:8080/portfolio/add?stockId=${stockId}`, {}, {
      headers: { Authorization: localStorage.getItem("auth") }
    })
    .then(() => alert("Stock added to portfolio"))
    .catch(() => alert("Failed to add stock"));
  };

  return (
    <Container>
      <Typography variant="h5">Discover Stocks</Typography>
      {error && <Typography color="error">{error}</Typography>}
      <List>
        {stocks.map(stock => (
          <ListItem key={stock.id} divider>
            <ListItemText
              primary={`${stock.symbol} - ${stock.price}`}
              secondary={stock.name}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={() => addToPortfolio(stock.id)}
              style={{ marginRight: "10px" }}
            >
              Add to Portfolio
            </Button>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => navigate(`/chart/${stock.symbol}`, { state: { from: "/dashboard", activeTab: "discover" } })}
            >
              View Chart
            </Button>
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default Discover;
