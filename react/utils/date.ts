export const compareDate = (dateOrder: string, dateGroup: Date) => {
  const newDateOrder = new Date(dateOrder)
  if(
    dateGroup.getDate() == newDateOrder.getDate() &&
    dateGroup.getMonth() == newDateOrder.getMonth() &&
    dateGroup.getFullYear() == newDateOrder.getFullYear()
  ) return true
  return false
}
