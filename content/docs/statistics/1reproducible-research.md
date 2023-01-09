---
title: "Reproducible Research"
description: "Doks is a Hugo theme for building secure, fast, and SEO-ready documentation websites, which you can easily update and customize."
lead: "Doks is a Hugo theme for building secure, fast, and SEO-ready documentation websites, which you can easily update and customize."
date: 2023-1-09T08:48:57+00:00
lastmod: 2023-1-09T08:48:57+00:00
draft: false
images: []
menu:
  docs:
    parent: "statistics"
weight: 010
toc: true
---

This document will primarily go over reproducible research and some of the main things you should focus on.

# Overview - Concepts and Ideas

The ultimate standard for strengthening scientific evidence is replication of findings and conducting studies with independent investigators, data, analytical methods, laboratories, and instruments. Replication is particularly important in studies that can impact broad policy or regulatory decisions.

There are some issues that you may face though, such as difficulties replicating due to duration, cost, uniqueness, etc. If you can't replicate it however though, you should still focus on making the data and code available so others can reproduce the findings.

This is called **reproduceability**, and is vital for research so it can continue to guide decisions in the most efficient and accurate ways.

## Research Pipeline

There's a lot that goes into a research project. Here's a general pipeline that one may follow to get to the end result; an Article. Keep in mind that the end user receives the article first, and kinda works backwards throughout this process (starts looking at the text, and then has questions relating to methods, and then data, etc.).

1. Measured data:
    * First off, you're going to have to acquire the data
    * Once you have this data, you will create the **Processing Code** that helps you arrive to the next deliverable
2. Analytic Data:
    * After you have created your processing code, and the data is cleaned and organized, you can start creating the **Analytic Code** and expriment with some exploratory analysis
3. Computational Results:
    * Once you have your computational results from the analytic data, you can start creating the **Presentation Code**. This includes:
        * Figures
        * Tables
        * Numerical Summaries
4. Then, you can compile all that you need into an overall **Article**

From this pipeline, you need to make a vast majority of it avaliable for rpelication / analysis for it to be an acceptable study (paraphrasing). Specifically, you need to make the following available:

* Analytic Data
* Analytic Code 
* Documentation of Code and Data 
* Standard Means of Distribution

Notably missing is the raw data, which for some projects may just be too complicated, or impractical to provide (think massive databases).

Unfortunately, in reality, these principles aren't followed to a T, and you'll run into many articles where you will need to piece together a lot of unclear information.

## Literate (Statistical) Programming

A good tool to make this easier is known as Literate (Statistical) Programming.

A way to go about this is by thinking of an article as a stream of text and code. Analysis code is divided into text and code chunks, each of which loads data and computes results.

Presentation code just formats these results, while the article text explains what's happening.

Literate programming itself is a general concept that requires:

* A documentaiton language (human readable)
* A programming language (machine readable)

**Sweave** is a tool in R that uses LaTeX and R to achieve this goal: https://www.statistik.lmu.de/~leisch/Sweave 

Sweave has many limitations, such as:

* LaTeX is a difficult to learn markup language used by very few people
* Lacks features like cahing, multiple plots in a chunk, mixing languages, and other technical aspects
* Not frequently updated or developed

Because of this, we primarily use knitr, which works with .rmd files like this one.

## Scripting an Analysis

Golden rule of reproduceability: **Script everything**

This can be done using .rmd files, or just pure R files. This will be discussed more later!

# Structure of a Data Analysis 

The general structure typically goes like this:

1. Defining a Question 
    * Typically, you will start out trying to define the scope of your analysis, and what you will be exploring. Try to narrow down the question to be as concise as possible to reduce the amount of noise you may accumulate
    * To narrow your question, start b ythinking about the science involved, move to the type of data you may be able to get / analyze, and then think about the applied statistics you could use 
2. Defining the Ideal Dataset
    * After the question is defined, you will need to define what you would prefer datawise. It may be one of the following types of datasets based on your analysis:
        * Descriptive - a whole population
        * Exploratory - a random sample with many variables Measured
        * Inferential - the right population, randomly sampled 
        * Predictive - a training and test dataset from teh same population 
        * Casual - data from a randomized study 
        * Mechanistic - data about all components of a system
