"use client";
import * as React from 'react';
import * as NextThemes from 'next-themes';
import Image from "next/image";
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Modal from '@mui/material/Modal';
import Typography from "@mui/material/Typography";
import IconButton from '@mui/material/IconButton';
import { motion } from "framer-motion";
import { Close } from '@mui/icons-material';
import { useMediaQuery, useTheme } from '@mui/material';
import { Timeline, TimelineItem, timelineItemClasses, timelineContentClasses, TimelineSeparator, TimelineConnector, TimelineContent, TimelineOppositeContent, TimelineDot } from "@mui/lab"

interface ArtTimelineItem {
	period: string;
	title: string;
	content: string;
	artworks: {
		url: string;
		artist: string;
		title: string;
	}[];
	featuredArtwork: {
		url: string;
		artist: string;
		title: string;
	};
}

interface ArtTimelineItem {
	period: string;
	title: string;
	content: string;
	artworks: {
		url: string;
		artist: string;
		title: string;
	}[];
	featuredArtwork: {
		url: string;
		artist: string;
		title: string;
	};
}

interface ArtTimelineItem {
	period: string;
	title: string;
	content: string;
	artworks: {
		url: string;
		artist: string;
		title: string;
	}[];
	featuredArtwork: {
		url: string;
		artist: string;
		title: string;
	};
}

