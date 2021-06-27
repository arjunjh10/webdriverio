import { DAYOFTHEWEEK, MONTH } from "./constants";

export class Utils {
    calculateTheNextDateForTheGivenDayOfTheWeek(date: Date, dayOfTheWeek: DAYOFTHEWEEK): string {
        var resultDate = new Date(date.getTime());
        resultDate.setDate(date.getDate() + (7 + dayOfTheWeek - date.getDay() - 1) % 7 +1);

        const getDate = resultDate.getDate();
        const getMonth = resultDate.getMonth();
        const dayOfTheWeekStringValue = DAYOFTHEWEEK[dayOfTheWeek];
        const monthStringValue = MONTH[getMonth];

        return `${dayOfTheWeekStringValue}, ${monthStringValue} ${getDate}`
    }
}