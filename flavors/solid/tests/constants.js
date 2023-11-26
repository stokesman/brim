
export const wordList = ['BONAFIDE', 'ACE', 'CONSISTENT', 'LITHE', 'WELL-MANNERED']
export const offsetList = [  
  [0, 6],
  [0],
  [0, -4],
  [-4, -14, -2, 5],
]
export const spaceList = [-2, 0, 5, 13]

export const offsetText = 'TEXT-FITTING FACILITATED'
export const spaceText = 'SVG POWERED'

/** @todo pull these out for use in tests of viewBoxOn */
export const matchNumber = '(?:(?:0|-?0?(?:\\.\\d+))|-?[1-9]\\d*(?:\\.\\d+)?)'
export const reViewBox = new RegExp(`^${ matchNumber } ${ matchNumber } ${ matchNumber } ${ matchNumber }$`)