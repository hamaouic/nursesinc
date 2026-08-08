/**
 * Nurses Inc. — Organ Reference (patient-friendly).
 *
 * Used by the "Organs" toggle in the Clinical Forms & Tools
 * section on /forms.
 *
 * AUDIENCE: Patients and families. Plain English, no jargon
 * left unexplained. Two sentences per organ: what it is and
 * what it does for you.
 *
 * Each entry:
 *  - organ name
 *  - system it belongs to
 *  - 2-sentence plain-English explanation
 *  - body system icon color tag
 *
 * Last reviewed Aug 2026.
 */

export type OrganSystem =
  | 'cardiovascular'
  | 'respiratory'
  | 'nervous'
  | 'digestive'
  | 'urinary'
  | 'reproductive'
  | 'endocrine'
  | 'musculoskeletal'
  | 'integumentary'
  | 'lymphatic'
  | 'immune'
  | 'sensory'
  | 'hematologic';

export type OrganEntry = {
  id: string;
  name: string;
  system: OrganSystem;
  explanation: string;
};

export const organs: OrganEntry[] = [
  // ============================================================
  // CARDIOVASCULAR
  // ============================================================
  {
    id: 'heart',
    name: 'Heart',
    system: 'cardiovascular',
    explanation:
      'The heart is a fist-sized muscle in your chest that pumps blood through your body with every beat. It works day and night to deliver oxygen and nutrients to every cell, then carries waste products away so they can be removed.',
  },
  {
    id: 'arteries',
    name: 'Arteries',
    system: 'cardiovascular',
    explanation:
      'Arteries are strong, flexible tubes that carry fresh, oxygen-rich blood away from your heart and out to every part of your body. Their walls stretch and recoil with each heartbeat, which is what creates your pulse.',
  },
  {
    id: 'veins',
    name: 'Veins',
    system: 'cardiovascular',
    explanation:
      'Veins are the blood vessels that bring used, oxygen-poor blood back toward your heart to be refreshed. They have one-way valves inside them that keep blood flowing in the right direction, especially against gravity in your legs.',
  },
  {
    id: 'capillaries',
    name: 'Capillaries',
    system: 'cardiovascular',
    explanation:
      'Capillaries are the tiniest blood vessels, so small that red blood cells have to pass through them in single file. They are where the real exchange happens — oxygen and nutrients leave the blood and enter your tissues, and waste products move back in.',
  },
  // ============================================================
  // RESPIRATORY
  // ============================================================
  {
    id: 'nose',
    name: 'Nose & Nasal Cavity',
    system: 'respiratory',
    explanation:
      'Your nose is the front door of your lungs — it warms, moistens, and filters the air before it reaches the delicate tissues deep inside. Tiny hairs and sticky mucus trap dust, germs, and pollen so they do not reach your lungs.',
  },
  {
    id: 'pharynx',
    name: 'Pharynx (Throat)',
    system: 'respiratory',
    explanation:
      'The pharynx is the shared passageway at the back of your throat that handles both air and food. A small flap called the epiglottis closes over it when you swallow so food goes down the right pipe and does not enter your airway.',
  },
  {
    id: 'larynx',
    name: 'Larynx (Voice Box)',
    system: 'respiratory',
    explanation:
      'The larynx sits at the top of your windpipe and contains your vocal cords, the two stretchy bands that vibrate to make your voice. It also acts as a one-way air valve, closing automatically when you swallow to protect your airway.',
  },
  {
    id: 'trachea',
    name: 'Trachea (Windpipe)',
    system: 'respiratory',
    explanation:
      'The trachea is the sturdy tube that carries air from your throat down into your chest. It is held open by rings of cartilage so it never collapses, even when you twist your neck or take a deep breath.',
  },
  {
    id: 'bronchi',
    name: 'Bronchi & Bronchioles',
    system: 'respiratory',
    explanation:
      'Your trachea splits into two main bronchi, one for each lung, that then branch into smaller and smaller tubes like an upside-down tree. The smallest branches, the bronchioles, end in tiny air sacs where the actual exchange of oxygen and carbon dioxide takes place.',
  },
  {
    id: 'lungs',
    name: 'Lungs',
    system: 'respiratory',
    explanation:
      'Your lungs are two soft, spongy organs in your chest that fill with air when you breathe in. Inside them, oxygen from the air passes into your blood and waste carbon dioxide passes out to be exhaled.',
  },
  {
    id: 'alveoli',
    name: 'Alveoli (Air Sacs)',
    system: 'respiratory',
    explanation:
      'Alveoli are the grape-like clusters of tiny air sacs at the very end of each bronchiole. They are wrapped in microscopic blood vessels so oxygen can jump straight into the blood and carbon dioxide can jump out, in just a fraction of a second.',
  },
  {
    id: 'diaphragm',
    name: 'Diaphragm',
    system: 'respiratory',
    explanation:
      'The diaphragm is a large, dome-shaped muscle that sits underneath your lungs and does most of the work of breathing. When it flattens, your lungs expand and air rushes in; when it relaxes, air flows back out.',
  },
  // ============================================================
  // NERVOUS
  // ============================================================
  {
    id: 'brain',
    name: 'Brain',
    system: 'nervous',
    explanation:
      'Your brain is the control centre of your body, made of billions of nerve cells that think, feel, remember, and decide. It receives information from your senses, tells your muscles what to do, and runs all the automatic systems that keep you alive.',
  },
  {
    id: 'cerebellum',
    name: 'Cerebellum',
    system: 'nervous',
    explanation:
      'The cerebellum is the small, wrinkled part at the back of your brain that controls balance and smooth, coordinated movement. It is what lets you ride a bike, touch your nose with your eyes closed, or dance without thinking about every step.',
  },
  {
    id: 'brainstem',
    name: 'Brainstem',
    system: 'nervous',
    explanation:
      'The brainstem connects your brain to your spinal cord and runs the body\u2019s automatic life-support systems, like breathing, heart rate, and blood pressure. Damage to the brainstem is why it is so dangerous — these are the most basic functions that keep you alive.',
  },
  {
    id: 'spinal-cord',
    name: 'Spinal Cord',
    system: 'nervous',
    explanation:
      'The spinal cord is the long bundle of nerves that runs down the centre of your back, protected by the bones of your spine. It acts as the main highway that carries messages between your brain and the rest of your body, and it can also trigger reflexes on its own.',
  },
  {
    id: 'peripheral-nerves',
    name: 'Peripheral Nerves',
    system: 'nervous',
    explanation:
      'Peripheral nerves are the branching wires that reach out from your spinal cord into every part of your body. They carry signals both ways — sending movement commands out from the brain and bringing sensation back in.',
  },
  // ============================================================
  // DIGESTIVE
  // ============================================================
  {
    id: 'mouth',
    name: 'Mouth & Teeth',
    system: 'digestive',
    explanation:
      'Your mouth is where digestion actually begins — teeth break food into smaller pieces while saliva starts to soften it and digest the starches. Chewing well gives your stomach and intestines a much easier job later.',
  },
  {
    id: 'salivary-glands',
    name: 'Salivary Glands',
    system: 'digestive',
    explanation:
      'Your salivary glands make the watery fluid in your mouth that moistens food so you can swallow it comfortably. Saliva also contains enzymes that begin breaking down starches and antibodies that help defend against germs.',
  },
  {
    id: 'esophagus',
    name: 'Esophagus',
    system: 'digestive',
    explanation:
      'The esophagus is the muscular tube that pushes food from your throat down to your stomach using wave-like contractions called peristalsis. It works whether you are lying down, standing on your head, or in zero gravity.',
  },
  {
    id: 'stomach',
    name: 'Stomach',
    system: 'digestive',
    explanation:
      'Your stomach is a stretchy, muscular pouch that mixes food with strong acid and enzymes to turn it into a thick liquid. The acid kills most germs, and the churning motion helps break food down into something your intestines can absorb.',
  },
  {
    id: 'small-intestine',
    name: 'Small Intestine',
    system: 'digestive',
    explanation:
      'The small intestine is a long, coiled tube where almost all of the nutrients from your food are absorbed into the blood. Its lining is covered in tiny finger-like villi that increase the surface area to about the size of a tennis court.',
  },
  {
    id: 'large-intestine',
    name: 'Large Intestine (Colon)',
    system: 'digestive',
    explanation:
      'The large intestine is the wider tube that takes what is left over after digestion and absorbs the water, salts, and a few vitamins. It packs the waste into stool and stores it until you are ready to go to the bathroom.',
  },
  {
    id: 'rectum',
    name: 'Rectum & Anus',
    system: 'digestive',
    explanation:
      'The rectum is the last stretch of intestine, and it acts as a holding area for stool until your body is ready to pass it. The anus is the muscular opening with two rings of muscle that you can relax to let stool out and tighten to hold it in.',
  },
  {
    id: 'liver',
    name: 'Liver',
    system: 'digestive',
    explanation:
      'Your liver is the body\u2019s biggest internal organ and your main chemical factory — it processes everything you eat and drink, builds important proteins, stores energy, and cleans toxins out of your blood.',
  },
  {
    id: 'gallbladder',
    name: 'Gallbladder',
    system: 'digestive',
    explanation:
      'The gallbladder is a small, pear-shaped pouch that sits under your liver and stores bile, a greenish liquid that helps digest fats. When you eat a fatty meal, it squeezes bile into the small intestine to help break the fat down.',
  },
  {
    id: 'pancreas',
    name: 'Pancreas',
    system: 'digestive',
    explanation:
      'The pancreas is a long, flat gland behind your stomach that does two very different jobs. It makes digestive enzymes that flow into the small intestine, and it also makes insulin and other hormones that control your blood sugar.',
  },
  {
    id: 'appendix',
    name: 'Appendix',
    system: 'digestive',
    explanation:
      'The appendix is a small, finger-shaped pouch attached to the start of your large intestine in the lower right of your belly. It does not seem to do anything essential, but it can become painfully inflamed and need to be removed in an emergency.',
  },
  // ============================================================
  // URINARY
  // ============================================================
  {
    id: 'kidneys',
    name: 'Kidneys',
    system: 'urinary',
    explanation:
      'Your kidneys are two bean-shaped organs in your lower back that filter your blood all day long to remove waste and extra water. They also control blood pressure, balance minerals, and make hormones that tell your body to make red blood cells.',
  },
  {
    id: 'ureters',
    name: 'Ureters',
    system: 'urinary',
    explanation:
      'The ureters are two narrow tubes that carry urine from the kidneys down to the bladder. They use gentle muscle contractions to push the urine along, no matter what position your body is in.',
  },
  {
    id: 'bladder',
    name: 'Bladder',
    system: 'urinary',
    explanation:
      'Your bladder is a stretchy, balloon-like muscle that stores urine until you are ready to go to the bathroom. It can usually hold about a cup and a half of fluid, and its stretch receptors tell your brain when it is getting full.',
  },
  {
    id: 'urethra',
    name: 'Urethra',
    system: 'urinary',
    explanation:
      'The urethra is the tube that carries urine from the bladder out of your body. In women it is short, and in men it is longer and also carries semen during ejaculation.',
  },
  // ============================================================
  // REPRODUCTIVE (anatomical reference)
  // ============================================================
  {
    id: 'ovaries',
    name: 'Ovaries',
    system: 'reproductive',
    explanation:
      'The ovaries are two small, almond-shaped glands on either side of the uterus that store a lifetime supply of eggs. They also make the hormones estrogen and progesterone that control the menstrual cycle and support pregnancy.',
  },
  {
    id: 'uterus',
    name: 'Uterus (Womb)',
    system: 'reproductive',
    explanation:
      'The uterus is a hollow, pear-shaped muscle where a fertilized egg implants and a baby grows during pregnancy. Every month its lining thickens with blood and then sheds as a period if there is no pregnancy.',
  },
  {
    id: 'fallopian-tubes',
    name: 'Fallopian Tubes',
    system: 'reproductive',
    explanation:
      'The fallopian tubes are two narrow passages that connect each ovary to the uterus, and they are where fertilization usually happens. Tiny hair-like cilia inside them help move the egg down toward the uterus.',
  },
  {
    id: 'vagina',
    name: 'Vagina',
    system: 'reproductive',
    explanation:
      'The vagina is the muscular canal that connects the uterus to the outside of the body. It is the birth canal during delivery, allows menstrual blood to leave the body, and is the passage for sexual intercourse.',
  },
  {
    id: 'testes',
    name: 'Testes',
    system: 'reproductive',
    explanation:
      'The testes are two oval glands held in the scrotum that produce sperm and the hormone testosterone. They hang outside the body because sperm need a slightly cooler temperature than core body temperature to develop normally.',
  },
  {
    id: 'epididymis',
    name: 'Epididymis',
    system: 'reproductive',
    explanation:
      'The epididymis is the long, coiled tube at the back of each testicle where sperm mature and are stored. From there, sperm travel up through the vas deferens during ejaculation.',
  },
  {
    id: 'prostate',
    name: 'Prostate',
    system: 'reproductive',
    explanation:
      'The prostate is a walnut-sized gland just below the bladder that adds nutrient fluid to sperm to make up part of semen. As men age, it often enlarges and can cause trouble with urination, which is why screening matters.',
  },
  {
    id: 'penis',
    name: 'Penis',
    system: 'reproductive',
    explanation:
      'The penis is the external male organ that carries both urine and semen out of the body. It becomes firm during sexual arousal because its spongy tissues fill with blood.',
  },
  // ============================================================
  // ENDOCRINE
  // ============================================================
  {
    id: 'pituitary',
    name: 'Pituitary Gland',
    system: 'endocrine',
    explanation:
      'The pituitary is a pea-sized gland at the base of your brain often called the "master gland" because it controls most of the other hormone glands. It releases hormones that govern growth, stress response, reproduction, and water balance.',
  },
  {
    id: 'thyroid',
    name: 'Thyroid Gland',
    system: 'endocrine',
    explanation:
      'Your thyroid is a butterfly-shaped gland in your neck that sets the speed of your body\u2019s metabolism. It releases hormones that tell every cell how quickly to use energy, which affects your heart rate, weight, mood, and temperature.',
  },
  {
    id: 'parathyroids',
    name: 'Parathyroid Glands',
    system: 'endocrine',
    explanation:
      'The four tiny parathyroid glands sit behind your thyroid and control the level of calcium in your blood. Calcium is essential for strong bones, healthy nerves, and a steady heartbeat.',
  },
  {
    id: 'adrenals',
    name: 'Adrenal Glands',
    system: 'endocrine',
    explanation:
      'The adrenal glands sit like little caps on top of each kidney and release hormones that help you respond to stress. Cortisol manages long-term stress and metabolism, while adrenaline gives you the sudden burst of energy needed in a fight-or-flight moment.',
  },
  {
    id: 'pineal',
    name: 'Pineal Gland',
    system: 'endocrine',
    explanation:
      'The pineal gland is a tiny structure deep in the centre of your brain that makes melatonin, the hormone that tells your body when it is time to sleep. Bright light at night and screen time close to bed can suppress it and disturb your sleep.',
  },
  // ============================================================
  // MUSCULOSKELETAL
  // ============================================================
  {
    id: 'bones',
    name: 'Bones (Skeleton)',
    system: 'musculoskeletal',
    explanation:
      'Your 206 bones give your body its shape and protect your soft organs — the skull shields the brain and the rib cage wraps around the heart and lungs. They also store calcium and produce new blood cells in their inner marrow.',
  },
  {
    id: 'joints',
    name: 'Joints',
    system: 'musculoskeletal',
    explanation:
      'Joints are the places where two bones meet, and they are what let you bend, twist, and walk. Cartilage cushions the bone ends, and synovial fluid inside the joint keeps everything moving smoothly.',
  },
  {
    id: 'muscles',
    name: 'Skeletal Muscles',
    system: 'musculoskeletal',
    explanation:
      'Skeletal muscles are the voluntary muscles you control to move your arms, legs, face, and body. They attach to bones through tendons, and they work in pairs — one relaxes while the other contracts to create smooth movement.',
  },
  {
    id: 'tendons',
    name: 'Tendons',
    system: 'musculoskeletal',
    explanation:
      'Tendons are tough, rope-like cords that connect muscle to bone so your movements are powerful and precise. They are strong but not very stretchy, which is why sudden injuries can tear them.',
  },
  {
    id: 'ligaments',
    name: 'Ligaments',
    system: 'musculoskeletal',
    explanation:
      'Ligaments are tough bands that connect bone to bone and hold your joints stable. They keep your knee from bending sideways and your ankle from rolling, but they can stretch or tear with a bad sprain.',
  },
  {
    id: 'cartilage',
    name: 'Cartilage',
    system: 'musculoskeletal',
    explanation:
      'Cartilage is the smooth, rubbery cushion that covers the ends of bones inside joints and stops them from grinding together. It does not have its own blood supply, so it heals slowly when injured.',
  },
  // ============================================================
  // INTEGUMENTARY
  // ============================================================
  {
    id: 'skin',
    name: 'Skin',
    system: 'integumentary',
    explanation:
      'Your skin is the largest organ in your body and your main barrier against the outside world. It keeps germs out, water in, helps control temperature, and makes vitamin D when sunlight hits it.',
  },
  {
    id: 'hair',
    name: 'Hair & Hair Follicles',
    system: 'integumentary',
    explanation:
      'Each hair on your body grows out of a tiny pocket in the skin called a follicle. Hair helps with warmth, sensation, and protection — eyebrows keep sweat out of your eyes, and nose hairs filter the air you breathe.',
  },
  {
    id: 'nails',
    name: 'Nails',
    system: 'integumentary',
    explanation:
      'Your fingernails and toenails are made of a hard protein called keratin that protects the sensitive tips of your fingers and toes. They grow from the matrix at the base, and their appearance can sometimes give clues about your overall health.',
  },
  {
    id: 'sweat-glands',
    name: 'Sweat Glands',
    system: 'integumentary',
    explanation:
      'Sweat glands are tiny coiled tubes in your skin that release watery sweat when you are hot or stressed. As sweat evaporates off your skin, it cools you down and helps regulate body temperature.',
  },
  {
    id: 'sebaceous-glands',
    name: 'Sebaceous (Oil) Glands',
    system: 'integumentary',
    explanation:
      'Sebaceous glands are small glands attached to each hair follicle that release an oily substance called sebum. Sebum keeps skin and hair soft and waterproof, but too much of it can lead to oily skin or acne.',
  },
  // ============================================================
  // LYMPHATIC / IMMUNE
  // ============================================================
  {
    id: 'spleen',
    name: 'Spleen',
    system: 'lymphatic',
    explanation:
      'Your spleen sits under your left ribs and acts like a recycling centre for old red blood cells. It is also part of your immune system, filtering blood and helping your body recognize and fight germs.',
  },
  {
    id: 'lymph-nodes',
    name: 'Lymph Nodes',
    system: 'lymphatic',
    explanation:
      'Lymph nodes are small, bean-shaped filters scattered along the lymphatic vessels in your neck, armpits, groin, and elsewhere. They trap bacteria, viruses, and cancer cells and house immune cells that mount a defence when something harmful is found.',
  },
  {
    id: 'thymus',
    name: 'Thymus',
    system: 'immune',
    explanation:
      'The thymus is a small gland behind your breastbone that is most active in childhood and shrinks after puberty. It is the "school" where young T-cells learn to recognize germs and to ignore your own tissues.',
  },
  {
    id: 'tonsils',
    name: 'Tonsils & Adenoids',
    system: 'lymphatic',
    explanation:
      'Your tonsils and adenoids are patches of immune tissue at the back of your throat that help catch germs you breathe in or swallow. They often swell when you have a throat infection, and in children they can sometimes be large enough to need removal.',
  },
  {
    id: 'bone-marrow',
    name: 'Bone Marrow',
    system: 'hematologic',
    explanation:
      'Bone marrow is the spongy tissue inside your larger bones that produces billions of new blood cells every day. Red blood cells carry oxygen, white blood cells fight infection, and platelets stop bleeding — all made here.',
  },
  // ============================================================
  // SENSORY
  // ============================================================
  {
    id: 'eyes',
    name: 'Eyes',
    system: 'sensory',
    explanation:
      'Your eyes are like small cameras that focus light onto the retina at the back of the eyeball. The retina turns that light into nerve signals that the brain interprets as the images you see.',
  },
  {
    id: 'ears',
    name: 'Ears',
    system: 'sensory',
    explanation:
      'Your ears do two jobs — they capture sound waves for hearing, and the inner part helps you keep your balance. Tiny hair cells inside the cochlea turn vibrations into nerve signals that the brain understands as sound.',
  },
  {
    id: 'tongue',
    name: 'Tongue',
    system: 'sensory',
    explanation:
      'Your tongue is a muscular organ that helps you chew, swallow, and talk, and its surface is covered in taste buds that detect sweet, salty, sour, bitter, and savoury flavours. It also sends information to the brain about texture and temperature.',
  },
  {
    id: 'skin-receptors',
    name: 'Skin Receptors',
    system: 'sensory',
    explanation:
      'Special nerve endings in your skin let you feel touch, pressure, pain, heat, and cold. They protect you by warning you when something is too hot, sharp, or sharp-edged before serious damage happens.',
  },
];

export const organSystems: { id: OrganSystem; label: string }[] = [
  { id: 'cardiovascular', label: 'Heart & blood vessels' },
  { id: 'respiratory', label: 'Lungs & breathing' },
  { id: 'nervous', label: 'Brain & nerves' },
  { id: 'digestive', label: 'Digestion' },
  { id: 'urinary', label: 'Kidneys & bladder' },
  { id: 'reproductive', label: 'Reproductive' },
  { id: 'endocrine', label: 'Hormones (endocrine)' },
  { id: 'musculoskeletal', label: 'Bones & muscles' },
  { id: 'integumentary', label: 'Skin, hair, nails' },
  { id: 'lymphatic', label: 'Lymphatic' },
  { id: 'immune', label: 'Immune' },
  { id: 'sensory', label: 'Senses' },
  { id: 'hematologic', label: 'Blood & marrow' },
];
