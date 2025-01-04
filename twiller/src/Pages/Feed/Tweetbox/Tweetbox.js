/*import React, { useState } from "react";
import "./Tweetbox.css";
import { Avatar, Button } from "@mui/material";
import AddPhotoAlternateOutlinedIcon from "@mui/icons-material/AddPhotoAlternateOutlined";
import axios from "axios";
import { useUserAuth } from "../../../context/UserAuthContext";
import useLoggedinuser from "../../../hooks/useLoggedinuser";
const Tweetbox = () => {
  const [post, setpost] = useState("");
  const [imageurl, setimageurl] = useState("");
  const [isloading, setisloading] = useState(false);
  const [name, setname] = useState("");
  const [username, setusername] = useState("");
  const { user } = useUserAuth();
  const [loggedinsuer] = useLoggedinuser();
  const email = user?.email;
  const userprofilepic = loggedinsuer[0]?.profileImage
    ? loggedinsuer[0].profileImage
    : user && user.photoURL;

  const handleuploadimage = (e) => {
    setisloading(true);
    const image = e.target.files[0];
    // console.log(image)
    const formData = new FormData();
    formData.set("image", image);
    axios
      .post(
        "https://api.imgbb.com/1/upload?key=a95936edeefcd4b6ca81ba1151e17656",
        formData
      )
      .then((res) => {
        setimageurl(res.data.data.display_url);
        console.log(res.data.data.display_url);
        setisloading(false);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const handletweet = (e) => {
    e.preventDefault();
    if (user?.providerData[0]?.providerId === "password") {
      fetch(`http://localhost:5000/loggedinuser?email=${email}`)
        .then((res) => res.json())
        .then((data) => {
          // console.log(data[0].name);
          setname(data[0]?.name);
          setusername(data[0]?.username);
        });
    } else {
      setname(user?.displayName);
      setusername(email?.split("@")[0]);
    }
    // console.log(name);
    if (name) {
      const userpost = {
        profilephoto: userprofilepic,
        post: post,
        photo: imageurl,
        username: username,
        name: name,
        email: email,
      };
      // console.log(userpost);
      setpost("");
      setimageurl("");
      fetch("http://localhost:5000/post", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(userpost),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
        });
    }
  };
  return (
    <div className="tweetBox">
      <form onSubmit={handletweet}>
        <div className="tweetBox__input">
          <Avatar
            src={
              loggedinsuer[0]?.profileImage
                ? loggedinsuer[0].profileImage
                : user && user.photoURL
            }
          />
          <input
            type="text"
            placeholder="What's happening?"
            onChange={(e) => setpost(e.target.value)}
            value={post}
            required
          />
        </div>
        <div className="imageIcon_tweetButton">
          <label htmlFor="image" className="imageIcon">
            {isloading ? (
              <p>Uploading Image</p>
            ) : (
              <p>
                {imageurl ? (
                  "Image Uploaded"
                ) : (
                  <AddPhotoAlternateOutlinedIcon />
                )}
              </p>
            )}
          </label>
          <input
            type="file"
            id="image"
            className="imageInput"
            onChange={handleuploadimage}
          />
          <Button className="tweetBox__tweetButton" type="submit">
            Tweets
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Tweetbox;*/




