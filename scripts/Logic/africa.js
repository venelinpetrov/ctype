// sounds on: . , ! ? letter capitalLetter

(function (Logic) {
    Logic.sounds = [];
    Logic.kit = ['/AfricaKit/', ['001.wav', '002.wav', '003.wav', '004.wav', '005.wav', '006.wav', '007.wav']];
    Logic.play = function (e) {
        let bufferSource = CTX.createBufferSource();
        switch(e.keyCode) {
            //backspace, simulates error on typing (dummy)
            case 8: {
                bufferSource.buffer = this.sounds[6];
                break;
            }

            //'.' and ','
            case 190:
            case 188: {
                break;
            }

            // '?'
            case 191: {
                if(e.shiftKey) {
                    bufferSource.buffer = this.sounds[1];
                    break;
                }
            }

            // '!'
            case 49: {
                if(e.shiftKey) {
                    bufferSource.buffer = this.sounds[6];
                    break;
                }
            }

            //space
            // case 32: {
            //     break;
            // }
            // case 16: {
            //     e.preventDefault();
            // }
            default: {
                if(!e.shiftKey) { //temporary, fix later
                    bufferSource.buffer = Math.random() >= .5 ? this.sounds[4] : this.sounds[5];
                    break;
                }
            }
        }

        return bufferSource;
    };
})(window.Logic = window.Logic || {});
