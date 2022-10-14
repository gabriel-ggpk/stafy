import categorieSchema from "../schemas/categorySchemas.js";
import connection from "../db/database.js";

export const getCategory = async (req, res) => {
    try {
        const categories_list = await connection.query('SELECT * FROM categories;');

        res.status(200).send(categories_list.rows);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
}
export const createCategory = async (req, res) => {
    const name = req.body;
    
    const validation = categorieSchema.validate(req.body, {
        abortEarly: false,
    });

    try {
        if (validation.error) {
            return res.status(400).send(validation.error.details);
        }
        const previos_name=await connection.query("SELECT * FROM categories WHERE name=$1",[name.name]);

        if (previos_name.rowCount) {
            return res.sendStatus(409);
        }

        const InsertName=await connection.query("INSERT INTO categories (name) VALUES ($1)",[name.name]);

        res.sendStatus(201);
    } catch (err) {
        console.error(name.name);
        res.sendStatus(500);
    }
}




