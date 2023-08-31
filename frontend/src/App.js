// src/App.js
import React, { useEffect, useState } from 'react';

import Navbar from './Navbar';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './Home';
import BlogDetails from './BlogDetails';
import Create from './Create';
import NotFound from './NotFound';

function App() {


  

  return (
    <Router>

    
    <div className="App">
      <Navbar />
      <div className="content">
        <Switch>
        <Route exact path='/'>
          <Home />
        </Route>

        <Route path="/create">
          <Create />
        </Route>

        <Route path="/blogs/:id">
            <BlogDetails />
        </Route>
        
        <Route path="*">
            <NotFound />
          </Route>

        </Switch>
      </div>
      







      {/*
      <h1>My Blog Posts</h1>
      <ul>
        {posts.map(post => (
          <li key={post.id}>
            <h2>{post.title}</h2>
            <p>{post.body}</p>
            <p>Author: {post.author}</p>
            <h3>Comments:</h3>
            <ul>
              {post.comments.map(comment => (
                <li key={comment.cid}>
                  <p>{comment.text}</p>
                  <p>By: {comment.username}</p>
                  <p>Likes: {comment.likes}</p>
                </li>
              ))}
            </ul>
          </li>
        ))}
              </ul>*/}
    </div>
    </Router>
  );
}

export default App;
