(function () {
    'use strict'
    window.onload = onload;

    function onload() {
        let masterGain = CTX.createGain();
        let editorElem = document.querySelector('.editor');
        let kitInputs;
        let currentTypeCallback;
        
        kitInputs = KitsMenu.render(['africa', 'caret', 'simple', 'smooth']);

        document.getElementById('master_gain').addEventListener('change', e => {
            masterGain.gain.value = e.target.value;
            editorElem.focus();
        });

        Array.from(kitInputs, el => {
            el.addEventListener('change', changeKit);
        });

        kitInputs[0].checked = true;
        kitInputs[0].dispatchEvent(new Event('change'));

        function changeKit(e) {
            let kitName = e.target.value;
            console.log(kitName)
            Resource.fetchAll.apply(null, window[kitName].kit)
            .then(samples => {
                samples.forEach(function(sample, i) {
                    CTX.decodeAudioData(sample, (decodedSample) => {
                        window[kitName].sounds.push(decodedSample);
                    });
                });

                if (currentTypeCallback) {
                    editorElem.removeEventListener('keydown', currentTypeCallback);
                }
                
                currentTypeCallback = type.bind(null, kitName);
                editorElem.addEventListener('keydown', currentTypeCallback);
            }).catch(err => console.warn(err));
            editorElem.focus();
        }

        function type(kitName, e) {
            let bufferSource = window[kitName].play(e);

            bufferSource.connect(masterGain);
            masterGain.connect(CTX.destination);
            bufferSource.start(CTX.currentTime);
            bufferSource.onended = function() {
                bufferSource.stop();
                bufferSource = null;
            }
        };
        editorElem.focus();
    };
})();
