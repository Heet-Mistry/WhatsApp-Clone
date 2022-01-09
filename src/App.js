import './App.css';
import Sidebar from './Sidebar.js'

function App() {
  return (
    // Bem naming conevtion
    <div className="app"> 
      <div className="app__body">
          <Sidebar />
      </div>
    </div>
  );
}

export default App;
