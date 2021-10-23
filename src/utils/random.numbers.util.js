let listaRepetidos = {};
for (let i = 1; i < cantidad; i++) {
  let numeroRandom = Math.floor(Math.random() * 1000) + 1;
  if (!listaRepetidos[numeroRandom]) {
    listaRepetidos[numeroRandom] = 0;
  }
  listaRepetidos[numeroRandom]++;
}
return listaRepetidos;
