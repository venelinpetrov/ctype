//Complex, not complicated :)

function ComplexFilter(filterName) {
    let editorElem = document.querySelector('.editor');
    let vcf = new Filter();

    State[filterName] = State[filterName] || {};

    setParameter('bypass', 'vcf1_bypass');
    setParameter('type', 'vcf1_type');
    setParameter('frequency', 'vcf1_freq');
    setParameter('Q', 'vcf1_Q');
    setParameter('gain', 'vcf1_gain');
    setParameter('dryWet', 'vcf1_dw');

    State.soundPointer = filterName;

    function setParameter(param, inputElemName) {
        let inputElem = document.getElementById(inputElemName);
        let inputType = inputElem.getAttribute('data-type');
        let inputElemValue;

        switch(inputType) {
            case 'number': {
                inputElemValue = +inputElem.value;
                break;
            }
            case 'boolean': {
                inputElemValue = inputElem.checked;
                break;
            }
            case 'string':
            default: {
                inputElemValue = inputElem.value;
            }
        }

        //case: same sound as before
        if(State.soundPointer == filterName) {
            State[filterName][param] = inputElemValue;
            vcf[param] = State[filterName][param];

        //case: different sound
        } else {
            vcf[param] = State[filterName][param] != undefined ? State[filterName][param] : inputElemValue;
            if(inputType == 'boolean') {
                inputElem.checked = vcf[param];
            } else {
                inputElem.value = vcf[param];
            }
        }
    }

    return vcf;
}