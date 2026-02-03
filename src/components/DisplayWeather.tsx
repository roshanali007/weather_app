import { useState, useEffect } from "react"
import { MainWrapper } from './styles.module'
import { AiOutlineSearch } from "react-icons/ai";
import { WiHumidity } from "react-icons/wi";
import { LuWind } from "react-icons/lu";
import { BsFillSunFill,BsCloudyFill ,BsFillCloudRainFill,BsCloudFog2Fill } from "react-icons/bs";
import { RiLoaderFill } from "react-icons/ri";

interface WeatherData {
  name: string;
  sys: { country: string };
  main: { temp: number; humidity: number };
  weather: { main: string; description: string; icon: string }[];
  wind: { speed: number };
}

function DisplayWeather() {
  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY
  const [city, setCity] = useState("Tirur") 
  const [weather, setWeather] = useState<WeatherData | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const fetchWeather = async (searchCity?: string) => {
    const query = searchCity || city
    if (!query) return
    setLoading(true)
    setError("")
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(query)}&units=metric&appid=${API_KEY}`
      )
      const data = await res.json()
      if (!res.ok) throw new Error(data.message || "City not found")
      setWeather(data)
    } catch (err: any) {
      setError(err.message)
      setWeather(null)
    } finally {
      setLoading(false)
    }
  }

  
  useEffect(() => {
    fetchWeather("Tirur")
  }, [])


  const renderWeatherIcon = () => {
    if (!weather) return null
    const main = weather.weather[0].main.toLowerCase()
    switch(main){
      case "clear": return <BsFillSunFill className="text-[9rem]" />
      case "clouds": return <BsCloudyFill className="text-[9rem]" />
      case "rain": return <BsFillCloudRainFill className="text-[9rem]" />
      case "fog": return <BsCloudFog2Fill className="text-[9rem]" />
      default: return <BsFillSunFill className="text-[9rem]" />
    }
  }

  return (
    <MainWrapper>
      <div className='bg-[#ffffff7d] rounded-xl p-1 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow-[0_10px_15px_rgba(0,0,0,0.2)] box-border text-[rgba(0,0,0,0.8)] flex justify-between items-center flex-col'>
        
        
        <div className='mt-5 flex justify-evenly items-center w-full'>
          <input
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder='Enter a city'
            className='outline-none border border-gray-400 p-2 rounded-[20px] text-center w-4/5 bg-transparent'
            onKeyDown={(e) => e.key === "Enter" && fetchWeather()}
          />
          <div
            className='border border-gray-400 w-[30px] h-[30px] rounded-full flex justify-center items-center cursor-pointer'
            onClick={() => fetchWeather()}
          >
            <AiOutlineSearch className='text-xl text-gray-400'/>
          </div>
        </div>

        
        <div className='flex items-center flex-col my-[30px]'>
          {loading ? (
            <RiLoaderFill className="animate-spin text-[9rem]" />
          ) : weather ? (
            <>
              <h1 className='text-5xl'>{weather.name}</h1>
              <span className='mb-[10px] font-sans'>{weather.sys.country}</span>
              <div>{renderWeatherIcon()}</div>
              <h1 className='text-5xl'>{Math.round(weather.main.temp)}°C</h1>
              <h2 className='text-[2rem] font-sans font-normal capitalize'>{weather.weather[0].description}</h2>
            </>
          ) : (
            error && <p className="text-red-500 mt-4">{error}</p>
          )}
        </div>

        
        {weather && (
          <div className='flex items-center justify-around font-serif m-[10px] 
                        bg-[linear-gradient(90deg,_rgba(243,255,253,1)_0%,_rgba(253,255,232,1)_100%)] rounded-xl p-[10px] w-full
                        m-2
          '>
            <div className='flex items-center mx-5'>
              <WiHumidity className='text-5xl'/>
              <div className='ml-2'>
                <h1 className='text-2xl'>{weather.main.humidity}%</h1>
                <p className='text-[22px] mt-[10px] font-serif'>Humidity</p>
              </div>
            </div>
            <div className='flex items-center mx-5'>
              <LuWind className='text-[2rem] mr-[10px]'/>
              <div>
                <h1 className='text-2xl'>{weather.wind.speed} km/h</h1>
                <p className='text-[22px] mt-[10px] font-serif'>Wind</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </MainWrapper>
  )
}

export default DisplayWeather
