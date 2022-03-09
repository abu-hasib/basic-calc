import evaluate from './utils';

export const ADD = 'ADD';
export const CHOOSE = 'CHOOOSE';
export const CLEAR = 'CLEAR';
export const DELETE = 'DELETE';
export const EVAL = 'EVAL';

export function reducer(state, { type, payload }) {
	switch (type) {
		case ADD:
			if (state.overwrite) {
				return {
					...state,
					nextOperand: payload.digit,
					overwrite: false,
				};
			}
			if (state.nextOperand === '0' && payload.digit !== '0') {
				return {
					...state,
					nextOperand: payload.digit,
				};
			}
			if (payload.digit === '0' && state.nextOperand === '0') return state;
			if (state.prevOperand && state.nextOperand === '0') {
				return {
					...state,
					nextOperand: payload.digit,
				};
			}
			return {
				...state,
				nextOperand: `${state.nextOperand || ''}${payload.digit}`,
			};
		case CHOOSE:
			if (state.nextOperand === '-') return state;
			if (!state.nextOperand && !state.prevOperand && payload.operation === '-') {
				return {
					...state,
					nextOperand: '' + payload.operation,
				};
			}
			if ((state.operation === '÷' || state.operation === '×') && payload.operation === '-') {
				return {
					...state,
					nextOperand: payload.operation,
				};
			}
			if (state.nextOperand == null && state.prevOperand == null) {
				return state;
			}
			if (!state.prevOperand) {
				return {
					...state,
					operation: payload.operation,
					prevOperand: state.nextOperand,
					nextOperand: null,
				};
			}
			if (!state.nextOperand) {
				return {
					...state,
					operation: payload.operation,
				};
			}

			return {
				...state,
				prevOperand: evaluate(state),
				operation: payload.operation,
				nextOperand: null,
			};
		case EVAL:
			if (state.operation == null || state.nextOperand == null || state.prevOperand == null) {
				return state;
			}
			let result = evaluate(state);
			return {
				...state,
				overwrite: true,
				prevOperand: null,
				operation: null,
				nextOperand: result === 'Infinity' || result === '-Infinity' ? '' : result,
			};
		case CLEAR:
			return {};
		default:
			return state;
	}
}
