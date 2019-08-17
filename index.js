import express from 'express';

const app = express();
const port = 3000;

// specifies the root directory from which to serve static assets
app.use(express.static('views'));

app.get('/', (_req, res) => {
  res.sendFile('./index.html');
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server listening on port ${port}`);
});
