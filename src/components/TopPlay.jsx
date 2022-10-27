import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useGetTopChartsQuery } from "../redux/services/shazamCore";
import PlayPause from "./PlayPause"


const TopPlay = () => {
  
  const dispatch = useDispatch()
  const {data} = useGetTopChartsQuery()
  const devRef = useRef();
  const topPlays = data?.slice(0,5)
  useEffect(() => {
  devRef.current.scrollIntoView({ behavior : "smooth"})
  })
  
  
  return (
    <div ref={devRef}  className="xl:ml-6 ml-0 xl:mb-0 mb-6 flex-1 xl:max-w-[500px] max-w-full flex flex-col">
      <div className="w-full flex flex-col">
        <div className="flex flex-row justify-between items-center">
          <h2 className="text-white font-bold text-xl">
            Top Charts
          </h2>
          <Link to="/top-charts">
          <p className="text-gray-300 text-base cursor-pointer">See more</p>
          </Link>
        </div>
        <div className="mt-4 flex flex-col gap-1">
          {topPlays.map((song) => 
          <TopChartCard/>
          )} 
        </div>
      </div>
    </div>

  )
}
export default TopPlay;
