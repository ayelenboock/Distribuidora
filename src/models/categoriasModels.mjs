import db from "../database/conexion.mjs";
class CategoriaModel{
    async obtenerTodos(){
        return await db.query(`SELECT* FROM categorias`);
    }
    async crear({nombre,descripcion}){
        return await db.query(
                `INSERT INTO categorias (nombre,descripcion) VALUES(?,?)`,
                [nombre,descripcion]
            );
    }
    async obtenerPorId(id){
        return await db.query (`SELECT * FROM categorias WHERE id_categoria= ?`, [id]);
    }
    async actualizar(id,{nombre,descripcion}){
        return await db.query(
                `UPDATE categorias SET nombre=?,descripcion=? WHERE id_categoria= ?`,
                [nombre,descripcion,id]
            );
    }
    async eliminar(id){
        return await db.query(
            `DELETE FROM categorias WHERE id_categoria = ?`,
            [id]
        );
    }
    async actualizarParcial(id,campos){
         //obtener las claves  valores enviados en el body
            const keys=Object.keys(campos);
            
            if (keys.length === 0){
                return res.status(400).json({error: "No se enviaron campos para actualizar"});
            }
            //Construir dinamicamente el SET de la consulta (ej: nombre=?)
            const setClause =keys.map(key => `${key} =?`).join(', ');
         
            const values =keys.map(key => campos[key]);
            
            //Agregar el id al final del array de valores para la clausula  WHERE
            values.push(id);
            return  await db.query(
                `UPDATE categorias SET ${setClause} WHERE id_categoria= ?`,
                values
            );
    }

}
export default new CategoriaModel();