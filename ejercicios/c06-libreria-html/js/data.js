"use strict";

const input = document.getElementById("input");
const boton = document.getElementById("btnBuscar");
const resultados = document.getElementById("resultados");
const error = document.getElementById("error");
const loading = document.getElementById("loading");

const obtenerLibros = async (query) => {
    const resul = await fetch(`https://openlibrary.org/search.json?q=${query}`);

    if (!resul.ok) {
        throw new Error(`HTTP ${resul.status}`);
    }

    const data = await resul.json();

    return data.docs;
};

const renderizarLibros = (libros) => {

    resultados.innerHTML = "";

    const row = document.createElement("div");

    row.classList.add(
        "row",
        "gx-4",
        "gy-5",
        "justify-content-center"
    );

    const top20 = libros.slice(0, 20);

    for (const l of top20) {

        // columna
        const col = document.createElement("div");

        col.classList.add(
            "col-sm-6",
            "col-md-4",
            "col-lg-3",
            "d-flex",
            "justify-content-center"
        );

        // card
        const card = document.createElement("div");

        card.classList.add("card", "h-100");

        card.style.width = "260px";

        // =========================
        // PORTADA
        // =========================

        if (l.cover_i) {

            const img = document.createElement("img");

            img.src = `https://covers.openlibrary.org/b/id/${l.cover_i}-L.jpg`;

            img.alt = l.title;

            img.classList.add("card-img-top");

            card.appendChild(img);

        } else {

            // placeholder generado con JS

            const placeholder = document.createElement("div");

            placeholder.classList.add(
                "placeholder-cover",
                "d-flex",
                "align-items-center",
                "justify-content-center"
            );

            placeholder.innerHTML = `
                <div class="text-center">
                    <div style="font-size: 3rem;">📖</div>
                    <p class="mt-2 mb-0">
                        Sin portada
                    </p>
                </div>
            `;

            card.appendChild(placeholder);
        }

        // =========================
        // BODY
        // =========================

        const cardBody = document.createElement("div");

        cardBody.classList.add(
            "card-body",
            "d-flex",
            "flex-column"
        );

        // titulo
        const titulo = document.createElement("h5");

        titulo.classList.add("card-title");

        titulo.textContent = l.title;

        // autor
        const autor = document.createElement("p");

        autor.classList.add("card-text");

        autor.textContent = l.author_name
            ? l.author_name[0]
            : "Autor desconocido";

        // boton
        const botonVerMas = document.createElement("a");

        botonVerMas.href = "libro.html";

        botonVerMas.textContent = "Ver más";

        botonVerMas.classList.add(
            "btn-secundario",
            "mt-auto"
        );

        // append
        cardBody.appendChild(titulo);
        cardBody.appendChild(autor);
        cardBody.appendChild(botonVerMas);

        card.appendChild(cardBody);

        col.appendChild(card);

        row.appendChild(col);
    }

    resultados.appendChild(row);
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
