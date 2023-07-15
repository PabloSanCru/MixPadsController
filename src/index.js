/* IMPORTACIONES */

import React from 'react';
import ReactDOM from 'react-dom/client';
import Main from './main.js';
import "./index.css";


/* ELEMENTOS */

const root = ReactDOM.createRoot(document.getElementById('root')); // Creación del elemento raiz tomando del DOM el elemento "root" como argumento


/* FUNCIONES */

root.render( // Renderización del componente "Main" dentro del elemento "root"
  <Main />
);
