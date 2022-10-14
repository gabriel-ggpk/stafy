import joi from "joi";

const categorieSchema = joi
.object({
    name: joi.string().empty("").required(),
});


export default categorieSchema;