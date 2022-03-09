// import logo from './logo.svg';
import { useReducer } from 'react';
import './App.css';

const ADD = 'ADD';
const CHOOSE = 'CHOOOSE';
const CLEAR = 'CLEAR';
const DELETE = 'DELETE';
const EVAL = 'EVAL';

function reducer(state, { type, payload }) {
	switch (type) {
		case ADD:
			if (state.overwrite) {
				return {
					...state,
					nextOperand: payload.digit,
					overwrite: false,
				};
			}
			if (payload.digit === '0' && state.nextOperand === '0') return state;
			return {
				...state,
				nextOperand: `${state.nextOperand || ''}${payload.digit}`,
			};
		case CHOOSE:
			console.log(state);
			if (state.nextOperand === '-') return state;
			if (!state.nextOperand && payload.operation === '-') {
				return {
					...state,
					nextOperand: '' + payload.operation,
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
				nextOperand: result === 'Infinity' ? '' : result,
			};
		case DELETE:
			if (state.overwrite) {
				return {
					...state,
					overwrite: false,
					nextOperand: null,
				};
			}
			if (state.nextOperand == null) return state;
			if (state.nextOperand.length === 1) {
				return { ...state, nextOperand: null };
			}

			return {
				...state,
				nextOperand: state.nextOperand.slice(0, -1),
			};
		case CLEAR:
			return {};
		default:
			return state;
	}
}

function App() {
	const [{ prevOperand, nextOperand, operation }, dispatch] = useReducer(reducer, {});
	return (
		<main className='App'>
			<h1>Basic Calculator</h1>
			<div className='grid calculator'>
				<div className='output'>
					<div className='operand1'>
						{prevOperand} {operation}
					</div>
					<div className='operand2'>{nextOperand}</div>
				</div>
				<button className='clear span-3' onClick={() => dispatch({ type: CLEAR })}>
					c
				</button>
				<Operation className='op-div' dispatch={dispatch} operation='÷' />
				<Digit className='digit-1' dispatch={dispatch} digit='1' />
				<Digit className='digit-2' dispatch={dispatch} digit='2' />
				<Digit className='digit-3' dispatch={dispatch} digit='3' />
				<Operation className='op-mul' dispatch={dispatch} operation='×' />
				<Digit className='digit-4' dispatch={dispatch} digit='4' />
				<Digit className='digit-5' dispatch={dispatch} digit='5' />
				<Digit className='digit-6' dispatch={dispatch} digit='6' />
				<Operation className='op-add' dispatch={dispatch} operation='+' />
				<Digit className='digit-7' dispatch={dispatch} digit='7' />
				<Digit className='digit-8' dispatch={dispatch} digit='8' />
				<Digit className='digit-9' dispatch={dispatch} digit='9' />
				<Operation className='-' dispatch={dispatch} operation='-' />
				<Digit className='digit-0' dispatch={dispatch} digit='0' />
				<button className='eq span-3' onClick={() => dispatch({ type: EVAL })}>
					=
				</button>
			</div>
		</main>
	);
}

function Digit({ dispatch, digit }) {
	return <button onClick={() => dispatch({ type: ADD, payload: { digit } })}>{digit}</button>;
}

function Operation({ dispatch, operation }) {
	return (
		<button onClick={() => dispatch({ type: CHOOSE, payload: { operation } })}>{operation}</button>
	);
}

function evaluate({ nextOperand, prevOperand, operation }) {
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

export default App;
