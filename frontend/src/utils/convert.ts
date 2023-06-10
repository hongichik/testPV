const MoneyConvert = (data: number) => {
    const intValue = Math.floor(data);
    return intValue.toLocaleString('vi-VN');
}
const JsonConvert = (data: any) => {
    return JSON.stringify(data).replace(/[{}"]/g, '')
}

const timeConvert = (data: string) => {
    const date = new Date(data);
    const formattedDate = `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()} - ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}`;
    return formattedDate;
}

const urlConvertArray = (data: string | string[] | undefined) => {
    if (Array.isArray(data)) {
      return data;
    } else if (typeof data === "string") {
      return data.split(",");
    } else {
      return [];
    }
  }
  
const urlConvertString = (data: string[]) => {
    return data.join(",");
}
const Convert = {
    MoneyConvert,
    JsonConvert,
    timeConvert,
    urlConvertArray,
    urlConvertString
}

export default Convert