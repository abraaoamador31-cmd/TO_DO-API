// task.service.js

// Lista todas as tarefas (mockado aqui como exemplo)
async function listarTarefas() {
    return [
        { id: 1, titulo: "Estudar Node.js", concluida: false },
        { id: 2, titulo: "Finalizar API To-Do", concluida: true }
    ];
}

// Cria uma nova tarefa
async function criarTarefa(titulo) {
    if (!titulo) {
        throw new Error("Título da tarefa é obrigatório");
    }

    const novaTarefa = {
        id: Date.now(),
        titulo,
        concluida: false
    };

    // Aqui você salvaria no banco
    return novaTarefa;
}

// Atualiza uma tarefa existente
async function atualizarTarefa(id, dados) {
    // Aqui você atualizaria no banco
    return { id, ...dados };
}

// Remove uma tarefa pelo ID
async function removerTarefa(id) {
    // Aqui você removeria do banco
    return { mensagem: `Tarefa ${id} removida com sucesso` };
}

module.exports = {
    listarTarefas,
    criarTarefa,
    atualizarTarefa,
    removerTarefa
}; 