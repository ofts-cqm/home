---
route: /projects
label: Experience.md
order: 20
---

# My Work Experience

:::: columns flex="3 7"
::: column
![Ascendance Foundry](../pictures/ascendance.jpeg)
:::

::: column
My first and only work experience is [Ascendance Foundry](https://www.ascendancefoundry.com).

Ascendance Foundry is a consulting firm that brings automation to various industries. We believe that, with the help of AI, any junior programmer is capable of building complex systems. Therefore, Ascendance Foundry focuses on training and developing junior software engineers as "Forward Deployed Engineers" (like me), sending them to various customers to develop automated workflows and bring AI into their systems.

With the proper usage of AI, junior software engineers can show unimaginable productivity, and are capable of building maintainable and scalable customized softwares. In the past, a customized program required a large time spending a lot of time and resources to build, while AI significantly reduces the cost, making customized software affordable to all small-sized companies.
:::
::::

# What About Your Personal Projects?

:::: grid columns=3
::: flip-card title="Unity Based Minecraft" image="../pictures/minecraft_unity.png" alt="Unity Based Minecraft terrain" languages="C Sharp, Unity"
A Minecraft built using unity, supporting most features including perlin-noise-based terrain generation, async chunk loading, transparent block rendering, slabs (and other half block) rendering, and inventory UI.

Utilized customized shaders to render waters and transparent textures. Explored shader designing and modern game architectures like ECS.

Note that the items in the hotbar are sprites baked in runtime, maximizing rendering efficiency while keeping the 3D model of blocks.
:::

::: flip-card title="Minecraft Skin Animator" image="../pictures/mcgif.png" alt="Minecraft Skin Animator" languages="React, JavaScript, Java, Kotlin, Ktor, JavaFx, MySql"
I have a website for a Minecraft skin animation generator, hosted at [mcgif.cn](https://mcgif.cn) built using React+Vite as front-end, Ktor router + JavaFX rendering as backend, and a MySQL-based cache system.

You can enter your Minecraft ID and select various poses, then my website will generate a gif/png using your Minecraft skin for the selected pose. For further customization, you can also adjust backgrounds, ambiant lights, and speed. Right now, I have 200+ users, and I am glad to see that my projects have helped.
:::

::: flip-card title="Linear Algebra Calculator" image="../pictures/matcalc.png" alt="Linear Algebra Calculator" languages="Qt, cpp, QML, Json"
I have developed a linear algebra calculator in C++ using Qt. I made it so I can suffer less from Math 115 Linear Algebra for Engineers.

I integrated a formula lexer and evaluator, so you can enter formulas directly instead of calculating them elsewhere and entering the numbers. For example, if you want a rotation matrix, you can just enter cos(pi/2), -sin(pi/2), sin(pi/2), and cos(pi/2).

It also stores calculation history using JSON, so you can quickly go back to your previous calculation after restarting the app.
:::

::: flip-card title="Video Game Modding" image="../pictures/mods.png" alt="Video Game Modding" languages="C Sharp, Java, Forge, SMAPI, IL Spy"
I am a video game modder with 10k+ downloads from the Minecraft and Stardew Valley communities.

The mod with the most downloads is a Stardew Valley online shopping mod. Players can order items “online” using in-game money, and a bird will deliver their items after their purchases. It was primarily developed in C# using Stardew Valley’s modding API, SMAPI, and JSON to load resources.
:::

::: flip-card title="Android Todo App" image="../pictures/wattodo.png" alt="Android Todo App" languages="Java, Kotlin, Android Studio, Python, Flask, MySql, RestApi"
I have developed an Android Todo-List application in Java and Kotlin using Android Studio.

It implements a Three-Tier-Architecture, with a Python Flask backend and a MySQL database. It also uses a local caching system with JSON to ensure data availability and security.
:::

::: flip-card title="C Compiler" image="../pictures/compiler.png" alt="C Compiler" languages="C Sharp"
A C compiler (Compiler + Assembler) that supports about 40% of all C keywords and all C operators. Built using a custom lexer and token generator.

Can output tokenized grammar trees, intermediate languages, or assembly code. Can be DIYed to fit various assembly languages. Due to the complexity of linking, this compiler only generates assembly code; it cannot link against system libraries.
:::
::::

BTW This website uses Vue if you are interested. You can find the source code [Here](https://github.com/ofts-cqm/home).
