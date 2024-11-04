/**
 * Set to never all function of a class or a type
 */
type NonFunctionKeyNames<T> = Exclude<
  {
    // eslint-disable-next-line @typescript-eslint/ban-types
    [key in keyof T]: T[key] extends Function ? never : key;
  }[keyof T],
  undefined
>;

/**
 * This type can be used to get only the attribute of a class and exclude the methods
 */
export type AttributesOnly<T> = Pick<T, NonFunctionKeyNames<T>>;

/**
 * Removes readonly properties from a type.
 *
 * @template T The type from which to remove readonly properties.
 * @returns A new type identical to `T`, but without readonly properties.
 */
export type RemoveReadonly<T> = {
  -readonly [key in keyof T]: T[key];
};
