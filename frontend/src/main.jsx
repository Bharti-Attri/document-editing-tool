import { createRoot } from 'react-dom/client';
import Navbar from './components/Navbar.jsx';
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <>
    <Navbar/>
    <App />
  </>
)
