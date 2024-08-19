import express from "express";
import AlunosController from "../controller/AlunosController.js";

const router = express.Router();

router.get('/info', function (req, res) {
    res.send('Hello World');
});

router.post('/setAlunos', AlunosController.setAlunos);
router.get('/getTodosAlunos', AlunosController.getTodos);
router.get('/getRelatorioMedias', AlunosController.getRelatorio)

export default router