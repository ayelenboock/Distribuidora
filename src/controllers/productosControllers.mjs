import productosModels from "../models/productosModels.mjs";
class ProductosController {
    constructor (){}

    async consultar(req,res) {
        try{
            const [filas] = await productosModels.obtenerTodos();
            res.status(200).json({
                total: filas.length,
                productos: filas
            });
        } catch (err){
            res.status(500).json({error: err.message});
        }
    }

    async ingresar(req,res){
        try{
            const { id_proveedor, id_categoria, nombre_producto, descripcion, precio, stock } = req.body;
            if ( !id_proveedor || !id_categoria || !nombre_producto || !descripcion || !precio || !stock ){
                return res.status(400).json({error: 'Faltan Campos Obligatorios'});
            }
            const [resultado] = await productosModels.crear({id_proveedor, id_categoria, nombre_producto, descripcion, precio, stock});
            res.status(201).json({
                mensaje: 'Producto creado con éxito',
                id: resultado.insertId
            });
        } catch(err){
            if(err.code === `ER_DUP_ENTRY`){
                return res.status(400).json({error: 'El producto ya se encuentra registrado'});
            }
            res.status(500).json({error: err.message});
        }
    }

    async consultarDetalle(req,res) {
        try{
            const { id } = req.params;
            const [filas] = await productosModels.obtenerPorId(id);
            if(filas.length === 0){
                return res.status(404).json({error: "Producto no encontrado"});
            }
            res.status(200).json(filas[0]);
        } catch(err){
            res.status(500).json({error: err.message});
        }
    }

    async actualizar(req, res) {
        try {
            const { id } = req.params;
            const { id_proveedor, id_categoria, nombre_producto, descripcion, precio, stock } = req.body;

            if (!id_proveedor || !id_categoria || !nombre_producto || precio === undefined || stock === undefined) {
                return res.status(400).json({ error: "Faltan campos obligatorios" });
            }
            
            // CORREGIDO: Ya no pasamos 'id' dentro del objeto
            const [resultado] = await productosModels.actualizar(id, {id_proveedor, id_categoria, nombre_producto, descripcion, precio, stock});

            if (resultado.affectedRows === 0) {
                return res.status(404).json({ error: "Producto no encontrado" });
            }

            const [filas] = await productosModels.obtenerPorId(id);
            
            res.status(200).json({
                mensaje: "Producto actualizado con éxito",
                producto: filas[0]
            });
            
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }  

    async actualizarParcial(req,res){
        try{
            const { id } = req.params;
            const campos = req.body;
            
            // CORREGIDO: Validación de campos vacíos se hace en el controlador
            if (Object.keys(campos).length === 0){
                return res.status(400).json({error: "No se enviaron campos para actualizar"});
            }

            const [resultado] = await productosModels.actualizarParcial(id, campos);
            if(resultado.affectedRows === 0){
                return res.status(404).json({error: "Producto no encontrado"});
            }
            const [filas] = await productosModels.obtenerPorId(id);
            res.status(200).json({
                mensaje: "Producto actualizado parcialmente con éxito",
                producto: filas[0]
            });

        } catch(err){
            if (err.code === `ER_DUP_ENTRY`){
                return res.status(400).json({error: "El producto ya se encuentra registrado"});
            }
            res.status(500).json({error: err.message});
        }
    }  

    async eliminar(req, res) {
        try {
            const { id } = req.params;
            const [resultado] = await productosModels.eliminar(id);
    
            // CORREGIDO: Cambiado "Proveedor" por "Producto"
            if (resultado.affectedRows === 0) {
                return res.status(404).json({ error: "Producto no encontrado para eliminar" });
            }
    
            res.status(200).json({ mensaje: "Producto eliminado con éxito" });
    
        } catch (err) {
            if (err.code === 'ER_ROW_IS_REFERENCED_2' || err.code === 'ER_ROW_IS_REFERENCED') {
                return res.status(400).json({ 
                    error: "No se puede eliminar este registro porque tiene información asociada en otras tablas (ej. pedidos o detalles)" 
                });
            }
            res.status(500).json({ error: err.message });
        }
    }
}

export default new ProductosController();
