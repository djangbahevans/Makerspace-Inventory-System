// ^. - Match first character
// | - or
// \b. - Match first letter after every white space
const match = /^.|\b./g;

export default words => words.replace(match, letter => letter.toUpperCase());