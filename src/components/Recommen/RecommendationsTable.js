import React from "react";
import "./RecommendationsTable.css";

const RecommendationsTable = ({ currentWeather }) => {
  const getRecommendations = () => {
    if (!currentWeather) {
      return "Không có thông tin thời tiết.";
    }
    const temperature = currentWeather.main.temp;
    const weatherDescription = currentWeather.weather[0].description;

    const recommendations = {
      hot: "Trời hôm nay nóng, tốt nhất là ở nhà nằm điều hòa.",
      lightRain: "Trời mưa, hãy mang theo ô.",
      brokenClouds: "Mây rải rác.",
      cold: "Trời lạnh. Hãy mặc áo ấm.",
      clearSky: "Hôm nay bầu trời rất là đẹp.",
      overcastClouds: "Trời khả năng mưa, hãy mang theo ô khi ra ngoài.",
      default: "Không có đề suất cụ thể."
    };

    if (temperature > 30) {
      return recommendations.hot;
    } else if (weatherDescription.includes("light rain")) {
      return recommendations.lightRain;
    } else if (weatherDescription.includes("broken clouds")) {
      return recommendations.brokenClouds;
    } else if (temperature < 21) {
      return recommendations.cold;
    } else if (weatherDescription.includes("clear sky")) {
      return recommendations.clearSky;
    } else if (weatherDescription.includes("overcast clouds")) {
      return recommendations.overcastClouds;
    } else {
      return recommendations.default;
    }
  };


  return (
    <div className="recommendations">
      <h2>Đề suất cho bạn</h2>
      <p>{getRecommendations()}</p>
    </div>
  );
};

export default RecommendationsTable;
