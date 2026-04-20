import { useState, useEffect } from "react";
import ReCAPTCHA from "react-google-recaptcha";

function App() {
  const [captcha, setCaptcha] = useState(null);
  const [error, setError] = useState("");
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const API_URL = import.meta.env.VITE_API_URL;

  const getMe = async (token) => {
  const response = await fetch(`${API_URL}/me`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`
    },
  });

  return response.json();
};

useEffect(() => {
  const token = localStorage.getItem("token");

  console.log("TOKEN:", token);

  if (token) {
    getMe(token).then((data) => {
      console.log("ME:", data);
      setUser(data);
    });
  }
}, []);

  const handleLogin = async () => {

    setError(""); // limpa erro antigo

    const response = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
        captcha,
      }),
    });

    const data = await response.json();

    if (!response.ok || data.error) {
      setError(data.error || "Erro ao fazer login");
      return;
    }
    
    console.log("LOGIN:", data);
    if (data.access_token) {
      localStorage.setItem("token", data.access_token);

      // busca usuário depois do login
      const me = await getMe(data.access_token);
      setUser(me);
  }
  
};

  const handleRegister = async () => {
    const response = await fetch(`${API_URL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    console.log("REGISTER:", data);
  };

  useEffect(() => {
  const token = localStorage.getItem("token");

  if (token) {
    getMe(token).then((data) => {
      if (!data.detail) setUser(data);
      else localStorage.removeItem("token");
    });
  }
}, []);

const handleLogout = () => {
  localStorage.removeItem("token");
  setUser(null);
  window.location.reload();
};

    return (
    <div>
      <h1>Bem Vindo</h1>

      {!user ? (
        <>
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
          <ReCAPTCHA
            sitekey="6Ld4YcAsAAAAAIz3czEmVmhYpWAIA5l9xmqpNSdd"
            onChange={(value) => setCaptcha(value)}
          />
          <button onClick={handleLogin}>Login</button>
          <button onClick={handleRegister}>Registrar</button>
        </>
      ) : (
        <div>
          <h2>Logado como: {user.user}</h2>
          <button onClick={handleLogout}>Logout</button>
        </div>
        
      )}
      {error && (
        <p style={{ color: "red" }}>
          {error}
        </p>
      )}
    </div>
  );
        
  
}

export default App;