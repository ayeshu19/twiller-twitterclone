


/*const { MongoClient, ServerApiVersion } = require("mongodb");
const express = require("express");
const cors = require("cors");

const uri = "mongodb+srv://admin1:admin1@twiller.anvkg.mongodb.net/?retryWrites=true&w=majority&appName=twiller";
const port = 5000;

const app = express();
app.use(cors());
app.use(express.json());

const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();

    const postcollection = client.db("database").collection("posts");
    const usercollection = client.db("database").collection("users");

    app.post("/register", async (req, res) => {
      const user = req.body;
      const result = await usercollection.insertOne(user);
      res.send(result);
    });

    app.get("/loggedinuser", async (req, res) => {
      const email = req.query.email;
      const user = await usercollection.find({ email: email }).toArray();
      res.send(user);
    });

    app.post("/post", async (req, res) => {
      const post = req.body;
      const result = await postcollection.insertOne(post);
      res.send(result);
    });

    app.get("/post", async (req, res) => {
      const post = (await postcollection.find().toArray()).reverse();
      res.send(post);
    });

    app.get("/userpost", async (req, res) => {
      const email = req.query.email;
      const post = (await postcollection.find({ email: email }).toArray()).reverse();
      res.send(post);
    });

    app.get("/user", async (req, res) => {
      const user = await usercollection.find().toArray();
      res.send(user);
    });

    app.patch("/userupdate/:email", async (req, res) => {
      const filter = req.params;
      const profile = req.body;
      const options = { upsert: true };
      const updateDoc = { $set: profile };
      const result = await usercollection.updateOne(filter, updateDoc, options);
      res.send(result);
    });

    // New endpoint to fetch posts based on a specific topic
    app.get("/api/tweets", async (req, res) => {
      const topic = req.query.topic.toLowerCase();
      console.log(`Fetching posts for topic: ${topic}`); // Debugging log
      try {
        const posts = await postcollection.find({ post: { $regex: topic, $options: 'i' } }).toArray();
        console.log(`Found ${posts.length} posts`); // Debugging log
        res.json(posts);
      } catch (error) {
        console.error('Error fetching posts', error); // Debugging log
        res.status(500).send(error);
      }
    });

  } catch (error) {
    console.log(error);
  }
}

run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Twiller is working");
});

app.listen(port, () => {
  console.log(`Twiller clone is working on ${port}`);
});*/




/*const { MongoClient, ServerApiVersion } = require("mongodb");
const express = require("express");
const cors = require("cors");
const multer = require("multer");
const vimeoClient = require('./vimeoClient'); // Rename the Vimeo client import
const fs = require("fs");

const uri = "mongodb+srv://admin1:admin1@twiller.anvkg.mongodb.net/?retryWrites=true&w=majority&appName=twiller";
const port = 5000;

const app = express();
app.use(cors());
app.use(express.json());

const upload = multer({ dest: 'uploads/' }); // Set up multer for file uploads

const mongoClient = new MongoClient(uri); // Rename the MongoDB client

async function run() {
  try {
    await mongoClient.connect();

    const postcollection = mongoClient.db("database").collection("posts");
    const usercollection = mongoClient.db("database").collection("users");

    app.post("/register", async (req, res) => {
      const user = req.body;
      const result = await usercollection.insertOne(user);
      res.send(result);
    });

    app.get("/loggedinuser", async (req, res) => {
      const email = req.query.email;
      const user = await usercollection.find({ email: email }).toArray();
      res.send(user);
    });

    app.post("/post", async (req, res) => {
      const post = req.body;
      const result = await postcollection.insertOne(post);
      res.send(result);
    });

    app.get("/post", async (req, res) => {
      const post = (await postcollection.find().toArray()).reverse();
      res.send(post);
    });

    app.get("/userpost", async (req, res) => {
      const email = req.query.email;
      const post = (await postcollection.find({ email: email }).toArray()).reverse();
      res.send(post);
    });

    app.get("/user", async (req, res) => {
      const user = await usercollection.find().toArray();
      res.send(user);
    });

    app.patch("/userupdate/:email", async (req, res) => {
      const filter = req.params;
      const profile = req.body;
      const options = { upsert: true };
      const updateDoc = { $set: profile };
      const result = await usercollection.updateOne(filter, updateDoc, options);
      res.send(result);
    });

    // Endpoint to fetch posts based on a specific topic
    app.get("/api/tweets", async (req, res) => {
      const topic = req.query.topic.toLowerCase();
      console.log(`Fetching posts for topic: ${topic}`); // Debugging log
      try {
        const posts = await postcollection.find({ post: { $regex: topic, $options: 'i' } }).toArray();
        console.log(`Found ${posts.length} posts`); // Debugging log
        res.json(posts);
      } catch (error) {
        console.error('Error fetching posts', error); // Debugging log
        res.status(500).send(error);
      }
    });

    // New endpoint to upload video
    app.post('/upload-video', upload.single('video'), (req, res) => {
      const videoPath = req.file.path;
      vimeoClient.upload(
        videoPath,
        { name: req.body.title, description: req.body.description },
        function (uri) {
          const videoID = uri.split('/').pop();
          const newPost = {
            profilephoto: req.body.profilephoto,
            post: req.body.post,
            photo: req.body.photo,
            username: req.body.username,
            name: req.body.name,
            email: req.body.email,
            video: videoID, // Storing video ID from Vimeo
          };
          postcollection.insertOne(newPost)
            .then(result => {
              fs.unlinkSync(videoPath); // Remove file from server after upload
              res.json(result);
            })
            .catch(error => {
              console.error(error);
              res.status(500).send(error);
            });
        },
        function (bytes_uploaded, bytes_total) {
          const percentage = (bytes_uploaded / bytes_total) * 100;
          console.log(`${percentage}% uploaded`);
        },
        function (error) {
          console.error('Failed because: ' + error);
          res.status(500).send(error);
        }
      );
    });

  } catch (error) {
    console.error(error);
  }
}

run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Twiller is working");
});

app.listen(port, () => {
  console.log(`Twiller clone is working on ${port}`);
});*/


