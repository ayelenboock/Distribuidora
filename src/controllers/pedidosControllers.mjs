import pedidosModels from "../models/pedidosModels.mjs";
class PedidosController {
    constructor (){}
    async consultar(req,res) {
        try{
            const[filas]=pedidosModels.obtenerTodos();
            res.status(200).json({
                total: filas.length,
                pedidos:filas
            });
        }catch (err){
            res.status(500).json({error:err.message});
        }
   
    }

    async ingresar(req,res){
        try{
            const {id_cliente, id_empleado, id_compania, total, estado} = req.body;
            if ( !id_cliente|| !id_empleado|| !id_compania || !total|| !estado){
                return res.status(400).json({error: 'Faltan Campos Obligatorios'});
                }
            const [resultado]=await pedidosModels.crear({id_cliente, id_empleado, id_compania, total, estado});
            res.status(201).json({
                mensaje:'Pedido creado con éxito',
                id:resultado.insertId  //mandar el ID
            });
            } catch(err){
                if(err.code === `ER_DUP_ENTRY`){
                    return res.status(400).json({error:'El pedido ya se encuentra registrado'});
                    }
                    res.status(500).json({error: err.message});
                    }
                    }
    async consultarDetalle(req,res) {
        try{
            const{id}=req.params;
            const[filas]=await pedidosModels.obtenerPorId(id);
            if(filas.length === 0){
                return res.status(404).json({error: "Pedido no encontrado"});
            }
            res.status(200).json(filas[0]);
        }catch(err){
            res.status(500).json({error: err.message});
        }
    }
    async actualizar(req, res) {
    try {
        const { id } = req.params;
        const {id_cliente, id_empleado, id_compania, total, estado } = req.body;
        if (!id_cliente||  !id_empleado|| !id_compania|| !total|| !estado) {
            return res.status(400).json({ error: "Faltan campos obligatorios" });
        }

        const [resultado] = await pedidosModels.actualizar(id,{id_cliente, id_empleado, id_compania, total, estado});
        if (resultado.affectedRows === 0) {
            return res.status(404).json({ error: "Pedido no encontrado" });
        }

        const [filas] = await pedidosModels.obtenerPorId(id);
        
        res.status(200).json({
            mensaje: "Pedido actualizado con éxito",
            pedido: filas[0] 
        });
        
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}  

async actualizarParcial(req, res) {
    try {
        const { id } = req.params;
        const campos = req.body;  

        const [resultado] = await pedidosModels.actualizarParcial(id,campos);
        if (resultado.affectedRows === 0) {
            return res.status(404).json({ error: "Pedido no encontrado" });
        }
        
        const [filas] = await pedidosModels.obtenerPorId(id);
        res.status(200).json({
            mensaje: "Pedido actualizado parcialmente con éxito",
            pedido: filas[0]
        });

    }catch(err){
        if (err.code === 'ER_DUP_ENTRY') {
            return res.status(400).json({ error: "El pedido ya se encuentra registrado" });
        }
        res.status(500).json({ error: err.message });
    }    
    }
    async eliminar(req, res) {
    try {
        const { id } = req.params;
        
        const [resultado] = pedidosModels.eliminar(id);

        // Si no afectó filas, es porque el registro no existía en la base de datos
        if (resultado.affectedRows === 0) {
            return res.status(404).json({ error: "Pedido no encontrado para eliminar" });
        }

        res.status(200).json({ mensaje: "Pedido eliminado con éxito" });

    } catch (err) {
        //  si el registro está siendo usado en otra tabla (llave foránea)
        if (err.code === 'ER_ROW_IS_REFERENCED_2' || err.code === 'ER_ROW_IS_REFERENCED') {
            return res.status(400).json({ 
                error: "No se puede eliminar este registro porque tiene información asociada en otras tablas (ej. pedidos o productos)" 
            });
        }
        res.status(500).json({ error: err.message });
    }
 }

}
export default new PedidosController();