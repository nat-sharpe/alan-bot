import dotenv from 'dotenv';
import Twitter from 'twitter';

dotenv.config();

const client = new Twitter({
  client_key: process.env.TWITTER_CLIENT_KEY,
  client_secret: process.env.TWITTER_CLIENT_SECRET,
  bearer_token: process.env.TWITTER_BEARER_TOKEN,
});

const myDate = new Date();
const day = myDate.getDate();
const hour = myDate.getHours();
const minute = myDate.getMinutes();

console.log(myDate);
console.log(day);
console.log(hour);
console.log(minute);

const hours = [8, 10, 12, 14, 16, 18, 20, 22];

const tweetData = {
  21: ['first', 'second', 'third', 'fourth', 'fifth', 'sixth', 'seventh', 'eighth'],
};

const todaysTweets = tweetData[day];
const index = todaysTweets.indexOf(hour);
const tweet = tweetData[day].splice(index, index + 1);

console.log(todaysTweets);
console.log(index);
console.log(tweet);

// var params = { screen_name: 'nodejs' };
// client.get('statuses/user_timeline', params, function (error, tweets, response) {
//   if (!error) {
//     console.log(tweets);
//   } else {
//     console.log(error);
//   }
// });
