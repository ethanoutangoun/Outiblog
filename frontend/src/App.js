// src/App.js


import Navbar from './Navbar';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './Home';
import BlogDetails from './BlogDetails';
import Create from './Create';
import NotFound from './NotFound';
import { useAuth0 } from "@auth0/auth0-react";

function App() {

  const { user, isAuthenticated, isLoading, loginWithRedirect } = useAuth0();

  

  return (
    <Router>

    
    <div className="App">
      <Navbar user = {user} isAuthenticated = {isAuthenticated} isLoading = {isLoading}/>
      <div className="content">
        <Switch>
        <Route exact path='/'>
          <Home user = {user} isAuthenticated = {isAuthenticated} isLoading = {isLoading}/>
        </Route>

        <Route path="/create">
          <Create user = {user} isAuthenticated = {isAuthenticated} isLoading = {isLoading} loginWithRedirect = {loginWithRedirect}/>
        </Route>

        <Route path="/blogs/:id">
            <BlogDetails user = {user} isAuthenticated = {isAuthenticated} isLoading = {isLoading} loginWithRedirect = {loginWithRedirect}/>
        </Route>
        
        <Route path="*">
            <NotFound />
          </Route>

        </Switch>
      </div>
      
    </div>
    </Router>
  );
}

export default App;
