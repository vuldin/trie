import common from 'common-words'
import stemPorter from 'stem-porter'

const phraseRe = /\w.+?($|[.!?])(?!\S)/g
const wordRe = /\S+\w/g

function Node(d) {
  this.children = new Map()
  if (d) {
    this.stem = d.stem
    this.phrases = d.phrase ? [d.phrase] : []
    this.addPhrase = phrase => {
      //console.log(`addPhrase ${phraseNum}`)
      this.phrases.push(phrase)
    }
  }
  this.toString = () => {
    let result = ''
    if (this.phrases) {
      //result += `${this.phrases}:`
      this.phrases.forEach((phrase, i) => {
        const word = phrase[0] ? phrase[0] : ''
        const eop = phrase[1] ? '*' : ''
        const sep = this.phrases.length - 1 === i ? ':' : ','
        result += `${word}${eop}${sep}`
      })
    }
    if (this.stem) {
      result += `${this.stem}`
    }
    if (this.children.size > 0) {
      result += `{`

      for (let node of this.children.values()) {
        result += `${node.stem}|`
      }
      result = result
        .split('')
        .reverse()
        .slice(1)
        .reverse()
        .join('')
      //result += this.children.size

      result += `}`
    }
    return result
  }
}

export default function Trie() {
  this.root = new Node()
  this.phraseCount = 0

  this.add = string => {
    // break string into phrases
    const phrases = string.match(phraseRe)
    phrases.forEach((phrase, pi) => {
      this.phraseCount += 1
      // break phrase into words
      const words = phrase.match(wordRe)
      // loop through phrase words
      words.forEach((word, wi) => {
        // skip on common words
        if (common.map(d => d.word).includes(word)) return
        word = word.toLowerCase()
        // get stem
        const stem = stemPorter(word)
        // end of phrase detection
        let isEop = false
        if (wi === words.length - 1) isEop = true
        let phrase = [this.phraseCount, isEop]
        // create node
        const node = new Node({
          stem,
          phrase,
        })

        // TODO add node to parent

        // push node to root
        let existing = this.root.children.get(stem)
        if (!existing) this.root.children.set(stem, node)
        else existing.addPhrase(phrase)
      })
    })
    return this
  }

  this.toString = () => {
    /* adding each phrase:
     * - have you ever been to mars?
     * - have you ever been to amsterdam?
     * - have you been to the store?
     * - have you eaten?
     * - have you eaten yet?
     * - i don't know what to do with my hands
     * creates the following trie:
     * 1 1,2:ever/3:been/4*,5:eaten/6:i
     * 2 1,2:been/3*:store/5*:yet/6:don't
     * 3 1*:mars/2*:amsterdam
     * 4 6*:hands
     */
    let str = ''
    for (let val of this.root.children.values()) {
      str += `|${val.word}`
    }
    return str
  }
}
