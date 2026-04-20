import { useState } from "react";
import { Link } from "react-router-dom";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const API_URL = import.meta.env.VITE_API_URL;

  const handleRegister = async () => {
    setMessage("");

    try {
      const response = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok || data.error) {
        setMessage(data.error || "Erro ao registrar");
        return;
      }

      setMessage("Usuário criado com sucesso 👍");
    } catch (err) {
      setMessage("Erro de conexão com o servidor");
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Registro</h1>

      <input
        type="email"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <br />

      <input
        type="password"
        placeholder="Senha"
        onChange={(e) => setPassword(e.target.value)}
      />

      <br />

      <button onClick={handleRegister}>Registrar</button>
      

      {message && <p>{message}</p>}
      <p className="auth-link">
        Já tem conta? <Link to="/login">Entrar</Link>
      </p>
    </div>
  );
}