/*import React, { useState, useEffect } from "react";
import "./Tweetbox.css";
import { Avatar, Button } from "@mui/material";
import AddPhotoAlternateOutlinedIcon from "@mui/icons-material/AddPhotoAlternateOutlined";
import axios from "axios";
import { useUserAuth } from "../../../context/UserAuthContext";
import useLoggedinuser from "../../../hooks/useLoggedinuser";

const TweetBox = () => {
  const [post, setPost] = useState("");
  const [imageurl, setImageurl] = useState("");
  const [videourl, setVideourl] = useState("");
  const [isloading, setIsLoading] = useState(false);
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const { user } = useUserAuth();
  const [loggedinuser] = useLoggedinuser();
  const email = user?.email;
  const userprofilepic = loggedinuser[0]?.profileImage
    ? loggedinuser[0].profileImage
    : user && user.photoURL;

  useEffect(() => {
    if (user?.providerData[0]?.providerId === "password") {
      fetch(`http://localhost:5000/loggedinuser?email=${email}`)
        .then((res) => res.json())
        .then((data) => {
          setName(data[0]?.name);
          setUsername(data[0]?.username);
        });
    } else {
      setName(user?.displayName);
      setUsername(email?.split("@")[0]);
    }
  }, [user, email]);

  const handleUploadImage = (e) => {
    setIsLoading(true);
    const image = e.target.files[0];
    const formData = new FormData();
    formData.set("image", image);
    axios
      .post(
        "https://api.imgbb.com/1/upload?key=a95936edeefcd4b6ca81ba1151e17656",
        formData
      )
      .then((res) => {
        setImageurl(res.data.data.display_url);
        setIsLoading(false);
      })
      .catch((e) => {
        console.log(e);
        setIsLoading(false);
      });
  };

  const handleUploadVideo = (e) => {
    setIsLoading(true);
    const video = e.target.files[0];
    const formData = new FormData();
    formData.set("video", video);
    formData.set("title", "Video Title"); // Adjust this as needed
    formData.set("description", "Video Description");
    formData.set("profilephoto", userprofilepic);
    formData.set("post", post);
    formData.set("photo", imageurl);
    formData.set("username", username);
    formData.set("name", name);
    formData.set("email", email);

    axios
      .post("http://localhost:5000/upload-video", formData)
      .then((res) => {
        setVideourl(res.data.videoUrl);
        setIsLoading(false);
      })
      .catch((e) => {
        console.log(e);
        setIsLoading(false);
      });
  };

  const handleTweet = (e) => {
    e.preventDefault();
    handleUploadVideo(e);
  };

  return (
    <div className="tweetBox">
      <form onSubmit={handleTweet}>
        <div className="tweetBox__input">
          <Avatar
            src={
              loggedinuser[0]?.profileImage
                ? loggedinuser[0].profileImage
                : user && user.photoURL
            }
          />
          <input
            type="text"
            placeholder="What's happening?"
            onChange={(e) => setPost(e.target.value)}
            value={post}
            required
          />
        </div>
        <div className="mediaIcon_tweetButton">
          <label htmlFor="image" className="mediaIcon">
            {isloading ? (
              <p>Uploading Image...</p>
            ) : (
              <p>
                {imageurl ? "Image Uploaded" : <AddPhotoAlternateOutlinedIcon />}
              </p>
            )}
          </label>
          <input
            type="file"
            id="image"
            className="mediaInput"
            onChange={handleUploadImage}
          />

          <label htmlFor="video" className="mediaIcon">
            {isloading ? (
              <p>Uploading Video...</p>
            ) : (
              <p>
                {videourl ? "Video Uploaded" : "Upload Video"} 
              </p>
            )}
          </label>
          <input
            type="file"
            id="video"
            className="mediaInput"
            onChange={handleUploadVideo}
          />

          <Button className="tweetBox__tweetButton" type="submit">
            Tweet
          </Button>
        </div>
      </form>
    </div>
  );
};

export default TweetBox;*/


/*import React, { useState } from "react";
import "./Tweetbox.css";
import { Avatar, Button } from "@mui/material";
import AddPhotoAlternateOutlinedIcon from "@mui/icons-material/AddPhotoAlternateOutlined";
import axios from "axios";
import { useUserAuth } from "../../../context/UserAuthContext";
import useLoggedinuser from "../../../hooks/useLoggedinuser";

const TweetBox = () => {
  const [post, setPost] = useState("");
  const [imageurl, setImageurl] = useState("");
  const [videourl, setVideourl] = useState("");
  const [isloading, setIsLoading] = useState(false);
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const { user } = useUserAuth();
  const [loggedinuser] = useLoggedinuser();
  const email = user?.email;
  const userprofilepic = loggedinuser && loggedinuser[0]?.profileImage
    ? loggedinuser[0].profileImage
    : user && user.photoURL;

  const handleUploadImage = (e) => {
    setIsLoading(true);
    const image = e.target.files[0];
    const formData = new FormData();
    formData.set("image", image);
    axios
      .post(
        "https://api.imgbb.com/1/upload?key=a95936edeefcd4b6ca81ba1151e17656",
        formData
      )
      .then((res) => {
        setImageurl(res.data.data.display_url);
        setIsLoading(false);
      })
      .catch((e) => {
        console.log(e);
        setIsLoading(false);
      });
  };

  const handleTweet = async (e) => {
    e.preventDefault();

    if (user?.providerData[0]?.providerId === "password") {
      const response = await fetch(`http://localhost:5000/loggedinuser?email=${email}`);
      const data = await response.json();
      if (data && data.length > 0) {
        setName(data[0]?.name);
        setUsername(data[0]?.username);
      }
    } else {
      setName(user?.displayName);
      setUsername(email?.split("@")[0]);
    }

    const userpost = {
      profilephoto: userprofilepic,
      post: post,
      photo: imageurl,
      video: videourl,
      username: username,
      name: name,
      email: email,
    };

    setPost("");
    setImageurl("");
    setVideourl("");

    fetch("http://localhost:5000/post", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(userpost),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  };

  return (
    <div className="tweetBox">
      <form onSubmit={handleTweet}>
        <div className="tweetBox__input">
          <Avatar
            src={
              loggedinuser && loggedinuser[0]?.profileImage
                ? loggedinuser[0].profileImage
                : user && user.photoURL
            }
          />
          <input
            type="text"
            placeholder="What's happening?"
            onChange={(e) => setPost(e.target.value)}
            value={post}
            required
          />
        </div>
        <div className="mediaIcon_tweetButton">
          <label htmlFor="image" className="mediaIcon">
            {isloading ? (
              <p>Uploading Image...</p>
            ) : (
              <p>
                {imageurl ? "Image Uploaded" : <AddPhotoAlternateOutlinedIcon />}
              </p>
            )}
          </label>
          <input
            type="file"
            id="image"
            className="mediaInput"
            onChange={handleUploadImage}
          />
          
          <Button className="tweetBox__tweetButton" type="submit">
            Tweet
          </Button>
        </div>
      </form>
    </div>
  );
};

export default TweetBox;*/



