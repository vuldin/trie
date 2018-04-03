import expect from 'expect'
import Trie from 'src/index'

describe('Trie tests', () => {
  const trie = new Trie()
  it('instantiates', () => {
    expect(trie instanceof Trie).toEqual(true)
  })
  it('can chain from add function', () => {
    expect(trie.add('hello') instanceof Trie).toEqual(true)
  })
  it('can add a word', () => {
    expect(trie.add('hello') instanceof Trie).toEqual(true)
  })
  /*
  console.log(trie)
  trie.add(
    'have you ever been to mars? have you ever been to amsterdam? have you been to the store?'
  )
  trie.add('have you eaten?')
  trie.add('have you eaten yet?')
  */
  /* 1 1,2:ever/3:been/4*,5:eaten/6:i
   * 2 1,2:been/3*:store/5*:yet/6:don't
   * 3 1*:mars/2*:amsterdam
   * 4 6*:hands
   */
})
