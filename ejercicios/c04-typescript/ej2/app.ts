const input = document.getElementById("filtroAutor") as HTMLInputElement;
const btnFiltrar = document.getElementById("filtrar") as HTMLButtonElement;
const btnDisponibles = document.getElementById("mostrarDisponibles") as HTMLButtonElement;
const btnTodos = document.getElementById("mostrarTodos") as HTMLButtonElement;
const lista = document.getElementById("listado") as HTMLUListElement;
const stats = document.getElementById("span") as HTMLParagraphElement;
const mensaje = document.getElementById("mensaje") as HTMLParagraphElement;

//interfaz
interface Libro {
    isbn: string;
    titulo: string;
    autor: string;
    precio: number;
    disponible: boolean;
    genero: string;
}

//catálogo
const catalogo: Libro[] = [
    {
        isbn: "111-111-111",
        titulo: "La metamorfosis",
        autor: "Guido Kaczka",
        precio: 300,
        disponible: true,
        genero: "Drama"
    },
    {
        isbn: "222-222-222",
        titulo: "Flatout 2",
        autor: "Bugbear",
        precio: 350,
        disponible: false,
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
        titulo: "RDR2",
        autor: "Rockstar",
        precio: 1000,
        disponible: true,
        genero: "Época"
    }
];

const buscarPorAutor = (autor: string) => {
    const resultado: Libro[] = [];
    
    for (const l of catalogo) {
        if (l.autor.toLowerCase() === autor.toLowerCase()) {
            resultado.push(l);
        }
    }
    //recorre el catálogo, compara autor ingresado con autor de cada libro, guarda las coincidencias en resultado y devuelve
    return resultado;
}

const librosDisponibles = () => {
    const resultado: Libro[] = [];
    for (const l of catalogo) {
        if (l.disponible === true) {
            resultado.push(l);
        }
    }
    //recorre el catálogo, recolecta todos los libros con disponible == true, devuelve array
    return resultado;
}

const precioPromedio = () => {
    let precioTotal: number = 0;

    for (const l of catalogo) {
        precioTotal += l.precio;
    }

    return precioTotal / catalogo.length;
}

const renderizar = (libros: Libro[]) => {

    lista.innerHTML = "" //limpia la lista

    if (libros.length === 0) {
        mensaje.textContent = "No se encontraron libros para el autor ingresado.";
        return;
    }

    for (const l of libros) {
        const li = document.createElement("li");
        li.textContent = `${l.titulo} - ${l.autor}`;
        lista.appendChild(li);
    }
}

btnFiltrar.addEventListener("click", () => {
    const autor = input.value.trim();
    mensaje.textContent = `Libros del autor "${autor}"`;
    const resultado = buscarPorAutor(autor);
    renderizar(resultado);
});

btnDisponibles.addEventListener("click", () => {
    mensaje.textContent = "Libros disponibles:"
    const resultado = librosDisponibles();
    renderizar(resultado);
});

btnTodos.addEventListener("click", () => {
    mensaje.textContent = "Todos los libros:"
    renderizar(catalogo);
});

renderizar(catalogo);
stats.textContent = `Precio promedio: $${precioPromedio()}`;