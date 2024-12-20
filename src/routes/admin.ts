import { Router, Request, Response } from 'express';
import { Grocery } from '../models/Grocery';
import {getDataSource} from '../config/database';

const router = Router();

// Add new grocery item
router.post('/add', async (req: Request, res: Response): Promise<Response> => {
  const { name, price, inventory } = req.body;
  try {
    const AppDataSource = await getDataSource();
    const groceryRepository = AppDataSource.getRepository(Grocery);
    const newGrocery = groceryRepository.create({ name, price, inventory });
    await groceryRepository.save(newGrocery);
    return res.status(201).json(newGrocery);
  } catch (error : any) {
    return res.status(500).json({ error: 'Error adding grocery item', details: error.message });
  }
});

// View all grocery items
router.get('/list', async (req: Request, res: Response): Promise<Response> => {
  try {
    const AppDataSource = await getDataSource();
    const groceryRepository = AppDataSource.getRepository(Grocery);
    const groceries = await groceryRepository.find();
    return res.status(200).json(groceries);
  } catch (error : any) {
    return res.status(500).json({ error: 'Error retrieving grocery items', details: error.message });
  }
});

// Remove a grocery item
router.delete('/remove/:name', async (req: Request<{ name: string }>, res: Response): Promise<Response> => {
  const { name } = req.params;
  try {
    const AppDataSource = await getDataSource();
    const groceryRepository = AppDataSource.getRepository(Grocery);
    const grocery = await groceryRepository.findOneBy({name: name})
    if (!grocery) {
        return res.status(404).json({ error: 'Grocery item not found' });
      }
    const result = await groceryRepository.delete(grocery.id);
    if (result.affected === 0) {
      return res.status(404).json({ error: 'Grocery item not found' });
    }
    return res.status(200).json({ message: 'Grocery item removed successfully' });
  } catch (error : any) {
    return res.status(500).json({ error: 'Error removing grocery item', details: error.message });
  }
});

// Update grocery item details
router.put('/update/:request_name', async (req: Request<{ request_name: string }, any, { name?: string, price?: number, inventory?: number }>, res: Response): Promise<Response> => {
  const { request_name } = req.params;
  const { name, price, inventory } = req.body;
  try {
    const AppDataSource = await getDataSource();
    const groceryRepository = AppDataSource.getRepository(Grocery);
    const grocery = await groceryRepository.findOneBy({ name: request_name });
    if (!grocery) {
      return res.status(404).json({ error: 'Grocery item not found' });
    }
    grocery.name = name ?? grocery.name;
    grocery.price = price ?? grocery.price;
    grocery.inventory += inventory ?? 0;
    await groceryRepository.save(grocery);
    return res.status(200).json(grocery);
  } catch (error : any) {
    return res.status(500).json({ error: 'Error updating grocery item', details: error.message });
  }
});

export default router;
