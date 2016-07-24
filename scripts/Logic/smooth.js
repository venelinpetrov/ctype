(function (Smooth) {
    Smooth.sounds = [];
    Smooth.kit = ['/SmoothKit/', ['001.wav','002.wav']];
    Smooth.play = function (e) {
        let bufferSource = new BufferSource();
        
        if (e.keyCode == 8) {
            bufferSource.buffer = this.sounds[0];
            
        } else {
            bufferSource.buffer = this.sounds[1];
        }
        
        return bufferSource;
    };
})(window.Smooth = window.Smooth || {});
