import {check} from "express-validator";

export const checkInput =
    [
        check('username', 'Имя пользователя не может быть пустым').notEmpty(),
        check('password', 'Пароль должен быть не менее 4 и не более 20 символов').isLength({ min: 4, max: 20 })
    ]