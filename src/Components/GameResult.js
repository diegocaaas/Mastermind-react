import { useLocation, useNavigate } from "react-router-dom";
import Circle from "./Circle";

const GameResult = () => {

    const location = useLocation();
    const correctCode = location.state.code ;
    let resultMessage = (location.state.winState) ? 'You Won!': 'You Lost';
    const navigate = useNavigate();
    console.log(correctCode);

    const handleOnClick = () =>{
        navigate('/');
    }

    return (
        <div className="gameResult">
            <h1>
                {resultMessage}
            </h1>
            <h2>
                Correct Code:
            </h2>
            <div className="resultList">
                {correctCode.map(
                        (color, index) => {
                            return <Circle dimension="50px" color={color} key={index}/>
                        }
                    )
                }
            </div>
            <button className="button" onClick={() => handleOnClick()}>
                Play again
            </button>
        </div>
    )
}

export default GameResult;