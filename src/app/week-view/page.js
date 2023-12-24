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
          link.download = 'template_image.png';
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
          weekDayDiv.style.display = 'block';
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
                
                {renderDayInputs()}

            </form>
  
  
  
  
              <button className="form__print" onClick={handlePrintImage}>Print Image</button>
            </div>
            <div className="template">
              <div className="template__background">
                <img src="./background/Background.png" alt="background"/>
              </div>
  
              <div className="template__content">
                <div className="template__logo">
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
  
              </div>
  
  
            </div>
          </div>
        </div>
      </main>
     );
}
 
export default WeekView;