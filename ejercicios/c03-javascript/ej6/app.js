const input = document.getElementById("texto");
const boton = document.getElementById("botonAg");
const error = document.getElementById("error");
const lista = document.getElementById("lista");
const contador = document.getElementById("contador");

const actualizarContador = () => {
    const cantidad = lista.children.length;
    contador.textContent = `Total de productos en la lista: ${cantidad}`;
}

const agregar = () => {
    const nombre = input.value.trim();
    //el trim sirve para que un string compuesto solo por espacios no pase la validación
    
    error.textContent = "";

    if (!nombre) {
        error.textContent = "Ingrese un nombre válido";
        return;
    }

    //creación de elementos
    const li = document.createElement("li");
    const texto = document.createElement("span");
    const btnElim = document.createElement("button");

    texto.textContent = nombre;
    btnElim.textContent = "Eliminar";

    //evento eliminar
    btnElim.addEventListener("click", () => {
        li.remove();
        actualizarContador();
    });

    li.appendChild(texto);
    li.appendChild(btnElim);
    lista.appendChild(li);

    input.value = "";

    actualizarContador();
};

boton.addEventListener("click", agregar);