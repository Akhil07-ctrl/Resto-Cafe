import Home from './components/Home'
import { CartProvider } from './context/CartContext'
import { ThemeProvider } from './context/ThemeContext'
import './App.css'

const App = () => (
  <ThemeProvider>
    <CartProvider>
      <Home />
    </CartProvider>
  </ThemeProvider>
)

export default App
