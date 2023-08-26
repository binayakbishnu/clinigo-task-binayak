import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import axios from 'axios';

function Dashboard() {
    const [city, setCity] = useState("");
    const cityInput = React.createRef();

    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("no error");

    const cities = [
        "New Delhi",
        "Mumbai",
        "Bangalore",
        "Kolkata",
        "Chennai",
        "London",
        // "Manchester",
        // "Edinburgh",
        "Birmingham",
        // "Liverpool",
        "New York City",
        "Los Angeles",
        // "Chicago",
        // "Miami",
        "San Francisco",
        "Paris",
        // "Marseille",
        // "Lyon",
        // "Toulouse",
        // "Nice",
        "Tokyo",
        // "Osaka",
        // "Kyoto",
        // "Sapporo",
        // "Hiroshima",
        "Sydney",
        "Melbourne",
        // "Brisbane",
        // "Perth",
        // "Adelaide",
        "Berlin",
        "Munich",
        // "Hamburg",
        // "Frankfurt",
        // "Cologne",
        "Beijing",
        "Shanghai",
        // "Guangzhou",
        // "Chengdu",
        // "Xi'an",
        // "São Paulo",
        // "Rio de Janeiro",
        // "Brasília",
        // "Salvador",
        // "Fortaleza",
        "Moscow",
        // "St. Petersburg",
        // "Novosibirsk",
        // "Yekaterinburg",
        // "Kazan",
    ]

    const descriptions = [
        "clear sky",
        "few clouds",
        "scattered clouds",
        "broken clouds",
        "overcast clouds",
        "mist",
        "fog",
        "haze",
        "light rain",
        "moderate rain",
        "heavy rain",
        "drizzle",
        "light snow",
        "moderate snow",
        "heavy snow",
        "thunderstorm",
        "light thunderstorm",
        "heavy thunderstorm",
        "showers",
        "snow showers",
    ]

    const submitCity = async (e) => {
        e.preventDefault();
        setWeatherDetails(null);
        if (city === "" || city === " ") {
            setError(true);
            setErrorMessage("Please enter a city");
            return;
        }

        setError(false);
        setErrorMessage("no error");

        // console.log(cityInput.current?.value);
        setCity(cityInput.current?.value);

        await sendReceiveByAxios();

        // setDisplay();
    }

    const [receivedOutput, setReceivedOutput] = useState("x");
    const sendReceiveByAxios = async () => {
        try {
            /* await axios.post(`http://localhost:8000/sendCityName`, {
                name: city,
            }).then(res => {
                console.log(`${res.status !== 200 ? 'from backend: Backend error' : `from backend: ${res.data}`}`);
                // if (res.data.name === city) {
                //     // all was okay
                //     setReceivedOutput(res.data);
                //     console.log("all okay");
                // }
                // else {
                //     console.warn(`not: same: ${city} ${res.data.name}`);
                // }
                setReceivedOutput(res.data);
                console.log("all okay");
            }).catch(e => {
                console.log(`frontend: axios error: ${e}`)
            }).finally(() => {
                console.log('frontend: axios completed successfully');
            }) */

            await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${'079f46de460e5a2e043e8f5911cd10e6'}`
            ).then(res => {
                setReceivedOutput(res.data);
            }).catch(err => {
                setError(true);
                setErrorMessage(`Please check the city name (you entered "${city}")`);
                // console.warn(`Error: ${err.message}`);
                setError(err.message);
            }).finally(() => {
                // console.log(`axios successfully completed`);
            });
        }
        catch (error) {
            // console.log(`frontend: ${error}`);
            setError(true);
            setErrorMessage(error.message);
        }
    }

    const [weatherDetails, setWeatherDetails] = useState({
        city: "Kolkata",

        currentTemperature: 30.0,
        feelsLike: 32.0,

        description: "sunny",
        icon: "https://www.flaticon.com/free-icon/weather_1555512",

        windSpeed: 2.57,
        windDirection: 140,

        humidity: 84,

        visibility: 3500,

        timezone: `${new Date(1693052779 * 1000 - 19800 * 1000)}`,
    });

    // const [weatherDetails, setWeatherDetails] = useState(null);
    const setDisplay = () => {
        if (receivedOutput === "x" || receivedOutput === "" || receivedOutput === null) return;
        // console.log(receivedOutput);

        let weatherTimezone = `${new Date(receivedOutput.dt * 1000 - receivedOutput.timezone * 1000)}`;

        let weatherIcon = `https://openweathermap.org/img/wn/${receivedOutput.weather[0].icon}@2x.png`,
            weatherTemp = receivedOutput.main.temp - 273.15;

        weatherTemp = Number.parseFloat(weatherTemp).toFixed(2);

        setWeatherDetails({
            city: receivedOutput.name,

            currentTemperature: receivedOutput.main.temp - 273.15,
            feelsLike: receivedOutput.main.feels_like,

            description: receivedOutput.weather[0].description,
            icon: weatherIcon,

            windSpeed: receivedOutput.wind.speed,
            windDirection: receivedOutput.wind.deg,

            humidity: receivedOutput.main.humidity,

            visibility: receivedOutput.visibility,

            timezone: weatherTimezone,
        })
    }

    useEffect(() => {
        setDisplay();
    }, [receivedOutput]);

    return (
        <div className='flex-1 p-2 bg-[rgba(0,0,25,1.0)] text-white relative'>
            <div className='mainContent flex flex-col items-stretch justify-start'>
                <div className={`inputDiv`}>
                    <form action="/sendCityName" onSubmit={submitCity} className={`lg:w-[30%] m-auto flex flex-row gap-5 justify-between items-center`}>
                        <input onChange={(e) => setCity(e.target.value)} type="text" list="cities" placeholder='Start typing...' ref={cityInput}
                            className={`bg-[rgba(0,0,0,0)] px-6 py-4 border border-white rounded-xl`} />
                        <datalist id="cities">
                            {
                                cities.map((city, cityID) => {
                                    return <option key={cityID} value={city} />
                                })
                            }
                            {/* <option value="Kolkata" />
                            <option value="Bangalore" />
                            <option value="Chennai" />
                            <option value="Mumbai" />
                            <option value="Delhi" /> */}
                        </datalist>

                        <input type="submit" value="Submit"
                            className={`bg-[rgba(0,0,200,1.0)] p-4 px-6 rounded-xl cursor-pointer`} />
                    </form>
                </div>

                <div className={`outputDiv mt-[4%]`}>
                    {/* <p className='text-white'>sent: {city}</p> */}
                    {
                        // error &&
                        <p className={`${error ? 'text-red-500' : 'text-[rgba(0,0,0,0)]'}`}
                        >{errorMessage}</p>
                    }

                    {
                        weatherDetails &&
                        <div className={`outputContent mt-[2%] w-[90%] m-auto bg-[rgba(0,0,200,1.0)] rounded-xl min-h-[20vh] p-5`}>
                            {/* <p className='text-white'>received: {weatherDetails && weatherDetails.city}</p> */}
                            <div className={`w-full text-left ms-5`}>
                                <ul>
                                    {
                                        Object.keys(weatherDetails).map((key, index) => {
                                            return <li key={index}>{key}: {weatherDetails[key]}</li>
                                        })
                                    }
                                    {/* <li>Current Temperature: {weatherDetails.currentTemperature}</li>
                                    <li>Description: {weatherDetails.description}</li>
                                    <li>Wind Speed: {weatherDetails.windSpeed}</li>
                                    <li>Humidity: {weatherDetails.humidity}</li> */}
                                </ul>
                            </div>
                        </div>
                    }

                </div>
            </div>

            <div className='absolute right-4 bottom-4'>
                <Link
                    to="/aboutme"
                    className='bg-[rgba(0,0,100,1.0)] p-4 rounded-xl flex flex-row items-center justify-center cursor-pointer text-white font-bold'
                >About Me</Link>
            </div>
        </div>
    )
}

export default Dashboard