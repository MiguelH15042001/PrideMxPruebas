const { defineConfig } = require("cypress");
const sql = require('mssql');






const poolPromise = sql.connect({
  user: 'UserQA', // Reemplaza con tu usuario
  password: 'EvK6qMTrmG9Dzed', // Reemplaza con tu contraseña
  server: 'serverredvouchermxdev.database.windows.net', // Reemplaza con tu servidor
  database: 'dbKuimbyPrideMxDev', // Reemplaza con tu base de datos
  options: {
    encrypt: true, // Cambia según tus necesidades
    trustServerCertificate: true // Cambia según tus necesidades
  }
});
module.exports = defineConfig({
  
  e2e: {
    baseUrl: 'https://as-pridemx-frontend-dev.azurewebsites.net',
    env: {
      // email: 'mhernandez+6@redcompanies.com.mx',
      // pass: 'Zimapan1?',

      email: 'galtebudri@gufum.com',
      pass: 'Zimapan1?',

    
    },
    setupNodeEvents(on, config) { 
      //Conexión BD
      on('task', {
        async queryDatabase({ query, parameters }) {
          try {
            const pool = await sql.connect(config.db);
            const request = pool.request();
            
            // Agrega los parámetros a la solicitud
            for (const [key, value] of Object.entries(parameters)) {
              request.input(key, sql.VarChar, value);
            }
            
            // Ejecuta la consulta
            const result = await request.query(query);
            return result.recordset;
          } catch (error) {
            return { error: error.message };
          }
        }
      });

      
    },

    
    chromeWebSecurity: false,
    setupFilesAfterEnv: ['<rootDir>/cypress/support/commands.js']

  },
});
