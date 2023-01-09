---
title: "Datatypes and Variables"
description: "For these, I took out the images since I don't have that figured out. Raw files are still in og repo"
lead: "For these, I took out the images since I don't have that figured out. Raw files are still in og repo"
date: 2023-1-09T08:48:57+00:00
lastmod: 2023-1-09T08:48:57+00:00
draft: false
images: []
menu:
  docs:
    parent: "introduction"
weight: 030
toc: true
---

This document will go over some of the basics of variables in VBA and the different data types you may use.

## Declaring Variables

Variables are essentially just slots to store information, with names to reference and modify them under. Variables must be unique in the current scope (code/project), must begin with an alphabetic character, can't be longer then 255 characters, and cannot contain a period or type-declarion character (see data types section for more information).

To declare (create) a variable, you will need to use the `Dim` statment, a name, and an `As [Datatype]`. Typically, you want to initialize all of the variables at the top of the code for readability. One thing to note is that if you don't assign a data type, then it will default to `Variant` (which will be covered soon)

```vb
Dim stringName As String
Dim integer1 As Integer, integer2 As Integer, integer3 As Integer
Dim string1, string2, string3 as String 'only declares string3 as a string, others are variants since they were not assigned a data type
```

### Variable Scopes

The `Dim` that you just saw is called a declaration statment, and can be placed within a procedure to create a procedure-level variable. This means it will be available in whichever Function, Property, or Sub procedure it is located within (more on these in the "Macro Basics and Creating Your Own" section).

It can also be placed within a module to create a module-level variable. This means that it will be usable by any Functions, Properties, or Sub Procedures located within that module.

There are more scopes and statements outside of `Dim`, which is the most popular one due to its versatility:

* The `Public` statement declares any variable as a public, module-level variable. The public aspect of this means that any projects that references the current project/module can use it.
* The `Private` statement also declares the variable as a module-level variable, however only procedures in the same module can use it.
* The `Static` statement is used in a procedure, and causes the delcared variable to retain its value between calls to that procedure
* The `Const` statement declares constants, which can also be Public or Private. These cannot be edited

Here are some examples of what they may look like in a chunk of code:

```vb
Dim string1 As String
Public integer1 As Integer
Private bool1 As Boolean
Static long1 As Long
Const Private date1 As Date
```

## Data Types

When working in VBA, a data type is a characteristic of a variable that determines what kind of data it can hold. Here are a few different data types you will need to be aware of, with their storage size:

* `Boolean`
    * Boolean values are limited to just TRUE or FALSE, and are used primarily in things using logical operators
    * 2 bytes; TRUE or FALSE
* `Currency`
    * A scaled integer that can be used for currency-oriented code
    * 8 bytes; +/- 922,337,203,685,477.5808
* `Date`
    * Used to store dates
    * 8 bytes; January 1, 100 through December 31, 9999
* `Decimal`
    * Used for integers up to 28 decimal points
    * 14 bytes
* `Double`
    * Used for double-precision floating-point numbers
    * 8 bytes; works really well as an alternative to decimal
* `Integer`
    * 2 bytes; limited to whole numbers between +/- 32,767
* `Long`
    * 4 bytes; long integer; limited to whole numbers between +/- 2,147,483,648,647
* `Object`
    * 4 bytes; limited to objects
* `String`
    * Limited to valid characters, used for words, etc.
    * 10 bytes + string length
* `Variant`
    * Used for variable data, that may have multiple types. Different sizes for different typs of data contained
    * 16 bytes (with numbers); 22 bytes + string length (with characters)

