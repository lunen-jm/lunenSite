---
title: "VBA Editor"
description: "For these, I took out the images since I don't have that figured out. Raw files are still in og repo"
lead: "For these, I took out the images since I don't have that figured out. Raw files are still in og repo"
date: 2023-1-09T08:48:57+00:00
lastmod: 2023-1-09T08:48:57+00:00
draft: false
images: []
menu:
  docs:
    parent: "introduction"
weight: 020
toc: true
---

This document explores the VBA Editor, and highlights important buttons and tools you can use to find help / debug your macros

# A Look Into the VBA Editor

To access the Visual Basic for Applications Editor, click the "Visual Basic" button on the developer tab in Excel (or Word), or click "edit" in the Macro dialogue box, with a macro selected. The latter option will open the macro automatically in the editor.

## Exploring the Windows 

Here is a screenshot of the VBA editor, with a colored line representing each of the default windows.

/ZScreenshots/vbaWindows.png

* **Yellow** - Project Explorer
* **Cyan** - Object Browser
* **Magenta** - Code Window

Beyond that, you also have the toolbar up top, and the miscellaneous dropdown menus.

### The Project Explorer

The project explorer is the primary way you will navigate between files and programs. Here is a closer look:

/ZScreenshots/vbaProjectExplorer.png

First, we will go through the buttons on the top bar:

* **Green** - View Code
    * Opens up a macro/module/user class/user form in the code window. You can also double click the item
* **Orange** - View Object
    * Opens up an object present in the explorer, which are things such as excel sheets, word documents, etc.
* **Magenta** - Toggle Folders
    * Changes the view in the window. Collapses the folder structure if unchecked

In the project explorer pictured earlier, you can see multiple folders with items in them. These are all a part of the open excel document, which is represented by the `VBAProject (Oversets Tracking.xlsm)` collapsible icon. 

The `Microsoft Excel Objects` folder contains two different things; each of the individual sheets in the document, and a document-level macro repository titled `ThisWorkbook`. 

When you double click one of these objects to open them, you will see a (probably) blank window that is meant to house VBA code. The sheet-level windows can house code meant only for that individual sheet, whereas the `ThisWorkbook` window houses macros that can (probably) be used anywhere in the document

Forms, Modules, and Class Modules will all be covered in a later document.

### The Properties Window

The Properties window is an area where you can edit the properties of a sheet, a module, a form, etc. Here is a screenshot of it with a basic sheet selected:

/ZScreenshots/vbaProperties.png

Here are the definitions for the highlighted areas:

* **Yellow** - Object Selector
    * This dropdown menu allows you to change which object's properties you are viewing
* **Green** - Sort Order
    * These buttons toggle whether the properties will be organized by spelling or by category
* **Magenta** - Properties
    * This area shows the name of the property on the left, and the values on the right

We don't need to discuss what these properties actually are yet, as they won't be used very often. The main one to keep in mind is the (Name), which will be useful to change for modules.

### The Code Window

The code window doesn't need much defining, as it is just a window that houses the code. The two dropdown menus on the top allow you to navigate throughout the window, which will be a tiny bit useful when you start to create longer chunks of code, and add multiple macros to a singular object.

The next section will go over tools that can help you when you're using the code window.

### The Immediate Window

The immediate window is one of the non-default windows that is useful to be aware of. 

The immediate window is essentially a terminal like in other IDEs, used to test individual lines of code. Whatever you type into the window will be evaluated.

## Editing Features

There are multiple features in the VBA editor that are there to help you build code. The Object Browser is the most robust tool that can help, but there are also auto-fill tools that cna be just as useful.

### The Object Browser

The object browser is not immediately available when you open the VBA editor. TO open it, go to the `view` dropdown menu on the top, and click the `object browser` option. This will open the object browser in full screen, so you'll likely need to right click it and select "docketable". Since the vba editor is limited to one screen, it is useful to have it undocketed, and open on a different screen so it doens't take up space.

The Object Browser is a tool to help you find out more information aobut different functions and objects, and understand how you can alter them with their members. 

Here is a screenshot of the Object Browser, with the `Sheet1` class (also object) selected:

/ZScreenshots/vbaObjectBrowser.png

