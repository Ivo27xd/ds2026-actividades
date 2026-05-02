"use strict";
async function obtenerUsuarios() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }
        const usuarios = await response.json();
        return usuarios;
    }
    catch (error) {
        console.error('Error al obtener usuarios:', error);
        return [];
    }
}
async function mostrarUsuarios() {
    const usuarios = await obtenerUsuarios();
    for (const u of usuarios) {
        console.log(`${u.name} - ${u.email}`);
    }
}
mostrarUsuarios();
