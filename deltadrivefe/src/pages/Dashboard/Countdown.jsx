import { useEffect, useMemo, useState } from "react";
import moment from "moment";
import {set} from "react-hook-form";

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

    return arrivalAt.isAfter(currentTime) ? <div>{getCountdown}</div> : <div>00:00:00</div>
}