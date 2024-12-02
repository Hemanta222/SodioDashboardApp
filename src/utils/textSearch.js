/**
 * Filters records by matching a query (case-insensitive).
 *
 * @param {Array} records - Array of objects to search.
 * @param {string} query - Substring to search for.
 * @param {string} key - Key of the object to search within.
 * @returns {Array} - Filtered records.
 */
export function filterRecordsWithRegex(records, query, key) {
  if (!query) return records; // Return all records if query is empty
  const regex = new RegExp(query, "i");
  return records.filter((record) => regex.test(record[key]));
}
