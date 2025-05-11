import { useEffect, useRef, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { Line } from 'react-chartjs-2';

import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  TimeScale,
  Filler
} from 'chart.js';
import 'chartjs-adapter-date-fns';
import debounce from 'lodash.debounce';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, TimeScale, Filler);

function CoinDetailsPage() {
  const { id } = useParams();
  const [marketData, setMarketData] = useState([]);
  const [interval, setInterval] = useState('1h');
  const [limit, setLimit] = useState(10);
  const [loading, setLoading] = useState(true);
  const socketRef = useRef(null); // store WebSocket in a ref

  const sendParams = useCallback((symbol, interval, limit, refresh) => {
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.send(JSON.stringify({
        symbol,
        interval,
        limit,
        refresh,
        type: "market"
      }));
    } else {
      console.warn('WebSocket is not open yet.');
    }
  }, []);

  useEffect(() => {
    const socket = new WebSocket('ws://localhost:4000');
    socketRef.current = socket;

    socket.onopen = () => {
      console.log("WebSocket connected");
      sendParams(id.toUpperCase(), interval, limit, 3000);
    };

    socket.onmessage = (event) => {
      const msg = JSON.parse(event.data);
      if (msg.error) {
        console.error("Server error:", msg.error);
      } else if (msg.type === "marketData") {
        setMarketData(msg.data);
        setLoading(false);
      }
    };

    socket.onerror = (err) => {
      console.error("WebSocket error:", err);
    };

    socket.onclose = () => {
      console.log("WebSocket closed");
    };

    return () => {
      socket.close();
    };
  }, [id, interval, limit, sendParams]);

  useEffect(() => {
    sendParams(id.toUpperCase(), interval, limit, 3000);
  }, [id, interval, limit, sendParams]);


  const debouncedLimitChange = useCallback(
    debounce((value) => {
      setLimit(value);
    }, 250),
    []
  );

  const handleChange = (e) => {
    debouncedLimitChange(Number(e.target.value));
  };

const chartData = {
    labels: marketData.map(d => new Date(d.time)),
    datasets: [
      {
        label: `${id} Price`,
        data: marketData.map(d => d.close),
        fill: true,
        backgroundColor: (ctx) => {
          const canvas = ctx.chart.canvas;
          const ctx2d = canvas.getContext('2d');
          const gradient = ctx2d.createLinearGradient(0, 0, 0, canvas.height);
          gradient.addColorStop(0, 'rgba(255, 200, 0, 0.4)');
          gradient.addColorStop(1, 'rgba(132, 99, 0, 0)');
          return gradient;
        },
        borderColor: 'rgb(255, 157, 0)',
        borderWidth: 2,
        tension: 0.0,
        pointRadius: 0,
        pointHoverRadius: 5, 
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    interaction: {
      mode: 'nearest',
      intersect: false,
    },
    plugins: {
      tooltip: {
        enabled: true,
        mode: 'nearest',
        intersect: false,
      }
    },
    scales: {
      x: {
        type: 'time',
        time: {
          unit: interval === '1d' ? 'day' : 'hour'
        }
      },
      y: {
        beginAtZero: false
      }
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>{id.toUpperCase()} Live Chart</h2>

      <div style={{ marginBottom: '1rem' }}>
        <label>Interval:</label>
        <select value={interval} onChange={(e) => setInterval(e.target.value)}>
          <option value="1m">1 Minute</option>
          <option value="5m">5 Minutes</option>
          <option value="15m">15 Minutes</option>
          <option value="1h">1 Hour</option>
          <option value="4h">4 Hours</option>
          <option value="1d">1 Day</option>
        </select>

        <label style={{ marginLeft: '1rem' }}>Limit:</label>
        <input
          type="number"
          value={limit}
          min="10"
          max="500"
          onChange={handleChange}
        />
      </div>

        {loading ? <p>Loading chart...</p> : <Line data={chartData} options={chartOptions} />}
    </div>
  );
}

export default CoinDetailsPage;