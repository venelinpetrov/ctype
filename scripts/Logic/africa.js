// sounds on: . , ! ? letter capitalLetter

(function (Logic) {
    Logic.sounds = [];
    Logic.kit = ['/AfricaKit/', ['001.wav', '002.wav', '003.wav', '004.wav', '005.wav', '006.wav', '007.wav']];
    
    Logic.play = function (e) {
        let bufferSource = new BufferSource();

        switch(e.keyCode) {
            //backspace, simulates error on typing (dummy)
            // case 8: {
            //     bufferSource.gain = .2;
            //     bufferSource.buffer = this.sounds[6];
            //     break;
            // }

            //'.' and ','
            case 190: {
                bufferSource.gain = .6;
                bufferSource.buffer = this.sounds[0];
                break;
            }
            case 188: {
                bufferSource.gain = .6;
                bufferSource.buffer = this.sounds[2];
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
                    bufferSource.gain = .2;
                    bufferSource.buffer = this.sounds[6];
                    break;
                }
            }

            default: {
                if(!e.shiftKey) { //temporary, fix later
                    bufferSource.gain = .2;
                    bufferSource.buffer = Math.random() >= .5 ? this.sounds[4] : this.sounds[5];
                    break;
                }
            }
        }

        return bufferSource;
    };
})(window.Logic = window.Logic || {});
