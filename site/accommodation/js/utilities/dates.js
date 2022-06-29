function createDateRangeString() {
  const formattingOptions = { month: "short", day: "numeric" };

  return (
    userInputs.startDate.dateInstance.toLocaleDateString(
      "en-NZ",
      formattingOptions
    ) +
    " - " +
    userInputs.endDate.dateInstance.toLocaleDateString(
      "en-NZ",
      formattingOptions
    )
  );
}

function createLongDateString(date) {
  const formattingOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  return date.dateInstance.toLocaleDateString("en-NZ", formattingOptions);
}
