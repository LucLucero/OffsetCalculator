//declaração de var
var nc;
var erro;
var ac;


try {
  const form = document.getElementById("form1");
  form.addEventListener("change", calcOffSet);
} catch (error) {
  console.log("Erro Ao Receber Dados do Form", error);
}

function selectSensor() {
  const sensor = document.getElementById("sensorSelected").value;
  console.log(sensor);
  return sensor;
}

function calcOffSet() {
  let selectedSensor = selectSensor();
  console.log("Dentro do calc", selectedSensor);
  const LAB = document.getElementById("labValue");
  const MX = document.getElementById("mxValue");
  const span = document.querySelector("span");
  span.textContent = selectedSensor;
  const containerFormula = document.getElementById("containerFormula");

  switch (selectedSensor) {
    case "Gramatura":
      let erroBw = LAB - MX;
      let ncBw = ac - erroBw;
      nc = ncBw;

      containerFormula.innerHTML = "";
      const formula1 = document.createElement("div");
      formula1.textContent = "Diferença = LAB - MX";
      containerFormula.appendChild(formula1);

      const formula2 = document.createElement("div");
      formula2.textContent = "NovoDynOff = AntigoDynOff - diferença";
      containerFormula.appendChild(formula2);

      break;

    case "Umidade":
      let erroMoi = LAB - MX;
      let ncMoi = ac - erroMoi;
      nc = ncMoi;

      containerFormula.innerHTML = "";
      const formula3 = document.createElement("div");
      formula3.textContent = "Diferença = LAB - MX";
      containerFormula.appendChild(formula3);
      
      const formula4 = document.createElement("div");
      formula4.textContent = "NovoMXIRDynINT = AntigoMXIRDynINT - diferença";
      containerFormula.appendChild(formula4);

      break;

      case "Cinza":
        let erroASH = LAB - MX;
        let ncASH = ac - erroASH;
        nc = ncASH;

        containerFormula.innerHTML = "";
        const formula5 = document.createElement("div");
        formula5.textContent = "Diferença = LAB - MX";
        containerFormula.appendChild(formula5);

        const formula6 = document.createElement("div");
        formula6.textContent = "NovoKCBA = AntigoKCBA - diferença";
        containerFormula.appendChild(formula6);
        break;

    case "Espessura":
        let erroTHK = LAB - MX;
        let pol = 25.4;
        let ncTHK = ac - erroTHK / pol;
        nc = ncTHK;

        containerFormula.innerHTML = "";
        const formula7 = document.createElement("div");
        formula7.textContent = "Diferença = LAB - MX";
        containerFormula.appendChild(formula7);

        const formula8 = document.createElement("div");
        formula8.textContent = "NovoK5 = AntigoK5 - (Diferença/ 1 pol)";
        containerFormula.appendChild(formula8);
        break;

    case "CorL":
        let erroL = LAB - MX;
        let ncL = ac - erroL;
        nc = ncL;

        containerFormula.innerHTML = "";
        const formula9 = document.createElement("div");
        formula9.textContent = "Diferença = LAB - MX";
        containerFormula.appendChild(formula9);

        const formula10 = document.createElement("div");
        formula10.textContent = "NovoCORL = AntigoCORL - diferença";
        containerFormula.appendChild(formula10);
        break;

    case "CorA":
        let erroA = LAB - MX;
        let ncA = ac - erroA;
        nc = ncA;

        containerFormula.innerHTML = "";
        const formula11 = document.createElement("div");
        formula11.textContent = "Diferença = LAB - MX";
        containerFormula.appendChild(formula11);

        const formula12 = document.createElement("div");
        formula12.textContent = "NovoCORA = AntigoCORA - diferença";
        containerFormula.appendChild(formula12);
        break;

    case "CorB":
        let erroB = LAB - MX;
        let ncB = ac - erroB;
        nc = ncB;

        containerFormula.innerHTML = "";
        const formula13 = document.createElement("div");
        formula13.textContent = "Diferença = LAB - MX";
        containerFormula.appendChild(formula13);

        const formula14 = document.createElement("div");
        formula14.textContent = "NovoCORB = AntigoCORB - diferença";
        containerFormula.appendChild(formula14);
        break;
}
}