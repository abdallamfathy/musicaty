import {loader} from "../assets"

const Loader = ({title}) => (
  <div className="flex flex-col justify-center w-full items-center">
    <img src={loader} alt="loading" className="w-32 h-32 object-contain" />
    <h1 className="text-white font-bold mt-2 text-2xl">{title || "Loading..."}</h1>
  </div>
);

export default Loader;
