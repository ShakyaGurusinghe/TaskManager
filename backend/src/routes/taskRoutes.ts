import express from 'express';
import * as taskController from '../controllers/taskController';

const router = express.Router();

router.post('/', (req, res) => taskController.createTask(req, res));
router.get('/', (req, res) => taskController.getTasks(req, res));
router.get('/:id', (req, res) => taskController.getTaskById(req, res));
router.put('/:id', (req, res) => taskController.updateTask(req, res));
router.delete('/:id', (req, res) => taskController.deleteTask(req, res));

router.get('/test/error', taskController.testError);

export default router;