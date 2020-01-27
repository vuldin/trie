import common from "common-words";
import stemmer from "stemmer";

const phraseRe = /\w.+?($|[.!?])(?!\S)/g;
const wordRe = /\S+\w/g;

function Node(d) {
  this.children = new Map();
  if (d) {
    this.stem = d.stem;
    this.phrases = new Map();
    if (d.phrase) this.phrases.set(d.phrase[0], d.phrase[1]);
  }
}

export default function Trie() {
  this.root = new Node();
  this.phraseCount = 0;
  this.matchCount = 0;

  const add = (stems, parent) => {
    let result = parent;
    const stem = stems.pop();
    // end of phrase detection
    const isEop = stems.length > 0 ? false : true;
    let phrase = [this.phraseCount, isEop];
    // create node
    let node = new Node({ stem, phrase });
    // add node to parents
    const padd = (n, itr) => {
      for (let c of itr.values()) {
        if (c.phrases.has(phrase[0]) && c.stem !== n.stem) {
          padd(n, c.children);
          c.children.set(stem, n);
        }
      }
    };
    padd(node, this.root.children);

    // push node to root
    let rCopy = this.root.children.get(stem);
    if (!rCopy) {
      this.root.children.set(stem, node);
    } else {
      rCopy.phrases.set(phrase[0], phrase[1]);
      node = rCopy;
    }
    // loop
    if (stems.length > 0) result = add(stems, node);
    return result;
  };

  const find = (stems, itr) => {
    const s = stems.pop();
    const n = itr.get(s);
    if (n) {
      this.matchCount += 1;
      if (n.children) find(stems, n.children);
    }
  };

  const parse = str => {
    if (str === undefined || str.length === 0) return;
    return str
      .match(wordRe)
      .filter(word => !common.map(d => d.word).includes(word))
      .map(d => stemmer(d.toLowerCase()))
      .reverse();
  };

  this.add = string => {
    if (string === undefined || string.length === 0) return this;
    // break string into phrases
    const phrases = string.match(phraseRe);
    phrases.forEach((phrase, pi) => {
      this.phraseCount += 1;
      // phrase to words
      const stems = parse(phrase);
      // start add loop
      add(stems, this.root);
    });
    return this;
  };

  this.find = phrase => {
    let result = false;
    if (!phrase || phrase.length === 0) return result;
    this.matchCount = 0;
    const stems = parse(phrase);
    find(stems, this.root.children);
    if (this.matchCount > 0) {
      result = {
        count: this.matchCount,
        exact: parse(phrase).length === this.matchCount
      };
    }
    return result;
  };
}
