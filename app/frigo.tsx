import React from "react";
import { Heading } from "@/components/ui/heading";
import BottomSheetSelect from "@/components/ui/bottom-sheet-select";

export default function Page() {

	const getSelectecValues = (values: string[]) => {
		console.log("getSelectecValues", values);
	}

	return (
		<>
			<Heading level={1}>Composer avec mon Frigo</Heading>
			<BottomSheetSelect onSelect={getSelectecValues} titleModal="Ouvrir le frigo" data={[]} placeholderSearch="Chercher un aliment" />
		</>
	);
}
