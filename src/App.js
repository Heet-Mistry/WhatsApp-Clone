import React from 'react'
import './App.css';
import Sidebar from './Sidebar.js'
import Chat from './Chat';
import { BrowserRouter as Router,Switch, Route} from 'react-router-dom';
import Login from './Login';
import {useStateValue} from './StateProvider'
import Chattemp from './Chattemp';

function App() {

   // eslint-disable-next-line no-unused-vars
    const [{user},dispatch] = useStateValue();
   
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
                 <Chattemp />
              </Route>
            </Switch>
          </Router>
      </div>
      )}
    </div>
  );
}

export default App;
