---
route: /projects
label: Projects.md
order: 20
---

# What Have You Built?

I have experience in software development. Here is an overview of what I have accomplished over the last few years. This page covers projects I have made from high school to the present, from 2023 to 2026. Some are learning projects I made in Grade 10.

## General Projects

:::: grid columns=3
::: flip-card title="Minecraft Skin Animator" image="../pictures/mcgif.png" alt="Minecraft Skin Animator" languages="React, JavaScript, Java, Kotlin, Ktor, JavaFX, MySQL"
I built a Minecraft skin animation generator at [mcgif.cn](https://mcgif.cn), using React and Vite for the frontend, Ktor and JavaFX rendering for the backend, and a MySQL-based cache.

You can enter your Minecraft ID and select a pose, and the site will generate a GIF or PNG using your skin. You can also adjust the background, ambient lighting, and animation speed. The site has more than 200 users, and I am glad to see that it has helped them.
:::

::: flip-card title="Linear Algebra Calculator" image="../pictures/matcalc.png" alt="Linear Algebra Calculator" languages="Qt, C++, QML, JSON"
I developed a linear algebra calculator in C++ using Qt. I made it to help with Math 115: Linear Algebra for Engineers.

I integrated a formula lexer and evaluator, so you can enter formulas directly instead of calculating them elsewhere and entering the numbers. For example, if you want a rotation matrix, you can just enter cos(pi/2), -sin(pi/2), sin(pi/2), and cos(pi/2).

It also stores calculation history in JSON, so you can return to previous calculations after restarting the app.

[Repo Here](https://github.com/ofts-cqm/matCalc)
:::

::: flip-card title="Android Todo App" image="../pictures/wattodo.png" alt="Android Todo App" languages="Java, Kotlin, Android Studio, Python, Flask, MySQL, REST API"
I developed an Android to-do list app in Java and Kotlin using Android Studio.

It has a three-tier architecture, with a Python Flask backend and a MySQL database. It also uses a local JSON cache to keep data available.
:::

::: flip-card title="C Compiler" image="../pictures/compiler.png" alt="C Compiler" languages="C#"
A C compiler project that supports about 40% of C keywords and all C operators. It uses a custom lexer and token generator.

It can output parse trees, intermediate representations, or assembly code and can be adapted to various assembly languages. Due to the complexity of linking, it generates assembly code but cannot link against system libraries.

[Repo here](https://github.com/ofts-cqm/CLCCompiler)
:::

::: flip-card title="CKOCC Metro Collaboration Portal" image="../pictures/ckocc.png" alt="CKOCC metro portal" languages="TypeScript, Next.js, PostgreSQL, AWS, Vercel, Cloudflare"
This project is a bit special. I play on a Minecraft SMP server called CKOCC. We have a player-built metro system maintained by the "Ministry of Railways." At first, we managed line updates and maintenance through group chats, but that became increasingly difficult as more people joined us. I created this website to manage line updates and maintenance. It supports update requests, comments, and automatic email notifications.

The site has guest, collaborator, and administrator roles. Guests can submit requests, collaborators can make updates, and administrators approve requests and updates. The site is invitation-based, so account registration is limited. It is invitation based so sorry you cannot register an account but you can still comment as a guest. 

[Repo here](https://github.com/ofts-cqm/ckocc-metro-website)
:::
::::


## Minecraft-Derived Work

Yes, I am a Minecraft fan, so I have tried to recreate it in different ways.

:::: grid columns=3
::: flip-card title="Unity-Based Minecraft" image="../pictures/minecraft_unity.png" alt="Unity-based Minecraft terrain" languages="C#, Unity"
A Minecraft-inspired game built with Unity, featuring Perlin noise terrain generation, asynchronous chunk loading, transparent blocks, slabs and other half blocks, and an inventory UI.

I used custom shaders to render water and transparent textures and explored shader design and modern game architectures such as ECS.

Items in the hotbar are sprites generated at runtime, improving rendering efficiency while retaining the blocks' 3D models.

You can find the repo [here](https://github.com/ofts-cqm/UnityCraft). 
:::

::: flip-card title="Minecraft From Scratch" image="../pictures/minecraft-old.png" alt="Java-rendered Minecraft game" languages="Java"
A Minecraft-inspired game built from scratch with my own Java 3D CPU renderer. I used only Java's built-in libraries, with no external libraries or game engines. It supports about 40 blocks, asynchronous chunk loading, and saving. My understanding of the rendering pipeline and computer graphics helped me build this project.

This is an old project, and I no longer have the repository.
:::
::::

## AI Integration

::: accordion title="LEARN Integration" open=false
I connected LEARN, the University of Waterloo's course platform, to Codex. Now Codex helps me manage my calendar: it marks deadlines and notifies me about important announcements. It also manages a knowledge base, so I can ask about assignment requirements instead of searching through scattered course pages.
:::

::: accordion title="Replay MCP" open=false
Replay MCP is more than a Minecraft mod.

Replay MCP connects a Minecraft client, Replay Mod, a local MCP server, and a Codex plugin. It lets an AI assistant work with a real Minecraft client through safe, normal game inputs; record or import performances; edit Replay Mod timelines; render footage; and organize a production project.

The goal is to enable AI to create Minecraft videos. Currently, it is still significantly slower than human editing, but it opens up possibilities for AI-assisted Minecraft filmmaking. It could also give YouTubers more time to focus on planning and scriptwriting while AI handles some editing tasks.

It currently supports:

- An AI "Playwright" tool to observe and interact with Minecraft
- Replay Mod recording and timeline editing
- Handoff to post-production video editors for captions, music, and clipping

With Replay MCP, Codex can now help film Minecraft videos! I am happy to announce that there is one more thing AI can do.

[Repo Here](https://github.com/ofts-cqm/Replay-MCP)

:::

## Video Game Modding

As I explain on the MoreAboutMe page, making mods is the main reason I started learning to code. Here are some of the mods I have made. They might seem simple now, but I made most of them in **2024**, when I was spending a lot of time learning and experimenting.

### Stardew Valley Mods:

Many of these mods address game design problems I encountered in the base game, such as the need for an agenda or a searchable shop. I made them to improve the gameplay experience.

I made most of these mods in 2024, when I had just started using GitHub, so some have no repository or have a messy one. You can find them on [my Nexus Mods profile](https://www.nexusmods.com/profile/OFTSCQM).

:::: grid columns=3

::: flip-card title="Farming/Fishing Only Challenge" image="../pictures/fish-only-challenge.png" alt="Farming and fishing challenge mod" languages="C#"
My friend, a YouTuber, asked me to make these two mods for some *unique* challenges. They replace all quests with farming- or fishing-related activities and disable activities outside those challenges. I hope the mods helped her channel grow.
:::

::: flip-card title="Joja Express" image="../pictures/joja-express.png" alt="Joja Express shop mod" languages="C#"
This is an "Amazon" mod I made. I noticed that the game lacked online shopping, which could be inconvenient, so I added it. Now players can order items and have them delivered. Many people say this improves the experience, though others call it cheating.
:::

::: flip-card title="Agenda" image="../pictures/agenda.png" alt="Stardew Valley agenda mod" languages="C#"

This one is definitely not cheating. This is a real game design problem. 

Stardew Valley is known for its time constraints. The game often requires players to do specific things at specific times, which takes a lot of planning. For example, some crops grow only in certain seasons, and some shops open only on certain days of the week.

In other games, if you miss a task, you can simply "do it tomorrow." In Stardew Valley, you might need to wait another week or even another year! *AND THE GAME DOESN'T HAVE AN EDITABLE CALENDAR!*

Technically, the game has a calendar, but it is read-only and displays only preset events. This is frustrating because we cannot record our own tasks.

So I made an agenda mod that lets players add events to the calendar and shows a clear reminder as an event approaches. It helps players keep track of their tasks.
:::

::: flip-card title="Searchable Shop" image="../pictures/searchable-shop.png" alt="Searchable shop mod" languages="C#"
This search feature started in Joja Express. Because Joja Express is a large shop, players sometimes struggled to find the items they needed. When some players asked for the search feature as a standalone mod, I made one!
:::

::: flip-card title="Tool Assembly" image="../pictures/tool-assembly.png" alt="All-in-one tool mod" languages="C#"
Stardew Valley has many tools but limited inventory space. My inventory sometimes filled up with tools, so I made this mod. It adds an all-in-one tool that can transform into the tool a player needs, saving inventory space.
:::

::: flip-card title="Translation Replacer" image="../pictures/translation-replacer.png" alt="Translation replacer mod" languages="C#"
Around version 1.6, many Simplified Chinese translations were incorrect. I made this mod to replace them. The bug has since been fixed, but the mod remains available for players who want to change translations.
:::

::::

### Minecraft Mods:

I also made a few Minecraft mods for personal use. Minecraft has a large modding community, so when I have an idea, a similar mod often already exists. Most of my Minecraft mods therefore focus on my own needs.

::: accordion title="Artist"
I love making pixel art on Minecraft maps. To create map art, you arrange blocks across an area so they form an image when viewed on a map.

However, I often do not have enough time for that. This bot automatically builds a given image. It can build a standard 128 × 128 map in 30 minutes.

That is a little slower than building by hand (usually 20 minutes), but it is fully automated! I can study, code, cook, or do other things while the bot builds for me.

[Repo Here](https://github.com/ofts-cqm/Artist)
:::

::: accordion title="Hohxil Auto Login"
A "Playwright" tool I made for an SMP server I play on, CKOCC, also called "HohXil." It automates login, world selection in the hub, daily check-in, and reward claiming.

It also advertises my shop when new players join...

[Repo Here](https://github.com/ofts-cqm/Hohxil-Auto-Login)
:::

::: accordion title="Replay MCP"
This one is more than a mod. Replay Mod is a Minecraft mod for recording and editing Minecraft videos. Many YouTubers and servers use it to make Minecraft films. I noticed it lacked an AI connection, so I built an MCP server that connects Replay Mod to Codex. Codex can direct a player through various tasks and help make Minecraft videos while the user is AFK!

[Repo Here](https://github.com/ofts-cqm/Replay-MCP)
:::

## This Website

By the way, this website uses Vue. You can find the source code [here](https://github.com/ofts-cqm/home).
