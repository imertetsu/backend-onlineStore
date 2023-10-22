const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Online Store API",
      version: "1.0.0"
    },
  },
  apis: ['.././routes/index.js']
};
const swaggerSpec = swaggerJSDoc(options);

const swaggerDocs = (app, port) => {
  app.use('/api/v1/docs', swaggerUi, swaggerUi.setup(swaggerSpec));
  console.log(`Version 1 Docs are available at ${port}`);
};

module.exports = { swaggerDocs };
