import axios from 'axios';
import express, { Router, json, urlencoded } from 'express';
import { TWITCH_CLIENT_ID, TWITCH_CLIENT_SECRET } from './config';

const api = axios.create({});
const router = Router();

router.get('/signin', (req, res, next) => {
  const url = 'https://id.twitch.tv/oauth2/authorize';

  const query = [
    `redirect_uri=http://localhost:30001/auth/twitch`,
    `client_id=${TWITCH_CLIENT_ID}`,
    `response_type=code`,
    `scope=clips:edit`,
  ].join('&');

  res.redirect([url, query].join('?'));
});

router.get('/twitch', async (req, res, next) => {
  const query = req.query as { code: string };
  const url = 'https://id.twitch.tv/oauth2/token';

  await api
    .post(url, {
      client_id: TWITCH_CLIENT_ID,
      client_secret: TWITCH_CLIENT_SECRET,
      grant_type: 'authorization_code',
      redirect_uri: 'http://localhost:30001/auth/twitch',
      code: query.code,
    })
    .then((res) => console.log(res.data))
    .catch((e) => console.log(e.response.data));

  res.status(201).send();
});

router.get('/twitch/refresh', async (req, res, next) => {
  const query = req.query as { refresh_token: string };
  const url = 'https://id.twitch.tv/oauth2/token';

  await api
    .post(url, {
      client_id: TWITCH_CLIENT_ID,
      client_secret: TWITCH_CLIENT_SECRET,
      grant_type: 'refresh_token',
      refresh_token: query.refresh_token,
    })
    .then((res) => console.log(res.data))
    .catch((e) => console.log(e.response.data));

  res.status(201).send();
});

const app = express();

app.use(json());
app.use(urlencoded({ extended: true }));
app.use('/auth', router);

app.listen(30001, () => {
  console.log('server running...');
});
