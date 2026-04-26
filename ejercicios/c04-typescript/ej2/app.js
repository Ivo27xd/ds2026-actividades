"use strict";
const input = document.getElementById("filtroAutor");
const btnFiltrar = document.getElementById("filtrar");
const btnDisponibles = document.getElementById("mostrarDisponibles");
const btnTodos = document.getElementById("mostrarTodos");
const lista = document.getElementById("listado");
const stats = document.getElementById("stats");
const mensaje = document.getElementById("mensaje");
//catálogo
const catalogo = [
    {
        isbn: "111-111-111",
        titulo: "La metamorfosis",
        autor: "Guido Kaczka",
        precio: 300,
        disponible: false,
        genero: "Drama"
    },
    {
        isbn: "222-222-222",
        titulo: "Flatout 2",
        autor: "Bugbear",
        precio: 350,
        disponible: true,
        genero: "Acción"
    },
    {
        isbn: "333-333-333",
        titulo: "COD 3",
        autor: "Treyarch",
        precio: 400,
        disponible: false,
        genero: "Historia"
    },
    {
        isbn: "444-444-444",
        titulo: "GTA 4",
        autor: "Rockstar",
        precio: 800,
        disponible: true,
        genero: "acción"
    },
    {
        isbn: "555-555-555",
        titulo: "RDR 2",
        autor: "Rockstar",
        precio: 1000,
        disponible: true,
        genero: "Época"
    },
    {
        isbn: "666-666-666",
        titulo: "Crash of the Titans",
        autor: "Radical",
        precio: 450,
        disponible: false,
        genero: "Fantasía"
    }
];
const buscarPorAutor = (autor) => {
    const resultado = [];
    for (const l of catalogo) {
        if (l.autor.toLowerCase() === autor.toLowerCase()) {
            resultado.push(l);
        }
    }
    //recorre el catálogo, compara autor ingresado con autor de cada libro, guarda las coincidencias en resultado y devuelve
    return resultado;
};
const librosDisponibles = () => {
    const resultado = [];
    for (const l of catalogo) {
        if (l.disponible === true) {
            resultado.push(l);
        }
    }
    //recorre el catálogo, recolecta todos los libros con disponible == true, devuelve array
    return resultado;
};
const precioPromedio = (libros) => {
    let precioTotal = 0;
    for (const l of libros) {
        precioTotal += l.precio;
    }
    return precioTotal / libros.length;
};
const renderizar = (libros) => {
    lista.innerHTML = ""; //limpia la lista
    if (libros.length === 0) {
        mensaje.textContent = "No se encontraron libros para el autor ingresado";
        stats.textContent = "";
        return;
    }
    for (const l of libros) {
        const li = document.createElement("li");
        //título y autor
        const texto = document.createElement("span");
        texto.textContent = `${l.titulo} - ${l.autor}`;
        //precio (para q no quede pegado al titulo)
        const pre = document.createElement("span");
        pre.textContent = `$${l.precio}`;
        pre.classList.add("precio");
        //disponibiliad visible
        const estado = document.createElement("span");
        estado.classList.add("estado");
        estado.classList.add(l.disponible ? "disponible" : "no-disponible");
        //armado del elemento li
        li.appendChild(texto);
        li.appendChild(pre);
        li.appendChild(estado);
        lista.appendChild(li);
    }
    stats.textContent = `Cantidad de libros: ${libros.length} | Precio promedio: $${precioPromedio(libros).toFixed(2)}`;
};
btnFiltrar.addEventListener("click", () => {
    const autor = input.value.trim();
    mensaje.textContent = `Libros del autor "${autor}"`;
    const resultado = buscarPorAutor(autor);
    renderizar(resultado);
});
btnDisponibles.addEventListener("click", () => {
    mensaje.textContent = "Libros disponibles:";
    const resultado = librosDisponibles();
    renderizar(resultado);
});
btnTodos.addEventListener("click", () => {
    mensaje.textContent = "Todos los libros:";
    renderizar(catalogo);
});
renderizar(catalogo);
