import React from 'react';
import PostComponent from '../PostComponent/PostComponent';
import '/Users/mica/Desarrollo Web & Mobile/redditapp/src/components/index.css';


function MainFeedComponent() {
  const posts = [
    {
      title: "Jimmy Carter at a military flyover for his 100th birthday",
      content: "Jimmy Carter at a military flyover for his 100th birthday...",
      subreddit: "user",
      time: "hace 16 horas"
    },
    {
      title: "Foo Fighters Enforced into hiatus",
      content: "Foo Fighters have announced that they are going into indefinite hiatus...",
      subreddit: "/r/music",
      time: "hace 10 horas"
    }
  ];

  return (
    <div className="col-md-6">
      {posts.map((post, index) => (
      <div key={index}
        className="post-button" // Add a class for styling as a button
        >
        <PostComponent
          title={post.title}
          content={post.content}
          subreddit={post.subreddit}
          time={post.time}
        />
        </div>
      ))}
    </div>
    
  );
}

export default MainFeedComponent;
