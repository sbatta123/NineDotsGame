import  React from "react";
import * as Y from 'yjs';
import { WebrtcProvider } from 'y-webrtc';
import PlayerProfile from "./PlayerProfile.jsx";
import SocialExposure from "./SocialExposure.jsx";
import Task from "./Task.jsx";
import SocialInteractions from "./SocialInteractions.jsx";
const ydoc = new Y.Doc();
const ymap = ydoc.getMap('state');
const provider = new WebrtcProvider('my-experiment', ydoc, { signaling: ['ws://localhost:3000/'] });
const doc1 = new Y.Doc();
const doc2 = new Y.Doc();

export default class Round extends React.Component {
  constructor(props) {
    super(props);
    this.state={
        firstLine: true,
        count: 0,
        isDown: false,
        previousPointX:'',
        previousPointY:'',
        xCurrent:'',
        yCurrent:'',
    }
    }
    
    componentDidMount() {
      ymap.observe(() => {
        this.setState({
          ...ymap.get('state')
        })
      });
    }

  render() {
    const { round, stage, player, game } = this.props;
    function update(x1, y1, x2, y2) {
      return (
        <button onClick={props.onClick}>
          x1 + y1;
        </button>
      );
    }
    return (
      <div>
      <div className="round">
      <canvas id="canvas" ref="canvas" width="1300" height="640" style={{position: "absolute"}}
      onMouseDown={
                            e => {
                                let nativeEvent = e.nativeEvent;
                                this.handleMouseDown(nativeEvent);
                            }}  
                        onMouseUp={
                            e => {
                                let nativeEvent = e.nativeEvent;
                                this.handleMouseUp(nativeEvent);
                            }
      }></canvas>
      <button className="circle"> </button>
       <button className="circle"> </button>
       <button className="circle"> </button>
       <button className="circle"> </button>
       <button className="circle"> </button>
       <button className="circle"> </button>
       <button className="circle"> </button>
       <button className="circle"> </button>
       <button className="circle"> </button>
        <div className="content"> 
        <PlayerProfile player={player} stage={stage} game={game} />
        <SocialExposure game={game} round={round} stage={stage} player={player}/>
        <Task game={game} round={round} stage={stage} player={player} />
          {
            stage.name === "social" && (
              <SocialExposure {...this.props} />
            )
          }
          {game.players.length > 1 ? (
          <SocialInteractions game={game} stage={stage} player={player} />
        ) : null}
        </div>
      </div>
      {/* <svg width="100" height="100"><line x1={this.state.previousPointX} y1={this.state.previousPointY} x2={this.state.xCurrent} y2={this.state.yCurrent} stroke="green" stroke-width="25"></line></svg> */}
      </div> 
    );
  }
  handleMouseDown(e){ 
    if (this.state.count < 4) {
      const canvas = document.querySelector('canvas');
      const ctx = canvas.getContext('2d');
      if (this.state.count < 1) {
        var x = e.offsetX;
        var y = e.offsetY;
        ctx.moveTo(x,y);
        this.state.firstLine = false;
        this.setState({
          isDown: false,
          firstLine: true,
          previousPointX: e.offsetX,
          previousPointY: e.offsetY,
        },
          () => {
            ymap.set('state', this.state);
          }
        );  
      } else {
        var x = this.state.previousPointX;
        var y = this.state.previousPointY;
        ctx.moveTo(x,y);
      }  
    } else {
      alert ("you have already drawn four lines");
      return;
    }
}

handleMouseUp(e){
    this.componentDidMount();
    const canvas = document.querySelector('canvas');
    const ctx = canvas.getContext('2d');
        var x = e.offsetX;
        var y = e.offsetY;

        ctx.moveTo(this.state.previousPointX,this.state.previousPointY);
        ctx.lineWidth = 40;
        ctx.lineTo(x,y);
        ctx.stroke();
        // update(this.state.previousPointX, this.state.previousPointY, x, y);
        ctx.closePath();
    this.setState({
      isDown: false,
      count: this.state.count + 1,
      previousPointX: x,
      previousPointY: y,
    },
      () => {
        const ymap = ydoc.getMap('state');
        ymap.set('state', this.state);
      }
    );
    doc1.on('update', update => {
      Y.applyUpdate(doc2, update)
    })
    doc2.on('update', update => {
      Y.applyUpdate(doc1, update)
    })
    // render() {
    //   return (
    //     <svg width="800" height="600"><line x1={this.state.previousPointX} y1={this.state.previousPointY} x2={x} y2={y} stroke="green" stroke-width="25"></line></svg>
    //   );
    // }    
}
// async render() {
//   await function update(x1, y1, x2, y2) {
//     return (
//       <svg width="800" height="600"><line x1="10" y1="10" x2="10" y2="10" stroke="green" stroke-width="25"></line></svg>
//     );
//   }
// }
componentDidMount() {
    const canvas = document.querySelector('canvas');
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = 'gray';
    ctx.fillRect(0, 0, 2040, 840);
}


}  

 
