import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import './index.css'
import { Provider } from 'react-redux';
import { store } from './store';
import App from './App.jsx'
import { Toaster } from 'react-hot-toast';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
        <Toaster
          position="top-center"
          toastOptions={{
            duration: 3000,
            style: {
              background: 'rgba(15, 23, 42, 0.92)',
              color: '#E2E8F0',
              borderRadius: '14px',
              border: '1px solid rgba(99, 102, 241, 0.35)',
              boxShadow: '0 18px 50px rgba(15, 23, 42, 0.35)',
              backdropFilter: 'blur(10px)',
            },
            success: {
              iconTheme: { primary: '#22C55E', secondary: '#0F172A' },
            },
            error: {
              iconTheme: { primary: '#EF4444', secondary: '#0F172A' },
            },
          }}
        />
      </Provider>
    </BrowserRouter>
  </StrictMode>,
)
