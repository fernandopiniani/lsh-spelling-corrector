const fs = require('fs')
const projection = require('./projection')

const words = fs.readFileSync((__dirname + '/palavras.txt'), 'utf8').trim().toLowerCase().split('\n')
const chars = 'abcdefghijklmnopqrstuvwxyzáâãàçéêíóôõ-'
const validChars = `/([^ ${chars}])+/g`
const baseText = fs.readFileSync((__dirname + '/cortico.txt'), 'utf8').toLowerCase()
  .replace(/([\n])+/g, ' ')
  .replace(/( - )+/g, '')
  .replace(new RegExp(validChars), '')

const dict = baseText.split(' ').concat(words).reduce((counter, word) => {
  if(!counter[word]) counter[word] = 1
  else counter[word]++
  return counter
}, {})

const length = () => {
  // test
  return 1
}

const consonants = () => {
  return 1
}

projection.indexValues(length, consonants, Object.keys(dict))

const probability = word => word ? dict[word] : 0

const correction = word =>
  candidates(word).reduce((bestCandidate, candidate) =>
    probability(bestCandidate) >= probability(candidate)
    ? bestCandidate
    : candidate
    , word)

const candidates = word => {
  return projection.getNearestNeighbors(word, 2)
}

console.time('1 edits')
console.log('batatus ->',correction('batatus'))
console.timeEnd('1 edits')
console.time('2 edits')
console.log('batatuss ->',correction('batatuss'))
console.timeEnd('2 edits')
