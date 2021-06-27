import { DAYOFTHEWEEK, MONTH } from "./constants";

export class Utils {
    calculateTheNextDateForTheGivenDayOfTheWeek(date: Date, dayOfTheWeek: DAYOFTHEWEEK): Date {
        var resultDate = new Date(date.getTime());
        resultDate.setDate(date.getDate() + (7 + dayOfTheWeek - date.getDay() - 1) % 7 +1);

        return resultDate;
    }

    getSimulatorCalendarDateString(date: Date): string {
        const getDate = date.getDate();
        const getMonth = date.getMonth();
        // let dayOfTheWeekStringValue: string;
        // let monthStringValue: string;
        
            const getDay = date.getDay();
           const dayOfTheWeekStringValue = DAYOFTHEWEEK[getDay];
           const monthStringValue = MONTH[getMonth];
        
        return `${dayOfTheWeekStringValue}, ${monthStringValue} ${getDate}`
    }
 
    calculateTheDateXNumberOfMonthsFromTheGivenDate(date: Date, numberOfMonths: number) {
        const newDate = new Date(date.setMonth(date.getMonth() + numberOfMonths));
        return newDate;
    }
}