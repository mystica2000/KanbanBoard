import Header from "./components/Header";
import Footer from "./components/Footer";
import Board from "./components/Board";
import './App.css';
import { createSignal } from 'solid-js';

function App() {




  return (
    <div className="container">
      <Header />
      <Board />
      <Footer />
    </div>
  );
}

export default App;
