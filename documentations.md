# Documentations

## CircularProgressBar

**CircularProgressBar** constructor (value, options)



## CPBOptions

 * @prop {Number} [size=150] - Component diameter in pixels
 * @prop {Number} [barsWidth=10] - Width of bars
 * @prop {Number} [max=100] - Value for a full 360° rotation
 * @prop {Boolean} [showValue=true] - Whether or not to display current value inside (if multiple value, sum is displayed)
 * @prop {Number} [valueDecimals=0] - Number of decimals to display
 * @prop {String} [valueUnit="%"] - Unit used for display (if set to "%", value is calculated over max)
 * @prop {String} [valueBackground="#333"] - Background color for value
 * @prop {Array<String>} [colors] - Set of colors to use for bars
 * @prop {String} [background="#666"] - Background color where there's no bar
 * @prop {Number} [transitionTime=500] - Transition duration