[Here is a link to a larger table of data types](https://docs.microsoft.com/en-us/office/vba/language/reference/user-interface-help/data-type-summary)

### Shorthand Declarations

When declaring variables, you can also use "shorthand" methods of assigning data types. This means that you can use singular characters rather than an `As [datatype]`. Here is a list of them:

* `Integer` - %
* `Long` - &
* `Currency` - @
* `Double` - #
* `Single` - !
* `String` - $

Here is an example of them all being used:

```vb
Dim int1%, long1&, curr1@, double1#, single1!, string1$
```

### Converting Data Types

Sometimes, you may need to convert data (or an expression) to a different data type. A very common example of this is changing numbers stored as text in a sheet to a numeric data type.

The functions for this are just `C` followed by a shortened version of the data type. This includes `CBool`, `CByte`, `CCur`, `CDate`, `CDbl`, `CDec`, `CInt`, `CLng`, `CLngLng`, `CLngPtr`, `CSng`, `CStr`, and `CVar`.

Here are some examples of them being used (taken from Microsoft Type Conversion Functions Page):

```vb
' CBool
Dim A, B, Check 
A = 5: B = 5 ' Initialize variables. 
Check = CBool(A = B) ' Check contains True. 
' CBool 2
A = 0 ' Define variable. 
Check = CBool(A) ' Check contains False.

' CDate
Dim MyDate, MyShortDate, MyTime, MyShortTime 
MyDate = "February 12, 1969" ' Define date. 
MyShortDate = CDate(MyDate) ' Convert to Date data type. 
 ' CDate 2
MyTime = "4:35:47 PM" ' Define time. 
MyShortTime = CDate(MyTime) ' Convert to Date data type.

' CLong
Dim MyVal1, MyVal2, MyLong1, MyLong2 
MyVal1 = 25427.45: MyVal2 = 25427.55 ' MyVal1, MyVal2 are Doubles. 
MyLong1 = CLng(MyVal1) ' MyLong1 contains 25427. 
MyLong2 = CLng(MyVal2) ' MyLong2 contains 25428.

' CStr
Dim MyDouble, MyString 
MyDouble = 437.324 ' MyDouble is a Double. 
MyString = CStr(MyDouble) ' MyString contains "437.324".

' CVar
Dim MyInt, MyVar 
MyInt = 4534 ' MyInt is an Integer. 
MyVar = CVar(MyInt & 000) ' MyVar contains the string 
 ' 4534000.
```

### Verifying Data Types

Sometimes, you may want to check to see whther or not your data is of a certain type. For this, you can use the `Is...` functions listed below. Some of these can also be used for Null/Missing/Empty values, and are especially useful for debugging.

All of the following functions return boolean values indicating whether the input is a ____.

* `IsArray`
    * Useful for variants containing arrays (we will go over arrays later)
* `IsDate`
    * Returns TRUE if the expression is a date or a recognizable, valid date or time
* `IsEmpty`
    * Mainly used to check to see if a variable is initialized or not (if a value is assigned to it)
* `IsError`
    * Mainly used to see if numeric expressions return an error. Can also be nested with others for debugging in a function
* `IsMissing`
    * Used to determine if an optional argument was passed to a function
* `IsNull`
    * Determines if an expression doesn't contain any valid data (empty variables do not count as NULL)
* `IsNumeric`
    * Can the input be evaluated like a number?
* `IsObject`
    * Determines if an identifier represents an object variable

You can also use the following two functions for finding out more information about variables in general:

* `TypeName`
    * Provides a string indicating the type of data in a variable
* `VarType`
    * Provides an integer that indicates the subtype of a variable. [Table can be found here](https://docs.microsoft.com/en-us/office/vba/language/reference/user-interface-help/vartype-function)

## Assigning Variables

As you probably noticed in the "converting datatypes" section, assigning a value to a variable is fairly straightforward, and is done by using an `=`. When creating variables, you have two primary ways that you can declare and assign a variable:

* You can declare the variable with a set data type, and then assign a value to it
* You can implicitly assign a value to a variable, which means VBA will assign it to be a variant

Here are examples of both:

```vb
Dim myVar As Var = 1
myVar ' Would return 1 in VBA terminal
myNum = 12 ' Implicit variable
myNum ' Would return 12 in terminal
TypeName(myNum) ' Tells you what the data type is
```

Keep in mind, the ability to implicitly declare a variable is usually off, and it can make your code harder to read. It is best practice to use the first option. More information can be found [here](https://docs.microsoft.com/en-us/office/vba/language/concepts/getting-started/declaring-variables) in the "Option Explicit statement" section.
