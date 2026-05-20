import Box from '@mui/material/Box';
import Masonry from '@mui/lab/Masonry';
import Paper from '@mui/material/Paper';
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
                <Typography className='font-mono! px-4! pb-1! sm:px-0! sm:pb-3! sm:mx-4! text-primary-light! dark:text-primary-dark! text-[0.95rem]! sm:text-md! font-light!'>
                    <strong className='font-sans! text-[2rem]! sm:text-4xl/14!'>Origin</strong><br/>{movementData.origin}
                </Typography>
                <Typography className='font-mono! px-4! pb-1! sm:px-0! sm:pb-3 sm:mx-4! text-primary-light! dark:text-primary-dark! text-[0.95rem]! sm:text-md! font-light!'>
                    <strong className='font-sans! text-[2rem]! sm:text-4xl/14!'>Period</strong><br/> {movementData.period}
                </Typography>
                <Typography className='font-mono! px-4! py-1! sm:px-0! sm:py-3! sm:mx-4! text-primary-light! dark:text-primary-dark! text-[0.95rem]! sm:text-md! font-light!'>
                    <strong className='font-sans! text-[2rem]! sm:text-4xl/13!'>Notable artists</strong><br/> {artistsData.map((item) => item.name).join(", ")}
                </Typography>
                <Typography className='font-mono! px-4! pb-2! sm:px-0! sm:pb-3! sm:mx-4! text-primary-light! dark:text-primary-dark! text-[0.95rem]! sm:text-md! font-light!'>
                    <strong className='font-sans! text-[2rem]! sm:text-4xl/13!'>Description</strong><br/> {movementData.description}
                </Typography>
            </Box>
            
            <Masonry columns={{ xs: 1, md: 2 }} spacing={{xs: 0, md: 3}}>
                {movementData.characteristics.map((item, index) => (
                    <Box
                        key={index}
                        className='mb-4!' 
                    >
                        <img
                            loading="lazy"
                            alt="background-image"
                            className='rounded-t-md!'
                            src={`${JSON.parse(movementLinks)[movementData.name][index]}?w=500&auto=format`}
                        />
                        <Paper className='bg-primary-light/10! dark:bg-primary-dark/10! p-4 font-light! text-[1rem] text-center text-primary-light! dark:text-primary-dark! rounded-b-md!'>
                            {item}
                        </Paper>
                    </Box>
                ))}
            </Masonry>
        </Box>     
    )
}

