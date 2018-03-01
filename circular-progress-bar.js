import "./circular-progress-bar.less";

const classesPrefix = "circular-progress-bar";

/**
 * Create a new html element
 * @param {String} classes - Some css classes
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

const getLooped = (array, index) => array[index % array.length];

const toDeg = percent => percent * (360 / 100);

/**
 * Class for CircularProgressBar's Bar
 * @class
 */
class Bar {
    /**
     * Bar constructor
     */
    constructor () {
        this.html = wrap("bar");

        this._nodes = (new Array(2)).fill().map(() => {
            const clip = wrap("clip", this.html);
            return {
                clip,
                part: wrap("part", clip),
            };
        });

        /**
         * @private
         */
        this._value = 0;
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
        const rotate = `rotate3d(0, 0, 1, ${toDeg(value / 2) - 179}deg)`;
        this._nodes.forEach((node) => {
            node.clip.style.transitionDuration = `${time}ms`;
            node.part.style.transitionDuration = `${time}ms`;
            node.part.style.transform = rotate;
            node.part.style.backgroundColor = color;
        });

        this._nodes[0].clip.style.transform = `rotate3d(0, 0, 1, ${toDeg(offset)}deg)`;
        this._nodes[1].clip.style.transform = `rotate3d(0, 0, 1, ${toDeg((value / 2) + offset)}deg)`;
        this._value = value;
    }

    /**
     * Delete the bar from the DOM
     */
    remove () {
        this.html.remove();
    }
}

/**
 * Class for CircularProgressBar
 * @class
 */
export default class CircularProgressBar {
    /**
     * CircularProgressBar constructor
     * @param {Number|Array<Number>} [value=0] - Starting value or a set of values
     * @param {CPBOptions} [options] - Some options
     */
    constructor (value = 0, options) {
        this.options = Object.assign(CircularProgressBar.defaultOptions, options);

        this.html = wrap();
        const size = `${this.options.size}px`;
        this.html.style.width = size;
        this.html.style.height = size;
        this.html.style.backgroundColor = this.options.background;

        this.wrapper = wrap("wrapper", this.html);

        this.valueNode = wrap("value", this.html);
        this.valueNode.style.backgroundColor = this.options.valueBackground;
        const valueSize = `${this.options.size - (this.options.barsWidth * 2)}px`;
        this.valueNode.style.width = valueSize;
        this.valueNode.style.height = valueSize;
        this.valueNode.style.lineHeight = valueSize;
        const valueOffset = `${this.options.barsWidth}px`;
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
     * Change value with only one bar
     * @param {Number} value - Any value
     */
    set value (value) {
        this.values = [value];
    }

    /**
     * Change values with multiple bars
     * @param {Array<Number>} values - Any set of value
     */
    set values (values) {
        if (this.options.showValue) {
            this.valueNode.style.visibility = "";
            const sum = values.reduce((acc, value) => acc + value, 0);
            const used = (values.length === 1 ? values[0] : sum);
            const displayed = this.options.valueUnit === "%" ? (used / this.options.max) * 100 : used;
            this.valueTextNode.textContent = displayed.toFixed(this.options.valueDecimals) + this.options.valueUnit;
        }
        else {
            this.valueNode.style.visibility = "hidden";
        }

        let offset = 0;
        let lastIndex = 0;
        values.forEach((value, index) => {
            let bar = this._bars[index];
            if (!bar) {
                bar = new Bar(this.options.colors[index]);
                this._bars.push(bar);
                this.wrapper.appendChild(bar.html);
            }
            const percentage = (value / this.options.max) * 100;
            bar.update(percentage, this.options.transitionTime, getLooped(this.options.colors, index), offset);
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
     * Append the component to another element
     * @param {HTMLElement} parent - Another DOM element
     */
    appendTo (parent) {
        parent.appendChild(this.html);
    }


    /**
     * @typedef {Object} CPBOptions
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
     */
    /**
     * Returns the default options of the component
     * @return {CPBOptions}
     */
    static get defaultOptions () {
        return {
            size: 150,
            barsWidth: 10,
            max: 100,
            showValue: true,
            valueDecimals: 0,
            valueUnit: "%",
            valueBackground: "#333",
            colors: ["#ffa114", "#4714ff", "#ff14c8", "#c8ff14", "#ff203a", "#3aff20", "#204dff"],
            background: "rgba(0, 0, 0, .3)",
            transitionTime: 500,
        };
    }
}
