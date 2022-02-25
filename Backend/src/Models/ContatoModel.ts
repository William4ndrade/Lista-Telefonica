import exp from "constants";
import { DataTypes, DATE, INTEGER } from "sequelize";
import Db from "../DataBase/Db";


const ContatoModel =  Db.define("Contato", {
    ID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        unique: true,
        primaryKey: true
    },

    NOME: {
        type: DataTypes.STRING,
        allowNull: false
    },

    EMAIL: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true

    },

    TELEFONE: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true

    },

    IMAGE_URL: {
        type: DataTypes.STRING,
        allowNull: false
    }
})


export default ContatoModel;