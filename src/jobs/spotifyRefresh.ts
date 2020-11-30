import 'colorts';

import schedule from 'node-schedule';

import SpotifyAPI from '../api/spotify.api';

let refresh;

if (process.env.NODE_ENV === 'production') {
  refresh = schedule.scheduleJob('*/55 * * * *', async function () {
    await new SpotifyAPI().authenticate();
  });
}

export = refresh;
