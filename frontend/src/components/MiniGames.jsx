import React, { useState, useEffect } from 'react';
import '../styles/Minigames.css';
import { useNavigate } from 'react-router-dom';

const TOTAL_ROUNDS = 10;

const AIorRealGame = () => {
  const navigate = useNavigate(); // ✅ INI tempat yang benar

  const [score, setScore] = useState(0);
  const [currentRound, setCurrentRound] = useState(1);
  const [currentImage, setCurrentImage] = useState({ url: '', isAI: false });
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [buttonsDisabled, setButtonsDisabled] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    loadNewImage();
  }, []);

  const loadNewImage = () => {
    const newImage = {
      url: `https://picsum.photos/600/400?random=${Math.random()}`,
      isAI: Math.random() > 0.5
    };
    setCurrentImage(newImage);
    setShowFeedback(false);
  };

  const handleGuess = (isAIGuess) => {
    setButtonsDisabled(true);
    const correct = isAIGuess === currentImage.isAI;

    if (correct) {
      setScore(score + 1);
      setFeedbackMessage('Correct! +1 point');
    } else {
      setFeedbackMessage(`Wrong! This image was ${currentImage.isAI ? 'AI generated' : 'created by a human'}.`);
    }

    setShowFeedback(true);

    setTimeout(() => {
      if (currentRound < TOTAL_ROUNDS) {
        setCurrentRound(currentRound + 1);
        loadNewImage();
        setButtonsDisabled(false);
      } else {
        setGameOver(true);
      }
    }, 2000);
  };

  const restartGame = () => {
    setScore(0);
    setCurrentRound(1);
    setGameOver(false);
    loadNewImage();
    setButtonsDisabled(false);
  };

  // ✅ Fungsi ini akan bawa user balik ke halaman utama
  const backToMain = () => {
    navigate('/'); // pastikan '/' adalah path ke Home
  };

  return (
    <div className="game-container">
      <button onClick={backToMain} className="back-button">← Back</button>

      <header>
        <h1 className="game-title">AI or Real? The Guessing Game</h1>
      </header>

      {!gameOver ? (
        <main className="game-content">
          <div className="scoreboard">
            <div className="score-display">Score: {score}</div>
            <div className="round-display">Round: {currentRound} / {TOTAL_ROUNDS}</div>
            <div className="progress-bar">
              <div className="progress" style={{ width: `${(currentRound - 1) / TOTAL_ROUNDS * 100}%` }}></div>
            </div>
          </div>

          <div className="image-container">
            <img
              src={currentImage.url}
              alt={`Image for round ${currentRound}`}
              className="challenge-image"
            />
          </div>

          {showFeedback ? (
            <div className={`feedback ${feedbackMessage.includes('Correct') ? 'correct' : 'incorrect'}`}>
              {feedbackMessage}
            </div>
          ) : (
            <div className="guess-buttons">
              <button
                onClick={() => handleGuess(false)}
                disabled={buttonsDisabled}
                className="real-button"
              >
                Real Human
              </button>
              <button
                onClick={() => handleGuess(true)}
                disabled={buttonsDisabled}
                className="ai-button"
              >
                AI Generated
              </button>
            </div>
          )}
        </main>
      ) : (
        <div className="results-page">
          <h2>Game Over!</h2>
          <p className="final-score">Your Final Score: {score} / {TOTAL_ROUNDS}</p>
          <p className="accuracy">Accuracy: {Math.round((score / TOTAL_ROUNDS) * 100)}%</p>
          <div className="result-message">
            {score === TOTAL_ROUNDS ? 'Perfect! You\'re an expert!' :
              score >= TOTAL_ROUNDS * 0.8 ? 'Great job! You have a good eye!' :
              score >= TOTAL_ROUNDS * 0.6 ? 'Good effort! Keep practicing!' :
              'Better luck next time! The line between AI and real is getting blurry.'}
          </div>
          <button onClick={restartGame} className="play-again-button">Play Again</button>
          <button onClick={backToMain} className="menu-button">Main Menu</button>
        </div>
      )}
    </div>
  );
};

export default AIorRealGame;
