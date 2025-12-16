import { PrismaClient } from '@prisma/client';
import express from 'express';
import cors from 'cors';

const prisma = new PrismaClient();
const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Rotas

// GET - Listar todas as tarefas
app.get('/tarefas', async (req, res) => {
  try {
    const tarefas = await prisma.tarefa.findMany({
      orderBy: { createdAt: 'desc' }
    });
    res.json(tarefas);
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao buscar tarefas', detalhes: error.message });
  }
});

// GET - Buscar tarefa por ID
app.get('/tarefas/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const tarefa = await prisma.tarefa.findUnique({
      where: { id: parseInt(id) },
    });
    
    if (!tarefa) {
      return res.status(404).json({ erro: 'Tarefa não encontrada' });
    }
    
    res.json(tarefa);
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao buscar tarefa', detalhes: error.message });
  }
});

// POST - Criar nova tarefa
app.post('/tarefas', async (req, res) => {
  try {
    const { titulo, descricao, prioridade } = req.body;
    
    if (!titulo) {
      return res.status(400).json({ erro: 'Título é obrigatório' });
    }
    
    const novaTarefa = await prisma.tarefa.create({
      data: {
        titulo,
        descricao,
        prioridade: prioridade || 'media'
      },
    });
    res.status(201).json(novaTarefa);
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao criar tarefa', detalhes: error.message });
  }
});

// PUT - Atualizar tarefa
app.put('/tarefas/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const dados = req.body;
    
    const tarefaAtualizada = await prisma.tarefa.update({
      where: { id: parseInt(id) },
      data: dados,
    });
    res.json(tarefaAtualizada);
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao atualizar tarefa', detalhes: error.message });
  }
});

// PATCH - Marcar tarefa como concluída/não concluída
app.patch('/tarefas/:id/concluir', async (req, res) => {
  try {
    const { id } = req.params;
    const { concluida } = req.body;
    
    const tarefaAtualizada = await prisma.tarefa.update({
      where: { id: parseInt(id) },
      data: { concluida },
    });
    res.json(tarefaAtualizada);
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao atualizar status', detalhes: error.message });
  }
});

// DELETE - Deletar tarefa
app.delete('/tarefas/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.tarefa.delete({
      where: { id: parseInt(id) },
    });
    res.json({ mensagem: 'Tarefa deletada com sucesso' });
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao deletar tarefa', detalhes: error.message });
  }
});

// GET - Filtrar tarefas concluídas
app.get('/tarefas/filtro/concluidas', async (req, res) => {
  try {
    const tarefas = await prisma.tarefa.findMany({
      where: { concluida: true },
      orderBy: { createdAt: 'desc' }
    });
    res.json(tarefas);
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao buscar tarefas', detalhes: error.message });
  }
});

// GET - Filtrar tarefas pendentes
app.get('/tarefas/filtro/pendentes', async (req, res) => {
  try {
    const tarefas = await prisma.tarefa.findMany({
      where: { concluida: false },
      orderBy: { createdAt: 'desc' }
    });
    res.json(tarefas);
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao buscar tarefas', detalhes: error.message });
  }
});

// Rota de teste
app.get('/', (req, res) => {
  res.json({ 
    mensagem: 'API de Gerenciamento de Tarefas funcionando!',
    versao: '1.0.0'
  });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
  console.log(`📝 API: http://localhost:${PORT}`);
});

// Tratamento de encerramento gracioso
process.on('SIGINT', async () => {
  await prisma.$disconnect();
  console.log('👋 Servidor encerrado');
  process.exit(0);
}); 