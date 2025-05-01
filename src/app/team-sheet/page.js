"use client"

import html2canvas from "html2canvas";
import playersData from '../../../data/players.json';
import teamData from '../../../data/team.json';
import opponentData from '../../../data/opponents.json';
import { useState, useEffect } from "react";
import Select from 'react-select';
import { useMemo } from "react";



const Page = () => {


  //print image
  const handlePrintImage = () => {
    const templateDiv = document.querySelector('.template');

    html2canvas(templateDiv).then(canvas => {
      const image = canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream');
      const link = document.createElement('a');
      link.download = 'brewood_image.png';
      link.href = image;
      link.click();
    });
  };


  //brewood team
  const teamOptions = teamData.map(item => ({
    label: item.team,
    value: item.team
  }));
  const [selectedTeam, setSelectedTeam] = useState(null);
  const handleTeamSelect = selectedOption => {
    setSelectedTeam(selectedOption);
    const brewoodSpan = document.getElementById('brewood');
    if (brewoodSpan) {
      brewoodSpan.textContent = selectedOption.label;
    }
  };

  //opponents
  const opponentOptions = opponentData.map(item => ({
    label: item.team,
    value: item.team
  }));

  const [selectedOpponent, setSelectedOpponent] = useState(null);

  const handleOpponentSelect = selectedOption => {
    setSelectedOpponent(selectedOption);
    const opponentSpan = document.getElementById('opponent');
    if (opponentSpan) {
      opponentSpan.textContent = selectedOption.label;
    }
  };



    //opponents team
    const opponentTeamOptions = teamData.map(item => ({
      label: item.team,
      value: item.team
    }));
  
    const [selectedOpponentTeam, setSelectedOpponentTeam] = useState(null);
  
    const handleOpponentTeamSelect = selectedOption => {
      setSelectedOpponentTeam(selectedOption);
      const opponentTeamSpan = document.getElementById('opponent-team');
      if (opponentTeamSpan) {
        opponentTeamSpan.textContent = selectedOption.label;
      }
    };

    //location

    const [selectedLocation, setSelectedLocation] = useState('');

    useEffect(() => {
      const locationRadios = document.querySelectorAll('input[type="radio"][name="location"]');
      locationRadios.forEach(radio => {
        radio.addEventListener('change', e => {
          const selectedLocationValue = e.target.value;
          setSelectedLocation(selectedLocationValue);
  
          const locationSpan = document.getElementById('location');
          if (locationSpan) {
            locationSpan.textContent = selectedLocationValue;
          }
        });
      });
  
      // Clean up event listeners on unmount (optional)
      return () => {
        locationRadios.forEach(radio => {
          radio.removeEventListener('change', () => {});
        });
      };
    }, []);

    //date

    const [selectedDate, setSelectedDate] = useState('');

    const formatDate = date => {
      const formattedDate = new Date(date).toLocaleDateString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: '2-digit',
      });

      return formattedDate;
    };

    const handleDateChange = e => {
      const selectedDateValue = e.target.value;
      setSelectedDate(selectedDateValue);

      const formattedDate = formatDate(selectedDateValue);

      const dateSpan = document.getElementById('date');
      if (dateSpan) {
        dateSpan.textContent = formattedDate;
      }
    };

    //Time
    const [selectedTime, setSelectedTime] = useState('');

    const formatTime = time => {
      const [hours, minutes] = time.split(':');
      let formattedTime = '';
  
      const hour = parseInt(hours, 10);
      const minute = parseInt(minutes, 10);
  
      if (!isNaN(hour) && !isNaN(minute)) {
        if (hour === 0) {
          formattedTime = `12:${minute < 10 ? `0${minute}` : minute}am`;
        } else if (hour === 12) {
          formattedTime = `12:${minute < 10 ? `0${minute}` : minute}pm`;
        } else if (hour > 12) {
          formattedTime = `${hour - 12}:${minute < 10 ? `0${minute}` : minute}pm`;
        } else {
          formattedTime = `${hour}:${minute < 10 ? `0${minute}` : minute}am`;
        }
      }
  
      return formattedTime;
    };
  
    const handleTimeChange = e => {
      const selectedTimeValue = e.target.value;
      setSelectedTime(selectedTimeValue);
  
      const formattedTime = formatTime(selectedTimeValue);
  
      const timeSpan = document.getElementById('time');
      if (timeSpan) {
        timeSpan.textContent = formattedTime;
      }
    };



    //players
    const [selectedPlayer, setSelectedPlayer] = useState('');
    const [selectedPlayers, setSelectedPlayers] = useState([]);
  
    const playerOptions = playersData.map(player => ({
      label: player.name,
      value: player.name,
      image: player.image,
    }));
  
    const handlePlayerChange = selectedOption => {
      setSelectedPlayer(selectedOption ? selectedOption.value : '');
    };
  
  
    const handleAddPlayer = () => {
      if (selectedPlayer) {
        const player = playersData.find(player => player.name === selectedPlayer);
        if (player) {
          // const modifiedName = `${player.name}${isCaptain ? ' *' : ''}${isWicketkeeper ? ' ✝' : ''}`;
          setSelectedPlayers([...selectedPlayers, player.name]);
        }
      }
    };
  
    const handleRemovePlayer = index => {
      const updatedPlayers = [...selectedPlayers];
      updatedPlayers.splice(index, 1);
      setSelectedPlayers(updatedPlayers);
    };

       //captain & WicketKeeper
       const [isCaptain, setIsCaptain] = useState(null);
       const [isWicketkeeper, setIsWicketkeeper] = useState(null);


    //image

    const imageOptions = useMemo(() => {
      // build an option for every selected player:
      //   • “Name”           → normal head‑shot  (if it exists)
      //   • “Name – Blue”    → blue variant      (if it exists)
      return selectedPlayers.flatMap((name) => {
        const p = playersData.find((pl) => pl.name === name);
        if (!p) return [];
    
        const opts = [];
    
        if (p.image) {
          opts.push({
            label: p.name,           // e.g. “Nick Wright”
            value: p.image,          // unique value for the picker
            image: p.image,          // file path used later
          });
        }
        if (p.blue) {
          opts.push({
            label: `${p.name} - Blue`,
            value: p.blue,
            image: p.blue,
          });
        }
        return opts;
      });
    }, [selectedPlayers]);
    
    const [selectedPlayerImage, setSelectedPlayerImage] = useState("");
    
    const handlePlayerImageChange = (option) => {
      // option.image already holds the correct file (normal or blue)
      setSelectedPlayerImage(option?.image ?? null);
    };

  
  return ( 
    <main className="brewood">
      <div className="container">
        <div className="content">
          <div className="form">
            <form>
              <div className="form__team">
                <span className="form__title">Brewood Team</span>
                <Select
                  value={selectedTeam}
                  onChange={handleTeamSelect}
                  options={teamOptions}
                  placeholder="Select a team..."
                  isSearchable={true}
                />
                {selectedTeam && (
                  <div>
                    <p>Selected Team: {selectedTeam.label}</p>
                  </div>
                )}
              </div>
              <div className="form__opponent">
              <span className="form__title">Opponent</span>
              <Select
                  value={selectedOpponent}
                  onChange={handleOpponentSelect}
                  options={opponentOptions}
                  placeholder="Select an opponent..."
                  isSearchable={true}
                />
                {selectedOpponent && (
                  <div>
                    <p>Selected opponent: {selectedOpponent.label}</p>
                  </div>
                )}
              </div>
              <div className="form__opponent-team">
              <span className="form__title">Opponent Team</span>
                <Select
                  value={selectedOpponentTeam}
                  onChange={handleOpponentTeamSelect}
                  options={opponentTeamOptions}
                  placeholder="Select a team..."
                  isSearchable={true}
                />
                {selectedOpponentTeam && (
                  <div>
                    <p>Selected Team: {selectedOpponentTeam.label}</p>
                  </div>
                )}
              </div>
              <div className="form__location">
                <span className="form__title">
                Location
                </span>
                <div>
                  <label htmlFor="home">Home</label>
                  <input type="radio" name="location" value="home" id="home"/>
                  <label htmlFor="away">Away</label>
                  <input type="radio" name="location" value="away" id="away"/>
                </div>
              </div>
              <div className="form__date">
                <span className="form__title">
                Date
                </span>
                <div>
                <input
                    type="date"
                    id="date-select"
                    value={selectedDate}
                    onChange={handleDateChange}
                  />
                  <div>
                    Date: <span id="date">{formatDate(selectedDate)}</span>
                </div>
                </div>
              </div>
              <div className="form__time">
                <span className="form__title">
                Time
                </span>
                <div>
                <input
                    type="time"
                    id="time-select"
                    value={selectedTime}
                    onChange={handleTimeChange}
                  />
                  <div>
                    Time: <span id="time">{formatTime(selectedTime)}</span>
                  </div>
                </div>
              </div>
              <div className="form__players">
              <span className="form__title">
                Players
                </span>
              <div>
                <Select
                  options={playerOptions}
                  onChange={handlePlayerChange}
                  placeholder="Select a player..."
                  className="form__players-select"
                />
                <div>
                </div>
                <button type="button" onClick={handleAddPlayer}>Add Player</button>
                <ul id="brewood-team">
                  {selectedPlayers.map((player, index) => (
                    <li key={index}>
                      {player}
                      <button type="button" onClick={() => handleRemovePlayer(index)}>Remove</button>
                      <div>
                        <label>
                          Captain:
                          <input
                            type="radio"
                            name={`isCaptain${index}`}
                            checked={isCaptain === index}
                            onChange={() => setIsCaptain(index)}
                          />
                        </label>
                        <label>
                          Wicketkeeper:
                          <input
                            type="radio"
                            name={`isWicketkeeper${index}`}
                            checked={isWicketkeeper === index}
                            onChange={() => setIsWicketkeeper(index)}
                          />
                        </label>
                      </div>
                
                    </li>
                  ))}
                </ul>

              </div>
              </div>
              <div className="form__image">
              <span className="form__title">
                Player Image
                </span>

                <Select
  options={imageOptions}          // ⬅️  use the new list
  placeholder="Selected players with images"
  onChange={handlePlayerImageChange}
/>

              </div>
            </form>




            <button className="form__print" onClick={handlePrintImage}>Print Image</button>
          </div>


          <div className="template template--team">
            <div className="template__background">
              <img src="./background/Background.png" alt="background"/>
            </div>

            <div className="template__content">
              <div className="template__logo">
                <img src="./logo.png" alt="logo"/>
              </div>
              <div className="template__game">
             
              {selectedTeam && selectedTeam.label}&nbsp;
              vs&nbsp;
              {selectedOpponent && selectedOpponent.label}&nbsp;
              {selectedOpponentTeam && selectedOpponentTeam.label}
              </div>
              <div className="template__date">
                <span id="location">{selectedLocation}</span>-<span id="date">{formatDate(selectedDate)}</span>-<span id="time">{formatTime(selectedTime)}</span><span>Start</span>
              </div>
              <div className="template__grid">
              <div className="template__team">
                <ul id="selectedPlayers">
                {selectedPlayers.map((player, index) => (
                  <li key={index}>
                    {player}
                    {isCaptain === index && ' (c)'}
                    {isWicketkeeper === index && ' (wk)'}
                  </li>
                ))}
                <li className="template__team--sponsor">
                    <img src="./sponsors/essington.png" alt="Essington Fruit Farm"/>
                    <img 
                      src="./sponsors/sky-sports.png" 
                      alt="Sky Sports" 
                      style={{ 
                        objectFit: "contain", 
                        marginLeft: "16px",
                        height: "40px"
                      }} 
                    />
                  </li>
                </ul>
              </div>
              <div className="template__p" id="template__player">
                {selectedPlayerImage && selectedPlayerImage.length > 0 ? (
                  <img src={`./players/${selectedPlayerImage}`} alt="player" />
                ) : (
                  <img src="./logo.png" alt="logo" className="template__player-logo" />
                )}
              </div>
            </div>
            </div>

            <div className="template__socials template__socials--team">
                <ul>
                  <li>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#9B9BAA" d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z"/></svg>
                    <span>BREWOODCRICKET</span>

                  </li>
                  <li>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#9B9BAA" d="M512 256C512 114.6 397.4 0 256 0S0 114.6 0 256C0 376 82.7 476.8 194.2 504.5V334.2H141.4V256h52.8V222.3c0-87.1 39.4-127.5 125-127.5c16.2 0 44.2 3.2 55.7 6.4V172c-6-.6-16.5-1-29.6-1c-42 0-58.2 15.9-58.2 57.2V256h83.6l-14.4 78.2H287V510.1C413.8 494.8 512 386.9 512 256h0z"/></svg>
                    <span>BREWOODCRICKETCLUB</span>
                  </li>
                  <li>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="#9B9BAA" d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"/></svg>
                    <span>BREWOOD-CRICKET-CLUB</span>
                  </li>
                </ul>
              </div>
          </div>
        </div>
      </div>
    </main>
   );
}
 
export default Page;
