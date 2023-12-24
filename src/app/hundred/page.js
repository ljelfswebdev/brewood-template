"use client"

import html2canvas from "html2canvas";
import playersData from '../../../data/players.json';
import { useState, useEffect } from "react";
import Select from 'react-select';

const Fifer = () => {

    const handlePrintImage = () => {
        const templateDiv = document.querySelector('.template');
    
        html2canvas(templateDiv).then(canvas => {
          const image = canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream');
          const link = document.createElement('a');
          link.download = 'template_image.png';
          link.href = image;
          link.click();
        });
      };

      const [selectedPlayer, setSelectedPlayer] = useState('');

      const playerOptions = playersData.map(player => ({
        label: player.name,
        value: player.name,
        image: player.image,
      }));
    
      const handlePlayerChange = selectedOption => {
        setSelectedPlayer(selectedOption ? selectedOption.value : '');
      };
    
      const selectedPlayerImage = playerOptions.find(player => player.value === selectedPlayer)?.image || '';


        //runs
        const [runs, setRuns] = useState('');
        const handleRunsChange = (event) => {
            const newRuns = event.target.value;
            setRuns(newRuns);
        };
        const statsRuns = runs ? `Runs: ${runs}` : '';

        //balls
        const [balls, setBalls] = useState('');
        const handleBallsChange = (event) => {
            const newBalls = event.target.value;
            setBalls(newBalls);
        };
        const statsBalls = balls ? `Balls: ${balls}` : '';


        //fours
        const [fours, setFours] = useState('');
        const handleFoursChange = (event) => {
            const newFours = event.target.value;
            setFours(newFours);
        };
        const statsFours = fours ? `Fours: ${fours}` : '';


        //sixes
        const [sixes, setSixes] = useState('');
        const handleSixesChange = (event) => {
            const newSixes = event.target.value;
            setSixes(newSixes);
        };
        const statsSixes = sixes ? `Sixes: ${sixes}` : '';

        //strike rate
        const calculateStrikeRate = (runs, balls) => {
            if (runs && balls) {
              const strikeRate = (parseFloat(runs) / parseFloat(balls)) * 100;
              return `S/R: ${strikeRate.toFixed(2)}`;
            }
            return '';
          };
          
          const statsStrikeRate = calculateStrikeRate(runs, balls);

    return ( 
        <main className="brewood">
        <div className="container">
          <div className="content">
            <div className="form">
            <form>
              <div className="form__players">
                <span className="form__title">
                  Player
                </span>
                <Select
                  options={playerOptions}
                  onChange={handlePlayerChange}
                  placeholder="Select a player..."
                  className="form__players-select"
                  isClearable
                />
              </div>

              <div class="form__overs">
                <span className="form__title">
                  Runs
                </span>
                <input onChange={handleRunsChange} />
              </div>
              <div class="form__maidens">
              <span className="form__title">
                 Balls
                </span>
                <input onChange={handleBallsChange} />
              </div>
              <div class="form__runs">
              <span className="form__title">
                Fours
                </span>
                <input onChange={handleFoursChange} />
              </div>
              <div class="form__wickets">
              <span className="form__title">
                 Sixes
                </span>
                <input onChange={handleSixesChange} />
              </div>
            
            </form>
  
  
  
  
              <button className="form__print" onClick={handlePrintImage}>Print Image</button>
            </div>
            <div className="template">
              <div className="template__background">
                <img src="./background/Background.png" alt="background"/>
              </div>
              <div className="template__player" id="template__player">
              <img src={`./players/${selectedPlayerImage}`} alt="player" />
              </div>
  
              <div className="template__content">
                <div className="template__logo">
                  <img src="./logo.png" alt="logo"/>
                </div>

                <div className="template__fifer-player">
                {selectedPlayer && `${selectedPlayer}`}
                </div>

                <div class="template__stats">
                    <div class="teamplate__stats-info">
                        {statsRuns}
                    </div>
                    <div class="teamplate__stats-info">
                        {statsBalls}
                    </div>
                    <div class="teamplate__stats-info">
                        {statsStrikeRate}
                    </div>
                    <div class="teamplate__stats-info">
                        {statsFours}
                    </div>
                    <div class="teamplate__stats-info">
                        {statsSixes}
                    </div>
                </div>
            
                <div className="template__sponsors">
                  <ul>
                    <li>
                      <img src="./sponsors/st-doms.png" alt="St.Doms"/>
                    </li>
                    <li>
                      <img src="./sponsors/s4s.png" alt="S4S"/>
                    </li>
                    <li>
                      <img src="./sponsors/essington.png" alt="Essington Fruit Farm"/>
                    </li>
                  </ul>
                </div>
  
              </div>
  
  
            </div>
          </div>
        </div>
      </main>
     );
}
 
export default Fifer;