import express from "express";
import productosControllers from "../controllers/productosControllers.mjs";

const router = express.Router();

//Métodos GET
router.get('/',productosControllers.consultar)
//Método POST
router.post('/',productosControllers.ingresar) 

//Métodos con /:id 
router.route('/:id')
 .put(productosControllers.actualizar)  //Método  PUT

//Método Get id
 .get(productosControllers.consultarDetalle)

//Método PATCH
 .patch(productosControllers.actualizarParcial )

//Método DELETE
 .delete(productosControllers.eliminar)

export default router;