/*import React, { useState } from "react";
import "./Tweetbox.css";
import { Avatar, Button } from "@mui/material";
import AddPhotoAlternateOutlinedIcon from "@mui/icons-material/AddPhotoAlternateOutlined";
import axios from "axios";
import { useUserAuth } from "../../../context/UserAuthContext";
import useLoggedinuser from "../../../hooks/useLoggedinuser";

const TweetBox = () => {
  const [post, setPost] = useState("");
  const [imageurl, setImageurl] = useState("");
  const [videourl, setVideourl] = useState("");
  const [isloading, setIsLoading] = useState(false);
  const { user } = useUserAuth();
  const [loggedinuser] = useLoggedinuser();
  const email = user?.email;
  const userprofilepic = loggedinuser && loggedinuser[0]?.profileImage
    ? loggedinuser[0].profileImage
    : user && user.photoURL;

  const handleUploadImage = async (e) => {
    setIsLoading(true);
    const image = e.target.files[0];
    const formData = new FormData();
    formData.set("image", image);
    
    try {
      const res = await axios.post(
        "https://api.imgbb.com/1/upload?key=a95936edeefcd4b6ca81ba1151e17656",
        formData
      );
      setImageurl(res.data.data.display_url);
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTweet = async (e) => {
    e.preventDefault();

    let name, username;
    if (user?.providerData[0]?.providerId === "password") {
      const response = await fetch(`http://localhost:5000/loggedinuser?email=${email}`);
      const data = await response.json();
      if (data && data.length > 0) {
        name = data[0]?.name;
        username = data[0]?.username;
      }
    } else {
      name = user?.displayName;
      username = email?.split("@")[0];
    }

    const userpost = {
      profilephoto: userprofilepic,
      post: post,
      photo: imageurl,
      video: videourl,
      username: username,
      name: name,
      email: email,
    };

    setPost("");
    setImageurl("");
    setVideourl("");

    fetch("http://localhost:5000/post", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(userpost),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  };

  return (
    <div className="tweetBox">
      <form onSubmit={handleTweet}>
        <div className="tweetBox__input">
          <Avatar
            src={
              loggedinuser && loggedinuser[0]?.profileImage
                ? loggedinuser[0].profileImage
                : user && user.photoURL
            }
          />
          <input
            type="text"
            placeholder="What's happening?"
            onChange={(e) => setPost(e.target.value)}
            value={post}
            required
          />
        </div>
        <div className="mediaIcon_tweetButton">
          <label htmlFor="image" className="mediaIcon">
            {isloading ? (
              <p>Uploading Image...</p>
            ) : (
              <p>
                {imageurl ? "Image Uploaded" : <AddPhotoAlternateOutlinedIcon />}
              </p>
            )}
          </label>
          <input
            type="file"
            id="image"
            className="mediaInput"
            onChange={handleUploadImage}
          />
          
          <Button className="tweetBox__tweetButton" type="submit">
            Tweet
          </Button>
        </div>
      </form>
    </div>
  );
};

export default TweetBox;*/



/*import React, { useState } from "react";
import "./Tweetbox.css";
import { Avatar, Button } from "@mui/material";
import AddPhotoAlternateOutlinedIcon from "@mui/icons-material/AddPhotoAlternateOutlined";
import axios from "axios";
import { useUserAuth } from "../../../context/UserAuthContext";
import useLoggedinuser from "../../../hooks/useLoggedinuser";

const TweetBox = () => {
  const [post, setPost] = useState("");
  const [imageurl, setImageurl] = useState("");
  const [videourl, setVideourl] = useState("");
  const [isloading, setIsLoading] = useState(false);
  const { user } = useUserAuth();
  const [loggedinuser] = useLoggedinuser();
  const email = user?.email;
  const userprofilepic = loggedinuser && loggedinuser[0]?.profileImage
    ? loggedinuser[0].profileImage
    : user && user.photoURL;

  const handleUploadImage = async (e) => {
    setIsLoading(true);
    const image = e.target.files[0];
    const formData = new FormData();
    formData.set("image", image);
    
    try {
      const res = await axios.post(
        "https://api.imgbb.com/1/upload?key=a95936edeefcd4b6ca81ba1151e17656",
        formData
      );
      setImageurl(res.data.data.display_url);
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUploadVideo = async (e) => {
    setIsLoading(true);
    const video = e.target.files[0];
    const formData = new FormData();
    formData.set("video", video);
    formData.set("title", "Video Title"); // Adjust this as needed
    formData.set("description", "Video Description");

    try {
      const res = await axios.post("http://localhost:5000/upload-video", formData);
      setVideourl(res.data.videoUrl);
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTweet = async (e) => {
    e.preventDefault();

    let name, username;
    if (user?.providerData[0]?.providerId === "password") {
      const response = await fetch(`http://localhost:5000/loggedinuser?email=${email}`);
      const data = await response.json();
      if (data && data.length > 0) {
        name = data[0]?.name;
        username = data[0]?.username;
      }
    } else {
      name = user?.displayName;
      username = email?.split("@")[0];
    }

    const userpost = {
      profilephoto: userprofilepic,
      post: post,
      photo: imageurl,
      video: videourl,
      username: username,
      name: name,
      email: email,
    };

    setPost("");
    setImageurl("");
    setVideourl("");

    fetch("http://localhost:5000/post", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(userpost),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  };

  return (
    <div className="tweetBox">
      <form onSubmit={handleTweet}>
        <div className="tweetBox__input">
          <Avatar
            src={
              loggedinuser && loggedinuser[0]?.profileImage
                ? loggedinuser[0].profileImage
                : user && user.photoURL
            }
          />
          <input
            type="text"
            placeholder="What's happening?"
            onChange={(e) => setPost(e.target.value)}
            value={post}
            required
          />
        </div>
        <div className="mediaIcon_tweetButton">
          <label htmlFor="image" className="mediaIcon">
            {isloading ? (
              <p>Uploading Image...</p>
            ) : (
              <p>
                {imageurl ? "Image Uploaded" : <AddPhotoAlternateOutlinedIcon />}
              </p>
            )}
          </label>
          <input
            type="file"
            id="image"
            className="mediaInput"
            onChange={handleUploadImage}
          />
          
          <label htmlFor="video" className="mediaIcon">
            {isloading ? (
              <p>Uploading Video...</p>
            ) : (
              <p>
                {videourl ? "Video Uploaded" : "Upload Video"} 
              </p>
            )}
          </label>
          <input
            type="file"
            id="video"
            className="mediaInput"
            onChange={handleUploadVideo}
          />

          <Button className="tweetBox__tweetButton" type="submit">
            Tweet
          </Button>
        </div>
      </form>
    </div>
  );
};

export default TweetBox;*/


