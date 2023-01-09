---
title: "Operators Overview"
description: "For these, I took out the images since I don't have that figured out. Raw files are still in og repo"
lead: "For these, I took out the images since I don't have that figured out. Raw files are still in og repo"
date: 2023-1-09T08:48:57+00:00
lastmod: 2023-1-09T08:48:57+00:00
draft: false
images: []
menu:
  docs:
    parent: "introduction"
weight: 040
toc: true
---

When making things in VBA, you will be using operators fairly often. These are symbols/words that represent something that will be done to a value. We will also go over custom data formats, which is very helpful for unique date values and other things you may encounter.

* Arithmetic Operators
* Comparison Operators
    * Like, Option Compare, and Pattern Matching
* Concatenation operators
* Logical Operators
* Operator Precendence

## Arithmetic Operators

Arithmetic operators are those used to perform mathematical calculations. Here is a list of the ones present in VBA:

* `*` - Used to multiply
* `^` - Raises a power to an exponent
* `/` - Used to divide two numbers (returns a floating-point value)
* `\` - Used to divide two numbers (returns an integer value)
* `Mod` - Used to divide two numbers and return only the remainder
* `+` - Adds (and concatenates, see later section)
* `-` - Subtracts

Here is a chunk of code with them in action (you can use the "immediate" window in the editor to test these out):

```vb
1 + 1 '2
4 - 3 '1
2^4 '16
20/6 '3.33
20\6 '3
20 Mod 6 '2
```

## Comparison Operators

Comparison operators are used for comparisons, and some variable manipulation. All of these are used for figuring out (or saying) that two things are equal. Here is a list of them:

* `=` - Used both for assigning variables, and saying something is equal to something else in a comparison
* `Is` - Used for comparing objects (covered in next doc), returns TRUE if they are the same
* `Like` - Used to compare two strings. See next section for more information

### Like, Option Compare, and Pattern Matching

For more detailed information on this, visit this [website](https://docs.microsoft.com/en-us/office/vba/language/reference/user-interface-help/like-operator). This section is a summary of this page, and can be skipped if you're not pattern-matching regularly.

The default string-comparison method for each module is Option Compare Binary, which results in string comparisons based on a sort order derived from the internal binary representations of the characters. Like this: 

`A < B < E < Z < a < b < e < z < À < Ê < Ø < à < ê < ø`

You can change it to Option Compare Text, which results in string comparisons based on a case-insensitive, textual sort order determined by your system's locale. When you sort the same characters using Option Compare Text, the following text sort order is produced:

`(A=a) < (À=à) < (B=b) < (E=e) < (Ê=ê) < (Z=z) < (Ø=ø)`

When trying to match the strings, you have the following symbols/operators to assist in it:

* `?` - Any single character
* `*` - Zero or more characters
* `#` - Any single digit (0-9)
* `[charlist]` - Any single character in charlist
* `[!charlist]` - Any single character not in charlist

A group of one or more characters ( charlist ) enclosed in brackets ([ ]) can be used to match any single character in string and can include almost any character code, including digits. Here are some more tips:

* An exclamation point (!) at the beginning of charlist means that a match is made if any character except the characters in charlist is found in string. When used outside brackets, the exclamation point matches itself.
* A hyphen (-) can appear either at the beginning (after an exclamation point if one is used) or at the end of charlist to match itself. In any other location, the hyphen is used to identify a range of characters.
* When a range of characters is specified, they must appear in ascending sort order (from lowest to highest). [A-Z] is a valid pattern, but [Z-A] is not.
* The character sequence [] is considered a zero-length string ("")

Here are some examples of `Like` being used to compare string patterns:

```vb
Dim MyCheck
MyCheck = "aBBBa" Like "a*a"    ' Returns True.
MyCheck = "F" Like "[A-Z]"    ' Returns True.
MyCheck = "F" Like "[!A-Z]"    ' Returns False.
MyCheck = "a2a" Like "a#a"    ' Returns True.
MyCheck = "aM5b" Like "a[L-P]#[!c-e]"    ' Returns True.
MyCheck = "BAT123khg" Like "B?T*"    ' Returns True.
MyCheck = "CAT123khg" Like "B?T*"    ' Returns False.
MyCheck = "ab" Like "a*b"    ' Returns True.
MyCheck = "a*b" Like "a [*]b"    ' Returns False.
MyCheck = "axxxxxb" Like "a [*]b"    ' Returns False.
MyCheck = "a [xyz" Like "a [[]*"    ' Returns True.
MyCheck = "a [xyz" Like "a [*"    ' Throws Error 93 (invalid pattern string).
```