3. Determine what Data You Can Access
    * Fairly straightforward
4. Obtain the Data 
    * Try to obtain raw data, reference the source, and note the URL and date accessed. Oftentimes, a polite email will go a long way!
5. Clean the Data 
    * Raw data often needs to be processed, but if it is pre-processed make sure you understand how it was. Make sure you also understand the source of the data, and if it is good enough for your use 
6. Exploratory Data Analysis
    * Usually, you want to take a look at one or two-dimension summaries of the data, check for missing data, create exploratory plots, and perform exploratory analyses (such as clustering)
    * Use functions such as `head()`, `table()`, `str()`, `plot()`, `plot(log10(columns + 1))`, `hclust()`, etc.
7. Statistical Prediction and Modeling
    * Should be informed by results of exploratory analysis, exact methods depend on the question of interest, and measures / sources of uncertainty should be communicated
8. Interpret Results 
    * Use appropriate language such as describes, correlates with, leads to, predicts. Give an explanation of your results, with an interpretation of coefficients and measures of uncertainty
9. Challenge Results 
    * Now that you know the results and can explain, question all of your methods to validate it and think of potential alternative analyses 
10. Synthesize and Write Up Results 
    * Lead with the question, synthesize the analyses, and order relevant analyses according to the story. Make sure your figures are aesthetically pleasing now 
    * Remember the analyses you didn't include, in case anyone tries to challenge you on that aspect 
11. Create Reproducible Code

# Coding Standards in R 

Coding standards are important, as they allow other people to easily read your code. Here are some basic standards:

1. Try to use .txt files as often as possible as this allows everyone to be able to access your code 
2. Indent your code so the flow is understandable
3. Limit the width of your code to around 80 columns
4. Limit the length of individual functions to only cover one task 
    * Very important for debugging

There are other smaller things you can do, but these are the main things that should always be considered

# Markdown, R, and `knitr`

Markdown itself is a very useful language for making documents, as it is a text to HTML conversion tool that focuses on the writing and keeps formatting simple. Because of this, it has been implemented with R to create tools such as R Markdown documents.

## R Markdown 

R Markdown is the integration of R code with markdown. It allows one to create a document containing "live" R code that is evaluated as the document is processed. This is a core tool in literate statistical programming!

The documents can be converted to raw markdown using the `knitr` package, which will be discussed later. Markdown itself can be converted to HTML using the `markdown` package. Any basic text editor can edit markdown!

This section will be filled in later using the R Markdown Overview .txt file in the repo 

## `knitr`

Most of this was just more basic details about R Markdown. However, here's a code section that shows you how to set global options for the code chunks:

```{r setOptionsEx, eval = FALSE}
opts_chunk$set(echo = FALSE, results = "hide")
```

This would set all subsequent code chunks to hide the results and not show the code. Here are some common options:

* Output 
    * `results: "asis", "hide"` - Show the results of the code 
    * `echo: TRUE, FALSE` - Echo the code or not 
    * `eval: TRUE, FALSE` - Run the code or not
    * `tidy: TRUE, FALSE` - 
    * `highlight: TRUE, FALSE` - 
* Figures
    * `fig.height: numeric` - Height of figures 
    * `fig.width: numeric` - Width of figures
* Cache
    * `cache = TRUE, FALSE` - After first run, results are loaded from cache (unless anything changes)

# Caching Computations

In the literate statistical framework, you are typically storing parts of the data within the document. To expand on this, you can use the `cacher` package. This creates key-value databases for expressions and intermediate data results. 

You can use the `cachepackage()` function to make a package of the document.

As a reader, you would use `clonecache(id = "packageName")`. You can also use `showfiles()` to list the files. 

When you clone an analysis, local directories are created, and the source code and metadata is download. Data objects are not downloaded, by default. 

May want to look back into this if the need ever arises. Probably won't need to since its a high-level concept.
