export default function getLocalDatetimeISOString(ISODateTimeString) {
  console.log(ISODateTimeString);
  const datetime = new Date(ISODateTimeString);
  return datetime.toLocaleString('en-GB');
}
