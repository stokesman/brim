import { test, expect } from '@playwright/test'
import { wordList, offsetText, spaceText, spaceList } from './constants.js'

test('Renders and reacts to prop changes', async ({ page }) => {
  await page.goto('http://localhost:5173');

  const [firstWord, secondWord] = wordList;

  // Renders and reacts to children changes
  {
    // Test render, i.e. the first word can be found
    await expect(page.getByText(firstWord, { exact: true })).toHaveCount(1)
    // Change the word
    await page.getByRole('button', { name: 'Change word' }).click();
    // The second word can now be found
    await expect(page.getByText(secondWord, { exact: true })).toHaveCount(1)
  }

  // Multiple children and emoji render
  {
    await expect(page.getByText(`🧱${secondWord}👁`)).toHaveCount(1)
  }

  // Emoji render with non-zero `space` prop
  {
    await expect(page.getByText('🤜🍵🤛')).toHaveCount(1)
  }

  // Test offset prop and that it affects viewBox attribute
  {
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
  }

  // Test space prop and that it affects viewBox and dx attribute
  {
    const [firstSpace] = spaceList;
    const brimSpace = page.getByText(spaceText)
    const [firstSpaceViewBox, firstSpaceDx] = await brimSpace.evaluate(
      node => [
        node.parentNode.getAttribute('viewBox'),
        node.firstChild.getAttribute('dx')
      ]
    )
    // dx attribute has expected value (excepting type string/number)
    expect(firstSpaceDx == firstSpace).toBe(true)
    // Change the space
    await page.getByRole('button', {name: 'Change space'}).click()
    const [secondSpaceViewBox, lacksChidren] = await brimSpace.evaluate(
      node => [
        node.parentNode.getAttribute('viewBox'),
        node.firstChild.nodeName === '#text'
      ]
    )
    // viewBox has changed
    expect(firstSpaceViewBox).not.toEqual(secondSpaceViewBox)
    // there’s no <tspan> children
    expect(lacksChidren).toBe(true)
  }
});
