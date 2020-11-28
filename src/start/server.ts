import app from './app';

const port = parseInt(process.env.PORT as string) || 3000;

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
