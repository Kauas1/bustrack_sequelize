import { Onibus, Motoristas, Linhas } from '../models/onibusModel.js'; 
import Motoristas from '../models/motoristaModel.js';
import Linhas from '../models/linhasModel.js';

export const listarOnibus = async (req, res) => {
    try {

        const onibus = await Onibus.findAll({
            include: [
                { model: Motoristas, as: 'motorista' },
                { model: Linhas, as: 'linha' }
            ]
        });
        res.status(200).json(onibus);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Erro ao buscar os dados!" });
    }
};


export const criarOnibus = async (req, res) => {
    const { placa, modelo, ano_fabricacao, capacidade, id_linha, id_motorista } = req.body;

    if (!placa || !modelo || !ano_fabricacao || !capacidade || !id_linha || !id_motorista) {
        return res.status(400).json({ message: "Todos os campos são obrigatórios!" });
    }

    try {
     
        const onibusExistente = await Onibus.findOne({ where: { placa } });
        if (onibusExistente) {
            return res.status(409).json({ message: "Este ônibus já existe!" });
        }

   
        await Onibus.create({
            placa,
            modelo,
            ano_fabricacao,
            capacidade,
            id_linha,
            id_motorista
        });

        res.status(201).json({ message: `Ônibus com a placa ${placa} foi cadastrado com sucesso!` });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Erro ao cadastrar o ônibus!" });
    }
};


export const listarOnibusPorId = async (req, res) => {
    const { id } = req.params;

    try {
        
        const onibus = await Onibus.findByPk(id, {
            include: [
                { model: Motoristas, as: 'motorista' },
                { model: Linhas, as: 'linha' }
            ]
        });

        if (!onibus) {
            return res.status(404).json({ message: "Não foi encontrado nenhum ônibus com este ID!" });
        }

        res.status(200).json(onibus);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Erro ao buscar os dados!" });
    }
};
