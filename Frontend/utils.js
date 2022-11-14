import Axios from "axios";
import { toast } from "react-toastify";

export function getUserAvatar(name, size = 128) {
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(
    name
  )}&background=random&size=${size}`;
}

const weekday = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
var today = new Date().getDay();
export const labels = weekday.map((item, i) => weekday[(i + today) % 7]);

export function sentenceCase(str) {
  return str.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1);
  });
}

export async function uploadFilesToCloud(image) {
  const key = process.env.NEXT_PUBLIC_CLOUDINARY_PRESET;
  const url = process.env.NEXT_PUBLIC_CLOUDINARY_URL;
  if (image === undefined) return;
  const formData = new FormData();
  formData.append("file", image);

  formData.append("upload_preset", key);
  try {
    const res = await Axios.post(url, formData);
    return await res;
  } catch (err) {
    console.log(err);
  }
}

export const alertBox = (message = "Something went wrong", type = "error") => {
  toast(message, { type: type });
};
