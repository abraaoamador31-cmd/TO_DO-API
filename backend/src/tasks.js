// task.js (rotas de tarefas)

const { Router } = require("express");
const {
    listarTarefas,
    criarTarefa,
    atualizarTarefa,
    removerTarefa
} = require("../services/task.service");

const router = Router();

// Rota GET - listar todas as tarefas
router.get("/", async (req, res) => {
    try {
        const tarefas = await listarTarefas();
        res.json(tarefas);
    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
});

// Rota POST - criar nova tarefa
router.post("/", async (req, res) => {
    try {
        const { titulo } = req.body;
        const nova = await criarTarefa(titulo);
        res.status(201).json(nova);
    } catch (error) {
        res.status(400).json({ erro: error.message });
    }
});

// Rota PUT - atualizar tarefa existente
router.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const dados = req.body;
        const atualizada = await atualizarTarefa(id, dados);
        res.json(atualizada);
    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
});

// Rota DELETE - remover tarefa
router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const resultado = await removerTarefa(id);
        res.json(resultado);
    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
});

module.exports = router; 