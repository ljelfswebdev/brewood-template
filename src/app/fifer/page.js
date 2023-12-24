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



      //overs
      const [overs, setOvers] = useState('');
      const handleOversChange = (event) => {
        const newOvers = event.target.value;
        setOvers(newOvers);
      };
      const statsOvers = overs ? `Overs: ${overs}` : '';


      //maidens
      const [maidens, setMaidens] = useState('');

      const handleMaidensChange = (event) => {
          const newMaidens = event.target.value;
          setMaidens(newMaidens);
      };
      
      const statsMaidens = maidens ? `Maidens: ${maidens}` : '';

        //runs
        const [runs, setRuns] = useState('');
        const handleRunsChange = (event) => {
            const newRuns = event.target.value;
            setRuns(newRuns);
        };
        const statsRuns = runs ? `Runs: ${runs}` : '';

        //wickets
        const [wickets, setWickets] = useState('');
        const handleWicketsChange = (event) => {
            const newWickets = event.target.value;
            setWickets(newWickets);
        };
        const statsWickets = wickets ? `Wickets: ${wickets}` : '';

        //economy
        const calculateEconomy = () => {
            if (overs && runs) {
              const totalBalls = Math.floor(parseFloat(overs)) * 6 + (parseFloat(overs) % 1) * 10; // Convert overs to total balls
              const economy = (parseFloat(runs) / totalBalls) * 6; // Calculate the economy rate
              return `Economy: ${economy.toFixed(2)}`; // Display the economy rate rounded to 2 decimal places
            }
            return '';
          };
            
          const statsEconomy = calculateEconomy();
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
                  Overs
                </span>
                <input onChange={handleOversChange} />
              </div>
              <div class="form__maidens">
              <span className="form__title">
                  Maidens
                </span>
                <input onChange={handleMaidensChange} />
              </div>
              <div class="form__runs">
              <span className="form__title">
                  Runs
                </span>
                <input onChange={handleRunsChange} />
              </div>
              <div class="form__wickets">
              <span className="form__title">
                  Wickets
                </span>
                <input onChange={handleWicketsChange} />
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
                        {statsOvers}
                    </div>
                    <div class="teamplate__stats-info">
                        {statsMaidens}
                    </div>
                    <div class="teamplate__stats-info">
                        {statsRuns}
                    </div>
                    <div class="teamplate__stats-info">
                        {statsWickets}
                    </div>
                    <div class="teamplate__stats-info">
                        {statsEconomy}
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