const input = document.getElementById("filtroAutor") as HTMLInputElement;
const btnFiltrar = document.getElementById("filtrar") as HTMLButtonElement;
const btnDisponibles = document.getElementById("mostrarDisponibles") as HTMLButtonElement;
const btnTodos = document.getElementById("mostrarTodos") as HTMLButtonElement;
const lista = document.getElementById("listado") as HTMLUListElement;
const stats = document.getElementById("stats") as HTMLParagraphElement;
const mensaje = document.getElementById("mensaje") as HTMLParagraphElement;

//ej3 agregado
const form = document.querySelector("form") as HTMLFormElement;
const tit = document.getElementById("tit") as HTMLInputElement;
const aut = document.getElementById("aut") as HTMLInputElement;
const gen = document.getElementById("gen") as HTMLInputElement;
const valor = document.getElementById("valor") as HTMLInputElement;
const dispo = document.getElementById("disponible") as HTMLInputElement;
const errorForm = document.getElementById("errorForm") as HTMLDivElement;

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
        isbn: "222-222-222",
        titulo: "Flatout 2",
        autor: "Bugbear",
        precio: 350,
        disponible: true,
        genero: "Acción"
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
        isbn: "666-666-666",
        titulo: "Crash of the Titans",
        autor: "Radical",
        precio: 450,
        disponible: false,
        genero: "Fantasía"
    }
];

//funciones
const buscarPorAutor = (autor: string) => {
    const resultado: Libro[] = [];
    
    for (const l of catalogo) {
        if (l.autor.toLowerCase() === autor.toLowerCase()) {
            resultado.push(l);
        }
    }
    //recorre el catálogo, compara autor ingresado con autor de cada libro, guarda las coincidencias en resultado y devuelve
    return resultado;
};

const librosDisponibles = () => {
    const resultado: Libro[] = [];
    for (const l of catalogo) {
        if (l.disponible === true) {
            resultado.push(l);
        }
    }
    //recorre el catálogo, recolecta todos los libros con disponible == true, devuelve array
    return resultado;
};

const precioPromedio = (libros: Libro[]) => {
    if (libros.length === 0) return 0;

    let precioTotal: number = 0;
    for (const l of libros) {
        precioTotal += l.precio;
    }

    return precioTotal / libros.length;
};

const renderizar = (libros: Libro[]) => {

    lista.innerHTML = "" //limpia la lista

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

        //precio (en otro span para q no quede pegado al titulo)
        const pre = document.createElement("span");
        pre.textContent = `$${l.precio}`;
        pre.classList.add("precio");

        //disponibiliad visible
        const estado = document.createElement("span");
        estado.classList.add("estado");
        estado.classList.add(l.disponible ? "disponible" : "no-disponible");

        //botón para eliminar libro
        const btnEliminar = document.createElement("button");
        btnEliminar.classList.add("btnElim");
        btnEliminar.textContent = "Eliminar";
        btnEliminar.addEventListener("click", () => eliminarLibro(l.isbn));

        //armado del elemento li
        li.appendChild(texto);
        li.appendChild(pre);
        li.appendChild(estado);
        li.appendChild(btnEliminar);

        lista.appendChild(li);
    }

    stats.textContent = `Cantidad de libros: ${libros.length} | Precio promedio: $${precioPromedio(libros).toFixed(2)}`;
};

//funciones ej3
const agregarLibro = (libro: Libro) => {
    catalogo.push(libro);
    renderizar(catalogo);
};

const eliminarLibro = (isbn: string) => {
    for (let i = 0; i < catalogo.length; i++) {
        if (catalogo[i].isbn === isbn) {
            catalogo.splice(i, 1);
            break;
        }
    }
    renderizar(catalogo);
};

const validarFormulario = (): Libro | null => {
    errorForm.textContent = "";

    const titulo = tit.value.trim();
    const autor = aut.value.trim();
    const precio = Number(valor.value);
    const genero = gen.value.trim();
    const disponible = dispo.checked;


    if (!titulo || !autor ) {
        errorForm.textContent = "Se deben completar todos los campos (el género es opcional)"
        return null;
    }

    if (precio <= 0 || isNaN(precio)) {
        errorForm.textContent = "Ingrese un precio válido";
        return null;
    }

    const nuevo: Libro = {
        isbn: `AUTO-${Date.now()}`,
        titulo,
        autor,
        precio,
        disponible,
        genero: genero || "No definido"
    };

    return nuevo;
};

//eventos (botones)
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

input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        const autor = input.value.trim();
        const resultado = buscarPorAutor(autor);
        renderizar(resultado)
    }
});

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const libro = validarFormulario();

    console.log(libro);

    if(!libro) return;

    agregarLibro(libro);

    form.reset();
});

renderizar(catalogo);