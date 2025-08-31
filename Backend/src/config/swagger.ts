import swaggerUi from "swagger-ui-express";
import { Express } from "express";

// Definición básica en formato OpenAPI
const swaggerDocument = {
  openapi: "3.0.0",
  info: {
    title: "API ProyectoCobra",
    version: "1.0.0",
    description: "Documentación de la API para Proyecto Cobra"
  },
  servers: [
    {
      url: "http://localhost:3000",
      description: "Servidor local"
    }
  ],
  paths: {
  }
};

// Función para habilitar Swagger
export function configurarSwagger(app: Express) {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
}
