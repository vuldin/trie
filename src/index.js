import common from 'common-words'
import stemPorter from 'stem-porter'

const phraseRe = /\w.+?($|[.!?])(?!\S)/g
const wordRe = /\S+\w/g

function Node(d) {
  this.children = new Map()
  this.stem = d && d.stem ? d.stem : undefined
  // end of phrase
  //this.isEop = d && d.isEop ? true : false
  this.phrases = d && d.phrase ? [d.phrase] : []
  this.addPhrase = phraseNum => this.phrases.push(phraseNum)
}

export default function Trie() {
  this.root = new Node()
  this.phraseCount = 0

  this.add = string => {
    // break string into phrases
    const phrases = string.match(phraseRe)
    phrases.forEach((phrase, pi) => {
      this.phraseCount += 1
      //console.log(`phrase ${this.phraseCount}`)
      // break phrase into words
      const words = phrase.match(wordRe)
      // loop through phrase words
      words.forEach((word, wi) => {
        // skip on common words
        if (common.map(d => d.word).includes(word)) return
        word = word.toLowerCase()
        // get stem
        const stem = stemPorter(word)
        console.log(
          `${this.phraseCount}${wi === words.length - 1 ? '*' : ''}:${stem}`
        )
        // end of phrase detection
        //let isEop = false
        //if (pi === phrases.length - 1) isEop = true
        // create node
        const node = new Node({
          //isEop,
          stem,
          phrase: this.phraseCount,
        })
        // push stem to each root child
        for (let val of this.root.children.values()) {
          if (!val.children.get(stem)) d.set(stem, node)
        }
        // push stem to root
        if (this.root.children.get(stem)) this.root.children.set(stem, node)
      })
    })
    return this
  }

  this.toString = () => {
    /* 1 1,2:ever/3:been/4*,5:eaten/6:i
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
