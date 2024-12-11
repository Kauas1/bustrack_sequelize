import { DataTypes } from "sequelize";
import sequelize from "../configs/dbconfig.js";

const Motoristas = sequelize.define("Motorista", {
    motorista_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nome: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    data_nascimento: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    numero_carteira_habilitacao: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true,
    },
}, {
    tableName: "motoristas",
    timestamps: false,
});

export default Motoristas;
