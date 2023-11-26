import { test, expect } from '@playwright/test'
import { readFile } from 'fs/promises'
import { wordList, offsetText, spaceText, spaceList, emojiText } from '../constants.js'

test.describe('`viewBoxOn`', async () => {
  let page
  let cases = [
    [
      [],
      'No offset',
      '0 0 10 10',
    ],
    [
      [-1],
      'offset of -1',
      '1 1 8 8',
    ],
    [
      [1],
      'offset of 1',
      '-1 -1 12 12',
    ],
    [
      [1, 2],
      'offset of 1, 2',
      '-2 -1 14 12',
    ],
    [
      [1, 2, 3],
      'offset of 1, 2, 3',
      '-2 -1 14 14',
    ],
    [
      [1, 2, 3, -4],
      'offset of 1, 2, 3, -4',
      '4 -1 8 14',
    ],
  ]
  let actuals
  test.beforeAll(async ({browser}) => {
    page = await browser.newPage()
    await page.exposeFunction('setActuals', results => {
      actuals = results
    })
    const viewBoxOnSource = await readFile('../flavors/dom/view-box-on.js')
    await page.setContent(`
      <svg xmlns="http://www.w3.org/2000/svg">
        <rect x="0" y="0" width="10" height="10"/>
      </svg>
      <script type="module">
        ${ viewBoxOnSource }
        const [rect] = document.getElementsByTagName('rect')
        const results = {}
        for (const [offset, description] of ${ JSON.stringify(cases) })
          results[description] = viewBoxOn(rect, ...offset)
        setActuals(results)
      </script>
    `)
  })
  for (const [, description, expected] of cases)
    test(description, () => expect(actuals[description]).toBe(expected))
});

for (const flavor of ['Dom', 'React', 'Solid', 'Svelte']) {
  test.describe(flavor, async () => {
    /** @type {(newFlavor:string) => {page:import('@playwright/test').Page}} */
    let setup
    test.beforeAll(async ({browser}) => {
      const page = await browser.newPage()
      await page.goto('http://localhost:5173/test')
      let flavor
      setup = async (newFlavor) => {
        if (flavor !== newFlavor) {
          await page.getByLabel(newFlavor).check()
          flavor = newFlavor
        }
        return { page }
      }
    })

    const [firstWord, secondWord] = wordList;

    test('Renders as accessible text', async () => {
      const { page } = await setup(flavor);
      // Test render, i.e. the first word can be found
      await expect(page.getByText(firstWord, { exact: true })).toHaveCount(1)
    })

    test('Emojis work with non-zero `space` prop', async () => {
      const { page } = await setup(flavor);
      await expect(page.getByText(emojiText)).toHaveCount(1)
    })

    test('Fit method affects `viewBox` attribute', async () => {
      const { page } = await setup(flavor);
      await page.getByLabel('Font Family').selectOption('fantasy')
      const firstWordEl = page.getByText(firstWord, { exact: true })
      const firstWordViewBox = await firstWordEl.evaluate(
        node => node.parentNode.getAttribute('viewBox')
      )
      await page.getByRole('button', { name: 'Refit' }).click()
      const secondWordViewBox = await firstWordEl.evaluate(
        node => node.parentNode.getAttribute('viewBox')
      )
      expect(firstWordViewBox).not.toEqual(secondWordViewBox)
    })

    test.describe('Reactivity', async () => {
      test.skip(() => flavor === 'Dom', 'Skip reactivity tests for Dom flavor')

      test('Reacts to text changes', async () => {
        const { page } = await setup(flavor);
        // Change the word
        await page.getByRole('button', { name: 'Change word' }).click()
        // The second word can now be found
        await expect(page.getByText(secondWord, { exact: true })).toHaveCount(1)
      })

      test('Test offset prop and that it affects `viewBox` attribute', async () => {
        const { page } = await setup(flavor);
        const brimOffset = page.getByText(offsetText)
        const firstOffsetViewBox = await brimOffset.evaluate(
          node => node.parentNode.getAttribute('viewBox')
        )
        // Change the offset
        await page.getByRole('button', {name: 'Change offset'}).click()
        const secondOffsetViewBox = await brimOffset.evaluate(
          node => node.parentNode.getAttribute('viewBox')
        )
        // viewBox has changed
        expect(firstOffsetViewBox).not.toEqual(secondOffsetViewBox)
      })

      test('Test space prop and that it affects `viewBox` and `dx` attributes', async () => {
        const { page } = await setup(flavor);
        const [firstSpace] = spaceList;
        const brimSpace = page.getByText(spaceText)
        const [firstSpaceViewBox, dxAttr] = await brimSpace.evaluate(
          node => [
            node.parentNode.getAttribute('viewBox'),
            node.getAttribute('dx')
          ]
        )
        // dx attribute is roughly as expected
        expect(dxAttr.startsWith('0')).toBe(true)
        expect(dxAttr.endsWith(firstSpace)).toBe(true)
        // expect(new RegExp(`/firstSpace/`.e dxAttr)
        // Change the space
        await page.getByRole('button', {name: 'Change space'}).click()
        const [secondSpaceViewBox, hasDxAttr] = await brimSpace.evaluate(
          node => [
            node.parentNode.getAttribute('viewBox'),
            node.hasAttribute('dx')
          ]
        )
        // viewBox has changed
        expect(firstSpaceViewBox).not.toEqual(secondSpaceViewBox)
        // there’s no dx attribute
        expect(hasDxAttr).toBe(false)
      })
    })
  })
}