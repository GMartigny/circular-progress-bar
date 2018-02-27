# Boiler.js
Base repo for JS project

## Installation

    npm install boiler.js


## Usage

Once installed, add it to your project with common.js or ES6 syntax :

```js
    const Boiler = require("boiler.js");
    // or
    import Boiler from "boiler.js";
```

Then, you can start to use it on your code :

```js
    const boiler = new Boiler();
```

Since today's web browser don't support module requirements yet, you need to use a bundler like [webpack](https://webpack.js.org/) or [browserify](http://browserify.org/).


## CDN

If you want to go old-school, you can fetch the script with [unpkg](https://unpkg.com/) or [jsdelivr](https://www.jsdelivr.com/).

```html
    <script src="https://unpkg.com/boiler.js"></script>
    <!-- or -->
    <script src="https://cdn.jsdelivr.net/npm/boiler.js"></script>
    
    <script>
        console.log(new Boiler());
    </script>
```


## Documentation

Go see the [full documentation](documentations.md) or [some examples](https://gmartigny.github.io/boiler).


## License

[MIT](license)
