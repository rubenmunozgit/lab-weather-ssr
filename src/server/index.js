import express from 'express';
const exphbs = require('express-handlebars');
import router from './routes';
import errorHandler from './errorHandler'


const port = process.env.PORT || 3000;
const app = express();

app.engine('handlebars', exphbs({ layoutsDir: './src/views' }));
app.set('views', './src/views');
app.set('view engine', 'handlebars');
app.set('trust proxy', true);

app.use('/', router);
app.use(errorHandler);
app.use(express.static('build'));

app.listen(port, () => {
  console.log(`Server is listening on port: ${port}`);
});
