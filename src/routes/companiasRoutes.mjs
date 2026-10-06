import express from "express";
import companiasControllers from "../controllers/companiasControllers.mjs";


const router = express.Router();

//Métodos GET
router.get('/', companiasControllers.consultar)
//Método POST
router.post('/', companiasControllers.ingresar) 

//Métodos con /:id 
router.route('/:id')
 .put(companiasControllers.actualizar)  //Método  PUT

//Método Get id
 .get(companiasControllers.consultarDetalle)

//Método PATCH
 .patch(companiasControllers.actualizarParcial )

//Método DELETE
 .delete(companiasControllers.eliminar)

export default router;