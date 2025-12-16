const { Router } = require("express");
const router = Router();

// Exemplo de rota GET para listar usuários
router.get("/", async (req, res) => {
    try {
        // Aqui você colocaria a lógica para buscar usuários no banco
        const usuarios = [
            { id: 1, nome: "Maria" },
            { id: 2, nome: "João" }
        ];
        res.json(usuarios);
    } catch (error) {
        res.status(500).json({ erro: "Erro ao listar usuários" });
    }
});

// Exemplo de rota POST para criar usuário
router.post("/", async (req, res) => {
    try {
        const { nome } = req.body;
        if (!nome) {
            return res.status(400).json({ erro: "Nome é obrigatório" });
        }

        // Aqui você salvaria no banco
        const novoUsuario = { id: Date.now(), nome };
        res.status(201).json(novoUsuario);
    } catch (error) {
        res.status(500).json({ erro: "Erro ao criar usuário" });
    }
});

// Exemplo de rota DELETE para remover usuário
router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        // Aqui você removeria do banco
        res.json({ mensagem: `Usuário ${id} removido com sucesso` });
    } catch (error) {
        res.status(500).json({ erro: "Erro ao remover usuário" });
    }
});

module.exports = router; 