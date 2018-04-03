import common from 'common-words'
import stemPorter from 'stem-porter'

const phraseRe = /\w.+?($|[.!?])(?!\S)/g
const wordRe = /\S+\w/g

function Node(d) {
  this.children = new Map()
  if (d) {
    this.stem = d.stem
    this.phrases = new Map()
    if (d.phrase) this.phrases.set(d.phrase[0], d.phrase[1])
  }
  this.toString = () => {
    let result = ''
    let count = 1
    for (let [num, eop] of this.phrases.entries()) {
      const sep = this.phrases.size === count ? ':' : ','
      result += `${num}${eop ? '*' : ''}${sep}`
      count += 1
    }
    if (this.stem) result += `${this.stem}`
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
  this.matchCount = 0

  const add = (stems, parent) => {
    let result = parent
    const stem = stems.pop()
    // end of phrase detection
    const isEop = stems.length > 0 ? false : true
    let phrase = [this.phraseCount, isEop]
    // create node
    let node = new Node({ stem, phrase })

    // add node to parent
    const padd = (n, itr) => {
      for (let c of itr.values()) {
        if (c.phrases.has(phrase[0])) {
          padd(n, c.children)
          c.children.set(stem, n)
        }
      }
    }
    padd(node, this.root.children)

    // push node to root
    let rCopy = this.root.children.get(stem)
    if (!rCopy) this.root.children.set(stem, node)
    else {
      rCopy.phrases.set(phrase[0], phrase[1])
      node = rCopy
    }
    // loop
    if (stems.length > 0) result = add(stems, node)
    return result
  }

  const parse = str => {
    return str
      .match(wordRe)
      .filter(word => !common.map(d => d.word).includes(word))
      .map(d => stemPorter(d.toLowerCase()))
      .reverse()
  }

  this.add = string => {
    // break string into phrases
    const phrases = string.match(phraseRe)
    phrases.forEach((phrase, pi) => {
      this.phraseCount += 1
      // phrase to words
      const stems = parse(phrase)
      // start add loop
      add(stems, this.root)
    })
    return this
  }

  const find = (stems, itr) => {
    const s = stems.pop()
    const n = itr.get(s)
    if (n) {
      this.matchCount += 1
      if (n.children) find(stems, n.children)
    }
  }

  this.find = phrase => {
    this.matchCount = 0
    let result = false
    const stems = parse(phrase)
    find(stems, this.root.children)
    if (this.matchCount > 0) {
      result = {
        count: this.matchCount,
        exact: parse(phrase).length === this.matchCount,
      }
    }
    return result
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
