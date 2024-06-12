export function generateUrlQueryParams(queryParams: any, addQuestionMark: boolean = true) {
  const queryString = Object.entries(queryParams)
    .map(([key, value]) => `${key}=${value}`)
    .join('&')

  return addQuestionMark ? `?${queryString}` : queryString
}