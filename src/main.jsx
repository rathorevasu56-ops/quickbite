import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import FoodDeliveryApp from './FoodDeliveryApp'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <FoodDeliveryApp />
  </StrictMode>,
)