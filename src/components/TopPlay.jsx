import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FreeMode } from "swiper";
import {Swiper  , SwiperSlide } from "swiper/react";
import 'swiper/css';
import 'swiper/css/free-mode';
import { useGetTopChartsQuery } from "../redux/services/shazamCore";
import PlayPause from "./PlayPause"
import { playPause, setActiveSong } from "../redux/features/playerSlice";


const TopChartCard = ({song , i , handlePauseClick , handlePlayClick , activeSong , isPlaying})=>(
  <div className="w-full flex flex-row items-center hover:bg-[#4c426e] py-2 p-4 rounded-lg cursor-pointer mb-2">
    <h3 className="font-bold text-white m-3 text-base">{i + 1}.</h3>
    <div className="flex-1 flex flex-row justify-between">
      <img className="rounded-lg w-20 h-20" src={song?.images?.coverart} alt={song?.title} />
      <div className="flex-1 flex flex-col justify-center mx-3">
      <Link to={`/songs/${song?.key}`}>
      <p className="text-white text-xl font-bold">{song?.title}</p>
      </Link>
      <Link to={`/artists/${song?.artists[0].adamid}`}>
      <p className="text-gray-300 text-base mt-1 ">{song?.subtitle}</p>
      </Link>
      </div>
    </div>
    <PlayPause
    isPlaying={isPlaying}
    activeSong={activeSong}
    song={song}
    handlePause={handlePauseClick}
    handlePlay={handlePlayClick}
    />
  </div>
)

const TopPlay = () => {
  
  const dispatch = useDispatch()
  const {data} = useGetTopChartsQuery()
  const devRef = useRef();
  const topPlays = data?.slice(0,5)

  const handlePauseClick = (song,i) => {    
    dispatch(playPause(false))
  }

  const handlePlayClick = (song,i) => {
    dispatch(setActiveSong({song , data , i}));
    dispatch(playPause(true))
  }

  useEffect(() => {
  devRef.current.scrollIntoView({ behavior : "smooth"})
  })
  
  const {isPlaying , activeSong} = useSelector((state) => state.player)
  
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
          {topPlays?.map((song , i) => 
          <TopChartCard
          song={song}
          i={i}
          key={song.key}
          isPlaying={isPlaying}
          activeSong={activeSong}
          handlePauseClick={() => handlePauseClick(song,i)}
          handlePlayClick={() => handlePlayClick(song,i)}
          />
          )} 
        </div>
      </div>
      
      {/* // Top Artists */}
      <div className="w-full flex flex-col mt-8">
      <div className="flex flex-row justify-between items-center">
          <h2 className="text-white font-bold text-xl">
            Top Artists
          </h2>
          <Link to="/top-artists">
          <p className="text-gray-300 text-base cursor-pointer">See more</p>
          </Link>
        </div>
        <Swiper
          slidesPerView="auto"
          spaceBetween={15}
          freeMode
          centeredSlides
          centeredSlidesBounds
          modules={[FreeMode]}
          className="mt-4"
        >
          {topPlays?.map((song,i)=>(
            <SwiperSlide key={song?.key}
            style={{width:"25%" , height:"auto"}}
            className="shadow-lg rounded-full animate-slideright"

            >
              <Link to={`/artists/${song?.artists[0].adamid}`}>
                <img src={song?.images.background} alt="name" 
                className="rounded-full w-full object-cover"/>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>

  )
}
export default TopPlay;
