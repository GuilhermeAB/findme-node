import express from 'express';
import compression from 'compression';
import helmet from 'helmet';
import morgan from 'morgan';
import { format } from 'date-fns';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import bodyParser from 'body-parser';
import routes from './routes';

require('dotenv').config();

const app: express.Application = express();

app.use((req: any, res: any, next: any) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, authorization');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  next();
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
morgan.token('localdate', (req: any, res: any) => format(new Date(), 'HH:mm:SS'));

app.use(morgan('[:status - :localdate] :method :url :res[content-length] - :response-time ms'));
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());
app.use(express.json());
app.use(cors({
  origin: [
    'http://localhost:8080',
    'http://localhost:3000',
  ],
  credentials: true,
}));
app.use(cookieParser());
app.use(routes);

app.listen(3000, () => {
  console.log('App is listening on port 3000');
});
