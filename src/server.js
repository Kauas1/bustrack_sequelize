import express from "express";
import sequelize from "./config/dbconfig.js";
import bodyParser from "body-parser";
import linhasRoutes from "./routes/linhasRoutes.js";
import motoristaRoutes from "./routes/motoristaRoutes.js";
import onibusRoutes from "./routes/onibusRoutes.js";
import "./associations.js"; // Importa e inicializa as associações

const app = express();
const PORT = 3333;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/linhas', linhasRoutes);
app.use('/motorista', motoristaRoutes);
app.use('/onibus', onibusRoutes);
app.use((req, res) => {
    res.status(404).json({ message: "Page Not Found" });
});

sequelize.sync().then(() => {
    console.log('Database connected!');
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}).catch(error => {
    console.error('Unable to connect to the database:', error);
});
