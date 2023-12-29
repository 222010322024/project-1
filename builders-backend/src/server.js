const app = require('./app');
const { PORT } = require('./config');
const { connectDB } = require('./database/connectDB');

connectDB();

app.listen(PORT, () => {
  console.log('Server is running on', PORT);
});
