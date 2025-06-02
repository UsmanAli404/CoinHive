# CoinHive 💰📈

**CoinHive** is a full-stack cryptocurrency tracking platform that allows users to explore, monitor, and manage real-time and historical data of crypto assets. Built with modern web technologies including **React**, **Redux Toolkit**, **Node.js**, **Express**, and **MongoDB**, CoinHive offers a seamless, secure, and interactive experience for crypto enthusiasts.


## 🚀 Features

- 🔐 **JWT-based Authentication** — Secure login & signup functionality.
- 👤 **User Accounts** — Users can create personal portfolios and track specific coins.
- 📊 **Real-Time Price Data** — Live cryptocurrency data fetched from the **Binance API**.
- 🔁 **Live Updates with WebSockets** — Prices update live without reloading the page.
- 🧠 **State Management** — Efficient state handling via **Redux Toolkit** on the frontend.
- 📉 **Interactive Graphs** — Visualize historical prices with dynamic chart components.
- 🔍 **Coin Table** — Paginated, sortable, and searchable list of top cryptocurrencies.
- 📘 **Guide Page** — Helpful guide to onboard new users and explain platform usage.


## 🛠️ Tech Stack

### Frontend
- **React.js**
- **Redux Toolkit** for global state
- **Axios** for API requests
- **Chart.js / Recharts** for graphing
- **WebSocket Client** for live data

### Backend
- **Node.js** with **Express.js**
- **MongoDB** with **Mongoose**
- **JSON Web Token (JWT)** for authentication
- **Socket.IO** for real-time communication
- **Binance API** for crypto market data


## 📦 Installation

### 1. Clone the repository
```bash
git clone https://github.com/your-username/coinhive.git
cd coinhive
```

### 2. Install backend dependencies
```bash
cd backend
npm install
```

### 3. Install frontend dependencies
```bash
cd frontend
npm install
```

### 4. Setup environment variables

Create a `.env` file in the `server/` directory with:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

## 🚦 Running the Project

### Start the backend server
```bash
cd server
npm run dev
```

### Start the frontend
```bash
cd ../client
npm start
```

Visit `http://localhost:3000` in your browser.


## 📁 Project Structure

```
coinhive/
├── frontend/             # React frontend
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── redux/
│   │   └── ...
├── backend/             # Express backend
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   └── ...
```

## 🌐 Live Demo

Coming soon!

## 🤝 Contributing

Pull requests and suggestions are welcome!  
To contribute:

1. Fork the repository  
2. Create a new branch (`git checkout -b feature-name`)  
3. Commit your changes (`git commit -m 'Add feature'`)  
4. Push to the branch (`git push origin feature-name`)  
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 📬 Contact

Created with ❤️ by **Usman**  
- GitHub: [UsmanAli404](https://github.com/UsmanAli404)  
- Email: aottoman551@gmail.com
- LinkedIn: [linkedIn](https://www.linkedin.com/in/usman-ali-ai-dev)
