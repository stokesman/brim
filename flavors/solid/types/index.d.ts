export type BrimChild = string | number;
export type Ref<T> = import('solid-js').Ref<T>;
export type BrimProps = {
    children: BrimChild | BrimChild[];
    /**
     * Offset from the edges of the measured bounding rectangle.
     *
     * - When one value is specified, it applies the same offset to all four sides.
     * - When two values are specified, the first offset applies to the top and bottom, the second to the left and right.
     * - When three values are specified, the first offset applies to the top, the second to the right and left, the third to the bottom.
     * - When four values are specified, the offsets apply to the top, right, bottom, and left in that order (clockwise).
     */
    offset: number | number[];
    /**
     * Space between characters.
     */
    space: number;
    /**
     * A function to refit the text.
     */
    ref: Ref<() => void>;
};
/** @typedef {string | number} BrimChild */
/**
 * @template T
 * @typedef {import('solid-js').Ref<T>} Ref
 */
/**
 * @typedef BrimProps
 * @prop {BrimChild | BrimChild[]} children
 * @prop {number|number[]}         offset   Offset from the edges of the measured bounding rectangle.
 *
 *  - When one value is specified, it applies the same offset to all four sides.
 *  - When two values are specified, the first offset applies to the top and bottom, the second to the left and right.
 *  - When three values are specified, the first offset applies to the top, the second to the right and left, the third to the bottom.
 *  - When four values are specified, the offsets apply to the top, right, bottom, and left in that order (clockwise).
 * @prop {number}                  space    Space between characters.
 *
 * @prop {Ref<() => void>}         ref      A function to refit the text.
 */
/**
 * Fits text to its container.
 *
 * @example
 * ```js
 * <Brim space={10} offset={[-10, -5]}>IMPORTANT</Brim>
 * ```
 * @type {import('solid-js').Component<BrimProps>}
 */
export const Brim: import('solid-js').Component<BrimProps>;
export { viewBoxOn };
