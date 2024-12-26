import React from "react";
import { Heading } from "@/components/ui/heading";
import BottomSheetSelect from "@/components/ui/bottom-sheet-select";
import fruits from "@/utils/data/fruits";
import vegetables from "@/utils/data/vegetables";

const initialSections = [
	{
		title: "Fruits",
		data: Object.values(fruits),
	},
	{
		title: "Légumes",
		data: Object.values(vegetables),
	},
];

export default function Page() {

	const getSelectecValues = (values: string[]) => {
		console.log("getSelectecValues", values);
	}

	return (
		<>
			<Heading level={1}>Composer avec mon Frigo</Heading>
			<BottomSheetSelect onSelect={getSelectecValues} titleModal="Ouvrir le frigo" data={initialSections} placeholderSearch="Chercher un aliment" />
		</>
	);
}
