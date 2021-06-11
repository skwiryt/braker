import React from 'react';
import { render } from 'react-dom';
//import bell from './sounds/bell.wav';

class App extends React.Component {
  state = {
    off: true,
    toBreakCount: false,
    toWorkCount: false,
    time: 0,
  }
  countDown = () => {    
    const {off, time, toBreakCount, toWorkCount } = this.state;
    if (time > 0 && off === false) {
      setTimeout(() => this.setState({...this.state, time: time - 1}, this.countDown), 1000);
    } else if (toWorkCount) {
      this.countTimeToBreak();
    } else if (toBreakCount) {
      this.countTimeToWork()
    }
  }
  countTimeToBreak = () => {
    this.playBell()
    this.setState({time: 20 * 60, off: false, toBreakCount: true, toWorkCount: false}, this.countDown);    
  }
  countTimeToWork = () => {
    this.playBell();
    this.setState({time: 20, off: false, toBreakCount: false, toWorkCount: true}, this.countDown);    
  }
  stopCounting = () => {
    this.setState({time: 0, off: true, toBreakCount: false, toWorkCount: false});
  }
  closeApp = () => {
    window.close();
  }
  formatCounter = (time) => {
    const seconds = time % 60;
    const minutes = Math.floor(time/60)
    return `${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`
  }
  playBell = () => {
    var audioElement = new Audio('./sounds/bell.wav');
    audioElement.play();
  }
  render() {
    const {off, toBreakCount, toWorkCount, time} = this.state;
    return (
      <div>
        <h1>Protect your eyes</h1>
        {off && (
          <div>
           <p>According to optometrists in order to save your eyes, you should follow the 20/20/20. It means you should to rest your eyes every 20 minutes for 20 seconds by looking more than 20 feet away.</p>
           <p>This app will help you track your time and inform you when it's time to rest.</p>
          </div>
        )}       
        {toBreakCount && (<img src="./images/Work.png" />)}
        {toWorkCount && (<img src="./images/Rest.png" />)}
        {off || (
          <div className="timer">
            {this.formatCounter(time)}
          </div>
        )}        
        <button onClick={this.countTimeToBreak} className="btn">Start</button>
        <button onClick={this.stopCounting} className="btn">Stop</button>
        <button onClick={this.closeApp} className="btn btn-close">X</button>
      </div>
    )
  }
};

render(<App />, document.querySelector('#app'));
