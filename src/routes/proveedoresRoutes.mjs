import express from "express";
import ProveedoresController from "../controllers/proveedoresControllers.mjs";

const router = express.Router();

//Métodos GET
router.get('/', ProveedoresController.consultar)
//Método POST
router.post('/', ProveedoresController.ingresar) 

//Métodos con /:id 
router.route('/:id')
 .put(ProveedoresController.actualizar)  //Método  PUT

//Método Get id
 .get(ProveedoresController.consultarDetalle)

//Método PATCH
 .patch(ProveedoresController.actualizarParcial )

//Método DELETE
 .delete(ProveedoresController.eliminar)

export default router;