export default function (isFull = false) {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const date = new Date();

  const dateProps = [
    date.getFullYear(),
    months[date.getMonth()],
    date.getDate(),
  ];

  const time = [date.getHours(), date.getMinutes(), date.getSeconds()].map(
    (item) => {
      return item.toString().split("").length <= 1 ? `0${item}` : item;
    }
  );

  return isFull
    ? `${dateProps[0]}/${dateProps[1]}/${dateProps[2]}`
    : `${dateProps[0]}/${dateProps[1]}/${dateProps[2]} - ${time[0]}:${time[1]}:${time[2]}`;
}
