import './App.css';
import { Route} from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Home from './components/Home';
import BreedDetail  from './components/BreedDetail'
import NavBar from './components/NavBar';

function App() {
  return (
    <div className="App">
      <Route path='/' component={NavBar} />
      <Route exact path='/' component={LandingPage} />
      <Route exact path='/home' component={Home} />
      <Route exact path='/dog/:id' component={BreedDetail}/>
    </div>
  );
}

export default App;
