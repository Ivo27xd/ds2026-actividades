const input = document.getElementById("altura");
const boton = document.getElementById("btn");
const error = document.getElementById("error");
const resultado = document.getElementById("resultado");
// función genAsteriscos (anteriormente integrada a genArbol)
const genAsteriscos = (n) => {
    let arbol = "";
    for (let i = 0; i < n; i++) {
        arbol += "*".repeat(i + 1) + "\n";
    }
    return arbol;
};
// funcion genArbol ()
const genArbol = () => {
    const valor = Number(input.value);
    if (!valor || valor < 1 || valor > 100) {
        error.textContent = "Valor inválido";
        return;
    }
    const arbol = genAsteriscos(valor);
    resultado.textContent = `Medio árbol de altura ${valor}\n\n${arbol}`;
};
boton.addEventListener("click", genArbol);
export {};
