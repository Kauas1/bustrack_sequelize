import { DataTypes } from "sequelize";
import sequelize from "../config/dbconfig.js";

const Onibus = sequelize.define("Onibus", {
    onibus_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    placa: {
        type: DataTypes.STRING(8),
        allowNull: false,
        unique: true,
    },
    modelo: {
        type: DataTypes.STRING(200),
        allowNull: false,
    },
    ano_fabricacao: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    capacidade: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    id_linha: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "linhas",
            key: "linha_id",
        },
    },
    id_motorista: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "motoristas",
            key: "motorista_id",
        },
    },
}, {
    tableName: "onibus",
    timestamps: false,
});

export default Onibus;