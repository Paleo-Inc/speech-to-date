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

function speechDate(message) {
  // Getting the current date and time using dayjs
  const now = dayjs();

  // Sample user message and parsing it with chrono
  const user_message_date = chrono.parseDate(message);
  const user_chrono = chrono.parse(message);
  const message_date = chrono.parseDate(message);

  // Keywords indicating the past timeframe
  const past_keywords = ["past", "last"];

  console.log(`-User message: ${message}`);
  console.log(
    `-Today: ${now.format("dddd MMMM Do YYYY")} / Week: ${now.format(
      "ww YYYY"
    )}`
  );
  console.log(`-Message date: ${message_date}`);

  function checkForPastKeywords(message) {
    for (const keyword of past_keywords) {
      if (message.includes(keyword)) {
        return true;
      }
    }
    return false;
  }

  // Function to process user messages based on certain keywords
  function processUserBasedOnKeywords(message) {
    // Check if the user message contains any past keywords
    if (checkForPastKeywords(message)) {
      // If past keywords are found, process the user message
      processUserMessage(message);
      console.log(
        "-Past keywords found in the user message. Running the function..."
      );
    } else {
      // If no past keywords are found, check for specific keyword "week"
      if (message.includes("week")) {
        // Output the week and year using the dayjs library
        console.log(
          `OUTPUT Week ${dayjs(user_message_date).week()} ${dayjs(
            user_message_date
          ).year()}`
        );
      } else {
        // If neither past keywords nor "week" keyword is found, process the user message chronologically
        processUserChrono(user_chrono);
      }

      console.log("-No past keywords found in the user message.");
    }
  }

  function processUserMessage(message) {
    if (message.includes("day")) {
      pastDays(message);
    }
    if (message.includes("week")) {
      pastWeeks(message);
    } else if (message.includes("month")) {
      pastMonths(message);
    } else if (message.includes("year")) {
      pastYears(message);
    } else {
      console.log("-No matching keyword found in the user message.");
    }

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
  }

  function processUserChrono(user_chrono) {
    for (const { start } of user_chrono) {
      let conditionMet = false;

      ["day", "month", "year"].forEach((unit) => {
        if (conditionMet) {
          return;
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
        break;
      }
    }
  }

  processUserBasedOnKeywords(message);
}

export default speechDate;
