import { useCallback, useContext } from "react";

import DatepickerContext from "../contexts/DatepickerContext";
import { TimeObject } from "../types";

import PrimaryButton from "./PrimaryButton";
import SecondaryButton from "./SecondaryButton";

const Footer = () => {
    // Contexts
    const { hideDatepicker, period, changeDatepickerValue, configs, classNames, time, showTimePicker } =
        useContext(DatepickerContext);

    // Functions
    const getClassName = useCallback(() => {
        if (typeof classNames !== "undefined" && typeof classNames?.footer === "function") {
            return classNames.footer();
        }

        return "flex items-center justify-end pb-2.5 pt-3 border-t border-gray-300 dark:border-gray-700";
    }, [classNames]);

    // Apply time to a date
    const applyTimeToDate = useCallback((date: Date, timeObj: TimeObject) => {
        if (!date) return date;
        
        const newDate = new Date(date);
        const isPM = timeObj.ampm === "PM";
        let hours24 = timeObj.hours;

        if (timeObj.hours === 12) {
            hours24 = isPM ? 12 : 0;
        } else if (isPM) {
            hours24 = timeObj.hours + 12;
        }

        newDate.setHours(hours24);
        newDate.setMinutes(timeObj.minutes);
        newDate.setSeconds(0);
        return newDate;
    }, []);

    return (
        <div className={getClassName()}>
            <div className="w-full md:w-auto flex items-center justify-center space-x-3">
                <SecondaryButton
                    onClick={() => {
                        hideDatepicker();
                    }}
                >
                    <>{configs?.footer?.cancel ? configs.footer.cancel : "Cancel"}</>
                </SecondaryButton>

                <PrimaryButton
                    onClick={() => {
                        if (period.start && period.end) {
                            // Only apply time if time picker is shown
                            if (showTimePicker) {
                                // Apply time information to period dates
                                const startWithTime = applyTimeToDate(period.start, time.start);
                                const endWithTime = applyTimeToDate(period.end, time.end);
                                
                                changeDatepickerValue({
                                    startDate: startWithTime,
                                    endDate: endWithTime
                                });
                            } else {
                                changeDatepickerValue({
                                    startDate: period.start,
                                    endDate: period.end
                                });
                            }
                            hideDatepicker();
                        }
                    }}
                    disabled={!(period.start && period.end)}
                >
                    <>{configs?.footer?.apply ? configs.footer.apply : "Apply"}</>
                </PrimaryButton>
            </div>
        </div>
    );
};

export default Footer;
