import { Sequelize } from "sequelize";
import { envs } from "../enviroments/enviroments.js";

export const sequelize= new Sequelize(envs.DB_URI, {
    logging: false
})

export const authenticated= async()=>{
    try {
        await sequelize.authenticate()
        console.log('connection ok');
    } catch (error) {
        console.log(error);
    }
}

export const synced= async()=>{
    try {
        await sequelize.sync()
        console.log('synced ok');
    } catch (error) {
        console.error(error);
    }
}
