import React, { useState } from "react";
import Search from "./components/search/search";
import CurrentWeather from "./components/current-weather/current-weather";
import Forecast from "./components/forecast/forecast";
import { WEATHER_API_URL, WEATHER_API_KEY } from "./components/api";
import RecommendationsTable from "./components/Recommen/RecommendationsTable";

import "./App.css";
function App() {
  // Sử dụng useState để quản lý trạng thái dữ liệu thời tiết hiện tại và dự báo
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [darkMode, setDarkMode] = useState(false); // Trạng thái Dark Mode
  // Hàm xử lý sự kiện khi tìm kiếm thay đổi
  const handleOnSearchChange = (searchData) => {

    // Tách lấy lat và lon từ giá trị tìm kiếm
    const [lat, lon] = searchData.value.split(" ");

    // Tạo yêu cầu API để lấy thông tin thời tiết hiện tại và dự báo
    const currentWeatherFetch = fetch(
      `${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    );
    const forecastFetch = fetch(
      `${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    );

    // Kết hợp hai yêu cầu API và xử lý kết quả
    Promise.all([currentWeatherFetch, forecastFetch])
      .then(async (response) => {
        // Lấy dữ liệu thời tiết hiện tại và dự báo từ các yêu cầu API
        const weatherResponse = await response[0].json();
        const forecastResponse = await response[1].json();
        // Cập nhật trạng thái dữ liệu thời tiết hiện tại và dự báo
        setCurrentWeather({ city: searchData.label, ...weatherResponse });
        setForecast({ city: searchData.label, ...forecastResponse });
      })
      .catch(console.log); // Xử lý lỗi (nếu có)
  };

  // Hàm xử lý sự kiện khi nhấn nút chuyển đổi Dark/Light mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };
  return (
  <div className={`container ${darkMode ? "dark-mode" : "light-mode"}`}>
  <div className="header">
    <button className="dark-mode-button" onClick={toggleDarkMode}>
      {darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
    </button>
    </div>
    <div className="search">
      <Search
        onSearchChange={handleOnSearchChange}
      />
    </div>
    {currentWeather && <CurrentWeather data={currentWeather} />}
    {forecast && <Forecast data={forecast} />}
    <div className="weather-section">
      {currentWeather && <RecommendationsTable currentWeather={currentWeather} />}
    </div>
  </div>
);
}
export default App;