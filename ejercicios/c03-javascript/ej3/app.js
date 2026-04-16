const calcularPrecioFinal = (monto, medioPago) => {
    if (monto < 200) return monto; // sin descuento
    if (monto <= 400) {
        switch (medioPago) {
            case "E":
                return monto * 0.7; // 30% off
            case "D":
                return monto * 0.8; // 20% off
            case "C":
                return monto * 0.9; // 10% off
        }
    }
    return monto * 0.6; // 40% off
}

// testeos
console.log("Probando la función con distintos parámetros:");

console.log(`Monto: $199, Pago: Efectivo, Final: $${calcularPrecioFinal(199, "E")}`);
console.log(`Monto: $200, Pago: Crédito, Final: $${calcularPrecioFinal(200, "C")}`);
console.log(`Monto: $300, Pago: Débito, Final: $${calcularPrecioFinal(300, "D")}`);
console.log(`Monto: $399, Pago: Crédito, Final: $${calcularPrecioFinal(399, "C")}`);
console.log(`Monto: $1000, Pago: Efectivo, Final: $${calcularPrecioFinal(1000, "E")}`);