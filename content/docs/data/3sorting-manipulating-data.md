---
title: "Sorting and Manipulating Data"
description: "Most of this is covered in others, so lets break it down and add to other sections later"
lead: "Most of this is covered in others, so lets break it down and add to other sections later"
date: 2023-1-09T08:48:57+00:00
lastmod: 2023-1-09T08:48:57+00:00
draft: false
images: []
menu:
  docs:
    parent: "general"
weight: 030
toc: true
---

# Sorting and Manipulating Data

This document will go over a lot of different ways to sort and manipulate your data, including subsetting, summarizing, reshaping and manipulating, and will go over merging and managing data with dplyr.

## Subsetting and Sorting

First, we're going to have a quick refresher on subsetting. Subsetting is when you use `[]` to extract subsets of the data.

When working with data frames, you can subset like this: `data[rows, columns]`. The comma is always necessary if you are subsetting a column, even if you won't be specifying the rows. It is good practice to still use it when you're subsetting rows, even though it isn't necessary.

Rows and columns can be represented by a few things in the brackets:

* **Singular Number** - The row or column corresponding to that #
    * `data[3, 4]` - Third row, fourth column 
    * `data[,1]` - First column (comma!)
    * `data[1]` - First row (notice no comma)
* **Column Name** - The column label if the data frame has them set 
    * `data[,"col name"]` - The indicated column
* **Sets and Vectors** - A set of numbers representing the columns and rows 
    * `data[1:7, c(1, 3, 5)]` - Rows 1-7, with columns 1, 3, and 5

You can also use logicals to subset a data frame:

* For these, you're typially going to put the logical expression in the row side of the bracket:
    * `data[logic test,]` - Even though we aren't restricting the columns, we still place the comma to indicate we want all columns
* You can place multiple logic tests in a part of the subset by using logical operators, and a set of parenthesis:
    * `data[(logic test 1 & logic test 2),]`
    * `data[(logic test 1 | logic test 2),]`
* When doing logicals, you may need to implicitly refer to a column, which you can do with the `$` operator:
    * `data[data$col1 > 4,]` - Show me the rows where column 1 is greater than 4, with all columns present

If you're dealing with NA values, you can use a `which()` to still query that column. In the example code below, we try to subset both with and without.

```{r subsetting}
set.seed(13435)
x <- data.frame("var1" = sample(1:5), "var2" = sample(6:10), "var3" = sample(11:15))
x <- x[sample(1:5),]; x$var2[c(1,3)] = NA # first section tells it to "sample" rows 1-5, so they are in a different order. The second section tells it to change values 1 and 3 in the 2nd column to NA
x 
x[,1]
x[,"var1"]
x[1:2, "var2"]
x[(x$var1 <= 3 & x$var3 > 11),]
x[(x$var1 <= 3 | x$var3 > 15),]
x[x$var2 > 8,] # keep in mind 6 and 9 were replaced with NA. Since NA isn't equal to any number, it comes up as TRUE, so you return more data than you wanted.
x[which(x$var2 > 8),] # returns only the correct row
x[x$var1 %in% c(1, 2),] # rows with var1 = 1 or 2
```

### Sorting 

We can also sort the data using the `sort()` function. Here are a couple helpful arguments:

* `decreasing=`  - Defaults to FALSE, so order is ascending. Change to TRUE to sort in descending order 
* `na.last=` - defaults to FALSE (not present), change to TRUE to push all NA values to the end of the sort 

```{r sorting}
sort(x$var1)
sort(x$var1, decreasing=TRUE)
sort(x$var2)
sort(x$var2, na.last=TRUE)
```

`sort()` only returns the values in the indicated column / dataset.

### Ordering 

You can also order a data frame as a whole by a variable using the `order()` function. To use it, you place it in the rows seciton of the subsetting bracket, and indicate which column you would like to order it by. You can also use multiple variable, but this only works if there are multiple, equal values in the first column you are specifying.

`order()` also has `decreasing=` and `na.last=`.

```{r ordering}
x[order(x$var1),]
x[order(x$var1, x$var3),] # nothing changes since there are no duplicates in var1
```

### Ordering with `plyr`

You can do the same thing with the `plyr` package, with the `arrange()` function. If you need it to descend instead, you can use the `desc()` function on the ordering variable.

