import React, { useState } from 'react';
import './styles.css'
import { TweetResponse } from '../../interfaces/tweet.response';
import * as _ from 'lodash';
import { useAuth } from '../authentication/Auth-context';
import axios from 'axios';
import config from '../config/config';
import { useNavigate } from 'react-router-dom';

export interface TweetProps {
    tweet: TweetResponse,
    allowEdit: boolean;
}

const Tweet = ({ tweet, allowEdit }: TweetProps) => {

    const { token } = useAuth();

    const [isFollowing, setIsFollowing] = useState<boolean>(_.isUndefined(tweet.isUserFollowing) ? false : tweet.isUserFollowing);
    const [isEditing, setIsEditing] = useState(false);
    const [self, setIsSelf] = useState<boolean>(_.isUndefined(tweet.isCurrentUserAuthor) ? false : tweet.isCurrentUserAuthor);
    const [editedContent, setEditedContent] = useState(tweet.content);
    const navigate = useNavigate()

    const handleEdit = () => {
        setIsEditing(true);
    };

    const configs = {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    }

    const handleUpdate = async () => {
        try {
            const response = await axios.post(`${config.backendUrl}/tweets/update-tweet`, {
                id: tweet._id,
                content: editedContent,
            }, configs);
            alert(response.data);
            window.location.reload();
            setIsEditing(false);
        } catch (error: any) {
            alert(error.response.data.message);
        }
    };

    const handleDelete = async () => {
        try {
            const response = await axios.post(`${config.backendUrl}/tweets/delete-tweet`, {
                id: tweet._id,
            }, configs);
            alert(response.data);
            window.location.reload();
            setIsEditing(false);
        } catch (error: any) {
            alert(error.response.data.message);
        }
    };

    const handleFollow = async () => {
        try {
            const response = await axios.post(`${config.backendUrl}/follow/followUser/${tweet.userId}`, {}, configs);
            alert("Following "+tweet.username);
            window.location.reload();
            setIsEditing(false);
        } catch (error: any) {
            alert(error.response.data.message);
        }
    };

    const handleUnfollow = async () => {
        try {
            const response = await axios.post(`${config.backendUrl}/follow/unfollowUser/${tweet.userId}`, {}, configs);
            alert("Unfollowed "+ tweet.username);
            window.location.reload();
            setIsEditing(false);
        } catch (error: any) {
            alert(error.response.data.message);
        }
    };


return (
    <div className="tweet">
        {isEditing ? (
            <>
                <p className="author">@{tweet.username} </p>
                <textarea
                    className='tweet-input'
                    value={editedContent}
                    onChange={(e) => setEditedContent(e.target.value)}
                /><br />
                <button className='save-button' onClick={handleUpdate}>Save</button>
            </>
        ) : (
            <>
                <p className="author">@{tweet.username} </p>
                <p className="text">{tweet.content}</p>
                {!allowEdit ? (!self && (isFollowing ? (
                    <button className="followed-button" onClick={handleUnfollow}>Following</button>
                ) : (
                    <button className="follow-button" onClick={handleFollow}>Follow</button>
                ))) : (
                    <>
                        <button className="edit-button" onClick={handleEdit}>Edit</button>
                        
                        <button className='delete-button' onClick={handleDelete}>Delete</button>
                    </>
                )}
            </>
        )}
    </div>
);
};

export default Tweet;
