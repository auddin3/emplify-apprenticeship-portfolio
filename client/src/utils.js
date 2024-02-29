export const calculateDateDifference = (targetDate) => {
  const currentDate = new Date()
  const targetDateObj = new Date(targetDate)

  const timeDifference = targetDateObj.getTime() - currentDate.getTime()
  const daysDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24))

  return daysDifference
}
