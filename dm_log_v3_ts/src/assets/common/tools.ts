
export function Random(min: number, max: number )
{
    return Math.floor(Math.random() * (max - min)) + min;
}

export function CompareDate(date1: Date, date2: Date)
{
    var a = date1.getTime() / 1000;
    var b = date2.getTime() / 1000;

    console.log(a + "~~~~" + b);

    
    return date1.getTime()/1000 - date2.getTime()/1000;
}



