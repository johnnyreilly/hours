import { workOutTheHours } from '../calculator';

describe('calculator', () => {
    it('test passes', () => {
        expect(workOutTheHours({
            officialHoursPerDay: 7,
            officialDaysPerWeek: 2,
            actualHoursPerDay: 6,
            actualDaysPerWeek: 3, // monday tuesday wednesday is key
            daysLeavePerYear: 20,
            daysHolidayAlreadyBanked: 12,
            startDate: '2017-09-01',
            endDate: '2018-08-31'
        })).toEqual({ hoursBanked: 12 });
    });
});
