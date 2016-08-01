/**
    Filter class

    Filter types

        - lowpass (12dB/octave)    ---\
            @ frequency - the cutoff frequency [HZ]
            @ Q - the resonance [0 to 12] [dB]

        - highpass (12dB/octave)    /---
            @ frequency - the cutoff frequency [HZ]
            @ Q - the resonance [0 to 12] [dB]

        - bandpass (12dB/octave each side)    __/--\__
            @ frequency - the center frequency [HZ]
            @ Q - controls the width of the band. The width becomes narrower as the Q value increases [.2 to 30]

        - lowshelf    --\__
            @ frequnecy - the upper limit of the frequences where the boost (or attenuation) is applied. [Hz]
            @ gain - the boost (+/-) [dB]

        - highshelf    __/--
            @ frequnecy - the lower limit of the frequences where the boost (or attenuation) is applied. [Hz]
            @ gain - the boost (+/-) [dB]

        - peaking    __/\__
            @ frequency - the center frequency of where the boost is applied [Hz]
            @ Q - controls the width of the band of frequencies that are boosted. A large value implies a narrow width [.2 to 30]
            @ gain - the boost (+/-) [dB]

        - notch    --\/--
            @ frequency - the center frequency of where the notch is applied
            @ Q - controls the width of the band of frequencies that are attenuated. A large value implies a narrow width [.2 to 30]

*/
class Filter {
    constructor() {
        this._bypassed = true;
        this._dryWet= 1;
        //create filter node
        this._vcf = CTX.createBiquadFilter();

        //dry/wet gains
        this._dryGain = CTX.createGain();
        this._wetGain = CTX.createGain();

        //input and output
        this._input = CTX.createGain();
        this._output = CTX.createGain();

        //connections
        //input --> vcf --> wet --> output-(free out)
        this._input.connect(this._vcf);
        this._vcf.connect(this._wetGain);
        this._wetGain.connect(this._output);

        //input --> dry --> output-(free out)
        this._input.connect(this._dryGain);
        this._dryGain.connect(this._output);
    }

    get input() {
        return this._input;
    }

    get output() {
        return this._output;
    }

    connect(node) {
        this.output.connect(node);
    }

    get bypass() {
        return this._bypassed;
    }

    set bypass(bypassed) {
        try {
            if(bypassed) {
                this._input.disconnect(this._vcf);
                this._input.connect(this._output);
            } else {
                this._input.disconnect(this._output);
                this._input.connect(this._vcf);
            }
        } catch (e) {
        } finally {
            this._bypassed = bypassed;
        }
    }

    get type() {
        return this._vcf.type;
    }

    set type(value) {
        this._vcf.type = value;
    }

    get frequency() {
        return this._vcf.frequency.value;
    }

    set frequency(value) {
        this._vcf.frequency.value = value;
    }

    get gain() {
        return this._vcf.gain.value;
    }

    set gain(value) {
        this._vcf.gain.value = value;
    }

    get Q() {
        return this._vcf.Q.value;
    }

    set Q(value) {
        this._vcf.Q.value = value;
    }

    get dryWet() {
        return this._dryWet;
    }

    //set dry/wet, value=1 means 100% wet signal
    set dryWet(value) {
        this._dryWet = value;
        this._wetGain.gain.value = value;
        this._dryGain.gain.value = 1 - value;
    }
}