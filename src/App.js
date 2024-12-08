import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";

import Main from "./Main"; // Import the Main component
import Login from "./components/Pages/Login/Login";
import { AuthProvider } from "./contexts/auth/AuthContext";
import store from "./store";

import "react-toastify/dist/ReactToastify.css";
import "./App.scss";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Provider store={store}>
          <ToastContainer position="top-right" />
          <Router>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="*" element={<PrivateRoute element={<Main />} />} />
            </Routes>
          </Router>
        </Provider>
      </AuthProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

function PrivateRoute({ element }) {
  const isAuthenticated = localStorage.getItem("token") !== null;

  return isAuthenticated ? element : <Navigate to="/login" />;
}

export default App;
