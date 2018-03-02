/* global test expect */

import CPB from "./circular-progress-bar";

test("Default options", () => {
    const defaultOpts = CPB.defaultOptions;

    expect(defaultOpts.size).toBe(150);
    expect(defaultOpts.barsWidth).toBe(7);
    expect(defaultOpts.max).toBe(100);
    expect(defaultOpts.showValue).toBe(true);
    expect(defaultOpts.valueDecimals).toBe(0);
    expect(defaultOpts.valueUnit).toBe("%");
    expect(defaultOpts.valueBackground).toBe("#333");
    expect(defaultOpts.colors).toBeDefined();
    expect(defaultOpts.background).toBe("rgba(0, 0, 0, .3)");
    expect(defaultOpts.valueWhenDone).toBe(null);
});

test("Set values", () => {
    let value = 42;

    const gauge = new CPB(value);
    expect(gauge.value).toBeCloseTo(value);
    expect(gauge.values.length).toEqual(1);

    const values = (new Array(10)).fill(1);
    gauge.values = values;
    expect(gauge.values).toEqual(values);
    expect(gauge.values.length).toEqual(10);

    value = 55;
    gauge.value = value;
    expect(gauge.value).toBeCloseTo(value);
    expect(gauge.values.length).toEqual(1);
});

test("Attach and remove", () => {
    const gauge = new CPB(10);
    expect(gauge.node.parentNode).not.toBeTruthy();

    gauge.appendTo(document.body);
    expect(gauge.node.parentNode).toBeTruthy();

    gauge.remove();
    expect(gauge.node.parentNode).not.toBeTruthy();
});
