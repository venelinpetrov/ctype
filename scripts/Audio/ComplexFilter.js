//Complex, not complicated :)

function ComplexFilter() {
    let editorElem = document.querySelector('.editor');
    let vcf = new Filter();

    vcf.frequency = +document.getElementById('vcf1_freq').value;
    
    return vcf;
}