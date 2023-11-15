import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.css";

function Redditcards() {
  const [data, setPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://www.reddit.com/r/reactjs.json" );
        const data = response.data.data.children;
        setPosts(data);
      } catch (error) {
        console.error("Error fetching Reddit data:", error);
      }
    };

    fetchData();
  }, []);
  return (
    <div className="card">
      <div className="reddit-container ">
        {data.map((post) => (
          <div key={post.data.id} className="reddit-card">
            <h2 className="reddit-title">{post.data.title}</h2>
            <div
              className="reddit-selftext"
              dangerouslySetInnerHTML={{ __html: post.data.selftext_html }}
            />
            <p className="reddit-url">
              <a href={post.data.url} target="_blank" rel="noopener noreferrer">
                {post.data.url}
              </a>
            </p>
            <p className="reddit-score">Score: {post.data.score}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Redditcards;
