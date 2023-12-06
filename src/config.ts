import dotenv from 'dotenv'
dotenv.config()

export const {secret} =  {secret: process.env.SECRET_KEY}