/*const { MongoClient, ServerApiVersion } = require("mongodb");
const express = require("express");
const cors = require("cors");
const multer = require("multer");
const vimeoClient = require('./vimeoClient'); // Importing Vimeo client
const fs = require("fs");

const uri = "mongodb+srv://admin1:admin1@twiller.anvkg.mongodb.net/?retryWrites=true&w=majority&appName=twiller";
const port = 5000;

const app = express();
app.use(cors());
app.use(express.json());

const upload = multer({ dest: 'uploads/' }); // Setting up multer for file uploads

const mongoClient = new MongoClient(uri); // MongoDB client

async function run() {
  try {
    await mongoClient.connect();

    const postcollection = mongoClient.db("database").collection("posts");
    const usercollection = mongoClient.db("database").collection("users");

    app.post("/register", async (req, res) => {
      const user = req.body;
      const result = await usercollection.insertOne(user);
      res.send(result);
    });

    app.get("/loggedinuser", async (req, res) => {
      const email = req.query.email;
      const user = await usercollection.find({ email: email }).toArray();
      res.send(user);
    });

    app.post("/post", async (req, res) => {
      const post = req.body;
      const result = await postcollection.insertOne(post);
      res.send(result);
    });

    app.get("/post", async (req, res) => {
      const post = (await postcollection.find().toArray()).reverse();
      res.send(post);
    });

    app.get("/userpost", async (req, res) => {
      const email = req.query.email;
      const post = (await postcollection.find({ email: email }).toArray()).reverse();
      res.send(post);
    });

    app.get("/user", async (req, res) => {
      const user = await usercollection.find().toArray();
      res.send(user);
    });

    app.patch("/userupdate/:email", async (req, res) => {
      const filter = req.params;
      const profile = req.body;
      const options = { upsert: true };
      const updateDoc = { $set: profile };
      const result = await usercollection.updateOne(filter, updateDoc, options);
      res.send(result);
    });

    // Endpoint to fetch posts based on a specific topic
    app.get("/api/tweets", async (req, res) => {
      const topic = req.query.topic.toLowerCase();
      console.log(`Fetching posts for topic: ${topic}`); // Debugging log
      try {
        const posts = await postcollection.find({ post: { $regex: topic, $options: 'i' } }).toArray();
        console.log(`Found ${posts.length} posts`); // Debugging log
        res.json(posts);
      } catch (error) {
        console.error('Error fetching posts', error); // Debugging log
        res.status(500).send(error);
      }
    });

    // Endpoint to upload video
    app.post('/upload-video', upload.single('video'), (req, res) => {
      const videoPath = req.file.path;
      console.log('Received video upload request:', req.file); // Log the file
      console.log('Request body:', req.body); // Log the request body for debugging

      vimeoClient.upload(
        videoPath,
        { name: req.body.title, description: req.body.description },
        function (uri) {
          const videoURL = `https://player.vimeo.com/video/${uri.split('/').pop()}`;
          const newPost = {
            profilephoto: req.body.profilephoto,
            post: req.body.post,
            photo: req.body.photo,
            username: req.body.username,
            name: req.body.name,
            email: req.body.email,
            video: videoURL, // Storing full video URL from Vimeo
          };

          console.log('Inserting post into MongoDB:', newPost); // Log the post data
          postcollection.insertOne(newPost)
            .then(result => {
              console.log('Post inserted into MongoDB:', result); // Log insertion result
              fs.unlinkSync(videoPath); // Remove file from server after upload
              res.json(result);
            })
            .catch(error => {
              console.error('MongoDB insertion failed:', error); // Log error
              res.status(500).send(error);
            });
        },
        function (bytes_uploaded, bytes_total) {
          const percentage = (bytes_uploaded / bytes_total) * 100;
          console.log(`${percentage}% uploaded`); // Log upload progress
        },
        function (error) {
          console.error('Vimeo upload failed:', error); // Log error
          res.status(500).send(error);
        }
      );
    });

  } catch (error) {
    console.error(error);
  }
}

run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Twiller is working");
});

app.listen(port, () => {
  console.log(`Twiller clone is working on ${port}`);
});*/


