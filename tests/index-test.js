import expect from 'expect'
import Trie from 'src/index'

describe('Trie tests', () => {
  const trie = new Trie()
  const children = trie.root.children
  it('instantiates', () => {
    expect(trie instanceof Trie).toEqual(true)
  })
  it('can add a word', () => {
    const str = 'word'
    const node = trie.add(str).root.children.get(str)
    //console.log(node.toString())
    expect(trie.root.children.size).toEqual(1)
    expect(node.phrases[0][1]).toEqual(true)
  })
  it('can add multiple words', () => {
    const str = 'word #2'
    trie.add(str)
    /*
    for (let node of children.values()) {
      console.log(node.toString())
    }
    */
  })
  it('has two children due to duplicate word', () => {
    expect(children.size).toEqual(2)
  })
  it('word node is used in two phrases', () => {
    const phrases = children.get('word').phrases
    expect(phrases.length).toEqual(2)
  })
  it('first phrase ends on word node', () => {
    const phrases = children.get('word').phrases
    expect(phrases[0][0] === 1 && phrases[0][1]).toEqual(true)
  })
  it(`second phrase doesn't end on word node`, () => {
    const phrases = children.get('word').phrases
    expect(phrases[1][0] === 2 && !phrases[1][1]).toEqual(true)
  })
  it('can chain from add function', () => {
    expect(trie.add('word #3').add('word #4') instanceof Trie).toEqual(true)
    for (let node of children.values()) {
      console.log(node.toString())
    }
  })
  it('word node contains three children', () => {
    expect(children.get('word').children.size).toEqual(3)
  })
})
