/**
 * @param {string} path
 * @returns {Boolean}
 */
export const isExternal = (path) => {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * @param {string} path
 * @returns {Boolean}
 */
export const isTagLink = (path) => {
  return /^(\/tag\/)/.test(path)
}
