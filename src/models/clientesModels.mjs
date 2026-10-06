import db from "../database/conexion.mjs";
class ClienteModel{
    async obtenerTodos(){
        return await db.query(`SELECT* FROM clientes`);
    }
    async crear({nombre,apellido,cuit,razon_social,direccion,telefono,email,dni,condicion_iva}){
        return await db.query(
                `INSERT INTO clientes (nombre,apellido,cuit,razon_social,direccion,telefono,email,dni,condicion_iva) VALUES(?,?,?,?,?,?,?,?,?)`,
                [nombre,apellido,cuit,razon_social,direccion,telefono,email,dni,condicion_iva]
            );
    }
    async obtenerPorId(id){
        return await db.query (`SELECT * FROM clientes WHERE id_cliente= ?`, [id]);
    }
    async actualizar(id,{nombre,apellido ,cuit ,razon_social ,direccion ,telefono,email ,dni ,condicion_iva}){
        return await db.query(
            `UPDATE clientes SET nombre=?, apellido=?, cuit=?, razon_social=?, direccion=?, telefono=?, email=?, dni=?, condicion_iva=? WHERE id_cliente = ?`,
            [nombre,apellido ,cuit ,razon_social ,direccion ,telefono,email ,dni ,condicion_iva, id]
        );
    }
    async eliminar(id){
        return  await db.query(
                `DELETE FROM clientes WHERE id_cliente = ?`,
                [id]
            );
    }
    async actualizarParcial(id,campos){
         const keys=Object.keys(campos);
            
            if (keys.length === 0){
                return res.status(400).json({error: "No se enviaron campos para actualizar"});
            }
            //Construir dinamicamente el SET de la consulta (ej: nombre=?)
            const setClause =keys.map(key => `${key} =?`).join(', ');
            const values =keys.map(key => campos[key]);
            
            //Agregar el id al final del array de valores para la clausula  WHERE
            values.push(id);
            return await db.query(
                `UPDATE clientes SET ${setClause} WHERE id_cliente= ?`,
                values
            );
    }

}
export default new ClienteModel();