---
title: "Reading and Processing Data"
description: "Doks is a Hugo theme for building secure, fast, and SEO-ready documentation websites, which you can easily update and customize."
lead: "Doks is a Hugo theme for building secure, fast, and SEO-ready documentation websites, which you can easily update and customize."
date: 2023-1-09T08:48:57+00:00
lastmod: 2023-1-09T08:48:57+00:00
draft: false
images: []
menu:
  docs:
    parent: "data"
weight: 010
toc: true
---

# Reading Data, an Overview

This document is going to over the difference between raw and processed data, components of tidy data, downloading files, and reading files from multiple different sources.

## Raw and Processed Data

Data itself is values of qualitative or quantitative variables, belonging to a set of items.

**Raw Data**

Raw data has the following characteristics:

* The original source of the data
* Often hard to use for analysis
* Analyzing this data includes processing
* May only need to be processed once

**Processed Data**

Processed data has the following characteristics:

* Data that is ready for analysis
* Processing can include merging, subsetting, transforming, etc.
* There may be standards for processing
* All steps of analysis should be recorded

## Components of Tidy Data

Once you have transitioned the raw data to processed data, there are four things you should have:

1. The raw data
2. A tidy data set
3. A code book describing each variable and its values in the tidy dataset (usually metadata)
4. An explicit and exact recipie that you used to go from 1 -> 2,3

Be very clear with your instructions, and provide every single variable/step you used/did.

# Downloading and Reading Files

Prior to downloading and reading files, you may need to set your working directory.

## Getting/Setting Your Working Directory

A basic component of working with data is knowing your working directory (what folder on your computer/device you are working in). To find out what it is, simply use `getwd()`.

You will almost always need to change your working directory when you hop between projects. To change it, you will use `setwd()` with the path to the working directory.

### Relative vs. Absolute Paths

There are two types of paths you can use, relative and absolute.

* **Absolute** - This would be the full path: `setwd("C:/Users/Jaden/Documents")`
* **Relative** - This can be used to "go one deeper" in your current wd. This is what it would look like if your wd was the "Jaden" folder: `setwd("./Documents")`

Note - when using a Windows machine, you may need to use \ instead of /. / still works out of vs code though.

### Checking For and Creating Directories

`file.exists("directoryName")` will look in your current directory and see if a subdirectory exists with that name
`dir.create("directoryName")` will create a subdirectory if it doesn't exists

```{r directoryTest, eval = FALSE}
if (!file.exists("subDirectory")) {
    dir.create("subDirectory")
}
```

## Downloading Files

To download files from the internet, you can use `download.file()`. This is important to use so you can make it as reproducible as possible.

The important parameters include `url`, `destfile`, and `method`. When finding the files online, right-click the download link, and save the link address to a variable. Here is an example:

```{r downloadEx, eval = FALSE}
fileURL <- "https://data.kingcounty.gov/api/views/j56h-zgnm/rows.csv?accessType=DOWNLOAD"
download.file(fileURL, destfile = "./data/sampleData.csv", method = "curl")
list.files("./data") # would return the sampleData.csv file and any others
```

As you can see in the above chunk, `method = "curl"` was used. This is necessary if the url starts with https and you are on mac. If the url starts with http, you can just use `download.file()`. If it starts with https on windows, you're usually okay.

This function may take a while if the file is big, as it is actually downloading it from the internet. Also be sure to record when it was downloaded!

## Reading Local Files 

Local files are also known as flat files, which are files that are already present in your working directory. A majority of the following is also found in the "Intro to Importing, Writing, Subsetting, and Cleaning Data" document.

Loading flat files is typically done by using `read.table()`

* Flexible and robust, but requires parameters 
* Important ones include file, header, sep, row.names, and nrows
* Reads data into RAM - big data can cause problems

`read.csv()` is similar, but doesn't require parameters. Same with `read.csv2()`.

```{r readTableEx, eval = FALSE}
sampleData <- read.table("./data/sampleData.csv", sep = ",", header = TRUE)
sampleData <- read.csv("./data/sampleData.csv") # does same thing
```

