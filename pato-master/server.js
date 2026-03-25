const express = require('express');
const path = require('path');
const mysql = require('mysql2');
const dotenv = require('dotenv');
const session = require('express-session');

const app = express();
dotenv.config();

// 1. Configuración de Vistas y Estáticos
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

// 2. Configuración de Sesiones (Para que no se olvide el login)
app.use(session({
    secret: 'secreto-pato',
    resave: false,
    saveUninitialized: true
}));

// 3. Procesamiento de datos de formularios
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// --- RUTAS DE NAVEGACIÓN ---

app.get('/', (req, res) => {
    // Enviamos a la vista si hay sesión activa y el nombre del usuario
    res.render('index', {
        login: req.session.loggedin || false,
        userName: req.session.userName || ''
    });
});

app.get('/menu', (req, res) => res.render('menu'));
app.get('/gallery', (req, res) => res.render('gallery'));
app.get('/about', (req, res) => res.render('about'));
app.get('/blog', (req, res) => res.render('blog'));
app.get('/contact', (req, res) => res.render('contact'));
app.get('/domicilio', (req, res) => res.render('domicilio'));
app.get('/reservation', (req, res) => res.render('reservation'));
app.get('/blog-detail', (req, res) => res.render('blog-detail'));

// --- RUTAS DE USUARIO (REGISTRO Y LOGIN) ---

app.get('/register', (req, res) => {
    res.render('register');
});

app.post('/register', (req, res) => {
    const { user, password } = req.body;
    // IMPORTANTE: Usamos 'nombre_user' como en tu tabla
    const query = 'INSERT INTO usuario (nombre_user, clave) VALUES (?, ?)';
    
    db.query(query, [user, password], (err, result) => {
        if (err) {
            console.error(err);
            return res.send("Error al registrar: " + err.message);
        }
        res.redirect('/login');
    });
});

app.get('/login', (req, res) => {
    res.render('login');
});

app.post('/login', (req, res) => {
    const { user, password } = req.body;

    // Unificamos la columna a 'nombre_user' para que coincida con el register
    const query = "SELECT * FROM usuario WHERE nombre_user = ? AND clave = ?";

    db.query(query, [user, password], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send("Error en el servidor");
        }

        if (result.length > 0) {
            // ACTIVAMOS LA SESIÓN
            req.session.loggedin = true;
            req.session.userName = result[0].nombre_user; 

            console.log("¡Login exitoso para:", req.session.userName, "!");
            
            // REDIRECCIÓN AUTOMÁTICA AL INICIO
            res.redirect('/'); 
        } else {
            res.send("<script>alert('Usuario o contraseña incorrectos'); window.location.href='/login';</script>");
        }
    });
});

// RUTA PARA CERRAR SESIÓN
app.get('/logout', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/');
    });
});

// --- INICIO DEL SERVIDOR ---
const puerto = process.env.PORT || 3000;
app.listen(puerto, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${puerto}`);
});