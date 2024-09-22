import Circle from "./Circle";

const ResultGrid = (props) =>{ 

    let colorList = props.resultList;
    return (
        <div className="resultGrid">
            <Circle dimension="25" color={colorList[0]}/>
            <Circle dimension="25" color={colorList[1]}/>
            <Circle dimension="25" color={colorList[2]}/>
            <Circle dimension="25" color={colorList[3]}/>
        </div>
    )
}

export default ResultGrid;