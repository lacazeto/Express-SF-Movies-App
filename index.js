import express from 'express';
import MoviesCsvParser from './helpers/movies_csv_parser';

const app = express();
const port = 3000;

// specifies the root directory from which to serve static assets
app.use(express.static('static'));

app.get('/', (_req, res) => {
  res.sendFile('./index.html');
});

app.get('/movies', (_req, res) => {
  const moviesCsvParser = new MoviesCsvParser();
  const { movies } = moviesCsvParser;
  res.json(movies);
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server listening on port ${port}`);
});
