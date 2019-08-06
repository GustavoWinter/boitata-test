export const normalizeDate = timestamp =>
  handleNormalize(new Date(), new Date(timestamp))

const buildDateStructure = arrayOfDates =>
  arrayOfDates.map(date => {
    date.year = date.getFullYear()
    date.month = date.getMonth()
    date.day = date.getDate()
    date.hours = date.getHours()
    date.minutes = date.getMinutes()

    return date
  })

const compareDates = (current, post) => {
  if(current.year - post.year != 0) return wasPostedIn(current.year - post.year, 'years')
  if(current.month != post.month) return wasPostedIn(current.month - post.month, 'months')
  if(current.month === post.month && current.day != post.day) return wasPostedIn(current.day - post.day, 'days')
  if(current.day === post.day && current.hours != post.hours) return wasPostedIn(current.hours - post.hours, 'hours')
  if(current.hours === post.hours) return wasPostedIn(current.minutes - post.minutes, 'minutes')
  if(current.minutes === post.minutes) return wasPostedIn(0, 'minutes')
  return wasPostedIn(-1, null)
}

const handleNormalize = (currentDate, postDate) => {
  const [current, post] = buildDateStructure([currentDate, postDate])
  return compareDates(current, post)
}

const wasPostedIn = (value, time) =>
  value >= 0
    ? `${value} ${time} ago`
    : 'no date available'
