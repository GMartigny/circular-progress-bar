# Documentations

## CircularProgressBar
Main component class.

    new CircularProgressBar(value, [options]);

**[value]** - Starting value or set of values  
type: ``Number\|Array<Number>``  
default: ``0``

**[options]** - Component's options  
type: ``CPBOptions``
default: see [CPBOptions](#cpboptions)

### Methods

To change value (or values), just change the ``value`` (or ``values``) property.

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
    whenDone: false,
};
```

### Params

| Name | Type | Default | Comment |
| --- | --- | --- | --- |
| size | ``Number`` | ``150`` | Component diameter in pixels |
| barsWidth | ``Number`` | ``7`` | Width of bars in % of size |
| max | ``Number`` | ``100`` | Value for a full 360° rotation |
| showValue | ``Boolean`` | ``true`` | Whether or not to display current value (if multiple value, sum is displayed) |
| valueDecimals | ``Number`` | ``0`` | Number of decimals to display |
| valueUnit | ``String`` | ``"%"`` | Unit used for display (if set to "%", value is calculated over max) |
| valueBackground | ``String`` | ``"#333"`` | Background color for value |
| colors | ``Array<String>`` | ``["#ffa114", "#4714ff", "#ff14c8", "#c8ff14", "#ff203a", "#3aff20", "#204dff"]`` | Set of colors to use for bars |
| background | ``String`` | ``"rgba(0, 0, 0, .3)"`` | Background color where there's no bar |
| transitionTime | ``Number`` | ``500`` | Transition duration in ms |
| valueWhenDone | ``String`` | ``null`` | Text to display when at 100% (null to disable) |
