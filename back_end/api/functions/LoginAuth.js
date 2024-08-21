const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const TestaCPF = (strCPF) => {
    var Soma;
    var Resto1;
    var Resto2;
    strCPF = strCPF.replace("-", "");
    strCPF = strCPF.replace(".", "");
    strCPF = strCPF.replace(".", "");
    Soma = 0;
    var i;
    if (strCPF == "00000000000" || strCPF == "11111111111" || strCPF == "22222222222" || strCPF == "33333333333" || strCPF == "44444444444" || strCPF == "55555555555" || strCPF == "66666666666" || strCPF == "77777777777" || strCPF == "88888888888" || strCPF == "99999999999") {
        return false;
    }
    const vetCPF = strCPF.split("");
    for (let i = 0; i < 9; i++) {
        Soma += parseInt(vetCPF[i]) * (10 - i);
    }
    Resto1 = (Soma * 10) % 11;
    if ((Resto1 == 10) || (Resto1 == 11)) {
        Resto1 = 0;
    }
    if (Resto1 != parseInt(strCPF[9])) {
        return false;
    }
    Soma = 0;
    for (let i = 0; i < 10; i++) {
        Soma += parseInt(vetCPF[i]) * (11 - i);
    }
    Resto2 = (Soma * 10) % 11;
    if ((Resto2 == 10) || (Resto1 == 11)) {
        Resto2 = 0;
    }
    if (Resto2 != parseInt(strCPF[10])) {
        return false;
    }

    return true;
};

const loginAuth = (senhabd, senhareq) => {
    const validPassword = bcrypt.compareSync(senhareq, senhabd);
    
    if (!validPassword) {
        return { 'validation': false, 'message': 'Failed to login | Password incorrect'};
    }
    return { 'validation': true }

}

module.exports = loginAuth;