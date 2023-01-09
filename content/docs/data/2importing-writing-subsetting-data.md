---
title: "Importing, Writing, Subsetting, and Cleaning Data"
description: "Break this up in the future and build out a bit more"
lead: "Break this up in the future and build out a bit more"
date: 2023-1-09T08:48:57+00:00
lastmod: 2023-1-09T08:48:57+00:00
draft: false
images: []
menu:
  docs:
    parent: "data"
weight: 020
toc: true
---

# Importing, Writing, and Cleaning Data

This notebook is going to go over importing tabular and textual data into Rstudio, basic data cleaning, and more!

## Reading and Writing Basic Tabular Data Overview

In R, there are a few primary functions used to read data that return data frames in R:

* `read.table()` and `read.csv()` for reading tabular data
* `readLines()` for reading lines of a text file
* `source()` for reading in R code files (inverse of `dump()`)
* `dget()` for reading in R code files too (inverse of `dput()`)
* `load()` for reading in saved workspaces
* `unserialize()` for reading single R objects in binary form

There are also primary functions for writing data to files:

* `write.table()`
* `writeLines()`
* `dump()`
* `dput()`
* `save()`
* `serialize()`

### Reading with `read.table()` and `read.csv()`

The `read.table()` function is the most commonly used, and it has a few important arguments:

* `file`: The name of the file, or connection
* `header`: Logical indicating if the file has a header row in the table
* `sep`: A string indicating how the columns are separated (comma, period, space, etc.)
* `colClasses`: A character vector indicating the class of each column in the dataset
* `nrows`: The number of rows in a dataset
* `comment.char`: A character string indicating the comment character, if present 
* `skip`: The number of lines to skip from the beginning
* `stringsAsFactors`: Should character variables be coded as factors?

By default, the function will automatically skip lines that begin with #, figure out how many rows there are, and figure out what kind of variable is in each column of the table. However, R will run faster if you tell it these things instead.

Here's an example using all of the arguments:

```{r ReadTableEx, eval = FALSE}
importedTable <- read.table("/sample folder/sampledata.txt", header = TRUE, sep = "", colClasses = c("numeric", "logical", "character", "complex"), nrows = 10, comment.char = "#", stringsAsFactors = FALSE) 
```



The `read.csv()` function is very similar, except the default delimiter is a comma by default.

#### Reading Large Dataset tips 

Memorize the hints at these links: 
<https://www.rdocumentation.org/packages/utils/versions/3.6.2/topics/read.table>
insert R offical help page

Make a rough calculation of the memory required to store your dataset, if its larger than the amount of ram you have, then stop.

Set `comment.char = "" ` if there are no commented lines in your file 

Use the `colClasses` argument. Specifying the columns saves a ton of time. If all columns are the same, just do `colClasses = "numeric"`, otherwise, classify every column.

Set `nrows`. While this won't make it run faster, it does help with memory usage.

Ask yourself these questions:

* How much RAM memory is available?
* What other apps are being used?
* Are there other users logged in?
* What operating system? (incl 32 or 64)

#### Calculating Memory Requirements for Reading Data 

To find the memory that will be used, first find the number of elements that will be read, i.e. the count of values in the table. This is typically found by multiplying the rows by the columns.
Then, multiple that by the estimated bytes per value, which changes by data type.
Lastly, divide it by 2^20, since that is how many bytes are in a megabyte. Typically, multiply this number by 2 for a closer estimate.

## Reading and Writing Textual Data Overview 

Tabular data is a subclass of textual data, which is a more basic type. Functions oriented for Textual Data as a whole allows for you to have more flexibility, and more complex data inputs. 

Benefits of using textual data over tabular:

* When dumping and dputting, the resulting textual format is editable and potentially recoverable
* `dump` and `dput` also preserve metadata 
* Textual formats typically work better with version control programs that track changes
* Textual formats are typically longer lived and can be fixed easier if they are corrupted
* Textual formats adhere to "Unix Philosophy"
* One downside: The format is not very space-efficient

