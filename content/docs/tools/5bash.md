---
title: "Bash (Command Line)"
description: "Doks is a Hugo theme for building secure, fast, and SEO-ready documentation websites, which you can easily update and customize."
lead: "Doks is a Hugo theme for building secure, fast, and SEO-ready documentation websites, which you can easily update and customize."
date: 2023-1-09T08:48:57+00:00
lastmod: 2023-1-09T08:48:57+00:00
draft: false
images: []
menu:
  docs:
    parent: "tools"
weight: 050
toc: true
---

# Bash - Utilizing the Command Line 

Bash is the primary language used in the command line / terminal in VS Code. In the top right of VS code, you can choose the terminal. 

**Flags** can be added to a command to use it in different ways. For example, in `ls -l`, l (L) is the flag, and it causes the list to be printed as a long list instead.

One of the most helpful tags is the `--help` tag. This displays the help menu for the command.

* `pwd` : Print working directory 
* `ls` : List. When using by itself, it will print a list of whatever files are in the working directory. Folders are blue, media is purple, and all files include extensions.
    * `ls --all` : Lists all of the contents, not just the ones explained in the help menu
        * This also shows that there is a hidden `.` and `..` in each folder, which shows why the `cd` flags work. `.` brings you to the folder you're currently in
* `cd` : Change directory. Flags:
    * `cd <filename>` : Drills down one level to the folder you indicate 
    * `cd ..` : Goes back a folder level
    * `cd ../..` : Goes back two levels, adding another `/..` increases it to three, etc.
* `mkdir` : Make directory. Flags:
    * `mkdir <folder name>` : Makes a directory with the indicated title
    * `mkdir <folder in dir>/<new folder to be made in previous folder>` : Makes a directory, within a directory that is in your current directory. Don't forget the /
* `rmdir` : Remove directory, will fail if it is not empty by default
    * `rmdir -r <folder>` : Removes folder, even if not empty. BE VERY CAREFUL, CAN DESTROY COMPUTER
* `more <filename>` : Use to see what is in a file
* `echo` : Print something to terminal
    * `echo random words` : Prints the words following "echo"
    * `echo random words >> filename` : Prints the random words to a file instead of the terminal. Each time you do this, it adds the input as a new line in the document
* `touch` : Create something 
    * `touch <filename>` : Create a file (with filetype extension) (.gitignore works too) (and .font)
* `cp` : Copy something
    * `cp <file> <destination>` : Copy a file to a location
    * `cp --recursive <folder> <new folder name>` : Copys a folder to be within a new folder
* `rm` : Removed something 
    * `rm <filename>` : remove a file
* `mv` : Move or rename something 
    * `mv <filename> <new filename>` : Rename a file
    * `mv <filename> <directory path>` : Move to a different directory. `..` works
* `find` : Find things or view a file tree 
    * `find` : When used with no tags, in a folder, it will return the file tree view of that folder 
    * `find <folder>` : Returns file tree of indicated folder (folder paths work too)
    * `find -name <filename>` : Searches for indicated file, returns filepath (also works for folders)
* `clear` : Clears the terminal, use if it's a bit cluttered
* `exit` : Exit the terminal, closes it 

Here's a sample where we create a bunch of files in a folder, and then move them into another folder:

```{bash, eval=FALSE}
touch CodeAlly.svg
touch CodeRoad.svg
touch freeCodeCamp.svg
ls # this would list the whole folder. It would contain these graphics, and a few other files
mkdir graphics # makes "graphics" directory in current directory 
cp CodeAlly.svg graphics
cp CodeRoad.svg graphics
cp freeCodeCamp.svg graphics
cd graphics # move into graphics directory 
ls # list the files to make sure they are there 
cd ..
ls # see that the graphics are also here, so we need to remove them 
rm CodeAlly.svg 
rm CodeRoad.svg 
rm freeCodeCamp.svg

# We also could do it this way. Let's pretend that the svg's are in a folder called images in the current directory (I know they're in the graphics folder, lets pretend!), and we need to move it into an images folder in the assets folder, within the client folder instead.
# the current directory is "website"

mv images/CodeAlly.svg client/assets/images 
mv images/CodeRoad.svg client/assets/images 
mv images/freeCodeCamp.svg client/assets/images 
```

## Using Terminal Applications 

To use terminal applications, you will typical use the following syntax when you need to login:

`<app function> --username=<username>`