/*import React, { useState } from "react";
import "./Tweetbox.css";
import { Avatar, Button } from "@mui/material";
import AddPhotoAlternateOutlinedIcon from "@mui/icons-material/AddPhotoAlternateOutlined";
import { useUserAuth } from "../../../context/UserAuthContext";
import useLoggedinuser from "../../../hooks/useLoggedinuser";
import axios from "axios";

const TweetBox = () => {
  const [post, setPost] = useState("");
  const [imageurl, setImageurl] = useState("");
  const [videourl, setVideourl] = useState("");
  const [isloading, setIsLoading] = useState(false);
  const { user } = useUserAuth();
  const [loggedinuser] = useLoggedinuser();
  const email = user?.email;
  const userprofilepic = loggedinuser && loggedinuser[0]?.profileImage
    ? loggedinuser[0].profileImage
    : user && user.photoURL;

  const handleUploadImage = async (e) => {
    setIsLoading(true);
    const image = e.target.files[0];
    const formData = new FormData();
    formData.set("image", image);
    
    try {
      const res = await axios.post(
        "https://api.imgbb.com/1/upload?key=a95936edeefcd4b6ca81ba1151e17656",
        formData
      );
      setImageurl(res.data.data.display_url);
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUploadVideo = async (e) => {
    setIsLoading(true);
    const video = e.target.files[0];
    const formData = new FormData();
    formData.set("video", video);
    formData.set("title", "Video Title"); // Adjust this as needed
    formData.set("description", "Video Description");

    try {
      const res = await axios.post("http://localhost:5000/upload-video", formData);
      setVideourl(res.data.videoUrl);
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTweet = async (e, type) => {
    e.preventDefault();

    let name, username;
    if (user?.providerData[0]?.providerId === "password") {
      const response = await fetch(`http://localhost:5000/loggedinuser?email=${email}`);
      const data = await response.json();
      if (data && data.length > 0) {
        name = data[0]?.name;
        username = data[0]?.username;
      }
    } else {
      name = user?.displayName;
      username = email?.split("@")[0];
    }

    const userpost = {
      profilephoto: userprofilepic,
      post: post,
      photo: type === "image" ? imageurl : "",
      video: type === "video" ? videourl : "",
      username: username,
      name: name,
      email: email,
    };

    setPost("");
    setImageurl("");
    setVideourl("");

    fetch("http://localhost:5000/post", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(userpost),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  };

  return (
    <div className="tweetBox">
      
      <form onSubmit={(e) => handleTweet(e, "image")}>
        <div className="tweetBox__input">
          <Avatar
            src={
              loggedinuser && loggedinuser[0]?.profileImage
                ? loggedinuser[0].profileImage
                : user && user.photoURL
            }
          />
          <input
            type="text"
            placeholder="What's happening?"
            onChange={(e) => setPost(e.target.value)}
            value={post}
            required
          />
        </div>
        <div className="mediaIcon_tweetButton">
          <label htmlFor="image" className="mediaIcon">
            {isloading ? (
              <p>Uploading Image...</p>
            ) : (
              <p>
                {imageurl ? "Image Uploaded" : <AddPhotoAlternateOutlinedIcon />}
              </p>
            )}
          </label>
          <input
            type="file"
            id="image"
            className="mediaInput"
            onChange={handleUploadImage}
          />
          <Button className="tweetBox__tweetButton" type="submit">
            Tweet
          </Button>
        </div>
      </form>
      
      
      <form onSubmit={(e) => handleTweet(e, "video")}>
        <div className="tweetBox__input">
          <Avatar
            src={
              loggedinuser && loggedinuser[0]?.profileImage
                ? loggedinuser[0].profileImage
                : user && user.photoURL
            }
          />
          <input
            type="text"
            placeholder="What's happening?"
            onChange={(e) => setPost(e.target.value)}
            value={post}
            required
          />
        </div>
        <div className="mediaIcon_tweetButton">
          <label htmlFor="video" className="mediaIcon">
            {isloading ? (
              <p>Uploading Video...</p>
            ) : (
              <p>
                {videourl ? "Video Uploaded" : "Upload Video"}
              </p>
            )}
          </label>
          <input
            type="file"
            id="video"
            className="mediaInput"
            onChange={handleUploadVideo}
          />
          <Button className="tweetBox__tweetButton" type="submit">
            Tweet
          </Button>
        </div>
      </form>
    </div>
  );
};

export default TweetBox;*/


