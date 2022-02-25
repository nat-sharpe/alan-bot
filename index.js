import dotenv from 'dotenv';
import axios from 'axios';
import admin from 'firebase-admin';
import { initializeApp, applicationDefault, cert } from 'firebase-admin/app';
import { getFirestore, Timestamp, FieldValue } from 'firebase-admin/firestore';
import { readFile } from 'fs/promises';

import { TwitterApi } from 'twitter-api-v2';

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
// const hours = [0, 2, 4, 14, 16, 18, 20, 22];
// starting at 10AM - 10PM
const hours = [16, 18, 20, 22, 0, 2, 4];
// January = 0
const currentMonth = 1;

const tweetData = JSON.parse(await readFile(new URL('./data.json', import.meta.url)));
console.log('tweetData ', tweetData);
const index = hours.indexOf(hour);
const data = {
  text: tweetData[day.toString()] ? tweetData[day.toString()].slice(index, index + 1)[0] : '',
};

const getNewStuff = async () => {
  const twitterClient = new TwitterApi({
    clientId: process.env.TWITTER_CLIENT_ID,
    clientSecret: process.env.TWITTER_CLIENT_SECRET,
  });

  const devGoogleKey = process.env.SERVICE_ACCOUNT;
  const googleKey = devGoogleKey
    ? JSON.parse(devGoogleKey)
    : JSON.parse(await readFile(new URL('./google-key.json', import.meta.url)));

  // Obtain the {refreshToken} from your DB/store
  admin.initializeApp({ credential: admin.credential.cert(googleKey) });
  const db = getFirestore();
  const docRef = db.collection('twitter').doc('tokens');
  const tokens = await docRef.get();
  console.log('refresh ', tokens._fieldsProto.refresh.stringValue);
  const oldRefreshToken = tokens._fieldsProto.refresh.stringValue;

  const { accessToken, refreshToken: newRefreshToken } = await twitterClient.refreshOAuth2Token(
    oldRefreshToken
  );
  console.log('accessToken ', accessToken);
  console.log('newRefreshToken ', newRefreshToken);

  // Store refreshed {accessToken} and {newRefreshToken} to replace the old ones
  await docRef.set({
    access: accessToken,
    refresh: newRefreshToken,
  });

  console.log('it wooorked!!!! ', data.text);
  // post tweet!
  await axios.post('https://api.twitter.com/2/tweets', data, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'content-type': 'application/json',
      accept: 'application/json',
    },
  });
};

console.log('index ', index);
console.log('data.text ', data.text);
console.log('month === currentMonth ', month === currentMonth);
console.log('hours.includes(hour) ', hours.includes(hour));
// console.log('minute < 5 ', minute < 5);

if (month === currentMonth && hours.includes(hour)) {
  getNewStuff();
}

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
