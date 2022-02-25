import { Sequelize } from "sequelize";


export default new Sequelize({
    host: process.env.DB_HOST,
    database: process.env.DB_NAME, 
    port: 3306,
    password: process.env.DB_PASSWORD,
    username: process.env.DB_USER,
    dialect: "mysql"


});



