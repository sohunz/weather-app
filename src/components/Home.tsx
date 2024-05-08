import { FiSearch } from "react-icons/fi";
import cloud from "../assets/cloud.png";
import wind from "../assets/wind.png";
import humidity from "../assets/humidity.png";
import { weatherConvert } from "../utils/weatherConvert";
import useWeather from "../hooks/useWeather";
import { ChangeEvent, useState } from "react";

const Home = () => {
    const [input, setInput] = useState<string>("");
    const [location, setLocation] = useState<string>("");
    const { weather, loading, error } = useWeather(location);

    const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setInput(e.target.value);
    };

    const handleSearch = () => {
        if (input.trim() !== "") {
            setLocation(input);
        }
        setInput("");
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    return (
        <div className="w-full h-screen bg-violet-900 flex flex-col items-center justify-center">
            <div className="max-w-[480px] min-w-[480px] pt-10 rounded-xl p-10  shadow bg-violet-800">
                <div className="w-full flex gap-3 justify-center items-center">
                    <input
                        className="appearance-none border-2 border-gray-200 rounded-full py-4 px-5 text-gray-800 leading-tight focus:outline-none bg-gray-200 focus:border-purple-500 focus:bg-white w-full"
                        type="text"
                        placeholder="Search"
                        value={input}
                        onChange={handleInput}
                    />
                    <div
                        className="border p-4 rounded-full bg-gray-200 cursor-pointer"
                        onClick={handleSearch}
                    >
                        <FiSearch size={23} />
                    </div>
                </div>
                <div className="flex flex-col justify-center items-center my-5">
                    <div className="max-w-[190px] mb-2">
                        <img src={cloud} alt="" />
                    </div>
                    <p className="text-white text-7xl font-bold mb-3">
                        {weatherConvert(weather.main?.temp)} °C
                    </p>
                    <p className="text-white text-4xl font-bold">
                        {weather.name}
                    </p>
                </div>
                <div className="flex items-center justify-between mt-10">
                    <div className="flex gap-2">
                        <div className="max-w-[30px] mt-2">
                            <img src={humidity} alt="" />
                        </div>
                        <div className="text-gray-300">
                            <p className="text-2xl font-semibold">
                                {weather.main?.humidity}%{" "}
                                {/* Render humidity */}
                            </p>
                            <p className="text-lg font-semibold">Humidity</p>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <div className="max-w-[35px] mt-[5px]">
                            <img src={wind} alt="" />
                        </div>
                        <div className="text-gray-300">
                            <p className="text-2xl font-semibold">
                                {weather.wind?.speed} km/h{" "}
                                {/* Render wind speed */}
                            </p>
                            <p className="text-lg font-semibold">Wind speed</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
