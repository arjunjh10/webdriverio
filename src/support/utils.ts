import { DAYOFTHEWEEK, MONTH } from './constants';

export interface DateInfoSimulator {
    month: string;
    date: number;
    dayOfTheWeek: string;
    year: number;
}
export class Utils {
  calculateTheNextDateForTheGivenDayOfTheWeek(date: Date, dayOfTheWeek: DAYOFTHEWEEK): Date {
    const resultDate = new Date(date.getTime());
    resultDate.setDate(date.getDate() + (7 + dayOfTheWeek - date.getDay() - 1) % 7 + 1);

    return resultDate;
  }

  getSimulatorCalendarDateString(date: Date): DateInfoSimulator {
    const getDate = date.getDate();
    const getMonth = date.getMonth();
    const getDay = date.getDay();
    const dayOfTheWeekStringValue = DAYOFTHEWEEK[getDay];
    const monthStringValue = MONTH[getMonth];

    const dateValue: DateInfoSimulator = {
      month: monthStringValue,
      date: getDate,
      dayOfTheWeek: dayOfTheWeekStringValue,
      year: date.getFullYear()
    };

    return dateValue;
  }

  getCalendarDateString(dateObject: DateInfoSimulator): string {
    return `${dateObject.dayOfTheWeek}, ${dateObject.month} ${dateObject.date}`;
  }

  getCurrentYearForTheDate(date: Date): number {
    return date.getFullYear();
  }

  calculateTheDateXNumberOfMonthsFromTheGivenDate(date: Date, numberOfMonths: number): Date {
    let newDate = new Date(date);
    newDate.setMonth(date.getMonth() + numberOfMonths);

    return newDate;
  }
}