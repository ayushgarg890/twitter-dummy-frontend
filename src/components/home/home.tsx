import { useEffect, useState } from 'react';
import { useAuth } from '../authentication/Auth-context';
import Timeline from '../timeline/timeline';
import TweetForm from '../tweet-form/tweet-form';
import config from '../config/config';
import axios from 'axios';
import { TweetResponse } from '../../interfaces/tweet.response';

const HomePage = () => {
    const { token } = useAuth();
    const [tweets, setTweets] = useState<TweetResponse[]>([]);

    const fetchTweets = async () => {
        try {
            let response;
            if (token) {
                let configs = {
                    headers: {
                      'Authorization': 'Bearer ' + token
                    }
                }
                response = await axios.get(`${config.backendUrl}/tweets/get-all-tweets-by-user`,configs);
            }
            else{
                response = await axios.get(`${config.backendUrl}/tweets/get-all-tweets`);
            }
            setTweets(response.data);
        } catch (error) {
            console.error('Error fetching tweets:', error);
        }
    };

    useEffect(() => {
        fetchTweets();
    }, [token]);

    return (
        <div>
            <h1 style={{marginLeft:"10px"}}>Welcome to the Homepage</h1>
            <TweetForm />
            <Timeline name={'Recent Tweets'} tweets={tweets} allowEdit={false} />
        </div>
    );
}

export default HomePage;
