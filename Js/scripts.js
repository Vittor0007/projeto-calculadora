const numeroText = document.querySelector("#numero");
const resultadoText = document.querySelector("#resultado");
const buttons = document.querySelectorAll("#buttons-container button");

class calcular {
  constructor(numeroText, resultadoText) {
    this.numeroText = numeroText;
    this.resultadoText = resultadoText;
    this.numero = "";
  }
  //  addDigit mostra digito no visor que o usuario digitou
  addDigit(digito) {
    if (digito === "." && this.numeroText.innerText.includes(".")) {
      return;
    }

    this.numero = digito;
    this.updateScreen();
  }
  processoOperacao(operação) {
    if (this.resultadoText.innerText === "" && operação !== "AC") {
      if (this.numeroText.innerText !== "") {
        this.checarOperador(operação)
      }
      return;
    }
    let operacaoValor;
    let previous = +this.numeroText.innerText.split(" ")[0];
    let current = +this.resultadoText.innerText;

    switch (operação) {
      case "+":
        operacaoValor = previous + current;
        this.updateScreen(operacaoValor, operação, current, previous);
        break;
      case "-":
        operacaoValor = previous - current;
        this.updateScreen(operacaoValor, operação, current, previous);
        break;
      case "%":
        operacaoValor = (previous * current) / 100;
        this.updateScreen(operacaoValor, operação, current, previous);
        break;
      case "x":
        operacaoValor = previous * current;
        this.updateScreen(operacaoValor, operação, current, previous);
        break;
      case "÷":
        operacaoValor = previous / current;
        this.updateScreen(operacaoValor, operação, current, previous);
        break;
      case "apagar":
        this.apagarUm();
        break;
      case "AC":
        this.apagarTudo();
        break;
      case "=":
        this.operadorIgual();
        break;
      default:
        return;
    }
  }
  updateScreen(
    operacaoValor = null,
    operação = null,
    previous = null,
    current = null
  ) {
    console.log(operacaoValor, operação, current, previous);
    if (operacaoValor === null) {
      this.resultadoText.innerText += this.numero;
    } else {
      if (current === 0) {
        operacaoValor = previous;
      }
      this.numeroText.innerText = `${operacaoValor} ${operação}`;
      this.resultadoText.innerText = "";
    }
  }
  checarOperador (operação) {
    const operadoresOrdem = ["x","÷", "+", "-", "%" ] 
    if(!operadoresOrdem.includes(operação)) {
      return
    }
    this.numeroText.innerText = this.numeroText.innerText.slice(0,-1) + operação
  }


  apagarUm() {
    this.numeroText.innerText = this.numeroText.innerText.slice(0, -1);
  }
  apagarTudo() {
    this.numeroText.innerText = "";
    this.resultadoText.innerText = "";
  }

  operadorIgual() {
    const soma = numeroText.innerText.split(" ")[1];
    this.processoOperacao(soma)
  }
}

let calc = new calcular(numeroText, resultadoText);

buttons.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    let value = e.target.innerHTML;
    if (+value >= 0 || value === ".") {
      calc.addDigit(value);
    } else {
      calc.processoOperacao(value);
    }
  });
});
