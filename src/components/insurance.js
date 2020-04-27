import React from "react";
import { createStore, combineReducers } from "redux";

const Insurance = function (props) {
	const balanceReducer = function (oldBalance = 1000, action) {
		if (action.type === "CLAIM") {
			return oldBalance - action.payload.amount;
		}
		return oldBalance;
	};

	const clientsReducer = function (oldClients = [], action) {
		if (action.type === "OPEN") {
			return [...oldClients, action.payload.name];
		} else if (action.type === "CANCEL") {
			return oldClients.filter((client) => {
				return client !== action.payload.name;
			});
		}
		return oldClients;
	};

	const claimsReducer = function (oldClaims = [], action) {
		if (action.type === "CLAIM") {
			return [...oldClaims, action.payload];
		}

		return oldClaims;
	};

	const reducers = combineReducers({
		BALANCE: balanceReducer,
		CLIENTS: clientsReducer,
		CLAIMS: claimsReducer,
	});

	const actionOPEN = function (name, fee) {
		return {
			type: "OPEN",
			payload: {
				name: name,
				fee: fee,
			},
		};
	};

	const actionCLAIM = function (name, amount) {
		return {
			type: "CLAIM",
			payload: {
				name: name,
				amount: amount,
			},
		};
	};

	const actionCANCEL = function (name) {
		return {
			type: "CANCEL",
			payload: {
				name: name,
			},
		};
	};

	const rxStore = createStore(reducers);

	const loadState = function () {
		rxStore.dispatch(actionOPEN("paul", 25));
		rxStore.dispatch(actionOPEN("mary", 250));
		rxStore.dispatch(actionCLAIM("mary", 100));
		rxStore.dispatch(actionCANCEL("mary"));
		console.log(rxStore.getState());
		return (
			<div>
				State Loaded: Check Console... <br />
			</div>
		);
	};

	return (
		<div>
			This is RX!
			<br />
			{loadState()}
			<br />
		</div>
	);
};

export default Insurance;
