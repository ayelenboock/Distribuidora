import db from "../database/conexion.mjs";

class ProductoModel {
    async obtenerTodos(){
        return await db.query(`SELECT * FROM productos`);
    }

    async crear({id_proveedor, id_categoria, nombre_producto, descripcion, precio, stock}){
        return await db.query(
            `INSERT INTO productos (id_proveedor, id_categoria, nombre_producto, descripcion, precio, stock) VALUES(?,?,?,?,?,?)`,
            [id_proveedor, id_categoria, nombre_producto, descripcion, precio, stock]
        );
    }

    async obtenerPorId(id){
        return await db.query(`SELECT * FROM productos WHERE id_producto = ?`, [id]);
    }

    async actualizar(id, {id_proveedor, id_categoria, nombre_producto, descripcion, precio, stock}){
        return await db.query(
            `UPDATE productos SET id_proveedor=?, id_categoria=?, nombre_producto=?, descripcion=?, precio=?, stock=? WHERE id_producto = ?`,
            [id_proveedor, id_categoria, nombre_producto, descripcion, precio, stock, id]
        );
    }

    async eliminar(id){
        return await db.query(`DELETE FROM productos WHERE id_producto = ?`, [id]);
    }

    async actualizarParcial(id, campos){
        const keys = Object.keys(campos);
        const setClause = keys.map(key => `${key} = ?`).join(', ');
        const values = keys.map(key => campos[key]);
       
        values.push(id);
        return await db.query(
            `UPDATE productos SET ${setClause} WHERE id_producto = ?`,
            values
        );
    }
}

export default new ProductoModel();
