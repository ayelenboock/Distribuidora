import db from "../database/conexion.mjs";
class CompaniaModel{
    async obtenerTodos(){
        return await db.query(`SELECT * FROM compania_envio`);
    }
    async crear({nombre, telefono, direccion}){
        return await db.query(
        `INSERT INTO compania_envio (nombre, telefono, direccion) VALUES (?, ?, ?)`,
        [nombre, telefono, direccion]
      );
      
    }
    async obtenerPorId(id){
        return await db.query(`SELECT * FROM compania_envio WHERE id_compania = ?`, [id]);
    }
    async actualizar(id,{nombre, telefono, direccion}){
        return await db.query(
        `UPDATE compania_envio SET nombre = ?, telefono = ?, direccion = ? WHERE id_compania = ?`,
        [nombre, telefono, direccion, id]
      );
    }
    async eliminar(id){
        return await db.query(`DELETE FROM compania_envio WHERE id_compania = ?`, [id]);
    }
    async actualizarParcial(id,campos){
        const keys = Object.keys(campos);
                const setClause = keys.map(key => `${key} = ?`).join(', ');
                const values = keys.map(key => campos[key]);
               
                values.push(id);
                return await db.query(
                    `UPDATE companias SET ${setClause} WHERE id_compania = ?`,
                    values
                );
            }
}

export default new CompaniaModel();