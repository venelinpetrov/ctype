

(function() {
     window.BufferSource = function() {
        var _gainNode = CTX.createGain();
        var _bufferSourceNode = CTX.createBufferSource();
        
        _bufferSourceNode.connect(_gainNode);

        Object.defineProperties(this, {
            "start": {
                value: function(time) {
                    _bufferSourceNode.start(time);
                }
            },
            "gain": {
                get: function() {
                    return _gainNode.gain.value;
                },
                set: function(value) {
                    _gainNode.gain.value = value;
                }
            },
            "connect": {
                value: function(node) {
                    _gainNode.connect(node);
                }
            },
            "buffer": {
                set: function(buffer) {
                    _bufferSourceNode.buffer = buffer;
                }
            }
        });
    };
})();