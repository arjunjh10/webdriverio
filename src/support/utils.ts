import { DAYOFTHEWEEK, MONTH } from "./constants";

export class Utils {
    calculateTheNextDateForTheGivenDayOfTheWeek(date: Date, dayOfTheWeek: DAYOFTHEWEEK): Date {
        var resultDate = new Date(date.getTime());
        resultDate.setDate(date.getDate() + (7 + dayOfTheWeek - date.getDay() - 1) % 7 +1);

        return resultDate;
    }

    getSimulatorCalendarDateString(date: Date, dayOfTheWeek: DAYOFTHEWEEK): string {
        const getDate = date.getDate();
        const getMonth = date.getMonth();
        const dayOfTheWeekStringValue = DAYOFTHEWEEK[dayOfTheWeek];
        const monthStringValue = MONTH[getMonth];

        return `${dayOfTheWeekStringValue}, ${monthStringValue} ${getDate}`
    }
 
    calculateTheDateThreeMonthsFromTheGivenDate(date: Date) {
        const newDate = new Date(date.setMonth(date.getMonth() + 3));
        return newDate;
    }
}