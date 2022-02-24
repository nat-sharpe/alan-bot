import dotenv from 'dotenv';
import axios from 'axios';
import qs from 'qs';

dotenv.config();

const myDate = new Date();
const month = myDate.getMonth();
const day = myDate.getDate();
const hour = myDate.getHours();
const minute = myDate.getMinutes();

console.log(myDate);
console.log(day);
console.log(hour);
console.log(minute);

// 6pm Monday - 4pm Tuesday
const hours = [0, 2, 4, 14, 16, 18, 21, 22];
// January = 0
const currentMonth = 1;

const tweetData = {
  21: ['first', 'second', 'third', 'fourth', 'fifth', 'sixth', 'seventh', 'eighth'],
};

const todaysTweets = tweetData[day];
const index = hours.indexOf(hour);
const tweet = tweetData[day] ? tweetData[day].slice(index, index + 1)[0] : '';

if (month === currentMonth && hours.includes(hour) && minute < 5) {
  console.log(todaysTweets);
  console.log(index);
  console.log(tweet);
}

const data = {
  text: 'There are no mistakes, so stop worrying and get busy being who you are.',
};

console.log('bearer token ', process.env.TWITTER_BEARER_TOKEN);
console.log('refresh token ', process.env.TWITTER_REFRESH_TOKEN);

// get new access token and refresh token
const getNewToken = async () => {
  try {
    const response = await axios({
      method: 'post',
      url: 'https://api.twitter.com/2/oauth2/token',
      data: qs.stringify({
        refresh_token: process.env.TWITTER_REFRESH_TOKEN,
        grant_type: 'refresh_token',
        client_id: process.env.TWITTER_CLIENT_ID,
      }),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    console.log(response.data);
  } catch (error) {
    console.log('DANG! ', error);
  }
};

getNewToken();

// // test with GET
// const getSampleTweet = async () => {
//   try {
//     const response = await axios.get('https://api.twitter.com/2/tweets?ids=1261326399320715264', {
//       headers: {
//         Authorization: `Bearer ${process.env.TWITTER_BEARER_TOKEN}`,
//         'content-type': 'application/json',
//         accept: 'application/json',
//       },
//     });
//     console.log(response.data.data[0].text);
//   } catch (error) {
//     console.log('DANG! ', error);
//   }
// };

// getSampleTweet();

// await axios.post('https://api.twitter.com/2/tweets', data, {
//   headers: {
//     Authorization: `Bearer ${process.env.TWITTER_BEARER_TOKEN}`,
//     'content-type': 'application/json',
//     accept: 'application/json',
//   },
// });
