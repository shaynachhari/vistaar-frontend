import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from "./context/AuthContext";
import { GoogleOAuthProvider } from '@react-oauth/google';
import "bootstrap/dist/css/bootstrap.min.css";

const clientId = '1059362568614-jdjgh1np1ap95e5efcbj6tgmv5iqb5hs.apps.googleusercontent.com'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={clientId}>
      <AuthProvider>
        <App />
      </AuthProvider>
    </GoogleOAuthProvider>
  </StrictMode>,
)