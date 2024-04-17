import React, { useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { lunchDetailState } from '../../atoms/lunchDetailAtom';
import { useRecoilState } from 'recoil';

function LunchDetail() {

  const [searchParams, setSearchParams] = useSearchParams();
  const [ lunchDetailData, setLunchDetailData] = useRecoilState(lunchDetailState);
  let lunchId2  = searchParams.get("lunchId")
  

  useEffect(() => {
    const result = lunchDetailData.filter(detailData => detailData.lunchId === parseInt(lunchId2))[0];
    console.log(result);
  },[lunchId2])

  return (
    <div>
      런치상세페이지
    </div>
  );
}

export default LunchDetail;