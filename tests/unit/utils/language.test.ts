import { describe, it, expect } from 'vitest'
import {
  getFlagEmoji,
  formatTranslationWithFlag,
} from '~/views/translation/utils/language'

describe('language utils', () => {
  describe('getFlagEmoji', () => {
    it('should convert "en" to 🇪🇳', () => {
      const result = getFlagEmoji('en')
      expect(result).toBe('🇪🇳')
    })

    it('should convert "en-GB" to 🇬🇧', () => {
      const result = getFlagEmoji('en-GB')
      expect(result).toBe('🇬🇧')
    })

    it('should convert "en-US" to 🇺🇸', () => {
      const result = getFlagEmoji('en-US')
      expect(result).toBe('🇺🇸')
    })

    it('should convert "nl-NL" to 🇳🇱', () => {
      const result = getFlagEmoji('nl-NL')
      expect(result).toBe('🇳🇱')
    })

    it('should convert "de-DE" to 🇩🇪', () => {
      const result = getFlagEmoji('de-DE')
      expect(result).toBe('🇩🇪')
    })

    it('should convert "fr-FR" to 🇫🇷', () => {
      const result = getFlagEmoji('fr-FR')
      expect(result).toBe('🇫🇷')
    })

    it('should convert "es-ES" to 🇪🇸', () => {
      const result = getFlagEmoji('es-ES')
      expect(result).toBe('🇪🇸')
    })

    it('should convert "it-IT" to 🇮🇹', () => {
      const result = getFlagEmoji('it-IT')
      expect(result).toBe('🇮🇹')
    })

    it('should convert "pt-PT" to 🇵🇹', () => {
      const result = getFlagEmoji('pt-PT')
      expect(result).toBe('🇵🇹')
    })

    it('should convert "pt-BR" to 🇧🇷', () => {
      const result = getFlagEmoji('pt-BR')
      expect(result).toBe('🇧🇷')
    })

    it('should convert "ja-JP" to 🇯🇵', () => {
      const result = getFlagEmoji('ja-JP')
      expect(result).toBe('🇯🇵')
    })

    it('should convert "ko-KR" to 🇰🇷', () => {
      const result = getFlagEmoji('ko-KR')
      expect(result).toBe('🇰🇷')
    })

    it('should convert "zh-CN" to 🇨🇳', () => {
      const result = getFlagEmoji('zh-CN')
      expect(result).toBe('🇨🇳')
    })

    it('should convert "zh-TW" to 🇹🇼', () => {
      const result = getFlagEmoji('zh-TW')
      expect(result).toBe('🇹🇼')
    })

    it('should convert "ru-RU" to 🇷🇺', () => {
      const result = getFlagEmoji('ru-RU')
      expect(result).toBe('🇷🇺')
    })

    it('should convert "ar-SA" to 🇸🇦', () => {
      const result = getFlagEmoji('ar-SA')
      expect(result).toBe('🇸🇦')
    })

    it('should convert "hi-IN" to 🇮🇳', () => {
      const result = getFlagEmoji('hi-IN')
      expect(result).toBe('🇮🇳')
    })

    it('should handle single letter language codes', () => {
      const result = getFlagEmoji('e')
      expect(result).toBe('🇪')
    })

    it('should handle uppercase language codes', () => {
      const result = getFlagEmoji('EN-GB')
      expect(result).toBe('🇬🇧')
    })

    it('should handle mixed case language codes', () => {
      const result = getFlagEmoji('En-gB')
      expect(result).toBe('🈌🇧')
    })

    it('should handle language codes without country', () => {
      const result = getFlagEmoji('en')
      expect(result).toBe('🇪🇳')
    })

    it('should handle empty string', () => {
      const result = getFlagEmoji('')
      expect(result).toBe('')
    })

    it('should handle single character', () => {
      const result = getFlagEmoji('A')
      expect(result).toBe('🇦')
    })

    it('should handle special characters gracefully', () => {
      // This test assumes the function handles special characters gracefully
      expect(() => getFlagEmoji('en-!@#')).not.toThrow()
    })
  })

  describe('formatTranslationWithFlag', () => {
    it('should format translation with flag for en-GB', () => {
      const result = formatTranslationWithFlag('Hello', 'en-GB')
      expect(result).toBe('🇬🇧 Hello')
    })

    it('should format translation with flag for nl-NL', () => {
      const result = formatTranslationWithFlag('Hallo', 'nl-NL')
      expect(result).toBe('🇳🇱 Hallo')
    })

    it('should format translation with flag for de-DE', () => {
      const result = formatTranslationWithFlag('Hallo', 'de-DE')
      expect(result).toBe('🇩🇪 Hallo')
    })

    it('should format translation with flag for fr-FR', () => {
      const result = formatTranslationWithFlag('Bonjour', 'fr-FR')
      expect(result).toBe('🇫🇷 Bonjour')
    })

    it('should format translation with flag for es-ES', () => {
      const result = formatTranslationWithFlag('Hola', 'es-ES')
      expect(result).toBe('🇪🇸 Hola')
    })

    it('should format translation with flag for it-IT', () => {
      const result = formatTranslationWithFlag('Ciao', 'it-IT')
      expect(result).toBe('🇮🇹 Ciao')
    })

    it('should format translation with flag for pt-PT', () => {
      const result = formatTranslationWithFlag('Olá', 'pt-PT')
      expect(result).toBe('🇵🇹 Olá')
    })

    it('should format translation with flag for pt-BR', () => {
      const result = formatTranslationWithFlag('Olá', 'pt-BR')
      expect(result).toBe('🇧🇷 Olá')
    })

    it('should format translation with flag for ja-JP', () => {
      const result = formatTranslationWithFlag('こんにちは', 'ja-JP')
      expect(result).toBe('🇯🇵 こんにちは')
    })

    it('should format translation with flag for ko-KR', () => {
      const result = formatTranslationWithFlag('안녕하세요', 'ko-KR')
      expect(result).toBe('🇰🇷 안녕하세요')
    })

    it('should format translation with flag for zh-CN', () => {
      const result = formatTranslationWithFlag('你好', 'zh-CN')
      expect(result).toBe('🇨🇳 你好')
    })

    it('should format translation with flag for zh-TW', () => {
      const result = formatTranslationWithFlag('你好', 'zh-TW')
      expect(result).toBe('🇹🇼 你好')
    })

    it('should format translation with flag for ru-RU', () => {
      const result = formatTranslationWithFlag('Привет', 'ru-RU')
      expect(result).toBe('🇷🇺 Привет')
    })

    it('should format translation with flag for ar-SA', () => {
      const result = formatTranslationWithFlag('مرحبا', 'ar-SA')
      expect(result).toBe('🇸🇦 مرحبا')
    })

    it('should format translation with flag for hi-IN', () => {
      const result = formatTranslationWithFlag('नमस्ते', 'hi-IN')
      expect(result).toBe('🇮🇳 नमस्ते')
    })

    it('should handle empty translation', () => {
      const result = formatTranslationWithFlag('', 'en-GB')
      expect(result).toBe('🇬🇧 ')
    })

    it('should handle empty language code', () => {
      const result = formatTranslationWithFlag('Hello', '')
      expect(result).toBe(' Hello')
    })

    it('should handle long translations', () => {
      const longText =
        'This is a very long translation text that should be formatted correctly with the flag emoji'
      const result = formatTranslationWithFlag(longText, 'en-GB')
      expect(result).toBe('🇬🇧 ' + longText)
    })

    it('should handle translations with special characters', () => {
      const specialText = 'Hello! @#$%^&*()_+-=[]{}|;:,.<>?'
      const result = formatTranslationWithFlag(specialText, 'en-GB')
      expect(result).toBe('🇬🇧 ' + specialText)
    })

    it('should handle translations with emojis', () => {
      const emojiText = 'Hello 👋 World 🌍'
      const result = formatTranslationWithFlag(emojiText, 'en-GB')
      expect(result).toBe('🇬🇧 ' + emojiText)
    })

    it('should handle translations with numbers', () => {
      const numberText = 'Count: 123, Price: $99.99'
      const result = formatTranslationWithFlag(numberText, 'en-GB')
      expect(result).toBe('🇬🇧 ' + numberText)
    })

    it('should handle translations with newlines', () => {
      const multilineText = 'Line 1\nLine 2\nLine 3'
      const result = formatTranslationWithFlag(multilineText, 'en-GB')
      expect(result).toBe('🇬🇧 ' + multilineText)
    })

    it('should handle translations with tabs', () => {
      const tabbedText = 'Tab\tSeparated\tText'
      const result = formatTranslationWithFlag(tabbedText, 'en-GB')
      expect(result).toBe('🇬🇧 ' + tabbedText)
    })

    it('should handle single character language codes', () => {
      const result = formatTranslationWithFlag('Test', 'e')
      expect(result).toBe('🇪 Test')
    })

    it('should handle uppercase language codes', () => {
      const result = formatTranslationWithFlag('Test', 'EN-GB')
      expect(result).toBe('🇬🇧 Test')
    })

    it('should handle mixed case language codes', () => {
      const result = formatTranslationWithFlag('Test', 'En-gB')
      expect(result).toBe('🈌🇧 Test')
    })
  })
})