Here are a couple more parameters and notes:

* `quote` - you can tell R whether there are any quoted values. `quote = ""` means no quotes (this is one of the most common issues you may run into)
* `na.strings` - set the character that represents a missing value 
* `nrows` - how many rows to read of the file 
* `skip` - how many rows to skip before starting to read 

## Reading Excel Files 

Excel files work a bit different than other filetypes, and are the most widely used type for sharing data.

If you're going to use it, you will need to download the `xlsx` package. This contains functions such as `read.xlsx()` and `read.xlsx2()`.

Parameters such as `sheetIndex`, `colIndex`, and `rowIndex` are useful for returning certain parts of the data in an excel file. See example for usage.

```{r excelEx, eval = FALSE}
library(xlsx)
sheetIndex <- 1 # only the first sheet
colIndex <- 2:3 # columns 2 and 3
rowIndex <- 1:4 # rows 1 through 4 (includes header)
sampleData <- read.xlsx("./data/sampleData.xlsx", sheetIndex = sheetIndex, colIndex = colIndex, rowIndex = rowIndex)
```

Additional notes:

* `write.xlsx()` will create an excel file 
* `readxlsx2()` is faster, but may be unstable if reading subsets of rows 
* `XLConnect` package contains more options for writing and manipulating Excel files 
* In general, a CSV or TXT file is preferred for distribution and sharing 

## Reading XML

XML stands for extensible markup language, and is usually used to store structured data. Very common for internet-based code, as it is the basis for most web scraping. You will need to download the `XML` package for reading these files.

There are two main components:

* **Markup** - Labels that give the text structure 
* **Content** - The actual text of the document 

A **Root Node** of an XML file is kinda like a wrapper element for the entire document.

### Tags, Elements, and Attributes

**Tags** correspond to general labels:
* Start tags `<section>`
* End tags `</section>`
* Empty tags `<line-break />`

**Elements** are specific examples of tags:
* `<Greeting> Hello, world </Greeting>` (the "Hello, world" is content, the greeting overall is the element)

**Attributes** are components of the tag label:
* `<img src="example.jpg" alt="photo"/>` (src and alt)
* `<step number="3"> Step Example </step>` (number)

### Using XPath Language 

The XPath language is how you specify which part of the document you want to work with when working with XML files. Here are some examples:

* `/node` - Top level node
* `//node` - Node at any level 
* `node[@attr-name]` - Node with an attribute name 
* `node[@attr-name="bob"]` - Node with an attribute name of "bob"

Here's a good link to some [additional notes](http://www.stat.berkeley.edu/~statcur/Workshop2/Presentations/XML.pdf)

### Reading into R 

You can use `xmlTreeParse()` to store the xml document. Since it is still a structured document after this, you will need to use additional functions to extract certain parts of it:

* `xmlRoot()` - returns the root node of the XML file. The following functions can have any node within, but the root node is used for clarity
    * `xmlName(rootNode)` - when used on the root node, returns the name of the file 
    * `names(rootNode)` - returns the names of the nested elements within the root node
    * `xmlValue(rootNode)` - returns the text content elements in the root node
    * `xmlAttrs(rootNode)` - returns all attributes in a node, returns NULL for root node 
        * `xmlGetAttrs()` - particular value 
    
