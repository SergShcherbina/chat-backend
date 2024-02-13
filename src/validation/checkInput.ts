import {check} from "express-validator";

export const checkInput =
    [
        check('username', 'Имя пользователя не может быть пустым').trim().notEmpty().toLowerCase(),
        check('password', 'Пароль должен быть не менее 4 и не более 20 символов').trim().isLength({ min: 4, max: 20 })
    ]