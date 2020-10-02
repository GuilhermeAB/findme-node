import { Router } from 'express';
// import multer from 'multer';
import fs from 'fs';
import path from 'path';
import AuthController from 'controllers/AuthController';
import GenderController from 'src/controllers/GenderController';
import auth from './middlewares/auth';
import MissingPersonController from 'src/controllers/MissingPersonController';

const routes = Router();

// const upload = multer({ dest: 'files/' });

routes.get('/', (req: any, res: any) => res.json({ message: 'Hello there' }));

// #################################
// File
// #################################
routes.get('/file', (req: any, res: any) => {
  const { name } = req.query;

  try {
    fs.readFile(path.resolve(__dirname, `../../files/${name}`), (err: any, data: any) => {
      if (err) throw err;

      res.status(200).set('Content-Type', 'image/png').end(data);
    });
  } catch (e) {
    console.log(e);
  }
});

// #################################
// Auth
// #################################

routes.post('/register', AuthController.person.register);
routes.post('/login', AuthController.person.login);

// #################################
// Gender
// #################################

routes.get('/get-genders', auth, GenderController.gender.get);

// #################################
// Missing person
// #################################

routes.post('/save-missing-person', auth, MissingPersonController.missingPerson.store);

export default routes;
