---
title: "Introduction to Macros"
description: "For these, I took out the images since I don't have that figured out. Raw files are still in og repo"
lead: "For these, I took out the images since I don't have that figured out. Raw files are still in og repo"
date: 2023-1-09T08:48:57+00:00
lastmod: 2023-1-09T08:48:57+00:00
draft: false
images: []
menu:
  docs:
    parent: "introduction"
weight: 010
toc: true
---

This is the first document in a set of documents meant to provide a quick overview of Visual Basic for Applications, a programming language that is extremely useful for Microsoft Office Applications.

## The Developer Tab in Excel

The developer tab in excel is a an optional tab for the upper ribbon that allows for you to add functionality to your excel document, beyond the base functions and formulas.

### Adding the Developer Tab

Base excel does not come with the developer tab enabled, so you will need to manually add it onto your copy of excel.

To do this, follow these steps:

* Click "File" in the top left
* Now, click "Options" at the bottom of the dropdown menu, which is below "Account". This will open the menu pictured below
* From the Options menu, navigate to the "Customize Ribbon" option
* In this menu, you can see a section on the right that has the "Main Tabs". In this area, find the "Developer" option, and make sure it is checked
* Once you click okay, the developer tab should show up between the "View" and "Help" tabs on the ribbon

Here is a screenshot of the Excel Options menu:

/images/customizeRibbon.jpg

### Developer Tab "Code" Buttons

/images/codeTabExcel.png

In the Code box (pictured above), there are three buttons that are useful to us: **Visual Basic**, **Macros**, and **Record Macros**

#### **Visual Basic**

This button opens up the Visual Basic code editor. You can use this to fix up the code if you need to, or look at the code of a recorded macro (more on that in a second). This will also automatically open when you try to debug a macro, or if you click “edit macro” in the macros dialogue box.

#### **Macros**

By clicking this, you will open the macros dialogue box, which shows the macros in the current workbook in its default view. From here, you can run them, edit them, step into them (which means run step-by-step), and change their description and hotkey (which is in the options button). You can also change which macros it’s showing in the “Macros in:” dropdown.

#### **Record Macro**

This is probably the most useful button when you’re first starting to play around with macros (in fact, we'll use it in the next section!). When you click this button, it first opens a dialogue box which allows you to name the macro, assign a shortcut key, choose where to store it (research what a personal WB is!), and add a description. Once you’ve entered everything you would like to, you can click Ok. Be careful though, because once you do this, every single action you do will be recorded.

## Recording Your First Macro

Now, we're going to use the "Record Macro" button to record our first macro. Here are the steps you should take:

1. Click the “Record Macro” button. Name it something like “TransposeRight”, and add a shortcut and description if you want. Place this one into the current workbook. Then, click ok
2. Now, click into any cell on the sheet.
3. Type any string (word, phrase, etc.) into the cell you clicked into
4. Copy the cell by right clicking or by using `ctrl+c`
5. Paste it one cell to the right and exit copy/paste mode. Delete the contents of the original cell
6. Click the “Record Macro” button again, which has now changed to “Stop Recording”
7. Now, click the “Macros Button”. Select the one that you just made, and then click “edit” on the right of the dialogue box. This will open up your macro in the VBA window (more on that later). This should open a dialogue box that has code similar to the one pictured below. 

/images/testMacro.jpg

While this may look overwhelming at first, thankfully VBA is a fairly clear and concise language that you can pick up quickly.

* The first line “Sub Macro1()” declares the macro
* The following three green lines that start with an apostraphe are comments in the code. These do not affect the macro
* `Range("E17").Select`
    * The first line of code says that for the cell E17 (the Range), you would like to select it
* `ActiveCell.FormulaR1C1 = "hi"`
    * The following line says “For the currently selected cell, enter the formula “hi”
* `Range("E17").Select`, `Selection.Copy`
    * Then, you select the cell again, and copy it
* `Range("F17").Select`, `ActiveSheet.Paste`
    * Now, you select the cell to the right, and paste what you copied
* `Range("E17").Select`, `Application.CutCopyMode = False`
    * This selects cell E17, and exits out of the Cut/Copy mode
* `Selection.ClearContents`
    * This deletes the contents of cell E17, since that is the selected cell

However, this is not a very useful macro, and it can be written more concisely. Due to how it was made, it will always be restricted to cell E17/F17 of the currently active worksheet, and will just type in "hi" and move it (why would you want that??). Here are some steps to edit it to make it more useful:

* Since we want it to actually just cut and paste the contents of the current cell one cell to the right, we can get rid of the first three lines of code. This is because they select a specific cell, and types “hi” into the selected cell, both of which are not actually needed
    * I had you do this so you can see that the "record macro" button records EVERYTHING
* We will change `Selection.Copy` to `Selection.Cut` 
    * This is because we "messed up" and want to change it to cut instead
* For the next line, we want to completely change it. Right now, it cause us to always select cell F17. Instead, we are going to type: `ActiveCell.Offset(0,1).Select`
    * This causes us to select the cell that is one column to the right of the active cell. The (0,1) represents we are staying in the same row (0), and shifting one column over (1). Row is always first, column is always second. 
* Then, we will get rid of the following Select command, and delete the line that says `Selection.ClearContents` (another remnant of us "messing up")
* Now, your code should look like the photo below:

/images/testMacroFixed.jpg

Try it out! The macro should work wherever you select now, and transpose your selection on e cell to the right. If you assigned a hotkey to it during creation, try that, as it’s faster than opening the macro dialogue box and telling it to run.

When you go to save the file, you will need to save it as a `.xlsm` file, which is a macro-enabled excel workbook. By default, excel files are not macro compatible due to safety concerns. The different filetype allows you to quickly see that a file might have unexpected macros, and can prevent harmful phishing attempts.

### What is the personal workbook?
This section will go over the personal workbook and what it is. This includes Normal.Template in word.

The personal workbook is a "global" resource that can contain macros for all of your excel documents to use (normal.Template in Word). It is not a default thing for excel, so you will have to create one. Here are the steps:

1. Click the Developer tab in the Ribbon, and then click the Record Macro button on the Ribbon (or just click the Record Macro button on the status bar) to display the Record Macro dialog box.
2. Accept the default name for the macro because you'll be deleting it momentarily.
3. In the Store Macro In drop-down list, choose Personal Macro Workbook.
4. Click the OK button to close the Record Macro dialog box and start recording the macro.
5. Click the Stop Recording button on the Ribbon or status bar to stop recording the macro.
6. Click the Unhide button on the View tab to display the Unhide dialog box. Select PERSONAL.XLSB and click the OK button.
7. Click the Developer tab in the Ribbon, and then click the VBA button to open up the editor.
8. Now, you should see two projects open in the Project Explorer: /ZScreenshots/vbaPEPersonal.png
9. Lastly, you will double-click the "ThisWorkbook" object in the personal workbook, and delete any code in it (if applicable)

You've now created a personal workbook, which can be used to store macros for all of your excel workbooks to use.

It should almost always open in the background when you use excel, but if you aren't able to call a macro anymore, you can open it by going to this location:

`C:\Users\[your name probably]\AppData\Roaming\Microsoft\Excel\XLSTART`