import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { playPause, setActiveSong } from "../redux/features/playerSlice";
import PlayPause from "./PlayPause"
const SongCard = ({song , i , activeSong , data , isPlaying}) => {  
  
  const dispatch = useDispatch()
  const handlePauseClick = () => {    
    dispatch(playPause(false))
  }

  const handlePlayClick = () => {
    dispatch(setActiveSong({song , data , i}));
    dispatch(playPause(true))
  }

  return (
  <div className="bg-white/5 w-[250px] bg-opacity-80 backdrop-blur-2xl rounded-lg animate-slideup cursor-pointer p-4">
    <div className="relative h-56 group w-full ">
      <div className={`absolute inset-0 justify-center items-center bg-opacity-50 group-hover:flex bg-black ${activeSong?.title === song.title ? 'flex bg-black bg-opacity-70' : 'hidden' }`}>
        <PlayPause 
        song={song}
        handlePause={handlePauseClick}
        handlePlay={handlePlayClick}
        isPlaying={isPlaying}
        activeSong={activeSong}
        />
      </div>
      <img src={song.images?.coverart} alt="song-img" />
    </div>
    <div className="flex flex-col mt-4">
    <p className="font-semibold text-white truncate text-lg">
    <Link to={`/songs/${song?.key}`}>
      {song.title}
      </Link>
    </p>
    <p className="text-sm truncate text-gray-300 mt-1">
    <Link to={song.artists ? `/artists/${song?.artists[0]?.adamid}` : "/top-artists"}>
      {song.subtitle}
      </Link>
    </p>
    </div>
  </div>
  )
  }

export default SongCard;
