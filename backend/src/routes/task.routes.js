import { Router } from "express";
import { listarTarefas, criarTarefa, deletarTarefa } from "../services/task.service"; 

const router = Router();

router.get("/", async (req, res) => {
  const { userId } = req.query;
  if (!userId) {
    return res.status(400).json({ error: "O ID do usuário é obrigatório." });
  } 
  const tasks = await listarTarefas(); 
  res.status(200).json(tasks);
});

router.post("/", async (req, res) => {
  const { title, userId } = req.body;
  const novaTarefa = await criarTarefa(title, userId); 
  res.status(201).json(novaTarefa);
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  await deletarTarefa(Number(id));
  res.status(200).json({ message: "Tarefa deletada com sucesso" });
});

module.exports = router;
export default router;