import axios from "axios";
import { useEffect, useState } from "react";

interface WeatherData {
    main?: {
        temp?: number;
        humidity?: number;
    };
    name?: string;
    wind?: {
        speed?: number;
    };
}

const useWeather = () => {
    const [weather, setWeather] = useState<WeatherData>({});
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get<WeatherData>(
                    "https://api.openweathermap.org/data/2.5/weather?lat=12.56&lon=104.99&appid=df699052a60bb59357d7334dd736c06e"
                );
                setWeather(response.data);
                setLoading(false);
            } catch (error: any) {
                setError(error.message);
                setLoading(false);
            }
        };

        fetchData();
    }, []);
    return { weather, loading, error };
};

export default useWeather;
