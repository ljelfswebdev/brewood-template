"use client"

import html2canvas from "html2canvas";
import { useState, useEffect } from "react";
import Select from 'react-select';

const WeekView = () => {

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

      //week start

      const [selectedWeekStart, setSelectedWeekStart] = useState('');

      const formatWeekStartDate = date => {
        const formattedWeekStartDate = new Date(date).toLocaleDateString('en-GB', {
          day: '2-digit',
          month: '2-digit',
          year: '2-digit',
        });
  
        return formattedWeekStartDate;
      };
  
      const handleWeekStartChange = e => {
        const selectedWeekStartValue = e.target.value;
        setSelectedWeekStart(selectedWeekStartValue);
  
        const formattedWeekStartDate = formatWeekStartDate(selectedWeekStartValue);
      };

      //week end

      const [selectedWeekEnd, setSelectedWeekEnd] = useState('');

      const formatWeekEndDate = date => {
        const formattedWeekEndDate = new Date(date).toLocaleDateString('en-GB', {
          day: '2-digit',
          month: '2-digit',
          year: '2-digit',
        });
  
        return formattedWeekEndDate;
      };
  
      const handleWeekEndChange = e => {
        const selectedWeekEndValue = e.target.value;
        setSelectedWeekEnd(selectedWeekEndValue);
  
        const formattedWeekEndDate = formatWeekEndDate(selectedWeekEndValue);
      };

      const handleDayInputChange = (event, day) => {
        const inputVal = event.target.value;
        const weekDayDiv = document.getElementById(day);
        
        if (inputVal && weekDayDiv) {
          weekDayDiv.style.display = 'flex';
          weekDayDiv.innerHTML = `
            <div>${day}</div>
            <span>${inputVal}</span>
          `;
        } else if (weekDayDiv) {
          weekDayDiv.style.display = 'none';
        }
      };

      const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

    const renderDayInputs = () => {
    return daysOfWeek.map((day) => (
        <div key={day} className="form__day">
        <span className="form__title">
            {day}
        </span>
        <textarea onChange={(event) => handleDayInputChange(event, day.toLowerCase())}></textarea>
        </div>
    ));
    };

    const renderDayDivs = () => {
        return daysOfWeek.map((day) => (
            <div key={day} className="template__week-day" id={day.toLowerCase()}></div>
        ));
    }


    return ( 
        <main className="brewood">
        <div className="container">
          <div className="content">
            <div className="form">
            <form>
                <div class="form__date-start">
                    <span className="form__title">
                        Week Start
                    </span>
                <input
                    type="date"
                    id="date-select"
                    value={selectedWeekStart}
                    onChange={handleWeekStartChange}
                  />
                </div>
                <div className="form__date-end">
                <span className="form__title">
                        Week End
                    </span>
                <input
                    type="date"
                    id="date-select"
                    value={selectedWeekEnd}
                    onChange={handleWeekEndChange}
                  />
                </div>
                
                <span>To create a new event on a day, you must add '&lt;br&gt;' to the end of the line</span>
                {renderDayInputs()}

            </form>
  
  
  
              <button className="form__print" onClick={handlePrintImage}>Print Image</button>
            </div>
            <div className="template">
              <div className="template__background">
                <img src="./background/Background.png" alt="background"/>
              </div>
  
              <div className="template__content">
                <div className="template__logo template__logo--week-view">
                  <img src="./logo.png" alt="logo"/>
                </div>
                <div class="template__week-dates">
                <span>{formatWeekStartDate(selectedWeekStart)}</span> - <span>{formatWeekEndDate(selectedWeekEnd)}</span> 
                </div>

                <div className="template__week">
                {renderDayDivs()}
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
                <div className="template__socials">
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
        </div>
      </main>
     );
}
 
export default WeekView;