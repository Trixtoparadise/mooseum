import Box from '@mui/material/Box';
import MasonryAlt from '@/app/ui/MasonryAlt';
import Typography from '@mui/material/Typography';

interface ArtistData {
  id: string;
  name: string;
  years: string;
  nationality: string;
  biography: string;
  movementIds: string[];
  imageUrl: string;
}

interface MovementData {
  id: string;
  name: string;
  period: string;
  origin: string;
  description: string;
  characteristics: string[];
  notableArtistsId: string[];
}

interface ArtworkData {
  id: string;
  title: string;
  year: number;
  description: string;
  location: string;
  artistId: string;
  movementId: string;
  imageUrl: string;
}

export async function generateStaticParams() {
    const res =  await fetch('https://mooseum-gvb0g8gehsbde0fk.southafricanorth-01.azurewebsites.net/api/movements/');
    const movements: MovementData[] = await res.json();

    return movements.map((movement) => ({
        movement: movement.id
    }));
}

export default async function MovementPage({
    params
}: {
    params: Promise<{ movement: string}>
}) {
    const { movement } = await params;

    const [movementRes, artistRes] = await Promise.all([
        fetch(`https://mooseum-gvb0g8gehsbde0fk.southafricanorth-01.azurewebsites.net/api/movements/${movement}`),
        fetch(`https://mooseum-gvb0g8gehsbde0fk.southafricanorth-01.azurewebsites.net/api/artists/byMovement/${movement}`)
    ])

    const artistsData: ArtistData[] = await artistRes.json();
    const movementData: MovementData = await movementRes.json();

    return (
        <Box className='mt-6! my-8! sm:my-15! mx-4! sm:mx-19! w-full! max-w-full! sm:max-w-5xl!'>
            <Typography className='font-mono! font-extralight! text-[1.7rem]! text-center! sm:text-start! sm:text-[2.2rem]! mb-5!'>
                {movementData.name}
            </Typography>

            <Box className='flex-1 flex flex-col gap-2 p-2! sm:p-4! mb-10 mr-0! sm:mr-6! max-w-full lg:max-w-2/3 bg-primary-light/10 dark:bg-primary-dark/10 rounded-md'>
                <Typography className='font-mono! px-4! pb-1! sm:px-0! sm:pb-3! sm:mx-4! text-primary-light! dark:text-primary-dark! text-[1rem]! sm:text-md! font-extralight!'>
                    <strong className='font-sans! text-[2rem]! sm:text-4xl/11!'>Origin</strong><br/>{movementData.origin}
                </Typography>
                <Typography className='font-mono! px-4! pb-1! sm:px-0! sm:pb-3 sm:mx-4! text-primary-light! dark:text-primary-dark! text-[1rem]! sm:text-md! font-extralight!'>
                    <strong className='font-sans! text-[2rem]! sm:text-4xl/11!'>Period</strong><br/> {movementData.period}
                </Typography>
                <Typography className='font-mono! px-4! py-1! sm:px-0! sm:py-3! sm:mx-4! text-primary-light! dark:text-primary-dark! text-[1rem]! sm:text-md! font-extralight!'>
                    <strong className='font-sans! text-[2rem]! sm:text-4xl/11!'>Notable artists</strong><br/> {artistsData.map((item) => item.name).join(", ")}
                </Typography>
                <Typography className='font-mono! px-4! pb-2! sm:px-0! sm:pb-3! sm:mx-4! text-primary-light! dark:text-primary-dark! text-[1rem]! sm:text-md! font-extralight!'>
                    <strong className='font-sans! text-[2rem]! sm:text-4xl/12!'>Description</strong><br/> {movementData.description}
                </Typography>
            </Box>
            
            <Typography className='font-mono! font-extralight! text-[1.7rem]! text-center! sm:text-start! sm:text-[2.2rem]! mb-5!'>
                Characteristics
            </Typography>

            <MasonryAlt 
                data={artworksData[movementData.name]}
                characteristics={movementData.characteristics}
            />
        </Box>     
    )
}

