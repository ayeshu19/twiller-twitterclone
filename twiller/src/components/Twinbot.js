/*import React, { useState } from 'react';
import axios from 'axios';
import './Twinbot.css';


const Twinbot = () => {
  const [input, setInput] = useState('');
  const [tweets, setTweets] = useState([]);
  const [chatHistory, setChatHistory] = useState([]);

  const fetchTweets = async (topic) => {
    try {
      const response = await axios.get(`/api/tweets?topic=${topic}`);
      setTweets(response.data);
    } catch (error) {
      console.error('Error fetching tweets', error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchTweets(input);
    // Update chat history
    setChatHistory([...chatHistory, { user: input, response: `Fetching tweets about ${input}...` }]);
    setInput('');
  };

  return (
    <div className="twinbot">
      <h2>Welcome to Twinbot</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask Twinbot a question..."
        />
        <button type="submit">Submit</button>
      </form>
      <div className="chat-history">
        {chatHistory.map((chat, index) => (
          <div key={index} className="chat-message">
            <strong>You:</strong> {chat.user}
            <br />
            <strong>Twinbot:</strong> {chat.response}
          </div>
        ))}
      </div>
      <div className="tweets">
        <h3>Tweets:</h3>
        {tweets.map((tweet, index) => (
          <div key={index} className="tweet">
            {tweet.content}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Twinbot;*/


/*import React, { useState } from 'react';
import axios from 'axios';

const Twinbot = () => {
  const [input, setInput] = useState('');
  const [tweets, setTweets] = useState([]);
  const [chatHistory, setChatHistory] = useState([]);

  const fetchTweets = async (topic) => {
    try {
      const response = await axios.get(`/api/tweets?topic=${topic}`);
      setTweets(response.data);
    } catch (error) {
      console.error('Error fetching tweets', error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchTweets(input);
    // Update chat history
    setChatHistory([...chatHistory, { user: input, response: `Fetching tweets about ${input}...` }]);
    setInput('');
  };

  return (
    <div className="twinbot">
      <h2>Welcome to Twinbot</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask Twinbot a question..."
        />
        <button type="submit">Submit</button>
      </form>
      <div className="chat-history">
        {chatHistory.map((chat, index) => (
          <div key={index} className="chat-message">
            <strong>You:</strong> {chat.user}
            <br />
            <strong>Twinbot:</strong> {chat.response}
          </div>
        ))}
      </div>
      <div className="tweets">
        <h3>Tweets:</h3>
        {tweets.map((tweet, index) => (
          <div key={index} className="tweet">
            {tweet.content}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Twinbot;*/



import React, { useState } from 'react';
import axios from 'axios';

const Twinbot = () => {
  const [input, setInput] = useState('');
  const [tweets, setTweets] = useState([]);
  const [chatHistory, setChatHistory] = useState([]);

  const fetchTweets = async (topic) => {
    try {
      console.log(`Fetching tweets for topic: ${topic}`); // Debugging log
      const response = await axios.get(`http://localhost:5000/api/tweets?topic=${topic}`);
      console.log('Response data:', response.data); // Debugging log
      setTweets(response.data);
      setChatHistory([...chatHistory, { user: topic, response: `Found ${response.data.length} posts about ${topic}.` }]);
    } catch (error) {
      console.error('Error fetching tweets:', error); // Debugging log
      setChatHistory([...chatHistory, { user: topic, response: 'Error fetching posts.' }]);
      if (error.response) {
        // Server responded with a status other than 200 range
        console.error('Error response:', error.response);
      } else if (error.request) {
        // Request was made but no response received
        console.error('Error request:', error.request);
      } else {
        // Something happened in setting up the request
        console.error('Error message:', error.message);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchTweets(input);
    setInput('');
  };

  return (
    <div className="twinbot">
      <h2>Welcome to Twinbot</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask Twinbot a question..."
        />
        <button type="submit">Submit</button>
      </form>
      <div className="chat-history">
        {chatHistory.map((chat, index) => (
          <div key={index} className="chat-message">
            <strong>You:</strong> {chat.user}
            <br />
            <strong>Twinbot:</strong> {chat.response}
          </div>
        ))}
      </div>
      <div className="tweets">
        <h3>Tweets:</h3>
        {tweets.length === 0 ? (
          <p>No tweets found for this topic.</p>
        ) : (
          tweets.map((tweet, index) => (
            <div key={index} className="tweet">
              <img src={tweet.profilephoto} alt="Profile" />
              <p><strong>{tweet.username}</strong> ({tweet.name})</p>
              <p>{tweet.post}</p>
              {tweet.photo && <img src={tweet.photo} alt="Post" />}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Twinbot;
