import { useCallback, useContext, useEffect, useState } from "react";

import DatepickerContext from "../contexts/DatepickerContext";
import { DateType } from "../types";

interface TimePickerProps {
    label: string;
    date: DateType;
    onChange: (date: Date) => void;
}

const TimePicker = ({ label, date, onChange }: TimePickerProps) => {
    const { primaryColor, disabled } = useContext(DatepickerContext);

    // Always initialize to midnight (12:00 AM)
    const [hours, setHours] = useState<number>(12);
    const [minutes, setMinutes] = useState<number>(0);
    const [ampm, setAmPm] = useState<"AM" | "PM">("AM");

    useEffect(() => {
        // If date is newly provided or changed, and user hasn't manually set time yet
        if (date) {
            const hours24 = date.getHours();
            const isPM = hours24 >= 12;
            const hours12 = hours24 % 12 || 12;

            setHours(hours12);
            setMinutes(date.getMinutes());
            setAmPm(isPM ? "PM" : "AM");

            // If this is the first load and time is midnight, we'll still allow user changes
            if (hours24 === 0 && date.getMinutes() === 0) {
                setHours(12);
                setMinutes(0);
                setAmPm("AM");
            }
        } else if (!date) {
            // Always default to midnight (12 AM) for null dates
            setHours(12);
            setMinutes(0);
            setAmPm("AM");
        }
    }, [date]);

    useEffect(() => {
        // If date is null, create a new date object starting from today with time set to midnight
        const newDate = date || new Date();

        const isPM = ampm === "PM";
        let hours24 = hours;

        if (hours === 12) {
            hours24 = isPM ? 12 : 0;
        } else if (isPM) {
            hours24 = hours + 12;
        }

        newDate.setHours(hours24);
        newDate.setMinutes(minutes);
        newDate.setSeconds(0);
        onChange(newDate);
    }, [hours, minutes, ampm, onChange]);

    const handleHoursChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
        const newHours = Number.parseInt(e.target.value, 10);
        setHours(newHours);
    }, []);

    const handleMinutesChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
        const newMinutes = Number.parseInt(e.target.value, 10);
        setMinutes(newMinutes);
    }, []);

    const handleAmPmChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
        const newAmPm = e.target.value as "AM" | "PM";
        setAmPm(newAmPm);
    }, []);

    return (
        <div className="flex flex-col px-2 py-1">
            <div className="mb-1 text-sm text-gray-600 dark:text-gray-400">{label}</div>
            <div className="flex items-center space-x-1 md:space-x-2">
                <select
                    className={`w-14 md:w-16 bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-600 rounded-md py-1 px-1 md:px-2 text-sm focus:outline-none focus:ring-2 focus:ring-${primaryColor}-500/20 focus:border-${primaryColor}-500 disabled:opacity-40 disabled:cursor-not-allowed`}
                    value={hours}
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
                    value={minutes}
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
                    value={ampm}
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
