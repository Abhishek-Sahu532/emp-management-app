
import express from 'express'
import logger from 'morgan'
import cookieParser  from 'cookie-parser';
import createError from 'http-errors';
import connectDB from './db/db.js'
import dotenv from 'dotenv'

import usersRouter from './routes/users.js'

var app = express();




dotenv.config({
  path: ".env",
});
//connecting database
connectDB().then(() => {
  app.listen(process.env.PORT || 8000, () => {
    console.log(`Server is running at port : ${process.env.PORT}`);
  });
})
.catch((err) => {
  console.log("MongoDB connection failed !!!", err);
});
// app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api/v1/users', usersRouter);

// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

export {app}