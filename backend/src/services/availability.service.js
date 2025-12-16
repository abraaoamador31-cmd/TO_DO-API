// availabilityService.js

// Lista todas as disponibilidades (mockado aqui como exemplo)
async function listarDisponibilidades() {
    return [
        { id: 1, data: "2025-12-10", disponivel: true },
        { id: 2, data: "2025-12-11", disponivel: false }
    ];
}

// Cria uma nova disponibilidade
async function criarDisponibilidade(data, disponivel) {
    if (!data || typeof disponivel === "undefined") {
        throw new Error("Data e disponibilidade são obrigatórios");
    }

    const novaDisponibilidade = {
        id: Date.now(),
        data,
        disponivel
    };

    // Aqui você salvaria no banco
    return novaDisponibilidade;
}

// Remove uma disponibilidade pelo ID
async function removerDisponibilidade(id) {
    // Aqui você removeria do banco
    return { mensagem: `Disponibilidade ${id} removida com sucesso` };
}

module.exports = {
    listarDisponibilidades,
    criarDisponibilidade,
    removerDisponibilidade
}; 