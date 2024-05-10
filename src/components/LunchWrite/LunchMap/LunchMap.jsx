/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React, { useEffect, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import { BiSearch } from "react-icons/bi";
import {
  lunchMapPlaceUrlState,
  lunchMapTitlState,
  lunchMapXState,
  lunchMapYState,
} from "../../../atoms/luchMapAtom";
const { kakao } = window;

const searchBox = css`
  position: relative;
  box-sizing: border-box;
  margin-top: 9px;

  & > input {
    box-sizing: border-box;
    border: 2px solid #dbdbdb;
    border-radius: 5px;
    outline: none;
    padding: 10px 30px 10px 20px;
    width: 100%;
    cursor: pointer;
    font-size: 14px;
    font-weight: 600;
    color: #555555;
    letter-spacing: 1px;
  }

  & > button {
    position: absolute;
    transform: translateY(-50%);
    top: 53%;
    right: 40px;
    border: none;
    padding: 10px;
    background-color: transparent;
    cursor: pointer;
    color: #555555;
    &:hover {
      font-size: 15px;
    }
  }
`;

const layout = css`
  box-sizing: border-box;
  margin: 10px 0px;
  width: 100%;
`;

function LunchMap(props) {
  const [InputText, setInputText] = useState("");
  const [searchPlace, setSearchPlace] = useState("");
  const [placeName, setPlaceName] = useRecoilState(lunchMapTitlState);
  const [palceX, setPlaceX] = useRecoilState(lunchMapXState);
  const [palceY, setPlaceY] = useRecoilState(lunchMapYState);
  const [placeUrl, setPlaceUrl] = useRecoilState(lunchMapPlaceUrlState);

  useEffect(() => {
    // 마커를 클릭하면 장소명을 표출할 인포윈도우 입니다
    let infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });

    let mapContainer = document.getElementById("map"), // 지도를 표시할 div
      mapOption = {
        center: new kakao.maps.LatLng(35.1524189997862, 129.059591845352), // 지도의 중심좌표
        level: 3, // 지도의 확대 레벨
      };

    // 지도를 생성합니다
    let map = new kakao.maps.Map(mapContainer, mapOption);

    // 장소 검색 객체를 생성합니다
    let ps = new kakao.maps.services.Places();

    // 키워드로 장소를 검색합니다
    ps.keywordSearch(searchPlace, placesSearchCB);

    // 키워드 검색 완료 시 호출되는 콜백함수 입니다
    function placesSearchCB(data, status, pagination) {
      if (status === kakao.maps.services.Status.OK) {
        // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
        // LatLngBounds 객체에 좌표를 추가합니다
        let bounds = new kakao.maps.LatLngBounds();

        for (let i = 0; i < data.length; i++) {
          displayMarker(data[i]);
          bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
        }

        // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
        map.setBounds(bounds);
      }
    }

    // 지도에 마커를 표시하는 함수입니다
    function displayMarker(place) {
      // 마커를 생성하고 지도에 표시합니다
      let marker = new kakao.maps.Marker({
        map: map,
        position: new kakao.maps.LatLng(place.y, place.x),
      });

      // 마커에 클릭이벤트를 등록합니다
      kakao.maps.event.addListener(marker, "click", function () {
        // 마커를 클릭하면 장소명이 인포윈도우에 표출됩니다
        infowindow.setContent(
          '<div style="padding:5px;font-size:12px;">' +
            place.place_name +
            "</div>"
        );
        infowindow.open(map, marker);
        console.log(place);
        setPlaceX(parseFloat(place.x));
        setPlaceY(parseFloat(place.y));
        setPlaceName(place.place_name);
        setPlaceUrl(place.place_url);
      });
    }
  }, [searchPlace]);

  const onChange = (e) => {
    setInputText(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSearchPlace(InputText);
    setInputText("");
  };

  return (
    <>
      <form className="inputForm" onSubmit={handleSearchSubmit}>
        <div css={searchBox}>
          <input
            placeholder="검색어를 입력하세요"
            onChange={onChange}
            value={InputText}
          />
          <button type="submit">
            <BiSearch />
          </button>
        </div>
      </form>
      <div css={layout}>
        <div
          id="map"
          style={{
            boxSizing: "border-box",
            border: "2px solid #dbdbdb",
            borderRadius: "5px",
            width: "100%",
            height: "350px",
          }}
        ></div>
      </div>
    </>
  );
}

export default LunchMap;
