import { useState } from "react";
import "./AuthForm.css";

function AuthForm({ onLogin }) {
  const [idInstance, setIdInstance] = useState("");
  const [apiTokenInstance, setApiTokenInstance] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!idInstance.trim() || !apiTokenInstance.trim()) {
      alert("Пожалуйста, заполните оба поля");
      return;
    }
    onLogin({ idInstance, apiTokenInstance });
  };

  return (
    <form onSubmit={handleSubmit} className="auth-form">
      <div className="form-group">
        <label htmlFor="idInstance">idInstance</label>
        <input
          id="idInstance"
          type="text"
          value={idInstance}
          onChange={(e) => setIdInstance(e.target.value)}
          placeholder="Например, 1101abcdef"
        />
      </div>

      <div className="form-group">
        <label htmlFor="apiTokenInstance">apiTokenInstance</label>
        <input
          id="apiTokenInstance"
          type="password"
          value={apiTokenInstance}
          onChange={(e) => setApiTokenInstance(e.target.value)}
          placeholder="Введите ваш токен"
        />
      </div>

      <button type="submit" className="btn-primary">
        Войти
      </button>
    </form>
  );
}

export default AuthForm;
