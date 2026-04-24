const input = document.getElementById("altura") as HTMLInputElement;
const boton = document.getElementById("btn") as HTMLButtonElement;
const error = document.getElementById("error") as HTMLParagraphElement;
const resultado = document.getElementById("resultado") as HTMLPreElement;

// función genAsteriscos (anteriormente integrada a genArbol)
const genAsteriscos = (n: number): string => {
    let arbol = "";

    for (let i = 0; i < n; i++) {
        arbol += "*".repeat(i + 1) + "\n";
    }

    return arbol;
};

// funcion genArbol ()
const genArbol = (): void => {
    const valor: number = Number(input.value);

    if (!valor || valor < 1 || valor > 100) {
        error.textContent = "Valor inválido";
        return;
    }

    const arbol = genAsteriscos(valor);

    resultado.textContent = `Medio árbol de altura ${valor}\n\n${arbol}`;
};

boton.addEventListener("click", genArbol);

export{}; //para que el ts no tire error de redeclaración una vez traspilado