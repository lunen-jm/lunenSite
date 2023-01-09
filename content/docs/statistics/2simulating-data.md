


# Simulating Data and Models

This document is going to go over simulating data and models.

## The `str()` Function

First, we need to go over the most important function in R; `str()`

```{r strDef}
str(str) # provides a summary of whatever is in it
```

The `str` function will pretty much summarize whatever its inputs are. This works for formulas, data, subsets, weights, etc.

Here are some examples of it being used:

```{r strEx}
str(mean)
library(datasets)
head(airquality) # compare this to str() below
str(airquality)
m <- matrix(rnorm(100), 10, 10)
str(m)
m[,1] # shows that str() only shows first column of matrix
s <- split(airquality, airquality$Month) 
str(s) # this will return information for each of the tables, created by splitting by month
```

The main reason we are covering it now, is so that we can analyze the things that we generate in later sections!

## Generating Data

There are a bunch of different things you can generate in R. Simulating data is very important for data science, as you usually need to test models out prior to putting something into practice.

### Generating Random Numbers 

Probability distribution functions usually have four functions associated with them, which are the prefixes in the above:

* `d` - Density 
* `r` - Random number generation
* `p` - Cumulative distribution 
* `q` - Quantile function 

Here are the corresponding funcitons for a normal distribution:

* `rnorm()` - Generates random Normal variates with a given mean and standard deviation
* `dnorm()` - Evaluates the Normal probability density (with a given mean/SD) at a point (or vector of points)
* `pnorm()` - Evaluates the cumulative distribution function for a Normal distribution 
* `qnorm()` - Evaluates the quantile function 

Some distributions beyond `normal` include `binom` (binomial), `gamma`, and `pois` (poisson):

* `norm` distrubutions are used for continous values
* `binom` (binomial) distributions are generated sets of 0 and 1, based on the ratio of 1s
* `gamma` distributions are 
* `pois` (poisson) distributions are used for outcome counts
* `exp` (exponent) are
* `chisq` (chi-squared) are

When using `normal` distributions, the default mean is 0, and the default sd is 1 (a perfect distribution). It is also worth nothing that `qnorm` returns the inverse of `pnorm`.

The `lower.tail` is the tail to the left of the distribution (when plotted), changing the attribute to FALSE causes you to only use the upper tail.

Here's a basic example of `rnorm` and some others:

```{r rNorm}
x <- rnorm(10)
x 
x <- rnorm(10,20,2)
x
summary(x)

rbinom(1, size = 100, prob = 0.7) # returns count of TRUE in a sample of 100, 1 time
rbinom(100, size = 1, prob = 0.7) # returns count of TRUE in a sample of 1, 100 times

rpois(5, 10) # 10 is mean
```

#### Setting Seeds

When you need to reproduce the results of a simulation, you will need to use a `random number seed` (think minecraft lol).

To do this, you will need to use `set.seed()`, with a number in the function. The seed will reset after each "generation", so be sure to use it each time!

```{r seedEx}
set.seed(431)
rnorm(5)
rnorm(5) # won't be the same since the seed is reset
set.seed(431)
rnorm(431) # should be the same as the first one
```

This works, because random numbers aren't actually random (shocking!). They stem from "seed" data! (but seem random!)

### Generating Random Numbers from a Linear Model 

First, we're going to go over a linear model, which is essentially a linear equation representing the variation in data. Here is an example of one:

![](lunenSite/static/screenshots/linearModelEx.png)

The model above has a single input, which is defined by x. There is also a random noise variable, which is the small E.

"where (jibberish)" means that the E has a normal distribution with mean 0 and standard deviation 2. The next line states that x has a mean of 0 and SD of 1, and it sets the values of the other two variables.

Here is a chunk of code that creates this model:

```{r linearEx}
set.seed(20)
x <- rnorm(100)
e <- rnorm(100, 0, 2)
y <- 0.5 + (2 * x) + e 
summary(y)
plot(x, y)
```

**What if x is Binary?**

Let's say x is binary instead. For this, we will use `rbinom()` since it will generate 0 & 1.

```{r binaryEx}
set.seed(10)
x <- rbinom(100, 1, 0.5)
e <- rnorm(100, 0, 2)
y <- .5 + (2 * x) + e
summary(y)
plot(x, y)
```

**How about a Poisson model?**

For this one, we are going to evaluate the following poisson model:

![](lunenSite/static/screenshots/poissonModelEx.png)

This is saying that y is equal to a poisson model of mu (u shaped thing). Since we know that log(u) is equal to .6+.3x, we can put log(u) (which is exp(logMu)) into the poisson model to get y.

```{r poissonEx}
set.seed(1)
x <- rnorm(100)
logMu <- 0.5 + (0.3 * x)
y <- rpois(100, exp(logMu))
summary(y)
plot(x, y)
```

### Random Sampling

The `sample()` function allows you to draw randomly from a specific set of objects you specify.

If you don't specify how many times it should sample the data, it will permute the data, which means it will return all of the data in a random order.

By default, the probabilities of all values are equal, but you can change them by using a vector with probabilities for each value (see coin flip example).

Here are some examples:

```{r samplingEx}
set.seed(1) # doesn't do anything since nothing is generated
sample(1:10, 4)
sample(1:10, 4)
sample(letters, 5) # letters is a predefined variable, vector of all letters. LETTERS is the same, in all caps
sample(letters)
sample(1:10) # permutation
sample(1:10)
sample(1:10, replace = TRUE) # sample w/ replacement (values are added back into population)
sample(1:6, 4, replace = TRUE) # rollowing a dice 4 times
flips <- sample(c(0,1), 100, replace = TRUE, prob = c(0.3, 0.7)) # don't forget to replace!
flips # a coin flip, 100 times, with differing probabilities
```