export default function Word(props){
    return(
        <div>
            {props.found ? <p className="filledBox">{props.value}</p> : <div className="emptyBox"></div>}
        </div>
        
    )
}