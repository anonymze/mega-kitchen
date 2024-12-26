import BottomSheetSelect from "@/components/ui/bottom-sheet-select";
import { Heading } from "@/components/ui/heading";
import vegetables from "@/utils/data/vegetables";
import { Text, View } from "react-native";
import fruits from "@/utils/data/fruits";
import React from "react";


const initialSections = [
	{
		title: "Fruits",
		data: fruits,
	},
	{
		title: "Légumes",
		data: vegetables,
	},
];

export default function Page() {
	const [selectedValues, setSelectedValues] = React.useState<string[]>([]);

	const getSelectecValues = (values: string[]) => {
		setSelectedValues((prev) => [...new Set([...prev, ...values])]);
	};

	return (
		<>
			<Heading level={1}>Composer avec mon Frigo</Heading>
			
			<BottomSheetSelect
				onSelect={getSelectecValues}
				titleModal="Ouvrir le frigo"
				data={initialSections}
				placeholderSearch="Chercher un aliment"
			/>

			{selectedValues.length > 0 && (
				<View>
					<Heading level={2}>Vos aliments :</Heading>
					<View>
						{selectedValues.map((value) => (
							<View key={value}>
								<Text>{value}</Text>
							</View>
						))}
					</View>
				</View>
			)}
		</>
	);
}
