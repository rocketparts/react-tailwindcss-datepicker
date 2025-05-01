import { useCallback, useContext } from "react";

import DatepickerContext from "../contexts/DatepickerContext";
import { DateType } from "../types";

interface TimePickerProps {
    label: string;
    date: DateType;
    timeKey: "start" | "end";
}

const TimePicker = ({ label, timeKey }: TimePickerProps) => {
    const { primaryColor, disabled, time, changeTime } = useContext(DatepickerContext);
    const timeObj = time[timeKey];

    const handleHoursChange = useCallback(
        (e: React.ChangeEvent<HTMLSelectElement>) => {
            const newHours = Number.parseInt(e.target.value, 10);
            changeTime({
                [timeKey]: {
                    ...timeObj,
                    hours: newHours
                }
            });
        },
        [timeObj, changeTime, timeKey]
    );

    const handleMinutesChange = useCallback(
        (e: React.ChangeEvent<HTMLSelectElement>) => {
            const newMinutes = Number.parseInt(e.target.value, 10);
            changeTime({
                [timeKey]: {
                    ...timeObj,
                    minutes: newMinutes
                }
            });
        },
        [timeObj, changeTime, timeKey]
    );

    const handleAmPmChange = useCallback(
        (e: React.ChangeEvent<HTMLSelectElement>) => {
            const newAmPm = e.target.value as "AM" | "PM";
            changeTime({
                [timeKey]: {
                    ...timeObj,
                    ampm: newAmPm
                }
            });
        },
        [timeObj, changeTime, timeKey]
    );

    return (
        <div className="flex flex-col px-2 py-1">
            <div className="mb-1 text-sm text-gray-600 dark:text-gray-400">{label}</div>
            <div className="flex items-center space-x-1 md:space-x-2">
                <select
                    className={`w-14 md:w-16 bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-600 rounded-md py-1 px-1 md:px-2 text-sm focus:outline-none focus:ring-2 focus:ring-${primaryColor}-500/20 focus:border-${primaryColor}-500 disabled:opacity-40 disabled:cursor-not-allowed`}
                    value={timeObj.hours}
                    onChange={handleHoursChange}
                    disabled={disabled}
                >
                    <option value="12">12</option>
                    {Array.from({ length: 11 }, (_, i) => (
                        <option key={i} value={i + 1}>
                            {(i + 1).toString()}
                        </option>
                    ))}
                </select>
                <span className="text-gray-500">:</span>
                <select
                    className={`w-14 md:w-16 bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-600 rounded-md py-1 px-1 md:px-2 text-sm focus:outline-none focus:ring-2 focus:ring-${primaryColor}-500/20 focus:border-${primaryColor}-500 disabled:opacity-40 disabled:cursor-not-allowed`}
                    value={timeObj.minutes}
                    onChange={handleMinutesChange}
                    disabled={disabled}
                >
                    {Array.from({ length: 60 }, (_, i) => (
                        <option key={i} value={i}>
                            {i.toString().padStart(2, "0")}
                        </option>
                    ))}
                </select>
                <select
                    className={`w-14 md:w-16 bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-600 rounded-md py-1 px-1 md:px-2 text-sm focus:outline-none focus:ring-2 focus:ring-${primaryColor}-500/20 focus:border-${primaryColor}-500 disabled:opacity-40 disabled:cursor-not-allowed`}
                    value={timeObj.ampm}
                    onChange={handleAmPmChange}
                    disabled={disabled}
                >
                    <option value="AM">AM</option>
                    <option value="PM">PM</option>
                </select>
            </div>
        </div>
    );
};

export default TimePicker;
