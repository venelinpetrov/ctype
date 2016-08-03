# ctype
Provides keyboard key to sound mapping service + additional built-in sound adjustments.

## How to use

### Adding new kit

Sounds are grouped in kits under the `/sounds` folder. Each kit is conventionally named as follows: `<KitName>Kit`. 
Use web-friendly file format (I use .wav). To add new kit you need to do the following:

1. Provide your kit files by following the arrangement explained above. If the kit is already there - skip
2. Add the name of the kit in the `KITS_ARRAY` in `config.js` file. This is needed so it can be automatically rendered in the UI
3. Now you need to add your algorithm (or logic) file for the sounds mapping. 
This approach provides separation from the rest of the program code, so you don't have to worry where to plug things. 
You add logic under the `/Logic` folder under the form of js file, which has some arbitrary name (usually the name of the kit).
4. Add your logic script file in the `index.html`
5. The logic file has the following signature that is mandatory:
```js
(function (Africa) { //pass the name of the kit (mandatory)
    // this array will be filled when all sounds are fetched, leave it as is. (mandatory)
    Africa.sounds = []; 
    // Provide the path to the kit and the name of the sounds you like to fetch (mandatory)
    Africa.kit = ['/AfricaKit/', ['001.wav', '002.wav', '003.wav', '004.wav', '005.wav', '006.wav', '007.wav']];
  
    // Provide play function which accepts e (event) argument (mandatory)
    Africa.play = function (e) {
        // "Instantiate" BufferSource (mandatory)
        let bufferSource = new BufferSource();
        
        // Your logic goes here. Do whatever you want (optional, example below)
        switch(e.keyCode) {
            //'.' and ','
            case 190: {
                // This line maps sounds[0] to key 190, finally!
                bufferSource.buffer = this.sounds[0];
                // soundName is optional and could be anything. This will tell the program to automatically map a filter to this sound.
                // if you don't provide a name filter will be mapped to the current key that is being pressed. Overall, this gives the 
                // ability to use the same sound and the same filter setting for a group of keys
                bufferSource.soundName = '001';
                break;
            }
            case 188: {
                bufferSource.buffer = this.sounds[2];
                bufferSource.soundName = '003';
                break;
            }
            default: {
              // ...
              break;
            }
        }
        
        // return the bufferSource object back (mandatory)
        return bufferSource;
    };

})(window.Africa = window.Africa || {}); // (mandatory)
```
Note: I see some "weak" spots right now, like why the kit should be provided as ` '/AfricaKit/' ` and not simply ` 'AfricaKit' `
and the strange looking empty array on the first line. Just close your eyes and meditate. If your day is sunny make PR! 

### Connections
Firstly it's important to know how the things are connected. It's pretty simple in this case

(BufferSource)-->(BiquadFilter)-->(Gain)-->(Speakers)

The filter has some more internal connections but that's irrelevant now.

### Notes on filter
Skip this if you know the theory

This program provides several different filter: Lowpass, Highpass, Bandpass, Lowshelf, Highshelf and Notch, which are useful for different applications.
For instance, Lowpass and Bandpass are pretty "agressive" in frequency cutting and are commonly used in sound synthesis, whereas Lowshelf and Highshelf
are more "smooth" and are common in mixing applications. More on filters below:

####All filters
All filters in this program has the following common options (although all options are visible (but not functional) in the UI )

1. **Bypass** (default: true) - sound passes freely without being modified at all
2. **Type** (default: Lowpass) - the type of the filter
3. **Frequency** - this is the cutoff frequency in `Hz` or point where the intensity of sound for drops by 12dB (for second order filter, which is the case with web audio api). Range [20Hz - 20kHz]
4. **Dry/Wet** (default: 1) - this parameter determines how much of the original sound is passed freely and how much is filtered. 1 means 100% filtered. Range [0-1]
5. **Output Level** (default: 1) - this is not a real filter parameter, it's convenience that allows you to "mix" the sounds, i.e. adjust their relative leveles. You can use this to make some sounds more obvious or less obvious. Range [0-1]

####Lowpass filter
![lp](https://cloud.githubusercontent.com/assets/3126733/17375317/1584a340-59b9-11e6-801c-75d99baee795.png)

Additional parameter:

**Q** - quality factor, or resonance, meaning how resonant is the filter around the cutoff frequency. Unitless, range [0-12]

####Highpass filter
![hp](https://cloud.githubusercontent.com/assets/3126733/17375420/90b212be-59b9-11e6-8080-5ca71cdeb059.png)

Additional parameter:

**Q** - quality factor, or resonance, meaning how resonant is the filter around the cutoff frequency. Unitless, range [0-12]

###Bandpass filter
![bp](https://cloud.githubusercontent.com/assets/3126733/17375432/9a7205f2-59b9-11e6-8373-c941eb8c4ac1.png)

Additional parameter:

**Q** - quality factor, or resonance, meaning how resonant is the filter around the cutoff frequency. Unitless, range [0-12]

###Lowshelf filter
![ls](https://cloud.githubusercontent.com/assets/3126733/17375433/9de3f916-59b9-11e6-8175-70f79ccd3e4f.png)

Additional parameter:

**Gain** - how much the frequencies are attenuated (if negative) or how much the frequencies are boosted (if positive). Unitless, range [-40-+40]

###Highshelf filter
![hs](https://cloud.githubusercontent.com/assets/3126733/17375437/a17fb59c-59b9-11e6-9cca-2d527abbe52a.png)

Additional parameter:

**Gain** - how much the frequencies are attenuated (if negative) or how much the frequencies are boosted (if positive). Unitless, range [-40-+40]

###Notch filter
![nc](https://cloud.githubusercontent.com/assets/3126733/17375443/a4ee0aa8-59b9-11e6-886e-2bc503b36846.png)

Additional parameter:

**Q** - quality factor, or resonance, meaning how resonant is the filter around the cutoff frequency. Unitless, range [0-12]

It should be clear that Q change doesn't make any difference to Lowshelf or Highshelf filters or Gain to Lowpass and Highpass and so on.

##Known issues

1. If you need to change sound parameter you should click the same key again so the setting to be saved. This shouldn't be so scarry, given that you probably want to actually hear the change after it has been made
2. If you want to change parameters for sound that is bound to Shift+something key you need to keep holding the shift while making the change
3. No settings import/export. But this is almost trivial as all settings are already stored in the `States` global object.
