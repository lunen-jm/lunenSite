---
title: "Shiny - Introduction"
description: "Doks is a Hugo theme for building secure, fast, and SEO-ready documentation websites, which you can easily update and customize."
lead: "Doks is a Hugo theme for building secure, fast, and SEO-ready documentation websites, which you can easily update and customize."
date: 2023-1-09T08:48:57+00:00
lastmod: 2023-1-09T08:48:57+00:00
draft: false
images: []
menu:
  docs:
    parent: "tools"
weight: 040
toc: true
---

This document contains some notes for the course found here:

https://www.coursera.org/learn/data-viz-shiny-dashboards/home/week/1

Setwd: 

`setwd("C:/Users/jaden/source/repos/Programming Notes - Data Languages/R Guide/Shiny Apps and Dashboards")`

# Getting started with Shiny 

This first section will kinda follow the introductory video, with some basic steps that were taken:

* Open R Studio, create a new Shiny Web App
    * You can choose either a single file (app.R) or multi file (ui.R/server.R) server
    * Complex projects may use multiple!
    * You can also choose a directory to make this in
    * When you do this, it will be autopopulated with the geyser example, which you can see by clicking "run app"
* In the example that shows up, you can see that the ui is created using `fluidpage()`. Within this funciton, you will see some parts of it as well
* Below that, you will see the server section, which renders the chart
    * One thing to note is that the output from `plot0utput()` is used in the `output$distPlot` part later on to render the plot

Install these packages for Shiny:

```{r packages, eval = FALSE}
install.packages(c(
  "gapminder", "ggforce", "gh", "globals", "openintro", "profvis", 
  "RSQLite", "shiny", "shinycssloaders", "shinyFeedback", 
  "shinythemes", "testthat", "thematic", "tidyverse", "vroom", 
  "waiter", "xml2", "zeallot" 
))
```

## Steps for building your own

Here are the parts of a basic app, written in code:

```{r shiny1, eval = FALSE}
library(shiny)

# Define the user interface by making a ui variable with the fluidPage() function

ui <- fluidPage()

# define the server, which will be a function with input and output

server <- function(input, output){}

# Lastly, state that ui=ui and server=server

shinyApp(ui=ui, server=server)
```

Once you've written these lines, R Studio will recognize it as a Shiny App.

Here is one with a bit more features (make sure you have commas in the functions!):

```{r shiny2, eval = FALSE}
library(shiny)

# Define the user interface by making a ui variable with the fluidPage() function

ui <- fluidPage(
    
    # Adding a title
    titlePanel("My Simple App"), # comma

    # Adding something with an input
    # this will create a textbox users can use
    textInput(inputId="my_text", label="Enter some text")

    textOutput(outputID = "print_text")
    # this uses the "print_text" output from the server, and prints it to the app
)

# define the server, which will be a function with input and output

server <- function(input, output){
    output$print_text <- renderText(input$my_text)
    # since "my_text" is an input taken from the textInput() function,
    # we can assign it to be an aspect of the rendered output
    # i.e., this is making the submitted text be able to render (not yet though!)
}

# Lastly, state that ui=ui and server=server

shinyApp(ui=ui, server=server)
```

This exemplifies that a Shiny App is a lot of back and forth; i.e. it goes from the fluidPage, to the server, back to the fluidPage, etc. Lots of call and responses!

Mainly, you should keep i mind that the following occurs:

1. The user submits text on the app, which is stored using the `textInput()` function as `input$my_text`
2. The server assigns a rendered version of `input$my_text` to `output$print_text`
3. The fluidPage uses the `print_text` from the output in the `textOutput()` function to show it in the app 

## Resources to Read 

Here are some resources that were read in the course. Rather than take notes, I will just add everything later once I have a better grasp:

* Wickham Excerpts
    * https://mastering-shiny.org/preface.html
    * Chapters 1-3.3 for a brief introduction
    * Ch.1 creates the web app in this folder that shows all of the built in data frames in the datasets packages. Also had the problem for the GGPlot2 one 
* R Studio Videos 
    * https://shiny.rstudio.com/tutorial/
    * More in-depth than course
* Shiny Gallery 
    * https://shiny.rstudio.com/gallery/
    * A collection of examples and such
