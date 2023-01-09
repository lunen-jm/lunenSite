---
title: "Functions and Scoping Rules"
description: "The Doks project directory structure extends Hugo's."
lead: "The Doks project directory structure extends Hugo's."
date: 2020-04-20T14:14:16+02:00
lastmod: 2020-04-20T14:14:16+02:00
draft: false
images: []
menu:
  docs:
    parent: "overview"
weight: 040
toc: true
---

# Functions and Scoping Rules

To understand computations in R, two slogans are helpful: 1. Everything that exists is an object. 2. Everything that happens is a function call.

The next section of the document is going to go over creating functions in R, and the different ways to build them. This can also represent the shift towards programming R, rather than just using R.

As these notes were taken during a class, the first examples are going to involve saving them in text files, with the later ones being focused on R packages.

## Creating Functions

Functions are lines of code that you can reuse, with different input indicated. Functions can be used in other functions, and can be nested as well. 

You create a funciton using the `function()` function, with the variables being initialized in the function. Here is a simple example where we add two variables together, x and y.

```{r functionAdd}
add2 <- function(x, y) {
    x + y 
}
add2(3, 5)
```

Here is a slightly more complicated example that allows you to return certain elements of a vector that are above a value. There is also a default value in this one, which means that if the user does not specify the `lowBound` variable, it will be set to 10.

```{r functionVect}
above <- function(vect, lowBound = 10) {
    filter <- vect > lowBound
    vect[filter]
}
x <- 1:20
above(x)
above(x, 14)
```

Here is a more complicated one that includes data frames and looping functions. 

```{r functionMean}
columnmean<- function(y, removeNA = TRUE){
    nc <- ncol(y) # stores column count as a variable
    means <- numeric(nc) # changes to number
    for(i in 1:nc){
        means[i] <- mean(y[, i], na.rm = removeNA) # returns column means, and tells it ignore NA values
    } 
    means
}   
columnmean(airquality)
```

Funcitons have named arguments, with a couple different types.

### Formal Arguments 

Formal arguments are those included in the function definition, and they can be missing or have default values. The `formals()` function returns the formal arguments of a function. Formal arguments are typically the ones that you will input directly into a function, without a name. 

### Named Arguments 

Named arguments are a subset of formal arguments, and they are essentially the ones that go like `function(named_arg = 1)`. In the last sentence the `named_arg` was an example of one.

### Argument Matching 

Function arguments have an order of operations when the code is being evaluated:

1. Check for an exact match for a named argument 
2. Check for a partial match 
3. Check for a positional match

This is useful to understand in case you change the order of arguments you include in a function. 

```{r partial}
remainder <- function(divisor, num) {
 num %% divisor
}
remainder(divisor = 11, num = 5) # exact
remainder(5, div = 11) # partial
remainder(11, 5) # positional
```

### ... Arguments

You can use a ... to represent the rest of the default arguments for a function within your custom function. `...` is often used when you don't want to copy the entire argument list of the origiinal function. Here is an example of this where we change the default plot type of the `plot()` function, so it doesn lines instead of points:

```{r myPlot}
myplot <- function(x, y, type = "l", ...) {
    plot(x, y, type = type, ...) # type is equal to l, since we assigned it that in the function
}
```

It also represents the ability to input multiple objects. In the following example, we use `args()` with `paste()` and `cat()` to see where a `...` might be:

```{r args}
args(paste) # the ... represents a space where you can input multiple objects, such as vectors, to be pasted together
args(cat)
```

One thing to note is that any arguments that appear after a `...` must be name matched. They will not be partially matched, and positional matching doesn't work since any number of arguments can be input where the `...` is.

## Scoping Rules

Scoping Rules explain how R determines what the value associated with a variable or function. For example, if you were to make the function below, how would R know whether you're using your function, or the same-name `lm()` from the stats package?

```{r scoping}
lm <- function(x){ x * x}
lm 
```

R chooses your `lm()` because it searches through a series of environments to find the appropriate value. By default, R goes in these two steps:

1. Search the global environment for a symbol name matching the one indicated (i.e. it finds where you assigned `lm()` in the command line)
2. Search the namespaces of each of the packages on the search list

The search list can be found using `search()`:

```{r search}
search()
```

When a user loads a package with `library()`, the namespace of that package gets placed in spot 2 (package:stats in the above code), and the rest get moved down one spot.

Going back to variables, R uses lexical/static scoping. This means that if the value of a symbol/variable is not found in the envionment in which a function is defined, then the search goes to the parent environments, and so on. After the top-level environment (usually a package), it continues to go down the list until it hits the empty environment, and then returns an error. While most of the things you do will be in the global environment, this is useful to understand if you want to try to make functions inside of functions.

### Lexical vs Dynamic Scoping 

See the following functions:

```{r scoping2}
y <- 10
f <- function(x){
    y <- 2
    y^2 + g(x)
}
g <- function(x){
    x*y 
}
y 
```

As you can see, due to R being Lexical, y is equal to 10 when called, even though the f function sets it to 2.

In lexical scoping, the value of y in the function g is looked up in the environment in which the function was defined, which was the global environment. With dynamic scoping, the value of y is looked up in the environment from which the function was called. Thankfully, R uses lexical.

### Consequences of Lexical Scoping 

Unfortunately, there are a couple of downsides of this. In R, all objects must be stored in memory, which means your RAM limits you. All functions also must carry a pointer to their respective defining environments. 

### Using `<<-`

There is another way to assign variables beyond the `<-` operator. The `<<-` operator can be used to assign a value to an object in an environment that is different from the current environment

### Optimization for Scoping Rules 

The main reason why scoping rules are useful is to perform optimization. Optimization routines in R, such as `optim`, `nlm`, and `optimize`, require you to pass a function whose argument is a vector of parameters (e.g. a log-likelihood). However, an object function might depend on more things than just these parameters, such as data.

Here is an example of a constructor function from the JH course, that is optimized. I have no idea how this works at this point.

```{r opti}
make.NegLogLik <- function(data, fixed=c(FALSE,FALSE)){
    params <- fixed 
    function(p){
        params[!fixed] <- p 
        mu <- params[1]
        sigma <- params[2]
        a <- -0.5*length(data)*log(2*pi*sigma^2)
        b <- -0.5*sum((data-mu)^2) / (sigma^2)
        -(a + b)
    }
}
set.seed(1); normals <- rnorm(100, 1, 2)
nLL <- make.NegLogLik(normals)
nLL
ls(environment(nLL))
optim(c(mu = 0, sigma = 1), nLL)$par
# Fixing mu=2
nLL <- make.NegLogLik(normals, c(FALSE, 2))
optimize(nLL, c(-1, 3))$minimum
# Fixing sigm=1
nLL <- make.NegLogLik(normals, c(1, FALSE))
optimize(nLL, c(1e-6, 10))$minimum
# Plotting the likelihood
nLL <- make.NegLogLik(normals, c(1, FALSE))
x <- seq(1.7, 1.9, len = 100)
y <- sapply(x, nLL)
plot(x, exp(-(y - min(y))), type = "l")
# Plotting the negative likelihood, tied to the mean (idk what I'm saying lol)
nLL <- make.NegLogLik(normals, c(FALSE, 2))
x <- seq(0.5, 1.5, len = 100)
y <- sapply(x, nLL)
plot(x, exp(-(y - min(y))), type = "l")
```

It is important to note that Optimization function in R minimize functions, so you need to use the negative log-likelihood to maximize a function.

More information can be found in the paper "Lexical Scope and Statistical Computing" by Robert Gentleman and Ross Ihaka (2000), JCGS, 9, 491-508.