function clasificarNota(nota) {
    if (nota < 4) return "Desaprobado";
    if (nota <= 7) return "Aprobado";
    return "Promocionado";
}

function diaDeLaSemana(numero) {
    switch (numero) {
        case 1:
            return "Lunes";
        case 2:
            return "Martes";
        case 3:
            return "Miércoles";
        case 4:
            return "Jueves";
        case 5:
            return "Viernes";
        case 6:
            return "Sábado (fin de semana)";
        case 7:
            return "Domingo (fin de semana)";
        default:
            return "Día inválido";
    }
}

// testeos

console.log("Probando función clasificarNota con los números 2, 4, 7, 8 en ese orden");
console.log(clasificarNota(2));
console.log(clasificarNota(4));
console.log(clasificarNota(7));
console.log(clasificarNota(8));

console.log("Probando función diaDeLaSemana con los números 1, 4, 7");
console.log(diaDeLaSemana(1));
console.log(diaDeLaSemana(4));
console.log(diaDeLaSemana(7));
