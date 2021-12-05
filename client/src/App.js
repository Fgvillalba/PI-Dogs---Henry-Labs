import "./Reset.css";
import "./App.css";
import { Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import Home from "./components/Home";
import BreedDetail from "./components/BreedDetail";
import Header from "./components/Header";
import CreateBreed from "./components/createBreed/CreateBreed";

function App() {
	return (
		<div className="App">
			<Route exact path="/" component={LandingPage} />
			<header>
				<Route
					path={["/home", "/dog"]}
					component={Header}
				/>
			</header>
			<main>
				<Route exact path="/home" component={Home} />
				<Route
					exact
					path="/dog/:id"
					component={BreedDetail}
				/>
				<Route
					exact
					path="/dog"
					component={CreateBreed}
				/>
			</main>
		</div>
	);
}

export default App;
