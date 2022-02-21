import dotenv from 'dotenv';
import Twitter from 'twitter';

dotenv.config();

const client = new Twitter({
  client_key: process.env.TWITTER_CLIENT_KEY,
  client_secret: process.env.TWITTER_CLIENT_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
  bearer_token: process.env.TWITTER_BEARER_TOKEN,
});

// client.post(
//   'statuses/update',
//   { status: 'Hello, world!' },
//   (error, tweet, response) => {
//     if (error) throw error;
//   }
// );

console.log('fabulous');
