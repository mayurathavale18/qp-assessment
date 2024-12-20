import { Router, Request, Response } from 'express';
import { Grocery } from '../models/Grocery';
import {getDataSource} from '../config/database';

const router = Router();

// View available groceries
router.get('/list', async (req: Request, res: Response) => {
  try {
    const AppDataSource = await getDataSource();
    const groceryRepository = AppDataSource.getRepository(Grocery);
    const groceries = await groceryRepository.find();
    res.status(200).json(groceries);
  } catch (error : any) {
    res.status(500).json({ error: 'Error retrieving grocery items', details: error.message });
  }
});

// Book groceries
router.post('/book', async (req: Request, res: Response) => {
  const { items } = req.body; // items: [{ id, quantity }]
  try {
    const AppDataSource = await getDataSource();
    const groceryRepository = AppDataSource.getRepository(Grocery);
    const bookedItems = [];

    for (const item of items) {
      const grocery = await groceryRepository.findOneBy({ name: item.name });
      if (!grocery || grocery.inventory < item.quantity) {
        return res.status(400).json({ error: `Item with name ${item.name} is unavailable or out of stock.` });
      }
      grocery.inventory -= item.quantity;
      await groceryRepository.save(grocery);
      bookedItems.push({ id: grocery.id, name: grocery.name, bookedQuantity: item.quantity });
    }

    res.status(200).json({ message: 'Groceries booked successfully', bookedItems });
  } catch (error : any) {
    res.status(500).json({ error: 'Error booking groceries', details: error.message });
  }
});

export default router;
