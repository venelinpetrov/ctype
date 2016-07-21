(function () {
    'use strict'
    window.onload = onload;

    function onload() {
        let masterGain = CTX.createGain();
        let masterGainElem = document.getElementById('master_gain');
        let editorElem = document.querySelector('.editor');
        let kitInputs;
        let currentTypeCallback;
        let i = 0;

        kitInputs = KitsMenu.render(KITS_ARRAY);

        masterGainElem.addEventListener('change', e => {
            masterGain.gain.value = e.target.value;
            editorElem.focus();
        });

        document.body.addEventListener('keydown', e => {
            switch(e.keyCode) {
                // TAB
                case 9: {
                    e.preventDefault();
                    if(e.shiftKey) {
                        i--;
                    } else {
                        i++;
                    }
                    checkRadio(kitInputs[Math.abs(i)%kitInputs.length]);
                    break;
                }

                //F2
                case 113: {
                    e.preventDefault();
                    masterGainElem.value = +masterGainElem.value - .1;
                    masterGainElem.dispatchEvent(new Event('change'));
                    break;
                }

                //F3
                case 114: {
                    e.preventDefault();
                    masterGainElem.value = +masterGainElem.value + .1;
                    masterGainElem.dispatchEvent(new Event('change'));
                    break;
                }
            }
        });
        
        Array.from(kitInputs, el => {
            el.addEventListener('change', changeKit);
        });

        checkRadio(kitInputs[0]);

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

        function checkRadio(radio) {
            radio.checked = true;
            radio.dispatchEvent(new Event('change'));
        }

        editorElem.focus();
    };
})();
