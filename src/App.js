import {useState} from 'react'
import './App.css';
import Sidebar from './Sidebar.js'
import Chat from './Chat';
import { BrowserRouter as Router,Switch, Route} from 'react-router-dom';
import Login from './Login';

function App() {

  const [user,setUser] = useState(null);
  
  return (
    // Bem naming conevtion
    <div className="app"> 
      {!user ? (
          <Login />
      ):(
        <div className="app__body">
          <Router>
            <Sidebar />
            <Switch>
              <Route path="/rooms/:roomId">
                <Chat />
              </Route>
              <Route path="/">
                <Chat />
              </Route>
            </Switch>
          </Router>
      </div>
      )}
    </div>
  );
}

export default App;