const movementLinks: string = `{
    "Abstract Expressionism" : [
        "https://res.cloudinary.com/dzzwjwhfl/image/upload/v1779109056/No._61_Rust_and_Blue_Mark_Rothko_vd5phc.jpg",
        "https://res.cloudinary.com/dzzwjwhfl/image/upload/v1779109040/No._5_1948_Jackson_Pollock_vajucx.jpg",
        "https://res.cloudinary.com/dzzwjwhfl/image/upload/v1779109015/Woman_I_Willem_de_Kooning_nyul6t.jpg",
        "https://res.cloudinary.com/dzzwjwhfl/image/upload/v1779109028/Mountains_and_Sea_Helen_Frankenthaler_z8fo7x.jpg"
    ],
    "Abstractionism" : [
        "https://res.cloudinary.com/dzzwjwhfl/image/upload/v1779109016/The_Snail_Henri_Matisse_nmqml7.jpg",
        "https://res.cloudinary.com/dzzwjwhfl/image/upload/v1779109009/Composition_VIII_Wassily_Kandinsky_pk6cqw.jpg",
        "https://res.cloudinary.com/dzzwjwhfl/image/upload/v1779109007/Untitled_Cy_Twombly_g39j6b.jpg",
        "https://res.cloudinary.com/dzzwjwhfl/image/upload/v1779109007/Peinture_Etoile_Bleue_Joan_Mir%C3%B3_k1po8s.webp"
    ],
    "Art Nouveau" : [
        "https://res.cloudinary.com/dzzwjwhfl/image/upload/v1779109011/Divan_Japonais_Henri_de_Toulouse-Lautrec_eldolj.jpg",
        "https://res.cloudinary.com/dzzwjwhfl/image/upload/v1779109029/The_Primrose_Alphonse_Mucha_galkl7.jpg",
        "https://res.cloudinary.com/dzzwjwhfl/image/upload/v1779109007/The_Peacock_Skirt_Aubrey_Beardsley_ztbcny.png",
        "https://res.cloudinary.com/dzzwjwhfl/image/upload/v1779109007/Stoclet_Frieze_Gustav_Klimt_ckr36k.jpg"
    ],
    "Baroque" : [
        "https://res.cloudinary.com/dzzwjwhfl/image/upload/v1779109057/The_Supper_at_Emmaus_Caravaggio_mifuy7.jpg",
        "https://res.cloudinary.com/dzzwjwhfl/image/upload/v1779109056/The_Laughing_Cavalier_Frans_Hals_o8wwje.jpg",
        "https://res.cloudinary.com/dzzwjwhfl/image/upload/v1779109045/The_Milkmaid_Johannes_Vermee_xzizwr.png",
        "https://res.cloudinary.com/dzzwjwhfl/image/upload/v1779109039/Aurora_Guercino_we2scl.jpg"
    ],
    "Black Arts Movement" : [
        "https://res.cloudinary.com/dzzwjwhfl/image/upload/v1779109062/Wall_of_Respect_Jeff_Donaldson_wvkogk.webp",
        "https://res.cloudinary.com/dzzwjwhfl/image/upload/v1779109060/Revolutionary_Wadsworth_Jarrell_xumtrr.jpg",
        "https://res.cloudinary.com/dzzwjwhfl/image/upload/v1779109060/The_Flag_is_Bleeding_Faith_Ringgold_ljskys.jpg",
        "https://res.cloudinary.com/dzzwjwhfl/image/upload/v1779109057/Duke_Ellington_Nelson_Stevens_rsb50i.webp"
    ],
    "Byzantine Art" : [
        "https://res.cloudinary.com/dzzwjwhfl/image/upload/v1779109065/The_Enthroned_Madonna_and_Child_with_Saints_and_Angels_Anonymous_St._Catherine_s_Monastery_tka5ds.jpg",
        "https://res.cloudinary.com/dzzwjwhfl/image/upload/v1779109065/Christ_Pantocrator_Anonymous_Hagia_Sophia_Mosaics_htoqlm.jpg",
        "https://res.cloudinary.com/dzzwjwhfl/image/upload/v1779109064/The_Vladimir_Virgin_Anonymous_Icon_Painter_acj3a0.jpg",
        "https://res.cloudinary.com/dzzwjwhfl/image/upload/v1779109061/Angel_with_Golden_Hair_Anonymous_Novgorod_School_jvrt2c.jpg"
    ],
    "Contemporary African-Diasporic Art" : [
        "https://res.cloudinary.com/dzzwjwhfl/image/upload/v1779109075/The_School_of_Beauty_School_of_Culture_Kerry_James_Marshall_nuvlpd.png",
        "https://res.cloudinary.com/dzzwjwhfl/image/upload/v1779109066/Materia_Prima_Lina_Iris_Viktor_wpchgy.webp",
        "https://res.cloudinary.com/dzzwjwhfl/image/upload/v1779109066/A_Countervailing_Theory_Toyin_Ojih_Odutola_t21qfy.jpg",
        "https://res.cloudinary.com/dzzwjwhfl/image/upload/v1779109065/Eleventh_-_Lina_Iris_Viktor_fv42ms.webp"
    ],
    "Cubism" : [
        "https://res.cloudinary.com/dzzwjwhfl/image/upload/v1779109071/The_City_Fernand_L%C3%A9ger_cdw0gh.jpg",
        "https://res.cloudinary.com/dzzwjwhfl/image/upload/v1779109070/The_Portuguese_Georges_Braque_hvkkmy.jpg",
        "https://res.cloudinary.com/dzzwjwhfl/image/upload/v1779109069/Les_Demoiselles_d_Avignon_Pablo_Picasso_xy0tbk.jpg",
        "https://res.cloudinary.com/dzzwjwhfl/image/upload/v1779109069/Portrait_of_Picasso_Juan_Gris_lhv5ip.jpg"
    ],
    "Early Renaissance" : [
        "https://res.cloudinary.com/dzzwjwhfl/image/upload/v1779109078/The_Holy_Trinity_Masaccio_dw2vfa.jpg",
        "https://res.cloudinary.com/dzzwjwhfl/image/upload/v1779109076/The_Battle_of_San_Romano_Paolo_Uccello_qj3uon.jpg",
        "https://res.cloudinary.com/dzzwjwhfl/image/upload/v1779109075/The_Annunciation_Fra_Angelico_txwpkq.jpg",
        "https://res.cloudinary.com/dzzwjwhfl/image/upload/v1779109073/Primavera_Sandro_Botticelli_fbopve.jpg"
    ],
    "Expressionism" : [
        "https://res.cloudinary.com/dzzwjwhfl/image/upload/v1779109077/Self-Portrait_as_a_Soldier_Ernst_Ludwig_Kirchner_nlyv9v.jpg",
        "https://res.cloudinary.com/dzzwjwhfl/image/upload/v1779109114/Self-Portrait_with_Physalis_Egon_Schiele_onbye2.jpg",
        "https://res.cloudinary.com/dzzwjwhfl/image/upload/v1779109079/The_Fate_of_the_Animals_Franz_Marc_xa1pyi.jpg",
        "https://res.cloudinary.com/dzzwjwhfl/image/upload/v1779109082/The_Old_King_Georges_Rouault_mertot.jpg"
    ],
    "High Renaissance" : [
        "https://res.cloudinary.com/dzzwjwhfl/image/upload/v1779109082/Sainte_Anne_Leonardo_Leonardo_da_Vinci_h6jtfo.jpg",
        "https://res.cloudinary.com/dzzwjwhfl/image/upload/v1779109013/The_Sistine_Madonna_Raphael_hyofvi.jpg",
        "https://res.cloudinary.com/dzzwjwhfl/image/upload/v1779109012/The_Pastoral_Concert_Titian_rum0fi.jpg",
        "https://res.cloudinary.com/dzzwjwhfl/image/upload/v1779109009/The_Creation_of_Adam_Michelangelo_jb9bsi.jpg"
    ],
    "Impressionism" : [
        "https://res.cloudinary.com/dzzwjwhfl/image/upload/v1779109021/The_Dance_Class_Edgar_Degas_kjnxe6.jpg",
        "https://res.cloudinary.com/dzzwjwhfl/image/upload/v1779109012/Luncheon_of_the_Boating_Party_Pierre-Auguste_Renoir_lky7yh.jpg",
        "https://res.cloudinary.com/dzzwjwhfl/image/upload/v1779109013/Paris_Street_Rainy_Day_Gustave_Caillebotte_mvmzul.jpg",
        "https://res.cloudinary.com/dzzwjwhfl/image/upload/v1779109016/The_Child_s_Bath_Mary_Cassatt_ig5wbm.jpg"
    ],
    "Mannerism" : [
        "https://res.cloudinary.com/dzzwjwhfl/image/upload/v1779109038/The_Immaculate_Conception_-_El_Greco_tcih1y.jpg",
        "https://res.cloudinary.com/dzzwjwhfl/image/upload/v1779109036/The_Madonna_with_the_Long_Neck_Parmigianino_dey20l.jpg",
        "https://res.cloudinary.com/dzzwjwhfl/image/upload/v1779109029/Carmignano_Visitation_Jacopo_da_Pontormo_qzd87c.jpg",
        "https://res.cloudinary.com/dzzwjwhfl/image/upload/v1779109028/The_Last_Supper_Tintoretto_tnmm4q.jpg"
    ],
    "Muralism" : [
        "https://res.cloudinary.com/dzzwjwhfl/image/upload/v1779109048/The_Meal_of_Lord_Candlestick_-_Leonora_Carrington_nsdfei.jpg",
        "https://res.cloudinary.com/dzzwjwhfl/image/upload/v1779109047/Man_at_the_Crossroads_Diego_Rivera_ll191j.jpg",
        "https://res.cloudinary.com/dzzwjwhfl/image/upload/v1779109048/The_Trench_Jos%C3%A9_Clemente_Orozco_auelxv.jpg",
        "https://res.cloudinary.com/dzzwjwhfl/image/upload/v1779109043/The_March_of_Humanity_David_Alfaro_Siqueiros_z3wvrw.jpg"
    ],
    "Neo-Expressionism" : [
        "https://res.cloudinary.com/dzzwjwhfl/image/upload/v1779109104/Untitled_Boxer_Jean-Michel_Basquiat_ss6fwf.jpg",
        "https://res.cloudinary.com/dzzwjwhfl/image/upload/v1779109057/The_Orders_of_the_Night_Anselm_Kiefer_cwpng1.png",
        "https://res.cloudinary.com/dzzwjwhfl/image/upload/v1779109055/The_Night_with_Marie_Georg_Baselitz_cdmt8j.png",
        "https://res.cloudinary.com/dzzwjwhfl/image/upload/v1779109052/Calm_down_in_a_diary_David_Salle_odsas5.jpg"
    ],
    "Neoplasticism" : [
        "https://res.cloudinary.com/dzzwjwhfl/image/upload/v1779109057/Composition_Bart_van_der_Leck_g1w7lg.jpg",
        "https://res.cloudinary.com/dzzwjwhfl/image/upload/v1779109056/Simultaneous_Composition_Vilmos_Husz%C3%A1r_qabny6.jpg",
        "https://res.cloudinary.com/dzzwjwhfl/image/upload/v1779109056/Composition_with_Red_Blue_and_Yellow_Piet_Mondrian_frqddc.jpg",
        "https://res.cloudinary.com/dzzwjwhfl/image/upload/v1779109055/Composition_VII_Theo_van_Doesburg_ndr0tj.jpg"
    ],
    "Nigerian Modernism" : [
        "https://res.cloudinary.com/dzzwjwhfl/image/upload/v1779109078/Drummers_Return_Yusuf_Grillo_yne3z7.png",
        "https://res.cloudinary.com/dzzwjwhfl/image/upload/v1779109060/Yoruba_women_pounding_cassava_Ben_Enwonwu_pm7zvi.webp",
        "https://res.cloudinary.com/dzzwjwhfl/image/upload/v1779109059/The_Station_Uzo_Egonu_xaemun.jpg",
        "https://res.cloudinary.com/dzzwjwhfl/image/upload/v1779109059/Couple_Rufus_Ogundele_qdtxrg.webp"
    ],
    "Northern Renaissance" : [
        "https://res.cloudinary.com/dzzwjwhfl/image/upload/v1779109064/The_Descent_from_the_Cross_Rogier_van_der_Weyden_z6l93p.jpg",
        "https://res.cloudinary.com/dzzwjwhfl/image/upload/v1779109062/The_Ambassadors_Hans_Holbein_the_Younger_fxuebd.jpg",
        "https://res.cloudinary.com/dzzwjwhfl/image/upload/v1779109064/The_procession_to_calvary_Pieter_Bruegel_the_Elder_hfxldm.jpg",
        "https://res.cloudinary.com/dzzwjwhfl/image/upload/v1779109062/Feast_of_the_rosary_Albrecht_D%C3%BCrer_dfoeno.jpg"
    ],
    "Pop Art" : [
        "https://res.cloudinary.com/dzzwjwhfl/image/upload/v1779109068/Smoker_1_Mouth_1_Tom_Wesselmann_xrxjtv.jpg",
        "https://res.cloudinary.com/dzzwjwhfl/image/upload/v1779109067/Campbell_s_Soup_Cans_Andy_Warhol_sblhmn.jpg",
        "https://res.cloudinary.com/dzzwjwhfl/image/upload/v1779109067/Just_what_is_it_that_makes_today_s_homes_so_different_so_appealing_Richard_Hamilton_oawvcf.webp",
        "https://res.cloudinary.com/dzzwjwhfl/image/upload/v1779109067/I_Love_You_with_My_Ford_James_Rosenquist_jiuq4b.jpg"
    ],
    "Post-Impressionism" : [
        "https://res.cloudinary.com/dzzwjwhfl/image/upload/v1779109071/The_Card_Players_Paul_C%C3%A9zanne_dcol5c.jpg",
        "https://res.cloudinary.com/dzzwjwhfl/image/upload/v1779109070/Head_of_a_Skeleton_with_a_Burning_Cigarette_Vincent_van_Gogh_cwrfyj.jpg",
        "https://res.cloudinary.com/dzzwjwhfl/image/upload/v1779109069/At_the_Moulin_Rouge_Henri_de_Toulouse-Lautrec_xkd0uv.jpg",
        "https://res.cloudinary.com/dzzwjwhfl/image/upload/v1779109074/Where_Do_We_Come_From_What_Are_We_Where_Are_We_Going_Paul_Gauguin_caxchg.jpg"
    ],
    "Primitivism" : [
        "https://res.cloudinary.com/dzzwjwhfl/image/upload/v1779109076/The_Dream_Henri_Rousseau_th879s.jpg",
        "https://res.cloudinary.com/dzzwjwhfl/image/upload/v1779109078/The_Yellow_Christ_Paul_Gauguin_erk9tj.jpg",
        "https://res.cloudinary.com/dzzwjwhfl/image/upload/v1779109073/Dance_Henri_Matisse_utir5j.jpg",
        "https://res.cloudinary.com/dzzwjwhfl/image/upload/v1779109075/Portrait_of_Blaise_Cendrars_-_Amedeo_Modigliani_qgszd7.jpg"
    ],
    "Proto Renaissance" : [
        "https://res.cloudinary.com/dzzwjwhfl/image/upload/v1779109081/Frontispice_du_Virgile_-_Simone_Martini_pnbvzc.jpg",
        "https://res.cloudinary.com/dzzwjwhfl/image/upload/v1779109081/Ognissanti_Madonna_Cimabue_imwvdm.jpg",
        "https://res.cloudinary.com/dzzwjwhfl/image/upload/v1779109081/The_Flight_into_Egypt_Giotto_qnlyff.jpg",
        "https://res.cloudinary.com/dzzwjwhfl/image/upload/v1779109078/Allegory_of_Good_Government_in_the_Country_Ambrogio_Lorenzetti_cgiomn.jpg"
    ],
    "Realism" : [
        "https://res.cloudinary.com/dzzwjwhfl/image/upload/v1779109083/The_Angelus_Jean-Fran%C3%A7ois_Millet_szmkfq.jpg",
        "https://res.cloudinary.com/dzzwjwhfl/image/upload/v1779109081/A_street_scene_in_sevilla_-_Thomas_Eakins_xzfogl.jpg",
        "https://res.cloudinary.com/dzzwjwhfl/image/upload/v1779109082/Breezing_Up_A_Fair_Wind_Winslow_Homer_benejs.jpg",
        "https://res.cloudinary.com/dzzwjwhfl/image/upload/v1779109082/The_Desperate_Man_Gustave_Courbet_ubl6rr.jpg"
    ],
    "Romanticism" : [
        "https://res.cloudinary.com/dzzwjwhfl/image/upload/v1779109084/The_Slave_Ship_J.M.W._Turner_xgx5ai.jpg",
        "https://res.cloudinary.com/dzzwjwhfl/image/upload/v1779109083/Wanderer_above_the_Sea_of_Fog_Caspar_David_Friedrich_qwn10e.jpg",
        "https://res.cloudinary.com/dzzwjwhfl/image/upload/v1779109084/Liberty_Leading_the_People_Eug%C3%A8ne_Delacroix_rgfahe.jpg",
        "https://res.cloudinary.com/dzzwjwhfl/image/upload/v1779109083/The_Raft_of_the_Medusa_Th%C3%A9odore_G%C3%A9ricault_bglx78.jpg"
    ],
    "Social Realism" : [
        "https://res.cloudinary.com/dzzwjwhfl/image/upload/v1779109085/Nighthawks_Edward_Hopper_xccpdb.jpg",
        "https://res.cloudinary.com/dzzwjwhfl/image/upload/v1779109085/The_Migration_Series_Jacob_Lawrence_jcs3lf.jpg",
        "https://res.cloudinary.com/dzzwjwhfl/image/upload/v1779109085/American_Gothic_Grant_Wood_tkoxj6.jpg",
        "https://res.cloudinary.com/dzzwjwhfl/image/upload/v1779109085/The_Passion_of_Sacco_and_Vanzetti_Ben_Shahn_e2eg1o.jpg"
    ],
    "Suprematism" : [
        "https://res.cloudinary.com/dzzwjwhfl/image/upload/v1779109087/Geometric_composition_Ivan_Kliun_y9mzpu.webp",
        "https://res.cloudinary.com/dzzwjwhfl/image/upload/v1779109086/Suprematist_composition_Kazimir_Malevich_kawyri.jpg",
        "https://res.cloudinary.com/dzzwjwhfl/image/upload/v1779109086/Study_for_a_Suprematist_Composition_Olga_Rozanova_pe6cpr.jpg",
        "https://res.cloudinary.com/dzzwjwhfl/image/upload/v1779109085/Beat_the_Whites_with_the_Red_Wedge_El_Lissitzky_macpw5.jpg"
    ],
    "Surrealism" : [
        "https://res.cloudinary.com/dzzwjwhfl/image/upload/v1779109088/The_Temptation_of_St._Anthony_Max_Ernst_icq1hi.jpg",
        "https://res.cloudinary.com/dzzwjwhfl/image/upload/v1779109087/The_Two_Fridas_Frida_Kahlo_u98cht.jpg",
        "https://res.cloudinary.com/dzzwjwhfl/image/upload/v1779109087/I_and_the_Village_Marc_Chagall_pvi9en.jpg",
        "https://res.cloudinary.com/dzzwjwhfl/image/upload/v1779109086/The_Menaced_Assassin_Ren%C3%A9_Magritte_ehkclj.jpg"
    ],
    "Symbolism" : [
        "https://res.cloudinary.com/dzzwjwhfl/image/upload/v1779109087/The_Eye_Like_a_Strange_Balloon_Mounts_Toward_Infinity_Odilon_Redon_buxjhy.jpg",
        "https://res.cloudinary.com/dzzwjwhfl/image/upload/v1779109088/The_Island_of_the_Dead_Arnold_B%C3%B6cklin_z7opkh.jpg",
        "https://res.cloudinary.com/dzzwjwhfl/image/upload/v1779109089/The_Kiss_Gustav_Klimt_thpj1a.jpg",
        "https://res.cloudinary.com/dzzwjwhfl/image/upload/v1779109088/Jupiter_and_Semele_Gustave_Moreau_pcv9so.jpg"
    ],
    "Washington Color School" : [
        "https://res.cloudinary.com/dzzwjwhfl/image/upload/v1779109104/Resurrection_Alma_Thomas_o55tbw.png",
        "https://res.cloudinary.com/dzzwjwhfl/image/upload/v1779109090/Black_Grey_Beat_Gene_Davis_dstxnk.png",
        "https://res.cloudinary.com/dzzwjwhfl/image/upload/v1779109090/Blast_Morris_Louis_qzqi3j.png",
        "https://res.cloudinary.com/dzzwjwhfl/image/upload/v1779109089/Lunar_episode_Kenneth_Noland_po15p6.jpg"
    ]
}`