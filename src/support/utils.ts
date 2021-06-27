import { DAYOFTHEWEEK } from "./constants";

export class Utils {
    calculateTheNextDateForTheGivenDayOfTheWeek(date: Date, dayOfTheWeek: DAYOFTHEWEEK): Date {
        var resultDate = new Date(date.getTime());
        resultDate.setDate(date.getDate() + (7 + dayOfTheWeek - date.getDay() - 1) % 7 +1);
        return resultDate;
    }
}