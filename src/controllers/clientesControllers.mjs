import clientesModels from "../models/clientesModels.mjs";
class ClientesController {
    constructor (){}
    async consultar(req,res) {
        try{
            const[filas]=await clientesModels.obtenerTodos();
            res.status(200).json({
                total: filas.length,
                clientes:filas
            });
        }catch (err){
            res.status(500).json({error:err.message});
        }
   
    }

    async ingresar(req,res){
        try{
            const {nombre,apellido,cuit,razon_social,direccion,telefono,email,dni,condicion_iva} = req.body;
            if ( !nombre||!apellido || !cuit || !razon_social || !direccion || !telefono || !email || !dni || !condicion_iva){
                return res.status(400).json({error: 'Faltan Campos Obligatorios'});
                }
            const [resultado]= await clientesModels.crear({nombre,apellido,cuit,razon_social,direccion,telefono,email,dni,condicion_iva});
            res.status(201).json({
                mensaje:'Cliente creado con éxito',
                id:resultado.insertId  //mandar el ID
            });
            } catch(err){
                if(err.code === `ER_DUP_ENTRY`){
                    return res.status(400).json({error:'Este cliente ya está cargado'});
                    }
                    res.status(500).json({error: err.message});
                    }
                    }
    async consultarDetalle(req,res) {
        try{
            const{id}=req.params;
            const[filas]=await clientesModels.obtenerPorId(id);
            if(filas.length === 0){
                return res.status(404).json({error: "Cliente no encontrado"});
            }
            res.status(200).json(filas[0]);
        }catch(err){
            res.status(500).json({error: err.message});
        }
    }
    async actualizar(req, res) {
    try {
        const { id } = req.params;
        const { nombre,apellido,cuit,razon_social,direccion,telefono,email,dni,condicion_iva } = req.body;

        if (!nombre||!apellido || !cuit || !razon_social || !direccion || !telefono || !email || !dni || !condicion_iva) {
            return res.status(400).json({ error: "Faltan campos obligatorios" });
        }

        
        const [resultado] = await clientesModels.actualizar(id,{nombre,apellido ,cuit ,razon_social ,direccion ,telefono,email ,dni ,condicion_iva});

        if (resultado.affectedRows === 0) {
            return res.status(404).json({ error: "cliente no encontrado" });
        }

        const [filas] = await clientesModels.obtenerPorId(id);
        
        res.status(200).json({
            mensaje: "Cliente actualizado con éxito",
            cliente: filas[0]
        });
        
    } catch (err) {
        res.status(500).json({ error: err.message });
     }
    }  
    async actualizarParcial(req,res){
        try{
            const {id}= req.params;
            const campos =req.body;
           
            //UPDATE clientes SET nombre=?

            const [resultado] = await clientesModels.actualizarParcial(id,campos);
            if(resultado.affectedRows === 0){
                return res.status(404).json({error: "Cliente no encontrado"});
            }
            const [filas] =await clientesModels.obtenerPorId(id);
            res.status(200).json({
                mensaje: "Cliente actualizado parcialmente con éxito",
                cliente: filas[0]
            });

        }catch(err){
            if (err.code === `ER_DUP_ENTRY`){
                return res.status(400).json({error: "El cliente ya se encuentra registrado"});
            }
            res.status(500).json({error:err.message});
        }
   
    }
    async eliminar(req, res) {
        try {
            const { id } = req.params;
            
            const [resultado] = await clientesModels.eliminar(id);
    
            // Si no afectó filas, es porque el registro no existía en la base de datos
            if (resultado.affectedRows === 0) {
                return res.status(404).json({ error: "Cliente no encontrado para eliminar" });
            }
    
            res.status(200).json({ mensaje: "Cliente eliminado con éxito" });
    
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
export default new ClientesController();