import Trie from "../src/index";

describe("@vuldin/trie", () => {
  const trie = new Trie();
  const children = trie.root.children;
  const phrase = "this is a longer sentence";

  it("instantiates", () => {
    expect(trie instanceof Trie).toEqual(true);
  });

  it("can add a word", () => {
    const str = "word";
    const node = trie.add(str).root.children.get(str);

    expect(trie.root.children.size).toEqual(1);
    expect(node.phrases.get(1)).toEqual(true);
  });

  it("can add two words", () => {
    const str = "word #2";

    trie.add(str);
  });
  it("has two children due to duplicate word", () => {
    expect(children.size).toEqual(2);
  });

  it("word node is used in two phrases", () => {
    const phrases = children.get("word").phrases;

    expect(phrases.size).toEqual(2);
  });

  it("first phrase ends on word node", () => {
    const phrases = children.get("word").phrases;

    expect(phrases.get(1)).toEqual(true);
  });

  it(`second phrase doesn't end on word node`, () => {
    const phrases = children.get("word").phrases;

    expect(!phrases.get(2)).toEqual(true);
  });

  it("can chain from add function", () => {
    expect(trie.add("word #3").add("word #4") instanceof Trie).toEqual(true);
  });

  it("root:word node contains three children", () => {
    expect(children.get("word").children.size).toEqual(3);
  });

  it("should handle any phrase", () => {
    trie.add(phrase);

    expect(children.size).toEqual(7);
    expect(children.get("is").children.size).toEqual(2);
    expect(children.get("is").children.get("longer")).not.toBe(undefined);
  });

  it("should handle phrases that previously caused infinite loop", () => {
    const phrase = "this is a yet another test";

    expect(trie.add(phrase) instanceof Trie).toEqual(true);
  });

  it("should handle adding empty strings", () => {
    expect(trie.add() instanceof Trie).toEqual(true);
  });

  it("finds an exact matching word", () => {
    const result = trie.find("word");

    expect(result.count).toEqual(1);
    expect(result.exact).toEqual(true);
  });

  it("finds an exact matching phrase", () => {
    const result = trie.find(phrase);

    expect(result.count).toEqual(3);
    expect(result.exact).toEqual(true);
  });

  it("will not find a non-existent phrase", () => {
    expect(trie.find(`this phrase doesn't exist`)).toEqual(false);
  });

  it("handles finding nothing", () => {
    expect(trie.find()).toEqual(false);
  });
});
