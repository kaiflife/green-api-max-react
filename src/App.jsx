import { useState } from "react";
import AuthForm from "./components/AuthForm/AuthForm";
import ChatWindow from "./components/ChatWindow/ChatWindow";

function App() {
  const [credentials, setCredentials] = useState(null);

  return (
    <div className="app-container">
      {!credentials ? (
        <div className="auth-card">
          <h2>Вход в GREEN-API</h2>
          <AuthForm onLogin={(data) => setCredentials(data)} />
        </div>
      ) : (
        <div className="chat-layout">
          <ChatWindow
            credentials={credentials}
            onLogout={() => setCredentials(null)}
          />
        </div>
      )}
    </div>
  );
}

export default App;
