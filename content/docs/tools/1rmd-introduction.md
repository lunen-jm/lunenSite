---
title: "RMD - Introduction"
description: "Doks is a Hugo theme for building secure, fast, and SEO-ready documentation websites, which you can easily update and customize."
lead: "Doks is a Hugo theme for building secure, fast, and SEO-ready documentation websites, which you can easily update and customize."
date: 2023-1-09T08:48:57+00:00
lastmod: 2023-1-09T08:48:57+00:00
draft: false
images: []
menu:
  docs:
    parent: "tools"
weight: 010
toc: true
---

When working on this website, the `R markdown` package was used to essentially make a collection of "advanced" note pages. These pages are called R-Markdown documents, and have an `.rmd` suffix on them. They are essentially just markdown documents with optimization features for R, such as code rendering! In this document, we're going to take a look at the language that is used in `.rmd` files, some enhancements you can do, and more. Granted, I ended up making a .md based one once I got more experienced, so expect this to change!

# R Markdown Syntax

As stated earlier, the R Markdown syntax is very similar to markdown, and has a few additional tools and features.

See this link: https://www.rstudio.com/wp-content/uploads/2015/02/rmarkdown-cheatsheet.pdf

Here is a quick overview of what the symbols mean. 

::: {style="display: flex;"}

::: {}

This section is in a code chunk (see raw code for visual), so you can see the symbols. Keep in mind that this is also a fairly advanced document in itself that uses some CSS classes to 

```{r RmarkdownEx, eval=FALSE}
The ` symbol is used to `highlight` words and `can be used for phrases` too. This is great for code.

# Makes a header (and a comment in raw R code!!). See "Example Header"

Where count of `#` indicates the level. The lower the level, the larger the title.

## Level 2
### Level 3
#### Level 4, etc.

* A "*" makes a bulleted list 
* Be sure to have an empty row between the last bit of text and the first bullet point
* Otherwise it will

just show up as
* a normal asterisk
on the same line
even if its on another line


```

:::

::: {}

The [`] symbol is used to `highlight` words and `can be used for phrases` too. This is great for individual code lines.

# Example Header

Where count of `#` indicates the level. The lower the level, the larger the title.

## Level 2
### Level 3
#### Level 4, etc.

* A "*" makes a bulleted list 
* Be sure to have an empty row between the last bit of text and the first bullet point
* Otherwise it will

just show up as
* a normal asterisk