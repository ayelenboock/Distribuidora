import proveedoresModels from "../models/proveedoresModels.mjs";
class ProveedoresController {
    constructor (){}
    async consultar(req,res) {
        try{
            const[filas]= await proveedoresModels.obtenerTodos();
            res.status(200).json({
                total: filas.length,
                proveedores:filas
            });
        }catch (err){
            res.status(500).json({error:err.message});
        }
   
    }
    async ingresar(req,res){
        try{
            const {razon_social,nombre_contacto,telefono, email,direccion,condicion_iva} = req.body;
            if ( !razon_social || !nombre_contacto || !telefono || ! email || !direccion || !condicion_iva ){
                return res.status(400).json({error: 'Faltan Campos Obligatorios'});
                }
            const [resultado]= await proveedoresModels.crear({razon_social,nombre_contacto,telefono, email,direccion,condicion_iva});
            res.status(201).json({
                mensaje:'Proveedor creado con éxito',
                id:resultado.insertId  //mandar el ID
            });
            } catch(err){
                if(err.code === `ER_DUP_ENTRY`){
                    return res.status(400).json({error:'El Proveedor ya se encuentra registrado'});
                    }
                    res.status(500).json({error: err.message});
                    }
                    }


    async consultarDetalle(req,res) {
        try{
            const{id}=req.params;
            const[filas]=await proveedoresModels.obtenerPorId(id);
            if(filas.length === 0){
                return res.status(404).json({error: "Proveedor no encontrado"});
            }
            res.status(200).json(filas[0]);
        }catch(err){
            res.status(500).json({error: err.message});
        }
    }
    async actualizar(req, res) {
    try {
        const { id } = req.params;
        const { razon_social, nombre_contacto, telefono, email, direccion, condicion_iva } = req.body;

        if (!razon_social || !nombre_contacto || !telefono || !email || !direccion || !condicion_iva) {
            return res.status(400).json({ error: "Faltan campos obligatorios" });
        }

        const [resultado] = await proveedoresModels.actualizar(id,{razon_social, nombre_contacto, telefono, email, direccion, condicion_iva});

        if (resultado.affectedRows === 0) {
            return res.status(404).json({ error: "Proveedor no encontrado" });
        }

        const [filas] = await proveedoresModels.obtenerPorId(id);
        
        res.status(200).json({
            mensaje: "Proveedor actualizado con éxito",
            proveedor: filas[0]
        });
        
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
    }
    async actualizarParcial(req,res){
        try{
            const {id}= req.params;
            const campos =req.body;
           // console.log('Campos: ',campos);

            //UPDATE proveedores SET nombre=?

            const [resultado] = await proveedoresModels.actualizarParcial(id, campos);
            if(resultado.affectedRows === 0){
                return res.status(404).json({error: "Proveedor no encontrado"});
            }
            const [filas] = await proveedoresModels.obtenerPorId(id);
            res.status(200).json({
                mensaje: "Proveedor actualizado parcialmente con éxito",
                proveedor: filas[0]
            });

        }catch(err){
            if (err.code === `ER_DUP_ENTRY`){
                return res.status(400).json({error: "El proveedor ya se encuentra registrado"});
            }
            res.status(500).json({error:err.message});
        }
   
    }

    async eliminar(req, res) {
    try {
        const { id } = req.params;

        const [resultado] = await proveedoresModels.eliminar(id);

        // Si no afectó filas, es porque el registro no existía en la base de datos
        if (resultado.affectedRows === 0) {
            return res.status(404).json({ error: "Proveedor no encontrado para eliminar" });
        }

        res.status(200).json({ mensaje: "Proveedor eliminado con éxito" });

    } catch (err) {
        // si el registro está siendo usado en otra tabla (llave foránea)
        if (err.code === 'ER_ROW_IS_REFERENCED_2' || err.code === 'ER_ROW_IS_REFERENCED') {
            return res.status(400).json({ 
                error: "No se puede eliminar este registro porque tiene información asociada en otras tablas (ej. pedidos o productos)" 
            });
        }
        res.status(500).json({ error: err.message });
    }
 }

}
export default new ProveedoresController();