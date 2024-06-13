
export default class Utils {

    static getDay(day) {
        const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thurs', 'Fri', 'Sat'];
        return days[day];
    }

    static getMonth(month) {
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        return months[month];
    }

    static getTimeAMPMFormat(date) {
        let hours = date.getHours();
        const minutes = (date.getMinutes()).toString().padStart(2, '0');
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12 || hours;
        const timeStr = hours + ':' + minutes + ' ' + ampm;
        return timeStr;
    }

    static getDateTime(timeStamp) {
        if (!timeStamp) {
            return "";
        }
        if (typeof timeStamp === "string") {
            return timeStamp;
        }

        const dateString = new Date(timeStamp);
        const day = this.getDay(dateString.getDay());
        let date = dateString.getDate();
        date = date.toString().padStart(2, '0');
        const month = this.getMonth(dateString.getMonth());
        const year = dateString.getFullYear();
        const time = this.getTimeAMPMFormat(dateString)
        return `${day}, ${date} ${month} ${year} ${time}`;
    }

    static getTimeStamp = (year, month, day) => {
        const date = new Date(year, month, day);
        return date.getTime();
    }
}