/*const { MongoClient, ServerApiVersion } = require("mongodb");
const express = require("express");
const cors = require("cors");
const multer = require("multer");
const vimeoClient = require('./vimeoClient'); // Importing Vimeo client
const fs = require("fs");

const uri = "mongodb+srv://admin1:admin1@twiller.anvkg.mongodb.net/?retryWrites=true&w=majority&appName=twiller";
const port = 5000;

const app = express();
app.use(cors());
app.use(express.json());

const upload = multer({ dest: 'uploads/' }); // Setting up multer for file uploads

const mongoClient = new MongoClient(uri); // MongoDB client

async function run() {
  try {
    await mongoClient.connect();

    const postcollection = mongoClient.db("database").collection("posts");
    const usercollection = mongoClient.db("database").collection("users");

    app.post("/register", async (req, res) => {
      const user = req.body;
      const result = await usercollection.insertOne(user);
      res.send(result);
    });

    app.get("/loggedinuser", async (req, res) => {
      const email = req.query.email;
      const user = await usercollection.find({ email: email }).toArray();
      res.send(user);
    });

    app.post("/post", async (req, res) => {
      const post = req.body;
      const result = await postcollection.insertOne(post);
      res.send(result);
    });

    app.get("/post", async (req, res) => {
      const post = (await postcollection.find().toArray()).reverse();
      res.send(post);
    });

    app.get("/userpost", async (req, res) => {
      const email = req.query.email;
      const post = (await postcollection.find({ email: email }).toArray()).reverse();
      res.send(post);
    });

    app.get("/user", async (req, res) => {
      const user = await usercollection.find().toArray();
      res.send(user);
    });

    app.patch("/userupdate/:email", async (req, res) => {
      const filter = req.params;
      const profile = req.body;
      const options = { upsert: true };
      const updateDoc = { $set: profile };
      const result = await usercollection.updateOne(filter, updateDoc, options);
      res.send(result);
    });

    // Endpoint to fetch posts based on a specific topic
    app.get("/api/tweets", async (req, res) => {
      const topic = req.query.topic.toLowerCase();
      console.log(`Fetching posts for topic: ${topic}`); // Debugging log
      try {
        const posts = await postcollection.find({ post: { $regex: topic, $options: 'i' } }).toArray();
        console.log(`Found ${posts.length} posts`); // Debugging log
        res.json(posts);
      } catch (error) {
        console.error('Error fetching posts', error); // Debugging log
        res.status(500).send(error);
      }
    });

    // Endpoint to upload video with retry logic
    app.post('/upload-video', upload.single('video'), (req, res) => {
      const videoPath = req.file.path;
      console.log('Received video upload request:', req.file); // Log the file
      console.log('Request body:', req.body); // Log the request body for debugging

      const uploadVideoToVimeo = (retries = 3) => {
        vimeoClient.upload(
          videoPath,
          { name: req.body.title, description: req.body.description },
          function (uri) {
            const videoURL = `https://player.vimeo.com/video/${uri.split('/').pop()}`;
            const newPost = {
              profilephoto: req.body.profilephoto,
              post: req.body.post,
              photo: req.body.photo,
              username: req.body.username,
              name: req.body.name,
              email: req.body.email,
              video: videoURL, // Storing full video URL from Vimeo
            };

            console.log('Inserting post into MongoDB:', newPost); // Log the post data
            postcollection.insertOne(newPost)
              .then(result => {
                console.log('Post inserted into MongoDB:', result); // Log insertion result
                fs.unlinkSync(videoPath); // Remove file from server after upload
                res.json(result);
              })
              .catch(error => {
                console.error('MongoDB insertion failed:', error); // Log error
                res.status(500).send(error);
              });
          },
          function (bytes_uploaded, bytes_total) {
            const percentage = (bytes_uploaded / bytes_total) * 100;
            console.log(`${percentage}% uploaded`); // Log upload progress
          },
          function (error) {
            console.error('Vimeo upload failed:', error); // Log error
            if (retries > 0) {
              console.log(`Retrying upload... (${3 - retries + 1} of 3)`);
              uploadVideoToVimeo(retries - 1); // Retry upload
            } else {
              res.status(500).send(error);
            }
          }
        );
      };

      uploadVideoToVimeo(); // Start the upload process with retries
    });

  } catch (error) {
    console.error(error);
  }
}

run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Twiller is working");
});

app.listen(port, () => {
  console.log(`Twiller clone is working on ${port}`);
});*/


