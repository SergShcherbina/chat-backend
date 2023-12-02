import express, {Router} from "express";
import {rootController} from "../controllers/rootController";

export const rootRouter: Router = express.Router()

rootRouter.get('/', rootController);
