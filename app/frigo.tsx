import React, { useCallback, useMemo, useRef } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { BottomSheetModal, BottomSheetView, BottomSheetModalProvider } from "@gorhom/bottom-sheet";

const App = () => {
	// ref
	const bottomSheetModalRef = useRef<BottomSheetModal>(null);

	// callbacks
	const handlePresentModalPress = useCallback(() => {
		bottomSheetModalRef.current?.present();
	}, []);
	const handleSheetChanges = useCallback((index: number) => {
		console.log("handleSheetChanges", index);
	}, []);

	// renders
	return (
		<BottomSheetModalProvider>
			<Button onPress={handlePresentModalPress} title="Present Modal" color="black" />
			<BottomSheetModal ref={bottomSheetModalRef} onChange={handleSheetChanges}>
				<BottomSheetView>
					<Text>Awesome 🎉</Text>
				</BottomSheetView>
			</BottomSheetModal>
		</BottomSheetModalProvider>
	);
};


export default App;
