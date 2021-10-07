export default function Node(d) {
  this.children = new Map()
  if (d) {
    this.stem = d.stem
    this.phrases = new Map()
    if (d.phrase) this.phrases.set(d.phrase[0], d.phrase[1])
  }
}
