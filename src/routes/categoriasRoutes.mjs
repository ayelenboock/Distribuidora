import express from "express";
import categoriasControllers from "../controllers/categoriasControllers.mjs";


const router = express.Router();

//Métodos GET
router.get('/', categoriasControllers.consultar)
//Método POST
router.post('/', categoriasControllers.ingresar) 

//Métodos con /:id 
router.route('/:id')
 .put(categoriasControllers.actualizar)  //Método  PUT

//Método Get id
 .get(categoriasControllers.consultarDetalle)

//Método PATCH
 .patch(categoriasControllers.actualizarParcial )

//Método DELETE
 .delete(categoriasControllers.eliminar)

export default router;