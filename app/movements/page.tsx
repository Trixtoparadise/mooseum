import Movements from "./movements";
import type { Metadata } from "next"; 

export const metadata: Metadata = {
	title: "Movements - MOOSEUM",
	description: "Browse through the list of art movements categorised in alphabetic order",
	keywords: "Art movements, Expressionism, Abstractionism, Social Realism, Muralism, Impressionism, Surrealism, Realism, Byzantine Art, Post-Impressionism, Symbolism, Art Nouveau, Northern Renaissance, Suprematism, Cubism, Baroque, Romanticism, Primitivism, Mannerism, Proto Renaissance, Early Renaissance, High Renaissance, Neoplasticism, Pop Art, Abstract Expressionism, Neo-Expressionism, Contemporary African-Diasporic Art, Black Arts Movement, Nigerian Modernism, Washington Color School",
	robots: "index, follow",
	openGraph: {
		title: "Movements",
		description: "Browse throught the list of art movements categorised in alphabetic order",
		url: "https://mooseum.online/movements",
		siteName: "MOOSEUM"
	}
};

export default function MovementsPage () {
    return (
    	<Movements />
    )
}