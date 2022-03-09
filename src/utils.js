export default function evaluate({ nextOperand, prevOperand, operation }) {
	nextOperand = parseInt(nextOperand);
	prevOperand = parseInt(prevOperand);

	if (isNaN(prevOperand) || isNaN(nextOperand)) return '';
	let result = '';
	switch (operation) {
		case '+':
			result = prevOperand + nextOperand;
			break;
		case '-':
			result = prevOperand - nextOperand;
			break;
		case '×':
			result = prevOperand * nextOperand;
			break;
		case '÷':
			result = prevOperand / nextOperand;
			break;
		default:
	}

	return result.toString();
}
