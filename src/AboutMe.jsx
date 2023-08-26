import React from 'react'

import cityBackground from './assets/city-bg.jpg'
import { Link } from 'react-router-dom'

function AboutMe() {
    return (
        <div className='flex flex-col justify-center items-stretch h-[100vh] relative text-white'
            style={{
                backgroundImage: `url('${cityBackground}')`,
                // height: `400px`
            }}
        >
            <div className={`mt-8 text-justify p-10 bg-white bg-opacity-10 backdrop-blur-lg rounded-xl lg:w-[80%] m-auto h-[70vh] overflow-y-scroll`}>
                <p>I am Binayak Bishnu.</p>
                <p>
                    Check out my website: <a className='underline'
                        href="https://binayakbishnu.web.app" target='_blank' rel="noopener noreferrer">
                        https://binayakbishnu.web.app</a>
                </p>
                <br />
                <p>I am an undergraduate student pursuing BTech in IT looking for internship roles to improve my skills and gain industry experience.</p>
                <p>I have skills relevant to frontend web development like HTML, CSS, JS, ReactJs, NodeJs, and JSON having developed 2 full stack websites and 1 portfolio website and having worked with 3 startups to build their websites. In my latest internship under eZ, I was the tech lead wherein I was put in charge of the frontend team and of maintaining the repo. I extensively made use of version control and debugging. Moreover, I learnt to coordinate and work as a team at a production level work, and mentor juniors in creating maintainable code.</p>
                <br /><p>I also have operational knowledge of MS Excel and SQL for Data Mining and Exploration, Power Bi for Visualisation, and Data Analytics using Python and MS PowerPoint for data presentation. I have made projects focusing on large datasets using Power Query and Power Query to manage and transform them. I have created dashboard and reports published on Medium and my website.</p>
                <p><a className='underline'
                    href="https://medium.com/@binayakbishnu" target='_blank' rel="noopener noreferrer">
                    https://medium.com/@binayakbishnu</a></p>
                <br /><p>I have completed courses and specialisations like Google's Data Analytics Professional Certificate and Excel Skills for Data Analytics and Visualization in these domains along with Virtual Experience Programs under Accenture and TATA via Forage. I learned about setting project priorities, outcome analysis, communication with stakeholders, framing business cases, and providing insights.</p>
                <p>My principle of experiment-observation in common day-to-day activities helps me understand and analyse them better. I have also explored UI/UX which taught me to understand user perspective and how to tailor products and interfaces accordingly.</p>
                <p>With these points, I believe I can positively contribute to company goals, sharpen my skills, and learn new ones. I want to take this opportunity to apply my knowledge in real-world situations.</p>

                <br /><p>Thank you.</p>
            </div>

            <div className='absolute right-4 bottom-4'>
                <Link
                    to="/"
                    className='bg-white bg-opacity-10 backdrop-blur-lg p-4 rounded-xl flex flex-row items-center justify-center cursor-pointer text-white font-bold'
                >Go Back</Link>
            </div>
        </div>
    )
}

export default AboutMe