import './App.css';
import Board from './Components/Board';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import GameResult from './Components/GameResult';

function App() {
  return (
    <div className='App'>
      <Router>
        <Routes>
          <Route path="/" element={<Board/>}/>
          <Route path="/result" element={<GameResult/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
