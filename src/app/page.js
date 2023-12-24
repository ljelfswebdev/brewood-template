"use client"

import html2canvas from "html2canvas";
import playersData from '../../data/players.json';
import teamData from '../../data/team.json';
import opponentData from '../../data/opponents.json';
import { useState, useEffect } from "react";
import Select from 'react-select';



const Page = () => {

// Function to prompt for username and password

// const login = () => {
//   let isLoggedIn = false;

//   const envusername = process.env.NEXT_PUBLIC_PASSWORD;
//   const envpassword = process.env.NEXT_PUBLIC_PASSWORD;

//   while (!isLoggedIn) {
//     const username = prompt("Enter your username:");
//     const password = prompt("Enter your password:");
//     const validUsername = envusername;
//     const validPassword = envpassword;
//     if (username === validUsername && password === validPassword) {
//       alert("Login successful!");
//       isLoggedIn = true;
//     } else {
//       alert("Invalid username or password. Please try again.");
//     }
//   }
// };

// window.onload = () => {
//   login();
// };


  //print image
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

    const selectedPlayersWithImages = playerOptions.filter(player => {
      return selectedPlayers.includes(player.value) && player.image !== '';
    });

    const [selectedPlayerImage, setSelectedPlayerImage] = useState('');

      const handlePlayerImageChange = selectedOption => {
        const player = playerOptions.find(player => player.value === selectedOption.value);
        if (player && player.image) {
          setSelectedPlayerImage(player.image);
        }
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
                  options={selectedPlayersWithImages}
                  placeholder="Selected players with images"
                  onChange={handlePlayerImageChange}
                />

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
              <div className="template__game">
             
              {selectedTeam && selectedTeam.label}&nbsp;
              vs&nbsp;
              {selectedOpponent && selectedOpponent.label}&nbsp;
              {selectedOpponentTeam && selectedOpponentTeam.label}
              </div>
              <div className="template__date">
                <span id="location">{selectedLocation}</span>-<span id="date">{formatDate(selectedDate)}</span>-<span id="time">{formatTime(selectedTime)}</span><span>Start</span>
              </div>
              <div className="template__team">
              <ul id="selectedPlayers">
                {selectedPlayers.map((player, index) => (
                  <li key={index}>
                    {player}
                    {isCaptain === index && ' (c)'}
                    {isWicketkeeper === index && ' (wk)'}
                  </li>
                ))}
              </ul>
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
 
export default Page;
