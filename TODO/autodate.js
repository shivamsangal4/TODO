function autodate() {
    let inputText= document.getElementById('text1').value;
    // Regular expression pattern to match "today by 5pm" and "tomorrow by 10pm" in the input text
    const regex = /(today|tomorrow)\s+by\s+(\d{1,2}(?:\:\d{2})?\s*(?:am|pm))/i;
  
    // Extracting the task description, date, and time from the input text
    const match = inputText.match(regex);
  
    // If the pattern is found, extract the task, date, and time
    if (match) {
      const task = inputText.replace(match[0], '').trim();
      const tomorrow = new Date();
      if (match[1].toLowerCase() === 'tomorrow') {
        tomorrow.setDate(tomorrow.getDate() + 1);
      }
      const timeString = match[2].replace(/\s+/g, '').toLowerCase();
      const timeComponents = timeString.match(/(\d{1,2})(?::(\d{2}))?(am|pm)/i);
      if (timeComponents) {
        let hours = parseInt(timeComponents[1], 10);
        const minutes = timeComponents[2] ? parseInt(timeComponents[2], 10) : 0;
        const ampm = timeComponents[3].toLowerCase();
        if (ampm === 'pm' && hours !== 12) {
          hours += 12;
        } else if (ampm === 'am' && hours === 12) {
          hours = 0;
        }
        tomorrow.setHours(hours);
        tomorrow.setMinutes(minutes);
      }
      const dateTime = tomorrow.toISOString().slice(0, 16);
      document.getElementById('text1').value=task;
      document.getElementById('deadline').value=dateTime;
      return { task, dateTime };
    } else {
      return null; // If no match is found, return null
    }
  }
  
//   // Example usage:
//   const inputText1 = "complete x by today by 5pm";
//   const result1 = extractTaskAndDateTime(inputText1);
//   console.log(result1); // Output: { task: 'complete x', dateTime: '2023-07-21T17:00' }
  
//   const inputText2 = "complete y by tomorrow by 10 pm";
//   const result2 = extractTaskAndDateTime(inputText2);
//   console.log(result2); // Output: { task: 'complete y', dateTime: '2023-07-22T22:00' }
  


