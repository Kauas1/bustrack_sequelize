import Linhas from "../models/linhasModel.js";
import sequelize from "../config/dbconfig.js";
import { Sequelize } from "sequelize";

export const listarLinhas = async (req, res) => {
    try {
        const linhas = await Linhas.findAll();
        res.status(200).json(linhas);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Erro ao buscar os dados!" });
    }
};

export const criarLinha = async (req, res) => {
    const { nome_linha, numero_linha, itinerario } = req.body;

    if (!nome_linha || !numero_linha || !itinerario) {
        return res.status(400).json({ message: "Todos os campos são obrigatórios!" });
    }

    try {
        const linhaExistente = await Linhas.findOne({
            where: {
                [Sequelize.Op.or]: [
                    { nome_linha },
                    { numero_linha }
                ]
            }
        });

        if (linhaExistente) {
            return res.status(404).json({ message: "Esta linha já existe!" });
        }

        await Linhas.create({ nome_linha, numero_linha, itinerario });
        res.status(201).json({ message: `A linha: ' ${nome_linha}'  foi cadastrada com sucesso!` });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Erro ao cadastrar a linha!" });
    }
};

export const listarLinhaId = async (req, res) => {
    const { id } = req.params;

    try {
        const linha = await Linhas.findByPk(id);

        if (!linha) {
            return res.status(404).json({ message: "Não foi encontrado nenhuma linha com este ID!" });
        }

        res.status(200).json(linha);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Erro ao buscar os dados!" });
    }
};


export const editarLinha = async (req, res) => {
    const { id } = req.params; 
    const { nome_linha, numero_linha, itinerario } = req.body;

    if (!nome_linha && !numero_linha && !itinerario) {
        return res.status(400).json({
            message: "Você deve passar algum dado a ser modificado: nome_linha, numero_linha ou itinerario!"
        });
    }

    try {
        const linha = await Linhas.findByPk(id);

        if (!linha) {
            return res.status(404).json({ message: "Não foi encontrado nenhuma linha com este ID!" });
        }

        const atualizacao = {
            nome_linha: nome_linha || linha.nome_linha,
            numero_linha: numero_linha || linha.numero_linha,
            itinerario: itinerario || linha.itinerario
        };

        if (numero_linha) {
            const linhaComNumero = await Linhas.findOne({
                where: { numero_linha, linha_id: { [Sequelize.Op.ne]: id } } 
            });

            if (linhaComNumero) {
                return res.status(400).json({ message: "Já existe uma linha com este número!" });
            }
        }

        await linha.update(atualizacao);

        res.status(200).json({ message: `A Linha ${atualizacao.nome_linha} foi atualizada com sucesso!` });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: `Erro ao atualizar a linha: ${err.message}` }); // Detalha o erro
    }
};
