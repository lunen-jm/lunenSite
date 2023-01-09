---
title: "Macro Basics"
description: "For these, I took out the images since I don't have that figured out. Raw files are still in og repo"
lead: "For these, I took out the images since I don't have that figured out. Raw files are still in og repo"
date: 2023-1-09T08:48:57+00:00
lastmod: 2023-1-09T08:48:57+00:00
draft: false
images: []
menu:
  docs:
    parent: "introduction"
weight: 060
toc: true
---

Under construction!!!

This document explores the basics of creating your own macro from scratch, what subs are, and the differences between formulas and functions

# Macro Basics and Creating Your Own

In short, a macro is essentially a chunk of code meant to perform a singular task. This is different than a program, as those typically use numerous procedures to perform a vast amount of tasks.

Because of this, a macro is often called a subroutine or subprocedure. In fact, if you look at the top of a macro, you will typically see `sub()`, which stands subroutine.

### Running a Macro (save till a later section)

Once you've created a macro, there are five different ways you can run it:

* Assign a Quick Access Toolbar button to the macro and use it
* Add the macro to the Ribbon and use it
* Use the shortcut-key-combination if you added one when you created the macro
* Use `Alt+F8` to display the Macros dialogue box
* Run it straight from the VBA editor by using `F5`