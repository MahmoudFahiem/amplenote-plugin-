/**
 * Options for the `alert` method in the Amplenote plugin API.
 *
 * @property preface - A string to show before the main message in the alert dialog.
 * @property actions - Array<{@link AlertAction}> - An array of action objects that will be added as buttons on the alert dialog.
 * Each action object can have the following properties:
 * @property primaryAction {@link PrimaryAction} - An object describing the presentation of the rightmost button on the alert dialog
 * (the "DONE" button), with the following properties:
 * @property scrollToEnd - A boolean indicating whether the message shown to the user should be scrolled down
 * so the end is visible, if it is long enough that the alert dialog has a scrollbar.
 */
export interface AlertOptions {
  preface?: string;
  actions?: Array<AlertAction>;
  primaryAction?: PrimaryAction;
  scrollToEnd?: boolean;
}

/**
 * @property label: the String text to show on the button.
 * @property icon: name of a {@link https://fonts.google.com/icons?icon.set=Material+Icons | Material Icon} to show on the button.
 * @property value: optional value (of any basic JS type) that will be returned when the action is triggered,
 * instead of the index in the actions array.
 */
export interface AlertAction {
  label: string;
  icon?: string;
  value?: string;
}

export type PrimaryAction = Omit<AlertAction, "value">;
