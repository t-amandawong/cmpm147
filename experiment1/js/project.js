// sketch.js - notes app apology generator
// Author: Thanyared Wong
// Date: 04.02.2024

let inputtedName = 'NAME'
const nameInput = document.getElementById('nameInput')
const submitButton = document.getElementById('submitButton')
const box = document.getElementById('bodyText')
const date = document.getElementById('date-header')

const fillers = {
  greeting: ['Hi everyone. ', "Hey. ", "Hi. ", "Hello. ", ""],
  opening: ["You might have noticed that", "Recently,", "It has come to my attention that", "I want to acknowledge that"],
  media: [" post", " video", " photo", "n image", " clip", " tweet", "n audio"],
  platform: ["Twitter", "Facebook", "Instagram", "Snapchat", "Google+", "TikTok", "Pinterest", "YouTube", "Reddit", "LinkedIn", "Tumblr", "the internet"],
  validity: ["am", "am alleged to have been", "was wrongly accused of", "appear to be", "was"],
  accusation: ["grooming dogs", "creating pdf files", "appropriating funds", "disrespecting my elders", "seasoning my food", "leading the robot revolution"],
  ownership: ["take full responsibility for", "regret", "am extremely remorseful of", "am truly sorry for", "am sorry if anyone was offended by"],
  future: ["Going forward", "In the future", "Moving forward", "Ultimately"],
  promise: ["that this will not happen again", "to not repeat the same mistakes", "to do some self-reflection", "to be more sensitive"],
  action: ["be disrespectful", "offend anyone", "be insensitive", "hurt anyone", "create hostility"],
  closing: ["Much love, ", "Peace, ", "With a heavy heart, ", "Graciously, ", "With much remorse, ", "Regretfully, "]
};

const slotPattern = /\$(\w+)/;

function replacer(match, name) {
  let options = fillers[name];
  if (options) {
    return options[Math.floor(Math.random() * options.length)];
  } else {
    return `<UNKNOWN:${name}>`;
  }
}

// put template in the generate function so that name will update each time
function generate() {
  const template = `$greeting
  $opening a$media of me has been circulating around $platform, in which I $validity $accusation. I want to make it clear that I $ownership my actions. $future, I will make sure $promise. It was never my intention to $action. Again, I $ownership what I've done.

  $closing
  ${inputtedName} ❤️
`;
  let story = template;
  while (story.match(slotPattern)) {
    story = story.replace(slotPattern, replacer);
  }
  
  date.innerText = getCurrentDateTimeFormatted();
  box.innerText = story
}

// date formatting function made with the help of ChatGPT
function getCurrentDateTimeFormatted() {
  const now = new Date();

  // Get the month, date, and year
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const month = months[now.getMonth()];
  const date = now.getDate();
  const year = now.getFullYear();

  // Get hours, minutes, and prepare for AM/PM format
  let hours = now.getHours();
  const minutes = now.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  const minutesFormatted = minutes < 10 ? '0' + minutes : minutes;

  // Format the time
  const time = `${hours}:${minutesFormatted} ${ampm}`;

  // Combine the date and time in the requested format
  return `${month} ${date}, ${year} at ${time}`;
}

// button onclick function made with help of ChatGPT
submitButton.onclick = function(event) {
  inputtedName = nameInput.value
  generate();
}

generate();