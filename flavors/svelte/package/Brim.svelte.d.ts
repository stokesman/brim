/** @typedef {typeof __propDef.props}  BrimProps */
/** @typedef {typeof __propDef.events}  BrimEvents */
/** @typedef {typeof __propDef.slots}  BrimSlots */
/**
 * Fits text to its container.
 *
 * ```svelte
 * <Brim text="SUCH SVELTE" offset={[-10, -2, -10, -4]}/>
 * ```
 */
export default class Brim extends SvelteComponentTyped<{
    offset?: number | number[];
    text?: string;
    space?: string | number;
    fit?: () => void;
}, {
    [evt: string]: CustomEvent<any>;
}, {}> {
    get fit(): () => void;
}
export type BrimProps = typeof __propDef.props;
export type BrimEvents = typeof __propDef.events;
export type BrimSlots = typeof __propDef.slots;
import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        offset?: number | number[];
        text?: string;
        space?: string | number;
        fit?: () => void;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export {};
