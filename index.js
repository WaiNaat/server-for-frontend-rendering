import express from 'express';
import cors from 'cors';
import DICTIONARY_DATA from './fixtures/dictionary.js';

const app = express();
const port = process.env.PORT || 7942;

app.use(cors({
  origin: 'https://sparrow-frontend-rendering.vercel.app',
  credentials: true,
}));

app.get('/', (req, res) => {
  res.send('안녕하세용?');
});

app.get('/dictionary-plants', (req, res) => {
  const target = req.query.name.toString() ?? '';
  const searchResult = DICTIONARY_DATA.filter(({ name }) => name.includes(target)).map(
    ({ id, name, image }) => ({ id, name, image })
  );

  res.json({ data: searchResult });
});

app.get('/dictionary-plants/:id', (req, res) => {
  const { id } = req.params;
  const dictId = Number(id);
  const data = DICTIONARY_DATA.find(({ id }) => id === dictId);

  if (data) {
    res.json(data);
  } else {
    res.status(404).send('없어용');
  }
});

app.get('/members/me', (req, res) => {
  res.status(401).json({ message: '만료된 세션입니다.' });
});

app.listen(port, () => {
  console.log(`${port}번 포트에서 돌아가용`);
});
