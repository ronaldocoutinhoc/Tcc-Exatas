import { Button } from "./Button.js";
import { Block } from "./Block.js";
import { View } from "../View.js";
import { setStartLevelText } from "./HelpText.js";
import { SaveController } from "./SaveController.js";


class Level {

    constructor(index, availableBlocks, scriptValidator, numberOfEmptySpaces) {
        this.index = index;
        this.availableBlocks = availableBlocks;
        this.scriptValidator = scriptValidator;
        this.numberOfEmptySpaces = numberOfEmptySpaces;
    }

    static CURRENT_LEVEL = 1;
    static CURRENT_LEVEL_IDENTIFIER = "level1";

    static blocksLevel1 = [
        Block.DEFAULT_BLOCKS["EQUALS"],
        Block.DEFAULT_BLOCKS["DIFFERENT"],
        Block.DEFAULT_BLOCKS["GREATERTHEN"],
        Block.DEFAULT_BLOCKS["GREATERTHENEQUAL"],
        Block.DEFAULT_BLOCKS["ASSIGN"],
        Block.CUSTOM_BLOCKS["VARIABLE_BAIT"],
        Block.CUSTOM_BLOCKS["BAIT1"],
        Block.CUSTOM_BLOCKS["BAIT2"],
        //new Block("Function Test", "teste", "function"),
    ];

    static blocksLevel2 = [
        Block.DEFAULT_BLOCKS["ASSIGN"],
        Block.CUSTOM_BLOCKS["VARIABLE_BAIT"],
        Block.CUSTOM_BLOCKS["BAIT1"]
    ];

    static blocksLevel3 = [
        Block.DEFAULT_BLOCKS["IF"],
        Block.DEFAULT_BLOCKS["ELSE"],
        Block.DEFAULT_BLOCKS["THEN"],
        Block.DEFAULT_BLOCKS["THEN"],
        Block.DEFAULT_BLOCKS["END_IF"],
        Block.DEFAULT_BLOCKS["END_ELSE"],
        Block.DEFAULT_BLOCKS["AND"],
        Block.DEFAULT_BLOCKS["OR"],
        Block.DEFAULT_BLOCKS["EQUALS"],
        Block.DEFAULT_BLOCKS["DIFFERENT"],
        Block.CUSTOM_BLOCKS["PESCARSALMAO"],
        Block.CUSTOM_BLOCKS["PESCARQUALQUER"],
        Block.CUSTOM_BLOCKS["BAIT"],
        Block.CUSTOM_BLOCKS["BAIT1"],
    ];

    static blocksLevel4 = [
        Block.CUSTOM_BLOCKS["PESCAR"],
        Block.CUSTOM_BLOCKS["VALUE10"],
        Block.DEFAULT_BLOCKS["WHILE"],
        Block.DEFAULT_BLOCKS["GREATERTHEN"],
        Block.DEFAULT_BLOCKS["GREATERTHENEQUAL"],
        Block.DEFAULT_BLOCKS["LESSTHEN"],
        Block.DEFAULT_BLOCKS["LESSTHENEQUAL"],
        Block.DEFAULT_BLOCKS["DO"],
        Block.DEFAULT_BLOCKS["END_WHILE"],
        Block.CUSTOM_BLOCKS["FISHCONT"],
    ];

