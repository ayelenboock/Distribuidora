import db from "../database/conexion.mjs";
class EmpleadoModel{
    async obtenerTodos(){
        return await db.query(`SELECT* FROM empleados`);
    }
    async crear({nombre,apellido,fecha_de_nac,fecha_de_ingreso,dni,cuil,email,puesto}){
        return await db.query(
                `INSERT INTO empleados (nombre,apellido,fecha_de_nac,fecha_de_ingreso,dni,cuil,email,puesto) VALUES(?,?,?,?,?,?,?,?)`,
                [nombre,apellido,fecha_de_nac,fecha_de_ingreso,dni,cuil,email,puesto]
            );
    }
    async obtenerPorId(id){
        return await db.query (`SELECT * FROM empleados WHERE id_empleado= ?`, [id]);
    }
    async actualizar(id,{nombre, apellido, fecha_de_nac, fecha_de_ingreso, dni, cuil, email, puesto}){
        return await db.query(
            `UPDATE empleados SET nombre=?, apellido=?, fecha_de_nac=?, fecha_de_ingreso=?, dni=?, cuil=?, email=?, puesto=? WHERE id_empleado = ?`,
            [nombre, apellido, fecha_de_nac, fecha_de_ingreso, dni, cuil, email, puesto, id]
        );
    }
    async eliminar(id){
        return  await db.query(
            `DELETE FROM empleados WHERE id_empleado = ?`,
            [id]
        );
    }
    async actualizarParcial(id,campos){
        const keys = Object.keys(campos);
        
        if (keys.length === 0) {
            return res.status(400).json({ error: "No se enviaron campos para actualizar" });
        }

        const setClause = keys.map(key => `${key} = ?`).join(', ');

        const values = keys.map(key => campos[key]);
       
        values.push(id);
        return  await db.query(
            `UPDATE empleados SET ${setClause} WHERE id_empleado = ?`,
            values
        );
        
    }

}
export default new EmpleadoModel();