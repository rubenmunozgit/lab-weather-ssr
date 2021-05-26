import path from 'path';
import express from 'express';
import compression from 'compression';
const exphbs = require('express-handlebars');
import router from './routes';
import errorHandler from './errorHandler';

const port = process.env.PORT || 3000;
const app = express();

app.engine('.hbs', exphbs({ extname: '.hbs' }));
app.set('views', path.join(process.cwd(), 'build', 'views'));
app.set('view engine', '.hbs');
app.set('trust proxy', true);

app.use(compression());
app.use('/', router);
app.use(errorHandler);
app.use(express.static(path.join(process.cwd(), 'build')));

app.listen(port, () => {
  console.log(`Server is listening on port: ${port}`);
});
