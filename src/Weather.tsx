type Props = {

    temp: number
    description: string
    humidity: number
    speed: number

};

export const Weather = ({temp, description, humidity, speed}: Props) => {

    return (
        <div className="weather">
            <p>Temperature: {temp} °C</p>
            <p>Weather: {description}</p>
            <p>Humidity: {humidity} %</p>
            <p>Wind speed: {speed} m/s</p>
        </div>
    );

};