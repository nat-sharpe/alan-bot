import dotenv from 'dotenv';
import axios from 'axios';

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
const tweet = tweetData[day].slice(index, index + 1)[0];

if (month === currentMonth && hours.includes(hour) && minute < 5) {
  console.log(todaysTweets);
  console.log(index);
  console.log(tweet);
}

const data = {
  text: 'There are no mistakes, so stop worrying and get busy being who you are.',
};

console.log('bearer token ', process.env.TWITTER_BEARER_TOKEN);

// test with GET
const req = async () => {
  try {
    const response = await axios.get('https://api.twitter.com/2/tweets?ids=1261326399320715264', {
      headers: {
        Authorization: `Bearer ${process.env.TWITTER_BEARER_TOKEN}`,
        'content-type': 'application/json',
        accept: 'application/json',
      },
    });
    console.log(response.data);
  } catch (error) {
    console.log('POOP! ', error);
  }
};

req();

// await axios.post('https://api.twitter.com/2/tweets', data, {
//   headers: {
//     Authorization: `Bearer ${process.env.TWITTER_BEARER_TOKEN}`,
//     'content-type': 'application/json',
//     accept: 'application/json',
//   },
// });
