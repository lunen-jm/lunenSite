---
title: "Doks v0.4"
emoji: ":tada:"
description: "Version 0.4 is here! Multi level section menu (three levels deep), auto generated section menu, new docs based tree — with a single command, sub navigation main menu (one level deep), and more."
lead: "Version 0.4 is here! Multi level section menu (three levels deep), auto generated section menu, new docs based tree — with a single command, sub navigation main menu (one level deep), and more."
date: 2022-02-14T11:58:45+01:00
lastmod: 2022-02-14T11:58:45+01:00
draft: false
weight: 50
images: []
contributors: ["Henk Verlinde"]
---

## Multi level section menu

{{< img-simple src="multi-level-section-menu.png" alt="Multi level section menu" class="d-block mx-auto shadow my-5" >}}

Now you can have a multi level section menu (three levels deep). Available for both the collapsibile section menu and the default one.

{{< img-simple src="multi-level-breadcrumb.png" alt="Multi level breadcrumb" class="d-block mx-auto shadow my-5" >}}

Works with the breadcrumb option if set.

[Menus →]({{< relref "menus#add-to-docs-menu" >}})

## Auto generated section menu

```toml
[menu]
  [menu.section]
    auto = true
    collapsibleSidebar = true
```

You now have the option to let Doks auto generate the section menu from the directory folder (tree) structure. No manual configuration needed and respects set weight. Available for both the collapsibile section menu and the default one.

