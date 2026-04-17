const input = document.getElementById("altura");
const boton = document.getElementById("btn");
const error = document.getElementById("error");
const resultado = document.getElementById("resultado");

//función genArbol

const genArbol = () => {
    //tomo el valor ingresado
    const valor = Number(input.value);

    //limpiar para cada árbol
    error.textContent = "";
    resultado.textContent = "";

    if (!valor || valor < 1 || valor > 100) {
        error.textContent = "El valor ingresado no es válido. Ingrese un valor entre 1 y 100";
        return;
    }

    let arbol = "";

    for (let i = 0; i < valor; i++) {
        arbol += "*".repeat(i+1) + "\n"; //agrega una línea con i+1 asteriscos en cada iteración 
    }

    resultado.textContent = `Medio árbol de altura ${valor}\n\n` + arbol;
}

boton.addEventListener("click", genArbol); // cuando se hace click en el botón, se llama ejecuta función genArbol

