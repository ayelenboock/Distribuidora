import db from "../database/conexion.mjs";
class ProveedorModel{
    async obtenerTodos(){
        return await db.query(`SELECT * FROM proveedores`);
    }
    async crear({razon_social,nombre_contacto,telefono, email,direccion,condicion_iva}){
        return await db.query(
                `INSERT INTO proveedores (razon_social,nombre_contacto,telefono, email,direccion,condicion_iva) VALUES(?,?,?,?,?,?)`,
                [razon_social,nombre_contacto,telefono, email,direccion,condicion_iva]
            );
    }
    async obtenerPorId(id){
        return await db.query (`SELECT * FROM proveedores WHERE id_proveedor= ?`, [id]);
    }
    async actualizar(id,{razon_social, nombre_contacto, telefono, email, direccion, condicion_iva}){
        return await db.query(
            `UPDATE proveedores SET razon_social = ?, nombre_contacto = ?, telefono = ?, email = ?, direccion = ?, condicion_iva = ? WHERE id_proveedor = ?`,
            [razon_social, nombre_contacto, telefono, email, direccion, condicion_iva, id]
        );
    }
    async eliminar(id){
        return await db.query(
            `DELETE FROM proveedores WHERE id_proveedor = ?`,
            [id]
        );
    }
    async actualizarParcial(id, campos){
         //obtener las claves  valores enviados en el body
            const keys=Object.keys(campos);
            //console.log(`Keys: ${keys}`)
            
            if (keys.length === 0){
                return res.status(400).json({error: "No se enviaron campos para actualizar"});
            }
            //Construir dinamicamente el SET de la consulta (ej: nombre=?)
            const setClause =keys.map(key => `${key} =?`).join(', ');
            //console.log(`setClause: ${setClause}`)

            const values =keys.map(key => campos[key]);
            //console.log(`values: ${values}`)

            //Agregar el id al final del array de valores para la clausula  WHERE
            values.push(id);
            return await  db.query(
                `UPDATE proveedores SET ${setClause} WHERE id_proveedor= ?`,
                values
            );
    }

}
export default new ProveedorModel();