/*const { MongoClient, ServerApiVersion } = require("mongodb");
const express = require("express");
const cors = require("cors");
const multer = require("multer");
const vimeoClient = require('./vimeoClient'); // Importing Vimeo client
const fs = require("fs");

const uri = "mongodb+srv://admin1:admin1@twiller.anvkg.mongodb.net/?retryWrites=true&w=majority&appName=twiller";
const port = 5000;

const app = express();
app.use(cors());
app.use(express.json());

const upload = multer({ dest: 'uploads/' }); // Setting up multer for file uploads

const mongoClient = new MongoClient(uri); // MongoDB client

async function run() {
  try {
    await mongoClient.connect();

    const postcollection = mongoClient.db("database").collection("posts");
    const usercollection = mongoClient.db("database").collection("users");

    app.post("/register", async (req, res) => {
      const user = req.body;
      const result = await usercollection.insertOne(user);
      res.send(result);
    });

    app.get("/loggedinuser", async (req, res) => {
      const email = req.query.email;
      const user = await usercollection.find({ email: email }).toArray();
      res.send(user);
    });

    app.post("/post", async (req, res) => {
      const post = req.body;
      const result = await postcollection.insertOne(post);
      res.send(result);
    });

    app.get("/post", async (req, res) => {
      const post = (await postcollection.find().toArray()).reverse();
      res.send(post);
    });

    app.get("/userpost", async (req, res) => {
      const email = req.query.email;
      const post = (await postcollection.find({ email: email }).toArray()).reverse();
      res.send(post);
    });

    app.get("/user", async (req, res) => {
      const user = await usercollection.find().toArray();
      res.send(user);
    });

    app.patch("/userupdate/:email", async (req, res) => {
      const filter = req.params;
      const profile = req.body;
      const options = { upsert: true };
      const updateDoc = { $set: profile };
      const result = await usercollection.updateOne(filter, updateDoc, options);
      res.send(result);
    });

    // Endpoint to fetch posts based on a specific topic
    app.get("/api/tweets", async (req, res) => {
      const topic = req.query.topic.toLowerCase();
      console.log(`Fetching posts for topic: ${topic}`); // Debugging log
      try {
        const posts = await postcollection.find({ post: { $regex: topic, $options: 'i' } }).toArray();
        console.log(`Found ${posts.length} posts`); // Debugging log
        res.json(posts);
      } catch (error) {
        console.error('Error fetching posts', error); // Debugging log
        res.status(500).send(error);
      }
    });

    // Endpoint to upload video with retry logic
    app.post('/upload-video', upload.single('video'), (req, res) => {
      const videoPath = req.file.path;
      console.log('Received video upload request:', req.file); // Log the file
      console.log('Request body:', req.body); // Log the request body for debugging

      const uploadVideoToVimeo = (retries = 3) => {
        vimeoClient.upload(
          videoPath,
          { name: req.body.title, description: req.body.description },
          function (uri) {
            const videoURL = `https://player.vimeo.com/video/${uri.split('/').pop()}`;
            const newPost = {
              profilephoto: req.body.profilephoto,
              post: req.body.post,
              photo: req.body.photo,
              username: req.body.username,
              name: req.body.name,
              email: req.body.email,
              video: videoURL, // Storing full video URL from Vimeo
            };

            console.log('Inserting post into MongoDB:', newPost); // Log the post data
            postcollection.insertOne(newPost)
              .then(result => {
                console.log('Post inserted into MongoDB:', result); // Log insertion result
                fs.unlinkSync(videoPath); // Remove file from server after upload
                res.json(result);
              })
              .catch(error => {
                console.error('MongoDB insertion failed:', error); // Log error
                res.status(500).send(error);
              });
          },
          function (bytes_uploaded, bytes_total) {
            const percentage = (bytes_uploaded / bytes_total) * 100;
            console.log(`${percentage}% uploaded`); // Log upload progress
          },
          function (error) {
            console.error('Vimeo upload failed:', error); // Log error
            if (retries > 0) {
              console.log(`Retrying upload... (${3 - retries + 1} of 3)`);
              uploadVideoToVimeo(retries - 1); // Retry upload
            } else {
              res.status(500).send(error);
            }
          }
        );
      };

      uploadVideoToVimeo(); // Start the upload process with retries
    });

    // Endpoint to upload image
    app.post('/upload-image', upload.single('image'), (req, res) => {
      console.log('Received image upload request:', req.file); // Log the file
      console.log('Request body:', req.body); // Log the request body for debugging

      const imageURL = req.body.imageURL; // Assuming the image URL is provided in the request body

      const newPost = {
        profilephoto: req.body.profilephoto,
        post: req.body.post,
        photo: imageURL, // Storing image URL
        username: req.body.username,
        name: req.body.name,
        email: req.body.email,
      };

      console.log('Inserting post into MongoDB:', newPost); // Log the post data
      postcollection.insertOne(newPost)
        .then(result => {
          console.log('Post inserted into MongoDB:', result); // Log insertion result
          res.json(result);
        })
        .catch(error => {
          console.error('MongoDB insertion failed:', error); // Log error
          res.status(500).send(error);
        });
    });

  } catch (error) {
    console.error(error);
  }
}

run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Twiller is working");
});

app.listen(port, () => {
  console.log(`Twiller clone is working on ${port}`);
});*/



