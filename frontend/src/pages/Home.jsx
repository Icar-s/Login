import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Snake from "../components/Snake";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  const API_URL = import.meta.env.VITE_API_URL;

  const getMe = async (token) => {
    const response = await fetch(`${API_URL}/me`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.json();
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setLoading(false);
      return;
    }

    getMe(token)
      .then((data) => {
        if (!data.detail) {
          setUser(data);
        } else {
          localStorage.removeItem("token");
          setUser(null);
        }
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="center">
        <p>Carregando...</p>
      </div>
    );
  }

  return (
  <div className="center">
    <h1>Bem vindo</h1>

    {user ? (
  <>
    <h2>Logado como: {user.user}</h2>

    <button
      onClick={() => {
        localStorage.removeItem("token");
        setUser(null);
      }}
    >
      Logout
    </button>

    <Snake />
  </>
) : (
  <div className="buttons">
    <Link to="/login">Login</Link>
    <Link to="/register">Registrar</Link>
  </div>
)}
  </div>
  );
}