<!-- @component An adapter for using the React version in Svelte -->
<script>
  import {createElement as h, forwardRef, useState} from "react"
  import {createRoot} from "react-dom/client"
  import {afterUpdate, onMount} from "svelte"
  import {Brim} from '@brim/react'

  let actualize
  export const fit = () => actualize?.()

  let target

  let stateSetter
  let isNotInitial
  afterUpdate(() => {
    if (isNotInitial) stateSetter($$props)
    else isNotInitial = true
  })

  const StatefulBrim = forwardRef((initialProps, ref) => {
    let props
    [props, stateSetter] = useState(initialProps)
    const { text, ...rest } = props;
    return h(Brim, { ref, children: text, ...rest })
  })

  onMount(() => {
    let root
    let setRef = aRef => actualize = aRef
    try {
      root = createRoot(target)
      root.render(h(StatefulBrim, {...$$props, ref: setRef}))
    } catch (err) {
      console.warn(`react-adapter failed to mount.`, { err })
      return;
    }
    return () => {
      try {
        root.unmount()
      } catch (err) {
        console.warn(`react-adapter failed to unmount.`, { err })
      }
    }
  });
</script>

<div bind:this={target} class=brim />