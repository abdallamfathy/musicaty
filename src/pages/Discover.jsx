import { useDispatch, useSelector } from "react-redux";
import {genres} from "../assets/constants.js"
import {Error, Loader, SongCard} from "../components"
import { selectGenreListId } from "../redux/features/playerSlice.js";
import { useGetSongsByGenreQuery, useGetTopChartsQuery } from "../redux/services/shazamCore.js";

const Discover = () => {
    const dispatch = useDispatch();
    const { activeSong , isPlaying , genreListId } = useSelector((state)=>state.player)

    const { data , error , isFetching} = useGetSongsByGenreQuery(genreListId || "POP");
    
    if(isFetching) return <Loader title="Loading songs..."/>
    if(error) return <Error/>

    const genreTitle = genres.find(({value}) => value === genreListId)?.title;

    return (
        <div className="flex flex-col">
            <div className="flex flex-col justify-between items-center w-full sm:flex-row mt-4 mb-10">
                <h2 className="font-bold text-white text-3xl ">Discover {genreTitle}</h2>
                <select 
                onChange={(e)=>{dispatch(selectGenreListId(e.target.value)) }}
                value={genreListId || "pop"}
                className="rounded-lg text-sm bg-black text-white outline-none p-3">{genres.map((genre)=> <option value={genre.value} key={genre.value}>{genre.title}</option>)}</select>
            </div>

            <div className="flex flex-wrap justify-center sm:justify-start gap-8 text-white">
                {data?.map((song,idx)=>(
                    <SongCard
                    key={song.key}
                    song={song}
                    i={idx}
                    isPlaying={isPlaying}
                    activeSong={activeSong}
                    data={data}
                    />
                ))}
            </div>
        </div>
    )
};

export default Discover;
