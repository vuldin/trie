import Trie from '../src/index'

describe('@vuldin/trie', () => {
  let trie
  let children
  const phrase = 'this is a longer sentence'

  beforeEach(() => {
    trie = new Trie()
    //children = trie.root.children
    children = trie.getChildren()
  })

  it('instantiates', () => {
    expect(trie instanceof Trie).toEqual(true)
  })

  it('can add a word', () => {
    const str = 'word'
    //const node = trie.add(str).root.children.get(str)
    trie.add(str)
    const node = children.get(str)
    console.log(trie.root)

    expect(children.size).toEqual(1)
    expect(node.phrases.get(1)).toEqual(true)
  })

  it.skip('can add two words', () => {
    const str = 'word #2'

    trie.add(str)
  })

  it.skip('has two children due to duplicate word', () => {
    expect(children.size).toEqual(2)
  })

  it.skip('word node is used in two phrases', () => {
    const phrases = children.get('word').phrases

    expect(phrases.size).toEqual(2)
  })

  it.skip('first phrase ends on word node', () => {
    const phrases = children.get('word').phrases

    expect(phrases.get(1)).toEqual(true)
  })

  it.skip(`second phrase doesn't end on word node`, () => {
    const phrases = children.get('word').phrases

    expect(!phrases.get(2)).toEqual(true)
  })

  it.skip('can chain from add function', () => {
    expect(trie.add('word #3').add('word #4') instanceof Trie).toEqual(true)
  })

  it.skip('root:word node contains three children', () => {
    expect(children.get('word').children.size).toEqual(3)
  })

  it.skip('should handle any phrase', () => {
    trie.add(phrase)

    expect(children.size).toEqual(7)
    expect(children.get('is').children.size).toEqual(2)
    expect(children.get('is').children.get('longer')).not.toBe(undefined)
  })

  it.skip('should handle phrases that previously caused infinite loop', () => {
    const phrase = 'this is a yet another test'

    expect(trie.add(phrase) instanceof Trie).toEqual(true)
  })

  it.skip('should handle adding empty strings', () => {
    expect(trie.add() instanceof Trie).toEqual(true)
  })

  it.skip('finds an exact matching word', () => {
    const result = trie.find('word')

    expect(result.count).toEqual(1)
    expect(result.exact).toEqual(true)
  })

  it.skip('finds an exact matching phrase', () => {
    const result = trie.find(phrase)

    expect(result.count).toEqual(3)
    expect(result.exact).toEqual(true)
  })

  it.skip('will not find a non-existent phrase', () => {
    expect(trie.find(`this phrase doesn't exist`)).toEqual(false)
  })

  it.skip('handles finding nothing', () => {
    expect(trie.find()).toEqual(false)
  })
})
