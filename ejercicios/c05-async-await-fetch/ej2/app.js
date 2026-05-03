"use strict";
const lista = document.getElementById("lista");
const error = document.getElementById("error");
const mensaje = document.getElementById("loading");
async function obtenerUsuarios() {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
    }
    const usuarios = await response.json();
    return usuarios;
}
const renderizarUsuarios = (usuarios) => {
    lista.innerHTML = "";
    for (const u of usuarios) {
        const li = document.createElement("li");
        const nombre = document.createElement("span");
        nombre.textContent = u.name;
        nombre.classList.add("nombre");
        const email = document.createElement("span");
        email.textContent = u.email;
        email.classList.add("email");
        li.appendChild(nombre);
        li.appendChild(email);
        lista.appendChild(li);
    }
};
const cargarUsuarios = async () => {
    mensaje.style.display = "block";
    error.textContent = "";
    try {
        const usuarios = await obtenerUsuarios();
        renderizarUsuarios(usuarios);
    }
    catch (err) {
        error.textContent = "Error al cargar usuarios";
    }
    finally {
        mensaje.style.display = "none";
    }
};
cargarUsuarios();
