import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [captcha, setCaptcha] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const API_URL = import.meta.env.VITE_API_URL;

  const handleLogin = async () => {
    setError("");

    const response = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        password,
        captcha,
      }),
    });

    const data = await response.json();

    if (!response.ok || data.error) {
      setError(data.error || "Erro ao logar");
      return;
    }

    localStorage.setItem("token", data.access_token);
    navigate("/");
  };

  return (
    <div className="center">
      <h1>Login</h1>

      <input
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        placeholder="Senha"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <div className="recaptcha-wrapper">
        <ReCAPTCHA
          sitekey="6Ld4YcAsAAAAAIz3czEmVmhYpWAIA5l9xmqpNSdd"
          onChange={(value) => setCaptcha(value)}
        />
      </div>

      <button onClick={handleLogin}>Entrar</button>
      
      <p className="auth-link">
          Não tem conta? <Link to="/register">Criar conta</Link>
      </p>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}