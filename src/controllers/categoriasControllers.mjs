import categoriasModels from "../models/categoriasModels.mjs";
class CategoriasController {
    constructor (){}
    async consultar(req,res) {
        try{
            const[filas]=await categoriasModels.obtenerTodos();
            res.status(200).json({
                total: filas.length,
                categorias:filas
            });
        }catch (err){
            res.status(500).json({error:err.message});
        }
   
    }
    async ingresar(req,res){
        try{
            const {nombre,descripcion} = req.body;
            if ( !nombre|| !descripcion){
                return res.status(400).json({error: 'Faltan Campos Obligatorios'});
                }
            const [resultado]= await categoriasModels.crear({nombre,descripcion});
            res.status(201).json({
                mensaje:'La categoria ha sido creada con éxito',
                id:resultado.insertId  //mandar el ID
            });
            } catch(err){
                if(err.code === `ER_DUP_ENTRY`){
                    return res.status(400).json({error:'La categoria ya se encuentra registrado'});
                    }
                    res.status(500).json({error: err.message});
                    }
                    }


    async consultarDetalle(req,res) {
        try{
            const{id}=req.params;
            const[filas]=await categoriasModels.obtenerPorId(id);
            if(filas.length === 0){
                return res.status(404).json({error: "Categoria no encontrado"});
            }
            res.status(200).json(filas[0]);
        }catch(err){
            res.status(500).json({error: err.message});
        }
    }
    async actualizarParcial(req,res){
        try{
            const {id}= req.params;
            const campos =req.body;
            const [resultado] =await categoriasModels.actualizarParcial(id,campos);
            if(resultado.affectedRows === 0){
                return res.status(404).json({error: "Categoria no encontrada"});
            }
            const [filas] = await categoriasModels.obtenerPorId(id);
            res.status(200).json({
                mensaje: "Categoria actualizada parcialmente con éxito",
                categoria: filas[0]
            });

        }catch(err){
            if (err.code === `ER_DUP_ENTRY`){
                return res.status(400).json({error: "La categoria ya se encuentra registrada"});
            }
            res.status(500).json({error:err.message});
        }
   
    }

    async actualizar(req,res){
        try{
            const {id} = req.params;
            const {nombre,descripcion}= req.body;

            if(!nombre||!descripcion){
                return res.status(400).json({error: "Faltan campos obligatorios"});
            }
            const [resultado]= await categoriasModels.actualizar(id,{nombre,descripcion});
            if (resultado.affectedRows === 0){
                return res.status(404).json({error: "Categoria no encontrada"});
            }
                const [filas] = await categoriasModels.obtenerPorId(id);
                res.status(200).json({
                    mensaje: "Categoria actualizada con éxito",
                    categoria: filas[0]
                });
            }catch (err){
                res.status(500).json({error: err.message});
            }
        }
    
    async eliminar(req, res) {
    try {
        const { id } = req.params;

        
        const [resultado] = await categoriasModels.eliminar(id);

        // Si no afectó filas, es porque el registro no existía en la base de datos
        if (resultado.affectedRows === 0) {
            return res.status(404).json({ error: "Categoria no encontrada para eliminar" });
        }

        res.status(200).json({ mensaje: "Categoria eliminada con éxito" });

    } catch (err) {
        //  si el registro está siendo usado en otra tabla (llave foránea)
        if (err.code === 'ER_ROW_IS_REFERENCED_2' || err.code === 'ER_ROW_IS_REFERENCED') {
            return res.status(400).json({ 
                error: "No se puede eliminar esta categoria porque tiene información asociada en otras tablas (ej. pedidos o productos)" 
            });
        }
        res.status(500).json({ error: err.message });
    }
}

}
export default new CategoriasController();