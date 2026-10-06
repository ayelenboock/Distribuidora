import db from "../database/conexion.mjs";
class PedidoModel{
    async obtenerTodos(){
        return await db.query(`SELECT* FROM pedidos`);
    }
    async crear({id_cliente, id_empleado, id_compania, total, estado}){
        return  await db.query(
                `INSERT INTO pedidos (id_cliente, id_empleado, id_compania, total, estado) VALUES(?,?,?,?,?)`,
                [id_cliente, id_empleado, id_compania, total, estado]
            );
    }
    async obtenerPorId(id){
        return await db.query (`SELECT * FROM pedidos WHERE id_pedido= ?`, [id]);
    }
    async actualizar(id,{id_cliente, id_empleado, id_compania, total, estado}){
        return await db.query(
            `UPDATE pedidos SET id_cliente=?, id_empleado=?, id_compania=?, total=?, estado=? WHERE id_pedido = ?`,
            [id_cliente, id_empleado, id_compania, total, estado, id]
        );

    }
    async eliminar(id){
        return await db.query(
            `DELETE FROM pedidos WHERE id_pedido = ?`,
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
        return await db.query(
            `UPDATE pedidos SET ${setClause} WHERE id_pedido = ?`,
            values
        );
        
    }

}
export default new PedidoModel();