import Ola from "ola";
import "./style.less";

const getLooped = (array, index) => array[index % array.length];

const style = (element, styles) => {
    Object.keys(styles).forEach(key => element.style[key] = styles[key]);
};

const valuesKey = Symbol("_values");
const interpolatedKey = Symbol("_interpolated");
const textKey = Symbol("_text");
const updateKey = Symbol("_update");
const lastUpdateKey = Symbol("_lastUpdate");
const animationKey = Symbol("_animationFrame");
const classPrefix = "circular-progress-bar";

/**
 * @class
 */
export default class CircularProgressBar {
    /**
     * CircularProgressBar constructor
     * @param {Number|Array<Number>} [value=0] - Starting value or set of values
     * @param {CPBOptions} [options] - Component's options
     */
    constructor (value = 0, options) {
        this.options = {
            ...CircularProgressBar.defaultOptions,
            ...options,
        };

        this.node = document.createElement("div");
        this.node.className = classPrefix;
        style(this.node, {
            width: `${this.options.size}px`,
            height: `${this.options.size}px`,
        });

        const valueNode = document.createElement("div");
        valueNode.className = `${classPrefix}_value`;
        const valueSize = ((100 - this.options.barsWidth) / 100) * this.options.size;
        style(valueNode, {
            background: this.options.valueBackground,
            width: `${valueSize}px`,
            height: `${valueSize}px`,
            top: `${this.options.barsWidth / 2}%`,
            left: `${this.options.barsWidth / 2}%`,
        });
        this.node.appendChild(valueNode);

        this[textKey] = document.createElement("div");
        this[textKey].className = `${classPrefix}_value_text`;
        style(this[textKey], {
            lineHeight: `${valueSize}px`,
            fontSize: `${valueSize / 3}px`,
        });
        valueNode.appendChild(this[textKey]);

        const normalized = Array.isArray(value) ? value : [value];
        this[interpolatedKey] = Ola(normalized);

        this[updateKey] = this[updateKey].bind(this);

        this.values = normalized;
    }

    /**
     * @returns {*}
     */
    get value () {
        return this.values[0];
    }

    /**
     * @returns {Array}
     */
    get values () {
        return this[valuesKey];
    }

    /**
     * @param {*} value - Single value
     */
    set value (value) {
        this.values = [value];
    }

    /**
     * @param {Array} values - Array of values
     */
    set values (values) {
        this[valuesKey] = values;
        if (values.length !== this[interpolatedKey].length) {
            const now = new Date();
            const inherited = this[interpolatedKey]
                .map((_, index) => this[interpolatedKey][`_${index}`]);
            while (inherited.length && inherited[inherited.length - 1].get(now) === 0) {
                inherited.length -= 1;
            }
            const { length } = inherited;
            this[interpolatedKey] = Ola((new Array(Math.max(length, values.length))).fill(0));
            for (let i = 0; i < length; ++i) {
                const single = inherited[i];
                const obj = this[interpolatedKey][`_${i}`];
                obj.time = 0;
                obj.to = single.get(now);
            }
            values.push(...(new Array(Math.max(0, length - values.length))).fill(0));
        }
        this[interpolatedKey].set(values, this.options.transitionTime);

        this[lastUpdateKey] = performance.now();
        this[animationKey] = this[updateKey](0);

        const sum = this[valuesKey].reduce((acc, value) => acc + value, 0);

        let text = "";
        if (sum >= this.options.max && this.options.valueWhenDone) {
            text = this.options.valueWhenDone;
        }
        else {
            let value = (this.values.length > 1 ? sum : this.values[0]);
            if (this.options.valueUnit === "%") {
                value /= this.options.max / 100;
            }
            text = `${value.toFixed(this.options.valueDecimals)}${this.options.valueUnit}`;
        }

        if (this.options.showValue) {
            this[textKey].textContent = text;
        }
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
     * @prop {Number} [barsWidth=7] - Width of bars in % of the radius
     * @prop {Number} [max=100] - Value for a full 360° rotation
     * @prop {Boolean} [showValue=true] - Whether or not to display current value (if multiple value, sum is displayed)
     * @prop {Number} [valueDecimals=0] - Number of decimals to display
     * @prop {String} [valueUnit="%"] - Unit used for display (if set to "%", value is calculated over max)
     * @prop {String} [valueBackground="#333"] - Background color for value
     * @prop {Array<String>} [colors] - Set of colors to use for bars
     * @prop {String} [background="rgba(0, 0, 0, .3)"] - Background color where there's no bar
     * @prop {Number} [transitionTime=500] - Transition duration in ms
     * @prop {String} [valueWhenDone=null] - Text to display when at 100% (null to disable)
     */
    /**
     * Returns the default options of the component
     * @return {CPBOptions}
     */
    static get defaultOptions () {
        return {
            size: 150,
            barsWidth: 20,
            max: 100,
            showValue: true,
            valueDecimals: 0,
            valueUnit: "%",
            valueBackground: "#333",
            colors: [
                "#0484d1",
                "#e53b44",
                "#2ce8f4",
                "#ffe762",
                "#63c64d",
                "#fb922b",
            ],
            background: "rgba(0, 0, 0, .3)",
            transitionTime: 500,
            valueWhenDone: null,
        };
    }
}

CircularProgressBar.prototype[updateKey] = function update (time) {
    if (time > this[lastUpdateKey] + this.options.transitionTime) {
        return;
    }
    if (this[animationKey]) {
        cancelAnimationFrame(this[animationKey]);
    }
    this[animationKey] = requestAnimationFrame(this[updateKey]);

    let previous = 0;
    const colorStops = this[interpolatedKey].map((value, i) => {
        const percent = (value / this.options.max) * 100;
        if (percent < 0.1) {
            return null;
        }

        const colorStop = `${getLooped(this.options.colors, i)} ${previous}% ${previous + percent}%`;
        previous += percent + 0.1;
        return colorStop;
    }).filter(x => x);
    if (previous < 100) {
        colorStops.push(`transparent ${previous}% 100%`);
    }
    this.node.style.background = `conic-gradient(${colorStops.join(",")}) ${this.options.background}`;
};
