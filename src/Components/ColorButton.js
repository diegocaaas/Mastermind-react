const ColorButton = (props) => {

    return <button className="colorbutton"  onClick={props.onClick} style={{backgroundColor: props.color}}/>
}

export default ColorButton;