const formatResponse = (data = null, meta = null, message = null) => {
  const response = { status: 'success' }

  if (data) {
    response.data = data
  }

  if (meta) {
    response.meta = meta
  }

  if (message) {
    response.message = message
  }

  return response
}

const formatErrorResponse = (message = null) => {
  const response = { status: 'error' }

  if (message) {
    response.message = message
  }

  return response
}

module.exports = { formatResponse, formatErrorResponse } 