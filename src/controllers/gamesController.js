import connection from "../db/database.js";
import gameSchema from "../schemas/gameSchemas.js";


export const getGames = async (req, res) => { 
    const name = req.query.name;
    let game_list;
    try {
        if (name){
             game_list = await connection.query('SELECT * FROM games WHERE name=$1;',[name]);
        }
        else{
             game_list = await connection.query('SELECT * FROM games;');
        }
        
        res.status(200).send(game_list);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
}

export const createGames = async (req, res) => {
    const game_obj = req.body;
    
    const validation = gameSchema.validate(req.body, {
        abortEarly: false,
    });
    
    try {
        if (validation.error) {
            return res.status(400).send(validation.error.details);
        }
        const previos_category=await connection.query(`SELECT * FROM categories WHERE id = $1`,[game_obj.categoryId]);
        const previos_name=await connection.query(`SELECT * FROM games WHERE name = $1`,[game_obj.name]);
        
        //if (!previos_category) {
        //    return res.sendStatus(400);
        //}
        //if (previos_name) {
        //    return res.sendStatus(409);
        //}
        
        const InsertGame=await connection.query(`INSERT INTO games (name,image,"stockTotal","categoryId","pricePerDay") VALUES ($1,$2,$3,$4,$5)`,
        [game_obj.name,game_obj.image,game_obj.stockTotal,game_obj.categoryId,game_obj.pricePerDay]);
        res.sendStatus(201);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
}