    static blocksLevel5 = [
        Block.CUSTOM_BLOCKS["PESCAR"],
        Block.CUSTOM_BLOCKS["FISHWEIGHT"],
        Block.CUSTOM_BLOCKS["VALUE10KG"],
        Block.CUSTOM_BLOCKS["SALMAO"],
        Block.CUSTOM_BLOCKS["FISHOBTAINED"],
        Block.CUSTOM_BLOCKS["BAIT1"],
        Block.DEFAULT_BLOCKS["EQUALS"],
        Block.DEFAULT_BLOCKS["DIFFERENT"],
        Block.DEFAULT_BLOCKS["LESSTHEN"],
        Block.DEFAULT_BLOCKS["LESSTHENEQUAL"],
        Block.DEFAULT_BLOCKS["GREATERTHEN"],
        Block.DEFAULT_BLOCKS["GREATERTHENEQUAL"],
        Block.DEFAULT_BLOCKS["AND"],
        Block.DEFAULT_BLOCKS["OR"],
        Block.DEFAULT_BLOCKS["WHILE"],
        Block.DEFAULT_BLOCKS["DO"],
        Block.DEFAULT_BLOCKS["END_WHILE"],
        Block.DEFAULT_BLOCKS["IF"],
        Block.DEFAULT_BLOCKS["THEN"],
        Block.DEFAULT_BLOCKS["END_IF"],
        
    ];

    //ESSE NIVEL TA UM POUCO COMPLEXO, SE FIZER ALGUM NIVEL MAIS FACIL JOGAR ELE MAIS PARA O FINAL
    static blocksLevel6 = [
        Block.CUSTOM_BLOCKS["PESCAR"],
        Block.CUSTOM_BLOCKS["SALMAO"],
        Block.CUSTOM_BLOCKS["FISHCONT"],
        Block.CUSTOM_BLOCKS["VALUE10"],
        Block.CUSTOM_BLOCKS["FISHOBTAINED"],
        Block.CUSTOM_BLOCKS["SOLTARPEIXE"],
        Block.DEFAULT_BLOCKS["WHILE"],
        Block.DEFAULT_BLOCKS["DO"],
        Block.DEFAULT_BLOCKS["IF"],
        Block.DEFAULT_BLOCKS["THEN"],
        Block.DEFAULT_BLOCKS["END_IF"],
        Block.DEFAULT_BLOCKS["END_WHILE"],
        Block.DEFAULT_BLOCKS["GREATERTHEN"],
        Block.DEFAULT_BLOCKS["GREATERTHENEQUAL"],
        Block.DEFAULT_BLOCKS["LESSTHEN"],
        Block.DEFAULT_BLOCKS["LESSTHENEQUAL"],
        Block.DEFAULT_BLOCKS["EQUALS"],
        Block.DEFAULT_BLOCKS["DIFFERENT"],
    ];

    static LEVEL_VALIDATORS = {
        level1: (treatedCode) => {
            let bait;
            try {
                eval(treatedCode);
            } catch (e) { }

            if (bait === "bait1") {
                return true;
            }
            return false;
        },
        level2: (treatedCode) => {
            let bait;
            console.log(treatedCode);
            if (treatedCode === "bait='bait1' bait='bait1' bait='bait1' ") {
                return true;
            }
            return false;
        },
        level3: (treatedCode) => {
            
            let fishes = [];

            getFishes('bait1');
            getFishes('any');

            function getFishes(baitParameter){
                let bait = baitParameter;

                try {
                    eval(treatedCode);
                } catch (e) { }

                function getSalmao(){
                    fishes.push("salmao");
                }

                function getAnyFish(){
                    fishes.push("qualquer");
                }
            }

            if(fishes[0] === "salmao" && fishes[1] === "qualquer" && fishes.length === 2){
                return true;
            }

            return false;
        },
        level4: (treatedCode) => {

            let fishCont = 0;

            try {
                eval(treatedCode);
            } catch (e) { }
            
            if(fishCont === 10)return true;
            
            return false;

            function getFish(){
                fishCont++;
            }

            return false;
        },
        level5: (treatedCode) => {

            let fishObtained = "random";
            let fishWeight = 0;
            let salmon = "salmon";
            let cont = 0;

            try {
                eval(treatedCode);
            } catch (e) { }
            
            if(treatedCode.search("while")=== -1)return false;

            if(fishObtained === salmon && fishWeight >= 10){
                return true;
            }else{
                return false;
            }
            
            function getFish(){
                let auxRandomFish = ["salmon", "random"];
                let auxRandomFishWeight = [5, 10];
                fishObtained = auxRandomFish[Math.floor(Math.random() * 2)];
                fishWeight = auxRandomFishWeight[Math.floor(Math.random() * 2)];
            }
        },
        level6: (treatedCode) => {

            
            let fishCont = 0;
            let fishContArray = [];
            let fishObtained;
            
            try {
                eval(treatedCode);
            } catch (e) { }

            if(fishContArray.length >= 10 && fishContArray.every(fish => fish === "salmon")){
                return true;
            }

            return false;        
              
            function getFish(){
                let auxRandomFish = ["salmon", "random"];
                fishObtained = auxRandomFish[Math.floor(Math.random() * 2)];
                fishContArray.push(fishObtained);
                fishCont++;
            }

            function dropFish(){
                fishContArray.pop();
                fishCont--;
            }


        },
        

    };

