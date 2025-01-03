/**
 * Safely encodes a URL slug by handling special characters
 * @param {string} slug - The URL slug to encode
 * @returns {string} The encoded slug
 */
export const encodeUrlSlug = (slug) => {
  if (!slug) return '';
  
  // First decode any existing encoded components
  try {
    slug = decodeURIComponent(slug);
  } catch (e) {
    console.warn('Failed to decode slug:', e);
  }

  // Replace problematic characters with safe alternatives
  return slug
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')           // Replace spaces with hyphens
    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars (except hyphens)
    .replace(/\-\-+/g, '-')         // Replace multiple hyphens with single hyphen
    .replace(/^-+/, '')             // Trim hyphens from start
    .replace(/-+$/, '');            // Trim hyphens from end
};

/**
 * Decodes a URL-safe slug back to its original form
 * @param {string} encodedSlug - The encoded URL slug
 * @returns {string} The decoded slug
 */
export const decodeUrlSlug = (encodedSlug) => {
  if (!encodedSlug) return '';
  
  try {
    // First try to decode any URL-encoded characters
    encodedSlug = decodeURIComponent(encodedSlug);
  } catch (e) {
    console.warn('Failed to decode slug:', e);
  }

  // Convert hyphens back to spaces
  return encodedSlug.replace(/-/g, ' ');
};
