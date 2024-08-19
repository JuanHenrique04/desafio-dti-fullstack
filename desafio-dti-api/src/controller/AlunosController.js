// import alunosDB from "../models/mockAlunosDb.js"
import { adicionarAluno, listarAlunos } from "../models/alunosModel.js";
import calculaMedia from "../sevice/alunosService.js";

class AlunosController {
    static setAlunos(req, res) {
        const {nome, notas, frequencia} = req.body;
        if (!nome || !notas || notas.length !== 5 || frequencia == null) {
            return res.status(400).json({ message: "Dados inválidos!" });
        }
        const aluno = {
            nome,
            notas,
            frequencia,
            mediaNotas: notas.reduce((acc, cur) => acc + cur, 0) / notas.length
        };
        adicionarAluno(aluno);
        return res.status(201).json({message: "Aluno inserido:", aluno});
    }

    static getTodos(req, res) {
        return res.status(200).json(listarAlunos());
    }

    static getRelatorio(req, res) {
        const alunos = listarAlunos();

        if(alunos.length === 0) {
            return res.status(400).json({menssage: "Nenhum aluno cadastrado!"});
        }
        const resultados = calculaMedia(alunos);

        return res.status(200).json(resultados);
    }
}

export default AlunosController;