/*const { MongoClient, ServerApiVersion } = require("mongodb");
const express = require("express");
const cors = require("cors");
const multer = require("multer");
const vimeoClient = require('./vimeoClient'); // Importing Vimeo client
const fs = require("fs");

const uri = "mongodb+srv://admin1:admin1@twiller.anvkg.mongodb.net/?retryWrites=true&w=majority&appName=twiller";
const port = 5000;

const app = express();
app.use(cors());
app.use(express.json());

const upload = multer({ dest: 'uploads/' }); // Setting up multer for file uploads

const mongoClient = new MongoClient(uri); // MongoDB client

async function run() {
  try {
    await mongoClient.connect();

    const postcollection = mongoClient.db("database").collection("posts");
    const usercollection = mongoClient.db("database").collection("users");

    app.post("/register", async (req, res) => {
      const user = req.body;
      const result = await usercollection.insertOne(user);
      res.send(result);
    });

    app.get("/loggedinuser", async (req, res) => {
      const email = req.query.email;
      const user = await usercollection.find({ email: email }).toArray();
      res.send(user);
    });

    app.post("/post", async (req, res) => {
      const post = req.body;
      const result = await postcollection.insertOne(post);
      res.send(result);
    });

    app.get("/post", async (req, res) => {
      const post = (await postcollection.find().toArray()).reverse();
      res.send(post);
    });

    app.get("/userpost", async (req, res) => {
      const email = req.query.email;
      const post = (await postcollection.find({ email: email }).toArray()).reverse();
      res.send(post);
    });

    app.get("/user", async (req, res) => {
      const user = await usercollection.find().toArray();
      res.send(user);
    });

    app.patch("/userupdate/:email", async (req, res) => {
      const filter = req.params;
      const profile = req.body;
      const options = { upsert: true };
      const updateDoc = { $set: profile };
      const result = await usercollection.updateOne(filter, updateDoc, options);
      res.send(result);
    });

    // Endpoint to fetch posts based on a specific topic
    app.get("/api/tweets", async (req, res) => {
      const topic = req.query.topic.toLowerCase();
      console.log(`Fetching posts for topic: ${topic}`); // Debugging log
      try {
        const posts = await postcollection.find({ post: { $regex: topic, $options: 'i' } }).toArray();
        console.log(`Found ${posts.length} posts`); // Debugging log
        res.json(posts);
      } catch (error) {
        console.error('Error fetching posts', error); // Debugging log
        res.status(500).send(error);
      }
    });

    // Endpoint to upload video with retry logic
    app.post('/upload-video', upload.single('video'), (req, res) => {
      const videoPath = req.file.path;
      console.log('Received video upload request:', req.file); // Log the file
      console.log('Request body:', req.body); // Log the request body for debugging

      const uploadVideoToVimeo = (retries = 3) => {
        vimeoClient.upload(
          videoPath,
          { name: req.body.title, description: req.body.description },
          function (uri) {
            const videoURL = `https://player.vimeo.com/video/${uri.split('/').pop()}`;
            const newPost = {
              profilephoto: req.body.profilephoto,
              post: req.body.post,
              photo: req.body.photo,
              username: req.body.username,
              name: req.body.name,
              email: req.body.email,
              video: videoURL, // Storing full video URL from Vimeo
            };

            console.log('Inserting post into MongoDB:', newPost); // Log the post data
            postcollection.insertOne(newPost)
              .then(result => {
                console.log('Post inserted into MongoDB:', result); // Log insertion result
                fs.unlinkSync(videoPath); // Remove file from server after upload
                res.json(newPost); // Return the new post data to the client
              })
              .catch(error => {
                console.error('MongoDB insertion failed:', error); // Log error
                res.status(500).send(error);
              });
          },
          function (bytes_uploaded, bytes_total) {
            const percentage = (bytes_uploaded / bytes_total) * 100;
            console.log(`${percentage}% uploaded`); // Log upload progress
          },
          function (error) {
            console.error('Vimeo upload failed:', error); // Log error
            if (retries > 0) {
              console.log(`Retrying upload... (${3 - retries + 1} of 3)`);
              uploadVideoToVimeo(retries - 1); // Retry upload
            } else {
              res.status(500).send(error);
            }
          }
        );
      };

      uploadVideoToVimeo(); // Start the upload process with retries
    });

    // Endpoint to upload image
    app.post('/upload-image', (req, res) => {
      console.log('Received image upload request:', req.body); // Log the request body for debugging

      const newPost = {
        profilephoto: req.body.profilephoto,
        post: req.body.post,
        photo: req.body.photo, // Storing image URL sent from frontend
        username: req.body.username,
        name: req.body.name,
        email: req.body.email,
      };

      console.log('Inserting post into MongoDB:', newPost); // Log the post data
      postcollection.insertOne(newPost)
        .then(result => {
          console.log('Post inserted into MongoDB:', result); // Log insertion result
          res.json(newPost); // Return the new post data to the client
        })
        .catch(error => {
          console.error('MongoDB insertion failed:', error); // Log error
          res.status(500).send(error);
        });
    });

  } catch (error) {
    console.error(error);
  }
}

run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Twiller is working");
});

app.listen(port, () => {
  console.log(`Twiller clone is working on ${port}`);
});*/



