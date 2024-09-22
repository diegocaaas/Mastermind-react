class MasterMind {
    
    static colors = [
        "blue",
        "red", 
        "green", 
        "purple", 
        "yellow", 
        "brown"
    ];
    
    constructor(){
        this.code = this.generateCode();
        this.loseState = false;
        this.winState = false;
        this.attempts = 0;
    }

    resetGame(){
        this.code = this.generateCode();
        this.loseState = false;
        this.winState = false;
        this.attempts = 0;
    }

    generateCode(){
        let newCode = [];
        for(let i=0;i<4;i++){
            newCode[i] = MasterMind.colors[Math.floor(Math.random() * 6)];
        }
        return newCode;
    }
    
    checkGuess(Guess){
        let resultColors = {
            blacks: 0,
            whites: 0,
        };
        let code = Array.from(this.code);
        for(let i=0;i<4;i++){
            if(Guess[i] === this.code[i]){
                resultColors.blacks++;
                code[i] = "CHECKED";
            }else{
                for(let j=0;j<4;j++){
                    if(Guess[i] === code[j] && Guess[j] !== code[j] ){
                        code[j] = "CHECKED";
                        resultColors.whites++;
                        break;
                    }
                }
            }
        }
        this.attempts++;
        if(resultColors.blacks === 4){
            this.winState = true;
        } else if(this.attempts === 10){
            this.loseState = true;
        }
        return resultColors;
    }

    
    
}

export default MasterMind;
