import testing from './testing';
import production from  './prod';
import local from './local';

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const stage = process.env.STAGE || 'local';

let envConfig;

switch(stage) {
    case 'production':
        envConfig = production;
        break;
    case 'staging':
        envConfig = testing;
        break;
    default:
        envConfig = local;
        break
}

const defaultConfig = {
    stage,
    dbUrl: process.env.DATABASE_URL,
    jwtSecret: process.env.JWT_SECRET,
    port: process.env.PORT,
    logging: false,
  };
  
  const exportConfig = {
    ...defaultConfig,
    ...envConfig
  }
  export default exportConfig;