const artworksData : Record<string, ArtworkData[]> = {
    "Abstract Expressionism" : [
        {
            "id": "artwork-rothko-no61",
            "title": "No. 61 (Rust and Blue)",
            "year": 1953,
            "description": "A prominent example of Color Field painting featuring layered, luminous bands of rust and blue that evoke deep contemplation and emotional resonance.",
            "location": "Museum of Contemporary Art, Los Angeles",
            "artistId": "artist-mark-rothko",
            "movementId": "movement-abstract-expressionism",
            "imageUrl": "https://res.cloudinary.com/dzzwjwhfl/image/upload/v1779109056/No._61_Rust_and_Blue_Mark_Rothko_vd5phc.jpg"
        },
        {
            "id": "artwork-pollock-no5",
            "title": "No. 5, 1948",
            "year": 1948,
            "description": "A monumental work of Action Painting created on fiberboard using liquid synthetic resin paints, capturing the artist's kinetic energy through complex drip and splatter layers.",
            "location": "Private Collection, New York",
            "artistId": "artist-jackson-pollock",
            "movementId": "movement-abstract-expressionism",
            "imageUrl": "https://res.cloudinary.com/dzzwjwhfl/image/upload/v1779109040/No._5_1948_Jackson_Pollock_vajucx.jpg",
        },
        {
            "id": "artwork-dekooning-woman1",
            "title": "Woman I",
            "year": 1952,
            "description": "A fierce and heavily gestural piece that blends abstraction with figuration, displaying aggressive brushwork and thick layers of scraped and reapplied paint.",
            "location": "Museum of Modern Art, New York",
            "artistId": "artist-willem-de-kooning",
            "movementId": "movement-abstract-expressionism",
            "imageUrl": "https://res.cloudinary.com/dzzwjwhfl/image/upload/v1779109015/Woman_I_Willem_de_Kooning_nyul6t.jpg",
        },
        {
            "id": "artwork-frankenthaler-mountains-sea",
            "title": "Mountains and Sea",
            "year": 1952,
            "description": "A breakthrough canvas that pioneered the soak-stain technique, where thinned oil paint was poured directly onto unprimed canvas to create fluid, watercolor-like fields of color.",
            "location": "National Gallery of Art, Washington, D.C.",
            "artistId": "artist-helen-frankenthaler",
            "movementId": "movement-abstract-expressionism",
            "imageUrl": "https://res.cloudinary.com/dzzwjwhfl/image/upload/v1779109028/Mountains_and_Sea_Helen_Frankenthaler_z8fo7x.jpg"
        }
    ],
    "Abstractionism" : [
        {
            "id": "artwork-matisse-the-snail",
            "title": "The Snail",
            "year": 1953,
            "description": "A large-scale gouache découpée (paper cutout) that represents abstract geometric forms arranged in a spiral pattern to evoke the essence of a snail.",
            "location": "Tate Modern, London",
            "artistId": "artist-henri-matisse",
            "movementId": "movement-abstractionism",
            "imageUrl": "https://res.cloudinary.com/dzzwjwhfl/image/upload/v1779109016/The_Snail_Henri_Matisse_nmqml7.jpg"
        },
        {
            "id": "artwork-kandinsky-composition-viii",
            "title": "Composition VIII",
            "year": 1923,
            "description": "A seminal abstract work featuring an array of geometric shapes, lines, and colors that create a harmonious, musical rhythm on canvas.",
            "location": "Solomon R. Guggenheim Museum, New York",
            "artistId": "artist-wassily-kandinsky",
            movementId: "movement-abstractionism",
            imageUrl: "https://res.cloudinary.com/dzzwjwhfl/image/upload/v1779109009/Composition_VIII_Wassily_Kandinsky_pk6cqw.jpg"
        },
        {
            id: "artwork-twombly-untitled",
            title: "Untitled",
            year: 1970,
            description: "A signature blackboard-style canvas featuring continuous, rhythmic, and energetic loops of white crayon over a dark grey background.",
            location: "Museum of Modern Art, New York",
            artistId: "artist-cy-twombly",
            movementId: "movement-abstractionism",
            imageUrl: "https://res.cloudinary.com/dzzwjwhfl/image/upload/v1779109007/Untitled_Cy_Twombly_g39j6b.jpg"
        },
        {
            id: "artwork-miro-peinture-etoile-bleue",
            title: "Peinture (Étoile Bleue)",
            year: 1927,
            description: "A dreamlike, biomorphic composition dominating a vibrant blue field, representing the artist's poetic and surrealist-inspired abstract language.",
            location: "Private Collection",
            artistId: "artist-joan-miro",
            movementId: "movement-abstractionism",
            imageUrl: "https://res.cloudinary.com/dzzwjwhfl/image/upload/v1779109007/Peinture_Etoile_Bleue_Joan_Mir%C3%B3_k1po8s.webp"
        }
    ],
    "Art Nouveau" : [
        {
            id: "artwork-toulouse-lautrec-divan-japonais",
            title: "Divan Japonais",
            year: 1893,
            description: "A lithograph poster featuring flat color planes and bold, sinuous lines advertising a prominent Parisian café-concert venue.",
            location: "Musée d'Orsay, Paris",
            artistId: "artist-henri-de-toulouse-lautrec",
            movementId: "movement-art-nouveau",
            imageUrl: "https://res.cloudinary.com/dzzwjwhfl/image/upload/v1779109011/Divan_Japonais_Henri_de_Toulouse-Lautrec_eldolj.jpg"
        },
        {
            id: "artwork-mucha-the-primrose",
            title: "The Primrose",
            year: 1899,
            description: "A decorative panel capturing the idealised Art Nouveau aesthetic, featuring stylized floral elements and organic, whiplash curves framing a female figure.",
            location: "Mucha Museum, Prague",
            artistId: "artist-alphonse-mucha",
            movementId: "movement-art-nouveau",
            imageUrl: "https://res.cloudinary.com/dzzwjwhfl/image/upload/v1779109029/The_Primrose_Alphonse_Mucha_galkl7.jpg"
        },
        {
            id: "artwork-beardsley-the-peacock-skirt",
            title: "The Peacock Skirt",
            year: 1893,
            description: "An elegant, high-contrast black-and-white ink illustration created for Oscar Wilde's play Salomé, featuring sweeping decorative lines.",
            location: "Fogg Art Museum, Harvard University",
            artistId: "artist-aubrey-beardsley",
            movementId: "movement-art-nouveau",
            imageUrl: "https://res.cloudinary.com/dzzwjwhfl/image/upload/v1779109007/The_Peacock_Skirt_Aubrey_Beardsley_ztbcny.png"
        },
        {
            id: "artwork-klimt-stoclet-frieze",
            title: "Stoclet Frieze",
            year: 1911,
            description: "A complex mosaic mural featuring intricate golden spirals, the Tree of Life, and heavily stylized human figures.",
            location: "Stoclet Palace, Brussels",
            artistId: "artist-gustav-klimt",
            movementId: "movement-art-nouveau",
            imageUrl: "https://res.cloudinary.com/dzzwjwhfl/image/upload/v1779109007/Stoclet_Frieze_Gustav_Klimt_ckr36k.jpg"
        }
    ],
    "Baroque" : [
        {
            id: "artwork-caravaggio-supper-emmaus",
            title: "The Supper at Emmaus",
            year: 1601,
            description: "A dramatic composition utilizing extreme chiaroscuro to depict the exact moment the resurrected Jesus reveals himself to his disciples.",
            location: "National Gallery, London",
            artistId: "artist-caravaggio",
            movementId: "movement-baroque",
            imageUrl: "https://res.cloudinary.com/dzzwjwhfl/image/upload/v1779109057/The_Supper_at_Emmaus_Caravaggio_mifuy7.jpg"
        },
        {
            id: "artwork-hals-the-laughing-cavalier",
            title: "The Laughing Cavalier",
            year: 1624,
            description: "A lively portrait of a Dutch nobleman notable for its brilliant rendering of an ornate embroidered doublet and an enigmatic, smiling expression.",
            location: "Wallace Collection, London",
            artistId: "artist-frans-hals",
            movementId: "movement-baroque",
            imageUrl: "https://res.cloudinary.com/dzzwjwhfl/image/upload/v1779109056/The_Laughing_Cavalier_Frans_Hals_o8wwje.jpg"
        },
        {
            id: "artwork-vermeer-the-milkmaid",
            title: "The Milkmaid",
            year: 1658,
            description: "A masterful genre scene showcasing domestic simplicity, elevated by a superb rendering of natural light streaming onto simple textured objects.",
            location: "Rijksmuseum, Amsterdam",
            artistId: "artist-johannes-vermeer",
            movementId: "movement-baroque",
            imageUrl: "https://res.cloudinary.com/dzzwjwhfl/image/upload/v1779109045/The_Milkmaid_Johannes_Vermee_xzizwr.png"
        }
    ],
    "Black Arts Movement" : [
        {
            id: "artwork-donaldson-wall-of-respect",
            title: "Wall of Respect",
            year: 1967,
            description: "An outdoor public mural depicting black icons, which served as a vital cornerstone of cultural pride and political activism in Chicago.",
            location: "Chicago, Illinois (Destroyed)",
            artistId: "artist-jeff-donaldson",
            movementId: "movement-black-arts-movement",
            imageUrl: "https://res.cloudinary.com/dzzwjwhfl/image/upload/v1779109062/Wall_of_Respect_Jeff_Donaldson_wvkogk.webp"
        },
        {
            id: "artwork-jarrell-revolutionary",
            title: "Revolutionary",
            year: 1972,
            description: "A vibrant AfriCOBRA portrait of Angela Davis composed of fragmented typography, revolutionary texts, and hyper-saturated 'coolade' colors.",
            location: "Brooklyn Museum, New York",
            artistId: "artist-wadsworth-jarrell",
            movementId: "movement-black-arts-movement",
            imageUrl: "https://res.cloudinary.com/dzzwjwhfl/image/upload/v1779109060/Revolutionary_Wadsworth_Jarrell_xumtrr.jpg"
        },
        {
            id: "artwork-ringgold-the-flag-is-bleeding",
            title: "The Flag is Bleeding",
            year: 1967,
            description: "A confrontational narrative painting superimposing diverse figures behind a bleeding American flag, addressing systemic civil rights issues.",
            location: "National Gallery of Art, Washington, D.C.",
            artistId: "artist-faith-ringgold",
            movementId: "movement-black-arts-movement",
            imageUrl: "https://res.cloudinary.com/dzzwjwhfl/image/upload/v1779109060/The_Flag_is_Bleeding_Faith_Ringgold_ljskys.jpg"
        },
        {
            id: "artwork-stevens-duke-ellington",
            title: "Duke Ellington",
            year: 1973,
            description: "A graphic, brightly stylized celebration of the jazz icon, capturing the energetic musical rhythms of the era using flat, bold geometries.",
            location: "Private Collection",
            artistId: "artist-nelson-stevens",
            movementId: "movement-black-arts-movement",
            imageUrl: "https://res.cloudinary.com/dzzwjwhfl/image/upload/v1779109057/Duke_Ellington_Nelson_Stevens_rsb50i.webp"
        }
    ],
    "Byzantine Art" : [
        {
            id: "artwork-anonymous-enthroned-madonna",
            title: "The Enthroned Madonna and Child with Saints and Angels",
            year: 590,
            description: "An incredibly rare pre-iconoclastic encaustic icon depicting the Virgin Mary flanked by Saints Theodore and George.",
            location: "Saint Catherine's Monastery, Sinai, Egypt",
            artistId: "artist-anonymous-byzantine",
            movementId: "movement-byzantine-art",
            imageUrl: "https://res.cloudinary.com/dzzwjwhfl/image/upload/v1779109065/The_Enthroned_Madonna_and_Child_with_Saints_and_Angels_Anonymous_St._Catherine_s_Monastery_tka5ds.jpg"
        },
        {
            id: "artwork-anonymous-christ-pantocrator",
            title: "Christ Pantocrator",
            year: 1261,
            description: "A deesis mosaic panel highlighting emotional realism, masterful shading, and gold glass tesserae that define Late Byzantine monumental art.",
            location: "Hagia Sophia, Istanbul, Turkey",
            artistId: "artist-anonymous-byzantine",
            movementId: "movement-byzantine-art",
            imageUrl: "https://res.cloudinary.com/dzzwjwhfl/image/upload/v1779109065/Christ_Pantocrator_Anonymous_Hagia_Sophia_Mosaics_htoqlm.jpg"
        },
        {
            id: "artwork-anonymous-vladimir-virgin",
            title: "The Vladimir Virgin",
            year: 1131,
            description: "A highly revered Eleusa (tenderness) icon displaying intimate maternal affection, which set a massive stylistic standard for Eastern Orthodox imagery.",
            location: "State Tretyakov Gallery, Moscow, Russia",
            artistId: "artist-anonymous-byzantine",
            movementId: "movement-byzantine-art",
            imageUrl: "https://res.cloudinary.com/dzzwjwhfl/image/upload/v1779109064/The_Vladimir_Virgin_Anonymous_Icon_Painter_acj3a0.jpg"
        },
        {
            id: "artwork-anonymous-angel-golden-hair",
            title: "Angel with Golden Hair",
            year: 1200,
            description: "A classic icon portrait from the Novgorod School featuring heavy linear contours and hair painted with thin strands of real gold leaf.",
            location: "State Russian Museum, St. Petersburg, Russia",
            artistId: "artist-anonymous-byzantine",
            movementId: "movement-byzantine-art",
            imageUrl: "https://res.cloudinary.com/dzzwjwhfl/image/upload/v1779109061/Angel_with_Golden_Hair_Anonymous_Novgorod_School_jvrt2c.jpg"
        } 
    ],
    "Contemporary African-Diasporic Art" : [
        {
            id: "artwork-marshall-school-beauty",
            title: "School of Beauty, School of Culture",
            year: 2012,
            description: "A monumental painting celebrating Black culture and beauty spaces while challenging Western art history conventions through an anamorphic center image.",
            location: "Birmingham Museum of Art, Alabama",
            artistId: "artist-kerry-james-marshall",
            movementId: "movement-contemporary-african-diasporic",
            imageUrl: "https://res.cloudinary.com/dzzwjwhfl/image/upload/v1779109075/The_School_of_Beauty_School_of_Culture_Kerry_James_Marshall_nuvlpd.png"
        },
        {
            id: "artwork-viktor-materia-prima",
            title: "Materia Prima",
            year: 2016,
            description: "A commanding portrait featuring the artist encapsulated in intricate pattern work of 24-karat gold leaf, exploring sovereignty and cosmic darkness.",
            location: "Private Collection",
            artistId: "artist-lina-iris-viktor",
            movementId: "movement-contemporary-african-diasporic",
            imageUrl: "https://res.cloudinary.com/dzzwjwhfl/image/upload/v1779109066/Materia_Prima_Lina_Iris_Viktor_wpchgy.webp"
        },
        {
            id: "artwork-odutola-countervailing-theory",
            title: "A Countervailing Theory",
            year: 2020,
            description: "An epic narrative series executed in charcoal, pastel, and chalk, detailing a mythic, prehistoric civilization ruled by a warrior clan.",
            location: "Barbican Centre, London",
            artistId: "artist-toyin-ojih-odutola",
            movementId: "movement-contemporary-african-diasporic",
            imageUrl: "https://res.cloudinary.com/dzzwjwhfl/image/upload/v1779109066/A_Countervailing_Theory_Toyin_Ojih_Odutola_t21qfy.jpg"
        },
        {
            id: "artwork-viktor-eleventh",
            title: "Eleventh",
            year: 2018,
            description: "Part of the 'Dark Continent' series, using a restricted palette of black, white, and gold to investigate the visual complexities of light and texture.",
            location: "Private Collection",
            artistId: "artist-lina-iris-viktor",
            movementId: "movement-contemporary-african-diasporic",
            imageUrl: "https://res.cloudinary.com/dzzwjwhfl/image/upload/v1779109065/Eleventh_-_Lina_Iris_Viktor_fv42ms.webp"
        }
    ],
    "Cubism" : [
        {
            id: "artwork-leger-the-city",
            title: "The City",
            year: 1919,
            description: "A monumental canvas capturing the rhythm of modern urban life through mechanical, geometric forms and flat planes of bold color.",
            location: "Philadelphia Museum of Art, Philadelphia",
            artistId: "artist-fernand-leger",
            movementId: "movement-cubism",
            imageUrl: "https://res.cloudinary.com/dzzwjwhfl/image/upload/v1779109071/The_City_Fernand_L%C3%A9ger_cdw0gh.jpg"
        },
        {
            id: "artwork-braque-the-portuguese",
            title: "The Portuguese",
            year: 1911,
            description: "A fundamental work of Analytical Cubism that deconstructs a guitar player and introduces stenciled letters into fine art canvas composition.",
            location: "Kunstmuseum Basel, Switzerland",
            artistId: "artist-georges-braque",
            movementId: "movement-cubism",
            imageUrl: "https://res.cloudinary.com/dzzwjwhfl/image/upload/v1779109070/The_Portuguese_Georges_Braque_hvkkmy.jpg"
        },
        {
            id: "artwork-picasso-les-demoiselles",
            title: "Les Demoiselles d'Avignon",
            year: 1907,
            description: "A proto-Cubist masterpiece depicting five figures with fractured geometries and forms influenced heavily by African tribal masks.",
            location: "Museum of Modern Art, New York",
            artistId: "artist-pablo-picasso",
            movementId: "movement-cubism",
            imageUrl: "https://res.cloudinary.com/dzzwjwhfl/image/upload/v1779109069/Les_Demoiselles_d_Avignon_Pablo_Picasso_xy0tbk.jpg"
        }
    ],
    "Early Renaissance" : [
        {
            id: "artwork-masaccio-holy-trinity",
            title: "The Holy Trinity",
            year: 1427,
            description: "A revolutionary fresco renowned for its pioneering application of strict one-point linear perspective inside an architectural illusion.",
            location: "Santa Maria Novella, Florence",
            artistId: "artist-masaccio",
            movementId: "movement-early-renaissance",
            imageUrl: "https://res.cloudinary.com/dzzwjwhfl/image/upload/v1779109078/The_Holy_Trinity_Masaccio_dw2vfa.jpg"
        },
        {
            id: "artwork-uccello-battle-san-romano",
            title: "The Battle of San Romano",
            year: 1438,
            description: "A dynamically packed canvas showcasing linear perspective experiments with fallen armor and weapons functioning as grids on the ground plane.",
            location: "National Gallery, London",
            artistId: "artist-paolo-uccello",
            movementId: "movement-early-renaissance",
            imageUrl: "https://res.cloudinary.com/dzzwjwhfl/image/upload/v1779109076/The_Battle_of_San_Romano_Paolo_Uccello_qj3uon.jpg"
        },
        {
            id: "artwork-fra-angelico-annunciation",
            title: "The Annunciation",
            year: 1440,
            description: "A serene and contemplative fresco painted directly onto a monastery wall, focusing on devotional simplicity and delicate morning light.",
            location: "Museo di San Marco, Florence",
            artistId: "artist-fra-angelico",
            movementId: "movement-early-renaissance",
            imageUrl: "https://res.cloudinary.com/dzzwjwhfl/image/upload/v1779109075/The_Annunciation_Fra_Angelico_txwpkq.jpg"
        },
        {
            id: "artwork-botticelli-primavera",
            title: "Primavera",
            year: 1482,
            description: "A massive, intricate mythological allegory celebrating spring and fertility through elegant, rhythmic linework and classical figures.",
            location: "Uffizi Gallery, Florence",
            artistId: "artist-sandro-botticelli",
            movementId: "movement-early-renaissance",
            imageUrl: "https://res.cloudinary.com/dzzwjwhfl/image/upload/v1779109073/Primavera_Sandro_Botticelli_fbopve.jpg"
        } 
    ],
    "Expressionism" : [
        {
            id: "artwork-kirchner-self-portrait-soldier",
            title: "Self-Portrait as a Soldier",
            year: 1915,
            description: "A psychological masterwork from 'Die Brücke' depicting the artist with a severed hand, symbolizing the trauma of World War I.",
            location: "Allen Memorial Art Museum, Oberlin",
            artistId: "artist-ernst-ludwig-kirchner",
            movementId: "movement-expressionism",
            imageUrl: "https://res.cloudinary.com/dzzwjwhfl/image/upload/v1779109077/Self-Portrait_as_a_Soldier_Ernst_Ludwig_Kirchner_nlyv9v.jpg"
        },
        {
            id: "artwork-schiele-self-portrait-physalis",
            title: "Self-Portrait with Physalis",
            year: 1912,
            description: "An intense, emotionally exposed portrait marked by sharp angles, gaunt lines, and a fragile yet defiant gaze typical of Austrian Expressionism.",
            location: "Leopold Museum, Vienna",
            artistId: "artist-egon-schiele",
            movementId: "movement-expressionism",
            imageUrl: "https://res.cloudinary.com/dzzwjwhfl/image/upload/v1779109114/Self-Portrait_with_Physalis_Egon_Schiele_onbye2.jpg"
        },
        {
            id: "artwork-marc-fate-animals",
            title: "The Fate of the Animals",
            year: 1913,
            description: "A chaotic, premonitory canvas from 'Der Blaue Reiter' utilizing jagged geometries to depict forest animals caught in an apocalyptic firestorm.",
            location: "Kunstmuseum Basel, Switzerland",
            artistId: "artist-franz-marc",
            movementId: "movement-expressionism",
            imageUrl: "https://res.cloudinary.com/dzzwjwhfl/image/upload/v1779109079/The_Fate_of_the_Animals_Franz_Marc_xa1pyi.jpg"
        },
        {
            id: "artwork-rouault-the-old-king",
            title: "The Old King",
            year: 1937,
            description: "A brooding portrait characterized by heavy, stained-glass-like black contours that encase dense, jewel-toned applications of oil paint.",
            location: "Carnegie Museum of Art, Pittsburgh",
            artistId: "artist-georges-rouault",
            movementId: "movement-expressionism",
            imageUrl: "https://res.cloudinary.com/dzzwjwhfl/image/upload/v1779109082/The_Old_King_Georges_Rouault_mertot.jpg"
        }
    ],
    "High Renaissance" : [
        {
            id: "artwork-vinci-sainte-anne",
            title: "The Virgin and Child with Saint Anne",
            year: 1503,
            description: "An oil painting featuring three generations of Christ's family structured in a perfect geometric pyramid, utilizing soft sfumato atmospheric modeling.",
            location: "Musée du Louvre, Paris",
            artistId: "artist-leonardo-da-vinci",
            movementId: "movement-high-renaissance",
            imageUrl: "https://res.cloudinary.com/dzzwjwhfl/image/upload/v1779109082/Sainte_Anne_Leonardo_Leonardo_da_Vinci_h6jtfo.jpg"
        },
        {
            id: "artwork-raphael-sistine-madonna",
            title: "The Sistine Madonna",
            year: 1512,
            description: "An iconic altarpiece displaying harmonious balance, heavenly clouds, and the famous resting cherubs at the base of the frame.",
            location: "Gemäldegalerie Alte Meister, Dresden",
            artistId: "artist-raphael",
            movementId: "movement-high-renaissance",
            imageUrl: "https://res.cloudinary.com/dzzwjwhfl/image/upload/v1779109013/The_Sistine_Madonna_Raphael_hyofvi.jpg"
        },
        {
            id: "artwork-titian-pastoral-concert",
            title: "The Pastoral Concert",
            year: 1509,
            description: "An idyllic, atmospheric canvas celebrating Venitian colorito, poetry, and music within a lush landscape setting.",
            location: "Musée du Louvre, Paris",
            artistId: "artist-titian",
            movementId: "movement-high-renaissance",
            imageUrl: "https://res.cloudinary.com/dzzwjwhfl/image/upload/v1779109012/The_Pastoral_Concert_Titian_rum0fi.jpg"
        },
        {
            id: "artwork-michelangelo-creation-adam",
            title: "The Creation of Adam",
            year: 1512,
            description: "A cornerstone fresco panel from the Sistine Chapel ceiling depicting the spark of life passing via barely touching fingers.",
            location: "Sistine Chapel, Vatican City",
            artistId: "artist-michelangelo",
            movementId: "movement-high-renaissance",
            imageUrl: "https://res.cloudinary.com/dzzwjwhfl/image/upload/v1779109009/The_Creation_of_Adam_Michelangelo_jb9bsi.jpg"
        }
    ],
    "Impressionism" : [
        {
            id: "artwork-degas-dance-class",
            title: "The Dance Class",
            year: 1774,
            description: "An asymmetrical composition capturing a candid ballet rehearsal under the watchful eye of master Jules Perrot.",
            location: "Musée d'Orsay, Paris",
            artistId: "artist-edgar-degas",
            movementId: "movement-impressionism",
            imageUrl: "https://res.cloudinary.com/dzzwjwhfl/image/upload/v1779109021/The_Dance_Class_Edgar_Degas_kjnxe6.jpg"
        },
        {
            id: "artwork-renoir-luncheon-boating-party",
            title: "Luncheon of the Boating Party",
            year: 1881,
            description: "A joyful composition celebrating leisure life along the Seine, combining still-life elements, portraiture, and changing outdoor light.",
            location: "The Phillips Collection, Washington, D.C.",
            artistId: "artist-pierre-auguste-renoir",
            movementId: "movement-impressionism",
            imageUrl: "https://res.cloudinary.com/dzzwjwhfl/image/upload/v1779109012/Luncheon_of_the_Boating_Party_Pierre-Auguste_Renoir_lky7yh.jpg"
        },
        {
            id: "artwork-caillebotte-paris-street-rainy-day",
            title: "Paris Street; Rainy Day",
            year: 1877,
            description: "A grand, sweeping view of Haussmann's rebuilt Paris streets, marked by its unique photographic composition and clear, wet reflections.",
            location: "Art Institute of Chicago, Chicago",
            artistId: "artist-gustave-caillebotte",
            movementId: "movement-impressionism",
            imageUrl: "https://res.cloudinary.com/dzzwjwhfl/image/upload/v1779109013/Paris_Street_Rainy_Day_Gustave_Caillebotte_mvmzul.jpg"
        },
        {
            id: "artwork-cassatt-childs-bath",
            title: "The Child's Bath",
            year: 1893,
            description: "An intimate domestic portrait featuring sharp overhead perspectives and striped dress patterns inspired by Japanese ukiyo-e woodblock prints.",
            location: "Art Institute of Chicago, Chicago",
            artistId: "artist-mary-cassatt",
            movementId: "movement-impressionism",
            imageUrl: "https://res.cloudinary.com/dzzwjwhfl/image/upload/v1779109016/The_Child_s_Bath_Mary_Cassatt_ig5wbm.jpg"
        }
    ],
    "Mannerism" : [
        {
            id: "artwork-elgreco-immaculate-conception",
            title: "The Immaculate Conception",
            year: 1613,
            description: "A late visionary painting showing radical figures stretched thin, flashing celestial colors, and floating through ecstatically swirling heavens.",
            location: "Museum of Santa Cruz, Toledo, Spain",
            artistId: "artist-el-greco",
            movementId: "movement-mannerism",
            imageUrl: "https://res.cloudinary.com/dzzwjwhfl/image/upload/v1779109038/The_Immaculate_Conception_-_El_Greco_tcih1y.jpg"
        },
        {
            id: "artwork-parmigianino-madonna-long-neck",
            title: "The Madonna with the Long Neck",
            year: 1535,
            description: "An archetypal Mannerist canvas displaying exaggerated anatomical proportions and a highly unusual, destabilized spatial setup.",
            location: "Uffizi Gallery, Florence",
            artistId: "artist-parmigianino",
            movementId: "movement-mannerism",
            imageUrl: "https://res.cloudinary.com/dzzwjwhfl/image/upload/v1779109036/The_Madonna_with_the_Long_Neck_Parmigianino_dey20l.jpg"
        },
        {
            id: "artwork-pontormo-carmignano-visitation",
            title: "Carmignano Visitation",
            year: 1528,
            description: "An eerie, sculptural altarpiece where four women float in abstract space, dressed in intensely luminous, shifting fabric layers.",
            location: "Propositura di San Michele Arcangelo, Carmignano, Italy",
            artistId: "artist-jacopo-da-pontormo",
            movementId: "movement-mannerism",
            imageUrl: "https://res.cloudinary.com/dzzwjwhfl/image/upload/v1779109029/Carmignano_Visitation_Jacopo_da_Pontormo_qzd87c.jpg"
        },
        {
            id: "artwork-tintoretto-the-last-supper",
            title: "The Last Supper",
            year: 1594,
            description: "A dynamic, deep perspective composition that replaces standard frontal setups with a diagonal table surrounded by glowing smoke spirits.",
            location: "Basilica di San Giorgio Maggiore, Venice",
            artistId: "artist-tintoretto",
            movementId: "movement-mannerism",
            imageUrl: "https://res.cloudinary.com/dzzwjwhfl/image/upload/v1779109028/The_Last_Supper_Tintoretto_tnmm4q.jpg"
        }
    ],
    "Muralism" : [
        {
            id: "artwork-carrington-meal-lord-candlestick",
            title: "The Meal of Lord Candlestick",
            year: 1938,
            description: "A surreal, narrative painting critiquing patriarchal authority through a satirical and dreamlike banqueting table scene.",
            location: "Private Collection",
            artistId: "artist-leonora-carrington",
            movementId: "movement-muralism",
            imageUrl: "https://res.cloudinary.com/dzzwjwhfl/image/upload/v1779109048/The_Meal_of_Lord_Candlestick_-_Leonora_Carrington_nsdfei.jpg"
        },
        {
            id: "artwork-rivera-man-crossroads",
            title: "Man at the Crossroads",
            year: 1933,
            description: "A famous, highly controversial social-political mural contrasting capitalistic structures with socialist ideals at the center of modern science.",
            location: "Palacio de Bellas Artes, Mexico City (Reconstruction)",
            artistId: "artist-diego-rivera",
            movementId: "movement-muralism",
            imageUrl: "https://res.cloudinary.com/dzzwjwhfl/image/upload/v1779109047/Man_at_the_Crossroads_Diego_Rivera_ll191j.jpg"
        },
        {
            id: "artwork-orozco-the-trench",
            title: "The Trench",
            year: 1926,
            description: "An emotionally heavy fresco featuring structural shapes of soldiers forming a cross, conveying the immense tragedy of the Mexican Revolution.",
            location: "San Ildefonso College, Mexico City",
            artistId: "artist-jose-clemente-orozco",
            movementId: "movement-muralism",
            imageUrl: "https://res.cloudinary.com/dzzwjwhfl/image/upload/v1779109048/The_Trench_Jos%C3%A9_Clemente_Orozco_auelxv.jpg"
        },
        {
            id: "artwork-siqueiros-march-humanity",
            title: "The March of Humanity",
            year: 1971,
            description: "The largest mural ever created, covering an entire eco-cultural forum with highly expressive, sculptural three-dimensional figures.",
            location: "Polyforum Cultural Siqueiros, Mexico City",
            artistId: "artist-david-alfaro-siqueiros",
            movementId: "movement-muralism",
            imageUrl: "https://res.cloudinary.com/dzzwjwhfl/image/upload/v1779109043/The_March_of_Humanity_David_Alfaro_Siqueiros_z3wvrw.jpg"
        }   
    ],
    "Neo-Expressionism" : [
        {
            id: "artwork-basquiat-untitled-boxer",
            title: "Untitled (Boxer)",
            year: 1982,
            description: "A raw, powerful depiction of a Black boxer raising his fists, utilizing aggressive graffiti marks, structural brushwork, and text overlays.",
            location: "Private Collection",
            artistId: "artist-jean-michel-basquiat",
            movementId: "movement-neo-expressionism",
            imageUrl: "https://res.cloudinary.com/dzzwjwhfl/image/upload/v1779109104/Untitled_Boxer_Jean-Michel_Basquiat_ss6fwf.jpg"
        },
        {
            id: "artwork-kiefer-orders-night",
            title: "The Orders of the Night",
            year: 1997,
            description: "A dark, heavily textured canvas featuring the artist lying below a vast, thick field of dried black sunflowers, exploring collective historical memory.",
            location: "Seattle Art Museum, Seattle",
            artistId: "artist-anselm-kiefer",
            movementId: "movement-neo-expressionism",
            imageUrl: "https://res.cloudinary.com/dzzwjwhfl/image/upload/v1779109057/The_Orders_of_the_Night_Anselm_Kiefer_cwpng1.png"
        },
        {
            id: "artwork-baselitz-night-with-marie",
            title: "The Night with Marie",
            year: 1993,
            description: "An expressive canvas featuring inverted figures painted upside-down, forcing the viewer to engage with pure painterly form rather than literal subjects.",
            location: "Private Collection",
            artistId: "artist-georg-baselitz",
            movementId: "movement-neo-expressionism",
            imageUrl: "https://res.cloudinary.com/dzzwjwhfl/image/upload/v1779109055/The_Night_with_Marie_Georg_Baselitz_cdmt8j.png"
        },
        {
            id: "artwork-salle-calm-down-diary",
            title: "Calm down in a diary",
            year: 1982,
            description: "A complex post-modern pastiche canvas that layers disparate imagery, sketches, and objects to create an enigmatic psychological narrative.",
            location: "Private Collection",
            artistId: "artist-david-salle",
            movementId: "movement-neo-expressionism",
            imageUrl: "https://res.cloudinary.com/dzzwjwhfl/image/upload/v1779109052/Calm_down_in_a_diary_David_Salle_odsas5.jpg"
        }
    ],
    "Neoplasticism" : [
        {
            id: "artwork-leck-composition",
            title: "Composition",
            year: 1918,
            description: "A precise De Stijl abstract painting that reduces daily subjects into broken bars of pure primary colors resting on a flat white background.",
            location: "Kröller-Müller Museum, Otterlo",
            artistId: "artist-bart-van-der-leck",
            movementId: "movement-neoplasticism",
            imageUrl: "https://res.cloudinary.com/dzzwjwhfl/image/upload/v1779109057/Composition_Bart_van_der_Leck_g1w7lg.jpg"
        },
        {
            id: "artwork-huszar-simultaneous-composition",
            title: "Simultaneous Composition",
            year: 1917,
            description: "An early structural canvas testing interconnected, rectangular color fields to form a unified spatial harmony without a central focal point.",
            location: "Gemeentemuseum Den Haag, The Hague",
            artistId: "artist-vilmos-huszar",
            movementId: "movement-neoplasticism",
            imageUrl: "https://res.cloudinary.com/dzzwjwhfl/image/upload/v1779109056/Simultaneous_Composition_Vilmos_Husz%C3%A1r_qabny6.jpg"
        },
        {
            id: "artwork-mondrian-composition-red-blue-yellow",
            title: "Composition with Red, Blue and Yellow",
            year: 1930,
            description: "An absolute masterwork of Neoplasticism balance, limiting its vocabulary to thick black gridlines and primary color squares.",
            location: "Kunsthaus Zürich, Switzerland",
            artistId: "artist-piet-mondrian",
            movementId: "movement-neoplasticism",
            imageUrl: "https://res.cloudinary.com/dzzwjwhfl/image/upload/v1779109056/Composition_with_Red_Blue_and_Yellow_Piet_Mondrian_frqddc.jpg"
        },
        {
            id: "artwork-doesburg-composition-vii",
            title: "Composition VII (The Three Graces)",
            year: 1917,
            description: "An early De Stijl structural framework exploring spatial relationships through repeating patterns of clean, overlapping rectangle blocks.",
            location: "Kemper Art Museum, St. Louis",
            artistId: "artist-theo-van-doesburg",
            movementId: "movement-neoplasticism",
            imageUrl: "https://res.cloudinary.com/dzzwjwhfl/image/upload/v1779109055/Composition_VII_Theo_van_Doesburg_ndr0tj.jpg"
        }
    ],
    "Nigerian Modernism" : [
        {
            id: "artwork-grillo-drummers-return",
            title: "Drummers Return",
            year: 1990,
            description: "A stylized, geometric modern canvas capturing the rich musical traditions of Yoruba culture, utilizing signature shades of blue and violet.",
            location: "Yemisi Shyllon Museum of Art, Lagos",
            artistId: "artist-yusuf-grillo",
            movementId: "movement-nigerian-modernism",
            imageUrl: "https://res.cloudinary.com/dzzwjwhfl/image/upload/v1779109078/Drummers_Return_Yusuf_Grillo_yne3z7.png"
        },
        {
            id: "artwork-enwonwu-yoruba-women-cassava",
            title: "Yoruba Women Pounding Cassava",
            year: 1956,
            description: "A dynamic canvas that celebrates traditional daily labor, blending West African cultural subjects with European modernist fluid linework.",
            location: "Private Collection",
            artistId: "artist-ben-enwonwu",
            movementId: "movement-nigerian-modernism",
            imageUrl: "https://res.cloudinary.com/dzzwjwhfl/image/upload/v1779109060/Yoruba_women_pounding_cassava_Ben_Enwonwu_pm7zvi.webp"
        },
        {
            id: "artwork-egonu-the-station",
            title: "The Station",
            year: 1968,
            description: "A graphic, structural depiction of transit spaces that fuses geometric cubist abstraction with traditional Igbo aesthetic forms.",
            location: "Tate Modern, London",
            artistId: "artist-uzo-egonu",
            movementId: "movement-nigerian-modernism",
            imageUrl: "https://res.cloudinary.com/dzzwjwhfl/image/upload/v1779109059/The_Station_Uzo_Egonu_xaemun.jpg"
        },
        {
            id: "artwork-ogundele-couple",
            title: "Couple",
            year: 1978,
            description: "An expressive, heavy-linework composition developed under the Oshogbo Art School movement, referencing mythic figures and native folklore.",
            location: "Private Collection",
            artistId: "artist-rufus-ogundele",
            movementId: "movement-nigerian-modernism",
            imageUrl: "https://res.cloudinary.com/dzzwjwhfl/image/upload/v1779109059/Couple_Rufus_Ogundele_qdtxrg.webp"
        }
    ],
    "Northern Renaissance" : [
        {
            id: "artwork-weyden-descent-cross",
            title: "The Descent from the Cross",
            year: 1435,
            description: "A monumental altarpiece notable for its intense emotional realism and a unique, tightly packed sculptural layout that mimics a wooden shrine box.",
            location: "Museo del Prado, Madrid",
            artistId: "artist-rogier-van-der-weyden",
            movementId: "movement-northern-renaissance",
            imageUrl: "https://res.cloudinary.com/dzzwjwhfl/image/upload/v1779109064/The_Descent_from_the_Cross_Rogier_van_der_Weyden_z6l93p.jpg"
        },
        {
            id: "artwork-holbein-the-ambassadors",
            title: "The Ambassadors",
            year: 1533,
            description: "A highly detailed double portrait featuring micro-realistic scientific tools and a famous distorted, anamorphic skull across the foreground floor.",
            location: "National Gallery, London",
            artistId: "artist-hans-holbein-the-younger",
            movementId: "movement-northern-renaissance",
            imageUrl: "https://res.cloudinary.com/dzzwjwhfl/image/upload/v1779109062/The_Ambassadors_Hans_Holbein_the_Younger_fxuebd.jpg"
        },
        {
            id: "artwork-bruegel-procession-calvary",
            title: "The Procession to Calvary",
            year: 1564,
            description: "A sprawling, panoramic landscape where the biblical story is placed inside a busy, contemporary Flemish marketplace crowd.",
            location: "Kunsthistorisches Museum, Vienna",
            artistId: "artist-pieter-bruegel-the-elder",
            movementId: "movement-northern-renaissance",
            imageUrl: "https://res.cloudinary.com/dzzwjwhfl/image/upload/v1779109064/The_procession_to_calvary_Pieter_Bruegel_the_Elder_hfxldm.jpg"
        },
        {
            id: "artwork-durer-feast-rosary",
            title: "Feast of the Rosary",
            year: 1506,
            description: "An intricate oil masterpiece blending detailed German linear draftsmanship with rich Venetian color sensibilities.",
            location: "National Gallery, Prague",
            artistId: "artist-albrecht-durer",
            movementId: "movement-northern-renaissance",
            imageUrl: "https://res.cloudinary.com/dzzwjwhfl/image/upload/v1779109062/Feast_of_the_rosary_Albrecht_D%C3%BCrer_dfoeno.jpg"
        } 
    ],
    "Pop Art" : [
        {
            id: "artwork-wesselmann-smoker-1",
            title: "Smoker 1 (Mouth 1)",
            year: 1967,
            description: "A massive, hyper-focused billboard-style cutout canvas exploring commercialized sexuality, glamour, and industrial advertising aesthetics.",
            location: "Private Collection",
            artistId: "artist-tom-wesselmann",
            movementId: "movement-pop-art",
            imageUrl: "https://res.cloudinary.com/dzzwjwhfl/image/upload/v1779109068/Smoker_1_Mouth_1_Tom_Wesselmann_xrxjtv.jpg"
        },
        {
            id: "artwork-warhol-campbell-soup-cans",
            title: "Campbell's Soup Cans",
            year: 1662,
            description: "A series of thirty-two canvas panels produced using semi-mechanized screen-printing to challenge traditional concepts of artistic originality.",
            location: "Museum of Modern Art, New York",
            artistId: "artist-andy-warhol",
            movementId: "movement-pop-art",
            imageUrl: "https://res.cloudinary.com/dzzwjwhfl/image/upload/v1779109067/Campbell_s_Soup_Cans_Andy_Warhol_sblhmn.jpg"
        },
        {
            id: "artwork-hamilton-homes-so-different",
            title: "Just what is it that makes today's homes so different, so appealing?",
            year: 1956,
            description: "A landmark British pop collage made from magazine clippings, satirizing post-war American consumer culture and domestic gadgetry.",
            location: "Kunsthalle Tübingen, Germany",
            artistId: "artist-richard-hamilton",
            movementId: "movement-pop-art",
            imageUrl: "https://res.cloudinary.com/dzzwjwhfl/image/upload/v1779109067/Just_what_is_it_that_makes_today_s_homes_so_different_so_appealing_Richard_Hamilton_oawvcf.webp"
        },
        {
            id: "artwork-rosenquist-love-you-ford",
            title: "I Love You with My Ford",
            year: 1961,
            description: "A surreal, large-scale collage painting juxtaposing an automobile grill, a couple, and a layer of canned spaghetti in a billboard layout.",
            location: "Moderna Museet, Stockholm",
            artistId: "artist-james-rosenquist",
            movementId: "movement-pop-art",
            imageUrl: "https://res.cloudinary.com/dzzwjwhfl/image/upload/v1779109067/I_Love_You_with_My_Ford_James_Rosenquist_jiuq4b.jpg"
        }
    ],
    "Post-Impressionism" : [
        {
            id: "artwork-cezanne-card-players",
            title: "The Card Players",
            year: 1892,
            description: "A monumental genre study reducing French peasants into geometric, block-like structures to build spatial stability on canvas.",
            location: "Musée d'Orsay, Paris",
            artistId: "artist-paul-cezanne",
            movementId: "movement-post-impressionism",
            imageUrl: "https://res.cloudinary.com/dzzwjwhfl/image/upload/v1779109071/The_Card_Players_Paul_C%C3%A9zanne_dcol5c.jpg"
        },
        {
            id: "artwork-gogh-skeleton-cigarette",
            title: "Head of a Skeleton with a Burning Cigarette",
            year: 1886,
            description: "A dark, satirical student work featuring heavy impasto brushstrokes, serving as a humorous critique of academic anatomical paintings.",
            location: "Van Gogh Museum, Amsterdam",
            artistId: "artist-vincent-van-gogh",
            movementId: "movement-post-impressionism",
            imageUrl: "https://res.cloudinary.com/dzzwjwhfl/image/upload/v1779109070/Head_of_a_Skeleton_with_a_Burning_Cigarette_Vincent_van_Gogh_cwrfyj.jpg"
        },
        {
            id: "artwork-toulouse-lautrec-moulin-rouge",
            title: "At the Moulin Rouge",
            year: 1892,
            description: "A striking interior portrait capturing Parisian nightlife nightlife with unusual green lighting tones and a deep photographic composition.",
            location: "Art Institute of Chicago, Chicago",
            artistId: "artist-henri-de-toulouse-lautrec",
            movementId: "movement-post-impressionism",
            imageUrl: "https://res.cloudinary.com/dzzwjwhfl/image/upload/v1779109069/At_the_Moulin_Rouge_Henri_de_Toulouse-Lautrec_xkd0uv.jpg"
        }
    ],
    "Primitivism" : [
        {
            id: "artwork-rousseau-the-dream",
            title: "The Dream",
            year: 1910,
            description: "A large-scale, surreal jungle landscape populated by stylized, flat foliage and exotic beasts, viewed from an outsider-art lens.",
            location: "Museum of Modern Art, New York",
            artistId: "artist-henri-rousseau",
            movementId: "movement-primitivism",
            imageUrl: "https://res.cloudinary.com/dzzwjwhfl/image/upload/v1779109076/The_Dream_Henri_Rousseau_th879s.jpg"
        },
        {
            id: "artwork-gauguin-yellow-christ",
            title: "The Yellow Christ",
            year: 1889,
            description: "A cornerstone piece of Synthetism reducing the crucifix scene into flat planes of bold, non-naturalistic yellow and orange colors.",
            location: "Albright-Knox Art Gallery, Buffalo",
            artistId: "artist-paul-gauguin",
            movementId: "movement-primitivism",
            imageUrl: "https://res.cloudinary.com/dzzwjwhfl/image/upload/v1779109078/The_Yellow_Christ_Paul_Gauguin_erk9tj.jpg"
        },
        {
            id: "artwork-matisse-dance",
            title: "Dance",
            year: 1910,
            description: "A monumental canvas displaying five expressive figures dancing in a circle against simplified, intense fields of green, blue, and red.",
            location: "Hermitage Museum, St. Petersburg",
            artistId: "artist-henri-matisse",
            movementId: "movement-primitivism",
            imageUrl: "https://res.cloudinary.com/dzzwjwhfl/image/upload/v1779109073/Dance_Henri_Matisse_utir5j.jpg"
        },
        {
            id: "artwork-modigliani-blaise-cendrars",
            title: "Portrait of Blaise Cendrars",
            year: 1917,
            description: "An elongated modern portrait showing mask-like simplified features, inspired directly by traditional African tribal carving design rules.",
            location: "Galleria Nazionale d'Arte Moderna, Rome",
            artistId: "artist-amedeo-modigliani",
            movementId: "movement-primitivism",
            imageUrl: "https://res.cloudinary.com/dzzwjwhfl/image/upload/v1779109075/Portrait_of_Blaise_Cendrars_-_Amedeo_Modigliani_qgszd7.jpg"
        }
    ],
    "Proto Renaissance" : [
        {
            id: "artwork-martini-frontispice-virgile",
            title: "Frontispiece to Virgil",
            year: 1340,
            description: "An elegant illuminated manuscript page merging late courtly Gothic line work with a new humanist desire for natural realism.",
            location: "Biblioteca Ambrosiana, Milan",
            artistId: "artist-simone-martini",
            movementId: "movement-proto-renaissance",
            imageUrl: "https://res.cloudinary.com/dzzwjwhfl/image/upload/v1779109081/Frontispice_du_Virgile_-_Simone_Martini_pnbvzc.jpg"
        },
        {
            id: "artwork-cimabue-ognissanti-madonna",
            title: "Ognissanti Madonna",
            year: 1280,
            description: "A monumental altarpiece testing spatial depth and true human volume while retaining standard, flat Byzantine gold backgrounds.",
            location: "Uffizi Gallery, Florence",
            artistId: "artist-cimabue",
            movementId: "movement-proto-renaissance",
            imageUrl: "https://res.cloudinary.com/dzzwjwhfl/image/upload/v1779109081/Ognissanti_Madonna_Cimabue_imwvdm.jpg"
        },
        {
            id: "artwork-giotto-flight-egypt",
            title: "The Flight into Egypt",
            year: 1305,
            description: "A groundbreaking fresco from the Scrovegni Chapel showing authentic human emotions, physical weight, and landscape depth instead of gold voids.",
            location: "Scrovegni Chapel, Padua",
            artistId: "artist-giotto-di-bondone",
            movementId: "movement-proto-renaissance",
            imageUrl: "https://res.cloudinary.com/dzzwjwhfl/image/upload/v1779109081/The_Flight_into_Egypt_Giotto_qnlyff.jpg"
        },
        {
            id: "artwork-lorenzetti-good-government-country",
            title: "Allegory of Good Government in the Countryside",
            year: 1338,
            description: "A monumental secular fresco panorama offering a highly detailed look at actual medieval agricultural work and topological landscape observation.",
            location: "Palazzo Pubblico, Siena",
            artistId: "artist-ambrogio-lorenzetti",
            movementId: "movement-proto-renaissance",
            imageUrl: "https://res.cloudinary.com/dzzwjwhfl/image/upload/v1779109078/Allegory_of_Good_Government_in_the_Country_Ambrogio_Lorenzetti_cgiomn.jpg"
        }
    ],
    "Realism" : [
        {
            id: "artwork-millet-the-angelus",
            title: "The Angelus",
            year: 1859,
            description: "A quiet, profound study of two field laborers bowing in prayer, illuminated by a soft, naturalistic twilight sky.",
            location: "Musée d'Orsay, Paris",
            artistId: "artist-jean-francois-millet",
            movementId: "movement-realism",
            imageUrl: "https://res.cloudinary.com/dzzwjwhfl/image/upload/v1779109083/The_Angelus_Jean-Fran%C3%A7ois_Millet_szmkfq.jpg"
        },
        {
            id: "artwork-eakins-street-scene-sevilla",
            title: "A Street Scene in Seville",
            year: 1870,
            description: "An authentic, observant look at daily life in Spain, showcasing the artist's focus on direct lighting truths without romantic polish.",
            location: "Philadelphia Museum of Art, Philadelphia",
            artistId: "artist-thomas-eakins",
            movementId: "movement-realism",
            imageUrl: "https://res.cloudinary.com/dzzwjwhfl/image/upload/v1779109081/A_street_scene_in_sevilla_-_Thomas_Eakins_xzfogl.jpg"
        },
        {
            id: "artwork-homer-breezing-up",
            title: "Breezing Up (A Fair Wind)",
            year: 1876,
            description: "An iconic American canvas capturing fishermen in an open catboat, marked by its dynamic layout and crisp, real wave reflections.",
            location: "National Gallery of Art, Washington, D.C.",
            artistId: "artist-winslow-homer",
            movementId: "movement-realism",
            imageUrl: "https://res.cloudinary.com/dzzwjwhfl/image/upload/v1779109082/Breezing_Up_A_Fair_Wind_Winslow_Homer_benejs.jpg"
        }
    ],
    "Romanticism" : [
        {
            id: "artwork-turner-slave-ship",
            title: "The Slave Ship",
            year: 1840,
            description: "A striking, atmospheric marine canvas utilizing dramatic, fiery ocean colors to deliver a fierce political critique against the horrific transatlantic slave trade.",
            location: "Museum of Fine Arts, Boston",
            artistId: "artist-william-turner",
            movementId: "movement-romanticism",
            imageUrl: "https://res.cloudinary.com/dzzwjwhfl/image/upload/v1779371051/The_Slave_Ship_William_Turner_wv1eto.jpg"
        },
        {
            id: "artwork-friedrich-wanderer-fog",
            title: "Wanderer above the Sea of Fog",
            year: 1818,
            description: "The definitive landscape icon of Romantic sublime, positioning a lone figure with his back turned against a vast, mist-shrouded mountain horizon.",
            location: "Kunsthalle Hamburg, Germany",
            artistId: "artist-caspar-david-friedrich",
            movementId: "movement-romanticism",
            imageUrl: "https://res.cloudinary.com/dzzwjwhfl/image/upload/v1779109083/Wanderer_above_the_Sea_of_Fog_Caspar_David_Friedrich_qwn10e.jpg"
        },
        {
            id: "artwork-delacroix-liberty-leading",
            title: "Liberty Leading the People",
            year: 1830,
            description: "A monumental, politically charged masterpiece historicizing the July Revolution, led by the allegorical female figure of Liberty holding the tricolor flag.",
            location: "Musée du Louvre, Paris",
            artistId: "artist-eugene-delacroix",
            movementId: "movement-romanticism",
            imageUrl: "https://res.cloudinary.com/dzzwjwhfl/image/upload/v1779109084/Liberty_Leading_the_People_Eug%C3%A8ne_Delacroix_rgfahe.jpg"
        },
        {
            id: "artwork-gericault-raft-medusa",
            title: "The Raft of the Medusa",
            year: 1819,
            description: "An emotionally intense, large-scale historical canvas rendering the grim, desperate survival struggle of shipwrecked sailors drifting at sea.",
            location: "Musée du Louvre, Paris",
            artistId: "artist-theodore-gericault",
            movementId: "movement-romanticism",
            imageUrl: "https://res.cloudinary.com/dzzwjwhfl/image/upload/v1779109083/The_Raft_of_the_Medusa_Th%C3%A9odore_G%C3%A9ricault_bglx78.jpg"
        }
    ],
    "Social Realism" : [
        {
            id: "artwork-hopper-nighthawks",
            title: "Nighthawks",
            year: 1942,
            description: "An iconic, cinematic depiction of a late-night diner that masterfully isolates its subjects to evoke urban loneliness and wartime alienation.",
            location: "Art Institute of Chicago, Chicago",
            artistId: "artist-edward-hopper",
            movementId: "movement-social-realism",
            imageUrl: "https://res.cloudinary.com/dzzwjwhfl/image/upload/v1779109085/Nighthawks_Edward_Hopper_xccpdb.jpg"
        },
        {
            id: "artwork-lawrence-migration-series",
            title: "The Migration Series",
            year: 1941,
            description: "A profound narrative multi-panel epic using flat tempera shapes to document the historic mass movement of African Americans to northern cities.",
            location: "MoMA, New York / The Phillips Collection, Washington, D.C.",
            artistId: "artist-jacob-lawrence",
            movementId: "movement-social-realism",
            imageUrl: "https://res.cloudinary.com/dzzwjwhfl/image/upload/v1779109085/The_Migration_Series_Jacob_Lawrence_jcs3lf.jpg"
        },
        {
            id: "artwork-wood-american-gothic",
            title: "American Gothic",
            year: 1930,
            description: "A highly celebrated Regionalist portrait of a somber farming duo standing rigidly before an unyielding white wooden farmhouse frame.",
            location: "Art Institute of Chicago, Chicago",
            artistId: "artist-grant-wood",
            movementId: "movement-social-realism",
            imageUrl: "https://res.cloudinary.com/dzzwjwhfl/image/upload/v1779109085/American_Gothic_Grant_Wood_tkoxj6.jpg"
        },
        {
            id: "artwork-shahn-sacco-vanzetti",
            title: "The Passion of Sacco and Vanzetti",
            year: 1932,
            description: "A striking political protest painting condemning the highly controversial execution of immigrant anarchists Nicolo Sacco and Bartolomeo Vanzetti.",
            location: "Whitney Museum of American Art, New York",
            artistId: "artist-ben-shahn",
            movementId: "movement-social-realism",
            imageUrl: "https://res.cloudinary.com/dzzwjwhfl/image/upload/v1779109085/The_Passion_of_Sacco_and_Vanzetti_Ben_Shahn_e2eg1o.jpg"
        }
    ],
    "Suprematism" : [
        {
            id: "artwork-kliun-geometric-composition",
            title: "Geometric Composition",
            year: 1917,
            description: "An absolute non-objective abstract canvas playing with overlapping geometric planes to test dynamic aerial float and structural weightlessness.",
            location: "State Tretyakov Gallery, Moscow",
            artistId: "artist-ivan-kliun",
            movementId: "movement-suprematism",
            imageUrl: "https://res.cloudinary.com/dzzwjwhfl/image/upload/v1779109087/Geometric_composition_Ivan_Kliun_y9mzpu.webp"
        },
        {
            id: "artwork-malevich-suprematist-composition",
            title: "Suprematist Composition",
            year: 1916,
            description: "A landmark geometric alignment mapping colored rectangles and tilted lines in empty white space to reach pure, unadorned feeling.",
            location: "Private Collection",
            artistId: "artist-kazimir-malevich",
            movementId: "movement-suprematism",
            imageUrl: "https://res.cloudinary.com/dzzwjwhfl/image/upload/v1779109086/Suprematist_composition_Kazimir_Malevich_kawyri.jpg"
        },
        {
            id: "artwork-rozanova-study-suprematist",
            title: "Study for a Suprematist Composition",
            year: 1917,
            description: "An inventive Russian avant-garde study experimenting with intersecting color bars to test energy flow across non-representational space.",
            location: "Regional Art Museum, Kostroma",
            artistId: "artist-olga-rozanova",
            movementId: "movement-suprematism",
            imageUrl: "https://res.cloudinary.com/dzzwjwhfl/image/upload/v1779109086/Study_for_a_Suprematist_Composition_Olga_Rozanova_pe6cpr.jpg"
        },
        {
            id: "artwork-lissitzky-beat-the-whites",
            title: "Beat the Whites with the Red Wedge",
            year: 1919,
            description: "A seminal, graphic propaganda poster using a sharp red triangle piercing a white circle to symbolize Bolshevik victory over opponents.",
            location: "Various Collection Prints",
            artistId: "artist-el-lissitzky",
            movementId: "movement-suprematism",
            imageUrl: "https://res.cloudinary.com/dzzwjwhfl/image/upload/v1779109085/Beat_the_Whites_with_the_Red_Wedge_El_Lissitzky_macpw5.jpg"
        }
    ],
    "Surrealism" : [
        {
            id: "artwork-ernst-temptation-anthony",
            title: "The Temptation of St. Anthony",
            year: 1945,
            description: "A disturbing, highly textured dreamscape showing a tormented saint attacked by grotesque, biomorphic monsters born from the subconscious.",
            location: "Lehmbruck Museum, Duisburg, Germany",
            artistId: "artist-max-ernst",
            movementId: "movement-surrealism",
            imageUrl: "https://res.cloudinary.com/dzzwjwhfl/image/upload/v1779109088/The_Temptation_of_St._Anthony_Max_Ernst_icq1hi.jpg"
        },
        {
            id: "artwork-kahlo-two-fridas",
            title: "The Two Fridas",
            year: 1939,
            description: "A powerful double self-portrait exploring dual heritage, raw emotional heartbreak, and internal identity via an exposed, shared blood vessel line.",
            location: "Museo de Arte Moderno, Mexico City",
            artistId: "artist-frida-kahlo",
            movementId: "movement-surrealism",
            imageUrl: "https://res.cloudinary.com/dzzwjwhfl/image/upload/v1779109087/The_Two_Fridas_Frida_Kahlo_u98cht.jpg"
        },
        {
            id: "artwork-chagall-i-and-village",
            title: "I and the Village",
            year: 1911,
            description: "A dreamlike fairy tale pastiche merging childhood memories of rural Russian folklore with cubistic, fluidly overlapping color rings.",
            location: "Museum of Modern Art, New York",
            artistId: "artist-marc-chagall",
            movementId: "movement-surrealism",
            imageUrl: "https://res.cloudinary.com/dzzwjwhfl/image/upload/v1779109087/I_and_the_Village_Marc_Chagall_pvi9en.jpg"
        },
        {
            id: "artwork-magritte-menaced-assassin",
            title: "The Menaced Assassin",
            year: 1927,
            description: "An enigmatic, theatrical mystery scene staging bowler-hatted observers tracking a crime, standardizing the artist's signature deadpan surrealism.",
            location: "Museum of Modern Art, New York",
            artistId: "artist-rene-magritte",
            movementId: "movement-surrealism",
            imageUrl: "https://res.cloudinary.com/dzzwjwhfl/image/upload/v1779109086/The_Menaced_Assassin_Ren%C3%A9_Magritte_ehkclj.jpg"
        }
    ],
    "Symbolism" : [
        {
            id: "artwork-redon-eye-balloon",
            title: "The Eye Like a Strange Balloon Mounts Toward Infinity",
            year: 1882,
            description: "A haunting lithograph depicting a massive, singular eye balloon floating upward, dedicated to Edgar Allan Poe's psychological visions.",
            location: "Museum of Modern Art, New York",
            artistId: "artist-odilon-redon",
            movementId: "movement-symbolism",
            imageUrl: "https://res.cloudinary.com/dzzwjwhfl/image/upload/v1779109087/The_Eye_Like_a_Strange_Balloon_Mounts_Toward_Infinity_Odilon_Redon_buxjhy.jpg"
        },
        {
            id: "artwork-bocklin-island-dead",
            title: "The Island of the Dead",
            year: 1880,
            description: "A brooding, atmospheric painting showing a white-shrouded figure rowing a coffin toward a dark, isolated rocky island cemetery.",
            location: "Metropolitan Museum of Art, New York",
            artistId: "artist-arnold-bocklin",
            movementId: "movement-symbolism",
            imageUrl: "https://res.cloudinary.com/dzzwjwhfl/image/upload/v1779109088/The_Island_of_the_Dead_Arnold_B%C3%B6cklin_z7opkh.jpg"
        },
        {
            id: "artwork-klimt-the-kiss",
            title: "The Kiss",
            year: 1908,
            description: "A shimmering Golden Phase masterpiece encasing two entwined lovers in intricate, geometric patterns of actual gold leaf veneer squares.",
            location: "Österreichische Galerie Belvedere, Vienna",
            artistId: "artist-gustav-klimt",
            movementId: "movement-symbolism",
            imageUrl: "https://res.cloudinary.com/dzzwjwhfl/image/upload/v1779109089/The_Kiss_Gustav_Klimt_thpj1a.jpg"
        }
    ],
    "Washington Color School" : [
        {
            id: "artwork-thomas-resurrection",
            title: "Resurrection",
            year: 1966,
            description: "A radiant mosaic-like target design using rhythmic, structural dashes of pure color to build intense emotional joy and vitality.",
            location: "The White House Collection, Washington, D.C.",
            artistId: "artist-alma-thomas",
            movementId: "movement-washington-color-school",
            imageUrl: "https://res.cloudinary.com/dzzwjwhfl/image/upload/v1779109104/Resurrection_Alma_Thomas_o55tbw.png"
        },
        {
            id: "artwork-davis-black-grey-beat",
            title: "Black Grey Beat",
            year: 1964,
            description: "A meticulous, large-scale stripe painting using repeating vertical bands of black and grey to produce a shifting rhythmic vibration.",
            location: "National Gallery of Art, Washington, D.C.",
            artistId: "artist-gene-davis",
            movementId: "movement-washington-color-school",
            imageUrl: "https://res.cloudinary.com/dzzwjwhfl/image/upload/v1779109090/Black_Grey_Beat_Gene_Davis_dstxnk.png"
        },
        {
            id: "artwork-louis-blast",
            title: "Blast",
            year: 1957,
            description: "A striking example of a Veil Painting, achieved by pouring thinned acrylic stains onto unprimed canvas to produce exploding color translucent layers.",
            location: "Private Collection",
            artistId: "artist-morris-louis",
            movementId: "movement-washington-color-school",
            imageUrl: "https://res.cloudinary.com/dzzwjwhfl/image/upload/v1779109090/Blast_Morris_Louis_qzqi3j.png"
        },
        {
            id: "artwork-noland-lunar-episode",
            title: "Lunar Episode",
            year: 1959,
            description: "A prominent target-motif canvas utilizing concentrated target rings of stained paint to investigate optical focal power and pure geometry.",
            location: "Private Collection",
            artistId: "artist-kenneth-noland",
            movementId: "movement-washington-color-school",
            imageUrl: "https://res.cloudinary.com/dzzwjwhfl/image/upload/v1779109089/Lunar_episode_Kenneth_Noland_po15p6.jpg"
        }
    ]
};