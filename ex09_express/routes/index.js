import express from 'express';
const indexRouter = express.Router();

/* GET home page. */
indexRouter.get('/', (req, res, next) => {
  res.send('index detected');
});

export default indexRouter;