/*import React, { useState } from "react";
import "./Tweetbox.css";
import { Avatar, Button } from "@mui/material";
import AddPhotoAlternateOutlinedIcon from "@mui/icons-material/AddPhotoAlternateOutlined";
import { useUserAuth } from "../../../context/UserAuthContext";
import useLoggedinuser from "../../../hooks/useLoggedinuser";
import axios from "axios";

const TweetBox = () => {
  const [post, setPost] = useState("");
  const [imageurl, setImageurl] = useState("");
  const [videofile, setVideofile] = useState(null);
  const [isloading, setIsLoading] = useState(false);
  const { user } = useUserAuth();
  const [loggedinuser] = useLoggedinuser();
  const email = user?.email;
  const userprofilepic = loggedinuser && loggedinuser[0]?.profileImage
    ? loggedinuser[0].profileImage
    : user && user.photoURL;

  const handleUploadImage = async (e) => {
    setIsLoading(true);
    const image = e.target.files[0];
    const formData = new FormData();
    formData.set("image", image);
    
    try {
      const res = await axios.post(
        "https://api.imgbb.com/1/upload?key=a95936edeefcd4b6ca81ba1151e17656",
        formData
      );
      setImageurl(res.data.data.display_url);
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUploadVideo = (e) => {
    setVideofile(e.target.files[0]);
  };

  const handleTweet = async (e, type) => {
    e.preventDefault();

    let name, username;
    if (user?.providerData[0]?.providerId === "password") {
      const response = await fetch(`http://localhost:5000/loggedinuser?email=${email}`);
      const data = await response.json();
      if (data && data.length > 0) {
        name = data[0]?.name;
        username = data[0]?.username;
      }
    } else {
      name = user?.displayName;
      username = email?.split("@")[0];
    }

    if (type === "video" && videofile) {
      setIsLoading(true);
      const formData = new FormData();
      formData.set("video", videofile);
      formData.set("title", "Video Title"); // Adjust this as needed
      formData.set("description", "Video Description");

      try {
        const res = await axios.post("http://localhost:5000/upload-video", formData);
        const videourl = res.data.videoUrl;

        const userpost = {
          profilephoto: userprofilepic,
          post: post,
          photo: "",
          video: videourl,
          username: username,
          name: name,
          email: email,
        };

        fetch("http://localhost:5000/post", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(userpost),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
          });
      } catch (e) {
        console.log(e);
      } finally {
        setIsLoading(false);
      }
    } else {
      const userpost = {
        profilephoto: userprofilepic,
        post: post,
        photo: imageurl,
        video: "",
        username: username,
        name: name,
        email: email,
      };

      fetch("http://localhost:5000/post", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(userpost),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
        });
    }

    setPost("");
    setImageurl("");
    setVideofile(null);
  };

  return (
    <div className="tweetBox">
      
      <form onSubmit={(e) => handleTweet(e, "image")}>
        <div className="tweetBox__input">
          <Avatar
            src={
              loggedinuser && loggedinuser[0]?.profileImage
                ? loggedinuser[0].profileImage
                : user && user.photoURL
            }
          />
          <input
            type="text"
            placeholder="What's happening?"
            onChange={(e) => setPost(e.target.value)}
            value={post}
            required
          />
        </div>
        <div className="mediaIcon_tweetButton">
          <label htmlFor="image" className="mediaIcon">
            {isloading ? (
              <p>Uploading Image...</p>
            ) : (
              <p>
                {imageurl ? "Image Uploaded" : <AddPhotoAlternateOutlinedIcon />}
              </p>
            )}
          </label>
          <input
            type="file"
            id="image"
            className="mediaInput"
            onChange={handleUploadImage}
          />
          <Button className="tweetBox__tweetButton" type="submit">
            Tweet
          </Button>
        </div>
      </form>
      
     
      <form onSubmit={(e) => handleTweet(e, "video")}>
        <div className="tweetBox__input">
          <Avatar
            src={
              loggedinuser && loggedinuser[0]?.profileImage
                ? loggedinuser[0].profileImage
                : user && user.photoURL
            }
          />
          <input
            type="text"
            placeholder="What's happening?"
            onChange={(e) => setPost(e.target.value)}
            value={post}
            required
          />
        </div>
        <div className="mediaIcon_tweetButton">
          <label htmlFor="video" className="mediaIcon">
            {isloading ? (
              <p>Uploading Video...</p>
            ) : (
              <p>
                {videofile ? "Video Ready" : "Upload Video"} 
              </p>
            )}
          </label>
          <input
            type="file"
            id="video"
            className="mediaInput"
            onChange={handleUploadVideo}
          />
          <Button className="tweetBox__tweetButton" type="submit">
            Tweet
          </Button>
        </div>
      </form>
    </div>
  );
};

export default TweetBox;*/