* `xmlSApply(XML level, function)` - applys a function to each element, see example. When using the root node as the XML level, it will return all elements. Can also use sections of the xml document and return all elements of an element.
* `
* Subsetting
    * You can also subset the rootNode to return parts of the document. See example

Here is an example that uses all of them and some other XPath things:

```{r xmlEx}
library(XML)
fileURL <- "C:/Users/jaden/source/repos/Programming Notes - Data Languages/R Guide/General Notes/Files/simpleXML.xml"
doc <- xmlTreeParse(fileURL, useInternalNodes = TRUE)
rootNode <- xmlRoot(doc)
xmlName(rootNode) # returns the name of the document
names(rootNode) # five food elements in menu
rootNode[[1]]
rootNode[[1]][[1]]
xmlValue(rootNode) # defaults to a one-line return of all elements
xmlSApply(rootNode, xmlValue) # returns each element separately
xmlAttrs(rootNode)
xpathSApply(rootNode,"//name",xmlValue) # Applys xmlValue to all nodes with the name attribute
xpathSApply(rootNode,"//price",xmlValue)
```

## Reading JSON

JSON stands for Javascript Object Notation, and is a lightweight data storage language. It is the common format for data from APIs, and is similar to XML.

Data in JSON is stored in the following datatypes:

* Numbers (double)
* Strings (double quotes around them)
* Boolean (T/F)
* Array (ordered and are comma separated, enclosed in [])
* Object (unordered and comma separated collection of key:value pairs in {})

This is the type of data that is returned from API calls, and you can use the `jsonlite` package for easy analysis. Here are some of the functions and what they do:

* `fromJSON()` - Converts JSON to a data frame
* `toJSON()` - Converts a data frame to JSON

Here is an example that uses my Github API. Nothing was needed to set this one up as it is a public api site:

```{r JSONEx}
library(jsonlite)
jsonData <- fromJSON("https://api.github.com/users/lunen-jm/repos")
names(jsonData)
names(jsonData$owner)
jsonData$owner$login # provides the values of all of the login sections in the owner tab
```

### Writing Data Frames to JSON

Sometimes, you may need to write a data frame to JSON instead of R. To do that, you can use the `toJSON` function. Here's an example of this using the `iris` dataset that is in base R. The example also converts the JSON back to a dataframe at the end.

```{r writingJSON}
library(jsonlite)
myjson <- toJSON(iris, pretty=TRUE) # pretty gives it nice indented structure
cat(myjson) # cat() prints out data
iris2 <- fromJSON(myjson)
head(iris2)
head(iris)
```

## The data.table Package 

The `data.table` package is a faster, more efficient way of working with dataframes. Any function that accepts a data.frame value works on data.table too. When working with data.tables, you will need to use the `copy()` function if you want another, rather than just assigning the value of the first one to the copy.

```{r dataTable}
library(data.table)
set.seed(100)
DF <- data.frame(x=rnorm(9), y=rep(c("a", "b", "c"), each=3), z=rnorm(9))
head(DF,3)
set.seed(100)
DT <- data.table(x=rnorm(9), y=rep(c("a", "b", "c"), each=3), z=rnorm(9))
head(DT,3)
tables() # allows you to see the data usage for the data.tables you are using
DT[2,]
DT[DT$y=="a",] # only when y is equal to a
DT[c(2,3)] # returns rows 2 and 3
DT[,c(2,3)]
DT[,list(mean(x), sum(z))]
DT[,table(y)] # returns a table of the y values
DT[,w:=z^2] # adds a new column that is equal to z squared
DT
DT[,m:= {tmp <- (x+z); log2(tmp+5)}] # this uses an expression. The expression is in the {}, and is a multi-step operation. It sets tmp, and then does stuff to it. This is added on as the new column "m"
DT[,a:=x>0] # adds a boolean column for x > 0
DT[,b:= mean(x+w), by=a] # adds a column that provides two means - one for those where a is equal to TRUE, and one for FALSE
DT
```

### Special Variables 

There are also special variables in data.table that allow you to do some things fast.

* `.N` - An integer, length 1, containing the number of values in a data.table 

```{r specialEx}
set.seed(100)
DT <- data.table(x=sample(letters[1:3], 1E5, TRUE)) # creates a 100000-value table that only uses the letters a:c
DT[, .N, by=x] # creates a column that uses .N, and slices it by column x (so a, b, c)
```

### Keys 

Data.tables also allow you to set keys, which helps you sort fast. They can also be used for joins (think SQL).

```{r keyEx}
DT <- data.table(x=rep(c("a", "b", "c"), each=100), y=rnorm(300))
setkey(DT, x)
DT["a"] # defaults to subsetting just the key. So, it returns all a values in column x

