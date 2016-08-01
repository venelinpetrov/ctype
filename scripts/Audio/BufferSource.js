class BufferSource {
    constructor() {
        this._gainNode = CTX.createGain();
        this._bufferSourceNode = CTX.createBufferSource();
        this._bufferSourceNode.connect(this._gainNode);
        this._soundName = '';
        this._outputNode = null;
    }

    start(time) {
        this._bufferSourceNode.start(time);
    }

    connect(node) {
        this._gainNode.connect(node.input);
        this._outputNode = node.output;
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

    get output() {
        return this._outputNode || this._gainNode;
    }

    get soundName() {
        return this._soundName;
    }

    set soundName(value) {
        this._soundName = value;
    }
}