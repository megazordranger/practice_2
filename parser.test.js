/* eslint-disable no-undef */
const parser = require('./parser');

test('one header tag', () => {
	expect(parser('# Heading level 1')).toBe('<h1>Heading level 1</h1>');
});

test('all headers', () => {
	const input = `# Heading level 1

## Heading level 2
	
### Heading level 3
	
#### Heading level 4`;

	const output = `<h1>Heading level 1</h1>

<h2>Heading level 2</h2>
	
<h3>Heading level 3</h3>
	
<h4>Heading level 4</h4>`;

	expect(parser(input)).toBe(output);
});

test('not valid parsers', () => {
	const input = ` # Heading level 1

.## Heading level 2
	
	### Heading level 3
	
##### Heading level 4`;

	const output = ` # Heading level 1

.## Heading level 2
	
	### Heading level 3
	
##### Heading level 4`;

	expect(parser(input)).toBe(output);
});

test('1  element list', () => {
	const input = `- Item 1`;

	const output = `<ul>
<li>Item 1</li>
</ul>`;

	expect(parser(input)).toBe(output);
});

test('list with multiple elements', () => {
	const input = `- Item 1
- Item 2
- Item 3
- Item 4`;

	const output = `<ul>
<li>Item 1</li>
<li>Item 2</li>
<li>Item 3</li>
<li>Item 4</li>
</ul>`;

	expect(parser(input)).toBe(output);
});

test('2  lists', () => {
	const input = `- Item 1
- Item 2

- Item 3
- Item 4`;

	const output = `<ul>
<li>Item 1</li>
<li>Item 2</li>
</ul>

<ul>
<li>Item 3</li>
<li>Item 4</li>
</ul>`;

	expect(parser(input)).toBe(output);
});

test('all rules', () => {
	const input = `# Heading level 1

## Heading level 2

### Heading level 3

#### Heading level 4

- Item 1
- Item 2
- Item 3
- Item 4

`;

	const output = `<h1>Heading level 1</h1>

<h2>Heading level 2</h2>

<h3>Heading level 3</h3>

<h4>Heading level 4</h4>

<ul>
<li>Item 1</li>
<li>Item 2</li>
<li>Item 3</li>
<li>Item 4</li>
</ul>

`;

	expect(parser(input)).toBe(output);
});
