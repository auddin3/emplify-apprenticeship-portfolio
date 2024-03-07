export const calculateDateDifference = (targetDate) => {
  const currentDate = new Date()
  const targetDateObj = new Date(targetDate)

  const timeDifference = targetDateObj.getTime() - currentDate.getTime()
  const daysDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24))

  return daysDifference
}

export const camelCaseToSpaced = (str) => {
  if (str) {
    return str
      .replace(/([a-z])([A-Z])/g, '$1 $2')
      .replace(/^./, s => s.toUpperCase())
  }
}

export const convertDateToString = (date) => {
  const options = { day: 'numeric', month: 'numeric', year: 'numeric' }
  return new Date(date).toLocaleDateString('en-GB', options)
}

export const capitalize = (str) => {
  return str.replace(/\b\w/g, match => match.toUpperCase())
}
