import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const PeonyTransition: React.FC = () => {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    // Staggered progress for different elements
    const progress1 = useTransform(scrollYProgress, [0, 0.8], [0, 1]);
    const progress2 = useTransform(scrollYProgress, [0.05, 0.85], [0, 1]);
    const progress3 = useTransform(scrollYProgress, [0.1, 0.9], [0, 1]);
    const progress4 = useTransform(scrollYProgress, [0.15, 0.92], [0, 1]);
    const progress5 = useTransform(scrollYProgress, [0.2, 0.95], [0, 1]);
    const progress6 = useTransform(scrollYProgress, [0.25, 1], [0, 1]);

    return (
        <section ref={containerRef} className="bg-paper-white py-48 md:py-64 flex flex-col items-center justify-center relative overflow-hidden border-t border-black/5 min-h-screen">

            {/* LEFT PEONY ARRANGEMENT - Flowing upward from bottom left */}
            <svg className="absolute -left-32 bottom-0 w-[55%] h-[85%] pointer-events-none opacity-[0.15]" viewBox="0 0 500 700" preserveAspectRatio="xMaxYMax meet" fill="none">
                <g stroke="#2D2D2D" strokeLinecap="round" strokeLinejoin="round">

                    {/* Main flowing stem - curves from bottom left up */}
                    <motion.path
                        d="M50,750 C80,700 100,650 90,600 C80,550 120,500 100,450 C80,400 130,350 110,300 C90,250 140,200 120,150 C100,100 150,50 130,0"
                        strokeWidth="1"
                        style={{ pathLength: progress1 }}
                        opacity="0.8"
                    />

                    {/* Branch stem 1 */}
                    <motion.path
                        d="M100,450 C150,430 180,400 200,350"
                        strokeWidth="0.8"
                        style={{ pathLength: progress2 }}
                        opacity="0.7"
                    />

                    {/* Branch stem 2 */}
                    <motion.path
                        d="M90,600 C140,580 170,540 190,500"
                        strokeWidth="0.7"
                        style={{ pathLength: progress2 }}
                        opacity="0.6"
                    />

                    {/* ============ LARGE PEONY - Bottom ============ */}
                    <motion.path
                        d="M140,580 C100,560 70,580 65,620 C60,660 90,700 140,710 C190,720 230,690 235,645 C240,600 200,570 140,580"
                        strokeWidth="0.7"
                        style={{ pathLength: progress2 }}
                    />
                    <motion.path
                        d="M90,600 C55,595 35,625 45,665 C55,705 95,720 130,705"
                        strokeWidth="0.5"
                        style={{ pathLength: progress3 }}
                    />
                    <motion.path
                        d="M190,620 C225,615 245,645 235,685 C225,725 185,735 155,715"
                        strokeWidth="0.5"
                        style={{ pathLength: progress3 }}
                    />
                    <motion.path
                        d="M120,610 C90,600 75,625 85,655 C95,685 130,695 155,680 C180,665 185,630 160,615 C135,600 105,615 120,640"
                        strokeWidth="0.4"
                        style={{ pathLength: progress4 }}
                    />
                    <motion.path
                        d="M110,640 C85,635 75,660 90,685 C105,710 140,705 150,680"
                        strokeWidth="0.35"
                        style={{ pathLength: progress4 }}
                    />
                    <motion.path
                        d="M155,645 C175,640 185,665 175,690 C165,715 135,715 125,690"
                        strokeWidth="0.35"
                        style={{ pathLength: progress5 }}
                    />
                    {/* Inner details */}
                    <motion.path
                        d="M130,655 C115,650 108,665 118,682 C128,699 148,695 152,678 C156,661 142,652 130,658"
                        strokeWidth="0.3"
                        style={{ pathLength: progress5 }}
                    />
                    <motion.path
                        d="M135,668 C125,665 122,675 130,685 C138,695 150,690 148,678"
                        strokeWidth="0.25"
                        style={{ pathLength: progress6 }}
                    />

                    {/* ============ MEDIUM PEONY - Middle ============ */}
                    <motion.path
                        d="M180,380 C145,365 115,385 115,420 C115,455 150,480 195,480 C240,480 270,450 265,415 C260,380 220,360 180,380"
                        strokeWidth="0.6"
                        style={{ pathLength: progress3 }}
                    />
                    <motion.path
                        d="M140,400 C110,395 95,425 105,460 C115,495 155,505 185,485"
                        strokeWidth="0.45"
                        style={{ pathLength: progress3 }}
                    />
                    <motion.path
                        d="M230,405 C260,400 275,430 265,465 C255,500 215,510 190,490"
                        strokeWidth="0.45"
                        style={{ pathLength: progress4 }}
                    />
                    <motion.path
                        d="M165,400 C140,395 128,415 138,445 C148,475 180,480 200,465 C220,450 220,420 198,408 C176,396 152,410 168,435"
                        strokeWidth="0.35"
                        style={{ pathLength: progress4 }}
                    />
                    <motion.path
                        d="M175,425 C155,420 145,442 158,462 C171,482 198,478 205,455"
                        strokeWidth="0.3"
                        style={{ pathLength: progress5 }}
                    />
                    <motion.path
                        d="M180,440 C165,436 160,452 170,465 C180,478 198,474 198,458"
                        strokeWidth="0.25"
                        style={{ pathLength: progress6 }}
                    />

                    {/* ============ SMALL PEONY - Top ============ */}
                    <motion.path
                        d="M140,200 C115,188 90,200 90,230 C90,260 120,280 155,280 C190,280 215,255 210,225 C205,195 170,180 140,200"
                        strokeWidth="0.5"
                        style={{ pathLength: progress3 }}
                    />
                    <motion.path
                        d="M110,215 C85,212 72,235 82,262 C92,289 125,295 148,278"
                        strokeWidth="0.4"
                        style={{ pathLength: progress4 }}
                    />
                    <motion.path
                        d="M180,220 C205,217 218,240 208,267 C198,294 165,300 145,283"
                        strokeWidth="0.4"
                        style={{ pathLength: progress4 }}
                    />
                    <motion.path
                        d="M135,225 C115,220 105,240 115,260 C125,280 155,282 168,265 C181,248 175,225 155,218 C135,211 118,228 132,248"
                        strokeWidth="0.3"
                        style={{ pathLength: progress5 }}
                    />
                    <motion.path
                        d="M145,245 C130,242 125,255 135,268 C145,281 165,276 165,260"
                        strokeWidth="0.25"
                        style={{ pathLength: progress6 }}
                    />

                    {/* ============ BUD 1 ============ */}
                    <motion.path
                        d="M200,300 C182,290 165,302 170,325 C175,348 198,355 212,340 C226,325 220,298 200,300"
                        strokeWidth="0.4"
                        style={{ pathLength: progress4 }}
                    />
                    <motion.path
                        d="M190,312 C178,308 172,320 180,335 C188,350 205,345 208,330"
                        strokeWidth="0.3"
                        style={{ pathLength: progress5 }}
                    />

                    {/* ============ LEAVES ============ */}
                    <motion.path
                        d="M60,520 C35,505 15,520 20,550 C25,580 55,590 75,575 C95,560 90,530 60,520"
                        strokeWidth="0.5"
                        style={{ pathLength: progress2 }}
                    />
                    <motion.path
                        d="M60,520 C50,540 48,560 75,575"
                        strokeWidth="0.25"
                        style={{ pathLength: progress3 }}
                    />

                    <motion.path
                        d="M170,520 C150,505 125,515 125,545 C125,575 155,590 180,575 C205,560 205,530 170,520"
                        strokeWidth="0.45"
                        style={{ pathLength: progress3 }}
                    />

                    <motion.path
                        d="M80,320 C58,308 40,320 45,348 C50,376 78,385 95,370 C112,355 105,325 80,320"
                        strokeWidth="0.4"
                        style={{ pathLength: progress4 }}
                    />

                    {/* Small decorative */}
                    <motion.path
                        d="M220,250 C235,242 248,252 245,268"
                        strokeWidth="0.2"
                        style={{ pathLength: progress5 }}
                    />
                    <motion.path
                        d="M250,420 C265,412 278,422 275,438"
                        strokeWidth="0.2"
                        style={{ pathLength: progress5 }}
                    />
                </g>
            </svg>

            {/* RIGHT PEONY ARRANGEMENT - Different composition, flowing from top right */}
            <svg className="absolute -right-16 top-0 w-[45%] h-[80%] pointer-events-none opacity-[0.15]" viewBox="0 0 400 600" preserveAspectRatio="xMinYMin meet" fill="none">
                <g stroke="#2D2D2D" strokeLinecap="round" strokeLinejoin="round">

                    {/* Main stem - descending from top right */}
                    <motion.path
                        d="M380,-50 C360,0 370,50 350,100 C330,150 360,200 340,250 C320,300 350,350 330,400 C310,450 340,500 320,550 C300,600 330,650 310,700"
                        strokeWidth="0.9"
                        style={{ pathLength: progress1 }}
                        opacity="0.7"
                    />

                    {/* Branch */}
                    <motion.path
                        d="M350,100 C300,120 270,160 260,210"
                        strokeWidth="0.7"
                        style={{ pathLength: progress2 }}
                        opacity="0.6"
                    />

                    <motion.path
                        d="M340,300 C290,310 260,350 255,400"
                        strokeWidth="0.6"
                        style={{ pathLength: progress3 }}
                        opacity="0.5"
                    />

                    {/* ============ LARGE PEONY - Top ============ */}
                    <motion.path
                        d="M300,80 C260,60 225,75 220,115 C215,155 250,190 300,195 C350,200 385,165 385,120 C385,75 345,55 300,80"
                        strokeWidth="0.65"
                        style={{ pathLength: progress2 }}
                    />
                    <motion.path
                        d="M250,95 C215,90 195,120 205,160 C215,200 258,215 290,195"
                        strokeWidth="0.5"
                        style={{ pathLength: progress3 }}
                    />
                    <motion.path
                        d="M350,100 C385,95 405,125 395,165 C385,205 345,220 315,200"
                        strokeWidth="0.5"
                        style={{ pathLength: progress3 }}
                    />
                    <motion.path
                        d="M280,105 C250,98 235,122 248,155 C261,188 298,195 320,175 C342,155 340,120 315,108 C290,96 262,115 280,142"
                        strokeWidth="0.4"
                        style={{ pathLength: progress4 }}
                    />
                    <motion.path
                        d="M268,130 C245,125 235,150 250,175 C265,200 298,195 308,170"
                        strokeWidth="0.35"
                        style={{ pathLength: progress5 }}
                    />
                    <motion.path
                        d="M310,135 C332,130 342,155 332,180 C322,205 290,205 280,180"
                        strokeWidth="0.35"
                        style={{ pathLength: progress5 }}
                    />
                    <motion.path
                        d="M288,145 C270,140 262,160 275,180 C288,200 315,195 320,172 C325,149 305,140 288,150"
                        strokeWidth="0.3"
                        style={{ pathLength: progress5 }}
                    />
                    <motion.path
                        d="M295,160 C282,157 278,172 288,185 C298,198 315,192 315,175"
                        strokeWidth="0.25"
                        style={{ pathLength: progress6 }}
                    />

                    {/* ============ MEDIUM PEONY - Middle right ============ */}
                    <motion.path
                        d="M280,350 C248,338 220,355 220,390 C220,425 255,450 298,448 C341,446 368,415 362,378 C356,341 315,328 280,350"
                        strokeWidth="0.55"
                        style={{ pathLength: progress3 }}
                    />
                    <motion.path
                        d="M242,368 C215,365 200,395 212,430 C224,465 262,475 290,455"
                        strokeWidth="0.45"
                        style={{ pathLength: progress4 }}
                    />
                    <motion.path
                        d="M325,365 C355,362 370,392 360,427 C350,462 312,472 285,452"
                        strokeWidth="0.45"
                        style={{ pathLength: progress4 }}
                    />
                    <motion.path
                        d="M270,375 C245,370 232,395 245,425 C258,455 295,460 318,442 C341,424 338,390 312,378 C286,366 258,385 275,412"
                        strokeWidth="0.35"
                        style={{ pathLength: progress5 }}
                    />
                    <motion.path
                        d="M282,400 C262,396 255,418 270,440 C285,462 315,456 322,432"
                        strokeWidth="0.3"
                        style={{ pathLength: progress5 }}
                    />
                    <motion.path
                        d="M295,415 C280,412 275,430 288,445 C301,460 322,452 320,432"
                        strokeWidth="0.25"
                        style={{ pathLength: progress6 }}
                    />

                    {/* ============ SMALL BUD ============ */}
                    <motion.path
                        d="M240,240 C222,230 205,242 210,265 C215,288 238,295 252,280 C266,265 260,238 240,240"
                        strokeWidth="0.4"
                        style={{ pathLength: progress4 }}
                    />
                    <motion.path
                        d="M230,252 C218,248 212,262 222,278 C232,294 250,288 252,272"
                        strokeWidth="0.3"
                        style={{ pathLength: progress5 }}
                    />

                    {/* ============ TINY BUD ============ */}
                    <motion.path
                        d="M360,280 C348,272 335,282 340,300 C345,318 362,322 372,310 C382,298 375,278 360,280"
                        strokeWidth="0.35"
                        style={{ pathLength: progress5 }}
                    />

                    {/* ============ LEAVES ============ */}
                    <motion.path
                        d="M380,200 C360,185 335,195 335,225 C335,255 365,270 390,255 C415,240 415,210 380,200"
                        strokeWidth="0.45"
                        style={{ pathLength: progress3 }}
                    />
                    <motion.path
                        d="M380,200 C365,220 362,245 390,255"
                        strokeWidth="0.25"
                        style={{ pathLength: progress4 }}
                    />

                    <motion.path
                        d="M225,310 C205,298 182,310 188,338 C194,366 222,375 242,360 C262,345 255,315 225,310"
                        strokeWidth="0.4"
                        style={{ pathLength: progress4 }}
                    />

                    <motion.path
                        d="M340,480 C320,468 295,480 300,508 C305,536 335,545 355,530 C375,515 370,485 340,480"
                        strokeWidth="0.4"
                        style={{ pathLength: progress4 }}
                    />

                    {/* Delicate tendrils */}
                    <motion.path
                        d="M200,180 C185,172 172,182 178,198"
                        strokeWidth="0.2"
                        style={{ pathLength: progress5 }}
                    />
                    <motion.path
                        d="M380,420 C395,412 408,422 405,438"
                        strokeWidth="0.2"
                        style={{ pathLength: progress6 }}
                    />
                    <motion.path
                        d="M270,520 C255,512 242,522 248,538"
                        strokeWidth="0.2"
                        style={{ pathLength: progress5 }}
                    />
                </g>
            </svg>

            {/* TEXT CONTENT */}
            <div className="relative z-10 text-center px-4 mix-blend-normal">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                >
                    <h2 className="text-[10vw] md:text-[8vw] font-black leading-[0.85] uppercase tracking-tighter text-ink-black">
                        Where Art<br/>
                        <span className="text-transparent text-stroke tracking-normal italic font-editorial font-light">lives on skin</span>
                    </h2>
                </motion.div>
            </div>
        </section>
    );
}

export default PeonyTransition;