/*import React, { useState } from "react";
import "./Tweetbox.css";
import { Avatar, Button } from "@mui/material";
import AddPhotoAlternateOutlinedIcon from "@mui/icons-material/AddPhotoAlternateOutlined";
import { useUserAuth } from "../../../context/UserAuthContext";
import useLoggedinuser from "../../../hooks/useLoggedinuser";
import axios from "axios";

const TweetBox = () => {
  const [imagePost, setImagePost] = useState("");
  const [videoPost, setVideoPost] = useState("");
  const [imageurl, setImageurl] = useState("");
  const [videofile, setVideofile] = useState(null);
  const [isloading, setIsLoading] = useState(false);
  const { user } = useUserAuth();
  const [loggedinuser] = useLoggedinuser();
  const email = user?.email;
  const userprofilepic = loggedinuser && loggedinuser[0]?.profileImage
    ? loggedinuser[0].profileImage
    : user && user.photoURL;

  const handleUploadImage = async (e) => {
    setIsLoading(true);
    const image = e.target.files[0];
    const formData = new FormData();
    formData.set("image", image);
    
    try {
      const res = await axios.post(
        "https://api.imgbb.com/1/upload?key=a95936edeefcd4b6ca81ba1151e17656",
        formData
      );
      setImageurl(res.data.data.display_url);
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUploadVideo = (e) => {
    setVideofile(e.target.files[0]);
  };

  const handleTweet = async (e, type) => {
    e.preventDefault();

    let name, username;
    if (user?.providerData[0]?.providerId === "password") {
      const response = await fetch(`http://localhost:5000/loggedinuser?email=${email}`);
      const data = await response.json();
      if (data && data.length > 0) {
        name = data[0]?.name;
        username = data[0]?.username;
      }
    } else {
      name = user?.displayName;
      username = email?.split("@")[0];
    }

    if (type === "video" && videofile) {
      setIsLoading(true);
      const formData = new FormData();
      formData.set("video", videofile);
      formData.set("title", "Video Title"); // Adjust this as needed
      formData.set("description", "Video Description");

      try {
        const res = await axios.post("http://localhost:5000/upload-video", formData);
        const videourl = res.data.videoUrl;

        const userpost = {
          profilephoto: userprofilepic,
          post: videoPost,
          photo: "",
          video: videourl,
          username: username,
          name: name,
          email: email,
        };

        fetch("http://localhost:5000/post", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(userpost),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
          });
      } catch (e) {
        console.log(e);
      } finally {
        setIsLoading(false);
      }
    } else {
      const userpost = {
        profilephoto: userprofilepic,
        post: imagePost,
        photo: imageurl,
        video: "",
        username: username,
        name: name,
        email: email,
      };

      fetch("http://localhost:5000/post", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(userpost),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
        });
    }

    setImagePost("");
    setVideoPost("");
    setImageurl("");
    setVideofile(null);
  };

  return (
    <div className="tweetBox">
      
      <form onSubmit={(e) => handleTweet(e, "image")}>
        <div className="tweetBox__input">
          <Avatar
            src={
              loggedinuser && loggedinuser[0]?.profileImage
                ? loggedinuser[0].profileImage
                : user && user.photoURL
            }
          />
          <input
            type="text"
            placeholder="What's happening?"
            onChange={(e) => setImagePost(e.target.value)}
            value={imagePost}
            required
          />
        </div>
        <div className="mediaIcon_tweetButton">
          <label htmlFor="image" className="mediaIcon">
            {isloading ? (
              <p>Uploading Image...</p>
            ) : (
              <p>
                {imageurl ? "Image Uploaded" : <AddPhotoAlternateOutlinedIcon />}
              </p>
            )}
          </label>
          <input
            type="file"
            id="image"
            className="mediaInput"
            onChange={handleUploadImage}
          />
          <Button className="tweetBox__tweetButton" type="submit">
            Tweet
          </Button>
        </div>
      </form>
      
     
      <form onSubmit={(e) => handleTweet(e, "video")}>
        <div className="tweetBox__input">
          <Avatar
            src={
              loggedinuser && loggedinuser[0]?.profileImage
                ? loggedinuser[0].profileImage
                : user && user.photoURL
            }
          />
          <input
            type="text"
            placeholder="What's happening?"
            onChange={(e) => setVideoPost(e.target.value)}
            value={videoPost}
            required
          />
        </div>
        <div className="mediaIcon_tweetButton">
          <label htmlFor="video" className="mediaIcon">
            {isloading ? (
              <p>Uploading Video...</p>
            ) : (
              <p>
                {videofile ? "Video Ready" : "Upload Video"}
              </p>
            )}
          </label>
          <input
            type="file"
            id="video"
            className="mediaInput"
            onChange={handleUploadVideo}
          />
          <Button className="tweetBox__tweetButton" type="submit">
            Tweet
          </Button>
        </div>
      </form>
    </div>
  );
};

export default TweetBox;*/



