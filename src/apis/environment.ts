import axios from "axios";

function formatSgGovDate(time: string) {
  const date = new Date(time);

  date.setHours(date.getHours() + 8);

  return date.toISOString().split(".")[0];
}

interface EnvironmentResult {
  items: { readings: { value: string }[] }[];
}

export async function getTemperature(date: string) {
  const url = `https://api.data.gov.sg/v1/environment/air-temperature?date_time=${formatSgGovDate(date)}`;
  const result = await axios.get<EnvironmentResult>(url);

  return result.data.items?.[0].readings?.[0].value;
}

export async function getHumidity(date: string) {
  const url = `https://api.data.gov.sg/v1/environment/relative-humidity?date_time=${formatSgGovDate(date)}`;

  const result = await axios.get<EnvironmentResult>(url);

  return result.data.items?.[0].readings?.[0].value;
}
