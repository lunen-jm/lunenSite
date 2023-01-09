---
title: "Objects and Advanced Variables"
description: "For these, I took out the images since I don't have that figured out. Raw files are still in og repo"
lead: "For these, I took out the images since I don't have that figured out. Raw files are still in og repo"
date: 2023-1-09T08:48:57+00:00
lastmod: 2023-1-09T08:48:57+00:00
draft: false
images: []
menu:
  docs:
    parent: "introduction"
weight: 050
toc: true
---

Under construction!!

https://docs.microsoft.com/en-us/office/vba/language/reference/objects-visual-basic-for-applications

## VBA 101 - Objects, Methods, and Properties

Most of this information can be found here (and is mostly copied over), in the VBA Programming 101 section: [VBA Programming 101](https://docs.microsoft.com/en-us/office/vba/library-reference/concepts/getting-started-with-vba-in-office)

A quick way to think of objects, methods, and properties is to use the metaphor from the link:

If you think of the object as a noun, the properties are the adjectives that describe the noun and the methods are the verbs that animate the noun. Changing a property changes some quality of appearance or behavior of the object. Calling one of the object methods causes the object to perform some action. All of the following will be gone over 

### Objects

In programming, there is often an object model of an application. What this means is that there are different objects within objects (i.e. a singular page in a website is an object within a parent object).

Excel, for example, has a top-level applicaiton object (excel itself), a workbook object, a sheet object within the workbook, and could have a table object in a sheet.

The definition of an object is called a class, so these might be used interchangeably in forums and articles and such. Technically, a class is the description or template used to create an object.

We will go over objects in more detail in the Objects document.

### Methods

In Word, for example, you can change the properties and invoke the methods of the current Word document by using the ActiveDocument property of the Application object. This ActiveDocument property returns a reference to the Document object that is currently active in the Word application. "Returns a reference to" means "gives you access to."

The following code does exactly what it says; that is, it saves the active document in the application.

```vb
    Application.ActiveDocument.Save
```

Read the code from left to right, "In this Application, with the Document referenced by ActiveDocument, invoke the Save method." Be aware that Save is the simplest form of method; it does not require any detailed instructions from you. You instruct a Document object to Save and it does not require any more input from you.

If a method requires more information, those details are called parameters. The following code runs the SaveAs method, which requires a new name for the file.

```vb
    Application.ActiveDocument.SaveAs ("New Document Name.docx")
```

Values listed in parentheses after a method name are the parameters. Here, the new name for the file is a parameter for the SaveAs method.

### Properties

ou use the same syntax to set a property that you use to read a property. The following code executes a method to select cell A1 in Excel and then to set a property to put something in that cell.

```vb
    Application.ActiveSheet.Range("A1").Select
    Application.Selection.Value = "Hello World"
```

In the first line of the code snippet, there is the Application object, Excel this time, and then the ActiveSheet, which provides access to the active worksheet. After that is a term not as familiar, Range, which means "define a range of cells in this way." The code instructs Range to create itself with just A1 as its defined set of cells. 

In other words, the first line of code defines an object, the Range, and runs a method against it to select it. The result is automatically stored in another property of the Application called Selection.

The second line of code sets the Value property of Selection to the text "Hello World", and that value appears in cell A1.

The simplest VBA code that you write might simply gain access to objects in the Office application that you are working with and set properties. For example, you could get access to the rows in a table in Word and change their formatting in your VBA script.

# Objects and Advanced Variables

Earlier, we covered basic variables that use common data types such as numbers, characters, and boolean values. However, there are some more "advanced" variables in VBA which use objects as their data.

Objects are a special type of data that represent elements of an application. For example, a worksheet in an excel workbook would be an object. While the name of the worksheet is represented by a character value, the value itself represents the object.

### Using `Is` with Objects

```vb
Dim MyObject, YourObject, ThisObject, OtherObject, ThatObject, MyCheck
Set YourObject = MyObject    ' Assign object references.
Set ThisObject = MyObject
Set ThatObject = OtherObject
MyCheck = YourObject Is ThisObject    ' Returns True.
MyCheck = ThatObject Is ThisObject    ' Returns False.
' Assume MyObject <> OtherObject
MyCheck = MyObject Is ThatObject    ' Returns False.
```