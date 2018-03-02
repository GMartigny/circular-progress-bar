# Documentations

## CircularProgressBar
Main component class.

    new CircularProgressBar(value, [options]);

**[value]** - Starting value or set of values  
type: ``Number\|Array<Number>``  
default: ``0``

**[options]** - Component's options  
type: ``CPBOptions``
default: see [CPBOptions](#CPBOptions)

### Methods

To change values (or values), just change the ``value`` (or ``values``) property.

```js
const gauge = new CircularProgressBar();
gauge.value = 20; // Change value to 20%
// or
gauge.values = [10, 20, 30]; // Change values to 10%, 20% and 30% (multiple bars)
```

**appendTo** - Append the component to the DOM  
params: ``parent``  
type: ``HTMLElement``

**remove** - Remove it from the DOM  


## CPBOptions
Options set for the component.

default:
```js
options = {
    size: 150,
    barsWidth: 7,
    max: 100,
    showValue: true,
    valueDecimals: 0,
    valueUnit: "%",
    valueBackground: "#333",
    colors: ["#0095ff", "#ffa114", "#4714ff", "#ff14c8", "#c8ff14", "#204dff", "#ff203a", "#3aff20"],
    background: "rgba(0, 0, 0, .3)",
    transitionTime: 500,
    whenDone: "",
};
```

### Params

**[size]** - Component diameter in pixels  
type: ``Number``  
default: ``150``

**[barsWidth]** - Width of bars in % of size  
type: ``Number``  
default: ``7``

**[max]** - Value for a full 360° rotation  
type: ``Number``  
default: ``100``

**[showValue]** - Whether or not to display current value (if multiple value, sum is displayed)  
type: ``Boolean``  
default: ``true``

**[valueDecimals]** - Number of decimals to display  
type: ``Number``  
default: ``0``

**[valueUnit]** - Unit used for display (if set to "%", value is calculated over max)  
type: ``String``  
default: ``"%"``

**[valueBackground]** - Background color for value  
type: ``String``  
default: ``"#333"``

**[colors]** - Set of colors to use for bars  
type: ``Array<String>``  
default: ``["#ffa114", "#4714ff", "#ff14c8", "#c8ff14", "#ff203a", "#3aff20", "#204dff"]``

**[background]** - Background color where there's no bar  
type: ``String``  
default: ``"rgba(0, 0, 0, .3)"``

**[transitionTime]** - Transition duration  
type: ``Number``  
default: ``500``

**[valueWhenDone]** - Text to display when at 100%  
type: ``String``  
default: ``""``
