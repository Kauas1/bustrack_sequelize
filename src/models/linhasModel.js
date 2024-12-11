import { DataTypes } from "sequelize";
import sequelize from "../config/dbconfig.js";


const Linhas = sequelize.define("Linha", {
    linha_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nome_linha: {
        type: DataTypes.STRING(60),
        allowNull: false,
    },
    numero_linha: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    itinerario: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
}, {
    tableName: "linhas",
    timestamps: false,
});



export default Linhas;
