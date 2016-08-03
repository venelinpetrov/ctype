// sounds on: . , ! ? letter capitalLetter

(function (Africa) {
    Africa.sounds = []; // this array will be filled when all sounds are fetched
    Africa.kit = ['/AfricaKit/', ['001.wav', '002.wav', '003.wav', '004.wav', '005.wav', '006.wav', '007.wav']];

    Africa.play = function (e) {
        let bufferSource = new BufferSource();

        switch(e.keyCode) {
            case 8: {
                break;
            }

            //'.' and ','
            case 190: {
                bufferSource.buffer = this.sounds[0];
                bufferSource.soundName = '001';
                break;
            }
            case 188: {
                bufferSource.buffer = this.sounds[2];
                bufferSource.soundName = '003';
                break;
            }

            // '?'
            case 191: {
                if(e.shiftKey) {
                    bufferSource.buffer = this.sounds[1];
                    bufferSource.soundName = '002';
                    break;
                }
            }

            // '!'
            case 49: {
                if(e.shiftKey) {
                    bufferSource.buffer = this.sounds[6];
                    bufferSource.soundName = '007';
                    break;
                }
            }

            default: {
                if(!e.shiftKey) { //temporary, fix later
                    bufferSource.buffer = isVowel(e) ? this.sounds[4] : this.sounds[5];
                    bufferSource.soundName = isVowel(e) ? '005' : '006';
                    break;
                }
            }
        }

        return bufferSource;
    };

    function isVowel(e) {
        //a o u e i y
        switch(e.keyCode) {
            case 65:
            case 79:
            case 85:
            case 69:
            case 73:
            case 89:
                return true;
            default:
                return false;
        }
    }
})(window.Africa = window.Africa || {});
