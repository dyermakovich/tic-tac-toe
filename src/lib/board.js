import React from 'react'
import { Square } from './square.js'

export class Board extends React.Component {    
  renderSquare(i) {
    const square = this.props.squares[ i ] ; 
    return <Square key={i} 
      square={square}
      onClick={() => this.props.onClick( i )}
    />;
  }
  
  renderCols( currentRow, maxColNumber ) {
    const cols = [] ; 
    
    for( let i = 0 ; i < maxColNumber ; ++i ) {
      cols.push( this.renderSquare( currentRow * maxColNumber + i ) ) ;   
    }  
    
    return cols ; 
  }
  
  renderRows( maxRowNumber, maxColNumber ) {
    const rows = [] ; 
    
    for( let i = 0 ; i < maxRowNumber ; ++i ) {
      rows.push( 
        <div key={i} className="board-row">{this.renderCols( i, maxColNumber )}</div> 
      ) ; 
    }
                    
    return rows ;                     
  }
  
  render() {
    return (
      <div>                    
        {this.renderRows( 3, 3 )}
      </div>
    );
  }
}
