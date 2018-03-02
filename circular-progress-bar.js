import "./circular-progress-bar.css";

const classesPrefix = "circular-progress-bar";

/**
 * Create a new html element
 * @param {String} [classes] - Some css classes
 * @param {HTMLElement} [parent] - Parent to append the element
 * @return {HTMLDivElement}
 */
const wrap = (classes, parent) => {
    const element = document.createElement("div");
    element.className = classesPrefix + (classes ? `-${classes}` : "");
    if (parent) {
        parent.appendChild(element);
    }
    return element;
};

/**
 * Get item from an array without overflow
 * @param {Array} array - Any array
 * @param {Number} index - Any positive number
 * @return {*}
 */
const getLooped = (array, index) => array[index % array.length];

/**
 * Tell if two number are equals
 * @param {Number} n1 - Any positive number
 * @param {Number} n2 - Any positive number
 * @return {Boolean}
 */
const equals = (n1, n2) => Math.abs(n1 - n2) < Number.EPSILON;

/**
 * Change percentage into degree
 * @param {Number} percent - Any percentage
 * @return {Number}
 */
const toDegree = percent => percent * (360 / 100);

/**
 * Class for CircularProgressBar's Bar
 * @class
 */
class Bar {
    /**
     * Bar constructor
     */
    constructor () {
        this.node = wrap("bar");

        this._nodes = (new Array(2)).fill().map(() => {
            const clip = wrap("clip", this.node);
            return {
                clip,
                part: wrap("part", clip),
            };
        });

        /**
         * @private
         */
        this._value = undefined;
    }

    /**
     * Returns this bar's value
     * @return {Number}
     */
    get value () {
        return this._value;
    }

    /**
     * Change the bar value and look
     * @param {Number} value - New value in %
     * @param {Number} time - Time in ms to change
     * @param {String} color - Color to use
     * @param {Number} [offset=0] - Starting position in %
     */
    update (value, time, color, offset = 0) {
        if (!equals(value, this._value)) {
            const half = value / 2;
            const rotate = `rotate3d(0,0,1,${toDegree(half) - 180}deg)`;
            this._nodes.forEach((node) => {
                node.clip.style.transitionDuration = `${time}ms`;
                node.part.style.transitionDuration = `${time}ms`;
                node.part.style.transform = rotate;
                node.part.style.backgroundColor = color;
            });

            this._nodes[0].clip.style.transform = `rotate3d(0,0,1,${toDegree(offset) + 0.3}deg)`;
            this._nodes[1].clip.style.transform = `rotate3d(0,0,1,${toDegree(half + offset)}deg)`;
            this._value = value;
        }
    }

    /**
     * Delete the bar from the DOM
     */
    remove () {
        this.node.remove();
    }
}

/**
 * Class for CircularProgressBar
 * @class
 */
export default class CircularProgressBar {
    /**
     * CircularProgressBar constructor
     * @param {Number|Array<Number>} [value=0] - Starting value or set of values
     * @param {CPBOptions} [options] - Component's options
     */
    constructor (value = 0, options) {
        this.options = Object.assign(CircularProgressBar.defaultOptions, options);

        this.node = wrap();
        const size = `${this.options.size}px`;
        this.node.style.width = size;
        this.node.style.height = size;
        this.node.style.backgroundColor = this.options.background;

        this.wrapper = wrap("wrapper", this.node);

        this.valueNode = wrap("value", this.node);
        this.valueNode.style.backgroundColor = this.options.valueBackground;
        const borderWidth = this.options.size * (this.options.barsWidth / 100);
        const valueSize = `${this.options.size - (borderWidth * 2)}px`;
        this.valueNode.style.width = valueSize;
        this.valueNode.style.height = valueSize;
        this.valueNode.style.lineHeight = valueSize;
        const valueOffset = `${borderWidth}px`;
        this.valueNode.style.top = valueOffset;
        this.valueNode.style.left = valueOffset;
        this.valueTextNode = wrap("text", this.valueNode);
        this.valueTextNode.style.fontSize = `${this.options.size / 5}px`;

        /**
         * @type {Array<Bar>}
         * @private
         */
        this._bars = [];

        this.values = Array.isArray(value) ? value : [value];
    }

    /**
     * Change value using only one bar
     * @param {Number} value - Any value
     */
    set value (value) {
        this.values = [value];
    }

    /**
     * Change values using multiple bars
     * @param {Array<Number>} values - Any set of value
     */
    set values (values) {
        const opts = this.options;
        this.valueNode.style.visibility = opts.showValue ? "" : "hidden";
        if (opts.showValue) {
            const sum = values.reduce((acc, value) => acc + value, 0);
            const used = Math.min(values.length === 1 ? values[0] : sum, opts.max);
            if (used === opts.max && opts.valueWhenDone !== false) {
                if (this.valueTextNode.textContent !== opts.valueWhenDone) {
                    setTimeout(() => this.valueTextNode.textContent = opts.valueWhenDone, opts.transitionTime);
                }
            }
            else {
                const displayed = opts.valueUnit === "%" ? (used / opts.max) * 100 : used;
                this.valueTextNode.textContent = displayed.toFixed(opts.valueDecimals) + opts.valueUnit;
            }
        }

        let offset = 0;
        let lastIndex = 0;
        values.forEach((value, index) => {
            let bar = this._bars[index];
            if (!bar) {
                bar = new Bar(opts.colors[index]);
                this._bars.push(bar);
                this.wrapper.appendChild(bar.node);
            }
            const percentage = (Math.min(value, opts.max) / opts.max) * 100;
            bar.update(percentage, opts.transitionTime, getLooped(opts.colors, index), offset);
            offset += percentage;
            lastIndex = index;
        });
        this._bars.splice(lastIndex + 1, this._bars.length).forEach(bar => bar.remove());
    }

    /**
     * Returns current value with only one bar
     * @return {Number}
     */
    get value () {
        return this._bars[0].value;
    }

    /**
     * Returns current value of all bars
     * @return {Array<Number>}
     */
    get values () {
        return this._bars.map(bar => bar.value);
    }

    /**
     * Append the component to the DOM
     * @param {HTMLElement} parent - Another DOM element
     */
    appendTo (parent) {
        parent.appendChild(this.node);
    }

    /**
     * Remove it from the DOM
     */
    remove () {
        this.node.remove();
    }


    /**
     * @typedef {Object} CPBOptions
     * @prop {Number} [size=150] - Component diameter in pixels
     * @prop {Number} [barsWidth=7] - Width of bars in % of size
     * @prop {Number} [max=100] - Value for a full 360° rotation
     * @prop {Boolean} [showValue=true] - Whether or not to display current value (if multiple value, sum is displayed)
     * @prop {Number} [valueDecimals=0] - Number of decimals to display
     * @prop {String} [valueUnit="%"] - Unit used for display (if set to "%", value is calculated over max)
     * @prop {String} [valueBackground="#333"] - Background color for value
     * @prop {Array<String>} [colors] - Set of colors to use for bars
     * @prop {String} [background="rgba(0, 0, 0, .3)"] - Background color where there's no bar
     * @prop {Number} [transitionTime=500] - Transition duration in ms
     * @prop {String} [valueWhenDone=""] - Text to display when at 100% (false to disable)
     */
    /**
     * Returns the default options of the component
     * @return {CPBOptions}
     */
    static get defaultOptions () {
        return {
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
            valueWhenDone: "",
        };
    }
}