export default function CustomisedTimeline () { 
	const [isMounted, setIsMounted] = React.useState(false);
	const [selectedItem, setSelectedItem] = React.useState<ArtTimelineItem | null>(null);

	const theme = useTheme();
  const themeType = NextThemes.useTheme()
	const isMobile = useMediaQuery(theme.breakpoints.down('md'));

	const AnimatedDot = motion(TimelineDot);
	const AnimatedConnector = motion(TimelineConnector);
 	const AnimatedTimelineContent = motion(TimelineContent);

	React.useEffect(() => {
		setIsMounted(true);
	}, [])

	const randomisedData = React.useMemo((): ArtTimelineItem[] => {
		return artTimelineData.map(item => {
			const randomIndex = Math.floor(Math.random() * item.artworks.length);
			
			return {
				...item,
				featuredArtwork: item.artworks[randomIndex]
			};
		});
	}, [isMounted]);

	if (!isMounted) {
		return null;
	}

	return (
		<Timeline 
			position={isMobile ? "right" : "alternate"}
			sx={{
				'@media (min-width: 900px)': {
					[`& .${timelineItemClasses.root}:before`]: {
						flex: 0,
						padding: 0,
					},
					[`& .${timelineItemClasses.root}:nth-of-type(even) .${timelineContentClasses.root}`]: {
						textAlign: 'justify',
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'flex-end'
					},
					[`& .${timelineItemClasses.root}:nth-of-type(odd) .${timelineContentClasses.root}`]: {
						textAlign: 'justify',
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'flex-start'
					},
				}
			}}
			className='mx-0! sm:mx-5! my-10!'
		>
			{randomisedData.toReversed().map((item, index) => {
				return (
					<TimelineItem key={index}>
						<TimelineOppositeContent 
							variant="body1" 
							sx={{ display: { xs: 'none', md: 'block' } }}
							className="font-mono! text-primary-light! dark:text-primary-dark! my-auto!"
						>
							{item.period}
						</TimelineOppositeContent>
						<TimelineSeparator>
							<div className='relative! flex! flex-col! items-center! flex-1! w-full!'>
								<div className='absolute! inset-0! bg-primary-light/30! dark:bg-primary-dark/30! w-[0.05rem]! sm:w-[0.2rem]! mx-auto!' />
                <AnimatedConnector
                  initial={{ scaleY: 0 }}
                  viewport={{ once: false }}
                  whileInView={{ scaleY: 1 }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                  className='origin-bottom! bg-primary! dark:bg-primary-dark! w-[0.08rem]! sm:w-[0.2rem]!'
                />
							</div>
							<AnimatedDot 
								initial={ themeType.theme == 'light' ? { backgroundColor: 'rgba(139, 93, 207, 0.3)' } : { backgroundColor: 'rgba(208, 192, 237, 0.3)' }}
								whileInView={themeType.theme == 'light' ? { backgroundColor: "#8B5DCF" } : { backgroundColor: "#D0C0ED" }}
								transition={{
									delay: 0.6,
									duration: 0.4
								}}
								viewport={{ once: false }}
								className='m-0!'
							>
								<div className="w-1.5 h-1.5 sm:w-5 sm:h-5 rounded-full" />
							</AnimatedDot>
							<div className='relative! flex! flex-col! items-center! flex-1! w-full!'>
								<div className='absolute! inset-0! bg-primary-light/30! dark:bg-primary-dark/30! w-[0.05rem]! sm:w-[0.2rem]! mx-auto!' />
                <AnimatedConnector
                  initial={{ scaleY: 0 }}
                  viewport={{ once: false }}
                  whileInView={{ scaleY: 1 }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                  className='origin-top! bg-primary! dark:bg-primary-dark! w-[0.08rem]! sm:w-[0.2rem]!'
                />
							</div>
							
						</TimelineSeparator>
						<AnimatedTimelineContent
							className='flex-1! font-mono! text-primary-light! dark:text-primary-dark! py-3! px-4!'
							initial={{ opacity: 0.3 }}
							whileInView={{ opacity: 1 }}
							transition={{
								duration: 0.6,
								delay: 0.8,
								ease: "easeOut"
							}}
							viewport={{ once: false, amount: 0.5 }}
						>
							<Typography variant='h6' className='md:hidden! font-mono! text-primary-light/70! dark:text-primary-dark/90! my-4! font-normal! sm:font-bold!'>
								{item.period}
							</Typography>
							<Image 
								width={500}
								height={500}
								src={item.featuredArtwork.url}
								onClick={() => setSelectedItem(item)}
								alt={item.featuredArtwork.title || item.title}
								className='rounded-sm cursor-pointer'
							/>
							<Typography component="span"  className="flex! font-sans! text-primary-light! dark:text-primary-dark! text-[3rem]/12! my-5! text-start!">
								{item.title}
							</Typography>
							<Typography className="font-mono! font-light! text-primary-light! dark:text-primary-dark! max-w-full 2xl:max-w-2/3 ">
								{item.content}
							</Typography>
						</AnimatedTimelineContent>
					</TimelineItem>
				)
			})}
			<Modal
				open={Boolean(selectedItem)}
				onClose={() => setSelectedItem(null)}
				className='bg-black/90! flex! items-center! justify-center!'
			>
				{selectedItem ? (
					<Stack
						direction="column"
						justifyContent="space-between"
						className='w-full! h-full! px-2! md:px-5! pointer-events-auto!' 
					>
						<IconButton 
                onClick={() => setSelectedItem(null)} 
                className="text-secondary-light! hover:bg-white/10! z-30! w-15! h-15! my-2! pointer-events-auto! mx-auto!"
            >
                <Close className="text-[1.5rem]! md:text-[2rem]! lg:text-[3rem]!" /> 
            </IconButton>
						<Stack 
							direction="row"
							alignItems="center"
							justifyContent="space-between"
							className='w-full! h-full! -mt-10! sm:-mt-15! px-2! md:px-5! pointer-events-auto!'
							gap={{ sm: 2, md: 3, lg: 4 }}
						>
							<Box 
								mt={4} 
								className="w-full! md:w-[80%] lg:w-[55%]! max-h-[87vh] overflow-y-auto! border-none! rounded-lg! shadow-2xl! shadow-black/50! ring-2! ring-white/10! mx-auto!"
							>
									<Stack 
										direction="column" 
										className='w-full! h-full!'
										justifyContent="space-between" 
									>
										<div className='w-full overflow-y-auto grow scrollbar-hide'>
											<Image
												src={selectedItem.featuredArtwork.url}
												alt={selectedItem.title}
												width={1200}
												height={800}
												className='rounded-md w-full h-auto object-cover select-none! pointer-events-none!'
											/>
										</div>
										<Stack className='w-full sticky! bottom-0! bg-black/40! backdrop-blur-md! p-6! border-t! border-white/10! z-20 mt-auto!'>
											<div className='max-w-full'>
												<p className='text-secondary-light/80 text-[1.1rem] font-medium mt-1 mb-4'>{selectedItem.featuredArtwork.title}</p>
												<p className='text-secondary-light/80 text-[1rem] font-extralight mt-1 leading-relaxed italic'>
													{selectedItem.featuredArtwork.artist || 'Unknown Artist'}
												</p>
											</div>
										</Stack>
									</Stack>
							</Box>
						</Stack>
					</Stack>
				) : (
					<div />
				)}
			</Modal>
		</Timeline>
	)
}

const artTimelineData = [
  {
    period: '1000–1150',
    title: 'Romanesque: The Fortress of Faith',
    content: 'As Europe stabilized, the Great Cathedrals rose like stone fortresses. Artists moved away from realism to create heavy, symbolic figures designed to teach scripture to a largely illiterate public, turning every wall into a massive visual sermon.',
    artworks: [
      {
        title: 'The Bayeux Tapestry (c. 1070s)',
        artist: 'Unknown Artists',
        url: 'https://res.cloudinary.com/dzzwjwhfl/image/upload/v1776068906/The_Bayeux_Tapestry_dm9i1t.png',
      },
      {
        title: 'Apse Painting of Sant Climent de Taüll (c. 1123)',
        artist: 'Master of Taüll',
        url: 'https://res.cloudinary.com/dzzwjwhfl/image/upload/v1776068892/Apse_Painting_of_Sant_Climent_de_Ta%C3%BCll_lnbzpv.jpg',
      },
      {
        title: 'St. John the Evangelist from the Grimbald Gospels (c. 1020)',
        artist: 'Anonymous',
        url: 'https://res.cloudinary.com/dzzwjwhfl/image/upload/v1776068892/St._John_the_Evangelist_from_the_Grimbald_Gospels_kxjscm.jpg',
      },
      {
        title: 'Moses Expounding the Law from the Bury Bible (c. 1135)',
        artist: 'Master Hugo',
        url: 'https://res.cloudinary.com/dzzwjwhfl/image/upload/v1776068892/Moses_Expounding_the_Law_from_the_Bury_Bible_zr34oc.jpg',
      },
      {
        title: 'The Morgan Leaf from the Winchester Bible (c. 1160)',
        artist: 'Master of the Morgan Leaf',
        url: 'https://res.cloudinary.com/dzzwjwhfl/image/upload/v1776068892/The_Morgan_Leaf_from_the_Winchester_Bible_mhzjmy.jpg',
      },
    ],
    dotColor: 'primary',
  },
  {
    period: '1150–1400',
    title: 'Gothic: Light Through the Darkness',
    content: 'Architects reached for the heavens with soaring arches and stained glass. While the Black Death of 1347 brought a macabre obsession with mortality, it also pushed artists like Giotto to paint more human, emotional faces that began to breathe with life.',
    artworks: [
      {
        title: 'Lamentation (The Mourning of Christ) (1305)',
        artist: 'Giotto',
        url: 'https://res.cloudinary.com/dzzwjwhfl/image/upload/v1776068876/Lamentation_The_Mourning_of_Christ_hkbvz5.jpg',
      },
      {
        title: 'Maestà (1308)',
        artist: 'Duccio di Buoninsegna',
        url: 'https://res.cloudinary.com/dzzwjwhfl/image/upload/v1776068876/Maest%C3%A0_opn9dr.jpg',
      },
      {
        title: 'The Annunciation (1333)',
        artist: 'Simone Martini',
        url: 'https://res.cloudinary.com/dzzwjwhfl/image/upload/v1776068882/The_Annunciation_nfguj7.jpg',
      },
      {
        title: 'The Wilton Diptych (c. 1395)',
        artist: 'Unknown Master',
        url: 'https://res.cloudinary.com/dzzwjwhfl/image/upload/v1776068880/The_Wilton_Diptych_rdvuvd.jpg',
      },
      {
        title: 'Effects of Good Government in the City (1338)',
        artist: 'Ambrogio Lorenzetti',
        url: 'https://res.cloudinary.com/dzzwjwhfl/image/upload/v1776068876/Effects_of_Good_Government_in_the_City_necusp.jpg',
      },
    ],
    dotColor: 'secondary',
  },
  {
    period: '1400–1530',
    title: 'Renaissance: The Human Rebirth',
    content: "The invention of the printing press in 1440 acted as a catalyst, spreading classical Greek and Roman ideals across the continent. Masters like Da Vinci blended science with art, mastering perspective to place humanity at the absolute center of the universe.",
    artworks: [
      {
        title: 'The School of Athens (1511)',
        artist: 'Raphael',
        url: 'https://res.cloudinary.com/dzzwjwhfl/image/upload/v1776068890/School_of_Athens_kvnjwj.jpg',
      },
      {
        title: 'The Last Supper (1495)',
        artist: 'Leonardo da Vinci',
        url: 'https://res.cloudinary.com/dzzwjwhfl/image/upload/v1776068891/The_Last_Supper_xqgkhh.png',
      },
      {
        title: 'The Birth of Venus (1485)',
        artist: 'Sandro Botticelli',
        url: 'https://res.cloudinary.com/dzzwjwhfl/image/upload/v1776068891/The_Birth_of_Venus_oyksku.jpg',
      },
      {
        title: 'The Garden of Earthly Delights (1490)',
        artist: 'Hieronymus Bosch',
        url: 'https://res.cloudinary.com/dzzwjwhfl/image/upload/v1776068891/The_Garden_of_Earthly_Delights_zxm8wb.jpg',
      },
      {
        title: 'The Arnolfini Portrait (1434)',
        artist: 'Jan van Eyck',
        url: 'https://res.cloudinary.com/dzzwjwhfl/image/upload/v1776068890/The_Arnolfini_Portrait_cmdhrg.jpg',
      },
    ],
    dotColor: 'success',
  },
  {
    period: '1600–1750',
    title: 'Baroque: The Divine Spectacle',
    content: "In the heat of the Counter-Reformation, the Church used art as a weapon of awe. Painters used 'Chiaroscuro'—extreme light and shadow—to create cinematic, high-stakes drama that gripped the viewer’s soul and inspired religious devotion through sheer intensity.",
    artworks: [
      {
        title: 'The Calling of St Matthew (1600)',
        artist: 'Caravaggio',
        url: 'https://res.cloudinary.com/dzzwjwhfl/image/upload/v1776068872/The_Calling_of_Saint_Matthew_ewawsl.jpg',
      },
      {
        title: 'The Night Watch (1642)',
        artist: 'Rembrandt',
        url: 'https://res.cloudinary.com/dzzwjwhfl/image/upload/v1776068873/The_Night_Watch_r6nyft.jpg',
      },
      {
        title: 'Las Meninas (1656)',
        artist: 'Diego Velázquez',
        url: 'https://res.cloudinary.com/dzzwjwhfl/image/upload/v1776068872/Las_Meninas_The_Maids_of_Honour_oiryge.jpg',
      },
      {
        title: 'Girl with a Pearl Earring (1665)',
        artist: 'Johannes Vermeer',
        url: 'https://res.cloudinary.com/dzzwjwhfl/image/upload/v1776068879/Girl_with_a_Pearl_Earring_ajf4pz.jpg',
      },
      {
        title: 'Judith Slaying Holofernes (1612)',
        artist: 'Artemisia Gentileschi',
        url: 'https://res.cloudinary.com/dzzwjwhfl/image/upload/v1776068872/Judith_Beheading_Holofernes_o1advh.jpg',
      },
    ],
    dotColor: 'warning',
  },
  {
    period: '1750–1850',
    title: 'Neoclassicism: The Age of Reason',
    content:
      "The rediscovery of Pompeii in 1748 sparked a obsession with the ancient past. Rejecting Baroque 'excess,' artists returned to the clean lines and moral order of antiquity, mirroring the Enlightenment’s push for logic, democracy, and revolution.",
    artworks: [
      {
        title: 'The Oath of the Horatii (1784)',
        artist: 'Jacques-Louis David',
        url: 'https://res.cloudinary.com/dzzwjwhfl/image/upload/v1776068885/The_Oath_of_the_Horatii_p6f9sm.jpg',
      },
      {
        title: 'The Apotheosis of Homer (1827)',
        artist: 'Jean-Auguste-Dominique Ingres',
        url: 'https://res.cloudinary.com/dzzwjwhfl/image/upload/v1776068884/The_Apotheosis_of_Homer_s26skx.jpg',
      },
      {
        title: 'Cornelia, Mother of the Gracchi (1785)',
        artist: 'Angelica Kauffman',
        url: 'https://res.cloudinary.com/dzzwjwhfl/image/upload/v1776068882/Cornelia_Mother_of_the_Gracchi_ne1agw.jpg',
      },
      {
        title: 'The Death of General Wolfe (1770)',
        artist: 'Benjamin West',
        url: 'https://res.cloudinary.com/dzzwjwhfl/image/upload/v1776068885/The_Death_of_General_Wolfe_gxrgwk.jpg',
      },
      {
        title: 'Parnassus (1761)',
        artist: 'Anton Raphael Mengs',
        url: 'https://res.cloudinary.com/dzzwjwhfl/image/upload/v1776068881/Parnassus_fuzqj7.png',
      },
    ],
    dotColor: 'info',
  },
  {
    period: '1840–1880',
    title: 'Realism: The Industrial Truth',
    content: "As the Industrial Revolution reshaped society, artists turned their backs on Greek gods to paint the grit of the working class. They challenged the 'Academy' by proving that a common laborer was a subject just as worthy of a canvas as a king.",
    artworks: [
      {
        title: 'The Stone Breakers (1849)',
        artist: 'Gustave Courbet',
        url: 'https://res.cloudinary.com/dzzwjwhfl/image/upload/v1776068887/The_Stone_Breakers_vlmu0k.jpg',
      },
      {
        title: 'The Gleaners (1857)',
        artist: 'Jean-François Millet',
        url: 'https://res.cloudinary.com/dzzwjwhfl/image/upload/v1776068892/The_Gleaners_1857_v5l1dj.jpg',
      },
      {
        title: 'Barge Haulers on the Volga (1870)',
        artist: 'Ilya Repin',
        url: 'https://res.cloudinary.com/dzzwjwhfl/image/upload/v1776068890/Barge_Haulers_on_the_Volga_papxk8.jpg',
      },
      {
        title: 'The Gross Clinic (1875)',
        artist: 'Thomas Eakins',
        url: 'https://res.cloudinary.com/dzzwjwhfl/image/upload/v1776068888/The_Gross_Clinic_ikcgim.jpg',
      },
      {
        title: 'The Third-Class Carriage (1862)',
        artist: 'Honoré Daumier',
        url: 'https://res.cloudinary.com/dzzwjwhfl/image/upload/v1776068890/The_Third-Class_Carriage_ihm7hx.jpg',
      },
    ],
    dotColor: 'grey',
  },
  {
    period: '1860–1900',
    title: 'Impressionism: Capturing the Fleeting',
    content: "The invention of photography in 1839 changed everything; if a machine could document reality, what was the painter's job? Artists like Monet responded by chasing light itself, using quick, broken brushstrokes to capture the 'feeling' of a moment rather than its detail.",
    artworks: [
      {
        title: 'Impression, Sunrise (1872)',
        artist: 'Claude Monet',
        url: 'https://res.cloudinary.com/dzzwjwhfl/image/upload/v1776068880/Impression_Sunrise_qqylvl.jpg',
      },
      {
        title: 'Bal du moulin de la Galette (1876)',
        artist: 'Pierre-Auguste Renoir',
        url: 'https://res.cloudinary.com/dzzwjwhfl/image/upload/v1776068880/Bal_du_moulin_de_la_Galette_xh0hie.jpg',
      },
      {
        title: 'The Starry Night (1889)',
        artist: 'Vincent van Gogh',
        url: 'https://res.cloudinary.com/dzzwjwhfl/image/upload/v1776068881/The_Starry_Night_rlq9p7.jpg',
      },
      {
        title: 'A Sunday Afternoon on the Island of La Grande Jatte (1884)',
        artist: 'Georges Seurat',
        url: 'https://res.cloudinary.com/dzzwjwhfl/image/upload/v1776068880/A_Sunday_Afternoon_on_the_Island_of_La_Grande_Jatte_gsrqoh.jpg',
      },
      {
        title: 'The Cradle (1872)',
        artist: 'Berthe Morisot',
        url: 'https://res.cloudinary.com/dzzwjwhfl/image/upload/v1776068891/The_Cradle_1872_heiqrc.jpg',
      },
    ],
    dotColor: 'primary',
  },
  {
    period: '1905–1920',
    title: 'Expressionism: A Fractured World',
    content: 'Before the Great War, artists began rejecting the external "impression" of the world in favor of raw, internal emotion. By using jarring colors and distorted forms, they sought to capture the psychological tension of modern city life and the primal spiritual forces simmering beneath the surface of a rapidly industrializing society.',
    artworks: [
      {
        title: 'The Scream (1893)',
        artist: 'Edvard Munch',
        url: 'https://res.cloudinary.com/dzzwjwhfl/image/upload/v1776068875/The_Scream_fsvp9x.jpg',
      },
      {
        title: 'Street, Berlin (1913)',
        artist: 'Ernst Ludwig Kirchner',
        url: 'https://res.cloudinary.com/dzzwjwhfl/image/upload/v1776068875/Street_Berlin_1913_i6dnwa.jpg',
      },
      {
        title: 'Blue Horse I (1911)',
        artist: 'Franz Marc',
        url: 'https://res.cloudinary.com/dzzwjwhfl/image/upload/v1776068874/Blue_Horse_I_1911_jhhonw.jpg',
      },
      {
        title: 'Composition VII (1913)',
        artist: 'Wassily Kandinsky',
        url: 'https://res.cloudinary.com/dzzwjwhfl/image/upload/v1776068873/Composition_VII_lh1ghw.jpg',
      },
      {
        title: 'Portrait of Adele Bloch-Bauer I (1907)',
        artist: 'Gustav Klimt',
        url: 'https://res.cloudinary.com/dzzwjwhfl/image/upload/v1776068874/Portrait_of_Adele_Bloch-Bauer_I_qbyvrd.avif',
      },
    ],
    dotColor: 'error',
  },
  {
    period: '1920–1950',
    title: 'Surrealism: The Dreamscape',
    content: 'Influenced by Freud’s study of dreams, artists like Dalí unlocked the subconscious. They merged the rational with the irrational, creating bizarre, melting landscapes that suggested the truth of the human experience lay beneath our waking thoughts.',
    artworks: [
      {
        title: 'The Persistence of Memory (1931)',
        artist: 'Salvador Dalí',
        url: 'https://res.cloudinary.com/dzzwjwhfl/image/upload/v1776068893/The_Persistence_of_Memory_disavp.jpg',
      },
      {
        title: 'The Son of Man (1964)',
        artist: 'René Magritte',
        url: 'https://res.cloudinary.com/dzzwjwhfl/image/upload/v1776068893/The_Son_of_Man_hxbsum.jpg',
      },
      {
        title: 'The Broken Column (1944)',
        artist: 'Frida Kahlo',
        url: 'https://res.cloudinary.com/dzzwjwhfl/image/upload/v1776068893/The_Broken_Column_nn8xug.jpg',
      },
      {
        title: 'The Tilled Field (1923)',
        artist: 'Joan Miró',
        url: 'https://res.cloudinary.com/dzzwjwhfl/image/upload/v1776068893/The_Tilled_Field_rta4ye.jpg',
      },
      {
        title: 'Guardian of the Secret (1943)',
        artist: 'Jackson Pollock',
        url: 'https://res.cloudinary.com/dzzwjwhfl/image/upload/v1776068892/guardians-of-the-secret_iv8s6o.jpg',
      },
    ],
    dotColor: 'secondary',
  },
  {
    period: '1950–1970',
    title: 'Pop Art: The Mirror of Consumption',
    content: 'In the post-war boom, consumerism became the new religion. Andy Warhol took soup cans and celebrities off the shelves and put them in galleries, forever blurring the line between high art and the everyday commercial world.',
    artworks: [
      {
        title: 'Portrait of an Artist (Pool with Two Figures) (1972)',
        artist: 'David Hockney',
        url: 'https://res.cloudinary.com/dzzwjwhfl/image/upload/v1776068885/Portrait_of_an_Artist_Pool_with_Two_Figures_vkojmy.jpg',
      },
      {
        title: 'Marilyn Diptych (1962)',
        artist: 'Andy Warhol',
        url: 'https://res.cloudinary.com/dzzwjwhfl/image/upload/v1776068885/Marilyn_Diptych_ykjgqb.jpg',
      },
      {
        title: 'Whaam! (1963)',
        artist: 'Roy Lichtenstein',
        url: 'https://res.cloudinary.com/dzzwjwhfl/image/upload/v1776068886/Whaam_1963_kuttol.jpg',
      },
      {
        title: 'Standard Station (1963)',
        artist: 'Ed Ruscha',
        url: 'https://res.cloudinary.com/dzzwjwhfl/image/upload/v1776068886/Standard_Station_1963_mggete.jpg',
      },
      {
        title: 'President Elect (1960)',
        artist: 'James Rosenquist',
        url: 'https://res.cloudinary.com/dzzwjwhfl/image/upload/v1776068886/President_Elect_1960_vwbiw2.jpg',
      },
    ],
    dotColor: 'success',
  },
  {
    period: '1970–Present',
    title: 'Contemporary: The Figurative Legacy',
    content: 'The Digital Revolution dismantled the physical canvas. Today, art is a global, interactive dialogue—shifting from oil and stone to pixels, code, and social activism—where the audience is often as much a part of the work as the creator.',
    artworks: [
      {
        title: 'Untitled (The Nile) (1982)',
        artist: 'Jean-Michel Basquiat',
        url: 'https://res.cloudinary.com/dzzwjwhfl/image/upload/v1776068875/The_Nile_ltwd04.jpg',
      },
      {
        title: 'Girl with Balloon (2002)',
        artist: 'Banksy',
        url: 'https://res.cloudinary.com/dzzwjwhfl/image/upload/v1776068872/Girl_with_Balloon_2002_a5s1nu.webp',
      },
      {
        title: 'Study of George Dyer (1970)',
        artist: 'Francis Bacon',
        url: 'https://res.cloudinary.com/dzzwjwhfl/image/upload/v1776068873/Study_of_George_Dyer_1970_jwbqyh.jpg',
      },
      {
        title: 'Stadia II (2004)',
        artist: 'Julie Mehretu',
        url: 'https://res.cloudinary.com/dzzwjwhfl/image/upload/v1776068873/Stadia_II_dt6m8a.jpg',
      },
      {
        title: 'Untitled (Cowboy) (1989)',
        artist: 'Richard Prince',
        url: 'https://res.cloudinary.com/dzzwjwhfl/image/upload/v1776068873/Untitled_cowboy_m6ujbh.jpg',
      },
    ],
    dotColor: 'info',
  },
];
