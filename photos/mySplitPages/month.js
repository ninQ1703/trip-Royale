export const months = {
    1: "Jan",
    2: "Feb",
    3: "Mar",
    4: "Apr",
    5: "May",
    6: "Jun",
    7: "Jul",
    8: "Aug",
    9: "Sep",
    10: "Oct",
    11: "Nov",
    12: "Dec"
}

const formatDate = (date) => {
    // let m=date.getMonth()+1;
    // let d=date.getDate();
    // let y=date.getYear();
    let y=parseInt(date.substr(0,4));
    let m=parseInt(date.substring(5,7));
    let d=parseInt(date.substring(8,10));

    return (
      <p>{d} {months[m]}, {y}</p>
    )
}

export default formatDate;