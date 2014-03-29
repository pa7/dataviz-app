# Visualizing Market Subsector Weights and Price History

## Online Demonstration

[http://w-labs.at/dataviz/price-history/](http://w-labs.at/dataviz/price-history/)

## Run it locally

Simply start a local SimpleHTTPServer from the repository root directory

`python -m SimpleHTTPServer 1337 &`

Now you can access the app in your webbrowser under `http://localhost:1337`

## Known issues & how to tackle them

### Treemap nodes sometimes switch position
That happens because sticky is set to false, but we need sticky false because the number of elements in the dataset is not constant. sticky false results in recalculations of the treemap layout everytime the data has changed.

How to fix:
Keep the data nodes count constant and set nodes that don't exist to weight = 0 
=> we can use sticky true => no jumping treemap nodes & better layout caching :-)

## Credits

*note regarding dataset goes here*
