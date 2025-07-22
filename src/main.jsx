import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { WishlistProvider } from './contexts/WishlistContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <WishlistProvider>
      <App />
    </WishlistProvider>
  </StrictMode>,
)
