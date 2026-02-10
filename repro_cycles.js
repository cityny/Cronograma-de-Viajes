
// Mock DayType enum
const DayType = {
    Work: 'Work',
    Rest: 'Rest',
    Departure: 'Departure',
    Return: 'Return',
    None: 'None'
};

const toUTCDateString = (date) => {
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
    const day = String(date.getUTCDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};

function runSimulation() {
    // Precise User Params
    const startDate = new Date("2026-02-10T00:00:00Z");
    const departureDay = 6; // Saturday
    const returnDay = 6; // Saturday
    const workDays = 21;
    const minRestDays = 7;

    console.log("--- Simulation Params (User Scenario) ---");
    console.log("StartDate:", startDate.toISOString());
    console.log("DepartureDay:", departureDay, "(Sat)");
    console.log("ReturnDay:", returnDay, "(Sat)");
    console.log("WorkDays:", workDays);
    console.log("MinRestDays:", minRestDays);
    console.log("------------------------");

    const map = new Map();
    const adjustmentMap = new Map();

    let cycleStartDate = new Date(startDate);
    const calendarEndDate = new Date("2026-10-01T00:00:00Z");

    let cycleCount = 1;

    while (cycleStartDate < calendarEndDate) {
        console.log(`\nCycle ${cycleCount} Start: ${toUTCDateString(cycleStartDate)}`);

        // Nominal Work End
        const nominalWorkEnd = new Date(cycleStartDate);
        nominalWorkEnd.setUTCDate(nominalWorkEnd.getUTCDate() + workDays - 1);

        // Departure
        const dayOfWeek = nominalWorkEnd.getUTCDay(); // 0=Sun, 6=Sat
        const daysUntilDeparture = (departureDay - dayOfWeek + 7) % 7;
        const departureDate = new Date(nominalWorkEnd);
        departureDate.setUTCDate(departureDate.getUTCDate() + daysUntilDeparture);

        console.log(`  NominalEnd: ${toUTCDateString(nominalWorkEnd)} (${dayOfWeek})`);
        console.log(`  Departure: ${toUTCDateString(departureDate)} (Day ${departureDate.getUTCDay()})`);

        // Calc Return
        const daysToAddAuto = Math.max(0, (minRestDays || 1) - 1);
        let returnDate = new Date(departureDate);
        returnDate.setUTCDate(returnDate.getUTCDate() + daysToAddAuto);
        console.log(`  AutoReturn: ${toUTCDateString(returnDate)}`);

        let adjustmentDays = 0;
        if (returnDay !== null) {
            const currentDayOfWeek = returnDate.getUTCDay();
            const daysUntilTarget = (returnDay - currentDayOfWeek + 7) % 7;
            if (daysUntilTarget > 0) {
                returnDate.setUTCDate(returnDate.getUTCDate() + daysUntilTarget);
                adjustmentDays = daysUntilTarget;
            }
        }
        console.log(`  FinalReturn: ${toUTCDateString(returnDate)} (Adj: +${adjustmentDays})`);

        // Log overlap check for Aug 29
        const problematicDate = "2026-08-29";

        // Fill Map
        // Work
        let cDate = new Date(cycleStartDate);
        while (cDate < departureDate) {
            const s = toUTCDateString(cDate);
            map.set(s, DayType.Work);
            if (s === problematicDate) console.log(`  !! WRITING WORK to ${s}`);
            cDate.setUTCDate(cDate.getUTCDate() + 1);
        }

        // Departure
        let depS = toUTCDateString(departureDate);
        map.set(depS, DayType.Departure);
        if (depS === problematicDate) console.log(`  !! WRITING DEPARTURE to ${depS}`);

        // Rest
        cDate = new Date(departureDate);
        cDate.setUTCDate(cDate.getUTCDate() + 1);
        while (cDate < returnDate) {
            const s = toUTCDateString(cDate);
            map.set(s, DayType.Rest);
            if (s === problematicDate) console.log(`  !! WRITING REST to ${s}`);
            cDate.setUTCDate(cDate.getUTCDate() + 1);
        }

        // Return
        let retS = toUTCDateString(returnDate);
        map.set(retS, DayType.Return);
        if (retS === problematicDate) console.log(`  !! WRITING RETURN to ${retS}`);

        // Next Cycle
        cycleStartDate = new Date(returnDate);
        cycleStartDate.setUTCDate(cycleStartDate.getUTCDate() + 1);
        cycleCount++;
    }
}

runSimulation();
