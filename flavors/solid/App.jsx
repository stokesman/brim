import { render } from 'solid-js/web'
import { createEffect, createSignal } from 'solid-js'
import { Brim } from './index.jsx'
import * as constants from './tests/constants.js'

/**
 * @template [T=unknown]
 * @param {T[]} valueList
 */
const createCycleSignal = (valueList) => {
  /** @type {import('solid-js').Signal<number>} */
  const [index, setIndex] = createSignal(0);
  const nextValue = () => setIndex((index() + 1) % valueList.length)
  /** @type {import('solid-js').Accessor<T>} */
  const value = () => valueList[index()]
  return [value, nextValue]
}

function App() {
  const [word, nextWord] = createCycleSignal(constants.wordList)
  const [offset, nextOffset] = createCycleSignal(constants.offsetList)
  const [space, nextSpace] = createCycleSignal(constants.spaceList)

  return (
    <>
      <button onClick={nextWord}>Change word</button>
      <button onClick={nextOffset}>Change offset</button>
      <button onClick={nextSpace}>Change space</button>

      {/* Single child */}
      <Brim>{word()}</Brim>

      {/* Multiple children and emoji */}
      <Brim>🧱{word()}👁</Brim>

      {/* Emoji while spaced */}
      <Brim space={176}>🤜🍵🤛</Brim>

      {/* Offset */}
      <Brim offset={offset()}>{constants.offsetText}</Brim>

      {/* Space */}
      <Brim space={space()}>{constants.spaceText}</Brim>
    </>
  );
}

render(App, document.getElementById('app'))
