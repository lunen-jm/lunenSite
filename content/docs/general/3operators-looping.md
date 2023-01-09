---
title: "Operators and Looping"
description: "Break this up into multiple docs and add context later"
lead: "Break this up into multiple docs and add context later"
date: 2020-10-13T15:21:01+02:00
lastmod: 2020-10-13T15:21:01+02:00
draft: false
images: []
menu:
  docs:
    parent: "general"
weight: 030
toc: true
---

# Operators, Logic, Conditional Statements, and Looping

This document will go over operators in R, as well as Logical and Conditional Statements and different forms of looping. This will be included in the Control Structures section.

## Operators

Here is the structure of miscellaneous operators in R:

* **Mathematical Operators**
    * `+` - Addition
    * `-` - Subtraction
    * `*` - Multiplication
    * `/` - Division
* **Logical Operators**
    * `<` - Less than
    * `>` - More than
    * `<=` - Less than or equal to
    * `>=` - More than or equal to
    * `==` - Equal to
    * `!=` - Not equal to
* **Logical Expression Operators**
    * For AND and OR, AND will always be evaluated before an OR (think PEMDAS)
    * `&` - And
        * Takes two logical expressions, returns TRUE if both TRUE. Evaluates all members of vectors
    * `&&` - And pt.2
        * Using this for a vector causes you to only evaluate the first member of it 
    * `|` - Or
        * Takes two logical expressions, returns TRUE if one or more is TRUE. Evaluates all members of vectors
    * `||` - Or pt.2
        * Using this for a vector causes you to only evaluate the first member of it 
