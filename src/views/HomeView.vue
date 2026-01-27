<template>
  <main>
    <h1>Welcome to OFTS_CQM (Sam Chen)'s Homepage!</h1>
    <div class = 'first'>
      <div class="image">
        <img src="/src/assets/me.jpg"/>
      </div>
      <div class="paragraph" style="flex: 6">
        <p>
          Congradulation! You found OFTS_CQM (Sam Chen)'s homepage! You can find anything about OFTS_CQM here!.
        </p>

        <p>
          OFTS_CQM is a Software Engineering Student at the University of Waterloo, 
          excited to explore the world of computing, web & app development, video game design… and a lot more!
        </p>

        <p>
          There's a lot more I'm doing. They'll show up here (or on LinkedIn) if I'm done.
        </p>

        <p>
          I don’t know everything, but I am still learning! I am willing to learn more about software engineering, coding, and the languages and frameworks that go with it. 
        </p>

        <p>
          By the way, I am more a back-end guy, so this website is kinda shitty. 
          Don't blame me if you don't like this vscode styled design. 
        </p>

        <h2 style="text-align: right;">---- By OFTS_CQM</h2>
      </div>
    </div>
    <div class="paragraph">
        <h2>What’s Your Tech Stack?</h2>
        <p>
          I am proficient in common OOP languages such as C# and Java, as well as game engines like Unity. 
          Other than video game stuff, I also do website development. 
          I am proficient in front-end frameworks such as ReactJS and Vue, with other technologies such as css, tailwind css, and html. 
          For background, no Spring Boot yet, but I can use other common Java/Kotlin frameworks such as Javelin and Ktor, 
          as well as Python frameworks such as Flask. I have Android development experience with Android Studio and Java/Kotlin, 
          and desktop development with JavaFX, Java Swing, or Qt/C++. Writing UI in C++ is a pain, but sometimes, 
          like embedded systems or industrial computers, C++ is the only option. 
        </p>
        <h2>
          If you want to find out more about me, you can go to the file explorer at the <span class="desktop">left side</span><span class="mobile">bottom</span>!
        </h2>
      </div>
  </main>
</template>

<style scoped src="./ViewCommon.css"></style>

<style scoped>

.first{
  display: flex;
  margin-top: 5vh;
  margin-bottom: 5vh;
  flex-direction: row;
  justify-content: flex-start;
}

.image{
  flex: 4
}

@media (max-width: 600px) {
  .first{
    flex-direction: column;
  }
}

</style>