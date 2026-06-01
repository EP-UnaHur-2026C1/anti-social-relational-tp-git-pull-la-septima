const path = require('path');
const fs = require('fs');
const YAML = require('yaml');
const swaggerUi = require('swagger-ui-express');

const yamlPath = path.join(__dirname, '..', 'swagger.yaml');
const swaggerDocument = YAML.parse(fs.readFileSync(yamlPath, 'utf8'));

const setupSwagger = (app) => {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, {
        customSiteTitle: 'UnaHur Anti-Social Net API'
    }));
    app.get('/swagger.yaml', (req, res) => {
        res.type('text/yaml').sendFile(yamlPath);
    });
};

module.exports = { setupSwagger };