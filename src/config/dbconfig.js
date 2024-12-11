import { Sequelize } from "sequelize";

const sequelize = new Sequelize(
    "bustrack",
    "root",
    "142536Al*",
    {
        host: "localhost",
        dialect: "mysql"
    }
)

export default sequelize;