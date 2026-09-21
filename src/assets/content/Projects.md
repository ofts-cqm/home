---
route: /projects
label: Projects.md
order: 20
---

# What Experiences Do You Have?

I have a lot of experience in software development. Here is just a simple overview of what I have accomplished in last few years:

## General Projects

:::: grid columns=3
::: flip-card title="Minecraft Skin Animator" image="../pictures/mcgif.png" alt="Minecraft Skin Animator" languages="React, JavaScript, Java, Kotlin, Ktor, JavaFx, MySql"
I have a website for a Minecraft skin animation generator, hosted at [mcgif.cn](https://mcgif.cn) built using React+Vite as front-end, Ktor router + JavaFX rendering as backend, and a MySQL-based cache system.

You can enter your Minecraft ID and select various poses, then my website will generate a gif/png using your Minecraft skin for the selected pose. For further customization, you can also adjust backgrounds, ambiant lights, and speed. Right now, I have 200+ users, and I am glad to see that my projects have helped.
:::

::: flip-card title="Linear Algebra Calculator" image="../pictures/matcalc.png" alt="Linear Algebra Calculator" languages="Qt, cpp, QML, Json"
I have developed a linear algebra calculator in C++ using Qt. I made it so I can suffer less from Math 115 Linear Algebra for Engineers.

I integrated a formula lexer and evaluator, so you can enter formulas directly instead of calculating them elsewhere and entering the numbers. For example, if you want a rotation matrix, you can just enter cos(pi/2), -sin(pi/2), sin(pi/2), and cos(pi/2).

It also stores calculation history using JSON, so you can quickly go back to your previous calculation after restarting the app.

[Repo Here](https://github.com/ofts-cqm/matCalc)
:::

::: flip-card title="Android Todo App" image="../pictures/wattodo.png" alt="Android Todo App" languages="Java, Kotlin, Android Studio, Python, Flask, MySql, RestApi"
I have developed an Android Todo-List application in Java and Kotlin using Android Studio.

It implements a Three-Tier-Architecture, with a Python Flask backend and a MySQL database. It also uses a local caching system with JSON to ensure data availability and security.
:::

::: flip-card title="C Compiler" image="../pictures/compiler.png" alt="C Compiler" languages="C Sharp"
A C compiler (Compiler + Assembler) that supports about 40% of all C keywords and all C operators. Built using a custom lexer and token generator.

Can output tokenized grammar trees, intermediate languages, or assembly code. Can be DIYed to fit various assembly languages. Due to the complexity of linking, this compiler only generates assembly code; it cannot link against system libraries.

[Repo here](github.com/ofts-cqm/CLCCompiler)
:::
::::


## Minecraft-Derived Work

Yes I am a Minecraft fan, so I actually tried to re-create Minecraft in very different ways.

:::: grid columns=3
::: flip-card title="Unity Based Minecraft" image="../pictures/minecraft_unity.png" alt="Unity Based Minecraft terrain" languages="C Sharp, Unity"
A Minecraft built using unity, supporting most features including perlin-noise-based terrain generation, async chunk loading, transparent block rendering, slabs (and other half block) rendering, and inventory UI.

Utilized customized shaders to render waters and transparent textures. Explored shader designing and modern game architectures like ECS.

Note that the items in the hotbar are sprites baked in runtime, maximizing rendering efficiency while keeping the 3D model of blocks.

You can find the repo [here](https://github.com/ofts-cqm/UnityCraft). Note that this repo does not include textures because it uses some of Minecraft's textures. 
:::

::: flip-card title="Minecraft From Scratch" image="../pictures/minecraft-old.png" alt="java rendered Minecraft from scratch" languages="Java"
A Minecraft built using my own Java 3D CPU Render from scratch. No libraries or engines used, everything built using pure Java's built-in libraries. Supports ~40 blocks. Supports async chunk loading and saving. My understanding of the rendering pipeline, shaders, render, and computer graphics together helped me to build this project. 

This is a very old project, I kinda lost the repo. 
:::
::::

## AI Integration

::: accordion title="LEARN Integration" open=false
I connected LEARN, which is UWaterloo's course platform, to codex. Now codex helps me to manage my calendar. It automatically marks all deadlines, it sends me notifications about important announcements. It manages a knowledge base, and whenever I have questions regarding an assignment's requirement, I can just ask codex directly instead of finding through scattered course webpages. Honestly, these professors really needs to better organize their course pages. 
:::

::: accordion title="Replay MCP" open=false
Replay MCP is more than a Minecraft Mod. 

Replay MCP connects a Minecraft client, Replay Mod, a local MCP server, and a Codex plugin. It lets an AI assistant work with a real Minecraft client through safe, normal game inputs; record or import performances; edit Replay Mod timelines; render footage; and organize a production project.

The goal is to open a door for AI to create Minecraft Videos. Currently, it is still significantly slower than human editing, but it opens up the possibility for AI Minecraft film making. It also frees YouTubers from frequent video editing and give them more time to focus on planning and script writing while the AI processes all edits in the background.

It currently supports:

- AI "playwright" tool to observe and interact with Minecraft
- Replay Mod recording and timeline edit.
- Handoff to post-production video editors for caption, music, and clipping, etc.

With Replay MCP, codex can now film Minecrafat videos! I am happy to annouce that there is one more thing AI can do. 

[Repo Here](https://github.com/ofts-cqm/Replay-MCP)

:::

## Video Game Modding

If you go to the MoreAboutMe page, you can learn that making mod is actually the core reason I started learning coding. Here is a list of mods I have made. They might seem to be very simple now a days, but remember most mods are made in **2024**, and you can see I actually spent a lot of time trying to learn and make stuff. In 2026 AI can just make a mod in a few minutes, but I would still put them here, to demonstrate the time I spend on coding, and my learning along the way. 

### Stardew Valley Mods:

A lot of these mods are game-design problems occured in the vanilla game. For example, the Agenda, or the Searchable Shop. I made these to improve gameplay experience. 

:::: grid columns=3

::: flip-card title="Farming/Fishing Only Challenge" image="../pictures/fish-only-challenge.png" alt="Video Game Modding" languages="C Sharp" 
My friend asked me to make these two mods. She is a YouTuber and wants some *Unique* challenges, so I made this. All quests are replaced with farming/fishing related activities, and everything else than farming/fishing is disabled. Hopefully these two mods gave her more subscribers. 
:::

::: flip-card title="Joja Express" image="../pictures/joja-express.png" alt="Video Game Modding" languages="C Sharp" 
This is an "Amazon" mod I made. I noticed that the game lacks online shopping, causing a lot of inconveniency. Therefore, I made this. Now the user can simply order stuff online and get them delivered. Many people say this is a great experience (but other people say this is cheating)
:::

::: flip-card title="Agenda" image="../pictures/agenda.png" alt="Video Game Modding" languages="C Sharp" 

This one is definately not cheating. This is a real game design problem. 

You see, Stardew Valley is infamous for its time constrints. You see, the game constantly requires the player to do specific things in specific time, which requires a lot of planning. For example, some crops only grow in specific season, and some shops only open on specific day of week. 

In other games if you missed a task you can simply "do it tomorrow," but this is not true for Stardew Valley. If you missed a task, you may need to wait for another week, or even another year! *AND THE GAME DOESN'T HAVE A CALENDAR!!!!* 

Techinically the game does have a calendar but it is readonly and only display fixedd stuff. This is very frastrting since we cannot record our own tasks. 

Therefore I made this agenda mod, which allows user to mark specific events on Calendar, and there will be an obvious reminder when the time approache. No one should ever miss a single task. 
:::

::: flip-card title="Searchable Shop" image="../pictures/searchable-shop.png" alt="Video Game Modding" languages="C Sharp" 
This is a derived shop from Joja Express. Because Joja Express is a big shop, sometimes the player is hard to find the item needed; therefore I added this search button. However, some player commented that they want this search button to be a stand-alone mod, so I made it!
:::

::: flip-card title="Tool Assembly" image="../pictures/tool-assembly.png" alt="Video Game Modding" languages="C Sharp" 
Starddew Valley has a problem: it has a lot of tools, with a very tight inventory space. Sometimes my inventory get filled with a lot of tools. Therefore, I made this mod. It adds a omnicient tool that can transform to all tools, and the player can simply switch which tool they want, saving a lot of inventory space. 
:::

::: flip-card title="Translation Replacer" image="../pictures/translation-replacer.png" alt="Video Game Modding" languages="C Sharp" 
This was a game bug around version 1.6. In this version a lot of Simplified Chinese translations are incorrect. Therefore I made this mod to replace translations. Now the bug is fixed but this mod remains for those who wants to change translations. 
:::

::::

### Minecraft Mods:

I also made a few Minecraft mods for my personal use. Minecraft is famous for its mod community, so whenever I have an Idea there is always a mod already existed, which is kinda frastrating. Therefore, most minecraft mods focus on my own unique needs. 

::: accordion title="Artist"
I love to make pixel map arts in Minecraft. A map art is basically you fill a whole area with specific pixels, so it looks like a painting when you open the map. 

However, I often don't have enough time for that. This is a "bot" that automatically build a given painting. It can build a standard 128x128 map in 30 minutes. 

This is a little bit slower than human building (usually 20 minutes) but this is fully automated! It means I can study, coding, cooking, or doing other stuff while I have this bot automatically build stuff for me while I am AFK. 
:::

::: accordion title="Hohxil Auto Login"
A "playwright" tool I made for a SMP server I play, the ckocc server, or "HohXil". It contains fully automated login, world selection in hub, daily checkin, and reward claiming.

Of course it also contains other stuff like an automated advertisement of my shop when new players join...
:::

::: accordion title="Replay MCP"
This one is technically more than a "Mod". Replay is a minecraft mod that can conveniently record and edit Minecraft video. It is commonly used by many YouTubers or servers to make Minecraft related films. However, I noticed that it currently lacks an AI connection... Which is exactly what I am building! This is a MCP server that connects Replay to Codex, so codex can conduct the player to perform various tasks and make Minecraft videos, while the user is just AFK! I will talk more about it in the AI Integration section (at the bottom of this page)
:::

## This Website

BTW This website uses Vue if you are interested. You can find the source code [Here](https://github.com/ofts-cqm/home).
