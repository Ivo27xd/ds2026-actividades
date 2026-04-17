// array de 8 números
const numeros = [0, 5, 2, 13, 32, 8, 17, 25];
let suma = 0;
let mayor = numeros[0];
let menor = numeros[0];

// recorrer y mostrar la suma
for (num of numeros) {
    suma = suma + num;

    if (num > mayor) mayor = num;
    if (num < menor) menor = num;
}

console.log("Array:", numeros);
console.log(`La suma total es: ${suma}`);
console.log(`El promedio es: ${suma / numeros.length}`);
console.log(`El número mayor es ${mayor} y el menor es ${menor}`);

const generarAsteriscos = (n) => {
    let cadena = "";
    for (let i = 0; i < n; i++) {
        cadena += "*";
    }
    console.log(cadena);
}

console.log("----------------");
console.log("Probando función generarAsteriscos(n) con 1, 0, 3, 5");
generarAsteriscos(1);
generarAsteriscos(0);
generarAsteriscos(3);
generarAsteriscos(5);