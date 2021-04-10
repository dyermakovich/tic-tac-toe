import React from 'react';
import ReactDOM from 'react-dom';
import { Square } from './lib/square.js'
import { Board } from './lib/board.js'
import './index.css';

class Game extends React.Component {
  constructor( props ) {
    super( props ) ;
    
    this.state = {
      history: [{ 
        squares: Array( 9 ).fill( null ),
        squareClicked: null,
        move: 0
      }],
      xIsNext: true,
      stepNumber: 0,
      desc: false
    } ; 
  }
  
  handleClick( i ) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1) ; 
    const current = history[ history.length - 1 ] ;     
    const squares = current.squares.slice() ; 
    
    if( calculateWinner( squares ) || squares[ i ] ) {
      return;
    } 
        
    squares[ i ] = {
      text: this.state.xIsNext ? 'X' : 'O',
      marked: false
    } ;  
    
    this.setState({ 
      history: history.concat([{ 
        squares: squares,
        squareClicked: i,
        move: history.length
      }]),
      xIsNext: !this.state.xIsNext,
      stepNumber: history.length
    }) ; 
  }  
  
  jumpTo( step ) {   
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0
    }) ;  
  }
  
  getLocation( history ) {
    if( history.squareClicked === null ) {
      return '' ; 
    }
    //const len = history.squares.length ; 
    const col = history.squareClicked % 3 ; 
    const row = Math.floor( history.squareClicked / 3 ) ; 
    return ` (${col}, ${row})`;    
  } 
  
  toggleMovesOrder() {
    const history = this.state.history ; 
    
    if( history.length < 3 ) {
      return ; 
    }
    
    // console.log( history ) ; 
    
    const reversed = history.slice(1).reverse() ;
    reversed.unshift( history[ 0 ] ) ; 
    
    // console.log( reversed ) ;
    
    this.setState({
      history: reversed,
      desc: !this.state.desc
    }) ; 
    
  }
  
  getToggleButton() {
    if( this.state.history.length < 3 ) {
      return null ; 
    }
    const label = this.state.desc ? 'Ascending' : 'Descending' ;    
    return <button onClick={() => this.toggleMovesOrder()}>{label}</button>    
  }
  
  hasMoves() {
    return this.state.history[ this.state.stepNumber ]
      .squares.indexOf( null ) >= 0 ;      
  }
  
  render() {
    const history = this.state.history ; 
    const current = history[ this.state.stepNumber] ;      
    const winner = calculateWinner( current.squares ) ; 
        
    const moves = history.map( ( step, move ) => {
      const desc = step.move ? 
        'Go to move #' + step.move + this.getLocation( step ) :
        'Go to game start' ; 
      
      let className = '' ; 
      
      if( step === current ) {
        className = 'current' ;
      }
      
      return (
        <li key={ move }>
          <button className={className} onClick={ () => this.jumpTo( move ) }>{desc}</button>
        </li>
      ) ;       
    }) ; 
    
    let status ; 
    
    if( winner ) {
      status = 'Winner: ' + winner['text'] ;      
    } else if( !this.hasMoves() ) {
      status = 'No one won, try again ;)' ; 
    } else {
      status = 'Next player: ' + ( this.state.xIsNext ? 'X' : 'O' ) ;      
    }
        
    return (
      <div className="game">
        <div className="game-board">
          <Board squares={ current.squares } onClick={ ( i ) => this.handleClick( i ) }/>
        </div>
        <div className="game-info">
          <div>{ status }</div>
          <ol>{ moves }</ol>
          {this.getToggleButton()}
        </div>
      </div>
    );
  }
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[b] && squares[c] 
        && squares[a]['text'] === squares[b]['text'] 
          && squares[a]['text'] === squares[c]['text']) {
      squares[a]['marked'] = true ; 
      squares[b]['marked'] = true ; 
      squares[c]['marked'] = true ; 
      return squares[a];
    }
  }
  return null;
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
