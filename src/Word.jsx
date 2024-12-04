export default function Word(props){
    return(
        {props.isFound==true ? <p>{props.value}</p> : '_'}
    )
}