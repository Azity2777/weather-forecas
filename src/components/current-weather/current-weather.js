import "./current-weather.css";
// Component CurrentWeather nhận dữ liệu qua props
const CurrentWeather = ({ data }) => {
  return (
    <div className="weather">
      <div className="top">
        <div>
          {/* Hiển thị tên thành phố */}
          <p className="city">{data.city}</p>
          {/* Hiển thị mô tả thời tiết */}
          <p className="weather-description">{data.weather[0].description}</p>
        </div>
        {/* Hiển thị biểu tượng thời tiết */}
        <img
          alt="weather"
          className="weather-icon"
          src={`icons/${data.weather[0].icon}.png`}
        />
      </div>
      <div className="bottom">
        {/* Hiển thị nhiệt độ */}
        <p className="temperature">{Math.round(data.main.temp)}°C</p>
        <div className="details">
          <div className="parameter-row">
            {/* Hiển thị tiêu đề "Chi tiết" */}
            <span className="parameter-value">Chi tiết:</span>
          </div>
          <div className="parameter-row">
            {/* Hiển thị tiêu đề và nhiệt độ cảm nhận */}
            <span className="parameter-label">Nhiệt độ</span>
            <span className="parameter-value">
              {Math.round(data.main.feels_like)}°C
            </span>
          </div>
          <div className="parameter-row">
            {/* Hiển thị tiêu đề và tốc độ gió */}
            <span className="parameter-label">Gió</span>
            <span className="parameter-value">{data.wind.speed} m/s</span>
          </div>
          <div className="parameter-row">
            {/* Hiển thị tiêu đề và độ ẩm */}
            <span className="parameter-label">Độ ẩm</span>
            <span className="parameter-value">{data.main.humidity}%</span>
          </div>
          <div className="parameter-row">
            {/* Hiển thị tiêu đề và áp suất khí quyển */}
            <span className="parameter-label">Áp suất</span>
            <span className="parameter-value">{data.main.pressure} hPa</span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CurrentWeather;
