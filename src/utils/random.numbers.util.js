export const listaRepetidosData = (numero) => {
  let listaRepetidos = {};
  for (let i = 1; i < numero; i++) {
    let numeroRandom = Math.floor(Math.random() * 1000) + 1;
    if (!listaRepetidos[numeroRandom]) {
      listaRepetidos[numeroRandom] = 0;
    }
    listaRepetidos[numeroRandom]++;
  }
  return listaRepetidos;
};

process.send("ready");

process.on("message", (numero) => {
  const resultado = listaRepetidosData(numero);
  process.send(resultado);
});

if (respuestaChild == "ready") {
  randomsFork.send(numero);
} else {
  const resultadoJson = JSON.stringify(respuestaChild);
  res.status(200).send(resultadoJson);
}
