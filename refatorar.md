function calcOffSet() {
    const selectedSensor = selectSensor();
    console.log("Dentro do calc", selectedSensor);
    const sensorLabel = document.getElementById('sensorLabel');
    sensorLabel.textContent = selectedSensor;

    const containerFormula = document.getElementById('containerFormula');
    containerFormula.innerHTML = ''; // Limpa qualquer conteúdo anterior

    const formulas = {
        "Gramatura": [
            "Diferença = LAB - MX",
            "NovoDynOff = AntigoDynOff - diferença"
        ],
        "Umidade": [
            "Diferença = LAB - MX",
            "NovoMXIRDynINT = AntigoMXIRDynINT - diferença"
        ],
        "Cinza": [
            "Diferença = LAB - MX",
            "NovoK5 = AntigoK5 - diferença"
        ],
        "Espessura": [
            "Diferença = LAB - MX",
            "NovoTHK = AntigoTHK - diferença"
        ],
        "CorL": [
            "Diferença = LAB - MX",
            "NovoCORL = AntigoCORL - diferença"
        ],
        "CorA": [
            "Diferença = LAB - MX",
            "NovoCORA = AntigoCORA - diferença"
        ],
        "CorB": [
            "Diferença = LAB - MX",
            "NovoCORB = AntigoCORB - diferença"
        ]
    };

    if (selectedSensor in formulas) {
        const selectedFormulas = formulas[selectedSensor];
        selectedFormulas.forEach(formulaText => {
            const formula = document.createElement('div');
            formula.textContent = formulaText;
            containerFormula.appendChild(formula);
        });
    }
}
