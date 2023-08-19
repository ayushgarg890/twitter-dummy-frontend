import React, { useState } from 'react';
import './style.css';
import config from '../config/config';
import { useAuth } from '../authentication/Auth-context';
import * as _ from 'lodash';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const TweetForm = () => {

    const { token } = useAuth();
    const navigate = useNavigate();
    const [tweetText, setTweetText] = useState('');

    const handleTweet = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            if(!token){
                navigate('/login');
                return;
            }
            
            await axios.post(
                `${config.backendUrl}/tweets/create-tweet`,
                { content: tweetText.trim() },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            navigate("/mytweet");
            setTweetText('');
        } catch (error) {
            console.error('Error creating tweet:', error);
        }
    };

    return (
        <div className="tweet-form">
            <h2>Create a New Tweet</h2>
            <form onSubmit={handleTweet}>
                <textarea
                    className="tweet-input"
                    rows={4}
                    cols={40}
                    placeholder="What's on your mind?"
                    value={tweetText}
                    onChange={(e) => setTweetText(e.target.value)}
                />
                <button className="tweet-button" type="submit">
                    Tweet
                </button>
            </form>
        </div>
    );
}

export default TweetForm;
