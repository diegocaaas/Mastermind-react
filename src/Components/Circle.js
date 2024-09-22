const Circle = (props) => {

    let circleStyle = {
        width:  props.dimension, 
        height: props.dimension, 
        backgroundColor: props.color,
        borderRadius: '50%', 
    };

    return <div style={circleStyle}/>
}

export default Circle;