import { Router } from "express";

const viewsRouters = Router();

viewsRouters.get('/', (req, res) => {
    res.render('index');
});

export default viewsRouters;