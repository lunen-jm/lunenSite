---
title: "Introduction to Charts and Graphics"
description: "Figure out how to get charts to show up in here"
lead: "Figure out how to get charts to show up in here"
date: 2023-1-09T08:48:57+00:00
lastmod: 2023-1-09T08:48:57+00:00
draft: false
images: []
menu:
  docs:
    parent: "charts"
weight: 010
toc: true
---

# Principles of Analytic Graphics

Here are the 6 main principles of analytic graphics:

1. Show Comparisons
2. Show Causality, Mechanism, and Explanation
3. Show Multivariate Data
4. Integrate Multiple Modes of Evidence
5. Describe and Document the Evidence
6. Content is King

## Exploratory Graphs and an Overview

Exploratory graphs are those that are typically made very quickly, a large number of them are made, they're mainly for personal understanding of the data, and overall design/color/etc is only used to make it functional.

There are multiple one-dimension summaries of the data that we can make:

* Five Number Summary - `summary()` (adds mean too!)
* Boxplots - `boxplot()`
* Histograms - `hist()`
* Density Plot - `plot(density(data))`
* Barplot - `barplot(table(two variables))` (`table()` adds counts)

There are also a few two-dimensional summaries:

* Multiple/Overlayed 1-D Plots (Lattice/ggplot2)
* Scatterplots
* Smooth Scatterplots 

There are also ways of making >2 dimensional summaries:

* Overlayed/Multiple 2-D Plots / Coplots
* Using Color, Size, and Shape to add dimensions
* Spinning Plots 
* Actual 3-D Plots (not very useful)

# Base Graphics and Charts 

This section will go over charts and graphs you can make in base R.

Some people think ggplot2 should be taught first: http://varianceexplained.org/r/teach_ggplot2_to_beginners/, but this course doesn't.

## Base Plotting System and Other Options

Making charts in base R follows the "Artist's Palette" model, which means you start with a blank canvas and build up from there. You will typically start with a plot function (or something similar), and use annotation functions to add/modify.

While it is convinient, it is hard to go back once it has started, and is difficult to translate to others.

Then there is the `**Lattice**` package, that allows plots to be created with a single function call (such as `xyplot()`, `bwplot()`, `levelplot()`). In this package, margins and spacing is set automatically since the entire plot is specified at once, and it is good for putting multiple plots on a screen. However, it is hard to annotate a plot, and you cannot add to the plot once the function is ran. It also uses panel functions and subscripts, which aren't very intuitive.

In the Lattice system, functions generally take a formula for their first argument. See the example. Lattice functions also don't plot anything, and instead return an object of class `trellis`. This class is an invisible object that you need to print to an object (they're auto-printed on the command line however).

Lattice functions also have `panel functions` that control what happens inside each panel of the plot. These are complicated and I don't think I'll ever really use this system, so I'm not going to go into it. It is amazing for systems that utilize a large number of data panels however, and would be very useful for that need.

