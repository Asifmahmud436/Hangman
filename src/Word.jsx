export default function Word(props){
    return(
        <div>
            {props.found ? <p>{props.value}</p> : <p>_</p>}
        </div>
        
    )
}