(function (Logic) {
    Logic.sounds = {};
    Logic.kit = ['/SimpleKit/',['000.wav','001.wav','002.wav']];
    Logic.play = function (e) {
        let bufferSource = CTX.createBufferSource();
        switch(e.keyCode) {
            case 8: {
                bufferSource.buffer = this.sounds['000'];
                break;
            }
            case 32: {
                bufferSource.buffer = this.sounds['001'];
                break;
            }
            default: {
                bufferSource.buffer = this.sounds['002'];
                break;
            }
        }

        return bufferSource;
    };
})(window.Logic = window.Logic || {});