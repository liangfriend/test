const getDayCountOfMonth = function(year, month) {
    return new Date(year, month + 1, 0).getDate();
};
const siblingMonth = function(src, diff) {
    const temp = new Date(src); // lets copy it so we don't change the original
 
    const newMonth = temp.getMonth() + diff;
    const newMonthDayCount = getDayCountOfMonth(temp.getFullYear(), newMonth);
    if (newMonthDayCount < temp.getDate()) {
        temp.setDate(newMonthDayCount);
    }
    temp.setMonth(newMonth);
    console.log(newMonth)
    return temp;
};

const date = new Date('2025-3-30');
siblingMonth(date,-1)
// console.log()