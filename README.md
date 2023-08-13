This package is designed to take natural language input and convert it into specific dates or date ranges. Its original purpose is to match date values stored in vector databases with user messages.

The resulting output is either an exact date or an array of date values containing days, weeks, months, or years.

This is helps with finding "aggregated" data in a database from a user message.

For optimal utilization, it's recommended to store your data values as easily readable text within your vector database (or any other database). 

#### Example:
`Saturday Jun 9th 2023 5.30PM (ISO: 17:30) / Week 4 2023`

You can use the output and include it in your search query to effectively find dates from user mesages with as little data as possible.

Examples: 

``` javascript 
speechDate("How many orders were placed in the past 7 days?")
/* [
  'Sunday August 13th 2023 / Week 33 2023',
  'Saturday August 12th 2023 / Week 32 2023',
  'Friday August 11th 2023 / Week 32 2023',
  'Thursday August 10th 2023 / Week 32 2023',
  'Wednesday August 9th 2023 / Week 32 2023',
  'Tuesday August 8th 2023 / Week 32 2023',
  'Monday August 7th 2023 / Week 32 2023',
]*/
```

``` javascript 
speechDate("How many orders where placed last week.")
/* Week 34 2023*/
```

``` javascript 
speechDate("How many orders where placed 3 months ago")
/* November 2023*/
```

``` javascript 
speechDate("How many orders were placed in the past 3 weeks?")
/* [
  'Week 33 2023',
  'Week 32 2023',
  'Week 31 2023',
]*/
```

``` javascript 
speechDate("How many orders were placed in the past 2 years?")
/* [
  '2023',
  '2022',
]*/
```

``` javascript 
speechDate("How many orders were placed on March 22nd?")
/* [
  'Wednesday March 22nd 2023',
]*/
```

The output tries to handle different speech cases to return either 1 date or a range of dates. 

#### For example: 

"From 3 weeks ago" means one week from 3 weeks ago. 
- Result: A single week date value. 

"From the past 3 weeks" means all 3 weeks until today. 
- Result: An array of 3 weeks including the current week. 