The primary functions that are used to read textual formats are:

* `dumping()`
* `dput()`

Here is a snippet of code where you create a data frame, save it as an R file, and then read it using `dget()`. Hoenstly, I don't understand the structure result at the time of writing.

```{r dputEx}
tableFile <- data.frame(a = 1, b = "a")
dput(tableFile)
dput(tableFile, file = "tableFile.R")
new.table <- dget("tableFile.R")
new.table
names(new.table) # to get the headers
```

Here is a snippet of code where you use the `dump()` function instead, and use `source()` to read it. `dput()` is limited to one object, whereas `dump()` can have multiple.

```{r dumpEx}
object1 <- "text"
object2 <- data.frame(a = 1, b = "a")
dump(c("object1","object2"), file = "data.R")
rm(object1, object2) 
# rm() removes the objects since they will be read from the file, optional
source("data.R")
# now, you can reference the objects from the file, which are the same as above
object1
object2
```

### Reading Lines of a Text File 

The function `readLines()` allows you to return the first x amount of lines from a file.

```{r ReadLines, eval = FALSE}
file <- read.table("filename")
first10 <- readLines(file, 10)
# this would return the first 10 lines of the indicated file
```

You can even use the `readLines()` function to read lines in a webpage:

```{r ReadURL}
webpage <- url("http://www.espn.com", "r")
first5 <- readLines(webpage, 5)
first5
```

## Connecting to Data Sources in R 

Data are read in using connection interfaces. The most popular interface is a file connection, i.e. connecting to a local file to read the data.

Here are some functions for connecting to data:

* `file()` - opens a connection to a file
* `gzfile()` - opens a connection to a file compressed with gzip (.gz)
* `bzfile()` - opens a connection to a file compressed with bzip2 (.bz2)
* `url()` - opens a connection to a webpage

### File Connections

Here are the arguments for the `file()` function:

```{r fileArg}
str(file)
```

Here are explanations for each argument:

* **description** is the name of the file (with extension)
* **open** indicates how to treat the file
    * "r" is read-only 
    * "w" is writing 
    * "a" is appending
    * "rb", "wb", "ab", reading, writing, or appending in binary mode (windows)
* **blocking** is whther the function returns to the evaluator before it is done reading the file. Default is on
* **encoding** is the name of the encoding to be used 

## Summarizing Overall Data

There are a number of functions that are useful for analyzing the contents of an object:

* `str()` - Provides a summary of the structure of data/object
* `summary()` - Provides a more in-depth summary of the actual data. Outputs change for different data types
* `head()` - Returns a preview of the top of a dataset (first 6 rows)
    * `head(x, n = 10)` - Change the row count to 10
* `tail()` - Returns a preview of the bottom of a dataset
* `ls()` - List variables/objects present in workspace
* `class()` - Returns the data class of the input
* `dim()` - Returns dimensions of the input (rows first, columns second)
* `nrow()` - Returns count of rows
* `ncol()` - Returns count of columns
* `object.size()` - Returns size in bytes that a datset is occupying in memory
* `names()` - Returns the names of all columns
* `table(tableName$column)` - Returns a count of how many times each value occurs in a column
* 

## Extracting Subsets of Objects 

There are a couple operators in R that can be used to extract subsets of R objects:

