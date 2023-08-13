// index.js
import * as chrono from "chrono-node";
import dayjs from "dayjs";
import weekOfYear from "dayjs/plugin/weekOfYear.js";
import weekYear from "dayjs/plugin/weekYear.js";
import advancedFormat from "dayjs/plugin/advancedFormat.js";
import speechDate from "./app.js";

const message =
  "Show the list of attendees for meetings from 9 months ago";

speechDate(message)