Here are definitions for the highlighted sections:

* **Green** - Library Selector
    * This dropdown menu allows you to cycle between class libraries. There are certain classes that are unique to Word, Excel, PowerPoint, etc. (like sheets in Excel, and Slides in PowerPoint)
* **Orange** - Help Buttons
    * The two-sheets-of-paper icon allows you to copy the name of a class to your clipboard, for easy pasting into the code window
    * The icon in the middle allows you to view the definition of the class, which is only useful for ones that are explicit objects in the VBA editor (such as sheets, modules, custom functions, etc.)
    * The quesiton-mark button opens up the help page for that class or member, on the Microsoft website
* **Blue** - Search Bar
    * The dropdown-looking thing is a search bar for the classes, while the binoculars is the search button. The last button toggles an additional search results window that also tells you which library the result is a part of
* **Yellow** - Class Window
    * The class window contains all of the possible classes / functions you can call, as well as defined objects such as sheets, forms, modules, etc.
* **Magenta** - Members Window
    * The members window shows all of the different members of the selected class, which is typically a collection of functions and other ways to modify objects
* **Purple** - More Information
    * This little seciton on the bottom give you a little bit of additional information about whatever you have selected

We will likely go a bit more in depth with this tool once we understand VBA more.

### Complete Word

This feature can complete the word you are typing into the code window. This is very helpful for those longer-members of some classes. When you are typing and haven't typed enough to distinguish the word from any other, there will be a dropdown menu that you can scroll down to find the word you need. You can also press `tab` to finish the word if the first result is what you would like to use.

If this feature is not coming up by itself, you can activate it by pressing `Ctrl+spacebar`

It can also be found in the `Edit` dropdown, and the `edit` toolbar (if you add it to your workspace).

### Quick Info

The quick info feature provides information about arguments you can use in a command. Here are the methods you can use to get it to display if it isn't automatically:

* Type a space following a command (`msgbox (space)`) - Easiest way
* click the quick info icon on the edit toolbar (if added)
* Right-click a VB command in the code and choose quick info
* Position the insertion point (the lil | that follows you as you type) in the command and press `Ctrl+I`
* Position the insertion point in the term and choose quick info in the edit dropdown

### Autolist Members

Many VB commands have properties (qualities) and methods (behaviors), which make up the *members* that were referenced in the Object Browser. The autolist members is used within a function/command to list the options you have (similar to complete word). It is thankfully switched on by default. 

If it isn't showing up, you can also use the List Properties/Methods button on the edit toolbar.

### List Constants

Similar to the Autolist and Complete Word tools, the List Constants one shows you the options for constants for a command. These are used after an `=` usually (will be discussed more later). It is also turned on by default.

If it doesn't appear, click the List Constants button on theedit toolbar.

### Data Tips

When you hover your cursor over a variable, it should display a lil thing that shows what the variable is equal to at that point in the code. It is on by default, and will almost always work.

### Margin Indicators

The margin indicators allow you to quickly set a breakpoint, a next statement, or a bookmark by clicking in the margin of the code window. We will cover this topic more later. 

## Default Toolbar

The default toolbar at the top of the VBA editor looks like this (highlighted in yellow):

/ZScreenshots/vbaToolbar.png

Here are definitions of the highlighted toolbar (left to right):

* View Excel - opens the corresponding excel document for the code window you're in (changes to Word, PPT, etc.)
* Insert UserForm - used to insert forms (will discuss more later)
* Save - saves both VBA code and open document
* Cut
* Copy
* Paste
* Find
* Undo
* Redo
* Play - runs the selected code / macro
* Pause - pauses the code that is running
* Stop - exits the running code completely
* Design Mode - turns on design mode for applicable objects
* Project Explorer - opens it (same with below buttons)
* Properties Window
* Object Browser
* Toolbox - opens it if you've built one
* Help - opens Microsoft help center online
* The bar that says "Ln 1, Col 1" shows you the location that you are at in the code

### Other Toolbars

It may also be useful to add the additional toolbars, notably the edit and debug ones.

The edit one contains many helpful tools for editing and typing your code.

The debug one has the `Step Into` tool, which is the primary one I use for debugging my code.