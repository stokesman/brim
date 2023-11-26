<script>
  import { makeCyclist } from './lib/utils.js'
  import { wordList, offsetText, spaceText, offsetList, spaceList, emojiText } from './constants.js'

  export let Brim
  export let fontFamily

  let [word, nextWord] = makeCyclist(wordList, v => word = v)
  let [offset, nextOffset] = makeCyclist(offsetList, v => offset = v)
  let [space, nextSpace] = makeCyclist(spaceList, v => space = v)

  let refList = []

  let isFontDirty = false
  let lastFontFamily = fontFamily
  $: isFontDirty = fontFamily !== lastFontFamily

  const refit = () => {
    for (const ref of refList) ref.fit()
    isFontDirty = false
    lastFontFamily = fontFamily
  }
</script>

<div class="buttons">
  <button on:click={nextWord}>Change word</button>
  <button on:click={nextOffset}>Change offset</button>
  <button on:click={nextSpace}>Change space</button>
  <button on:click={refit} disabled={!isFontDirty}>Refit</button>
</div>
<div style:font-family={fontFamily}>
  <!-- Single child -->
  <svelte:component bind:this={refList[0]} this={Brim} text={word}/>

  <!-- Emoji while spaced -->
  <svelte:component bind:this={refList[1]} this={Brim} space={176} text={emojiText}/>

  <!-- Offset -->
  <svelte:component bind:this={refList[2]} this={Brim} offset={offset} text={offsetText}/>

  <!-- Space -->
  <svelte:component bind:this={refList[3]} this={Brim} space={space} text={spaceText}/>
</div>

<style>
  .buttons {
    align-self: stretch;
    grid-row: 1;
    grid-column: 1 / -1;
    display: flex;
    gap: 1em;
    position: relative;
    z-index: 1;
  }
  button {
    flex: 1;
    padding: 2em;
  }
  .buttons + div {
    grid-column: 1 / -1;
    grid-row: 2;
    padding: 0 max(0px, 50% - 320px);
  }
  div :global(svg) {
    border: 1px dashed var(--figure-opposed);
  }
</style>