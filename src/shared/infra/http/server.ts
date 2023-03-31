import { AppDataSource } from '../typeorm/data-source';
import { app } from './app';

AppDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
  })
  .catch(err => {
    console.error('Error during Data Source initialization', err);
  });

app.listen(3333, () => {
  console.log('Server is running on http://localhost:3333');
});
