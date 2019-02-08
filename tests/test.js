import test from "ava";
import CPB from "../circular-progress-bar";

global.document = {
    createElement: () => ({
        style: {},
        appendChild: () => {},
    }),
};

test("Default options", (t) => {
    const defaultOpts = CPB.defaultOptions;

    t.is(defaultOpts.size, 150);
    t.is(defaultOpts.barsWidth, 7);
    t.is(defaultOpts.max, 100);
    t.true(defaultOpts.showValue);
    t.is(defaultOpts.valueDecimals, 0);
    t.is(defaultOpts.valueUnit, "%");
    t.is(defaultOpts.valueBackground, "#333");
    t.true(Array.isArray(defaultOpts.colors));
    t.is(defaultOpts.background, "rgba(0, 0, 0, .3)");
    t.is(defaultOpts.valueWhenDone, null);
});

test("Attach and remove", (t) => {
    const gauge = new CPB(10);
    gauge.appendTo(global.document.createElement());

    t.true(Math.abs(gauge.value - 10) < 1e-10);

    gauge.values = (new Array(10)).fill(2);
    t.is(gauge.values.length, 10);
    t.true(Math.abs(gauge.value - 2) < 1e-10);
});
