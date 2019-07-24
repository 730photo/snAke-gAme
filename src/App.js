import React, { Component } from 'react';
import Snake from './Snake';
import Food from './Food';

const getRandomCoordinates = () => { //coordinates to where the snake and the food are
  let min = 1;
  let max = 90;
  let x = Math.floor((Math.random() * (max-min+1)+min)/2)*2;
  let y = Math.floor((Math.random() * (max-min+1)+min)/2)*2;
  return [x,y]
}

const initialState = {
    food: getRandomCoordinates(), //food
    speed: 200,
    direction: 'RIGHT',
    snakeDots: [ //snake
      [0,0],
      [2,0]
    ]
  }

class App extends Component {

  state = initialState;
    

  componentDidMount() {
    //triggers snake movements
    setInterval(this.moveSnake, this.state.speed);
    document.onkeydown = this.onKeyDown;
  }

  componentDidUpdate() {
    this.checkIfOutOfBorders();
    this.checkIfCollapsed();
    this.checkIfEats();
  }

  

  onKeyDown = (e) => {
    e = e || window.event;
    // eslint-disable-next-line default-case
    switch (e.keyCode) {
      case 38:
        this.setState({direction: 'UP'});
        break;
        case 40:
        this.setState({direction: 'DOWN'});
        break;
        case 37:
        this.setState({direction: 'LEFT'});
        break;
        case 39:
        this.setState({direction: 'RIGHT'});
        break;
    }
  }

  moveSnake = () => {
    let dots = [...this.state.snakeDots];
    let head = dots[dots.length -1];

    //new head for each possible direction
    // eslint-disable-next-line default-case
    switch (this.state.direction) {
      case 'RIGHT':
        head = [head[0] + 2, head[1]];
      break;
      case 'LEFT':
        head = [head[0] - 2, head[1]];
      break;
      case 'DOWN':
        head = [head[0], head[1] + 2];
        break;
        case 'UP':
        head = [head[0], head[1] - 2];
        break;

    }
    //adding head
    dots.push(head);
    //removing tail
    dots.shift();
    this.setState({
      snakeDots: dots
    })
  }

    // forbid snake to leave game area
    checkIfOutOfBorders() {
        let head = this.state.snakeDots[this.state.snakeDots.length -1];
        if (head[0] >= 100 || head[1] >= 100 || head[0] < 0 || head[1] < 0) {
          this.onGameOver();
        }
    }

    // check to see if snake hits itself
    checkIfCollapsed() {
      let snake = [...this.state.snakeDots];
      let head = snake[snake.length - 1];
      snake.pop();
      snake.forEach(dot => {
        if (head[0] == dot[0] && head[1] == dot[1]) {
          this.onGameOver();
        }
      })
    }

    checkIfEats() {
      let head = this.state.snakeDots[this.state.snakeDots.length -1];
      let food = this.state.food;
      if (head[0] == food[0] && head[1] == food[1]) {
        this.setState({
          food: getRandomCoordinates()
        })
        this.enlargeSnake();
        this.increaseSpeed();
      }
    }

    enlargeSnake() {
      let newSnake = [...this.state.snakeDots];
      newSnake.unshift([])
      this.setState({
        snakeDots: newSnake
      })
    }

    increaseSpeed() {
      if (this.state.speed > 10) {
        this.setState({
          speed: this.state.speed - 10
        })
      }
    }

    onGameOver() {
      alert('Game OVER. Snake length is $(this.state.snakeDots.length)');
      this.setState(initialState) //ques alert
    }

  render() {
    //area that the snake and the food are inside
  return (
    <div className="game-area"> 
      <Snake snakeDots={this.state.snakeDots} />
      <Food dot={this.state.food} />
      {/* <div className="snake-dot" style={{top:0, left:0}}></div>
      <div className="snake-dot" style={{top:0, left:'2%'}}></div>
      <div className="snake-dot" style={{top:0, left:'4%'}}></div> */}
    </div>
  );
 }
}

export default App;
