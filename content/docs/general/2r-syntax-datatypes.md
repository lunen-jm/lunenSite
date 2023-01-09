---
title: "R Syntax and Data Types"
description: "One page summary of how to start a new Doks project."
lead: "One page summary of how to start a new Doks project."
date: 2020-11-16T13:59:39+01:00
lastmod: 2020-11-16T13:59:39+01:00
draft: false
images: []
menu:
  docs:
    parent: "general"
weight: 020
toc: true
---

# R Syntax and Data Types

This document will go over syntax and data types in R, as per the JH course.

## Objects and Values

R has six basic classes of objects that can be attributed to a value (also known as the atomic classes):

* character
* numeric (real numbers)
* integer
* complex
* logical
* dates and times 

The most basic object / object container is a vector, which can only contain objects of the same class.
* Note: A list is represented as a vector, but can contain different classes (which is what it's mainly used for)

Empty vectors can be made using `vector()`

### Attributes

Objects in R can have attributes, including:

* names and dinames
* dimensions (for matrices/arrays)
* class
* length
* other user-defined attributes or metadata

Attributes of an object can be accessed using the `attributes()` function.

#### Names Attribute

By default, there is no name for the values in a vector. To add names, use `names()`.

```{r names}
x <- 1:3
names(x) <- c("First Value", "Second Value", "Third Value")
x
names(x)
```

### Numeric / Numbers

Whole numbers in R are generally treated as Numeric values. If you would like to indicate that a number is actually an integer, you can use an `L` after the number like this: `1L`.

#### Sequences of Numbers

You can use the `:` character to represent from:to. Keep in mind that R is one-based indexed (not zero-based index). Examples:

```{r toFrom}
1:20
pi:10
15:1
```

When you need more functionality, you can use the `seq()` function instead. You can add the `by=` argument to make it go up by a different increment. Or, use `length=` to control the count of values instead.

```{r seq}
seq(1, 20)
seq(0, 10, by=0.5)
seq(5, 10, length=30)
# You can combine length(), seq(), and : to make indexed dataframes
mySeq <- seq(0, 5, length=15)
data.frame("Index" = 1:length(mySeq), "Decimal" = mySeq)
# You can also use along.with instead of 1:length(mySeq)
data.frame("Index" = seq(along.with = mySeq), "Decimal" = mySeq)
# Even easier - use seq_along()
data.frame("Index" = seq_along(mySeq), "Decimal" = mySeq)
# Another easy option - use seq_len(), with a length()
data.frame("Index" = seq_len(length(mySeq)), "Decimal" = mySeq)
```

Another form of the `seq()` function is the `seq_along()`, which generates a sequence for the length of an input vector, as seen above. `seq_len()` uses an integer value to make a sequence, which in the case above is the length of the input vector.

You can also use the `rep()` function to make repeated sequences. You can use it for repeated vectors too. If you use `each=` instead of `times=`, it will repeat each value that many times in a row, rather than in a sequence.

```{r rep}
rep(0, times = 40)
rep(c(1, 2, 3), times = 3)
rep(c(1, 2, 3), each = 3)
```

#### Special Numbers

There is also a special number for infinity, which is `Inf`. You can use this in normal calculations:

```{r Infinity}
print(1/Inf)
```

As you can see, when you run that code, you should get 0

You can also use `NaN` to represent an undefined value, or 0/0 in mathematical terms (also Inf-Inf). It can also be thought of as a missing value.

### Character Values 

Character values are indicated by "double quotes around them".

#### Joining (concatenating) a Character Vector

For joing a character vector into one value, you will typically use the paste() function. When using this, be sure to add the `collapse=` attribute. This will typically have " " to represent a space in between each value. You can also combine singular character values using `paste()`, but when doing this use the `sep=` attribute instead with " ".
If you want to add to / concatenate the vector, use the `c()` to with the vector and another value. 
You can also use `paste()` to join multiple character vectors. If you do this and the vectors are different lengths, it will recycle the values, but will go until its finished (doesn't need ot be a multiple). This and the above are shown in the following code chunk:

```{r joiningChar}
paste("Hello", "world!", sep = " ") # simple join
my_char <- c("My", "name", "is")
paste(my_char) # paste w/o spaces
paste(my_char, collapse = " ") # paste w/ spaces
my_char <- c(my_char, "Jaden.") # appending to vector
paste(my_char, collapse = " ") # paste w/ spaces
paste(c(1:3), c("X", "Y", "Z"), sep = "") # joining vectors
LETTERS <- c("a", "b", "c", "d", "e", "f", "g", "h")
paste(LETTERS, 1:3, sep = "-") # joining different length vectors
greet <- c("How", "are", "you?")
statment <- c(paste(my_char, collapse = " "), paste(greet, collapse = " ")) # combining two sentences
```

### Dates and Times 

Dates and times have their own special representations in R.

Dates are represented by the `date` class, and are stored internally as the number of days since 1/1/1970. They can be coerced from a character string using the `as.Date()` function.

```{r dateEx}
x <- "2021-01-01"
x
unclass(x)
# x + 1 returns an error
unclass(as.Date(x)) # this returns the # of days after 1/1/1970
```

There are no times attached to dates.

Times are represented by the `POSIXct` and `POSIXlt` classes, and are stored internally as the number of seconds since 1/1/1970. If you were to use `unclass()` on a time value, you may also see `POSIXt` returned, which can be ignored (it's a common language for the two types).

Times can be coerced from a character string using the `as.POSIXlt()` or `as.POSIXct()` functions. Here is an example that shows the difference between the types:

```{r times}
x <- Sys.time() # returns a POSIXct value
x # as.POSIXct() is unnecessary
unclass(x) 
p <- as.POSIXlt(x)
unclass(p)
names(unclass(p))
p$sec # you can select specific parts of the time by doing this
# x$sec doesn't work since POSIXct is an integer, not a list
p$year
```

Dates / date strings can be converted to times using the `strptime()` function:

```{r strptime}
datestring <- c("January 10, 2012 10:40", "December 9, 2011 9:10")
x <- strptime(datestring, "%B %d, %Y %H: %M")
x 
class(x)
```

The formatting strings are hard to remember, so just use `?strptime` if you're lost!

There are a number of generic functions that work on both dates and times:

* `weekdays()` - gives the day of the week 
* `months()` - gives the month name 
* `quarters()` - gives the quarter 

Try them out!

You can also use `difftime()` to find the difference between two times:

```{r diff}
time1 <- "April 26, 2022 08:44"
difftime(Sys.time(), time1, units = 'days')
```

The `lubridate` package is useful if you will be using dates/times often.

#### Operators on Dates and Times 

You can use mathematical operators on dates and times (really just + and -). You can also use logical comparisons. One cool thing about these funcitons is that they also keep track of leap years and timezones.

```{r dateTimes}
x <- as.Date("2012-01-01")
y <- strptime("9 Jan 2011 11:34:21", "%d %b %Y %H: %M: $S")
# x-y returns an error due to "incompatible methods" since they are different classes 
x <- as.POSIXlt(x)
x-y 
# Leap year
x <- as.Date("2012-03-01") 
y <- as.Date("2012-02-28")
x-y # time difference of 2 days due to leap year
```

### Missing Values

Missing values can be denoted by `NA` or `NaN`. You can use `is.na()` to test objects to see if they are NA, or `is.nana()` for NaN. NA values have a class also, so there are integer NA, cahracter NA, etc. A NaN value is NA, but NA is not a NaN value.

```{r MissingValues}
missingNA <- c(1, 2, NA, 10, 3)
is.na(missingNA)
missingNaN <- c(1, 2, NaN, NA, 4)
is.na(missingNaN) # both NaN and NA show as TRUE
is.nan(missingNaN) # only NaN shows as TRUE
```

If there are NA values in a vector, and you manipulate it (multiply it by 3 for example), the NA values will remail NA.
To find the count of non-NA values in a set, you can use `sum(is.na(data))`, since TRUE = 1.


## Multiple Object Data Types

Multiple object data types are things such as:

* Vectors
* Lists
* Matrices
* Factors

(note, these are still considered objects and this is just for organization of notes)

### Vectors

Vectors, also known as atomic vectors, are usually created using the `c()` function when you have the objects. Here are some examples:
```{r Vector_Examples}
numeric <- c(0.5, 0.6)
numeric
logical <- c(TRUE, FALSE)
logical
logical2 <- c(T, F)
logical2
character <- c("a", "b", "c")
character
integer <- 9:29
integer
complex <- c(1+2i, 2+4i)
complex
```

You can also use the `vector()` function to create empty vectors:
```{r VectorEx2}
numeric <- vector("numeric", length = 10)
numeric
```

#### Naming Vector Values

You can add names to a value by doing `"name" = value` in the `c()`. You can also pass the names of one vector onto another. You can also check to make sure two vectors have identical names by using `identical()`.

```{r namingV}
vect <- c(foo = 11, bar = 2, norf = NA)
vect
names(vect)
vect2 <- c(11, 2, NA)
vect2
names(vect2) <- c("foo", "bar", "norf")
identical(vect, vect2)
vect2["bar"]
vect2[c("foo", "bar")]
vect3 <- c(3, 11, NA)
names(vect3) <- names(vect)
```

#### Subsetting Vectors 

See "Importing, Writing, and Cleaning Data" for information on subsetting vectors

#### Vector Math 

Here are some quick calculations with vectors, with explanations in comments. This includes topics such as basic math done to a vector, manipulating vectors with other vectors, recycling values in vectors, etc.

```{r vectorMath}
z <- c(1.1, 9, 3.14)
z * 2 + 100
# The equation above is really z*c(2, 2, 2) + c(100, 100, 100). I.e. each value of z is multiplied by 2, and then has 100 added to it.
my_sqrt <- sqrt(z - 1)
my_sqrt 
# subtracts 1 from each value in z, then takes square root of each
my_div <- z/my_sqrt
my_div
# divides each value of z by the corresponding value in my_sqrt
c(1, 2, 3, 4) + c(0, 10)
# adds 0 to 1, 10 to 2, 0 to 3, 10 to 4. This is called *recycling*. MUST BE A MULTIPLE
c(1, 2, 3, 4) + c(0, 10, 100)
# This one doesn't work since 4 is not divisible by 3
```

#### Explicit Coercion 

At times, you may want to make a vector with different classes of objects. If this is the case, R will "Coerce" the vector to be the class that is the least common denominator.

You can explicitly coerce the vector into a type, by using `as.` followed by the type, such as `as.numeric(vectorName)`

### Lists

Lists are special vectors that can contain elements of different classes. When you print a list, a different line will be made for each type. You can also assign names in the list function.

```{r Lists}
mixed <- list(0.5, T, "one", 1, 1.7, 1+5i)
mixed
namedList <- list(Name = "jaden", Gender = "Male", Age = 23)
namedList
```

### Matrices

Another special vector type, they are vectors with a *dimension* attribute. The dimension attribute itself is an integer vector: `matrix(nrow = #, ncol = #)`.

Here is an empty matrix, with the `dim()` function and the `attributes()` function used to show the outputs:
```{r Matrices}
matrixEx <- matrix(nrow = 2, ncol = 3)
matrixEx
dim(matrixEx)
attributes(matrixEx)
```
As you can see, the `dim()` attribute returns a two-integer vector to represent the rows and columns 

If you want to make a matrix with a sequence, you can use `matrix(1:6, nrow=2, ncol=3)`. This made a matrix with the numbers 1 through 6, with two columns and three rows.

You can also change a vector into a matrix, by using the `dim()` attribute and assigning a two-integer vector to it.
```{r MatrixVector}
vectorMatrix <- 1:10
vectorMatrix
dim(vectorMatrix) <- c(2,5)
vectorMatrix
```

Lastly, you can also do it by Binding. You can *column-bind* by using `cbind()`, and *row-bind* by using `rbind()`. When using these, you will combine vectors together and use the vectors as individual rows or columns.
```{r Binding}
vector1 <- 1:3
vector2 <- 9:11
cbind(vector1, vector2)
rbind(vector1, vector2)
```

To name the columns in a matrix, you will need to use the `dimnames()` function, and apply a list that has two vectors in it. This is done since lists can have both numbers and letters. Rows come from the first vector, and columns the second.

```{r dimNamesEx}
namedMatrix <- matrix(1:4, nrow = 2, ncol = 2)
dimnames(namedMatrix) <- list(c("Row 1", "Row 2"), c("Column 1", "Column 2"))
namedMatrix
```

### Factors 

Factors are special vectors used to represent categorical data. They can be either ordered or unordered:

* Ordered - These are ranked values, with a set order
* Unordered - These are unranked, miscellaneous values with no set order

Factors are treated specially by modeling functions such as `lm()` and `glm()`. They can also have descriptions for the values, which makes them better than plain integer vectors.

When calling a `factor()`, it will also provide the Levels of the factor, which are the potential values listed in alphbetical order by default. You can use the `table()` function to show the counts of each value. You can also use `unclass()`, which will stript the class from the vector, and show only integers (which represent each possible value). Lastly, you can use the `levels()` function to manually set the levels (you don't have to do this though).
```{r Factors} 
factAuto <- factor(c("a", "b", "c", "b", "c", "a", "a"))
# Levels will be in alphabetical order by default
factAuto
table(factAuto)
unclass(factAuto)
factManual <- factor(c("a", "b", "c", "b", "c", "a", "a"),
    levels = c("c", "b", "a")) # This will flip the order
factManual
table(factManual)
unclass(factManual)
```

### Data Frames

Data frames are represented as a special type of list, used to store tabular data. Every element of the list must have the same length. I.

Each element of the list can be thought of as a column and the length of each element of the list is the number of rows (i.e. it needs to be a filled out table). Unlike matrices, data frames can store different classes of objects in each column.

Data frames also have a special attribute called `row.names`. They are usually created by calling `read.table()` or `read.csv()`. Can also be converted to a matrix by using `data.matrix`.

```{r DataFrame}
tableEx <- data.frame(date = c("1/1", "1/17", "2/2", "2/21"), holiday = c("New Year", "MLK Day", "Groundhog Day", "President Day"))
tableEx
nrow(tableEx)
ncol(tableEx)
```

## R Syntax Tips 

This section will go over the syntax of R 

### Vectorized Operations

Many operations in R are vectorized, i.e. they will go through the entire vector rather than having to loop through it. Here are some examples:

```{r vectorizedOps}
x <- 1:4; y <- 6:9
x + y
x > 2
y == 8
x * y 
x / y 
```

You can also do this with matrices:

```{r vectorizedMatrices}
x <- matrix(1:4, 2, 2); y <- matrix(rep(10,4), 2, 2) # rep() means repeat 10, 4 times
x * y # element-wise multiplication
x %*% y # true matrix multiplication (see math textbook lol)
x / y 
x + y 
```

## Coding Standards R

While this list isn't set in stone, it provides a solid foundation that you should try to adhere to:

1. Always use text files / text editor for files you're sharing with others. This is because a text file can be read by a vast majority of tools.
2. Indent your code for readability
3. Limit the width of your code to around 80 columns 
4. Limit the length of your functions. Try to limit them to one basic activity

## Workspace and Files 

This seciton will go over commands you can use to interact with RStudio / your IDE, and files as a whole.

Useful commands:

* `getwd()` - Retrieves the working directory
* `ls()` - Lists all of the objects/variables in your local workspace/file. Doesn't include values 
* `list.files()` - Lists the files in your working directory 
* `dir()` - Lists the files in your working directory
* `dir.create("")` - Creates a directory in currect working directory 
    * In order to create nested directories, 'recursive' must be set to TRUE 
* `setwd("")` - Sets the wd to the indicated path
* `file.create("")` - Creates a file in the wd 
* `file.exists("")` - Checks the wd to see if the file exists 
* `file.info("")` - Returns informaiton about the indicated file 
* `file.rename("", "")` - Renames an indicated file 
* `file.copy("", "")` - Copies the file with a new name 
* `file.path("")` - Provides the path for the indicated file. Limited to wd
    * Can also be used to create a file path
    * `dir.create(file.path("folder1", "folder2"), recursive = TRUE)`. This creates a nested directory in the current one