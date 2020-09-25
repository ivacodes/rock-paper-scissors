import React from "react";
import "./App.css";

export default class App extends React.Component {
  state = {
    options: ["💎", "📜", "✂️"],
    playerChoice: "",
    computerChoice: "",
    playerScore: 0,
    computerScore: 0,
    message: "",
  };

  getComputerChoice() {
    return Math.floor(Math.random() * 3);
  }

  getPlayerChoice(choice) {
    let playerChoice = choice;
    let computerChoice = this.getComputerChoice();
    this.getWinner(playerChoice, computerChoice);
    this.setState({ playerChoice, computerChoice });
  }

  getWinner(playerChoice, computerChoice) {
    let resMessage = "";
    if (playerChoice === computerChoice) {
      resMessage = "It's a tie!";
    } else if (
      (playerChoice === 0 && computerChoice === 2) ||
      (playerChoice === 1 && computerChoice === 0) ||
      (playerChoice === 2 && computerChoice === 1)
    ) {
      resMessage = "Human wins this time!";
      this.updateScore("H");
    } else {
      resMessage = "Our AI Overlords win! No one is surprised.";
      this.updateScore("AI");
    }

    this.setState({
      message: resMessage,
    });
  }

  updateScore(winner) {
    const { playerScore, computerScore } = this.state;
    if (winner === "H") {
      let score = playerScore + 1;
      this.setState({ playerScore: score });
    } else if (winner === "AI") {
      let score = computerScore + 1;
      this.setState({ computerScore: score });
      console.log(computerScore);
    }
  }

  resetGame() {
    this.setState({
      playerChoice: "",
      computerChoice: "",
      playerScore: 0,
      computerScore: 0,
    });
  }

  render() {
    const {
      options,
      playerChoice,
      computerChoice,
      message,
      playerScore,
      computerScore,
    } = this.state;
    return (
      <div className='app'>
        <div className='container'>
          <h1 className='title'>Rock, Paper, Scissors!</h1>
          <div className='game'>
            {options.map((option, i) => (
              <span
                key={i}
                className='option'
                onClick={() => this.getPlayerChoice(i)}
              >
                {option}
              </span>
            ))}
          </div>
          <div className='result'>
            {playerChoice !== "" ? (
              <div>
                <span>
                  You {options[playerChoice]} VS {options[computerChoice]} AI
                </span>
                <div className='result-message'>{message}</div>
              </div>
            ) : null}
          </div>

          <div className='score'>
            {playerChoice !== "" ? (
              <div className='score-visible'>
                <div>Human: {playerScore}</div>
                <div>AI: {computerScore}</div>
              </div>
            ) : null}
          </div>
          <div className='reset'>
            {playerChoice !== "" ? (
              <span className='reset-button' onClick={() => this.resetGame()}>
                Reset
              </span>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}
