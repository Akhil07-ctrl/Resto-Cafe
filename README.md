# Resto Cafe 🍽️

A modern restaurant ordering application built with React and Vite. Browse the menu, add items to your cart, and place orders with a smooth, responsive user interface.

## 🚀 Live Demo

Visit the live application: [Resto Cafe](https://Akhil07-ctrl.github.io/Resto-Cafe/)

## 🌟 Features

- **Dynamic Menu Display**: Fetches restaurant data and menu items from API
- **Shopping Cart**: Add/remove items with persistent storage using localStorage
- **Theme Support**: Light and dark mode toggle for better user experience
- **Order Management**: Complete checkout process with order summary
- **Payment Integration**: Payment form for order completion
- **Responsive Design**: Works seamlessly across desktop and mobile devices
- **Real-time Notifications**: User feedback for cart actions and order updates


## 🛠️ Built With

- **React 19** - Frontend framework
- **Vite** - Build tool and development server
- **React Context API** - State management for cart and theme
- **React Icons** - Icon library
- **CSS3** - Styling and responsive design
- **GitHub Pages** - Deployment platform

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/Akhil07-ctrl/Resto-Cafe.git
cd Resto-Cafe/client
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and visit `http://localhost:5173`

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run deploy` - Deploy to GitHub Pages

## 📁 Project Structure

```
client/
├── src/
│   ├── components/
│   │   ├── Cart/           # Shopping cart component
│   │   ├── Checkout/       # Checkout process
│   │   ├── Home/           # Main page component
│   │   ├── NavBar/         # Navigation component
│   │   ├── Notification/   # Toast notifications
│   │   ├── OrderSummary/   # Order details display
│   │   ├── PaymentForm/    # Payment processing
│   │   └── TabItems/       # Menu items display
│   ├── context/
│   │   ├── CartContext.jsx # Cart state management
│   │   └── ThemeContext.jsx # Theme state management
│   ├── App.jsx
│   └── main.jsx
├── public/
└── package.json
```

## 🎯 Key Features Explained

### Cart Management
- Persistent cart using localStorage
- Add/remove items with quantity control
- Real-time cart total calculation

### Theme System
- Toggle between light and dark modes
- Consistent theming across all components
- User preference persistence

### API Integration
- Fetches restaurant data from external API
- Error handling and loading states
- Retry functionality for failed requests

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 🧑‍💻 Developer

- **Kundena Akhil** - [Portfolio](https://portfolio-nine-flax-29.vercel.app/) - [GitHub](https://github.com/Akhil07-ctrl) - [LinkedIn](https://www.linkedin.com/in/kundena-akhil-4b7073170/)

## 📄 License

This project is open source and available under the [MIT License](LICENSE).