// user.service.js

// Lista todos os usuários (mockado aqui como exemplo)
async function listarUsuarios() {
    return [
        { id: 1, nome: "Maria" },
        { id: 2, nome: "João" }
    ];
}

// Cria um novo usuário
async function criarUsuario(nome) {
    if (!nome) {
        throw new Error("Nome do usuário é obrigatório");
    }

    const novoUsuario = {
        id: Date.now(),
        nome
    };

    // Aqui você salvaria no banco
    return novoUsuario;
}

// Atualiza um usuário existente
async function atualizarUsuario(id, dados) {
    // Aqui você atualizaria no banco
    return { id, ...dados };
}

// Remove um usuário pelo ID
async function removerUsuario(id) {
    // Aqui você removeria do banco
    return { mensagem: `Usuário ${id} removido com sucesso` };
}

module.exports = {
    listarUsuarios,
    criarUsuario,
    atualizarUsuario,
    removerUsuario
}; 