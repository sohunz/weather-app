import { FiSearch } from "react-icons/fi";
import cloud from "../assets/cloud.png";
import wind from "../assets/wind.png";
import clear from "../assets/clear.png";
import drizzle from "../assets/drizzle.png";
import rain from "../assets/rain.png";
import snow from "../assets/snow.png";
import humidity from "../assets/humidity.png";
import { weatherConvert } from "../utils/weatherConvert";
import useWeather from "../hooks/useWeather";
import { ChangeEvent, useState } from "react";
import { provinces } from "../data/provinces";

const Home = () => {
    const [input, setInput] = useState<string>("");
    const [location, setLocation] = useState<string>("");
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const { weather, loading, error } = useWeather(location);

    console.log(weather);

    const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value);
        const filteredSuggestions = provinces.filter((province) =>
            province.toLowerCase().includes(e.target.value.toLowerCase())
        );
        setSuggestions(filteredSuggestions);
    };

    const handleSearch = (province: string) => {
        setLocation(province);
        setInput("");
        setSuggestions([]);
    };

    const z = weather && weather.weather;
    const data = z && z.map((i: any) => i.main);
    const detail = z && z.map((i: any) => i.description);
    const weatherDetail = detail && detail.length > 0 ? detail[0] : "";

    const weathers = (data: any) => {
        if (data) {
            switch (data[0]) {
                case "Clouds":
                    return <img src={cloud} alt="" />;
                case "Clear":
                    return <img src={clear} alt="" />;
                case "Haze":
                    return <img src={drizzle} alt="" />;
                case "Rain":
                    return <img src={rain} alt="" />;
                case "Snow":
                    return <img src={snow} alt="" />;
                default:
                    return null;
            }
        }
        return null;
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    return (
        <div className="w-full h-screen bg-violet-900 flex flex-col items-center justify-center overflow-hidden">
            <div className="max-w-[480px] lg:min-w-[480px] min-w-[300px] pt-10 rounded-xl lg:p-10 md:p-5 sm:p-5 p-5  shadow bg-violet-800 overflow-hidden">
                <div className="w-full flex gap-2 justify-center items-center relative">
                    <input
                        className="appearance-none shadow-md border-violet-500 rounded-full py-5 px-5 text-white leading-tight focus:outline-none bg-violet-700 focus:border-violet-500 focus:bg-violet-600 w-full"
                        type="text"
                        placeholder="Search"
                        value={input}
                        onChange={handleInput}
                    />
                    <div
                        className="shadow-md p-5 rounded-full bg-violet-600 hover:bg-violet-700 cursor-pointer transition-all duration-300"
                        onClick={() => handleSearch(input)}
                    >
                        <FiSearch size={23} color="white" />
                    </div>
                    <div className="w-[320px] mr-16 top-16 absolute bg-violet-700 text-black rounded-lg overflow-hidden transition-all duration-300">
                        {suggestions.map((suggestion, index) => (
                            <div
                                key={index}
                                className="cursor-pointer text-white hover:bg-violet-600 p-2 transition-all duration-200"
                                onClick={() => handleSearch(suggestion)}
                            >
                                <p className="pl-3 text-white">{suggestion}</p>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="flex flex-col justify-center items-center">
                    <div className="max-w-[170px] mb-2">{weathers(data)}</div>
                    <p className="text-white text-xl pb-3">{weatherDetail}</p>
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
                                {weather.main?.humidity}%
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
                                {weather.wind?.speed} km/h
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
