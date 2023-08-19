export interface TweetResponse {
    _id: string,
    content: string,
    createdAt: string,
    userId: string,
    username: string,
    isUserFollowing?: boolean,
    isCurrentUserAuthor?: boolean,
}