# now time for joins

DT1 <- data.table(x=c("a", "a", "b", "dt1"), y=1:4)
DT2 <- data.table(x=c("a", "b", "dt2"), z=5:7) # since a only appears once, 5 will appear for all a values in the z column when joined
setkey(DT1, x); setkey(DT2, x)
merge(DT1, DT2) # since "dt1" and "dt2" are not present in both, they are not joined. The result is the complete table
```

### Fast Reading 

Time to prove that it is in fact faster! For this, we're going to use the `fread()` function, which is similar to `read.table()`.

```{r fastRead}
big_df <- data.frame(x=rnorm(1E6), y=rnorm(1E6))
file <- tempfile()
write.table(big_df, file=file, row.names=FALSE, col.names=TRUE, sep="\t", quote=FALSE)
system.time(fread(file))
system.time(read.table(file, header=TRUE, sep="\t")) # much slower!
```

## Reading MySQL Data 

MySQL is a free and widely used open source database software that is widely used in internet-based apps: https://www.mysql.com/

Data are structured in:

* Databases
* Tables within Databases 
* Fields within Tables 
* Each row is called a record!

To read SQL data, download the `RMySQL` package. Since I don't want to make a MySQL database, these notes will not actually evaluate the R commands. The code will access the UCSC Genomre Bioinformatics database, which can be found at genome.ucsc.edu/goldenPath/help/mysql.html. 

```{r mySQL, eval=FALSE}
library(RMySQL)
ucscDb <- dbConnect(MySQL(), user="genome", host="genome-mysql.cse.ucsc.edu")
result <- dbGetQuery(ucscDb,"show databases;"); dbDisconnect(ucscDb) # show databases is a MySQL command. It is always good to disconnect from the database after each query in order to not overwhelm it
result # this shows all of the databases that are available
hg19 <- dbConnect(MySQL(), user="genome", db="hg19", host="genome-mysql.cse.ucsc.edu") # now it will only pull the tables in the hg19 database
allTables <- dbListTables(hg19) 
length(allTables) # this db has 10940 tables
allTables[1:5] # first 5
dbListFields(hg19, "affyU133Plus2") # show me all of the fields in the noted table
dbGetQuery(hg19, "select count(*) from affyU133Plus2") # returns the count of records in the table
affyData <- dbReadTable(hg19, "affyU133Plus2")
head(affyData) # would show you the head of the table
dbSendQuery(hg19, "select * from affyU133Plus2 where misMatches between 1 and 3")
affyMis <- fetch(query); quantile(affyMis$misMatches) # misMatches is a field in the table
affyMisSmall <- fetch(query, n=10); dbClearResult(query) # dbClearResult erases the query from the server
```

`dbGetQuery` stores the data locally in R, `dbSendQuery()` stores it remotely i nthe server, until `fetch()` is used. You can use `n=#` in the fetch to limit the amount of data you're returning. 

http://www.pantz.org/software/mysql/mysqlcommands.html

http://www.r-bloggers.com/mysql-and-r/

## Reading HDF5

HDF5 is used for storing large data sets. and supports a range of data types. It has a heirarchial data format, and uses groups and datasets. Groups have a group header with the group name and a list of attributes, and a group symbol table with a list of objects in group. Datasets are multidimensional arrays of data elements with metadata. They have a header with the name, data type, dataspace, and storage layout, and a data array that contains the actual data.

The HDF5 package is not actually native to R, and you will have to use the following code chunk to use it:

```{r hdf5Package, eval=FALSE}
source("http://bioconductor.org/biocLite.R")
biocLite("rhdf5")
library(rhdf5)
```

Here is a link to a lecture if you ever have to use this type: http://www.bioconductor.org/packages/release/bioc/vignettes/rhdf5/inst/doc/rhdf5.pdf

## Reading from the Internet 

This seciton will revisit webscraping, with an HTML-focus instead. Two things to note; Sometimes web scraping is against the terms of service, and sometimes our IP address can be blocked if you load too many pages too fast.

