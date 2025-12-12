import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { SnackbarProvider } from 'notistack';
import App from './App.jsx';
import './styles/globals.css';

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <SnackbarProvider
            maxSnack={3}
            autoHideDuration={3000}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
            <App />
        </SnackbarProvider>
    </StrictMode>
);
