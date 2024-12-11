import Onibus from '../models/onibusModel.js'; 
import Motoristas from '../models/motoristaModel.js';
import Linhas from '../models/linhasModel.js';

export const listarOnibus = async (req, res) => {
    try {
        const onibus = await Onibus.findAll({
            include: [
                {
                    model: Motoristas,
                    as: "motorista",
                    attributes: ["motorista_id", "nome", "numero_carteira_habilitacao"],
                },
                {
                    model: Linhas,
                    as: "linha",
                    attributes: ["linha_id", "nome_linha", "itinerario"],
                },
            ],
            attributes: ["onibus_id", "placa", "modelo", "ano_fabricacao", "capacidade"],
        });

        if (!onibus || onibus.length === 0) {
            return res.status(404).json({ message: "Nenhum ônibus encontrado!" });
        }

        res.status(200).json(onibus);
    } catch (err) {
        console.error("Erro ao buscar os dados:", err.message, err.stack);
        res.status(500).json({ message: "Erro ao buscar os dados. Verifique os logs para mais detalhes." });
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
export const editarOnibus = async (req, res) => {
    const { id } = req.params;
    const { placa, modelo, ano_fabricacao, capacidade, id_linha, id_motorista } = req.body;

    if (!placa && !modelo && !ano_fabricacao && !capacidade && !id_linha && !id_motorista) {
        return res.status(400).json({
            message: "Você deve passar algum dado a ser modificado: placa, modelo, ano_fabricacao, capacidade, id_linha ou id_motorista!"
        });
    }

    try {
        const onibus = await Onibus.findByPk(id);

        if (!onibus) {
            return res.status(404).json({ message: "Ônibus não encontrado!" });
        }

        const atualizacao = {
            placa: placa || onibus.placa,
            modelo: modelo || onibus.modelo,
            ano_fabricacao: ano_fabricacao || onibus.ano_fabricacao,
            capacidade: capacidade || onibus.capacidade,
            id_linha: id_linha || onibus.id_linha,
            id_motorista: id_motorista || onibus.id_motorista
        };

        await onibus.update(atualizacao);

        res.status(200).json({ message: `Ônibus ${atualizacao.placa} atualizado com sucesso!` });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Erro ao atualizar ônibus!" });
    }
};
