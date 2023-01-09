---
title: "Git and RStudio"
description: "Doks is a Hugo theme for building secure, fast, and SEO-ready documentation websites, which you can easily update and customize."
lead: "Doks is a Hugo theme for building secure, fast, and SEO-ready documentation websites, which you can easily update and customize."
date: 2023-1-09T08:48:57+00:00
lastmod: 2023-1-09T08:48:57+00:00
draft: false
images: []
menu:
  docs:
    parent: "tools"
weight: 020
toc: true
---

This guide will go over connecting Git / GitHub to RStudio, and what you can do with it

Connecting GitHub to RStudio

- Git/SVN options in Global Options
- Make sure Git executable is right
- Create an SSH key
- Add key to GitHub account
- I also had to create a personal key, and fix my GitBash so it connected via that instead of a password

Linking RStudio to a Repository made in GitHub

* Create new project
* Select "Create Project from Version Control"
* Type in the URL of the repository
* Type in the location you would like the project to be placed into. I place mine into the Git_Testing_SubDirectory

Creating a new pre-linked repository

* When creating a project, check the "create repository in GitHub" option

Linking an already created project to GitHub

* Use GitBash
	a. $ pwd
		- This shows you the current directory
	b. $ cd ~/Path
		- This sets the new current directory. The ~ means add it to the current one
		- $ cd ~/Documents/Git_Testing_SubDirectory/Temp_Add_Version_Control/
	c. $ git init
		- Initializes the repository
	d. $ git add .
		- Adds all files to the repository
	e. $ git commit -m "Initial Commit"
		- Creates initial commit
- Use GitHub
	a. Create a new repository with the same name, do not intialize with a README or anything like else
	b. In "Code", there is a "...or push an existing repository from the command line" option
		- Copy this and use these commands

## Importing Cloned Repository 

* Fork it
* Click "Code" dropdown, and copy the `https` url 
* Open Git Bash 
* Go to the directory where you want to clone it to by using the cd command:
	* `$ cd Documents/GitSD.HelpGuides/`
* Use `git clone (url)`. Use the Insert button on the keyboard to paste into Git Bash
	* `git clone https://github.com/lunen-jm/web-api-auth-examples-spotify.git`
* Now it is on your computer. To use it in VS Code, just open the folder!