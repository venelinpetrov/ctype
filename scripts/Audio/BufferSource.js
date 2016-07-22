class BufferSource {
    constructor() {
        this._gainNode = CTX.createGain();
        this._bufferSourceNode = CTX.createBufferSource();
        this._bufferSourceNode.connect(this._gainNode);
    }

    start(time) {
        this._bufferSourceNode.start(time);
    }

    connect(node) {
        this._gainNode.connect(node);
    }

    get gain() {
        return this._gainNode.gain.value;
    }

    set gain(value) {
        this._gainNode.gain.value = value;
    }
    
    get buffer() {
        return this._bufferSourceNode.buffer;
    }

    set buffer(buffer) {
        this._bufferSourceNode.buffer = buffer;
    }
}