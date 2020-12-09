import { Request, Response, Router } from 'express';
import { body, validationResult } from 'express-validator';
import asyncHandler from 'express-async-handler';

import InputError from '../errors/InputError';
import WilderModel from '../models/Wilder';

const controller = {
  create: async (req: Request, res: Response): Promise<void> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new InputError(errors.array());
    }
    await WilderModel.init();
    const wilder = new WilderModel(req.body);
    const result = await wilder.save();
    res.json({ success: true, result });
  },
  read: async (req: Request, res: Response): Promise<void> => {
    const result = await WilderModel.find();
    res.json({ success: true, result });
  },
  update: async (req: Request, res: Response): Promise<void> => {
    // eslint-disable-next-line no-underscore-dangle
    const result = await WilderModel.updateOne({ _id: req.body._id }, req.body);
    res.json(result);
  },
  delete: async (req: Request, res: Response): Promise<void> => {
    // eslint-disable-next-line no-underscore-dangle
    const result = await WilderModel.deleteOne({ _id: req.body._id });
    res.json({ success: true, result });
  },
};

const router = Router();

router
  .route('/api/wilders')
  .post(
    [
      body('name').notEmpty().withMessage('name must be provided'),
      body('name')
        .isLength({ min: 3 })
        .withMessage('name must be at least 3 characters long'),
      body('city').isString().withMessage('city must be a string'),
      body('skills.*.title')
        .isLength({ min: 2 })
        .withMessage('skill title must be at least 2 characters long'),
      body('skills.*.votes')
        .isInt({ min: 0 })
        .withMessage('skill votes must be an integer greater or equal to 0'),
    ],
    asyncHandler(controller.create)
  )
  .get(asyncHandler(controller.read))
  .put(asyncHandler(controller.update))
  .delete(asyncHandler(controller.delete));

export default router;
