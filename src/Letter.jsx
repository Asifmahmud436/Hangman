export default function Letter(props){
    return(
        
        <button 
        className={props.pressed==true ? 'greenBtn':''}
        onClick={() => props.handleClick(props.uniqueVal)}
        >{props.value}</button>
        
    )
}