    static levels = [
        "",//Level 0 -> Ignore
        new Level(1, Level.blocksLevel1, Level.LEVEL_VALIDATORS["level1"], 22),
        new Level(2, Level.blocksLevel2, Level.LEVEL_VALIDATORS["level2"], 3),
        new Level(3, Level.blocksLevel3, Level.LEVEL_VALIDATORS["level3"], 15),
        new Level(4, Level.blocksLevel4, Level.LEVEL_VALIDATORS["level4"], 7),
        new Level(5, Level.blocksLevel5, Level.LEVEL_VALIDATORS["level5"], 15),
        new Level(6, Level.blocksLevel6, Level.LEVEL_VALIDATORS["level6"], 20),
    ]

    static levelCurrentState = {}

    static saveLevelCurrentState() {
        Level.levelCurrentState = {
            "availableBlocks": document.querySelector('.availableBlocks').innerHTML,
            "selectedBlocks": document.querySelector('.selectedBlocks').innerHTML,
        }
    }

    static loadLevelCurrentState() {
        document.querySelector('.availableBlocks').innerHTML = Level.levelCurrentState["availableBlocks"];
        document.querySelector('.selectedBlocks').innerHTML = Level.levelCurrentState["selectedBlocks"];
        View.startDragAndDropControl();
    }

    static treatCodeString(string) {
        string = string.replaceAll("functBlock", "");
        string = string.replaceAll("-premadeFunction", "();");
        string = string.replaceAll("---", "'");
        string = string.replaceAll("__", "");
        string = string.replaceAll("if", "if(");
        string = string.replaceAll("endIf", "}");
        string = string.replaceAll("endElse", "}");
        string = string.replaceAll("endWhile", "; cont++; if(cont>1000)break;}");
        string = string.replaceAll("then", "){");
        string = string.replaceAll("else", "else if(true");
        string = string.replaceAll("while", "let cont = 0;while(");
        string = string.replaceAll("do", "){");

        console.log(string)
        return string;
    }


    static getCurrentLevel(){
        return Level.levels[Level.CURRENT_LEVEL];
    }

    static startLevel(levelIndex) {
        console.log(levelIndex)
        let level = Level.levels[levelIndex];

        level.setAvailableBlocksDiv();
        level.setSelectedBlocksDiv();
        Level.CURRENT_LEVEL = levelIndex;
        SaveController.saveGame(levelIndex);
        Level.CURRENT_LEVEL_IDENTIFIER = 'level' + levelIndex;
        View.startDragAndDropControl();
        Level.saveLevelCurrentState();

        setStartLevelText();
    }

    setAvailableBlocksDiv() {
        let availableBlocksDivs = '';
        this.availableBlocks.forEach(block => {
            availableBlocksDivs += block.htmlElement;
        });
        document.querySelector('.availableBlocks').innerHTML = availableBlocksDivs;
    }

    setSelectedBlocksDiv() {
        let selectedBlocksDiv = '';
        for (let index = 0; index < this.numberOfEmptySpaces; index++) {
            selectedBlocksDiv += '<div class="blocksHolder dropzone"></div>';
        }

        document.querySelector('.selectedBlocks').innerHTML = selectedBlocksDiv;
    }

    

}

export { Level };