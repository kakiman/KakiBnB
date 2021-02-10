export function createdSlug(name: string): string {
  return name
    .toLowerCase()
    .split(' ')
    .join('-')
    .replace('//', '-')
    .replace('/-{2,}/g', '-')
}

export function unWrap(response: { json?: any; ok?: any; status?: any; statusText?: any }) {
  const { ok, status, statusText } = response
  return {
    ok,
    status,
    statusText
  }
}

export function getOkResponse(response: { json?: any; ok?: any; status?: any; statusText?: any }) {
  const { status, statusText } = response
  return {
    ok: true,
    status,
    statusText
  }
}

export function getErrorResponse(error: { message: any }) {
  return {
    ok: false,
    status: 500,
    statusText: error.message
  }
}

export function formatDate(dateStr: string | number | Date) {
  const date = new Date(dateStr)
  return date.toLocaleDateString(undefined, { month: 'long', year: 'numeric' })
}
