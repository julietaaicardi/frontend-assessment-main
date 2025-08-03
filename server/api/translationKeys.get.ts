export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  
  try {
    const response = await $fetch('https://directus.altura.io/items/translationKeys', {
      query,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'application/json, text/plain, */*',
        'Accept-Language': 'en-US,en;q=0.9',
      }
    })
    
    return response
  } catch (error: any) {
    console.error('Server API Error:', error)
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || 'Failed to fetch translation keys'
    })
  }
}) 