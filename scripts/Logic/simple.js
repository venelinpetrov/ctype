(function (Simple) {
    Simple.sounds = [];
    Simple.kit = ['/SimpleKit/', ['000.wav','001.wav','002.wav']];
    Simple.play = function (e) {
        let bufferSource = CTX.createBufferSource();
        switch(e.keyCode) {
            //backspace
            case 8: {
                bufferSource.buffer = this.sounds[0];
                break;
            }
            //space
            case 32: {
                bufferSource.buffer = this.sounds[1];
                break;
            }
            default: {
                bufferSource.buffer = this.sounds[2];
                break;
            }
        }

        return bufferSource;
    };
})(window.Simple = window.Simple || {});
