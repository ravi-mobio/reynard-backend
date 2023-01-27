const mongoose = require("mongoose");
const logger = require("../app/utils/logger.utils");
const { DB_USERNAME, DB_NAME, DB_PASSWORD, DB_HOST, NODE_ENV, DB_LOCAL } =
  process.env;

const url = `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}?retryWrites=true&w=majority`;
// const prodUrl = `mongodb://127.0.0.1:27017/${DB_NAME}`;

// const localUrl = `mongodb://127.0.0.1:27017/${DB_LOCAL}`;

// const url = `mongodb://127.0.0.1:27017/${DB_NAME}`
// const url = 'mongodb+srv://sarangbelsare:AToo3230FryPiBn7@cluster0.9o3jlzc.mongodb.net/?retryWrites=true&w=majority';

console.log(DB_NAME);
// const url = `mongodb://ravi:patel@localhost:27017/?authMechanism=DEFAULT&authSource=wts-energy`

// DB Connection Start
mongoose.set("strictQuery", false);
mongoose.Promise = global.Promise;
mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => logger.info("DB CONNECTED SUCCESSFULLY..."))
  .catch((err) => logger.error(err));
