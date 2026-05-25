import Artists from "./artists";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Artists - MOOSEUM",
	description: "Browse through the assortment of greatest artist categorised in alphabetic order",
	keywords: "Artists, fine art, Amedeo Modigliani, Wasiliy Kandinskiy, Diego Rivera, Claude Monet, Rene Magritte, Salvador Dali, Edouard Manet, Andrei Rublev, Vincent van Gogh, Gustav Klimt, Hieronymus Bosch, Kazimir Malevich, Mikhail Vrubel, Pablo Picasso, Peter Paul Rubens, Pierre-Auguste Renoir, Francisco Goya, Frida Kahlo, El Greco, Albrecht DÃ¼rer, Alfred Sisley, Pieter Bruegel, Marc Chagall, Giotto di Bondone, Sandro Botticelli, Caravaggio, Leonardo da Vinci, Diego Velazquez, Henri Matisse, Jan van Eyck, Edgar Degas, Rembrandt, Titian, Henri de Toulouse-Lautrec, Gustave Courbet, Camille Pissarro, William Turner, Edvard Munch, Paul Cezanne, Eugene Delacroix, Henri Rousseau, Georges Seurat, Paul Klee, Piet Mondrian, Joan Miro, Andy Warhol, Paul Gauguin, Raphael, Michelangelo, Jackson Pollock, Jean-Michel Basquiat, Yinka Shonibare CBE, Faith Ringgold, Ben Enwonwu, Alma Thomas, Romare Bearden, Kara Walker",
	robots: "index, follow",
	openGraph: {
		title: "Artists",
		description: "Browse throught the list of artists categorised in alphabetic order",
		url: "https://mooseum.online/artists",
		siteName: "MOOSEUM"
	}
};

export default function ArtistsPage () {
    return (
        <Artists />
    )
}