import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { CiLocationArrow1 } from 'react-icons/ci'

import axios from 'axios';

function Dashboard() {
    const [city, setCity] = useState(null);
    const cityInput = React.createRef();
    const formInput = React.createRef();

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

    /* const descriptions = [
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
    ] */

    const submitCity = async (e) => {
        e.preventDefault();
        if (city === "" || city === " " || city === null) {
            setError(true);
            setErrorMessage("Please enter a city");
            return;
        }
        // setWeatherDetails(null);

        setError(false);
        setErrorMessage("no error");

        // console.log(cityInput.current?.value);
        // setCity(cityInput.current?.value);
        formInput.current.reset();

        await sendReceiveByAxios();

        // setDisplay();
    }

    const resetInputs = () => {
        setCity(null);
    }

    const [receivedOutput, setReceivedOutput] = useState(null);
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
                // resetInputs();
            }).catch(err => {
                setError(true);
                setErrorMessage(`Please check the city name (you entered "${city}")`);
                // console.warn(`Error: ${err.message}`);
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

        currentTemperature: 30.99,
        feelsLike: 32.0,

        description: "Haze",
        icon: "https://openweathermap.org/img/wn/50d@2x.png",

        windSpeed: 112.57,
        windDirectionIcon: 95,
        windDirection: 140,

        humidity: 84,

        visibility: 13500,

        timezone: new Date(1693052779 * 1000 - 19800 * 1000),
    });

    // const [weatherDetails, setWeatherDetails] = useState(null);
    const setDisplay = () => {
        if (receivedOutput === "x" || receivedOutput === "" || receivedOutput === null) return;
        // console.log(receivedOutput);

        let weatherTimezone = new Date(receivedOutput.dt * 1000 - receivedOutput.timezone * 1000);

        // let weatherIcon = `https://openweathermap.org/img/wn/${receivedOutput.weather[0].icon}@2x.png`;

        let windDirectionIcon = receivedOutput.wind.speed - 45;

        let description = receivedOutput.weather[0].description;
        description = description.replace(
            /\w\S*/g,
            function (txt) {
                return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
            }
        );

        setWeatherDetails({
            city: receivedOutput.name,

            currentTemperature: Number.parseFloat(receivedOutput.main.temp - 273.15).toFixed(2),
            feelsLike: Number.parseFloat(receivedOutput.main.feels_like - 273.15).toFixed(2),

            description: description,
            icon: `https://openweathermap.org/img/wn/${receivedOutput.weather[0].icon}@2x.png`,

            windSpeed: receivedOutput.wind.speed,
            windDirectionIcon: windDirectionIcon,
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
        <div className='flex-1 p-2 text-white relative'>
            <div className='mainContent flex flex-col items-stretch justify-start h-full'>
                <div className={`inputDiv`}>
                    <form ref={formInput} action="/sendCityName" onSubmit={submitCity} className={`lg:w-[30%] m-auto flex flex-row gap-5 justify-between items-center`}>
                        <input onChange={(e) => setCity(e.target.value)} type="text" list="cities"
                            placeholder='Start typing...' ref={cityInput}
                            className={`bg-[rgba(0,0,0,0)] px-6 py-4 border border-white rounded-xl`} />
                        <datalist id="cities">
                            {
                                cities.map((city, cityID) => {
                                    return <option key={cityID} value={city} />
                                })
                            }
                        </datalist>

                        <input type="submit" value="Submit"
                            className={`bg-[rgba(0,0,200,1.0)] p-4 px-6 rounded-xl cursor-pointer`} />
                    </form>
                </div>

                <div className={`outputDiv flex-1 flex lg:flex-col items-stretch justify-start`}>
                    {/* <p className='text-white'>sent: {city}</p> */}

                    {/* error */}
                    {
                        // error &&
                        <p className={`${error ? 'text-red-500' : 'text-[rgba(0,0,0,0)]'}`}
                        >{errorMessage}</p>
                    }

                    {/* temperature */}
                    <div className='flex flex-row lg:flex-col items-center justify-between mt-4 px-6 lg:px-2 py-4 lg:pb-1 bg-white bg-opacity-10 backdrop-blur-lg w-full lg:w-[20%] m-auto rounded-xl'>
                        <h1 className={`relative text-4xl lg:text-3xl ${weatherDetails ? 'text-white' : 'text-[rgba(0,0,0,0)]'}`}>
                            {weatherDetails ? weatherDetails.currentTemperature : 99}&deg;C
                            {/* <img className={`hidden lg:block`} src={weatherDetails?.icon} alt="" /> */}
                        </h1>
                        <div className='flex flex-col items-end lg:items-center justify-start'>
                            <p className={`p-0 m-0 ${weatherDetails ? 'text-white' : 'text-[rgba(0,0,0,0)]'}`}>
                                Feels like: {weatherDetails ? weatherDetails.feelsLike : 99}&deg;C
                            </p>
                            <p className={`p-0 m-0 lg:mt-2 text-gray-400`}>{weatherDetails ? weatherDetails.city : "City"}</p>
                        </div>
                    </div>

                    {/* other details */}
                    <div className={`mt-4 flex-1 flex lg:flex-row justify-between items-start`}>
                        {/* left side */}
                        <div className={`flex lg:flex-col items-stretch justify-start gap-5 w-[20%]`}>
                            <div className={`px-6 lg:px-4 py-4 bg-white bg-opacity-10 backdrop-blur-lg rounded-xl text-left`}>
                                <p className={`flex flex-row items-center justify-between`}>
                                    {weatherDetails ? weatherDetails.description : "Haze"}
                                    <img className={``} src={weatherDetails?.icon} width="40px" alt="" />
                                </p>
                            </div>
                            <div className={`px-6 lg:px-4 py-4 bg-white bg-opacity-10 backdrop-blur-lg rounded-xl text-left`}>
                                <div className={`flex flex-row items-center justify-between`}>
                                    <p className={`p-0 m-0`}>
                                        <span className={`text-[0.8em]`}>Wind speed </span><br />
                                        {weatherDetails ? weatherDetails.windSpeed : "999.99"}
                                    </p>
                                    <div className={`flex flex-col items-center justify-start`}>
                                        <CiLocationArrow1
                                            className={`rotate-[${weatherDetails?.windDirectionIcon}deg]`}
                                        />
                                        <p className='p-0 m-0 text-[0.8em]'>
                                            {weatherDetails?.windDirection}&deg;
                                        </p>
                                    </div>
                                </div>
                            </div>
                            {/* <div className={`px-6 lg:px-4 py-4 bg-white bg-opacity-10 backdrop-blur-lg rounded-xl text-left`}>
                                <p className={`flex flex-row items-center justify-between`}>
                                    <span>
                                        Humidity: </span>
                                    {weatherDetails ? weatherDetails.humidity : "100"}%
                                </p>
                            </div>
                            <div className={`px-6 lg:px-4 py-4 bg-white bg-opacity-10 backdrop-blur-lg rounded-xl text-left`}>
                                <p className={`flex flex-row items-center justify-between`}>
                                    <span>
                                        Visibility: </span>
                                    {weatherDetails ? weatherDetails.visibility : "99999"}
                                </p>
                            </div> */}
                        </div>

                        {/* center */}
                        <div className={`flex flex-col items-center justify-between px-6 lg:px-4 py-4 pt-1 bg-white bg-opacity-10 backdrop-blur-lg rounded-xl text-left`}>
                            <p className={`text-[0.8em] text-gray-400 mb-2`}>Recorded at</p>
                            <p>
                                {weatherDetails?.timezone.getHours()}:{weatherDetails?.timezone.getMinutes()}:{weatherDetails?.timezone.getSeconds()}  (GMT{(weatherDetails?.timezone.getTimezoneOffset()) / 60})
                            </p>
                            {/* <p>{weatherDetails?.timezone.toString()}</p> */}
                        </div>

                        {/* right side */}
                        <div className={`flex lg:flex-col items-stretch justify-start gap-5 w-[20%]`}>
                            <div className={`px-6 lg:px-4 py-4 bg-white bg-opacity-10 backdrop-blur-lg rounded-xl text-left`}>
                                <p className={`flex flex-row items-center justify-between`}>
                                    <span>Humidity: </span>
                                    {weatherDetails ? weatherDetails.humidity : "100"}%
                                </p>
                            </div>
                            <div className={`px-6 lg:px-4 py-4 bg-white bg-opacity-10 backdrop-blur-lg rounded-xl text-left`}>
                                <p className={`flex flex-row items-center justify-between`}>
                                    <span>
                                        Visibility: </span>
                                    {weatherDetails ? weatherDetails.visibility : "99999"}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className='absolute right-4 bottom-4'>
                <Link
                    to="/aboutme"
                    className='bg-[rgba(0,0,100,1.0)] p-4 rounded-xl flex flex-row items-center justify-center cursor-pointer text-white font-bold'
                >About Me</Link>
            </div>
        </div >
    )
}

export default Dashboard