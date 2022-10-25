import {genres} from "../assets/constants.js"
import {SongCard} from "../components"

const Discover = () => {
    console.log(genres);
    return (
        <div className="flex flex-col">
            <div className="flex flex-col justify-between items-center w-full sm:flex-row mt-4 mb-10">
                <h2 className="font-bold text-white text-3xl ">Discover</h2>
                <select 
                onChange={()=>{ }}
                className="rounded-lg text-sm bg-black text-white outline-none p-3">{genres.map((genre)=> <option value={genre.value} key={genre.value}>{genre.title}</option>)}</select>
            </div>

            <div className="flex flex-wrap justify-center sm:justify-start gap-8 text-white">
                {[1,2,3,4,5,6,7,8].map((song,idx)=>(
                    <SongCard
                    key={song.key}
                    song={song}
                    i={idx}
                    />
                ))}
            </div>
        </div>
    )
};

export default Discover;
