/**
 * Language utility functions
 */

/**
 * Convert a language code to a flag emoji using Unicode Regional Indicator Symbols
 * @param languageCode - The language code (e.g., "en-GB", "nl-NL", "en")
 * @returns Flag emoji string
 */
export function getFlagEmoji(languageCode: string): string {
  // Extract country code from language code (e.g., "en-GB" -> "GB", "nl-NL" -> "NL")
  const countryCode = languageCode.split('-')[1] || languageCode.toUpperCase()

  // Convert country code to regional indicator symbols
  // Each flag emoji is made up of two regional indicator letters
  const regionalIndicators = countryCode
    .split('')
    .map(char => String.fromCodePoint(0x1f1e6 + char.charCodeAt(0) - 65)) // A=65, so A becomes 0x1F1E6 (🇦)
    .join('')

  return regionalIndicators
}

/**
 * Format translation with flag emoji
 * @param translation - The translation text
 * @param languageCode - The language code
 * @returns Formatted string with flag emoji
 */
export function formatTranslationWithFlag(
  translation: string,
  languageCode: string
): string {
  const flag = getFlagEmoji(languageCode)
  return `${flag} ${translation}`
}