Here is an example of it being used (won't be covered much more in this document):

```{r lattice}
library(lattice)
state <- data.frame(state.x77, region = state.region) # data in the lattice package
xyplot(Life.Exp ~ Income | region, data = state, layout = c(4, 1)) # this would be much more difficult in base R
```

There is also the `ggplot2` package, which is one of the main packages people know in R. It is kinda between base R and `lattice`, as it automatically deals with aesthetic calculations (such as spacing and text), but still allows you to annote by adding to a plot.

This package will have its own document.

### More on Base R 

There are two phases to creating a base plot:

1. Initializing a new plot 
2. Annotating an existing plot

When you call a plotting function such as `plot()`, R will launch a graphics device and draw a new plot on it.



## Formula Arguments 

When creating base R charts, they allow for "formula arguments" (this works for a lot of other functions too!).

This is also when you can use the `~` symbol to indicate a relationship. For example, `plot(dist ~ speed, cars)` means plot the relationship between speed (x-axis) and stoppping distance (y-axis).

There are also consistent attributes across a majority of the base graphs and charts. Here are some plot-level attrbitues you can use:

* Use with `plot()`, `boxplot()`, `hist()`:
    * `xlab=` & `ylab=` - Set the labels for the x and y axis
    * `main=` - Title of the chart
    * `sub=` - Subtitle of the chart
    * `col=` - Changes color of plotted points / bars
        * `colors()` function returns a vector of colors by name
        * Can use color by name (above), or Hex codes (and some other types)
    * `xlim=` - Limits the x-axis values
* Plot-specific
    * `pch=` - Change the plotted value shape (open circle default)
        * `example(points)` to see a list
        * 21-25 have outline colors too, col is the outer color, bg is the inner color (`pch=23, col="red", bg="black"`)
* Line-specific
    * `lty=` - Line type (solid line default)
    * `lwd=` - Line width 
* Bar-specific 
    * `breaks=` - Number of bars in a histogram

You can also specify global graphics parameters that affect all plots in an R session. Note that these can be overridden if plots have different values. You can use the `par()` function to specify these. Here are some attributes:

* `las=` - Orientation of the axis labels on the plot 
* `bg=` - Background color (transparent default)
* `mfrow=` - Takes a vector c(m, n), which divides the plot into a m*n array of subplots. `mfrow=c(1, 2)` means the plot will have 1 row of 2 charts 
* `mfcol=` - Same as `mfrow=`, but fills columns first instead of rows first 
* `cex=` - Changes size of labels (1=100%, .5=50%)
* `mai=` - Changes the margins of the plot area
* `fig=` - Takes a vector of numbers that tell it where the chart should be located in the plot
    * `c(bottom, left, top, right)`
* `mar=` - Takes the same vector as above, and sets the number of lines of margin (lines of text fit in margin)
    * Default is `c(5, 4, 4, 2) + 0.1` (the .1 adds a lil bit of extra space)
* `oma=` - Specifies outer margins

You can find the defaults out by calling `par("attribute")`. The `par()` function is also very useful for plotting multiple charts, and will be used later.

### Base Plotting Functions 

There are multiple functions you can call to "annotate" the plot (either individually or globally).

* `plot()` - Creates a scatterplot (or others for certain data type)
* `lines()` - Adds a line to the plot, given a vector of x values and a corresponding vector of y values (or 2 column matrix)
* `points()` - Add points to a plot 
* `text()` - Add text labels to a plot using specified x/y coordinates
* `title()` - Add annotations to x and y axes, titles, subtitles, and outermargins
* `mtext()` - Add arbitrary text to the margins of the plot 
* `axis()` - Add axis ticks and labels
* `legend()` - Adds a legend 
    * Start with orientation: "topright", "topleft", "bottomright", "bottomleft"
    * `pch=` - Shape of icon 
    * `col=c()` - Colors for the points 
    * `legend=c()` - Names of the points

### Overlaying Features 

You can also use `abline()` to add a horizontal line in a chart. It uses:

* `a=` - Intercept
* `b=` - Slope
* `v=` - X-value for vertical lines
* `h=` - Y-value for horizontal lines
* `lwd=` - Line width

Here is an example of it being used with a `hist()`:

```{r abline}
hist(mtcars$mpg, col = "green", breaks = 10)
abline(v = 24, lwd = 2) # makes a black line at x=12
abline(v = median(mtcars$mpg), col = "magenta", lwd = 4)
```

You can also find a linear regression (`lm()`), and then use that as the line. See group of 4 example in the `plot()` section.

## `plot()`

This function returns a basic scatterplot. In the following code, it uses the cars dataset, and automatically assumes you want to plot the two columns since that is all you fed it.

```{r plot1}
library(datasets)
data(cars)
par(mfrow = c(1, 4)) # if you remove this, then each plot is rendered individually
plot(cars)
plot(x = cars$speed, y = cars$dist)
plot(dist ~ speed, cars)
plot(x = cars$speed, y = cars$dist, xlab = "Speed", ylab = "Stopping Distance")
```

Now, we're going to take a look at a more complicated example, that shows different ways of achieving the same thing, while also coloring a subset of the data:

```{r plot2}
library(datasets)
par(mfrow = c(2, 2), cex=.7)
# making a title using an annotation
with(airquality, plot(Wind, Ozone)) 
title(main = "Ozone and Wind in New York City")
# doing the same, but now adding a line that makes the May values blue
with(airquality, plot(Wind, Ozone, main = "Ozone and Wind in New York City")) 
with(subset(airquality, Month == 5), points(Wind, Ozone, col = "blue"))
# making a more complicated one with a legend
with(airquality, plot(Wind, Ozone, main = "Ozone and Wind in New York City")) 
with(subset(airquality, Month == 5), points(Wind, Ozone, col = "blue"))
with(subset(airquality, Month != 5), points(Wind, Ozone, col = "red"))
legend("topright", pch=1, col = c("blue", "red"), legend = c("May", "Other Months"))
# adding a regression line
with(airquality, plot(Wind, Ozone, main = "Ozone and Wind in New York City", pch = 20))
model <- lm(Ozone ~ Wind, airquality)
abline(model, lwd = 2)
```

When you are rendering multiple charts, you can also use a `{}` in the with to create multiple charts (it's just harder to annotate after):

```{r plot3}
par(mfrow = c(1, 2))
with(airquality, {
    plot(Wind, Ozone, main = "Ozone and Wind")
    plot(Solar.R, Ozone, main = "Ozone and Solar Radiation")
})
```

Here is another example of making multiple scatterplots, this time with one for different subsets of data:

```{r plot4}
par(mfrow = c(1, 3))
with(subset(mtcars, cyl == 4), plot(mpg, hp, main = "4-Cylinder"))
with(subset(mtcars, cyl == 6), plot(mpg, hp, main = "6-Cylinder"))
with(subset(mtcars, cyl == 8), plot(mpg, hp, main = "8-Cylinder"))
```

Here is the last example of making multiple scatterplots, with some more of the global options changed:

```{r plot5}
par(mfrow = c(1, 3), mar = c(4, 4, 2, 1), oma = c(0, 0, 2, 0))
with(airquality, {
    plot(Wind, Ozone, main = "Ozone and Wind")
    plot(Solar.R, Ozone, main = "Ozone and Solar Radiation")
    plot(Temp, Ozone, main = "Ozone and Temperature")
    # since the following line is in the brackets, it applies to the global plot
    mtext("Ozone and Weather in New York City", outer = TRUE)
})
```

## Boxplots

Boxplots are made using the `boxplot()`. Here are some attributes:

* `col=[color]` - Color of bars in chart

```{r boxPlot}
library(datasets)
data(mtcars)
boxplot(mpg ~ cyl, data = mtcars)
```

## Histograms

Histograms are made using the `hist()`. Here are some attributes:

* `col=[color]` - Color of bars in chart
* `breaks=` - Number of bars 

You can also add a `rug()` after to add a density map underneath the chart!

```{r hist}
hist(mtcars$mpg, col = "green", breaks = 10)
rug(mtcars$mpg)
```

## Graphics Devices

Earlier, we noted that functions such as `plot()` open a graphics device on your computer. A graphics device could be one of two types; screen or file. A screen device is a window on your computer, and is the default option in R. File devices include actual files such as PDFs, PNGs, or SVGs.

Here are the functions for opening the screen device:

* `windows()` - Windows
* `quartz()` - Mac 
* `x11()` - Unix/Linux

You will need to explicitly call the `windows()` function if you want more than one screen open. You can only plot to one graphics device at a time.

To see which graphics device is open, use `dev.cur()`. It will return an integer greater than or equal to 2. Use `dev.set()` to change which one is active for plotting.

Usually, you'll want to use screen devices for exploratory analysis, and file devices when you're printing out or incorporating your graphics into a document.

When you're placing graphs into file devices, you'll need to know exactly what you're doing, as they can't be edited (can be re-saved though!).

Typically, you will follow this process when you're using file devices:

1. Explicitly launch a graphics device
    * `pdf()`, `png()`, etc.
    * `pdf(file = "newFile.pdf")`
2. Call a plotting function to make a plot 
    * `plot()` (keep in mind no plot will appear on screen)
3. Annotate plot if necessary
4. Explicitly close the graphics device 
    * `dev.off()` (no input)

File devices themselves have two categories: vector and bitmap. 

* Vector formats - Better for resizing
    * PDF, SVG, win.metafile, postscript (windows doesn't have a viewer)
* Bitmap formats - A series of pixels instead of vectors
    * png, jpeg, tiff, bmp (native windows bitmap)

If you have a plot in the screen viewer, you can use `dev.copy()` (or `dev.copy2pdf()`) to copy it to a file device:

```{r fileDev, eval=FALSE}
library(datasets)
with(faithful, plot(eruptions, waiting)) # plots on screen device
title(main = "Old Faithful Geyser data")
dev.copy(png, file = "geyserplot.png") # copies to file device
dev.off
```

Keep in mind that copying is not an exact operation, and they may look different. 

## Demonstration

Here is a long section of code that can act as a demonstration of troubleshooting charts:

```{r demo}
x <- rnorm(100)
hist(x)
y <- rnorm(100)
plot(x, y)
z <- rnorm(100)
plot(x, z) # notice that the labels default to the name of the data
par(mar = c(2, 2, 2, 2)) # changing margins, but x axis label is missing now
plot(x, y) 
par(mar = c(4, 4, 2, 2))
plot(x, y)
plot(x, y, pch = 20)
plot(x, y, pch = 4)
# much more complicated one
plot(x, y, pch = 4)
title("Scatterplot")
text(-2, -2, "Label")
legend("topleft", legend = "Data", pch = 4)
fit <- lm(y ~ x)
abline(fit, lwd = 3, col = "blue")
# more labels
plot(x, y, xlab = "weight", ylab = "Height", main = "Scatterplot")
legend("topleft", legend = "Data", pch = 4)
fit <- lm(y ~ x)
abline(fit, lwd = 3, col = "blue")

# shifting over to multiple charts
x <- rnorm(100)
y <- rnorm(100)
z <- rpois(100, 2)
par(mfrow = c(2, 1))
plot(x, y, pch = 20)
plot(x, z, pch = 19)
# margins are a lil big, let's check them
par("mar")
par(mar = c(2, 2, 1, 1))
plot(x, y, pch = 20)
plot(x, z, pch = 19)
# now lets change it to horizontal instead of vertical
par(mfrow = c(2, 1))
plot(x, y, pch = 20)
plot(x, z, pch = 19)
# margins are a lil small now
par(mar = c(4, 4, 2, 2))
plot(x, y, pch = 20)
plot(x, z, pch = 19)
# lets do more !
par(mfrow = c(2, 2))
plot(x, y)
plot(x, z) # goes to upper right since it fills rows before columns. `mfcol=` would change it so its bottom left first
plot(z, x)
plot(y, x)
# reset
par(mfrow = c(1, 1))
x <- rnorm(100)
y <- x + rnorm(100)
g <- gl(2, 50, labels = c("Male", "Female"))
plot(x, y, type = "n") # make the plot, but make the data blank
points(x[g == "Male"], y[g == "Male"], col = "green")
points(x[g == "Female"], y[g == "Female"], col = "blue", pch = 19)
```

See Programming Assignment 5 for some real-world examples