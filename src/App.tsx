import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/login/login';
import Navbar from './components/navbar/navbar';
import Register from './components/register/resgister';
import { useAuth } from './components/authentication/Auth-context';
import TweetForm from './components/tweet-form/tweet-form';
import Timeline from './components/timeline/timeline';
import Home from './components/home/home';
import FollowingUserTweetPage from './components/following-user-tweet/following-user-tweet';
import UserTweetPage from './components/user-tweet/user.tweet';

function App() {
  const { login } = useAuth();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      login(token);
    }
  }, [login]);

  return (
    <Router>
      <div className="app">
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path='/timeline' element={<FollowingUserTweetPage />} />
          <Route path='/myTweet' element={<UserTweetPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
