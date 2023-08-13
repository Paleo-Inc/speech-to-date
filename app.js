// Importing necessary libraries and plugins
import * as chrono from "chrono-node";
import dayjs from "dayjs";
import weekOfYear from "dayjs/plugin/weekOfYear.js";
import weekYear from "dayjs/plugin/weekYear.js";
import advancedFormat from "dayjs/plugin/advancedFormat.js";
import dateFormat from "dateformat";

// Extending dayjs with required plugins
dayjs.extend(weekOfYear);
dayjs.extend(weekYear);
dayjs.extend(advancedFormat);

// Getting the current date and time using dayjs
const now = dayjs();

// Sample user message and parsing it with chrono
const user_message =
  "- [x] Show the list of attendees for meetings held in the past 14 days.";

const user_message_date = chrono.parseDate(user_message);
const user_chrono = chrono.parse(user_message);
const message_date = chrono.parseDate(user_message);
console.log("-Message date: " + message_date);

// Keywords indicating the past timeframe
const past_keywords = ["past", "last"];

console.log(
  `-Today: ${now.format("dddd MMMM Do YYYY")} / Week: ${now.format("ww YYYY")}`
);

// Function to check if user message contains past keywords
function checkForPastKeywords(message, keywords) {
  for (const keyword of keywords) {
    if (message.includes(keyword)) {
      return true;
    }
  }
  return false;
}

// Processing user message based on presence of past keywords
if (checkForPastKeywords(user_message, past_keywords)) {
  processUserMessage(user_message);
  console.log(
    "-Past keywords found in the user message. Running the function..."
  );
} else {
  processUserChrono(user_chrono);
  console.log("-No past keywords found in the user message.");
}

// Function to process user messages containing timeframes
function processUserMessage(message) {
  // If Weeks
  if (message.includes("day")) {
    pastDays(message);
  }
  // If Weeks
  if (message.includes("week")) {
    pastWeeks(message);
    // If Months
  } else if (message.includes("month")) {
    pastMonths(message);
    // If Years
  } else if (message.includes("year")) {
    pastYears(message);
  } else {
    console.log("-No matching keyword found in the user message.");
  }

  // Function to retrieve and display past days
  function pastDays(message) {
    if (message.includes("days")) {
      let total_days = dayjs().diff(dayjs(user_message_date), "day");
      console.log("This day: " + dayjs().day());
      console.log("Total days: " + total_days);

      for (let i = 0; i < total_days; i++) {
        const dayNumber = dayjs(now).subtract(i, "day");
        const day = dayjs(now).subtract(i, "day");

        console.log(
          `OUTPUT ${day.format("dddd MMMM Do YYYY")} / Week: ${day.format(
            "ww YYYY"
          )}`
        );
      }
      console.log("Contained days");
    } else {
      console.log(
        `OUTPUT ${dayjs(user_message_date)} ${dayjs(user_message_date)}`
      );
      console.log("Contained day");
    }
  }
  // END - Past days

  // Function to retrieve and display past weeks
  function pastWeeks(message) {
    if (message.includes("weeks")) {
      console.log("Contained weeks");

      let total_weeks = dayjs().diff(dayjs(user_message_date), "week");

      for (let i = 0; i < total_weeks; i++) {
        const week = dayjs(now).subtract(i, "week");
        console.log(`OUTPUT Week ${week.week()} ${week.year()}`);
      }
    } else {
      console.log("Contained week");
      console.log(
        `OUTPUT Week ${dayjs(user_message_date).week()} ${dayjs(
          user_message_date
        ).year()}`
      );
    }
  }
  // END - Past weeks

  // Function to retrieve and display past months
  function pastMonths(message) {
    if (message.includes("months")) {
      let total_months = dayjs().diff(dayjs(user_message_date), "month");
      console.log("-This month: " + dayjs().month());
      console.log("-Total months: " + total_months);

      for (let i = 0; i < total_months; i++) {
        const monthNumber = dayjs(now).subtract(i, "month");
        const month = dayjs(now).subtract(i, "month");

        console.log(`OUTPUT ${month.format("MMMM")} ${month.format("YYYY")}`);
      }
      console.log("-Contained months");
    } else {
      console.log(
        `OUTPUT ${dayjs(user_message_date).format("MMMM")} ${dayjs(
          user_message_date
        ).format("YYYY")}`
      );
      console.log("-Contained month");
    }
  }
  // END - Past months

  // Function to retrieve and display past years
  function pastYears(message) {
    if (message.includes("years")) {
      let total_years = dayjs().year() - dayjs(user_message_date).year();
      console.log("-This year: " + dayjs().year());
      console.log("-Total years: " + total_years);

      for (let i = 0; i < total_years; i++) {
        const yearNumber = dayjs(now).subtract(i, "year").year();
        console.log(`OUTPUT ${yearNumber}`);
      }
      console.log("-Contained years");
    } else {
      console.log(`OUTPUT ${dayjs(user_message_date).year()}`);
      console.log("-Contained year");
    }
  }
  // END - Past years
}

// Function to process user messages parsed by chrono
function processUserChrono(user_chrono) {
  for (const { start } of user_chrono) {
    let conditionMet = false;

    // Checking for certain units of time (day, month, year)
    ["day", "month", "year"].forEach((unit) => {
      if (conditionMet) {
        return; // Stop further processing if the condition is already met
      }

      const isCertain = start.isCertain(unit);

      if (unit === "day" && isCertain) {
        console.log(`OUTPUT ${dayjs(message_date).format("MMMM")}`);
        console.log("-Certain day");
        conditionMet = true;
      }
      if (unit === "month" && isCertain) {
        console.log(
          `OUTPUT ${dayjs(message_date).format("MMMM")} ${dayjs(
            message_date
          ).format("YYYY")}`
        );
        console.log("-Certain month");
        conditionMet = true;
      }
      if (unit === "year" && isCertain) {
        console.log(`OUTPUT ${dayjs(message_date).format("YYYY")}`);
        console.log("-Certain year");
        conditionMet = true;
      }
    });

    if (conditionMet) {
      break; // Stop processing user_chrono if the condition is met
    }

    console.log("-----"); // Separating lines for clarity
  }
}
