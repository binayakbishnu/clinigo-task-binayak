import React from 'react'

function About() {
    return (
        <div className={`flex-1 flex flex-col justify-start items-center p-2 text-white relative`}>
            <div className={`mt-8 text-justify px-6 py-4 bg-white bg-opacity-10 backdrop-blur-lg rounded-xl lg:w-auto`}>
                <p>- An axios get request is sent using the api url.</p>
                <p>- The response data is then assigned to a variable (receivedData).</p>
                <p>- The received data is transformed and stored into weatherDetails state variable.</p>
                <p>- Some transformations include the conversion of temperatures from Kelvin to Celsius and the calculation of the timezone.</p>
            </div>
        </div>
    )
}

export default About