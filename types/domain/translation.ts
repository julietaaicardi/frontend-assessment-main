/**
 * Domain types for translation functionality
 */

/**
 * Core translation value from Directus
 * exists at https://directus.altura.io/items/translationKeys_translations
 */
export interface TranslationValue {
	/**
	 * Internal reference id, you shouldn't need to use this.
	 */
	id?: number;
	/**
	 * The value of this translation.
	 */
	value: string;
	/**
	 * The translation key this translation is part of.
	 */
	translationKeys_key: string;
	/**
	 * The language code of this translation.
	 * @example "en-GB", "nl-NL"
	 */
	languages_code: string;
}

/**
 * Directus translation entity
 * exists at https://directus.altura.io/items/translationKeys
 */
export interface DirectusTranslation {
	/**
	 * The key used to reference translation values.
	 * @example $t(`general.accept`) === "Accept"
	 */
	key: string;
	/**
	 * Creation timestamp
	 */
	createdAt: string;
	/**
	 * Last update timestamp
	 */
	updatedAt: string | null;
	/**
	 * Nested translations data with value and language code
	 */
	translations: {
		value: string;
		languages_code: string;
	}[];
}

/**
 * Application-level translation key interface
 */
export interface TranslationKey {
  key: string
  translation: string
  updatedAt: string
} 