## Concatenation Operators

Concatenation operators are those used to combine strings. This includes `&` and `+`. 

The `&` operator is used to force string concatenation of two expressions. If an expression is not a string, it will be coerced to one in the line of code. Null will be treated as a zero-length string ("") when concatenated with something else (same with an empty value).

The `+` does the same thing, but it can be used ambiguously (meaning it will add if possible). It's best to not use it, and stick with `&`, however, it does work, and additional concatenation versus addition rules can be found [here](https://docs.microsoft.com/en-us/office/vba/language/reference/user-interface-help/plus-operator).

## Logical Operators

Logical operators are used to perform logical operations. Here is a list of them, assuming all of them are used between two logical expressions:

* `And` - Both need to be TRUE to return TRUE, otherwise it will be false
* `Eqv` - Both need to be the same, TRUE/TRUE and FALSE/FALSE return TRUE, TRUE/FALSE is FALSE
* `Imp` - Performs a logical implication, ask Chad (or look it up)
* `Not` - Uses one core expression, instead of two, and returns the opposite of the expression
    * Core expression can contain a logical comparison, see examples
* `Or` - One of the two expressions needs to be TRUE for it to return TRUE, performs a logical disjunction (something or something else)
* `Xor` - One or the other, but only one of them

```vb
Dim A, B, C, D, MyCheck
A = 10: B = 8: C = 6: D = Null 

' And
MyCheck = (B*2 = A+C) And A > B  ' Returns TRUE
MyCheck = TRUE And FALSE ' Returns FALSE
MyCheck = (B = C) And (C = A) ' Returns FALSE

' Eqv
MyCheck = (B*2 = A+C) Eqv A > B  ' Returns TRUE
MyCheck = TRUE Eqv FALSE ' Returns FALSE
MyCheck = (B = C) Eqv (C = A) ' Returns TRUE

' Imp 
MyCheck = A > B Imp B > C    ' Returns TRUE
MyCheck = A > B Imp C > B    ' Returns FALSE
MyCheck = B > A Imp C > B    ' Returns TRUE
MyCheck = B > A Imp C > D    ' Returns TRUE
MyCheck = C > D Imp B > A    ' Returns Null

' Not
MyCheck = Not(TRUE) ' Returns FALSE
MyCheck = Not(A < B) ' Returns TRUE (since was FALSE)
MyCheck = Not((A > B) Eqv (C > B)) ' Returns TRUE since Eqv was FALSE

' Or
MyCheck = (A > B) Or (C > B) ' Returns TRUE
MyCheck = (A > B) Or (B > C) ' Returns TRUE

' Xor
MyCheck = (A > B) Xor (C > B) ' Returns TRUE
MyCheck = (A > B) Xor (B > C) ' Returns FALSE since both TRUE
```

## Operator Precedence

When several operations occur in an expression, each part is evaluated and resolved in a predetermined order called operator precedence.

When expressions contain operators from more than one category:

* arithmetic operators are evaluated first
* comparison operators are evaluated next
* logical operators are evaluated last

Comparison operators all have equal precedence; that is, they are evaluated in the left-to-right order in which they appear. However, Arithmetic and Logical operators have an order of precedence (OoP)(think PEMDAS).

* Arithmetic OoP
    1. `^`
    2. `-`
    3. `*, /`
    4. `\`
    5. `Mod`
    6. `+, -`
    7. `&`
* Logical OoP
    1. `Not`
    2. `And`
    3. `Or`
    4. `Xor`
    5. `Eqv`
    6. `Imp`

Like in PEMDAS, parenthesis (P) can be used to override the rest of EMDAS; i.e. things in parenthesis will be evaluated first. You can nest numerous sets of parenthesis, but try to be clear so others can read it!
