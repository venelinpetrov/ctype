//Complex, not complicated :)

function ComplexFilter() {
    let editorElem = document.querySelector('.editor');
    let vcf = new Filter();

    this.frequency = +document.getElementById('vcf1_freq').value;

    vcf.bypass(document.getElementById('vcf1_bypass').checked);
    vcf.type = document.getElementById('vcf1_type').value;
    vcf.frequency = +document.getElementById('vcf1_freq').value;
    vcf.Q = +document.getElementById('vcf1_Q').value;
    vcf.gain = +document.getElementById('vcf1_gain').value;

    vcf.setDryWet(+document.getElementById('vcf1_dw').value);

    return vcf;
}