import { NoteHandle } from "./NoteHandle";
import { AlertOptions } from "./alert";
import { FilterParameters } from "./filterNotes";
/**
 * The app interface provides the means of interacting with the application.
 * It is passed to all plugin action functions as the first argument
 */
export interface App {
  /**
   *  Add a tag to a note.
   *
   * @param noteHandle {@link NoteHandle} identifying the note to add the tag to
   * @param tagName text of the tag to add
   * note that this will be normalized to conform to allowed tag names (lowercase, dashes), if it is not a valid tag name
   * @returns boolean indicating whether the tag was added.
   * In some cases, shared tags cannot be added to notes - and this will return false.
   * @throws If the given tag argument is not a string
   */
  addNoteTag(
    noteHandle: Partial<NoteHandle>,
    tagName: string
  ): Promise<boolean>;
  /**
   * Show the user a message.
   * The name of the plugin is shown in the title of the dialog.
   * Similar to {@link App.prompt | prompt}, except that this doesn't offer inputs, and instead offers "actions",
   * which are buttons the user can pick at the bottom of the notification.
   *
   * @param message the String to show the user. Use "\n" to output new lines. Unicode characters are supported. Markdown is not (yet).
   * @param options {@link AlertOptions} additional options
   * @returns
   * - null if the user dismisses the dialog.
   * - -1 if the user presses the "DONE" button (or the {@link AlertOptions.primaryAction | primaryAction} button if supplied).
   * - The integer index corresponding to the action the user selected.
   * - if the selected action includes a value key, the value associated with the value key.
   *
   */
  alert(message?: string, options?: AlertOptions): null | number | string;
  /**
   * Upload a media file, associating it with the specified note.
   * This function uploads the file directly, so the user must be online for it to work,
   * and it may take a long time, depending on the size of the media and connectivity.
   *
   * @param noteHandle {@link NoteHandle} Describing the note to attach the media to.
   * @param dataURL A {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URLs | data URL} describing the media file data.
   * @returns URL of uploaded media.
   * @throws If the media file is too large, or otherwise not allowed.
   * If there are network errors that prevent upload.
   */
  attachNoteMedia(
    noteHandle: Partial<NoteHandle>,
    dataURL: string
  ): Promise<string>;
  /**
   * Create a new note, optionally specifying a name and/or tags to apply.
   *
   * @param name Optional string name to give the new note.
   * @param tags Optional array of string tag names to apply to the new note.
   * @returns UUID of the newly created note.
   * This is typically a local-prefixed UUID that may change once persisted to the remote servers,
   * but can continue to be used on the same client to identify the note.
   * Calling findNote with this UUID will return a noteHandle with a non-local-prefixed UUID
   * if the note has since completed persistence.
   */
  createNote(name?: string, tags?: string[]): Promise<string>;
  /**
   * Find noteHandles for all notes matching a set of filter criteria.
   *
   * @param filters - {@link FilterParameters} Optional object describing filter parameters.
   * @returns An array of noteHandles for all notes that match the filter parameters.
   */
  filterNotes(filters?: FilterParameters): Promise<Array<NoteHandle>>;
  /**
   * Finds the noteHandle of a note, if the note is extant and not marked as deleted.
   * In addition to verifying whether a note exists, this can be used to fill in some additional details for a note,
   * e.g., if the plugin only has a noteUUID it can call this to get the name and tags applied to the note.
   *
   * @param noteInfo - Partial<{@link NoteHandle}> Object identifying the note to find, with the following properties:
   *  - uuid: The UUID identifying a specific note, if provided, will be used regardless of other properties.
   *  - name: String name of the note to find. If uuid is not provided, this must be supplied.
   *  - tags: Optional array of tag filter strings that the note must match, in addition to the name.
   *          Each array entry can be the name of a tag, e.g., ["some-tag"], or can include a negation operator
   *          to only match notes that don't have that tag, e.g., ["^not-this-tag"].
   * @returns NoteHandle of the note, or null if the note does not exist or has been marked as deleted.
   * If the note is found, the extracted details are returned.
   */
  findNote(noteInfo: Partial<NoteHandle>): Promise<NoteHandle | null>;
}
