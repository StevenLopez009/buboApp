import app from './app.js';
import sequelize from './db.js';

const PORT = 3000;

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Conectado a la base de datos MySQL con Sequelize');

    await sequelize.sync(); 

    app.listen(PORT, () => {
      console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('❌ Error al conectar a la base de datos:', error);
  }
};

startServer();