* `[` - always returns an object of the same class as the original, can be used to select more than one element 
* `[[` - is used to extract elements of a list or a data frame, can only be used to extract a single element, and the class may not necessarily be a list or data frame 
* `$` - is used to extract elements of a list or data frame by name, semantics are similar to [[

### Examples of []:

```{r subsetting}
object1 <- c("a", "b", "c", "c", "d", "a")
object1[1] # returns value in index 1
object1[2] # returns value in index 2
object1[1:4] # returns values in index 1-4
object1[c(1, 2, 5)] # returns the 1st, 2nd, and 5th value
object1[c(-2, -5)] # use negative index for "all elements EXCEPT"
object1[-c(2, 5)] # or, use -c()
object1[0] # returns nothing useful!
object1[7] # returns NA!
object1[object1 > "b"] # returns values greater than "b" (2 since its the second letter)
logicalVector <- object1 > "b" # creates a logical vector containing elements from object1 that are >b. Returns TRUE/FALSE
logicalVector 
object1[logicalVector] #filters object1 by the results from the logical vector
# Subsetting with NA in the vector, see later section for mote
naEx <- c(1, 3, NA, 2, NA, 9)
naEx[is.na(naEx)] # returns all NAs, since it is true 
naEx[!is.na(naEx)] # returns all non-NA, due to !
```

### Subsetting Lists:

The following code chunk shows different ways to extract data from a basic list

```{r subsettingLists}
list1 <- list(nums = 1:4, name = "jaden", age = "23")
list1[2]
list1[[2]] # notice difference in output, no name
list1$age
list1["age"] # only singular bracket returns name
list1[["age"]]
list1[c(2, 3)] # if multiple wanted, must use a vector inside of single bracket
calcList <- "age" # if the name of list item is a calculated value (variable)
list1[[calcList]] # then you have to use the double brackets
list1$calcList # doesn't exist!
```

You can also subset nested elements of a list by using double brackets with vectors 

```{r subsetNestList}
listNest <- list(a = list(10, 12, 14), b = c("a", "b"))
listNest[[c(1, 3)]] # you can use a vector
listNest[[1]][[3]]  # or you can use two double brackets
listNest[[c(2, 2)]]
```

### Subsetting Matrices 

You can also subset matrices.

```{r subsettingMatrices}
matrix1 <- matrix(1:6, 2, 3)
matrix1 # for context
matrix1[1, 2]
matrix1[2, 1]
matrix1[1,] # if you leave one empty, it will return the whole of the other
matrix1[,2]
# however, when you subset an element of a matrix, it is returned as a 1-value vector
matrix1[1, 2, drop = FALSE] # this makes it return a 1x1 matrix instead
```

### Partial Matching

You don't have to type the whole name when referencing an item in a list. The $ allows you to just use one letter, and it will the value that starts with that. A [[]] can be used with an `exact = false` argument in it. The partial indicator needs to still be unique though, otherwise it returns NULL.

```{r partialMatch}
list2 <- list(longword = "hi", phrase = "no")
list2$l 
list2[["l"]] # won't work since exact = TRUE by default
list2[["l", exact = FALSE]]
```

### Removing NA Values using Subsetting 

A useful aspect of subsetting is the ability to remove values. Here is a code snippet that creates a logical vector that filters the original vector.

```{r removingValues}
vector1 <- c(1, 2, NA, 4, NA, 6)
bad <- is.na(vector1)
vector1[bad] # this returns the NA values, which is not what you want
vector1[!bad] # use the ! to do the inverse
vector1[!is.na(vector1)]
```

If there are multiple objects, you can do the following.

```{r removeMulti}
obj1 <- c(1, 2, NA, 4, NA, 6)
obj2 <- c("a", "b", NA, "c", NA, "d")
obj3 <- c(4, 2, 6, 1, 3, 4)
good1 <- complete.cases(obj1, obj2) # returns a T/F indicating a NA value is present in the vectors
good1 
good2 <- complete.cases(obj1, obj2, obj3) # as you can see, still returns false if one doesn't have NA
good2 
obj1[good1]
obj1[good2]
obj3[good2] # still returns the 4 non-NA from the others. 
combined <- data.frame(obj1[good2], obj2[good2], obj3[good2]) # use data.frame() to add multiple filtered vectors
combined 
```

This is very useful for removing rows with an NA value out of a table. You can also just use `complete.cases()` on a dataframe to remove them.

```{r removeNaTable}
obj1 <- c(1, 2, NA, 4, NA, 6)
obj2 <- c("a", "b", NA, "c", NA, "d")
obj3 <- c(4, 2, 6, 1, 3, 4)
combined <- data.frame(obj1, obj2, obj3)
combined 
cleaned <- complete.cases(combined)
combined[cleaned,] # the comma is necessary!
```
