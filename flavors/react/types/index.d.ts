export type BrimChild = string | number;
export type BrimProps = {
    children: BrimChild | BrimChild[];
    /**
     * Offset from the edges.
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
};
/**
 * A function to refit the text.
 */
export type BrimFit = () => void;
/** @typedef {string | number} BrimChild */
/**
 * @typedef BrimProps
 * @prop {BrimChild | BrimChild[]} children
 * @prop {number|number[]} offset Offset from the edges.
 *
 * - When one value is specified, it applies the same offset to all four sides.
 * - When two values are specified, the first offset applies to the top and bottom, the second to the left and right.
 * - When three values are specified, the first offset applies to the top, the second to the right and left, the third to the bottom.
 * - When four values are specified, the offsets apply to the top, right, bottom, and left in that order (clockwise).
 * @prop {number} space Space between characters.
 */
/**
 * @typedef {() => void} BrimFit A function to refit the text.
 */
/**
 * Fits text to its container.
 *
 * @example
 * ```js
 * <Brim space={10} offset={[-10, -5]}>IMPORTANT</Brim>
 * ```
 * @type {import('react').ForwardRefRenderFunction<BrimFit, BrimProps>}
 */
export const Brim: import('react').ForwardRefRenderFunction<BrimFit, BrimProps>;
export { viewBoxOn };
