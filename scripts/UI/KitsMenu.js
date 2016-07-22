(function(KitsMenu){
    let ul = document.querySelector('.kit-select');
    let kitInputs;
    let i = 0;

    KitsMenu.init = function(kits) {
        kits.forEach(kitName => {
            let li =
            `<li>
                <input name="kit" id="${kitName}-kit" type="radio" value="${capitalize.call(kitName)}">
                <label for="${kitName}-kit">${capitalize.call(kitName)} Kit</label>
            </li>`;

            ul.innerHTML += li;
        });

        kitInputs = ul.getElementsByTagName('input');
        
        document.body.addEventListener('keydown', e => {
            switch(e.keyCode) {
                // TAB
                case 9: {
                    e.preventDefault();
                    //fix that later
                    if(e.shiftKey) {
                        i--;
                    } else {
                        i++;
                    }
                    this.checkRadio(kitInputs[Math.abs(i)%kitInputs.length]);
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

        return kitInputs;
    };
    
    KitsMenu.checkRadio = function (radio) {
        radio.checked = true;
        radio.dispatchEvent(new Event('change'));
    }

    function capitalize() {
        return this.charAt(0).toUpperCase() + this.slice(1);
    }
})(window.KitsMenu = window.KitsMenu || {});