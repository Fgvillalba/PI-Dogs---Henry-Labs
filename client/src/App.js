import './App.css';
import { Route} from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Home from './components/Home';
import BreedDetail  from './components/BreedDetail'
import NavBar from './components/NavBar';
import CreateBreed from './components/CreateBreed';


function App() {
  return (
    <div className="App">
      <Route path='/home' component={NavBar} />
      <Route exact path='/' component={LandingPage} />
      <Route exact path='/home' component={Home} />
      <Route exact path='/home/dog/:id' component={BreedDetail}/>
      <Route exact path='/home/dog' component={CreateBreed} />
    </div>
  );
}

export default App;
