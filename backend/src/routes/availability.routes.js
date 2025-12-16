import { Router } from "express";
import availabilityController from "../controllers/availability.routes.js"; 

const router = Router();

// Exemplo de rota GET para verificar disponibilidade
router.get("/", async (req, res) => {
    try {
        // Aqui você poderia buscar dados de disponibilidade no banco
        const disponibilidade = [
            { id: 1, data: "2025-12-10", disponivel: true },
            { id: 2, data: "2025-12-11", disponivel: false }
        ];
        res.json(disponibilidade);
    } catch (error) {
        res.status(500).json({ erro: "Erro ao listar disponibilidade" });
    }
});

// Exemplo de rota POST para registrar disponibilidade
router.post("/", async (req, res) => {
    try {
        const { data, disponivel } = req.body;
        if (!data || typeof disponivel === "undefined") {
            return res.status(400).json({ erro: "Data e disponibilidade são obrigatórios" });
        }

        // Aqui você salvaria no banco
        const novaDisponibilidade = { id: Date.now(), data, disponivel };
        res.status(201).json(novaDisponibilidade);
    } catch (error) {
        res.status(500).json({ erro: "Erro ao registrar disponibilidade" });
    }
});

// Exemplo de rota DELETE para remover disponibilidade
router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        // Aqui você removeria do banco
        res.json({ mensagem: `Disponibilidade ${id} removida com sucesso` });
    } catch (error) {
        res.status(500).json({ erro: "Erro ao remover disponibilidade" });
    }
});

module.exports = router; 