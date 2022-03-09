import { ADD, CHOOSE } from '../store';

export function Digit({ dispatch, digit }) {
	return <button onClick={() => dispatch({ type: ADD, payload: { digit } })}>{digit}</button>;
}

export function Operation({ dispatch, operation }) {
	return (
		<button onClick={() => dispatch({ type: CHOOSE, payload: { operation } })}>{operation}</button>
	);
}
