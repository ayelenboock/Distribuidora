
import express from "express";
import proveedoresRoutes from './routes/proveedoresRoutes.mjs';
import clientesRoutes from './routes/clientesRoutes.mjs';
import productosRoutes from './routes/productosRoutes.mjs';
import empleadosRoutes from "./routes/empleadosRoutes.mjs";
import pedidosRoutes from "./routes/pedidosRoutes.mjs";
import categoriasRoutes from "./routes/categoriasRoutes.mjs";
import companiasRoutes from  "./routes/companiasRoutes.mjs";



const app = express();
app.use(express.json());
app.use('/api/proveedores',proveedoresRoutes)
app.use('/api/clientes',clientesRoutes)
app.use('/api/productos',productosRoutes)
app.use('/api/empleados',empleadosRoutes)
app.use('/api/pedidos',pedidosRoutes)
app.use('/api/categorias',categoriasRoutes)
app.use('/api/companias',companiasRoutes)

//app.get('/', (req, res) => res.json({ ok: true, data: 'API Distribuidora funcionando' }));


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor en http://localhost:${PORT}`));
