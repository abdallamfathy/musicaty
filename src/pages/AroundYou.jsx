import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {Error  , SongCard , Loader} from "../components"
import { useGetSongsByCountryQuery } from '../redux/services/shazamCore';

const AroundYou = () => {
    const [country, setCountry] = useState("EG")
    const [loading, setLoading] = useState(true)
useEffect( () => {
    axios.get(`https://geo.ipify.org/api/v2/country?apiKey=at_3aOMmk2s0W3yUVFKqNg91qr10q1Ce
    `).then((res)=> setCountry(res?.data?.location?.country)).catch((err)=> console.log(err)).finally(()=>setLoading(false))
}, [country])
    
    const {data , isFetching , error} = useGetSongsByCountryQuery(country);
    const { isPlaying , activeSong} =  useSelector((state) => state.player)
    if(isFetching && loading) return <Loader title="Loading songs around you"/>
    if(error) return <Error/>
    return (
        <div className='flex flex-col'>
            <h2 className='font-bold text-3xl text-white text-left mt-4 mb-10'>Around you
            <span className='font-blavk'> EGYPT</span>
            </h2>
            <div className="flex flex-wrap sm:justify-start justify-center gap-8">
                {data?.map((song,i) => (
                    <SongCard 
                    key={song.key}
                    i={i}
                    isPlaying={isPlaying}
                    activeSong={activeSong}
                    data={data}
                    song={song}
                    />
                ))}
            </div>
        </div>
    )
};

export default AroundYou;
