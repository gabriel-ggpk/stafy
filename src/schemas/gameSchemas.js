import joi from "joi";

const gameSchema = joi
.object({
    name: joi.string().empty("").required(),
    image: joi.string().empty("").required(),
    stockTotal: joi.number().positive().greater(0).required(),
    categoryId: joi.number().positive().greater(0).required(),
    pricePerDay: joi.number().positive().greater(0).required(),
});


export default gameSchema;