// ============================
//  Puerto
// ============================
process.env.PORT = process.env.PORT || 8080;


// ============================
//  Entorno
// ============================
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';


// ============================
//  Vencimiento del Token
// ============================
// 60 segundos
// 60 minutos
// 24 horas
// 30 días
process.env.CADUCIDAD_TOKEN = 60 * 60 * 24 * 30;


// ============================
//  SEED de autenticación
// ============================
process.env.SEED = process.env.SEED || 'este-es-el-seed-desarrollo';

// ============================
//  Base de datos
// ============================
let urlDB;

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/transporte';
} else{
    urlDB = 'mongodb mongodb+srv://admin:soloyoytu1687@cluster0.wm1zj.mongodb.net/MERN?retryWrites=true&w=majority'
}
process.env.URLDB = urlDB;


// ============================
//  Google Client ID
// ============================
process.env.CLIENT_ID = process.env.CLIENT_ID || '963284478933-ag3c44f3bn5cv1p1nscu7ro12dik5mcq.apps.googleusercontent.com';