```{r plyr}
library(plyr)
arrange(x, var1)
arrange(x, desc(var1))
```

We will go over this more in the associated package page.

### Adding Rows and Columns 

You can also add rows and columns to a data frame simply by assigning a value to a subset of a not-present column. In the example above, we've had three columns: var1, var2, and var3. In the example below, we add a fourth column to it:

```{r addingCol}
x$var4 <- rnorm(5)
x
```

You can also add columns by using `cbind()`, and rows with `rbind()`. When using them, each row/column you are adding on is separated by a comma. If you want to specify different values for each row in the column, or column in the row, you will need to use a vector:

```{r addingCol2}
y <- cbind(x, "var5" = rnorm(5))
y
z <- rbind(y, c("var1"=6, "var2"=NA, "var3"=16, "var4"=0.3273, "var5"=-0.2534)) # using a vector to add specific values to each column in the new row
z
zz <- rbind(z, 1, newRow = "newRow") # each comma represents a new row
zz
```

http://www.biostat.jhsph.edu/~ajaffe/lec_winterR/Lecture%202.pdf

## Summarizing Data 

We can use an array of functions to summarize the data. These are important, since a good amount of data cleaning revolves around looking at the data and figuring out what you need to fix.

* Looking at a bit of the data
    * You can use `head()` and `tail()` to return a set number of rows from the top or bottom of the data 
    * `head(data, n=5)` - Returns top 5 rows of data
* `summary(data)` - Produces an overall summary of the data we have 
    * Provides counts of each factor if applicable, or if they are character values
    * Provides summary statistics for numeric variables
    * Can return too much information if not careful
* `str()` - General information about the input, very ubiquitous
* `quantile()` - Shows distribution of values
    * `na.rm=` - removes NA values from quantiles
    * `probs=c()` - Changes percentiles to represent percentage values in the vector 
* `table()` - Makes a table based on an input. So if you use one column in a data.frame, it will make a frequency table for each value. If you use two columns, it will make an actual table.
    * `useNA="ifany"` - Necessary to show the count of NA values
    * `table(data$colForVert, data$colForHor)` - Vertical value is first, horizontal is second
