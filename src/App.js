// import logo from './logo.svg';
import { useReducer } from 'react';
import './App.css';
import { Digit, Operation } from './components';
import { CLEAR, EVAL, reducer } from './store';

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

export default App;
