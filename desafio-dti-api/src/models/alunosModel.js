const alunos = [];

const adicionarAluno = (aluno) => {
    alunos.push(aluno);
};

const listarAlunos = () => alunos;

export {adicionarAluno, listarAlunos};