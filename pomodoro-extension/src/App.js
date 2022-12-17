import './App.css';
import Timer from './Pages/Timer/Timer.js';
import {
  Router
} from 'react-chrome-extension-router';

function App(props) {
  return (
    <div className="App">
      <Router>
       <Timer {...props}/>
      </Router>
    </div>
  );
}

export default App;