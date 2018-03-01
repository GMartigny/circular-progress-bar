# Boiler.js
CSS circular progress bar.

## Installation

    npm install circular-progress-bar


## Usage

Once installed, add it to your project with common.js or ES6 syntax :

```js
    const CircularProgressBar = require("circular-progress-bar");
    // or
    import CircularProgressBar from "circular-progress-bar";
```

Then, you can start to use it on your code :

```js
    const progress = new CircularProgressBar(42);
    progress.appendTo(document.body);
```

Since today's web browser don't support module requirements yet, you need to use a bundler like [webpack](https://webpack.js.org/) or [browserify](http://browserify.org/).


## CDN

If you want to go old-school, you can fetch the script with [unpkg](https://unpkg.com/) or [jsdelivr](https://www.jsdelivr.com/).

```html
    <script src="https://unpkg.com/circular-progress-bar"></script>
    <!-- or -->
    <script src="https://cdn.jsdelivr.net/npm/circular-progress-bar"></script>
    
    <script>
        console.log(new CircularProgressBar());
    </script>
```


## Documentation

Go see the [full documentation](documentations.md) or [some examples](https://gmartigny.github.io/circular-progress-bar).


## License

[MIT](license)