* **Subsetting Operators**
    * `[]` - Returns a value corresponding to whatever is in the bracket. Object is the same class as the original.
    * `[[]]` - Returns elements of a list or a data frame, can only be used to extract a single element, and the class may not necessarily be a list or data frame.
    * `$` - Used to extract elements of a list or data frame by name, semantics are similar to [[.
    * See "Importing, Writing, and Cleaning Data" for more informaiton on subsetting 

Some quick examples of the Math and Logical Operators in practice:

```{r opEx}
(3 > 5) & (4 == 4)
# FALSE and FALSE
(TRUE == TRUE) | (TRUE == FALSE)
# TRUE or FALSE
((111 >= 111) | !(TRUE)) & ((4 + 1) == 5)
# (TRUE or FALSE) & TRUE
5 != 7
! 5 == 7 # Same as prior one
TRUE & c(TRUE, FALSE, FALSE) 
TRUE && c(TRUE, FALSE, FALSE) # only evaluates the first one
5 > 8 || 6 != 8 && 4 > 3.9 # Evaluates && first
TRUE && FALSE || 9 >= 4 && 3 < 6 # evalutes both && first, which translates to FALSE || TRUE, which is TRUE
```

### Logical Functions 

There are some built-in functions meant to help with logical expressions. 

* `isTRUE()` - Takes one argument, returns TRUE/FALSE 
* `identical() ` - Returns TRUE if two objects passed as arguments are identical
* `xor()` - Exclusive OR. If one argument is TRUE, and one is FALSE, then it will be TRUE 
* `which()` - Takes a logical vector and returns the indeces of the vector that are TRUE 
* `any()` - Returns TRUE if one or more of the elements in the logical vector is TRUE 
* `all()` - Returns TRUE if every element in the logical vector is TRUE 

```{r logFunc}
isTRUE(6 > 4)
identical("twins", "twins")
identical(5 > 4, 3 < 3.1)
xor(5 == 6, !FALSE)
xor(4 >= 9, 8 != 8.0)
# `which()`
which(c(TRUE, FALSE, TRUE))
vect <- c(1, 3, 5, 7, 9, 11)
vect > 6
which(vect > 6) # should return 4, 5, and 6. Which is 7, 9, and 11
any(vect > 6)
all(vect > 6)
all(vect > 0)
```

## Control Structures 

Control Structures allow you to control the flow of execution of a program, depending on runtime conditions. Here are some common structures:

* `if, else` - Testing a condition 
* `for` - Execute a loop a fixed number of times 
* `while` - Execute a loop while a condition is TRUE 
* `repeat` - Execute an infinite loop 
* `break` - Break the execution of a loop 
* `next` - Skip an iteration of a loop 
* `return` - Exit a function 

### If-Else 

When using an If-Else, you will provide one or more logical conditions that when TRUE an action will occur. Here is an example with placeholder text:

```{r ifElse, eval = FALSE}
if(condition) {
    ## an aciton that will occur
} else {
    ## a different action
}
## with an else if
if(condition) {
    ## an aciton that will occur
} else if(condition2){
    ## a different action
} else {
    ## a different action
}
```

The `else` is optional, unless you want to add another action. If done this way, the `else` will just be "nothing will happen".

When using an `If`, you can assign variables in each step, or use the whole `If` to assign a variable.

```{r ifVar, eval = FALSE}
## Assigning in each step
if(x > 3){
    y <- 10
} else {
    y <- 0
}
## Assigning with whole If
y <- if(x > 3){
    10
} else {
    0
}
```

### For Loops 

`For` loops take an interator variable, and assign it successive values from a sequence or vector. This is most used for iterating over the elements of an object.

```{r for1}
for(i in 1:5){
    print(i)
}
```

As you can see in the code above, each time the code is evaluated, i increases in value by one. This allows you to control how many iterations of the code are run, which is where the term "interator variable" comes from.

Here are some examples of how you can use a vector in a `for` loop, with each option returning the same values:

```{r forVec}
x <- c("a", "b", "c", "d")
## printing each value by using a 1:4
for(i in 1:4){
    print(x[i])
}
##  using seq_along()
for(i in seq_along(x)){
    print(x[i])
}
## using letter, which is a random variable initialized by the for()
for(letter in x){
    print(letter)
}
## in the same line (use {} for readability though)
for(i in 1:4) print(x[i])
```

`seq_along()` generates a sequence based on the length of the indicated vector.

`for` loops can also be nested. Here is an example of it in action, where it returns the values of a matrix:

```{r forNest}
x <- matrix(1:6, 2, 3)
x
for(i in seq_len(nrow(x))){ 
    for(j in seq_len(ncol(x))){ 
        print(x[i, j])
    }
} ## seq_len uses an integer value to make a sequence. In this case, it is 2 since there are 2 rows
```

When nesting `for` loops, it is good practice to not go beyond 2-3 steps for readbility.

### While Loops 

`while()` is similar to `for()`, however the interator value is not within the `while()`. It begins by testing a condition, and continues to execute the included code as long as its true. Here is an example:

```{r while1}
count <- 0
while(count < 10) {
    print(count)
    count <- count + 1
}
```

You can also have multiple conditions in a `while()`. Here is an example that causes `z` to go up and down depending on a random coin flip (`rbinom` returns a random value based on attribute values):

```{r whileMult}
z <- 5
while(z >= 3 && z <= 10){
    print(z)
    coin <- rbinom(1, 1, 0.5)
    coinFlip <- paste("Coin flip:", coin)
    print(coinFlip)
    if(coin == 1){
        z <- z+1
    } else {
        z <- z-1
    }
}
```

### Repeat, Next, Break, Return

All of these functions do not need () after them. They can be placed independently, or might need a {}, like `repeat`.

`repeat` initiates an infinite loop, with the only exit method being the usage of `break`. Here is an example of it being used in an optimization function:

```{r repeat, eval = FALSE}
x0 <- 1
tol <- 1e-8
repeat {
    x1 <- computeEstimate()
    if(abs(x1-x0) < tol) {
        break 
    } else {
        x0 <- x1 
    }
}
```

`next` is used to skip an iteration of a loop. In this example, `next` causes us to skip when i = 1:20.

```{r next}
for(i in 1:25){
    if(i <= 20) {
        next 
    }
    print(i+5)
}
```

You could also just use the sequence 21:25, but that's beside the point.

`return` is used to tell a function that it should exit a loop and return a given value.

## Looping with the -pplys (and split)

There are multiple loop functions outside the scope of control structures, that work much better for the command line:

* `lapply()` - Loop over a list and evaluate a function on each element 
* `sapply()` - Same as `lapply()` bbut tries to simplify the result 
* `apply()` - Aplly a function over the margins of an array 
* `mapply()` - Apply a function over subsets of a vector 
* `tapply()` - Multivariate version of `lapply()`
* `vapply()` - Same as `sapply()`, but allows you to choose data type
* `split()` - is also useful with lapply, and will be discussed in this section

### Lapply 

`lapply()` takes three arguments:

```{r lapplyDef1}
str(lapply)
```

1. A list `x` 
    - If `x` is not a list, it will be coerced to a list using `as.list`
2. A function `FUN` (or name of function)
3. Other arguments for `FUN` via `...`

Here is the underlying code for `lapply`:

```{r lapplyDef}
lapply 
```

As you can see, it is a basic funciton with the actual looping being done internally in C code (.Internal).

`lapply` always returns a list, regardless of the class of the input. When feeding values into functions, default values will be used. If you would like to change them, simply add the arguments after the name of the funciton in the `lapply`.

```{r lapplyInput}
x <- list(a = 1:5, b = rnorm(10), c = rnorm(20, 1), d = rnorm(100, 5))
lapply(x, mean) # this will apply the mean function to a-d
x <- 1:4
lapply(x, runif) # this will apply runif (which generates random variables) to the numbers 1-4. 1 will be fed into the function, etc.
lapply(x, runif, min = 0, max = 10) # this will change the defaults of the function
class(x)
lapply(x, class)
```

### Sapply

`sapply()` is similar to `lapply()`, but it tries to simplify the result if possible by doing the following:

* If the result is a list where every element is length 1, then a vector will be returned instead of a list 
* If the result is a list where every element is a vector of the same length (>1), a matrix is return instead 
* If it can't simplify it, a list is returned 

Here's an example:

```{r sapply}
x <- list(a = 1:5, b = rnorm(10), c = rnorm(20, 1), d = rnorm(100, 5))
lapply(x, mean) # reusing this function to show the lapply() result
sapply(x, mean)
```

### Anonymous Functions

`lapply` (and others) make heavy use of anonymous functions. This is when you define a function in the `-pply` function. Here is an example where this is done on a matrix:

```{r anonFun}
x <- list(a = matrix(1:4, 2, 2), b = matrix(1:6, 3, 2))
x 
lapply(x, function(elt) elt[,1]) # this function feeds x into the function after the function() function (confusing!). Elt is just a variable, so the function is returning the first column of each matrix in the list.
```

### Apply 

`apply()` is used to evaluate a function (often anonymous) over the margins of an array. It is most often used to apply a function to the rows or columns of a matrix. It can be used with general arrays (such as taking the average of an array of matrices). It is not really faster than writing a loop, but it works in one line of the terminal!

`apply` takes four arguments:

```{r applyDef}
str(apply)
```

* `x` is an array 
* `MARGIN` is an integer vector indicating which margins should be "retained". 1 is for rows, 2 is for columns 
* `FUN` is a function to be applied
* `...` is for other arguments to be passed to `FUN`

Here is are example of `apply()`:

```{r applyEx}
x <- matrix(rnorm(200), 20, 10)
x 
apply(x, 2, mean) # this collapses the rows, and calculates the mean of each column
apply(x, 1, sum) # this collapses the columns and returns sums of all of the rows

# apply with a more complicated funtion (taking quantiles of the rows of a matrix)

apply(x, 1, quantile, probs = c(0.25, 0.75))
```

#### Sum and Mean Shortcuts

For sums and means of matrix dimensions, we have the following shortcuts:

* `rowSums()` = `apply(x, 1, sum)`
* `rowMeans()` = `apply(x, 1, mean)`
* `colSums()` = `apply(x, 2, sum)`
* `colMeans()` = `apply(x, 2, mean)`

These functions are much faster, but you won't really notice unless you're using a large matrix.

```{r applyShort}
a <- array(rnorm(2*2*10), c(2, 2, 10))
apply(a, c(1, 2), mean)
rowMeans(a, dims = 2)
```

### Mapply 

`Mapply()` applies a function in parallel over a set of arguments. This is in direct contrast to `lapply/sapply`, which is limited to one list.

`mapply` takes five main arguments:

```{r mapplyDef}
str(mapply)
```

* `FUN` is a function to apply 
* `...` contains arguments to apply over
* `MoreArgs` is a list of other arguments to `FUN`
* `SIMPLIFY` indicates whther the result should be simplified
* `USE.NAMES` indicates whther names will be used

Here is an example of it being used:

```{r mapply1}
list(rep(1, 4), rep(2, 3), rep(3, 2), rep(4, 1)) 
# this is tedious to type, but we can do this instead:
mapply(rep, 1:4, 4:1)
```

### Tapply

`Tapply()` is used to apply a function over subsets of a vector. It has 5 main arguments:

```{r tapply1}
str(tapply)
```

* `X` is a vector 
* `INDEX` is a factor or list of factors
* `FUN` is a function to be applied 
* `...` contains other arguments to be passed to `FUN`
* `simplify` to simplify it (default)

Here is an example:

```{r tapplyEx}
x <- c(rnorm(10), runif(10), rnorm(10,1)) # creates a vector
x
f <- gl(3, 10) # generates a factor
f
tapply(x, f, mean) # applies the mean to each factor (1, 2, 3)
tapply(x, f, mean, simplify = FALSE)
```

`tapply` is very useful for applying a function to a table's column, divided by the values in another column. I.e. if you had a table of countries' populations, with a column indicating if the country's flag has red or not, you could see the mean of the populaitons for both with red and without red on their flags ($population, $red, mean would be the arguments).

### Vapply 

`vapply()` is similar to `sapply()`, but it allows you to specify the data type explicitly.

```{r vapplyEx}
x <- list(a = 1:5, b = rnorm(10), c = rnorm(20, 1), d = rnorm(100, 5))
sapply(x, mean) # reusing this function to show the sapply() result
vapply(x, mean, numeric(1)) # identical since our expectation was correct
```

### Split 

`Split()` takes a vector or other object and splits it into groups determiend by a factor or list of factors. While it isn't a loop function, it iis useful to be used in conjunction with them.

`split` takes the following, and always returns a list back:

```{r splitDef}
str(split)
```

* `x` is a vector (or list) or data frame 
* `f` is a factor or a list of factors 
* `drop` indicates whether empty factor levels should be dropped

Here are some examples:

```{r splitEx}
x <- c(rnorm(10), runif(10), rnorm(10,1)) # reusing the tapply() vector/factors
f <- gl(3, 10) 
split(x, f)
lapply(split(x, f), mean) #provides same answer as tapply() from earlier
```

#### Splitting a Data Frame

To split up data frames, you can use `split`. An example of splitting up a data frame, is to split a yearly table by month, here's an example of that:

```{r splitDF}
library(datasets)
head(airquality)
s <- split(airquality, airquality$Month) # splits it by value in the month column
lapply(s, function(x) colMeans(x[, c("Ozone", "Solar.R", "Wind")], na.rm = TRUE)) # takes the column means for just the indicated column names by using an anonymous function
sapply(s, function(x) colMeans(x[, c("Ozone", "Solar.R", "Wind")], na.rm = TRUE)) # simplified version
```

#### Splitting on More than One Level 

If you want to split by multiple levels of factors, do the following:

```{r splitLev}
x <- rnorm(10)
f1 <- gl(2, 5) 
f1 # 2 levels, 1 and 2
f2 <- gl(5, 2)
f2 # 5 levels, 1:5
interaction(f1, f2) # 10 levels
str(split(x, list(f1, f2))) # the list does the same thing as interaction()
str(split(x, list(f1, f2), drop = TRUE)) # gets rid of empty levels
```