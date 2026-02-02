import React from 'react'
import { MainWrapper } from './styles.module'
import { AiOutlineSearch } from "react-icons/ai";
import { WiHumidity } from "react-icons/wi";
import { LuWind } from "react-icons/lu";

function DisplayWeather() {
  return (
    <MainWrapper>
        <div className='bg-[#ffffff7d] rounded-xl p-1 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
        
        '>
            <div>
                search area
                <div>
                    <input type="text" placeholder='enter a city' />
                </div>
                <div>
                    <AiOutlineSearch />
                </div>
            </div>
            <div>
                weatherarea
                <h1>Auckland</h1>
                <span>Nz</span>
                <div>
                    icons
                </div>
                <h1>18c</h1>
                <h2>cloudy</h2>
            </div>
            <div>
                bottom
                <div>
                    <WiHumidity/>
                    <div>
                        <h1>50%</h1>
                        <p>Humidity</p>
                    </div>
                </div>
                <div>
                    <LuWind/>
                    <div>
                        <h1>50%</h1>
                        <p>Humidity</p>
                    </div>
                </div>
            </div>
        </div>
    </MainWrapper>
  )
}

export default DisplayWeather