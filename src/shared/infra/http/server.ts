import { createConnection } from '../typeorm/data-source';
import { app } from './app';

createConnection();

app.listen(3333, () => {
  console.log('Server is running on http://localhost:3333');
});
