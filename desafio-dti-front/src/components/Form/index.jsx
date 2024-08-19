import { useEffect, useState } from 'react';
import axios from 'axios';
import './Form.css';

const Form = () => {

  const [nome, setNome] = useState('');
  const [notas, setNotas] = useState([0, 0, 0, 0, 0]);
  const [frequencia, setFrequencia] = useState('');
  const [alunoInserido, setAlunoInserido] = useState(null);
  const [resultados, setResultados] = useState(null);
  const [todosAlunos, setTodosAlunos] = useState([]);

  const handleNotaChange = (index, value) => {
    const novasNotas = [...notas];
    novasNotas[index] = Number(value);
    setNotas(novasNotas);
  };

  const listaDeAlunos = () => {
    axios.get('http://localhost:8080/api/getTodosAlunos')
    .then((response) => {
      setTodosAlunos(response.data);
    })
    .catch((error) => {
      console.log(error);
    })
  }

  useEffect(listaDeAlunos, [alunoInserido])

  const handleSubmit = (e) => {
    e.preventDefault();
    const aluno = { nome, notas, frequencia: Number(frequencia) };

    axios.post('http://localhost:8080/api/setAlunos', aluno)
      .then((response) => {
        setAlunoInserido(response.data.aluno);
        alert('Aluno inserido com sucesso!');
      })
      .catch((error) => {
        console.error(error);
        alert('Erro ao inserir aluno.');
      });
  };

  const handleCalcularMedias = () => {
    axios.get('http://localhost:8080/api/getRelatorioMedias')
      .then((response) => {
        setResultados(response.data);
      })
      .catch((error) => {
        console.error(error);
        alert('Erro ao calcular médias.');
      });
  };

  return (
    <section className='formulario-container'>
      <h2>Insira os Alunos</h2>
      <form onSubmit={handleSubmit} className='formulario'>
        <div className='campo campo-nome'>
          <label>Nome do Aluno:</label>
          <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} required />
        </div>

        <div className='campo campo-notas'>
          <label>Notas:</label>
          {notas.map((nota, index) => (
            <input
              key={index}
              type="number"
              value={nota}
              min="0"
              max="10"
              onChange={(e) => handleNotaChange(index, e.target.value)}
              required
            />
          ))}
          <p className='vizualiza-notas'>Matemática: {notas[0]}</p>
          <p className='vizualiza-notas'>Física: {notas[1]}</p>
          <p className='vizualiza-notas'>Química: {notas[2]}</p>
          <p className='vizualiza-notas'>Biologia: {notas[3]}</p>
          <p className='vizualiza-notas'>Fisolofia: {notas[4]}</p>
        </div>

        <div className='campo campo-frequencia'>
          <label>Frequência (%):</label>
          <input
            type="number"
            value={frequencia}
            min="0"
            max="100"
            onChange={(e) => setFrequencia(e.target.value)}
            required
          />
        </div>

        <div className='container-botao'>
          <button className='botao' type="submit">Inserir Aluno</button>
        </div>
      </form>

      {alunoInserido && (
        <div className='aluno-inserido'>
          <h2>Aluno Inserido:</h2>
          <p>Nome: {alunoInserido.nome}</p>
          <p>Notas: {alunoInserido.notas.join(', ')}</p>
          <p>Média: {alunoInserido.mediaNotas}</p>
          <p>Frequência: {alunoInserido.frequencia}%</p>
        </div>
      )}

      <h2>Todos Alunos Cadstrados:</h2>

      {todosAlunos.map((aluno, index) => (
        <div key={index} className='lista-alunos'>
          <div>Nome: {aluno.nome}</div>
          <div>Notas: {aluno.notas.join(', ')}</div>
          <div>Media das notas: {aluno.mediaNotas}</div>
          <div>Frequência: {aluno.frequencia}%</div>
          <hr />
        </div>
      ))}

      <button className='botao botao-calculo' onClick={handleCalcularMedias}>Relatório de turma</button>

      {resultados && (
        <div className='relatorio-alunos'>
          <h2>Resultados</h2>
          <p>Média por Disciplina: {parseFloat(resultados.mediaPorDiciplina.join(', ')).toFixed(1)}</p>
          <p>Média Geral da Turma: {parseFloat(resultados.mediaTurmaGeral).toFixed(1)}</p>
          <h3>Alunos com Média Acima da Turma:</h3>
          <ul>
            {resultados.alunosAtencaoNotas.map((aluno, index) => (
              <li key={index}>{aluno}</li>
            ))}
          </ul>
          <h3>Alunos com Frequência Abaixo de 75%:</h3>
          <ul>
            {resultados.alunosAtencaoFrequencia.map((aluno, index) => (
              <li key={index}>{aluno}</li>
            ))}
          </ul>
        </div>
      )}
    </section>
  )
}

export default Form