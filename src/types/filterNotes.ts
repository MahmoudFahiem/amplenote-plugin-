/**
 * Interface for filter parameters used in the findNoteHandles method.
 *
 * This corresponds to the group= query string parameter when viewing
 * https://www.amplenote.com/notes and filtering on a specific group or set of groups.
 * Multiple groups can be specified with a comma separator.
 *
 * @property {string} group - Filter group to apply.
 * This corresponds to the group= query string parameter when viewing
 * https://www.amplenote.com/notes and filtering on a specific group or set of groups.
 * Multiple groups can be specified with a comma separator.
 */
export interface FilterParameters {
  group?: string;

  /**
   * String fuzzy search term to filter matching notes on. Note that this is not full-text search,
   * and matches the behavior of not suggestion UI that matches on note names.
   *
   * @property {string} query - String fuzzy search term.
   */
  query?: string;

  /**
   * Tag filter to apply. This corresponds to the tag= query string parameter when viewing
   * https://www.amplenote.com/notes and filtering on a specific tag or set of tags.
   * Multiple tags can be specified with a comma separator - matching notes must have all specified tags.
   * A tag prefixed with ^ will only match notes that do not have the tag.
   *
   * @property {string} tag - Tag filter to apply.
   */
  tag?: string;
}
