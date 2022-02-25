import dotenv from "dotenv";
dotenv.config({
    path: __dirname + "/../.env"
})
 
import  App from "./App";
import Db from "./DataBase/Db";

const PORT = process.env.PORT || 3000

App.listen(PORT, async () => {

    await Db.sync()
    console.log(`Running on ${PORT}`)

});





