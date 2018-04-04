# @vuldin/trie

[![Travis][build-badge]][build]
[![npm package][npm-badge]][npm]
[![Coveralls][coveralls-badge]][coveralls]

A trie implementation with a focus on matching phrases.
This package is available in es/cjs/umd modules.
Add it to an existing project via `npm`:

```
npm i @vuldin/trie
```

## Usage

Using this library consists of instantiating, then adding any number of words or phrases with the `add` function.
This function takes a single word, sentences, or paragraphs and creates a trie data structure that is a somewhat different than most other implementations.

### Parsing text

Strings sent to this library (whether during intial data structure creation or during lookup) go through several parsing steps.
First the string is broken up into phrases or sentences.
Then each sentence is stripped of all common words.
Remaining uncommon words are finally converted to their stem form to remove any differences during later comparisons that relate to tense or plural forms.
The lower case version of these stems are then used to generate the data structure (details on this data structure below).
The following text:

```
Here is a test sentence that contains some common words in English.
```

becomes:

```
['here', 'is', 'test', 'sentenc', 'contain', 'common', 'word', 'english']
```

### Data structure

The following data structure is used to ensure that phrases contained in the text can be matched.
But since we also want to match on any (uncommon) word, each of these words is additionally added to the root node.
This means that each node is added to the trie the same number of times as the place it holds in the array.
The tradeoff is that we create a larger data structure but have a more functional lookup (by any uncommon word or phrase).

### API

```
const Trie = require('@vuldin/trie')
const trie = new Trie()
trie.add('Here is a test sentence that contains some common words in English.')
trie.add('Strings can. Contain multiple sentences.')
trie.add('add function calls').add('can be chained')

// finding phrases
trie.find('test sentence') // { count: 2, exact: true }
// common words are ignored
trie.find('test a sentence') // same result
```

[build-badge]: https://img.shields.io/travis/user/repo/master.png?style=flat-square
[build]: https://travis-ci.org/user/repo
[npm-badge]: https://img.shields.io/npm/v/npm-package.png?style=flat-square
[npm]: https://www.npmjs.org/package/npm-package
[coveralls-badge]: https://img.shields.io/coveralls/user/repo/master.png?style=flat-square
[coveralls]: https://coveralls.io/github/user/repo
