<template>
  <main>
    <h1>What is this?</h1>

    <div class="paragraph">
        <p>
            These are a bit of my personal stories, if you are interested. If you are an HR looking for my projects and 
            experiences, then you are probably in the wrong file. <span class="wip">Open the terminal and type 
            <span class="command">find ./ -name "MoreAboutMe*"</span>, this is the file you are looking for.</span>
            (Terminal is still WIP)
        </p>

        <p>
            However, if you just want to learn more about me, you are welcome to stay. 
            Nothing here is technical, nor are they related to any of my skills. This file is more like a tree hole. 
            I want to write something about my true thoughts, and hope someone will resonate with me. 
        </p>
    </div>

    <h1>So, Why Software Engineering?</h1>

    <div class="paragraph">
        <p>
            I’ve seen a lot of people choose software engineering for either a high salary, 
            parental pressure, or peer pressure. You think I am the same? No! I do have my unique story about coding.
        </p>
        <div class="text-image">
            <p>
                I believe everyone has played Minecraft, or at least heard of it, right? That's where the whole store began. 
                Minecraft is famous for its modding community. When I wrote this article, 
                Minecraft had approximately 200k mods on CurseForge (the largest mod platform for Minecraft), 
                not counting those that are not uploaded to CurseForge. When I first got in touch with these mods in elementary school, 
                I was shocked by the infinite possibilities they bring. Gradually, a thought popped up from my head: Can I make my own mod? 
                <br><br>
                This is a screenshot of the modpack (made around 2016 ) that sparked my idea for making my own mod. 
                <br><br>
                Note that the original video was lost, this is an archive
            </p>
            <img src="/src/assets/muyu.jpg">
        </div>
        <p>
            The power of a childhood dream is invincible. This ambitious thought encourages me to learn coding, modding, 
            and these coding platforms and frameworks… Now, I can confidently say that I am a modder, a good modder, 
            a modder with 10k+ cumulative downloads. Now that I've successfully accomplished the goal I set for myself 
            in elementary school, after seeing the power and possibility of coding, I believe this is the job I want to do 
            when I grow up. Without hesitation, I wrote down 'Software Engineering' on my university application, 
            and this is the whole story behind it. 
        </p>
    </div>

    <h1>What does 'OFTS-CQM' stands for?</h1>

    <div class="paragraph">
        <p>
            Well, I have used that name as my Minecraft ID for several years. CQM is the acronym of my Chinese name Chen Qianmu, and OFTS
            is a bit complicated. 
            <br><br>
            Back then, there was a game called Minecraft: Story Mode (the company bankrupted so its not availabe any more). 
            It talks about the advantures of a team called the Order of the Stone. Yes, that's where OFTS come from. 
            Order oF The Store. I forgot the exact reason why I called it OFTS instead of OOTS or something else. I picked
            the name almost 10 years ago. I remember it comes from the Order of The Stone, but I forgot the details. 
            <br><br>
            Back then, I really liked the Order of the Stone, and I imaged that I were a member of them, explorying the world
            and defeating the evils. C'mon, everyone have a herotic childhood dream, right? So I added my name after the
            acronym OFTS, so it becomes OFTS-CQM.
            <br><br>
            In fact, not limited to Minecraft, most of my game accounts uses OFTS-CQM, including Github, because it was
            originally used to store my mods' codes.
        </p>
    </div>

    <h1>What do you think about AI?</h1>

    <div class="paragraph">
        <p>
            AI is the greatest tool ever invented, with the help of AI I gain unimaginable productivity. 
            I have to be honest, without AI, I lost most of the efficiency, but with the help of AI, I can 
            vibe-code or semi-vibe-code comprehensive systems and softwares. 
        </p>

        <h2>Do you like to use AI?</h2>

        <p>
            Actually, No... which may suprise you. This is my honest answer. You see, I study software engineering because coding is an
            enjoyable thing. If its not enjoyable why would I choose this major? But, to me, the process of coding is 
            what is enjoyable. The outcome, the result... not really important. Coding, debugging, 
            sitting in front of the computer wondering why this doesn't work, and sitting in front of the computer
            celebrating it finally works, are all process of coding, which I consider to be enjoyable, 
            even debugging for hours. 
        </p>

        <p>
            As you can see, AI destroys this feeling. The entire enjoyable process is replaced. I don't care about 
            the result. If I made a project, I get a sense of pride and a sense of achievement. If I let AI do it, 
            I get nothing, because this is literally other people's work. Sometimes I struggle about this. 
            If I don't use AI then I lost productivity. If I use AI then I lost fun. 
        </p>

            

        <h2>
            Is this website made by AI?
        </h2>   

        <p>Nope, not even a single line. AI is for efficiency and productivity, this site is for fun. </p> 

        <h2>
            Then, are you skill OK with using AI in work?
        </h2>

        <p>If AI is required to boost productivity, then definately. This is my work, and I have the 
            responsibility to deliver my content on time with high quality. I am not an AI hater, nor an AI fun, 
            it is just a tool that is unfortunately not my top choice. I still use AI, and know very well how to use AI. 
        </p>

        <p>
            It is the future of work, the future of software engineering. I am still very agile, able to adopt to new technology. 
        </p>
    </div>

    <h1>How Do You Feel About Studying Software Engineering?</h1>

    <div class="paragraph">
        <h2 class="meme_title">Here is a meme from reddit:</h2>
        <img class="meme" src="/src/assets/meme.png"/>
    </div>

  </main>
</template>

<style scoped src="./ViewCommon.css"></style>

<style scoped>
.meme_title{
    padding: 2rem 0 2rem 0;
}

.meme{
    aspect-ratio: 0.4767 !important;
    max-height: 100vh !important;
    width: auto !important;
    max-width: 90%;
    margin-right: auto;
}

.command{
    background-color: dimgrey;
    border-radius: 0.3rem;
    padding-left: 0.3rem;
    padding-right: 0.3rem;
}

.wip{
    text-decoration: line-through;
}

</style>