(function () {
    'use strict'
    window.onload = onload;

    function onload() {
        let masterGain = CTX.createGain();
        let editorElem = document.getElementById('editor');

        Resource.fetchAll.apply(null, Logic.kit)
        .then(samples => {
            samples.forEach(function(sample, i) {
                CTX.decodeAudioData(sample, (decodedSample) => {
                    Logic.sounds.push(decodedSample);
                });
            });

            editorElem.addEventListener('keydown', e => {
                let bufferSource = Logic.play(e);
                bufferSource.connect(masterGain);
                masterGain.connect(CTX.destination);
                bufferSource.start(CTX.currentTime);
                bufferSource.onended = function() {
                    bufferSource.stop();
                    bufferSource = null;
                }
            });
        }).catch(err => console.warn(err));

        document.getElementById('master_gain').addEventListener('change', (e) => {
            masterGain.gain.value = e.target.value;
        }, false);

        editorElem.focus();
    };
})();
