//Complex, not complicated :)

function ComplexFilter(filterName) {
    let editorElem = document.querySelector('.editor');
    let vcf = new Filter();

    State[filterName] = State[filterName] || {};

    setParameter('frequency', 'vcf1_freq');
    setParameter('type', 'vcf1_type');
    State.soundPointer = filterName;


    function setParameter(param, inputElemName) {
        let inputElem = document.getElementById(inputElemName);
        if(State.soundPointer == filterName || State.soundPointer == null) {
            State[filterName][param] = parse(inputElem.value);
            vcf[param] = State[filterName][param];
            inputElem.value = vcf[param];
        } else {
            vcf[param] = State[filterName][param] || inputElem.value;
            inputElem.value = vcf[param];
        }
    }

    function parse(str) {
        var value = Number(str);

        if(!isNaN(Number(str))) {
            return Number(str);
        }
        if(str == 'true') {
            return true;
        }
        if(str == 'false') {
            return false;
        }
        return str;
    }

    vcf.bypass(document.getElementById('vcf1_bypass').checked);
    vcf.type = document.getElementById('vcf1_type').value;
    //vcf[param] = +document.getElementById('vcf1_freq').value;
    vcf.Q = +document.getElementById('vcf1_Q').value;
    vcf.gain = +document.getElementById('vcf1_gain').value;

    vcf.setDryWet(+document.getElementById('vcf1_dw').value);

    return vcf;
}