const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config({ path: './config.env' });

const app = require('./app');

mongoose
  .connect(process.env.DATABASE_LOCAL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
  .then(() => {
    console.log('DB connected successfully');
  });

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A tour must have a name'],
    unique: true,
    trim: true
  },
  rating: {
    type: Number,
    default: 4.5
  },
  price: {
    type: Number,
    required: [true, 'A tour must have a price']
  }
});

const Tour = mongoose.model('Tour', tourSchema);

const newTour = new Tour({
  name: 'The Forest Ranger',
  rating: 4.7,
  price: 2997
});

newTour
  .save()
  .then(doc => console.log(doc))
  .catch(err => console.log(err));

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`server listening on port ${port}`);
});
