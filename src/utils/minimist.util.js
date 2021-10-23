import minimist from "minimist";

const optionDesafio = {
    default: {
        puerto: 8080,
    }
}

const { puerto, _ } = minimist(process.argv.slice(2), optionDesafio)
console.log("El puerto por defecto es 8080", { puerto, otros:_})