Order of operations for a basic scrape:

1. Use `url()` to store the url 
2. Use `readLines()` to store it 
3. Close the connection using `close()`

```{r webScrape, eval=FALSE}
con <- url("https://www.espn.com/nba/team/schedule/_/name/por/portland-trail-blazers")
htmlCode <- readLines(con)
close(con)
head(htmlCode)
```

### Parsing HTML Using XML Package

The example above showed that the HTML is hard to read in its raw state. Thankfully, we can use the `XML` package to parse it easier.

Here is an example that uses ESPN instead, and is a bit more complicated. To get the html data, you just have to right-click and select "view source". Stopped working on this because modern websites are very complicated haha. Example in video was way easier.

```{r xmlEx2, eval=FALSE}
library(XML)
fileUrl <- "C:/Users/jaden/source/repos/Programming Notes - Data Languages/R Guide/General Notes/Files/htmlEx.html"
doc <- htmlTreeParse(fileUrl, useInternal=TRUE)
table <- xmlValue(doc)
scores <- xpathSApply(doc, "//score", xmlValue)
scores
```

### GET from the httr Package 

There is also the `httr` package, which is usually better than the XML package in regards to getting the data (using `GET()`, `content()`, and `htmlParse()`). We can then use the `xpathSApply()` for extracting values:

```{r httr, eval=FALSE}
library(httr)
html <- GET("https://www.espn.com/nba/team/schedule/_/name/por/portland-trail-blazers")
content2 <- content(html, as="text")
parsedHtml <- htmlParse(content2, asText=TRUE)
xpathSApply(parsedHtml, "//title", xmlValue)
```

#### Accessing Websites with Passwords

You can also add autentication to the `GET` command. The following url is a test website that allows you to test certain parts of your code. In this case, it is the authentication.

```{r httrCred}
library(httr)
pg <- GET("http://httpbin.org/basic-auth/user/passwd", authenticate("user", "passwd"))
pg
names(pg)
```

#### Using Handles 

Sometimes, you want to stay authenticated for a website, while visiting different pages on it. To do this, you can set up a handle in the beginning of the code, and it will apply to the indicated paths:

```{r handles, eval=FALSE}
google <- handle("http://google.com") # add the authenticate() formula to store that each time
page1 <- GET(handle=google, path="/") # adds the / for the homepage
page2 <- GET(handle=)
```

http://www.r-bloggers.com/

## Reading APIs

This section will also use some of the information from the reading JSON section. We will be using the `httr` package.

For a vast majority of APIs, there is a "Create an App" interface that you can use to create your base. I have made one on my Spotify account for this section (see console on Spotify Developer). When you have made an app, there are a few important pieces of authentication you will need to pay attention to:

* Consumer Key / Client ID 
* Consumer Secret Key
* Request token URL 
* Authorize URL 

Note that some interfaces won't have easy to find URLs.

`httr` steps for connection:

1. Use `oauth_app("app name", key = "yourConsumerKeyHere", secret="yourConsumerSecretHere")` to start the autorization process
    * The app name is just for your usage, it is not sent to the API 
    * The key and secret are the base ones for the app itself, not the user
2. Use `sign_oauth2.0("whatever you stored step 1 as", token = "yourTokenHere", token_secret = "yourTokenSecretHere")
    * Some websites may use 1.0


Here is an example on how to create an API connection using the `httr` package:

```{r APITest, eval=FALSE}
library(httr)
myapp <- oauth_app("firstApp", key = "14a5bc1b10af4fc7b94e980aa04293cf", secret = "f8f23c6150744a5b9382d59fd87b711c")
sign_oauth2.0(myapp, )
config()
```

The course is a bit out of date, so come back to this in the future when you have time. Visit the `httr` github page to see real examples of how it works.

## Reading from Other Sources

Typically, there will be some sort of R package that has been made for whatever type of data you're trying to read. Look into the main websites for info on potential packages.