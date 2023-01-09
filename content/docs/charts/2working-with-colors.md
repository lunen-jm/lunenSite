---
title: "Working with Colors"
description: "Doks is a Hugo theme for building secure, fast, and SEO-ready documentation websites, which you can easily update and customize."
lead: "Doks is a Hugo theme for building secure, fast, and SEO-ready documentation websites, which you can easily update and customize."
date: 2023-1-09T08:48:57+00:00
lastmod: 2023-1-09T08:48:57+00:00
draft: false
images: []
menu:
  docs:
    parent: "charts"
weight: 020
toc: true
---

# Working with Colors

Colors are typically represented as attributes by `col=`. The `grDevices` package provides some helpful functions, such as `colors()`, which returns the 657 predefin ed colors. Here it is in action:

Here is a sample of the first 20 colors you can use:

```{r col}
install.packages("grDevices")
library(grDevices)
colors()
```

## Color Palettes

The functions `colorRamp()` and `colorRampPalette()` give you more options, as they take color names as arguments and use them as palettes. This means they're blended in different proportions to form new colors.

`colorRamp()` takes a palette of colors and returns a function that takes the values between 0 and 1 (the extremes of the palette). You can use `seq()` with `len=` specified to make a list of colors (see example below). It only creates colors using those present in the specified palette (this is why the example for the previous sentence doesn't contain any green).

```{r colorRamp}
pal <- colorRamp(c("red", "blue"))
pal # makes a function
pal(0)
pal(1)
pal(.5)
pal(seq(0, 1, len = 6))
```

`colorRampPalette()` takes integer arguments (not limited to 0-1) and returns a vector of colors that are all b lends of colors of the original palette.

```{r cRP}
p1 <- colorRampPalette(c("red", "blue"))
p1 # makes a function
p1(2) # FF is hexadecimal for 255, so FF0000 is 100% red, 0000FF is 100% blue
p1(6) # makes a 6-color palette !
0xCC
p2 <- colorRampPalette(c("red", "yellow"))
p2(2)
p2(10)
# For each element, the red component is fixed at FF, and the green component grows from 00 (at the first element) to FF (at the last)
# look into showMe function form Swirl, go to color.scale R documentation. It charts the gradient you use as the argument
```

When working with Hexadecimals, you can enter `0x##` to set the decimal equivalent of the number (shown above). If it's a two-digit integer, you can also multiply by 16 and add 3 to get the decimal (0x33 = 3*16+3 = 51).

As you saw when we entered `p1` in the code above, the function itself is built off of the `rbg()` function. This means that you can also work with alpha values with these functions.

```{r alph}
p3 <- colorRampPalette(c("blue", "green"), alpha = .5)
p3(5) # since alpha was nonzero, FF shows up for all. If it was 0, it would have been 00 (T/F also works)
# alpha in plots
plot(x, y, pch = 19, col = rgb(0, .5, .5))
plot(x, y, pch = 19, col = rgb(0, .5, .5, .3))
```

There are also some predefined color palettes in the `grDevices` package that you can use:

* `heat.colors()` - Heatmap, red-yellow-white
* `topo.colors()` - Topographic, blue-green-yellow-brown

## RColorBrewer Package 

The RColorBrewer Package contains interesting and useful color palettes, of which there are 3 types, sequential, divergent, and qualitative.

Each of the built in palettes can be found at:

You can use this package with the `colorRamp()` functions we discussed earlier to create an interpolation of the colors.

The `brewer.pal()` function is what you would use to return the color palette. The first argument is the # of colors, and the second is the string for the palette.

```{r colMix}
cols <- brewer.pal(3, "BuGn")
pal <- colorRampPalette(cols)
image(volcano, col = pal(20)) # uses topographic information from a db to plot Maunga Whau
image(volcano, col = p1(20)) # the palette matters! This one isn't good for the data
```