export default function Die(props) {
    
    return (
        <button
            type="submit"
            className="die"
            style={props.isHeld ? { backgroundColor: '#59E391' } : { backgroundColor: 'white' }}
            onClick={() => props.onClick(props.id)}
        >{props.value}</button>
    )
}