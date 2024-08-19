const calculaMedia = alunos => {
    const mediaPorDiciplina = [];
    for (let i = 0; i < 5; i++) {
        const media = alunos.reduce((acc, cur) => acc + cur.notas[i], 0) / alunos.length;
        mediaPorDiciplina.push(media);
    }

    const mediaTurmaGeral = alunos.reduce((acc, cur) => acc + cur.mediaNotas, 0) / alunos.length;

    const alunosAtencaoNotas = alunos.filter(aluno => aluno.mediaNotas > mediaTurmaGeral);
    const alunosAtencaoFrequencia = alunos.filter(aluno => aluno.frequencia < 75);
    
    return {
        mediaPorDiciplina,
        mediaTurmaGeral,
        alunosAtencaoNotas: alunosAtencaoNotas.map(aluno => aluno.nome),
        alunosAtencaoFrequencia: alunosAtencaoFrequencia.map(aluno => aluno.nome)
    };
}

export default calculaMedia;