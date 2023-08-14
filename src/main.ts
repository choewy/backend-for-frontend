import 'dotenv/config';
import axios, { AxiosHeaders } from 'axios';
import {
  BROADCASTER_ID,
  OAUTH_TOKEN,
  TWITCH_CLIENT_ID,
  TWITCH_CLIENT_SECRET,
} from './config';

const api = axios.create();

const createAxiosHeaders = (token: string) => {
  const headers = new AxiosHeaders();

  headers.set('Client-Id', TWITCH_CLIENT_ID);
  headers.set('Authorization', `Bearer ${token}`);

  return headers;
};

const getAppAcccessToken = async () => {
  const url = 'https://id.twitch.tv/oauth2/token';

  return api
    .post(url, {
      client_id: TWITCH_CLIENT_ID,
      client_secret: TWITCH_CLIENT_SECRET,
      grant_type: 'client_credentials',
    })
    .then((res) => res.data.access_token)
    .catch((e) => e.response.data);
};

const getUserInformation = async (token: string, broadcaster_id: string) => {
  const url = 'https://api.twitch.tv/helix/users';
  const headers = createAxiosHeaders(token);

  return api
    .get(url, { headers, params: { broadcaster_id } })
    .then((res) => res.data)
    .catch((e) => e.response.data);
};

const getChannelInformation = async (token: string, broadcaster_id: string) => {
  const url = 'https://api.twitch.tv/helix/channels';
  const headers = createAxiosHeaders(token);

  return api
    .get(url, { headers, params: { broadcaster_id } })
    .then((res) => res.data)
    .catch((e) => e.response.data);
};

const getBroadcastSchedule = async (token: string, broadcaster_id: string) => {
  const url = 'https://api.twitch.tv/helix/schedule';
  const headers = createAxiosHeaders(token);

  return api
    .get(url, { headers, params: { broadcaster_id } })
    .then((res) => res.data)
    .catch((e) => e.response.data);
};

const createClip = async (
  token: string,
  broadcaster_id: string,
  has_delay = false,
) => {
  const url = 'https://api.twitch.tv/helix/clips';
  const headers = createAxiosHeaders(token);

  return api
    .post(url, {}, { headers, params: { broadcaster_id, has_delay } })
    .then((res) => res.data)
    .catch((e) => e.response.data);
};

const main = async () => {
  const appAccessToken = await getAppAcccessToken();

  await getChannelInformation(appAccessToken, BROADCASTER_ID).then(console.log);
  await getBroadcastSchedule(appAccessToken, BROADCASTER_ID).then(console.log);
  await getUserInformation(OAUTH_TOKEN, BROADCASTER_ID).then(console.log);
  await createClip(OAUTH_TOKEN, BROADCASTER_ID).then(console.log);
};

main();
