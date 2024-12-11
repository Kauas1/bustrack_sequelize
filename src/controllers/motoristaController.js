import { Motoristas } from '../models/motoristaModel.js'; 
import Onibus from '../models/onibusModel.js';


export const listarMotoristas = async (req, res) => {
    try {
        const motoristas = await Motoristas.findAll();
        res.status(200).json(motoristas);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Erro ao buscar os dados!" });
    }
};

export const criarMotorista = async (req, res) => {
    const { nome, data_nascimento, numero_carteira_habilitacao } = req.body;

    if (!nome || !data_nascimento || !numero_carteira_habilitacao) {
        return res.status(400).json({ message: "Todos os campos são obrigatórios!" });
    }

    try {
        const motoristaExistente = await Motoristas.findOne({
            where: { numero_carteira_habilitacao }
        });

        if (motoristaExistente) {
            return res.status(404).json({ message: "Este motorista já existe!" });
        }

        await Motoristas.create({ nome, data_nascimento, numero_carteira_habilitacao });
        res.status(201).json({ message: `O motorista: ${nome} foi cadastrado com sucesso!` });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Erro ao cadastrar o motorista!" });
    }
};

export const listarMotoristasPorId = async (req, res) => {
    const { id } = req.params;

    try {
        const onibus = await Onibus.findByPk(id);

        if (!onibus) {
            return res.status(404).json({ message: "Não foi encontrado nenhum ônibus com este ID!" });
        }

        const motorista = await Motoristas.findByPk(onibus.motorista_id);

        if (!motorista) {
            return res.status(404).json({ message: "Não foi encontrado nenhum motorista associado a este ônibus!" });
        }

        res.status(200).json(motorista);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Erro ao buscar os dados!" });
    }
};

export const deletarMotorista = async (req, res) => {
    const { id } = req.params;

    try {
        const onibus = await Onibus.findByPk(id);

        if (!onibus) {
            return res.status(404).json({ message: "Não foi encontrado nenhum ônibus com este ID!" });
        }

        const motorista = await Motoristas.findByPk(onibus.motorista_id);

        if (!motorista) {
            return res.status(404).json({ message: "Não foi encontrado nenhum motorista associado a este ônibus!" });
        }

        await motorista.destroy();
        res.status(200).json({ message: `Motorista com ID ${motorista.id} deletado com sucesso!` });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Erro ao deletar o motorista!" });
    }
};