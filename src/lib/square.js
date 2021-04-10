export function Square( props ){      
  return (
    <button 
      style={ { color: props.square && props.square.marked ? 'red' : '' } }
      className="square" 
      onClick={ props.onClick }
    >
      { props.square && props.square.text }
    </button>
  );  
}
