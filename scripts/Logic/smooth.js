(function (Logic) {
    Logic.sounds = [];
    Logic.kit = ['/SmoothKit/', ['001.wav','002.wav']];
    Logic.play = function (e) {
        let bufferSource = CTX.createBufferSource();
        
        if (e.keyCode == 8) {
            bufferSource.buffer = this.sounds[0];
            
        } else {
            bufferSource.buffer = this.sounds[1];
        }
        
        return bufferSource;
    };
})(window.Logic = window.Logic || {});