/*import React, { useState } from "react";
import "./Tweetbox.css";
import { Avatar, Button } from "@mui/material";
import AddPhotoAlternateOutlinedIcon from "@mui/icons-material/AddPhotoAlternateOutlined";
import { useUserAuth } from "../../../context/UserAuthContext";
import useLoggedinuser from "../../../hooks/useLoggedinuser";
import axios from "axios";

const TweetBox = () => {
  const [imagePost, setImagePost] = useState("");
  const [videoPost, setVideoPost] = useState("");
  const [imageurl, setImageurl] = useState("");
  const [videofile, setVideofile] = useState(null);
  const [isImageLoading, setIsImageLoading] = useState(false);
  const [isVideoLoading, setIsVideoLoading] = useState(false);
  const { user } = useUserAuth();
  const [loggedinuser] = useLoggedinuser();
  const email = user?.email;
  const userprofilepic = loggedinuser && loggedinuser[0]?.profileImage
    ? loggedinuser[0].profileImage
    : user && user.photoURL;

  const handleUploadImage = async (e) => {
    setIsImageLoading(true);
    const image = e.target.files[0];
    const formData = new FormData();
    formData.set("image", image);

    try {
      const res = await axios.post(
        "https://api.imgbb.com/1/upload?key=a95936edeefcd4b6ca81ba1151e17656",
        formData
      );
      setImageurl(res.data.data.display_url);
    } catch (e) {
      console.log(e);
    } finally {
      setIsImageLoading(false);
    }
  };

  const handleUploadVideo = (e) => {
    setVideofile(e.target.files[0]);
  };

  const handleTweet = async (e, type) => {
    e.preventDefault();

    let name, username;
    if (user?.providerData[0]?.providerId === "password") {
      const response = await fetch(`http://localhost:5000/loggedinuser?email=${email}`);
      const data = await response.json();
      if (data && data.length > 0) {
        name = data[0]?.name;
        username = data[0]?.username;
      }
    } else {
      name = user?.displayName;
      username = email?.split("@")[0];
    }

    if (type === "video" && videofile) {
      setIsVideoLoading(true);
      const formData = new FormData();
      formData.set("video", videofile);
      formData.set("title", "Video Title"); // Adjust this as needed
      formData.set("description", "Video Description");

      try {
        const res = await axios.post("http://localhost:5000/upload-video", formData);
        const videourl = res.data.videoUrl;

        const userpost = {
          profilephoto: userprofilepic,
          post: videoPost,
          photo: "",
          video: videourl,
          username: username,
          name: name,
          email: email,
        };

        fetch("http://localhost:5000/post", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(userpost),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
          });
      } catch (e) {
        console.log(e);
      } finally {
        setIsVideoLoading(false);
      }
    } else {
      const userpost = {
        profilephoto: userprofilepic,
        post: imagePost,
        photo: imageurl,
        video: "",
        username: username,
        name: name,
        email: email,
      };

      fetch("http://localhost:5000/post", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(userpost),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
        });
    }

    setImagePost("");
    setVideoPost("");
    setImageurl("");
    setVideofile(null);
  };

  return (
    <div className="tweetBox">
      <form onSubmit={(e) => handleTweet(e, "image")}>
        <div className="tweetBox__input">
          <Avatar
            src={
              loggedinuser && loggedinuser[0]?.profileImage
                ? loggedinuser[0].profileImage
                : user && user.photoURL
            }
          />
          <input
            type="text"
            placeholder="What's happening?"
            onChange={(e) => setImagePost(e.target.value)}
            value={imagePost}
            required
          />
        </div>
        <div className="mediaIcon_tweetButton">
          <label htmlFor="image" className="mediaIcon">
            {isImageLoading ? (
              <p>Uploading Image...</p>
            ) : (
              <p>
                {imageurl ? "Image Uploaded" : <AddPhotoAlternateOutlinedIcon />}
              </p>
            )}
          </label>
          <input
            type="file"
            id="image"
            className="mediaInput"
            onChange={handleUploadImage}
          />
          <Button className="tweetBox__tweetButton" type="submit">
            Tweet
          </Button>
        </div>
      </form>

      
      <form onSubmit={(e) => handleTweet(e, "video")}>
        <div className="tweetBox__input">
          <Avatar
            src={
              loggedinuser && loggedinuser[0]?.profileImage
                ? loggedinuser[0].profileImage
                : user && user.photoURL
            }
          />
          <input
            type="text"
            placeholder="What's happening?"
            onChange={(e) => setVideoPost(e.target.value)}
            value={videoPost}
            required
          />
        </div>
        <div className="mediaIcon_tweetButton">
          <label htmlFor="video" className="mediaIcon">
            {isVideoLoading ? (
              <p>Uploading Video...</p>
            ) : (
              <p>
                {videofile ? "Video Ready" : "Upload Video"} 
              </p>
            )}
          </label>
          <input
            type="file"
            id="video"
            className="mediaInput"
            onChange={handleUploadVideo}
          />
          <Button className="tweetBox__tweetButton" type="submit">
            Tweet
          </Button>
        </div>
      </form>
    </div>
  );
};

export default TweetBox;*/


