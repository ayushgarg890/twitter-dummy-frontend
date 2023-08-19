import { useEffect, useState } from 'react';
import { useAuth } from '../authentication/Auth-context';
import Timeline from '../timeline/timeline';
import config from '../config/config';
import axios from 'axios';
import { TweetResponse } from '../../interfaces/tweet.response';
import { useNavigate } from 'react-router-dom';
import * as _ from 'lodash';

const FollowingUserTweetPage = () => {
    const { token } = useAuth();
    const navigate = useNavigate();

    const [tweets, setTweets] = useState<TweetResponse[]>([]);

    const fetchTweets = async () => {
        try {
            const configs = {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            }
            const response = await axios.get(`${config.backendUrl}/tweets/get-following-users-tweets`, configs);

            setTweets(response.data);
        } catch (error) {
            console.error('Error fetching tweets:', error);
        }
    };

    useEffect(() => {
        if (_.isNull(token))
            navigate('/login')
        else
            fetchTweets();
    }, [token]);


    return (
        <div>
            <Timeline name={'My Tweets'} tweets={tweets} allowEdit={false} />
        </div>
    );
}

export default FollowingUserTweetPage;