const { MongoClient, ServerApiVersion } = require("mongodb");
const express = require("express");
const cors = require("cors");
const multer = require("multer");
const vimeoClient = require('./vimeoClient'); // Importing Vimeo client
const fs = require("fs");

const uri = "mongodb+srv://admin1:admin1@twiller.anvkg.mongodb.net/?retryWrites=true&w=majority&appName=twiller";
const port = 5000;

const app = express();
app.use(cors());
app.use(express.json());

const upload = multer({ dest: 'uploads/' }); // Setting up multer for file uploads

const mongoClient = new MongoClient(uri); // MongoDB client

async function run() {
  try {
    await mongoClient.connect();

    const postcollection = mongoClient.db("database").collection("posts");
    const usercollection = mongoClient.db("database").collection("users");

    app.post("/register", async (req, res) => {
      const user = req.body;
      const result = await usercollection.insertOne(user);
      res.send(result);
    });

    app.get("/loggedinuser", async (req, res) => {
      const email = req.query.email;
      const user = await usercollection.find({ email: email }).toArray();
      res.send(user);
    });

    app.post("/post", async (req, res) => {
      const post = req.body;
      const result = await postcollection.insertOne(post);
      res.send(result);
    });

    app.get("/post", async (req, res) => {
      const post = (await postcollection.find().toArray()).reverse();
      res.send(post);
    });

    app.get("/userpost", async (req, res) => {
      const email = req.query.email;
      const post = (await postcollection.find({ email: email }).toArray()).reverse();
      res.send(post);
    });

    app.get("/user", async (req, res) => {
      const user = await usercollection.find().toArray();
      res.send(user);
    });

    app.patch("/userupdate/:email", async (req, res) => {
      const filter = req.params;
      const profile = req.body;
      const options = { upsert: true };
      const updateDoc = { $set: profile };
      const result = await usercollection.updateOne(filter, updateDoc, options);
      res.send(result);
    });

    // Endpoint to fetch posts based on a specific topic
    app.get("/api/tweets", async (req, res) => {
      const topic = req.query.topic.toLowerCase();
      console.log(`Fetching posts for topic: ${topic}`); // Debugging log
      try {
        const posts = await postcollection.find({ post: { $regex: topic, $options: 'i' } }).toArray();
        console.log(`Found ${posts.length} posts`); // Debugging log
        res.json(posts);
      } catch (error) {
        console.error('Error fetching posts', error); // Debugging log
        res.status(500).send(error);
      }
    });

    // Endpoint to upload video with retry logic
    app.post('/upload-video', upload.single('video'), (req, res) => {
      const videoPath = req.file.path;
      console.log('Received video upload request:', req.file); // Log the file
      console.log('Request body:', req.body); // Log the request body for debugging

      const uploadVideoToVimeo = (retries = 3) => {
        vimeoClient.upload(
          videoPath,
          { name: req.body.title, description: req.body.description },
          function (uri) {
            const videoURL = `https://player.vimeo.com/video/${uri.split('/').pop()}`;
            console.log('Video URL:', videoURL); // Log video URL
            fs.unlinkSync(videoPath); // Remove file from server after upload
            res.json({ videoUrl: videoURL }); // Return the video URL to the client
          },
          function (bytes_uploaded, bytes_total) {
            const percentage = (bytes_uploaded / bytes_total) * 100;
            console.log(`${percentage}% uploaded`); // Log upload progress
          },
          function (error) {
            console.error('Vimeo upload failed:', error); // Log error
            if (retries > 0) {
              console.log(`Retrying upload... (${3 - retries + 1} of 3)`);
              uploadVideoToVimeo(retries - 1); // Retry upload
            } else {
              res.status(500).send(error);
            }
          }
        );
      };

      uploadVideoToVimeo(); // Start the upload process with retries
    });

    // Endpoint to upload image
    app.post('/upload-image', (req, res) => {
      console.log('Received image upload request:', req.body); // Log the request body for debugging

      const newPost = {
        profilephoto: req.body.profilephoto,
        post: req.body.post,
        photo: req.body.photo, // Storing image URL sent from frontend
        username: req.body.username,
        name: req.body.name,
        email: req.body.email,
      };

      console.log('Inserting post into MongoDB:', newPost); // Log the post data
      postcollection.insertOne(newPost)
        .then(result => {
          console.log('Post inserted into MongoDB:', result); // Log insertion result
          res.json(newPost); // Return the new post data to the client
        })
        .catch(error => {
          console.error('MongoDB insertion failed:', error); // Log error
          res.status(500).send(error);
        });
    });

  } catch (error) {
    console.error(error);
  }
}

run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Twiller is working");
});

app.listen(port, () => {
  console.log(`Twiller clone is working on ${port}`);
});













