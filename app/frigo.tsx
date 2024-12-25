import React from "react";
import { Heading } from "@/components/ui/heading";
import BottomSheetSelect from "@/components/ui/bottom-sheet-select";

export default function Page() {
	return (
		<>
			<Heading level={1}>Composer avec mon Frigo</Heading>
			<BottomSheetSelect titleModal="Ouvrir le frigo" data={[]} placeholderSearch="Chercher un aliment" />
		</>
	);
}
