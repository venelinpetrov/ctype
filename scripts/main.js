(function () {
    'use strict'
    window.onload = onload;

    function onload() {
        let masterGain = CTX.createGain();
        let sounds = {};
        let editorElem = document.getElementById('editor');

        Resource.fetchAll('/SimpleKit/',['000.wav','001.wav','002.wav'])
        .then(samples => {
            samples.forEach(function(sample, i) {
                CTX.decodeAudioData(sample, (decodedSample) => {
                    sounds[`00${i}`] = decodedSample;
                });
            });

            editorElem.addEventListener('keydown', e => {
                play(e);
            });
        }).catch(err => console.warn(err));

        document.getElementById('master_gain').addEventListener('change', (e) => {
            masterGain.gain.value = e.target.value;
        }, false);

        editorElem.focus();

        function play(e) {
            let bufferSource = CTX.createBufferSource();
            switch(e.keyCode) {
                case 8: {
                    bufferSource.buffer = sounds['000'];
                    break;
                }
                case 32: {
                    bufferSource.buffer = sounds['001'];
                    break;
                }
                default: {
                    bufferSource.buffer = sounds['002'];
                    break;
                }
            }

            bufferSource.connect(masterGain);
            masterGain.connect(CTX.destination);
            bufferSource.start(CTX.currentTime);
        }
    };
})();
