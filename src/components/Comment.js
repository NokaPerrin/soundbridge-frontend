import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import CommentForm from './CommentForm';

export default class Comment extends Component {

    state = {
        loading: true,
        showCommentForm: false,
        commentBtnText: 'Comment',
        comments: [],
    }

    async componentDidMount() {
        // const res = await fetch(`https://soundbridge.herokuapp.com/api/posts/get-comments/${this.props.postId}`);
        const res = await fetch(`http://localhost:4000/api/posts/get-comments/${this.props.postId}`);
        const comments = await res.json();
        this.setState({
            comments,
            loading: !this.state.loading
        });
    }

    commentBtnClicked = () => {
        if (this.state.commentBtnText === 'Comment') {
            this.setState({
                commentBtnText: 'Close',
                showCommentForm: !this.state.showCommentForm
            });
        } else {
            this.setState({
                commentBtnText: 'Comment',
                showCommentForm: !this.state.showCommentForm
            });
        }
    }

    getNewComment = commentInfo => {
        this.setState({
            commentBtnText: 'Comment',
            showCommentForm: !this.state.showCommentForm,
            comments: [...this.state.comments, commentInfo],
        });
    }

    render() {
        if (this.state.loading) {
            return (
                <div></div>
            )
        }
        console.log('comment props: ', this.props.userInfo);
        return (
            <div>
                {
                    this.state.comments.length > 0 ?
                        this.state.comments.map((comment, i) => {
                            return (
                                <div key={i} >
                                    <h3>{comment.userName}</h3>
                                    <br></br>
                                    <p>{comment.body}</p>
                                </div>
                            )
                        }) :
                        <h4>There aren't any comments yet</h4>
                }
                {
                    this.props.userInfo.loggedIn === 'true' ?
                        <div>
                            <button onClick={this.commentBtnClicked}>
                                {this.state.commentBtnText}
                            </button>
                            <div>
                                {
                                    this.state.showCommentForm ?
                                        <CommentForm
                                            postId={this.props.postId}
                                            userInfo={this.props.userInfo}
                                            getNewComment={this.getNewComment}
                                        /> : null
                                }
                            </div>
                        </div>
                        :
                        <Link to="/login"><button>Log in to comment</button></Link>
                }
            </div>
        )
    }
}
