import { useEffect, useMemo, useState } from "react";
import moment from "moment";

export function Countdown({arrivalAt, startingTime, currentTime, setCurrentTime}) {
    useEffect(() => {
        const interval = setInterval(() => setCurrentTime(moment(), 1000));

        return () => {
            clearInterval(interval);
        };
    }, []);

    const getCountdown = useMemo(() => {
        const duration = moment.duration(
            arrivalAt.diff(currentTime),
            "milliseconds"
        );

        return moment.utc(duration.asMilliseconds()).format("HH:mm:ss");
    }, [startingTime, currentTime, arrivalAt]);

    return arrivalAt.isAfter(currentTime) ? <div style={{fontSize:'50px'}}>{getCountdown}</div> : <div>00:00:00</div>
}