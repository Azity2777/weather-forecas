import React, { useState } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from "react-accessible-accordion";
import "./forecast.css";
// Mảng các ngày trong tuần
const WEEK_DAYS = ["Thứ Hai", "Thứ Ba", "Thứ Tư", "Thứ Năm", "Thứ Sáu", "Thứ Bảy", "Chủ Nhật"];

const Forecast = ({ data }) => {
  const [daysToShow, setDaysToShow] = useState(3); // Mặc định hiển thị 3 ngày
  // Lấy ngày trong tuần hiện tại
  const dayInAWeek = new Date().getDay();
  // Tạo danh sách ngày dự báo trong tuần
  const forecastDays = WEEK_DAYS.slice(dayInAWeek, WEEK_DAYS.length).concat(WEEK_DAYS.slice(0, dayInAWeek));

  return (
    <>
      <div>
        <br></br>
        <label className="title">Dự báo thời tiết các ngày tiếp theo</label>
                <br></br>                                                                                      
                 <br></br>                                                                                      
        <div className="options">
          <select
            value={daysToShow}
            onChange={(e) => setDaysToShow(parseInt(e.target.value))}
          >
            {[1, 2, 3, 4, 5, 6, 7].map((days) => (
              <option key={days} value={days}>
                {days} ngày
              </option>
            ))}
          </select>
        </div>
      </div>
      <Accordion allowZeroExpanded>
        {data.list.slice(0, daysToShow).map((item, idx) => (
          <AccordionItem key={idx}>
            <AccordionItemHeading>
              <AccordionItemButton>
                <div className="daily-item">
                  {/* Hiển thị biểu tượng thời tiết */}
                  <img src={`icons/${item.weather[0].icon}.png`} className="icon-small" alt="weather" />
                  {/* Hiển thị tên ngày và mô tả thời tiết */}
                  <label className="day">{forecastDays[idx]}</label>
                  <label className="description">{item.weather[0].description}</label>
                  {/* Hiển thị nhiệt độ tối đa và tối thiểu */}
                  <label className="min-max">{Math.round(item.main.temp_max)}°C / {Math.round(item.main.temp_min)}°C</label>
                </div>
              </AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel>
              <div className="daily-details-grid">
                <div className="daily-details-grid-item">
                  <label>Áp suất</label>
                  <label>{item.main.pressure}hPa</label>
                </div>
                <div className="daily-details-grid-item">
                  <label>Độ ẩm</label>
                  <label>{item.main.humidity}%</label>
                </div>
                <div className="daily-details-grid-item">
                  <label>Mây</label>
                  <label>{item.clouds.all}%</label>
                </div>
                <div className="daily-details-grid-item">
                  <label>Gió</label>
                  <label>{item.wind.speed} m/s</label>
                </div>
                <div className="daily-details-grid-item">
                  <label>Mực nước biển</label>
                  <label>{item.main.sea_level}m</label>
                </div>
                <div className="daily-details-grid-item">
                  <label>Nhiệt độ cảm nhận</label>
                  <label>{item.main.feels_like}°C</label>
                </div>
              </div>
            </AccordionItemPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </>
  );
};

export default Forecast;
