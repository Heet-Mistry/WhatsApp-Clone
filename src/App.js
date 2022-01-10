import './App.css';
import Sidebar from './Sidebar.js'
import Chat from './Chat';

function App() {
  return (
    // Bem naming conevtion
    <div className="app"> 
      <div className="app__body">
          <Sidebar />
          <Chat />
      </div>
    </div>
  );
}

export default App;
