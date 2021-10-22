# @vuldin/trie

A trie implementation with a focus on matching phrases.
This package is available as an ES and CommonJS module.
Add it to an existing project via `npm`:

```
npm i @vuldin/trie
```

## Why?

Keep in mind that this library is an excuse for me to mess with trie data structure more than anything.
For more info, see the [wiki](https://en.wikipedia.org/wiki/Trie) and other articles such as [this](https://medium.com/basecs/trying-to-understand-tries-3ec6bede0014).

Most trie implementations focus on each node being a letter in a word.
But nodes in this library are word stems instead.
Word stems are used in place of the actual words to enable matches on similarity and intent (ie. `jumps` is treated the same as `jump`)
Common words are also removed from phrases, both when adding and finding phrases in the trie dataset.

This concept could be expanded upon to eventually be apart of a search tool.
Phrases could be matched to the text a user enters, and these phrases could be recommended and/or used for autocomplete or typeahead.

## Usage

The first step is to instantiate the trie:

```
import Trie from '@vuldin/trie'
// or
const Trie = require('@vuldin/trie')

const trie = new Trie()
```

Then `trie` can be used to add phrases. The API is flexible, allowing for single words, multiple phrases, and chaining:

```
trie.add('Hello.')
trie.add('Here is a test sentence that contains some common words in English.')
trie.add('Strings can. Contain multiple sentences.')
trie.add('add function calls').add('can be chained')
```

Once the dataset is ready, you can search it with `find`:

```
// finding a phrase
trie.find('test sentence')   // { count: 2, exact: true }
// common words are ignored
trie.find('test a sentence') // { count: 2, exact: true }
```

The `find` result is very basic at the moment.
But in this current state, the count can be used to show the user how relevant a given dataset is to the given phrase.

### Parsing text

Strings sent to this library (whether during intial data structure creation or during lookup) go through several parsing steps.
First the string is broken up into phrases/sentences.
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

**A visual example of this behaviour will be added soon**
