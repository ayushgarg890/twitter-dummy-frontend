import './style.css'; // Import the CSS file
import Tweet from '../tweet/tweet';
import { TweetResponse } from '../../interfaces/tweet.response';
import * as _ from 'lodash';
export interface TimelineProps {
    name: string;
    tweets: TweetResponse[] | [];
    allowEdit: boolean
}


const Timeline = ({ name, tweets, allowEdit }: TimelineProps) => {
    // ...
    return (
        <div className="timeline">
            <h2>{name}</h2>
            {tweets.length > 0 && tweets.map((tweet) => (
                <Tweet 
                tweet={tweet}
                allowEdit={allowEdit} 
                />
            ))}
        </div>
    );
}

export default Timeline;