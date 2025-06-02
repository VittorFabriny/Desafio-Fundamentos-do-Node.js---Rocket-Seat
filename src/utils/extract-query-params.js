export function extractQueryParams(query) {
  return query
    .substr(1)
    .split("&")
    .reduce((queryParams, param) => {
      const [key, value] = param.split("=")

      queryParams[key] = value

      return queryParams
    }, {})
}

// This function takes a query string (e.g., "?name=John&age=30") and converts it into an object:
// { name: "John", age: "30" }
// It splits the query string by "&" to get each key-value pair, then splits each pair by "=" to separate keys and values. 
// The result is an object where each key corresponds to a query parameter and its value is the associated value from the query string.
// This is useful for extracting parameters from URLs in web applications, allowing easy access to query parameters in a structured format.