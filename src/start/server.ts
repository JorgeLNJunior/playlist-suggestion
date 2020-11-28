import 'colorts/lib/string';

import SpotifyAPI from '../api/spotify.api';
import app from './app';

const port = parseInt(process.env.PORT as string) || 3000;

app.listen(port, async () => {
  console.log(`listening on port ${port}`.green);

  try {
    await new SpotifyAPI().authenticate();
  } catch (error) {
    if (error.response) {
      console.log(
        `spotify authentication failed with error: "${error.response.data.error}" and status: "${error.response.status}"`
          .red,
      );
    } else {
      console.log(error);
    }
  }
});
