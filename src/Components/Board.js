import { useState } from "react";
import Circle from "./Circle";
import ColorButton from "./ColorButton";
import ResultGrid from "./ResultGrid";
import MasterMind from "../MasterMind";
import { useNavigate } from "react-router-dom";

const Board = () => {

    const getInitialCircles = ()=>{
        let circleList = [];
        for(let i=0; i<40;i++){
            circleList[i] = {
                id: i,
                color: 'lightgrey'
            };
        }
        return circleList;
    }

    const getInitialResultCircles = ()=>{
        let resultCircleList = [];
        for(let i=0; i<10;i++){
            resultCircleList[i] = ['lightgrey','lightgrey','lightgrey','lightgrey'];
        }
        return resultCircleList;
    }

    const [circles, setCircles] = useState(getInitialCircles());
    const [resultCircles, setResultCircles] = useState(getInitialResultCircles());
    const [rowCounter, setRowCounter]= useState(9);
    const [columnCounter, setcolumnCounter] = useState(0);
    const [currentGuess, setCurrentGuess] = useState([]);
    const [game] = useState(new MasterMind());
    const navigate = useNavigate();
    
    

    const handleColorbuttonClick = (color) => {
        if(columnCounter <= 3){
            let newCircles = Array.from(circles);
            newCircles[rowCounter*4 + columnCounter].color = color
            setCircles(newCircles);
            setcolumnCounter(value => value + 1);
            setCurrentGuess(prevGuess => {
                const newGuess = [...prevGuess];
                newGuess.push(color)
                return newGuess;
            });
        }
    }

    const handleMakeGuessButtonClick = ()=> {
        if(columnCounter === 4){
            let resultColors = game.checkGuess(currentGuess);

            setResultCircles(prevResultGrid => {
                const newResultGrid = [...prevResultGrid];
                let i=0;
                while(i<resultColors.blacks){
                    newResultGrid[rowCounter][i] = "black";
                    i++;
                }
                let j = 0;
                while(j< resultColors.whites){
                    newResultGrid[rowCounter][resultColors.blacks + j] = "white";
                    j++;
                }
                return newResultGrid;
            });
            setCurrentGuess([]);
            setRowCounter(value => value-1);
            setcolumnCounter(0);
            if(game.winState){
                navigate('/result', {
                        state: {
                            code: game.code,
                            winState: true,
                        }
                    }
                )
            }else if(game.loseState){
                navigate('/result', {
                        state: {
                            code: game.code,
                            winState: false,
                        }
                    }
                )
            }
            
        }
    }

    const handleRestartButtonClick = () => {
        game.resetGame();
        setCircles(getInitialCircles());
        setResultCircles(getInitialResultCircles());
        setRowCounter(9);
        setcolumnCounter(0);
        setCurrentGuess([]);
    }

    const handleClearGuessButtonClick = () => {
        setCircles(
            (prevCirclesGrid)=> {
                const newCirclesGrid = [...prevCirclesGrid];
                for(let i=0;i<columnCounter;i++){
                    newCirclesGrid[rowCounter*4+i].color = "lightgrey"; 
                }
                return newCirclesGrid;
            }
        )
        setcolumnCounter(0);
        setCurrentGuess([]);
    }
    
    return (
        <div className="board">
            <div className="gridrow"> 
                <div className="circleGrid">
                    {circles.map(
                            (circle) => {
                                return <Circle dimension="50px" color={circle.color} key={circle.id}/>
                            }
                        )
                    }
                </div>
                <div className="resultGridColumn">
                    {resultCircles.map(
                        (result) =>{
                            return <ResultGrid resultList={result}/>
                        }
                    )}
                </div>
            </div>
            <div className='colorbuttonlist'>
                <ColorButton onClick={() => handleColorbuttonClick("blue")} color='blue'/>
                <ColorButton onClick={() =>handleColorbuttonClick("green")}color='green'/>
                <ColorButton onClick={() => handleColorbuttonClick("red")}color='red'/>
                <ColorButton onClick={() => handleColorbuttonClick("yellow")}color='yellow'/>
                <ColorButton onClick={() => handleColorbuttonClick("purple")}color='purple'/>
                <ColorButton onClick={() => handleColorbuttonClick("brown")}color='brown'/>
            </div>
            <button className='button' onClick={() => handleMakeGuessButtonClick(currentGuess)}>
                Make Guess
            </button>
            <button className='button' onClick={() => handleClearGuessButtonClick()}>
                Clear Guess
            </button>
            <button className='button' onClick={() => handleRestartButtonClick()}>
                Reset
            </button>
        </div>
    )
}

export default Board;