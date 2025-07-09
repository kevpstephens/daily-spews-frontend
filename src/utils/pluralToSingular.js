export default function pluralToSingular(word) {
  if (!word) {
    return;
  }

  if (word.endsWith("ies")) {
    return `${word.slice(0, -3)}y`;
  } else if (word.endsWith("es")) {
    return word.slice(0, -2);
  } else if (word.endsWith("s") && word.length > 1) {
    return word.slice(0, -1);
  } else {
    return word;
  }
}
