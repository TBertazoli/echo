import { Link } from "react-router-dom";
import * as userService from "../../utilities/users-service";
import { useState, useEffect } from "react";

export default function NavBar({ user, setUser, setLatitude, setLongitude }) {
  const [location, setLocation] = useState(null);
  const [weather, setWeather] = useState(null);
  const [address, setAddress] = useState(null);
  const [isLocationLoaded, setIsLocationLoaded] = useState(false);
  const [isWeatherLoaded, setIsWeatherLoaded] = useState(false);

  const openWeatherAPI = process.env.REACT_APP_OPENWEATHER_API_KEY;
  const mapboxToken =
    "pk.eyJ1IjoiYmVydGF6b2xpdCIsImEiOiJjbHc2ZnZkMXIxd3ZnMmtuNnFocDg2MDBpIn0.3FrIoyBW1TCx6Yb9VAsCEA";

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, error);
    } else {
      console.log("Geolocation not supported");
    }
  }, []);

  function handleLogOut() {
    userService.logOut();
    setUser(null);
  }

  function success(position) {
    setIsLocationLoaded(true);
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    setLatitude(latitude);
    setLongitude(longitude);
    setLocation({ latitude, longitude });

    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${openWeatherAPI}&units=imperial`
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.name && data.sys.country) {
          setWeather(data);
        } else {
          console.log("Unexpected location data:", data);
          setWeather(null);
        }
      })
      .catch((error) => {
        console.log(error);
        setWeather(null);
      })
      .finally(() => {
        setIsWeatherLoaded(true);
      });

    fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=${mapboxToken}`
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.features && data.features.length > 0) {
          // city, state, country, postcode
          const address = data.features[0].context;
          const city = address.find((item) => item.id.includes("place"));
          const state = address.find((item) => item.id.includes("region"));
          const country = address.find((item) => item.id.includes("country"));
          const postcode = address.find((item) => item.id.includes("postcode"));

          setAddress(
            `${city.text}, ${state.text}, ${country.text} ${postcode.text}`
          );
        } else {
          console.log("Unexpected address data:", data);
          setAddress(null);
        }
      })
      .catch((error) => {
        console.log(error);
        setAddress(null);
      });
  }

  function error(err) {
    console.log("Unable to retrieve your location", err);
    setLocation(null);
    setIsLocationLoaded(true);
    setIsWeatherLoaded(true);
  }

  return (
    <nav className="bg-zinc-900 border-b border-zinc-800">
      <div className="max-w-screen-xl flex flex-wrap content-center items-center justify-between mx-auto p-8">
        <div className="flex gap-4 items-center">
          <Link className="flex items-center space-x-3 rtl:space-x-reverse">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="22"
              height="22"
              viewBox="0,0,256,256"
            >
              <g
                fill="none"
                fillRule="nonzero"
                stroke="none"
                strokeWidth="1"
                strokeLinecap="butt"
                strokeLinejoin="miter"
                strokeMiterlimit="10"
                strokeDasharray=""
                strokeDashoffset="0"
                fontFamily="none"
                fontWeight="none"
                fontSize="none"
                textAnchor="none"
              >
                <g transform="scale(16,16)">
                  <path d="M7,9l1,7h2l6,-15l-1,-1z" fill="#4b4b4b"></path>
                  <path
                    d="M0,6v2l7,1l8.5,-8.5l-0.5,-0.5z"
                    fill="#595852"
                  ></path>
                </g>
              </g>
            </svg>
            <span className="self-center text-3xl font-semibold whitespace-nowrap text-white hidden md:block">
              Echo
            </span>
          </Link>
          {address && weather && isWeatherLoaded ? (
            <div className="flex items-center  ml-4 text-sm text-gray-500 dark:text-gray-400">
              <span>{address}</span>{" "}
              <span
                className="mx-2 font-semibold text-gray-400 dark:text-zinc-800 text-2xl"
                style={{
                  position: "relative",
                  left: "0.5rem",
                  bottom: "0.1rem",
                }}
              >
                |
              </span>
              <span className="flex items-center">
                <img
                  src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                  alt={weather.weather[0].description}
                  className="w-12 h-12"
                />
                <span className="">
                  {weather.main.temp}°F, {weather.weather[0].description}
                </span>
              </span>
            </div>
          ) : !isLocationLoaded || !isWeatherLoaded ? (
            <div className="flex items-center gap-2 ml-4">
              <div role="status">
                <svg
                  aria-hidden="true"
                  className="w-6 h-6 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
                <span className="sr-only">Loading...</span>
              </div>
              <div role="status" class=" animate-pulse flex items-center">
                <div class="h-2.5  rounded-full bg-zinc-700 w-48 "></div>
                <span
                  className="mx-2 font-semibold text-gray-400 dark:text-zinc-800 text-2xl block"
                  style={{
                    position: "relative",
                    left: "0.5rem",
                    bottom: "0.1rem",
                  }}
                >
                  |
                </span>
                <div class="h-2.5  rounded-full bg-zinc-700 w-48 block ml-4"></div>
                <span class="sr-only">Loading...</span>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2 ml-4">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Unable to retrieve your location
              </span>
            </div>
          )}
        </div>

        <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse gap-4">
          <div className="flex mr-0 md:mr-4">
            <img
              className="w-8 h-8 rounded-full mr-0 md:mr-2 mt-1"
              src="https://jeffjbutler.com//wp-content/uploads/2018/01/default-user.png"
              alt="user default"
            />
            <div className="flex flex-col hidden md:block">
              <span className="block text-sm text-white font-semibold">
                {user.name}
              </span>
              <span className="block text-sm text-gray-400">
                {user.email}
              </span>
            </div>
          </div>

          <button
            onClick={handleLogOut}
            className="font-semibold text-white cursor-pointer hover:text-gray-400 bg-zinc-600 hover:bg-zinc-700 px-4 py-2 rounded-lg shadow-xl"
          >
            Log Out
          </button>
        </div>
      </div>
    </nav>
  );
}
