"use client";
import ButtonBase from '@mui/material/ButtonBase';

const cards = [
    {
        id: 1,
        width: 'calc(25% - 12px)',
        title: 'Ecclesiastical and Devotional',
        url: 'https://res.cloudinary.com/dzzwjwhfl/image/upload/v1776780581/Vincent_van_Gogh_858_zopfes.jpg',
        description: 'Historically, the Church was the primary architect of visual culture. These works were commissioned as instruments of liturgy and "Biblia Pauperum" (the Bible of the poor), designed to bridge the gap between the mundane and the eternal. They functioned as pedagogical tools for theological instruction and as conduits for spiritual meditation.',
    },
    {
        id: 2,
        width: 'calc(25% - 12px)',
        title: 'Royal and State Propaganda',
        url: 'https://res.cloudinary.com/dzzwjwhfl/image/upload/v1776836996/Eugene_Delacroix_25_bxgw2i.jpg',
        description: "Commissioned by absolute monarchs and governing bodies, these works served as visual manifestations of political legitimacy. They were intended to solidify the ruler's authority, celebrate military victory, or define a cohesive national identity for the citizenry.",
    },
    {
        id: 3,
        width: 'calc(25% - 12px)',
        title: 'The Mercantile and Private Market',
        url: 'https://res.cloudinary.com/dzzwjwhfl/image/upload/v1776780580/Pablo_Picasso_82_lg8fxv.jpg',
        description: "With the expansion of the urban middle class, art transitioned from public monument to domestic commodity. These works were created for private homes and commercial galleries, focusing on the nuanced experiences of the individual and the aesthetic pleasure of the natural world."
    },
    {
        id: 4,
        width: 'calc(25% - 12px)',
        title: 'Institutional and Global Contemporary',
        url: 'https://res.cloudinary.com/dzzwjwhfl/image/upload/v1776781212/Claude_Monet_68_fsue98.jpg',
        description: 'Works in this category are often produced for the academic and professional museum circuit. Their intent is to explore the limits of formal theory, interrogate the historical canon, and act as a catalyst for discourse on global identity and social justice.'
    }
];

export default function ButtonBaseDemo() {
    return (
        <div className='flex flex-wrap w-full px-4 sm:px-18 my-8 sm:my-12.5 min-w-70 gap-4 justify-center'>
            {cards.map((card) => (
                <ButtonBase
                    focusRipple
                    key={card.id}
                    className='group relative! h-80! w-full! bg-black! text-white! shadow-md! shadow-primary-light/50! sm:h-210! md:w-[calc(25%-16px)]! overflow-hidden! focus:outline-none! rounded-md!'
                >
                    <div 
                        style={{ backgroundImage: `url(${card.url})` }}
                        className={`absolute inset-0 bg-cover bg-position-[center_40%] transition-all duration-500 opacity-70 group-hover:opacity-100 group-hover:scale-102`}
                    />

                    <div className='absolute inset-0 flex items-center justify-center'>
                        <span className='relative px-2 py-4 border-transparent transition-all duration-300 font-mono font-light text-[0.95rem] sm:text-[1.05rem] tracking-wider rounded-sm group-hover:border-white bg-black/60 sm:bg-black/35 sm:group-hover:bg-black/60 group-focus-visible:border-white group-focus-visible:bg-black/50'>
                            {card.title}
                            <span className='absolute -bottom-0.5 left-[calc(50%-9px)] h-0.5 w-4.5 bg-white transition-opacity duration-300 group-hover:opacity-0 group-focus-visible:opacity-0' />
                        </span>
                    </div>
                </ButtonBase>
            ))}
        </div>
    );
}