const express = require('express');
const path = require('path');
const session = require('express-session');
const dotenv = require('dotenv');
const db = require('./config/db'); // IMPORTANTE: Sin el .js al final, estilo CommonJS

const app = express();
dotenv.config();

// 1. Configuración de Vistas y Estáticos (Usando require y path)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

// 2. Procesamiento de datos y Sesiones
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(session({
    secret: 'secreto-pato',
    resave: false,
    saveUninitialized: true
}));

// --- RUTAS DE NAVEGACIÓN ---

app.get('/', (req, res) => {
    res.render('index', {
        login: req.session.loggedin || false,
        userName: req.session.userName || ''
    });
});

// Rutas manuales como las del profe
app.get('/menu', (req, res) => res.render('menu'));
app.get('/gallery', (req, res) => res.render('gallery'));
app.get('/about', (req, res) => res.render('about'));
app.get('/blog', (req, res) => res.render('blog'));
app.get('/contact', (req, res) => res.render('contact'));
app.get('/domicilio', (req, res) => res.render('domicilio'));
app.get('/reservation', (req, res) => res.render('reservation'));

// --- RUTAS DE LOGIN Y REGISTRO ---

app.get('/login', (req, res) => res.render('login'));

app.post('/login', (req, res) => {
    const { user, password } = req.body;
    const query = "SELECT * FROM usuario WHERE nombre_user = ? AND clave = ?";

    db.query(query, [user, password], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send("Error en el servidor");
        }
        if (result.length > 0) {
            req.session.loggedin = true;
            req.session.userName = result[0].nombre_user;
            res.redirect('/');
        } else {
            res.send("<script>alert('Usuario o contraseña incorrectos'); window.location.href='/login';</script>");
        }
    });
});

app.get('/logout', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/');
    });
});

// --- INICIO DEL SERVIDOR ---
const puerto = process.env.PORT || 3000;
app.listen(puerto, () => {
    console.log(`🚀 Servidor estilo Profesor corriendo en http://localhost:${puerto}`);
});