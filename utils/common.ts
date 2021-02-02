export function createdSlug(name: string): string {
  return name
    .toLowerCase()
    .split(' ')
    .join('-')
    .replace('//', '-')
    .replace('/-{2,}/g', '-')
}

export async function unWrap(response: { json?: any; ok?: any; status?: any; statusText?: any }) {
  const json = await response.json()
  const { ok, status, statusText } = response
  return {
    json,
    ok,
    status,
    statusText
  }
}

export function getErrorResponse(error: { message: any }) {
  return {
    ok: false,
    status: 500,
    statusText: error.message,
    json: {}
  }
}
