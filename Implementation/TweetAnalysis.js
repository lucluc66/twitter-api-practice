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

function monthsDiff(d2) {
  let date1 = new Date();
  let date2 = new Date(d2);
  let years = date1.getFullYear() - date2.getFullYear();
  let months = years * 12 + ((date1.getMonth() + 1) - (date2.getMonth() + 1));
//   console.log(months);
//   console.log(years)
//   console.log(years * 12);
//   console.log((date1.getMonth() + 1) - (date2.getMonth() + 1));
  return months;
}

server.get("/analysis", function (req, res) {
  let search = req.body.search;
  var params = { q: search, count: 100 };
//   let eq = [];
  client.get("search/tweets", params, function (error, tweets, response) {
    if (!error) {
      // console.log(tweets);
      let statuses = tweets.statuses;
      let totalMonths = 0;
      let avgFollowers = 0;
      let engCounter = 0;
      for (let i = 0; i < 100; i++) {
        // console.log(i + ': ' + statuses[i].text);
        let months = monthsDiff(statuses[i].user.created_at);
        // let date = new Date(statuses[i].user.created_at);
        // let temp = date.toString();
        totalMonths += months;
        avgFollowers += statuses[i].user.followers_count;
        if(statuses[i].lang === 'en'){
            engCounter ++;
        }
        // eq.push({temp, months});
        // eq.push(statuses[i].user);
      }
      let avgMonth = totalMonths/100;
      let _Year = Math.floor(avgMonth/12);
      let _Month = Math.floor(((avgMonth/12)-_Year)*12);
      avgFollowers /= 100;
      let ret = 'Average age of accounts: ' + _Year.toString() + ' Years ' + _Month.toString() + ' Months';
      ret = ret + '\n' + 'Average followers count: ' + avgFollowers.toString();
      ret = ret + '\n' + "English Users Count: " + engCounter.toString();
      // console.log(eq);
      res.send(ret);
    } else {
      console.log("Something went wrong!");
    }
  });
  // console.log(eq);
  // res.send(eq);
});

server.listen(2500, () => {
  console.log("Connected to port 2500!");
});
