import companiasModels from "../models/companiasModels.mjs";

class CompaniasController {
  constructor() {}

  // GET /api/companias
  async consultar(req, res) {
    try {
      const [filas] = await companiasModels.obtenerTodos();
      res.status(200).json({
        total: filas.length,
        companias: filas
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  // POST /api/companias
  async ingresar(req, res) {
    try {
      const { nombre, telefono, direccion } = req.body;
      if (!nombre) {
        return res.status(400).json({ error: 'El campo nombre es obligatorio' });
      }
      
      const [resultado] = await companiasModels.crear({nombre, telefono, direccion});
      res.status(201).json({
        mensaje: 'Compañía de envío creada con éxito',
        id: resultado.insertId
      });
    } catch (err) {
      if (err.code === 'ER_DUP_ENTRY') {
        return res.status(400).json({ error: 'La compañía ya se encuentra registrada' });
      }
      res.status(500).json({ error: err.message });
    }
  }

  // GET /api/companias/:id
  async consultarDetalle(req, res) {
    try {
      const { id } = req.params;
      const [filas] = await companiasModels.obtenerPorId(id);
      if (filas.length === 0) {
        return res.status(404).json({ error: "Compañía no encontrada" });
      }
      res.status(200).json(filas[0]);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  // PUT /api/companias/:id
  async actualizar(req, res) {
    try {
      const { id } = req.params;
      const { nombre, telefono, direccion } = req.body;
      if (!nombre || !telefono|| !direccion) {
        return res.status(400).json({ error: "El campo nombre es obligatorio" });
      }
      const [resultado] = await companiasModels.actualizar(id, {nombre, telefono, direccion});
      if (resultado.affectedRows === 0) {
                  return res.status(404).json({ error: "Compañia de Envio no encontrada" });
              }
      
              const [filas] = await companiasModels.obtenerPorId(id);
              
              res.status(200).json({
                  mensaje: "Compañia de Envio actualizada con éxito",
                  proveedor: filas[0]
              });
              
          } catch (err) {
              res.status(500).json({ error: err.message });
          }
          }

  // PATCH /api/companias/:id
  async actualizarParcial(req, res) {
    try{
               const { id } = req.params;
               const campos = req.body;
               
               // CORREGIDO: Validación de campos vacíos se hace en el controlador
               if (Object.keys(campos).length === 0){
                   return res.status(400).json({error: "No se enviaron campos para actualizar"});
               }
   
               const [resultado] = await companiasModels.actualizarParcial(id, campos);
               if(resultado.affectedRows === 0){
                   return res.status(404).json({error: "La Compañia de Envio no encontrada"});
               }
               const [filas] = await companiasModels.obtenerPorId(id);
               res.status(200).json({
                   mensaje: "La Compañia de Envio actualizada parcialmente con éxito",
                   compania: filas[0]
               });
   
           } catch(err){
               if (err.code === `ER_DUP_ENTRY`){
                   return res.status(400).json({error: "La Compañia de Envio ya se encuentra registrada"});
               }
               res.status(500).json({error: err.message});
           }
       }  

  // DELETE /api/companias/:id
  async eliminar(req, res) {
    try {
      const { id } = req.params;
      const [resultado] = await companiasModels.eliminar(id);
      
      if (resultado.affectedRows === 0) {
        return res.status(404).json({ error: "Registro no encontrado para eliminar" });
      }
      res.status(200).json({ mensaje: "Compañía eliminada con éxito" });
    } catch (err) {
      if (err.code === 'ER_ROW_IS_REFERENCED_2' || err.code === 'ER_ROW_IS_REFERENCED') {
        return res.status(400).json({
          error: "No se puede eliminar porque esta compañía tiene pedidos asociados"
        });
      }
      res.status(500).json({ error: err.message });
    }
  }
}

export default new CompaniasController();
