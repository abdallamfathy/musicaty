import {  useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { DetailsHeader, Error, Loader, RelatedSongs } from "../components";
import { useGetArtistDetailsQuery, useGetSongDetailsQuery, useGetSongRelatedQuery } from "../redux/services/shazamCore";

const ArtistDetails = () => {

    const {id:artistId} = useParams()
    const {data:artistData , isFetching:isFetchingArtistDetails , error} = useGetArtistDetailsQuery(artistId)
    
    const {isPlaying ,activeSong} = useSelector((state) => state.player)


    if(isFetchingArtistDetails) return <Loader title="Searching song details"/>
    if(error) return <Error/>
    return (
        <div className="flex flex-col">
            <DetailsHeader
            artistId={artistId}
            artistData={artistData}
            />
          
            <RelatedSongs 
            data={Object.values(artistData?.songs)}
            artistId={artistId}
            isPlaying={isPlaying}
            activeSong={activeSong}
            />
        </div>
        )
};

export default ArtistDetails;
