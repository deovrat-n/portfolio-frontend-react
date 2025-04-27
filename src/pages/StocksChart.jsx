import { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { Container, Typography, Button, ButtonGroup } from "@mui/material";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const StockChart = () => {
  const { symbol } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [historicalData, setHistoricalData] = useState([]);
  const [error, setError] = useState("");
  const [selectedPeriod, setSelectedPeriod] = useState("1M");

  const fetchData = (period) => {
    axios.get(`http://localhost:8000/historical/${symbol}?period=${period}`)
      .then(response => {
        if (response.data.data) {
          const formattedData = Object.entries(response.data.data).map(([date, values]) => ({
            date: date.split("T")[0],
            close: values.Close
          }));
          setHistoricalData(formattedData);
        }
      })
      .catch(() => setError("Failed to fetch historical data"));
  };

  useEffect(() => {
    fetchData(selectedPeriod);
  }, [symbol, selectedPeriod]);

  const previousPage = location.state?.from || "/dashboard";
  const activeTab = location.state?.activeTab || "discover";

  return (
    <Container>
      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate(previousPage, { state: { activeTab } })}
        style={{ marginBottom: "10px" }}
      >
        Back
      </Button>
      <Typography variant="h5">Historical Data for {symbol}</Typography>
      {error && <Typography color="error">{error}</Typography>}

      <ButtonGroup style={{ marginBottom: "10px" }}>
        {["1M", "3M", "6M", "1Y", "5Y", "Max"].map((period) => (
          <Button
            key={period}
            variant={selectedPeriod === period ? "contained" : "outlined"}
            onClick={() => setSelectedPeriod(period)}
          >
            {period}
          </Button>
        ))}
      </ButtonGroup>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={historicalData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="close" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    </Container>
  );
};

export default StockChart;
