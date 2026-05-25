import type { Metadata } from "next";
import CustomisedTimeline from "./timeline";

export const metadata: Metadata = {
	title: "Timeline - MOOSEUM",
	description: "Take a trip down memory lane and explore the scenic route of casual art history.",
	keywords: "Timeline, fine art, Amedeo Modigliani, Wasiliy Kandinskiy, Diego Rivera, Claude Monet, Rene Magritte, Salvador Dali, Edouard Manet, Andrei Rublev, Vincent van Gogh, Gustav Klimt, Hieronymus Bosch, Kazimir Malevich, Mikhail Vrubel, Pablo Picasso, Peter Paul Rubens, Pierre-Auguste Renoir, Francisco Goya, Frida Kahlo, El Greco, Albrecht DÃ¼rer, Alfred Sisley, Pieter Bruegel, Marc Chagall, Giotto di Bondone, Sandro Botticelli, Caravaggio, Leonardo da Vinci, Diego Velazquez, Henri Matisse, Jan van Eyck, Edgar Degas, Rembrandt, Titian, Henri de Toulouse-Lautrec, Gustave Courbet, Camille Pissarro, William Turner, Edvard Munch, Paul Cezanne, Eugene Delacroix, Henri Rousseau, Georges Seurat, Paul Klee, Piet Mondrian, Joan Miro, Andy Warhol, Paul Gauguin, Raphael, Michelangelo, Jackson Pollock, Jean-Michel Basquiat, Yinka Shonibare CBE, Faith Ringgold, Ben Enwonwu, Alma Thomas, Romare Bearden, Kara Walker",
	robots: "index, follow",
	openGraph: {
		title: "Timeline",
		description: "Take a trip down memory lane and explore the scenic route of casual art history.",
		url: "https://mooseum.online/timeline",
		siteName: "MOOSEUM"
	}
};

export default function ArtistsPage () {
    return (
        <CustomisedTimeline />
    )
}