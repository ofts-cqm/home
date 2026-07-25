<script setup lang="ts">
  import ProjectCard from '../components/ProjectCard.vue';
</script>

<template>
  <main>
    <h1>My Work Experience</h1>
    <div class = 'first'>
      <div class="image">
        <img src="/src/assets/ascendance.jpeg"/>
      </div>
      <div class="paragraph" style="flex: 6">
        <p>
          My first and only work experience is <a target="_blank" href="https://www.ascendancefoundry.com">Ascendance Foundry</a>. 
        </p>

        <p>
          Ascendance Foundry is a consulting firm that brings automation to various industries. We believe that, 
          with the help of AI, any junior programmer is capable of building complex systems. 
          Therefore, Ascendance Foundry focuses on training and developing junior software engineers as "Forward Deployed Engineers" (like me),
          sending them to various customers to develop automated workflows and bring AI into their systems. 
        </p>

        <p>
          With the proper usage of AI, junior software engineers can show unimaginable productivity, 
          and are capable of building maintainable and scalable customized 
          softwares. In the past, a customized program required a large time spending a lot of time and resources to build, 
          while AI significantly reduces the cost, making customized software affordable to all small-sized companies. 
        </p>
      </div>
    </div>
    <h1>what About Your Personal Projects?</h1>
    <div class="projects">
      <ProjectCard src="mcgif.png" :languages="['React', 'JavaScript', 'Java', 'Kotlin', 'Ktor', 'JavaFx', 'MySql']">
        <template #name>Minecraft Skin Animator</template>
        I have a website for a Minecraft skin animation generator, 
        hosted at <a href='https://mcgif.cn' target="_blank">mcgif.cn</a> 
        built using React+Vite as front-end, Ktor router + JavaFX rendering as backend, and a MySQL-based cache system. 
        You can enter your Minecraft ID and select various poses, then my website will generate a gif/png using your
        Minecraft skin for the selected pose. For further customization, you can also adjust backgrounds, ambiant lights, and speed. 
        Right now, I have 200+ users, and I am glad to see that my projects have helped. 
      </ProjectCard>

      <ProjectCard src="matcalc.png" :languages="['Qt', 'cpp', 'QML', 'Json']">
        <template #name>Linear Algebra Calculator</template>
        I have developed a linear algebra calculator in C++ using Qt. 
        I made it so I can suffer less from Math 115 Linear Algebra for Engineers. 
        I integrated a formula lexer and evaluator, so you can enter formulas directly
        instead of calculating them elsewhere and entering the numbers. For example, if you 
        want a rotation matrix, you can just enter cos(pi/2), -sin(pi/2), sin(pi/2), and cos(pi/2). 
        It also stores calculation history using JSON, so you can quickly go back to your previous
        calculation after restarting the app.
      </ProjectCard>

      <ProjectCard src="mods.png" :languages="['C Sharp', 'Java', 'Forge', 'SMAPI', 'IL Spy']">
        <template #name>Video Game Modding</template>
        I am a video game modder with 10k+ downloads from the Minecraft and Stardew Valley communities. 
        The mod with the most downloads is a Stardew Valley online shopping mod. 
        Players can order items “online” using in-game money, and a bird will deliver their items after their purchases. 
        It was primarily developed in C# using Stardew Valley’s modding API, SMAPI, and JSON to load resources. 
      </ProjectCard>

      <ProjectCard src="wattodo.png" :languages="['Java', 'Kotlin', 'Android Studio', 'Python', 'Flask', 'MySql', 'RestApi']">
        <template #name>Android Todo App</template>
        I have developed an Android Todo-List application in Java and Kotlin using Android Studio. 
        It implements a Three-Tier-Architecture, with a Python Flask backend and a MySQL database.
        It also uses a local caching system with JSON to ensure data availability and security
      </ProjectCard>

      <ProjectCard src="compiler.png" :languages="['C Sharp']">
        <template #name>C Compiler</template>
        A C compiler (Compiler + Assembler) that supports about 40% of all C keywords and all C operators. Built using a custom lexer
        and token generator. Can output tokenized grammar trees, intermediate languages, or assembly code. Can be DIYed to 
        fit various assembly languages. Due to the complexity of linking, this compiler only generates assembly code;
        it cannot link against system libraries. 
      </ProjectCard>

      <ProjectCard src="minecraft.png" :languages="['Java']">
        <template #name>Minecraft</template>
        A Minecraft built using my own Java 3D CPU Render. Supports ~40 blocks. Supports async chunk loading and saving. 
        Demonstrating strong understanding of the rendering pipeline, shaders, and render structures and implementations, and 
        strong understanding of computer graphics. 
      </ProjectCard>
    </div>
    <p>BTW This website uses Vue if you are interested. You can find the source code <a href =https://github.com/ofts-cqm/home>Here</a>.</p>
  </main>
</template>

<style scoped src="./ViewCommon.css"></style>

<style scoped>
.projects {
  display: grid;
  grid-template-columns: 30% 30% 30%;
  column-gap: 5%;
  row-gap: 5vh;
  margin-top: 5vh;
}

@media (max-width: 1000px) {
  .projects {
    grid-template-columns: 47.5% 47.5%;
  }
}

@media (max-width: 500px) {
  .projects {
    grid-template-columns: 100%;
  }
}

.first{
  display: flex;
  margin-top: 5vh;
  margin-bottom: 5vh;
  flex-direction: row;
  justify-content: flex-start;
}

.image{
  flex: 4;
}

img {
  width: 100%;
  aspect-ratio: 1;
  border: 6px solid #FFFFFF;
  border-radius: 50%; /* Makes the image a perfect circle */
}

@media (max-width: 600px) {
  .first{
    flex-direction: column;
  }
}

</style>
