import swaggerUi from "swagger-ui-express";
import { Express } from "express";

// =======================
// Definición OpenAPI 3.0
// =======================
export const swaggerDocument = {
  openapi: "3.0.0",
  info: {
    title: "API ProyectoCobra",
    version: "1.0.0",
    description: "Documentación de la API para Proyecto Cobra (endpoints de ejemplo)"
  },
  servers: [
    { url: "http://localhost:3000", description: "Servidor local" }
  ],
  tags: [
    { name: "Salud", description: "Verificación del servicio" },
    { name: "Usuarios", description: "Gestión de usuarios (ejemplo CRUD)" }
  ],
  paths: {
    // ---------- Salud ----------
    "/salud": {
      get: {
        tags: ["Salud"],
        summary: "Verificar estado del servicio",
        description: "Devuelve un mensaje indicando que el servicio está operativo.",
        responses: {
          "200": {
            description: "Servicio operativo",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    ok: { type: "boolean", example: true },
                    mensaje: { type: "string", example: "servicio operativo" }
                  }
                },
                examples: {
                  ok: { value: { ok: true, mensaje: "servicio operativo" } }
                }
              }
            }
          }
        }
      }
    },

    // ---------- Usuarios ----------
    "/api/usuarios": {
      get: {
        tags: ["Usuarios"],
        summary: "Listar usuarios",
        description: "Obtiene el listado completo de usuarios.",
        responses: {
          "200": {
            description: "Lista de usuarios",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: { $ref: "#/components/schemas/Usuario" }
                },
                examples: {
                  ejemplo: {
                    value: [
                      { id: "a1b2c3", nombre: "Ana", correo: "ana@correo.com" },
                      { id: "d4e5f6", nombre: "Carlos", correo: "carlos@correo.com" }
                    ]
                  }
                }
              }
            }
          }
        }
      },
      post: {
        tags: ["Usuarios"],
        summary: "Crear usuario",
        description: "Crea un nuevo usuario. **nombre** y **correo** son obligatorios.",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/UsuarioCrear" },
              examples: {
                ejemplo: {
                  value: { nombre: "Ana María", correo: "anamaria@correo.com" }
                }
              }
            }
          }
        },
        responses: {
          "201": {
            description: "Usuario creado",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Usuario" },
                examples: {
                  ejemplo: {
                    value: { id: "uuid-generado", nombre: "Ana María", correo: "anamaria@correo.com" }
                  }
                }
              }
            }
          },
          "400": {
            description: "Datos inválidos",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Error" },
                examples: { faltanCampos: { value: { mensaje: "nombre y correo son obligatorios" } } }
              }
            }
          }
        }
      }
    },

    "/api/usuarios/{id}": {
      parameters: [
        { $ref: "#/components/parameters/UsuarioIdParam" }
      ],
      get: {
        tags: ["Usuarios"],
        summary: "Obtener detalle de usuario",
        responses: {
          "200": {
            description: "Usuario encontrado",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Usuario" },
                examples: { ejemplo: { value: { id: "a1b2c3", nombre: "Ana", correo: "ana@correo.com" } } }
              }
            }
          },
          "404": {
            description: "Usuario no encontrado",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Error" },
                examples: { noExiste: { value: { mensaje: "Usuario no encontrado" } } }
              }
            }
          }
        }
      },
      put: {
        tags: ["Usuarios"],
        summary: "Actualizar usuario",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/UsuarioActualizar" },
              examples: { ejemplo: { value: { nombre: "Ana M.", correo: "ana.m@correo.com" } } }
            }
          }
        },
        responses: {
          "200": {
            description: "Usuario actualizado",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Usuario" }
              }
            }
          },
          "404": {
            description: "Usuario no encontrado",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Error" }
              }
            }
          }
        }
      },
      delete: {
        tags: ["Usuarios"],
        summary: "Eliminar usuario",
        responses: {
          "204": { description: "Eliminado sin contenido" },
          "404": {
            description: "Usuario no encontrado",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Error" }
              }
            }
          }
        }
      }
    }
  },

  // ======= Componentes reutilizables =======
  components: {
    parameters: {
      UsuarioIdParam: {
        name: "id",
        in: "path",
        required: true,
        description: "Identificador del usuario",
        schema: { type: "string", example: "a1b2c3" }
      }
    },
    schemas: {
      Usuario: {
        type: "object",
        properties: {
          id: { type: "string", description: "Identificador (uuid)" },
          nombre: { type: "string" },
          correo: { type: "string", format: "email" }
        },
        required: ["id", "nombre", "correo"],
        example: { id: "uuid", nombre: "Ana", correo: "ana@correo.com" }
      },
      UsuarioCrear: {
        type: "object",
        properties: {
          nombre: { type: "string" },
          correo: { type: "string", format: "email" }
        },
        required: ["nombre", "correo"],
        example: { nombre: "Juan", correo: "juan@correo.com" }
      },
      UsuarioActualizar: {
        type: "object",
        properties: {
          nombre: { type: "string" },
          correo: { type: "string", format: "email" }
        },
        additionalProperties: false,
        example: { nombre: "Juan A." }
      },
      Error: {
        type: "object",
        properties: {
          mensaje: { type: "string" },
          detalle: { oneOf: [{ type: "string" }, { type: "object" }, { type: "array" }] }
        },
        example: { mensaje: "Usuario no encontrado", detalle: null }
      }
    }
  }
};

// Habilitar Swagger en /api-docs
export function configurarSwagger(app: Express) {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  console.log("📄 Swagger disponible en http://localhost:3000/api-docs");
}
