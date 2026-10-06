import express from "express";
import clientesControllers from "../controllers/clientesControllers.mjs";


const router = express.Router();

//Métodos GET
router.get('/', clientesControllers.consultar)
//Método POST
router.post('/', clientesControllers.ingresar) 

//Métodos con /:id 
router.route('/:id')
 .put(clientesControllers.actualizar)  //Método  PUT

//Método Get id
 .get(clientesControllers.consultarDetalle)

//Método PATCH
 .patch(clientesControllers.actualizarParcial )

//Método DELETE
 .delete(clientesControllers.eliminar)

export default router;