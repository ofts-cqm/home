<script setup lang="ts">
import { computed } from 'vue';

// copied from https://github.com/doda-zz/github-language-colors/
// bro this is ten years old
// i should definately change this
// Todo: update this
const defaultColor = 
{
    "TypeScript": "#2b7489", 
    "Objective-C++": "#6866fb", 
    "Jupyter Notebook": "#DA5B0B", 
    "Objective-C": "#438eff", 
    "Go": "#375eab", 
    "Visual Basic": "#945db7", 
    "PHP": "#4F5D95", 
    "Java": "#b07219", 
    "Makefile": "#427819", 
    "Perl": "#0298c3", 
    "Lua": "#000080", 
    "Vue": "#2c3e50", 
    "Verilog": "#b2b7f8", 
    "HTML": "#e44b23", 
    "Lex": "#DBCA00", 
    "API Blueprint": "#2ACCA8", 
    "Swift": "#ffac45", 
    "C": "#555555", 
    "Rust": "#dea584", 
    "FORTRAN": "#4d41b1", 
    "VHDL": "#adb2cb", 
    "Ada": "#02f88c", 
    "Unity3D Asset": "#ab69a1", 
    "Assembly": "#6E4C13", 
    "Arduino": "#bd79d1", 
    "C Sharp": "#178600", 
    "CSS": "#563d7c", 
    "JavaScript": "#f1e05a", 
    "Matlab": "#bb92ac", 
    "R": "#198ce7", 
    "Scheme": "#1e4aec", 
    "PLSQL": "#dad8d8", 
    "Python": "#3572A5", 
    "SystemVerilog": "#DAE1C2", 
    "Groovy": "#e69f56", 
    "Grammatical Framework": "#79aa7a", 
    "Game Maker Language": "#8fb200", 
    "UnrealScript": "#a54c4d", 
    "cpp": "#f34b7d", 
}

const props = defineProps({ 
    language: {
        type: String,
        required: true
    },
    color: {
        type: String
    }
})

const computedColor = computed(() => {
    if (props.color != null) return props.color;
    if (props.language in defaultColor) return defaultColor[props.language as keyof typeof defaultColor];
    return defaultColor.FORTRAN;// fortran looks better. Im definately not going to write that old language
})
</script>

<template>
    <div class="chip" :style="{'background-color': computedColor}">{{ language }}</div>
</template>

<style scoped>
    .chip{
        height: 1.2rem;
        border-radius: 0.5rem;
        font-size: 1rem;
        display: flex;
        align-items: center;
        justify-content: center;
        padding-left: 0.3rem;
        padding-right: 0.3rem;
        font-size: 5cqw;
    }
</style>