import React, { useState } from "react";
import "./Tweetbox.css";
import { Avatar, Button } from "@mui/material";
import { useUserAuth } from "../../../context/UserAuthContext";
import useLoggedinuser from "../../../hooks/useLoggedinuser";
import axios from "axios";

const TweetBox = () => {
  const [imagePost, setImagePost] = useState("");
  const [videoPost, setVideoPost] = useState("");
  const [imageurl, setImageurl] = useState("");
  const [videofile, setVideofile] = useState(null);
  const [isImageLoading, setIsImageLoading] = useState(false);
  const [isVideoLoading, setIsVideoLoading] = useState(false);
  const { user } = useUserAuth();
  const [loggedinuser] = useLoggedinuser();
  const email = user?.email;
  const userprofilepic = loggedinuser && loggedinuser[0]?.profileImage
    ? loggedinuser[0].profileImage
    : user && user.photoURL;

  const handleUploadImage = async (e) => {
    setIsImageLoading(true);
    const image = e.target.files[0];
    const formData = new FormData();
    formData.set("image", image);

    try {
      const res = await axios.post(
        "https://api.imgbb.com/1/upload?key=a95936edeefcd4b6ca81ba1151e17656",
        formData
      );
      setImageurl(res.data.data.display_url);
    } catch (e) {
      console.log(e);
    } finally {
      setIsImageLoading(false);
    }
  };

  const handleUploadVideo = (e) => {
    setVideofile(e.target.files[0]);
  };

  const handleTweet = async (e, type) => {
    e.preventDefault();

    let name, username;
    if (user?.providerData[0]?.providerId === "password") {
      const response = await fetch(`http://localhost:5000/loggedinuser?email=${email}`);
      const data = await response.json();
      if (data && data.length > 0) {
        name = data[0]?.name;
        username = data[0]?.username;
      }
    } else {
      name = user?.displayName;
      username = email?.split("@")[0];
    }

    if (type === "video" && videofile) {
      setIsVideoLoading(true);
      const formData = new FormData();
      formData.set("video", videofile);
      formData.set("title", "Video Title"); // Adjust this as needed
      formData.set("description", "Video Description");

      try {
        const res = await axios.post("http://localhost:5000/upload-video", formData);
        const videourl = res.data.videoUrl;

        const userpost = {
          profilephoto: userprofilepic,
          post: videoPost,
          photo: "",
          video: videourl,
          username: username,
          name: name,
          email: email,
        };

        fetch("http://localhost:5000/post", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(userpost),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
          });
      } catch (e) {
        console.log(e);
      } finally {
        setIsVideoLoading(false);
      }
    } else {
      const userpost = {
        profilephoto: userprofilepic,
        post: imagePost,
        photo: imageurl,
        video: "",
        username: username,
        name: name,
        email: email,
      };

      fetch("http://localhost:5000/post", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(userpost),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
        });
    }

    setImagePost("");
    setVideoPost("");
    setImageurl("");
    setVideofile(null);
  };

  return (
    <div className="tweetBox">
      {/* Section for Text and Image Tweets */}
      <form onSubmit={(e) => handleTweet(e, "image")}>
        <div className="tweetBox__input">
          <Avatar
            src={
              loggedinuser && loggedinuser[0]?.profileImage
                ? loggedinuser[0].profileImage
                : user && user.photoURL
            }
          />
          <input
            type="text"
            placeholder="What's happening?"
            onChange={(e) => setImagePost(e.target.value)}
            value={imagePost}
            required
          />
        </div>
        <div className="mediaIcon_tweetButton">
          {isImageLoading ? (
            <p>Uploading Image...</p>
          ) : (
            <p>{imageurl ? "Image Uploaded" : "Upload Image"}</p>
          )}
          <input
            type="file"
            id="image"
            className="mediaInput"
            onChange={handleUploadImage}
          />
          <Button className="tweetBox__tweetButton" type="submit">
            Tweet
          </Button>
        </div>
      </form>

      {/* Section for Text and Video Tweets */}
      <form onSubmit={(e) => handleTweet(e, "video")}>
        <div className="tweetBox__input">
          <Avatar
            src={
              loggedinuser && loggedinuser[0]?.profileImage
                ? loggedinuser[0].profileImage
                : user && user.photoURL
            }
          />
          <input
            type="text"
            placeholder="What's happening?"
            onChange={(e) => setVideoPost(e.target.value)}
            value={videoPost}
            required
          />
        </div>
        <div className="mediaIcon_tweetButton">
          {isVideoLoading ? (
            <p>Uploading Video...</p>
          ) : (
            <p>{videofile ? "Video Ready" : "Upload Video"}</p>
          )}
          <input
            type="file"
            id="video"
            className="mediaInput"
            onChange={handleUploadVideo}
          />
          <Button className="tweetBox__tweetButton" type="submit">
            Tweet
          </Button>
        </div>
      </form>
    </div>
  );
};

export default TweetBox;















