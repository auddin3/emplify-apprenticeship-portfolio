const calculateDateDifference = (targetDate) => {
  const currentDate = new Date()
  const targetDateObj = new Date(targetDate)

  const timeDifference = targetDateObj.getTime() - currentDate.getTime()
  const daysDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24))

  return daysDifference
}

const camelCaseToSpaced = (str) => {
  if (str) {
    return str
      .replace(/([a-z])([A-Z])/g, '$1 $2')
      .replace(/^./, s => s.toUpperCase())
  }
}

const convertDateToString = (date, options = { day: 'numeric', month: 'numeric', year: 'numeric' }) => {
  return new Date(date).toLocaleDateString('en-GB', options)
}

const capitalize = (str) => {
  return str.replace(/\b\w/g, match => match.toUpperCase())
}

const generateRandomString = (length) => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let result = ''
  const charactersLength = characters.length
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
  }
  return result
}

const handleSort = ({ elements, selected }) => {
  const sortedElements = [...elements]

  if (selected.type === 'alpha') {
    if (selected.chronological) {
      if (selected?.property) return (sortedElements.sort((a, b) => a[selected.property].localeCompare(b[selected.property])))
      if (sortedElements[0]?.name !== undefined) return (sortedElements.sort((a, b) => a.name.localeCompare(b.name)))
      if (sortedElements[0]?.title !== undefined) return (sortedElements.sort((a, b) => a.title.localeCompare(b.title)))
    } else {
      if (selected?.property !== undefined) return (sortedElements.sort((a, b) => b[selected.property].localeCompare(a[selected.property])))
      if (sortedElements[0]?.name !== undefined) return (sortedElements.sort((a, b) => b.name.localeCompare(a.name)))
      if (sortedElements[0]?.title !== undefined) return (sortedElements.sort((a, b) => b.title.localeCompare(a.title)))
    }
  }
  if (selected.type === 'numerical') {
    if (selected.chronological) return (sortedElements.sort((a, b) => a[selected.property] - b[selected.property]))
    else return (sortedElements.sort((a, b) => b[selected.property] - a[selected.property]))
  }
  if (selected.type === 'date') {
    if (selected.chronological) {
      return (sortedElements.sort((a, b) => {
        const dateA = a[selected.property] ? new Date(a[selected.property]) : null
        const dateB = b[selected.property] ? new Date(b[selected.property]) : null

        return dateB - dateA
      }))
    } else {
      return (sortedElements.sort((a, b) => {
        const dateA = a[selected.property] ? new Date(a[selected.property]) : null
        const dateB = b[selected.property] ? new Date(b[selected.property]) : null

        return dateA - dateB
      }))
    }
  }
}

module.exports = { calculateDateDifference, camelCaseToSpaced, convertDateToString, capitalize, generateRandomString, handleSort }
