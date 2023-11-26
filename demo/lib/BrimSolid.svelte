<!-- @component An adapter for using the Solid version in Svelte -->
<script>
  import {createSignal} from 'solid-js'
  import {render} from 'solid-js/web'
  import h from 'solid-js/h'
  import {afterUpdate, onMount} from 'svelte'
  import {Brim} from '@brim/solid'

  let actualize
  export const fit = () => actualize()

  let target;

  const initialProps = $$props
  let stateSetter
  let isNotInitial
  afterUpdate(() => {
    if (isNotInitial) stateSetter($$props)
    else isNotInitial = true;
  })

  const SignalableBrim = () => {
    let props
    [props, stateSetter] = createSignal(initialProps)
    return h(Brim, {
      children: () => props().text,
      offset: () => props().offset,
      space: () => props().space,
      ref: ref => actualize = ref,
    })
  }

  onMount(() => {
    const dispose = render(SignalableBrim, target);
    return dispose;
  });
</script>

<div bind:this={target} class=brim/>