// sounds on: . , ! ? letter capitalLetter

(function (Africa) {
    Africa.sounds = [];
    Africa.kit = ['/AfricaKit/', ['001.wav', '002.wav', '003.wav', '004.wav', '005.wav', '006.wav', '007.wav']];
    
    Africa.play = function (e) {
        let bufferSource = new BufferSource();
        let vcf1 = new Filter();
        //let vcf2 = new Filter();

        vcf1.type = 'lowpass';
        vcf1.frequency = 400;

        switch(e.keyCode) {
            //backspace, simulates error on typing (dummy)
            case 8: {
                break;
            }

            //'.' and ','
            case 190: {
                bufferSource.gain = .5;
                bufferSource.buffer = this.sounds[0];
                break;
            }
            case 188: {
                bufferSource.gain = .4;
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
                    bufferSource.buffer = isVowel(e) ? this.sounds[4] : this.sounds[5]; // try also this.sounds[3] : this.sounds[4];
                    bufferSource.connect(vcf1);
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
