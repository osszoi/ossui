import { isNull, isUndefined } from './object';

function _makeString(object: any): string {
  if (isNull(object) || isUndefined(object)) {
    return '';
  }
  return '' + object;
}

function _defaultToWhiteSpace(characters: any): any {
  if (characters === null) {
    return '\\s';
  } else if (characters.source) {
    return characters.source;
  }
  return '[' + _escapeRegExp(characters) + ']';
}

export function rtrim(str: string, characters: any = ' '): string {
  str = _makeString(str);
  characters = _defaultToWhiteSpace(characters);
  return str.replace(new RegExp(characters + '+$'), '');
}

export function prune(
  str: string,
  numberOfChars: number,
  suffix: string = '...'
): string {
  str = _makeString(str);
  numberOfChars = ~~numberOfChars;

  if (str.length <= numberOfChars) {
    return str;
  }
  const tmpl = (c: string) => {
    return c.toUpperCase() !== c.toLowerCase() ? 'A' : ' ';
  };
  let template = str.slice(0, numberOfChars + 1).replace(/.(?=\W*\w*$)/g, tmpl); // 'Hello, world' -> 'HellAA AAAAA'

  if (template.slice(template.length - 2).match(/\w\w/)) {
    template = template.replace(/\s*\S+$/, '');
  } else {
    template = rtrim(template.slice(0, template.length - 1));
  }
  return (template + suffix).length > str.length
    ? str
    : str.slice(0, template.length) + suffix;
}

function _escapeRegExp(str: string | null | undefined): string {
  return _makeString(str).replace(/([.*+?^=!:${}()|[\]\/\\])/g, '\\$1');
}
