
export default function getDate() {
  let date = new Date()
  return date.toUTCString().split(' ').slice(0, 4).join(' ')
}