import express from "express";
import { configurarSwagger } from "./config/swagger";

const app = express();
const PORT = 3000;

app.use(express.json());

// Rutas de tu API
app.get("/", (_req, res) => {
  res.send("Servidor Node.js funcionando 🚀");
});

// Swagger
configurarSwagger(app);

app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
  console.log(`📄 Swagger docs en http://localhost:${PORT}/api-docs`);
});
