import Linhas from "./models/linhasModel.js";
import Motoristas from "./models/motoristaModel.js";
import Onibus from "./models/onibusModel.js";

Linhas.hasMany(Onibus, { foreignKey: "id_linha", as: "onibus" });
Onibus.belongsTo(Linhas, { foreignKey: "id_linha", as: "linha" });

Motoristas.hasMany(Onibus, { foreignKey: "id_motorista", as: "onibus" });
Onibus.belongsTo(Motoristas, { foreignKey: "id_motorista", as: "motorista" });

export { Linhas, Motoristas, Onibus };
