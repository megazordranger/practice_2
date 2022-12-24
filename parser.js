const getMarkdown = (str, re, tag) => {
	const result = str.match(re);

	if (result && result.length) {
		return `<${tag}>${result[0]}</${tag}>`;
	}

	return str;
};

const rules = [
	{
		name: 'Heading level 1',
		tag: 'h1',
		regex: /(?<=^# )(.*)/,
		parse: getMarkdown,
	},
	{
		name: 'Heading level 2',
		tag: 'h2',
		regex: /(?<=^## )(.*)/,
		parse: getMarkdown,
	},
	{
		name: 'Heading level 3',
		tag: 'h3',
		regex: /(?<=^### )(.*)/,
		parse: getMarkdown,
	},
	{
		name: 'Heading level 4',
		tag: 'h4',
		regex: /(?<=^#### )(.*)/,
		parse: getMarkdown,
	},
	{
		name: 'Item',
		tag: 'li',
		regex: /(?<=^- )(.*)/,
		parse: getMarkdown,
	},
];

function parser(text) {
	if (typeof text === 'string' && !text) return '';

	const lines = text.split(/\n/g);
	const parsedLines = [];
	let openList = false;

	lines.forEach((line) => {
		let parserLine = line;
		let matchRule;

		rules.forEach((rule) => {
			if (line.match(rule.regex)) matchRule = rule;
		});

		if (matchRule) {
			const { tag, regex, parse } = matchRule;

			parserLine = parse(line, regex, tag);

			if (tag === 'li' && !openList) {
				openList = true;
				parsedLines.push('<ul>');
			} else if (tag !== 'li' && openList) {
				parsedLines.push('</ul>');
				openList = false;
			}
		} else if (openList) {
			parsedLines.push('</ul>');
			openList = false;
		}

		parsedLines.push(parserLine);
	});

	if (openList) parsedLines.push('</ul>');

	return parsedLines.join('\n');
}

module.exports = parser;
