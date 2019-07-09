import Square from './Square'
import React, { Component } from 'react'

class Board extends Component {
    constructor(props) {
        super(props);
        this.state = {
            squares: [null, null, null,
                null, null, null,
                null, null, null],
            isFirstPlayer: true,
            isDraw: false,
            winner: null,
            winXCount: 0,
            winOCount: 0,
            drawCount: 0
        }

    }

    reset= () => {
        this.setState({
            squares: [null, null, null,
                null, null, null,
                null, null, null],
            isFirstPlayer: true,
            isDraw: false,
            winner: null
        })
    }

    componentDidUpdate() {
        if (this.state.winner === null && this.state.isDraw === false) {
            this.checkWinner()
        }
    }

    funCheckDraw() {
        const { squares } = this.state

        let checkDraw = true;
        console.log(squares.length)

        for (let i = 0; i < squares.length; i++) {
            if (!squares[i]) {
                checkDraw = false
                break;
            }

        }

        if (checkDraw) {
            this.setState({
                isDraw: true,
                drawCount: this.state.drawCount + 1
            })
            return
        }

    }

    checkWinner() {
        const { squares } = this.state
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ]




        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            //console.log(squares[a], squares[b], squares[c]);

            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                this.setState({
                    winner: squares[a]
                    
                })
            if(squares[a] === "X"){
                this.setState({
                    winXCount : this.state.winXCount + 1 
                })
            }
            else{
                this.setState({
                    winOCount :  this.state.winOCount + 1
                })
            }
           
            
                //console.log("checking winner")
                return;
            }
        }

        this.funCheckDraw()

    }

    squareClickHandler = (i) => {
        if (!this.state.squares[i] && !this.state.winner) {
            const newSquares = [... this.state.squares]
            newSquares[i] = this.state.isFirstPlayer ? "0" : "X"
            this.setState({
                squares: newSquares,
                isFirstPlayer: !this.state.isFirstPlayer
            })
            // this.checkWinner();
        }
    }

    renderSquare = (i) => {
        return <Square
            index={i}
            value={this.state.squares[i] || '-'}
            clickHandler={this.squareClickHandler}></Square>
    }
    // player = null;
    render() {
        // console.log(this.state.isFirstPlayer)
        // if(this.state.isFirstPlayer){
        //     this.player = "Player 1"
        // }else{
        //     this.player = "Player 2"
        // }
        if (this.state.isDraw) {
            return <div>
                <h1>Current Player is : {this.state.isFirstPlayer ? "1" : "2"} </h1>
                <h2>Game Drawn</h2>
                <div>
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div>
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div>
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
                <h3>X: {this.state.winXCount}, O: {this.state.winOCount}, Draw: {this.state.drawCount}</h3>
                <button type="button"  onClick={this.reset}>reset</button>
            </div>
        }
        else {
            return <div>
                <h1>Current Player is : {this.state.isFirstPlayer ? "1" : "2"} </h1>
                <h2>Winner is: {this.state.winner ? this.state.winner : "-"}</h2>
                <div>
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div>
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div>
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
                <button type="button"  onClick={this.reset}>reset</button>
                <h3>X: {this.state.winXCount}, O: {this.state.winOCount}, Draw: {this.state.drawCount}</h3>
            </div>
        }
    }
}

export default Board;