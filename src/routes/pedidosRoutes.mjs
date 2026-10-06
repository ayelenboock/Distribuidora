import express from "express";
import pedidosControllers from "../controllers/pedidosControllers.mjs";


const router = express.Router();

//Métodos GET
router.get('/', pedidosControllers.consultar)
//Método POST
router.post('/', pedidosControllers.ingresar) 

//Métodos con /:id 
router.route('/:id')
 .put(pedidosControllers.actualizar)  //Método  PUT

//Método Get id
 .get(pedidosControllers.consultarDetalle)

//Método PATCH
 .patch(pedidosControllers.actualizarParcial )

//Método DELETE
 .delete(pedidosControllers.eliminar)

export default router;