import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import axios from 'axios';

function Dashboard() {
    const [city, setCity] = useState("");
    const cityInput = React.createRef();

    const [error, setError] = useState(true);
    const [errorMessage, setErrorMessage] = useState("no error");

    const submitCity = async (e) => {
        e.preventDefault();

        console.log(cityInput.current?.value);
        setCity(cityInput.current?.value);

        await sendReceiveByAxios();

        // setDisplay();
    }

    const [receivedOutput, setReceivedOutput] = useState("x");
    const sendReceiveByAxios = async () => {
        try {
            await axios.post(`http://localhost:8000/sendCityName`, {
                name: city,
            }).then(res => {
                console.log(`${res.status != 200 ? 'from backend: Backend error' : `from backend: ${res.data}`}`);
                if (res.data.city === city) {
                    // all was okay
                    setReceivedOutput(res.data);
                    console.log("all okay");
                }
                else {
                    console.warn(`not: same: ${city} ${res.data.city}`);
                }
            }).catch(e => {
                console.log(`frontend: axios error: ${e}`)
            }).finally(() => {
                console.log('frontend: axios completed successfully');
            })
        }
        catch (e) {
            console.log(`frontend: ${e}`);
        }
    }

    const [weatherDetails, setWeatherDetails] = useState("x");
    const setDisplay = () => {
        if (receivedOutput === "x") return;
        console.log(receivedOutput);
        setWeatherDetails({
            city: receivedOutput.city,
            currentTemperature: receivedOutput.temp,
            description: receivedOutput.description,
            windSpeed: receivedOutput.windSpeed,
            humidity: receivedOutput.humidity,
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
                            <option value="Kolkata" />
                            <option value="Bangalore" />
                            <option value="Chennai" />
                            <option value="Mumbai" />
                            <option value="Delhi" />
                        </datalist>

                        <input type="submit" value="Submit"
                            className={`bg-[rgba(0,0,200,1.0)] p-4 px-6 rounded-xl cursor-pointer`} />
                    </form>
                </div>

                <div className={`outputDiv mt-[4%]`}>
                    <p className='text-white'>sent: {city}</p>
                    {
                        error &&
                        <p className={`text-red-500`}>{errorMessage}</p>
                    }

                    <div className={`outputContent mt-[2%] w-[90%] m-auto bg-[rgba(0,0,200,1.0)] rounded-xl min-h-[20vh] p-5`}>
                        <p className='text-white'>received: {weatherDetails.city}</p>
                        {
                            weatherDetails &&
                            <div className={`w-full text-left ms-5`}>
                                <ul>
                                    <li>Current Temperature: {weatherDetails.currentTemperature}</li>
                                    <li>Description: {weatherDetails.description}</li>
                                    <li>Wind Speed: {weatherDetails.windSpeed}</li>
                                    <li>Humidity: {weatherDetails.humidity}</li>
                                </ul>
                            </div>
                        }
                    </div>

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