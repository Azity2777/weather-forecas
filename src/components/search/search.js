import React, { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { geoApiOptions, GEO_API_URL } from "../api";
import "./search.css";

const Search = ({ onSearchChange }) => {
  // Tạo state 'search' để lưu trạng thái tìm kiếm
  const [search, setSearch] = useState(null);
  // Hàm 'loadOptions' sẽ được sử dụng để tải các lựa chọn tìm kiếm dựa trên giá trị nhập
  const loadOptions = (inputValue) => {
    return fetch(
      // Gửi yêu cầu tới API để lấy danh sách các thành phố có dân số > 100.000 và có tên chứa 'inputValue'
      `${GEO_API_URL}/cities?minPopulation=100000&namePrefix=${inputValue}`,
      geoApiOptions
    )
      .then((response) => response.json())
      .then((response) => {
        return {
          // Trả về danh sách các lựa chọn dưới dạng đối tượng có các thuộc tính 'value' và 'label'
          options: response.data.map((city) => {
            return {
              value: `${city.latitude} ${city.longitude}`,
              label: `${city.name}, ${city.countryCode}`,
            };
          }),
        };
      });
  };
  
  // Hàm 'handleOnChange' được gọi khi giá trị tìm kiếm thay đổi
  const handleOnChange = (searchData) => {
    // Cập nhật trạng thái 'search' với giá trị tìm kiếm mới
    setSearch(searchData);
    // Gọi hàm 'onSearchChange' mà bạn truyền từ component cha và truyền giá trị tìm kiếm đó
    onSearchChange(searchData);
  };

  return (
    <div className="search">
    <AsyncPaginate
      placeholder="Tìm kiếm vị trí"
      debounceTimeout={600} // Thời gian trễ trước khi tìm kiếm được gửi
      value={search} // Giá trị hiện tại của thanh tìm kiếm
      onChange={handleOnChange} // Hàm được gọi khi giá trị tìm kiếm thay đổi
      loadOptions={loadOptions} // Hàm để tải danh sách lựa chọn
    />
    </div>
  );
};

export default Search;