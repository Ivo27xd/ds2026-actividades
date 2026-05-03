interface LibroOL {
    title: string;
    author_name?: string[]; // en OL los libros pueden tener más de un autor
    first_publish_year?: number;
}

const input = document.getElementById("input") as HTMLInputElement;
const boton = document.getElementById("btnBuscar") as HTMLButtonElement;
const resultados = document.getElementById("resultados") as HTMLDivElement;
const error = document.getElementById("error") as HTMLParagraphElement;
const loading = document.getElementById("loading") as HTMLParagraphElement;

const obtenerLibros = async (query: string): Promise<LibroOL[]> => {
    const resul = await fetch (`https://openlibrary.org/search.json?q=${query}`);

    if (!resul.ok) {
        throw new Error(`HTTP ${resul.status}`);
    }

    const data = await resul.json();
    return data.docs; //array de libros
};    

const renderizarLibros = (libros: LibroOL[]) => {
    resultados.innerHTML = "";

    const top20 = libros.slice(0, 20); //toma los primeros 20 resultados

    for (const l of top20) {
        const card = document.createElement("div");
        card.classList.add("card");

        const titulo = document.createElement("h3");
        titulo.textContent = l.title;

        const autor = document.createElement("p");
        autor.textContent = l.author_name 
            ? l.author_name[0] //muestra solo el autor principal
            : "Autor desconocido";

        const año = document.createElement("p");
        año.textContent = l.first_publish_year 
            ? l.first_publish_year.toString() 
            : "Año desconocido";

        card.appendChild(titulo);
        card.appendChild(autor);
        card.appendChild(año);

        resultados.appendChild(card);
    }
};

boton.addEventListener("click", async () => {
    const query = input.value.trim();

    error.textContent = "";
    resultados.innerHTML = "";

    if (!query) {
        error.textContent = "Ingresá un término de búsqueda";
        return;
    }

    loading.style.display = "block";

    try {
        const libros = await obtenerLibros(query);
        renderizarLibros(libros);
    } catch {
        error.textContent = "Error al buscar libros";
    } finally {
        loading.style.display = "none";
    }
});
