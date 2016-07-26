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
        this.bypassed = false;

        //create filter node
        this.vcf = CTX.createBiquadFilter();

        //dry/wet gains
        this.dryGain = CTX.createGain();
        this.wetGain = CTX.createGain();

        //input and output
        this.inputNode = CTX.createGain();
        this.outputNode = CTX.createGain();

        //connections
        //input --> vcf --> wet --> output-(free out)
        this.inputNode.connect(this.vcf);
        this.vcf.connect(this.wetGain);
        this.wetGain.connect(this.outputNode);

        //input --> dry --> output-(free out)
        this.inputNode.connect(this.dryGain);
        this.dryGain.connect(this.outputNode);
    }

    get input() {
        return this.inputNode;
    }

    get output() {
        return this.outputNode;
    }

    connect(node) {
        this.output.connect(node);
    }

    get bypass() {
        return this.bypassed;
    }

    set bypass(bypassed) {
        try {
            if(bypassed) {
                this.inputNode.disconnect(this.vcf);
                this.inputNode.connect(this.outputNode);
            } else {
                this.inputNode.disconnect(this.outputNode);
                this.inputNode.connect(this.vcf);
            }
        } catch (e) {
        } finally {
            this.bypassed = bypassed;
        }
    }

    get type() {
        return this.vcf.type;
    }

    set type(value) {
        this.vcf.type = value;
    }

    get frequency() {
        return this.vcf.frequency.value;
    }

    set frequency(value) {
        this.vcf.frequency.value = value;
    }

    get gain() {
        return this.vcf.gain.value;
    }

    set gain(value) {
        this.vcf.gain.value = value;
    }

    get Q() {
        return this.vcf.Q.value;
    }

    set Q(value) {
        this.vcf.Q.value = value;
    }

    //set dry/wet, value=1 means 100% wet signal
    setDryWet(value) {
        this.wetGain.gain.value = value;
        this.dryGain.gain.value = 1 - value;
    }
}