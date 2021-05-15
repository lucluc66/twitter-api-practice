var Twitter = require("twitter");
const express = require("express");
const server = express();
server.use(express.json());

var client = new Twitter({
  consumer_key: "gfRJUo7DGkCFUp9kzg0zBpxGn",
  consumer_secret: "SgEHfj77SyxXvfw9vNFcApx0aQ4hnZcXMNtYx1LT8pLAEovUnB",
  bearer_token:
    "AAAAAAAAAAAAAAAAAAAAALqGOQEAAAAANCh6bInLZS5i1eS%2Bn1jC7P1wECA%3DAUcHndcu9OAIKdQcltPUfT6R44ZZ4pzOIZy0L0J2tHDrhwWQPz",
  //   access_token_key: '',
  //   access_token_secret: ''
});

server.get("/api/twitter/:XXX", function (req, res) {
  let XXX = req.params.XXX;
  var params = { q: XXX, count: 50, lang: 'en'};
  let eq = '';
  client.get("search/tweets", params, function (error, tweets, response) {
    if (!error) {
      // console.log(tweets);
      let statuses = tweets.statuses;
      for (let i = 0; i < 50; i++) {
        // console.log(i + ': ' + statuses[i].text);
        eq = eq + i + ': ' + statuses[i].text + '</br>';
      }
      // console.log(eq);
      res.send(eq);
    } else {
      console.log("Something went wrong!");
    }
  });
  // console.log(eq);
  // res.send(eq);
});

server.listen(5000, () => {
  console.log("Connected to port 5000!");
});
