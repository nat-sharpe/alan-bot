import dotenv from 'dotenv';
import axios from 'axios';
import admin from 'firebase-admin';
import { initializeApp, applicationDefault, cert } from 'firebase-admin/app';
import { getFirestore, Timestamp, FieldValue } from 'firebase-admin/firestore';

import { TwitterApi } from 'twitter-api-v2';

const callbackURL = 'https://twitter.com/ai_alan_watts';

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

const twitterClient = new TwitterApi({
  clientId: process.env.TWITTER_CLIENT_ID,
  clientSecret: process.env.TWITTER_CLIENT_SECRET,
});

const google = process.env.SERVICE_ACCOUNT;

console.log('google ', google);

admin.initializeApp(google);

const db = getFirestore();

const docRef = db.collection('twitter').doc('tokens');

await docRef.set({
  access: 'ding',
  refresh: 'dong',
});

// const getNewStuff = async () => {
//   // Obtain the {refreshToken} from your DB/store
//   const oldRefreshToken = process.env.TWITTER_REFRESH_TOKEN;
//   const { accessToken, refreshToken: newRefreshToken } = await twitterClient.refreshOAuth2Token(
//     oldRefreshToken
//   );
//   console.log('accessToken ', accessToken);
//   console.log('newRefreshToken ', newRefreshToken);
//   // Store refreshed {accessToken} and {newRefreshToken} to remplace the old ones
// };

// getNewStuff();

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
