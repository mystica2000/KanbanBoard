import Header from "./components/Header";
import Footer from "./components/Footer";
import Board from "./components/Board";
import './App.css';

function App() {

  console.log("LOG")

  return (
    <div className="container">
      <Header />
      <Board />
      <Footer />
    </div>
  );
}

export default App;
