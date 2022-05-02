import logo from "./logo.svg";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Note from "./components/Note";
import Card from "./components/Card";

function App() {
  return (
    <div>
      <Header />
      <Note />
      <Footer />
      <div className="App">
        <header className="App-header">
          <Card
            name="Lamborghini Aventador"
            alt="Lamborghini Aventador"
            img="https://performancedrive.com.au/wp-content/uploads/2018/08/Lamborghini-Aventador-SVJ-front.jpg"
          />
          <Card
            name="Ferrari Roma"
            alt="Ferrari Roma"
            img="https://www.replytonews.com/wp-content/uploads/2020/10/Ferrari-Roma-11a40157.jpg"
          />
          <Card
            name="Ford Shelby"
            alt="Ford Shelby"
            img="https://pictures.topspeed.com/IMG/jpg/201604/2016-ford-shelby-gt350-mu-3.jpg"
          />

          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    </div>
  );
}

export default App;
