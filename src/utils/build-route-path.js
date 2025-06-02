export function buildRoutePath(path) {
  const routeParametersRegex = /:([a-zA-Z]+)/g
  const paramsWithParams = path.replaceAll(
    routeParametersRegex,
    "(?<$1>[a-z0-9-_]+)"
  )

  const pathRegex = new RegExp(`^${paramsWithParams}(?<query>\\?(.*))?$`)

  return pathRegex
}
// This function takes a path string (e.g., "/users/:id") and converts it into a regex pattern that can match the path with optional query parameters.
// For example, "/users/:id" becomes "^/users/(?<id>[a-z0-9-_]+)(?<query>\\?(.*))?$"