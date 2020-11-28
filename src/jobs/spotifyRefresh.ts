import 'colorts';

import schedule from 'node-schedule';

import SpotifyAPI from '../api/spotify.api';

export const refresh = schedule.scheduleJob('*/55 * * * *', async function () {
  await new SpotifyAPI().authenticate();
});
