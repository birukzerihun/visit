const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.status(200).json({ message: 'hello from server', app: 'Natours' });
});

app.post('/', (req, res) => {
  res.status(200).send('You can post to this end point');
});

const port = 3000;
app.listen(port, () => {
  console.log(`server listening on port ${port}`);
});