* Checking for missing values can be done many ways
    * `sum(is.na(data$col))` - Equals 0 if there are no NA, 1 if there are any 
    * `any(is.na(data$col))` - FALSE if no NA
    * `all(data$col > 0)` - TRUE if no NA (double check the logic though, could just be values that don't meet it)
    * `colSums(is.na(data))` - helpful for full data frame, shows 0 if all values not NA, 1+ if any are
        * `all(colSums(is.na(data))==0)` - Checks all columns and returns T/F 
* Finding values with specific characteristics
    * `table(data %in% c("value"))` - Returns a T/F table showing how many meet the criteria / equal the value. A vector allows multiple possible values
    * `data[data$col %in% c("value 1", "value 2"),]` - Subsets out the rows with the indicated value
* Making cross tabs; i.e. where you combine columns and see what values meet multiple criteria
    * `xtabs(ValueToUse ~ Slice1 + Slice2, data=data)`
        * see UCBAdmissions ex below
        * `ValueToUse ~ .` means slice by all variables 
        * `ftable()` on the cross tabs makes it more pretty
* Checking size of dataset is easy using `object.size(data)`
    * Returns in bytes, here's an example for Mb:
        * `print(object.size(data), units = "Mb")`

Most of these are pretty straighforward, so I have not made an example chunk of code.

### Cross Tabs Ex 

However, there is one that is confusing without a visual:

```{r crossTabs}
data(UCBAdmissions)
data <- as.data.frame(UCBAdmissions)
summary(data)
xtabs(Freq ~ Gender + Admit, data=data) # makes a cross table based on Gender and Admits
xt <- xtabs(Freq ~., data=data) # breaks it by all, so includes stats for each dept
xt 
ftable(xt) # makes it prettier
```

## Creating New Variables / Columns 

Often, the data you are analyzing won't have the exact values you're looking for, so you may have to add them to the data frame.

This section is going to show a few different columns/variables you may want to add

### Creating Sequences for an Index Column

Creating sequences is easy using `seq()`. You can use the attribute `by=` to choose the steps between values, and `length=` to decide how many values are included. You can also use `along=` with a vector to create an index!

```{r seq}
seq1 <- seq(1, 10, by=2); seq1 # this makes a sequence of numbers between 1 and 10, with a step of 2 each time
seq2 <- seq(1, 10, length=3); seq2 # this makes a sequence of three numbers, with the max and min being 1 and 10
x <- c(1, 3, 8, 25, 100); seq(along=x) # this makes an index value
```

### New Variable by Subsetting 

You can use the `%in%` to subset a column and say whether the value is one that you're looking for:

```{r in, eval=FALSE}
dataTable$newCol <- dataTable$col %in% c("value1", "value2", "value3")
dataTable$newCol # the new column will have a TRUE/FALSE value indicating if that record is equal to one of the values you are trying to subset by
```

### Creating Categorical Variables 

We can create categorical variables by using the `cut()` function, mixed with the `breaks=` attribute. This attribute tells the function how to cut up / group the data. You can also use `cut2()` from the `Hmisc` package to indicate how many groups you want to use 

```{r cut, eval=FALSE}
dataTable$newGroupCol <- cut(dataTable$col, breaks=quantile(dataTable$col)) # this would add a column that indicates which quantile each record is in, for the indicated column
library(Hmisc)
dataTable$newGroupCol <- cut2(dataTable$col, g=4) # easier way to do the same thing
```

The `cut()` function creates factor variables

### Creating Factor Variables 

Sometimes, you may want to change an integer column into a factor instead (think zip codes). To do this, you can use the `factor()` function. It will now change how the data is reported for that column (such as no mean for zipcode!).

```{r factor, eval=FALSE}
dataTable$newFactorCol <- factor(dataTable$zipCodes) # zip codes as an example
```

You may want to change the order of the levels as well. By default for characters, it will go smallest word to largest word. Here is an example that changes the order to be "yes" and then "no", instead of the default.

```{r factorChange}
yesNo <- sample(c("yes", "no"), size=10, replace=TRUE)
yesNoFactor <- factor(yesNo, levels=c("yes", "no"))
relevel(yesNoFactor, ref="yes") # changes "yes" to first level
as.numeric(yesNoFactor) # changes the factor variable back to numeric
```

### Using Mutuate and `cut2()`

You can also use `mutate()` from the `plyr` package to add a column:

```{r mutate, eval=FALSE}
library(Hmisc); library(plyr)
mutatedData <- mutate(Data, zipGroups = cut2(zipCode, g=4)) # adds a column that makes quantile groups for zipcodes
table(mutatedData$zipGroups)
```

### Common Transform Functions 

Here is a list of functions that can be used to transform values:

* `abs()` - Absolute value 
* `sqrt()` - Square root 
* `ceiling()` - Round up
* `floor()` - Round down
* `round(x, digits=n)` - Round to indicated decimal
* `signif(x, digits=n)` - Round to indicated significant figure count 
* `cos()`, `sin()`, `tan()` - Cos, Sin, Tan 
* `log()` - Natural log 
* `log2()`, `log10()` - Other common Log 
* `exp()` - Exponentiating inner value (make it an exponent)

Here's a link to more: https://www.biostat.jhsph.edu/~ajaffe/lec_winterR/Lecture%202.pdf

## Reshaping the Data 

The goal with reshaping data is to get it to the following structure:

* Each variable forms a column 
* Each observation forms a row 
* Each table/file stores data about one kind of observation 

One of the first things we're going to do is use `melt()` to combine measure variables into one column, with specific ID variables indicated. For `melt()`, you will need to add `id=` values that are not measures, and then use `measure.vars=` to indicate a vector of measurements you would like to be housed in one column.

We can also cast a dataset, which means change the shape of it to measure what we want. Continuing with the above example, we will use `dcast()` to reshape the table to show how many values of each variable there are, for each cylinder. You can use `~` to indicate which variables you are going to be casting the table with, and you can use a summarizing function at the end to change it from the default `length`.

```{r melt}
library(reshape2)
head(mtcars)
mtcars$carname <- rownames(mtcars) # first create a column that uses the row names. Based on the above head(), you can see that the car name is not a variable
carMelt <- melt(mtcars, id=c("carname", "gear", "cyl"), measure.vars=c("mpg", "hp"))
head(carMelt, n=3)
tail(carMelt, n=3)

# Now looking at dcast()

cylData <- dcast(carMelt, cyl ~ variable) # cylinders as rows, variables as columns
cylData 
cylData <- dcast(carMelt, cyl ~ variable, mean) # changing it to mean instead of length
cylData
```

### Averaging Values 

We can use the following functions to find averages / other aggregate measures:

* `tapply(aggregated column, for each column, function to be used)` - apply a function along an index
* `split(aggregated column, split column)` - split one variable by another 
* `lapply(list of values, function)` - use after split, you can apply function to levels of the list
    * `unlist()` to change back to a vector
* `sapply()` - Same as other, just simplifies it

You can also use the `plyr` package, mainly `ddply()`:

* `ddply(data, .(variable for action), action, how to find action)` - See below
* Use `ave()` as "how to find action"
    * To use `ave()`, indicate which of the functions within it you are calling

```{r averaging}
head(InsectSprays) # data has two columns, type of spray and count
tapply(InsectSprays$count, InsectSprays$spray, sum) # For all of the counts (the x) in each spray (the index), use sum
splitData <- split(InsectSprays$count, InsectSprays$spray)
splitData
sprCount <- lapply(splitData, sum)
sprCount
ddply(InsectSprays, .(spray), summarize, sum=sum(count))
spraySums <- ddply(InsectSprays, .(spray), summarize, sum=ave(count, FUN=sum))
dim(spraySums)
head(spraySums)
```

You may also want to check out:

* `acast()`
* `arrange()`
* `mutate()`

## Managing Data Frames with `dplyr`

The `dplyr` package is primarily used for managing data frames, which must be tidy! The package itself is a faster, more intuitive version of `plyr`. Here are some of the basic verbs/functions:

* `select` - Return a subset of columns of a data frame 
    * You can use `startCol:endCol` to select a few columns. Only works in `dplyr` `select`
    * `-(columns)` means all except those columns
* `filter` - Extract a subset of rows from a data frame based on logical conditions
    * Dataset followed by logical expression, creates new df
    * Use & for multiple expressions
* `arrange` - Reorder rows of a data frame 
    * `asc` is default
* `rename` - Rename variables in a data frame
    * `newName = oldName`, use `,` to separate each variable to be renamed
* `mutate` - Add new variables or transform existing
* `summarise/summarize` - Generate summary statistics of variables

Here are some properties of `dplyr`:

* The first argument is a data frame 
* Subsequent arguments describe what to do with it. You can refer to columns by their names, no `$` needed
* The result is a new data frame 
* Data frames must be properly formatted and annotated for this to be useful (all variable names / annotations)

You can also chain multiple of these onto the same dataset by using the `%>%` operator (pipeline operator). This means you wouldn't need to indicate the dataset for each function (shown at end of code).

```{r dplyr}
library(dplyr)
chicago <- readRDS("C:/Users/jaden/source/repos/Programming Notes - Data Languages/R Guide/General Notes/Files/chicago.rds")
dim(chicago) # rows and columns
str(chicago)
names(chicago)
head(select(chicago, city:dptp)) # selecting columns from city to dptp
head(select(chicago, -(city:dptp)))
chicagoFilt <- filter(chicago, pm25tmean2 > 30)
chicagoFilt <- filter(chicago, pm25tmean2 > 30 & tmpd > 80)
head(chicagoFilt)
chicago <- arrange(chicago, date)
head(chicago)
chicago <- arrange(chicago, desc(date))
head(chicago)
chicago <- rename(chicago, pm25 = pm25tmean2, dewpoint = dptp)
chicago <- mutate(chicago, pm25detrend = pm25-mean(pm25, na.rm = TRUE)) # new column that shows devation from the mean
head(select(chicago, pm25, pm25detrend))
chicago <- mutate(chicago, tempcat = factor(1 * (tmpd > 80), labels = c("cold", "hot")))
hotcold <- group_by(chicago, tempcat)
summarize(hotcold) # shows each group due to the group_by(), need to indicate specific columns / summarization (shown next)
summarize(hotcold, pm25 = mean(pm25, na.rm = TRUE), o3 = max(o3tmean2), no2 = median(no2tmean2))
chicago <- mutate(chicago, year = as.POSIXlt(date)$year + 1900) # adds a year column by subsetting the year from the date
years <- group_by(chicago, year)
summarize(years, pm25 = mean(pm25, na.rm = TRUE), o3 = max(o3tmean2), no2 = median(no2tmean2))
chicago %>% mutate(month = as.POSIXlt(date)$mon + 1) %>% group_by(month) %>% summarize(pm25 = mean(pm25, na.rm = TRUE), o3 = max(o3tmean2), no2 = median(no2tmean2)) # chaining them together
```

`dplyr` also works with other data frame backends, such as `data.table` and the `DBI` package for SQL.

## Merging Data 

For merging, we will primarily use `merge()`, which merges data frames. It includes the following important parameters:

* `x` / `y` - Datasets to merge. X is the one to be merged onto, Y is merging into
* `by`
* `by.x` / `by.y` - 
* `all` - TRUE means it will include rows that were unable to be merged, with NA values in the missing spots (default is FALSE)

By default, it will merge by columns with the same names. You can see what columns it will merge by by using `intersect()`.

You can also use `join()` in the `plyr` package, but it is less full featured (a bit faster though!). It defaults to left join and can only join between common names between two datasets (wouldn't work for sample data below).

```{r merging}
reviews <- read.csv("C:/Users/jaden/source/repos/Programming Notes - Data Languages/R Guide/General Notes/Files/C2W3reviews.csv")
solutions <- read.csv("C:/Users/jaden/source/repos/Programming Notes - Data Languages/R Guide/General Notes/Files/C2W3solutions.csv")
head(reviews, 2)
head(solutions, 2)
names(reviews)
names(solutions)

# merging by default
intersect(names(solutions), names(reviews))
mergedData <- merge(reviews, solutions, all=TRUE) # doesn't do what we want since the indicated variables aren't actually primary keys
head(mergedData) # you can see this due to how many NAs there are

# merging with the right columns
mergedData2 <- merge(reviews, solutions, by.x = "solution_id", by.y = "id", all=TRUE) # merge solutions with reviews, where solution_id and id are the primary keys
head(mergedData2)

# quick join() example
df1 <- data.frame(id=sample(1:10), x=rnorm(10))
df2 <- data.frame(id=sample(1:10), y=rnorm(10))
arrange(join(df1, df2), id)

# example with 3
df3 <- data.frame(id=sample(1:10), z=rnorm(10))
dfList <- list(df1, df2, df3)
join_all(dfList)
```

## Editing Text Variables 

You'll often run into issues with text variables, such as extra spaces. Here are some ways that you can edit text variables:

* `tolower()` / `toupper()` - Changes the case of the text (lowercase and uppercase)
* `strsplit()` - Good for automatically splitting variable names
    * `split=` - important attribute that tells what to split on 
* `sub()` - Substitute parts of character values (only does first value)
    * Takes a lookup value, a replacement value, and a vector 
* `gsub()` - Same as `sub()`, but it replaces all of the values
* `grep()` - Takes a search value and returns the elements of the input that match
    * `grepl()` - Returns T/F instead
    * `value=TRUE` - Add this attribute to return the values that match, instead of the element #
* `nchar()` - Returns # of characters in value 
* `substr()` - Returns a part of a variable
* `paste()` - Combines inputs (with spaces between)
    * `paste0()` - No spaces 
* `str_trim()` - Removes trailing/leading spaces

### Regular Expressions 

Regular expressions can be used to identify parts of strings, and can expand you ability to search through text. These can be used in `grep()`, `grepl()`, `sub()`, and `gsub()`.

**Literals** are exact matches. The simplest patterns will consist of only literals. Here are some tools / metacharacters for finding more complex matches:

* `^` - The `^` icon represents the start of a line 
    * `^i think` returns all lines that start with "i think"
* `$` - Represents the end of the line
    * `end$` returns all lines that end with "end"
* `[list of characters]` - Returns lines matching any of the indicated characters. The `[]` indicates a character class
    * `[Aa][Bb]` returns lines containing "AB", "aB", "ab", or "Ab" 
    * `[Ii] am` returns lines that start with either "I am" or "i am"
    * `^[0-9][a-zA-Z]` returns lines starting with a number followed by any letter
* `[^characters]` - a `^` in the beginning of a class means "not"
    * `[^?.]$` returns lines that do not end in a ? or .
* `.` - When used between two characters, it means any character can appear there instead 
    * `9.11` returns 9/11, 9.11, 9a11, etc.
* `|` - Represents multiple options
    * `flood | earthquake | hurricane` returns any of those words
    * `^[Gg]ood | [Bb]ad` - Returns sentences either starting with good, or containing bad (^ would be needed for both for the start)
* `()` - Combines expressions so a metacharacter applies to both
    * `^([Gg]ood | [Bb]ad)` - Returns sentences starting with good or bad
* `?` - Indicates the expression is optional
    * `[Gg]eorge( [Ww]\.)? [Bb]ush` returns lines with either George Bush or George W. Bush. Keep in mind where there are spaces present in the expression
* `\` - Interpret the character as itself
    * In the above example, you see it being used to represent the "." following W
* `\#` - If you add a number after a \, then it will refer to one of the other expressions in the line 
    * `+( [a-zA-Z]+) +\1 +` returns lines with a word `(( [a-zA-Z]+))`, followed by the same word `(\1)`, possibly repeated (last +)
* `*` - Any number of the character, when used between two characters, it will return the longest possible string that satisfies the expression
    * `(.*)` returns lines with parenthesis present, with any amount of characters in them (only when by itself, usually means anything between two things)
    * `^s(.*)s` returns the longest instance of an s at the start of a line, followed by anything, followed by an s
    * `*?` makes it less "greedy"
        * `^s(.*?)s` returns the first instance it finds, rather than the longest
* `+` - One or more of the character 
    * `[0-9]+ (.*)[0-9]+` returns lines with at least one number, followed by any amount of characters, followed by another number 
* `{}` - Interval quantifiers, indicates the max / min number of matches
    * `[Bb]ush( +[^ ]+ +){1,5} debate` returns lines with 5 or less words between "bush" and "debate".
        * The `(+[^ ]+ +)` means "space, word, space"
    * `{m,n}` means at least m, no more than n, `{m}` means exactly m, and `{m,}` means at least m

## Working with Dates 

Dates can get a little tedious in R. For example, `date()` and `Sys.Date()` return dates of different classes: 

```{r datesEx}
d1 <- date()
d1
class(d1)
d2 <- Sys.Date()
d2 
class(d2)
```

Thankfully, you can reformat the dates if you want. For that, here is what the symbols are:

* `%d` - Day as number
* `%a` - Abbreviated weekday
* `%A` - Unabbreviated weekday 
* `%m` - Month as number 
* `%b` - Abbreviated month
* `%B` - Unabbreviated month 
* `%y` - 2 digit year 
* `%Y` - 4 digit year

You can then use the `as.Date()` function to change a character vector into a date, or `format()` to reformat a date. For `as.Date`, the main input after the vector is the structure of the input. So you would have to reformat it to a different date notation after changing it to a date.

**Julian** is a date format that tells you the # of days since the origin, as well as what the origin is (think excel date values). 

Here are some examples of things you can do with dates using the previous functions and some more:

```{r dateEx2}
d1 <- date()
d2 <- Sys.Date()
format(d2, "%a %b %d")
format(d2, "%Y, %B %d")
x <- c("1jan1960", "2jan1960", "31mar1960", "30jul1960"); z <- as.Date(x, "%d%b%Y")
z[1] - z[2]
as.numeric(z[1] - z[2])
weekdays(d2)
months(d2)
julian(d2)
```

### The Lubridate Package 

The `lubridate` package has some useful functions for dates as well:

* `ymd()`, `mdy()`, `dmy()` - Takes an input that matches the structure of the function, returns the default date value with timezone
    * Able to handle a wide range of formats, converts to a date class value
* `_hms` - If you add an `_hms` to the end of one of the previous functions, it will add the hours, minutes, seconds too 
    * `tz=` is the timezone attribute
* `wday()` - Weekday function 
    * `label=` adds the day name

## Additional Data Resources

Here are some websites you can use for data and such:

* http://data.un.org 
* http://www.data.gov (US data)
* http://www.data.gov/opendatasites
* http://www.gapminder.org/
* http://www.asdfree.com/ (surverys, processed in R)
* http://www.infochimps.com/marketplace