interface IHoursInputs {
    officialHoursPerDay: number;
    officialDaysPerWeek: number;
    actualHoursPerDay: number;
    actualDaysPerWeek: number;
    daysLeavePerYear: number;
    daysHolidayAlreadyBanked: number;
    startDate: string;
    endDate: string;
}

export function workOutTheHours(inputs: IHoursInputs) {
    return {
        hoursBanked: inputs.daysHolidayAlreadyBanked
    };
}