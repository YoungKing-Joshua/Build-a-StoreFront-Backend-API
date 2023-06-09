import express, { Application, Request, Response } from 'express';
import helmet from 'helmet';
import userRoutes from './handlers/users';
import productsRoutes from './handlers/products';
import ordersRoutes from './handlers/orders';

const app: Application = express();

app.use(helmet());

app.use(express.json());

const port= process.env.PORT || 4000;

app.get('/', async (_req: Request, res: Response) => {
  res.status(200).send('Hello World !');
});

userRoutes(app);
productsRoutes(app);
ordersRoutes(app);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

export default app;
