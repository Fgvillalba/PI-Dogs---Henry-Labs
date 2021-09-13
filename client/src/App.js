import "./Reset.css";
import "./App.css";
import { Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import Home from "./components/Home";
import BreedDetail from "./components/BreedDetail";
import CreateBreed from "./components/CreateBreed";
import Header from "./components/Header";

function App() {
  return (
    <div className="App">
      <header>
        <Route path="/" component={Header} />
      </header>
      <main>
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/home" component={Home} />
        <Route exact path="/dog/:id" component={BreedDetail} />
        <Route exact path="/dog" component={CreateBreed} />
      </main>
    </div>
  );
}

export default App;
