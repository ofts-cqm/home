<template>
  <main>
    <h1>My Contact Info:</h1>

    <div class="contact">        
        <p><img src="/src/assets/linkedin.svg"/><br class="mobile-block"><a>Qinamu Chen</a></p>

        <p><img src="/src/assets/github.svg"/><br class="mobile-block"><a>ofts-cqm</a></p>

        <p><img src="/src/assets/instagram.svg"><br class="mobile-block"><a>qianmuc</a></p>

        <p><img src="/src/assets/gmail.svg"/><br class="mobile-block"><a>qianmuchen.sam@gmail.com</a></p>
        
        <p><img src="/src/assets/gmail.svg"/><br class="mobile-block"><a>sam.chen@uwaterloo.ca</a></p>

        <p><img src="/src/assets/wechat.svg"/><br class="mobile-block"><a>13651113174</a></p>
    </div>
  </main>
</template>

<style scoped src="./ViewCommon.css"></style>

<style scoped>
    p{
        padding: 0;
    }

    h1{
        margin-bottom: 20px;
    }

    img{
        height: 1.8rem;
        width: auto;
        margin-right: 10px;
    }

    .contact{
        /*display: grid;
        grid-template-columns: 5% 90%;
        column-gap: 5%;*/
        font-size: 1.5rem;
        /*padding-right: 40%;*/
        align-items: start;
    }

    @media (max-width: 900px){
        .contact{
            padding-right: 0px;
        }
    }
</style>