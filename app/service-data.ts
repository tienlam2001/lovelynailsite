type MenuItem = [service: string, price: string, description?: string];

type MenuSection = {
  title: string;
  note: string;
  featured?: boolean;
  items: MenuItem[];
};


export const menuSections: MenuSection[] = [
  {
    title: "Pedicures",
    note: "Relaxing foot care with soaking, grooming, exfoliation, massage, and hot towels.",
    featured: true,
    items: [
      [
        "Classic Pedicure",
        "$33",
        "Spa soak, nail shaping & cuticle care, light scrub, lotion, relaxing massage, hot towel.",
      ],
      [
        "Premium Pedicure",
        "$40",
        "Classic pedicure care, sugar scrub, callus removal, lotion, extended massage, hot towel.",
      ],
      [
        "Deluxe Pedicure",
        "$47",
        "Premium pedicure care, hydrating mask, 2 hot towels, longer massage.",
      ],
      [
        "Collagen Pedicure",
        "$55",
        "Deluxe pedicure care, collagen treatment, paraffin treatment, 3 hot towels, extended spa massage, choice of scent: Jasmine or Pearl.",
      ],
      [
        "Hurricane Spa Pedicure",
        "$65",
        "Full spa treatment, sugar scrub, callus removal, hydrating mask, paraffin treatment, hot stone massage, longer spa massage, hot towel treatment, choice of scent: Jasmine, Gold, or Pearl.",
      ],
      [
        "Golden Pedicure",
        "$85",
        "Premium golden spa treatment, sugar scrub, callus removal, hydrating mask, paraffin treatment, hot stone massage, steamer treatment, longest luxury massage, hot towel treatment.",
      ],
    ],
  },
  {
    title: "Acrylic",
    note: "Regular polish or gel polish acrylic sets and fills.",
    featured: true,
    items: [
      ["Full Set — Regular Polish", "$45"],
      ["Fill-In — Regular Polish", "$40"],
      ["Full Set — Gel Polish", "$55"],
      ["Fill-In — Gel Polish", "$50"],
      ["Coffin / Almond / Stiletto / Specialty Shape", "+$7"],
      ["Extra Length", "+$5"],
      ["Acrylic Toe", "$8"],
      ["2 Acrylic Toes", "$15"],
    ],
  },
  {
    title: "Liquid Gel — Non-Acrylic",
    note: "Non-acrylic gel enhancements and repairs.",
    items: [
      ["Full Set", "$60"],
      ["Fill-In", "$55"],
      ["Nail Repair", "$5"],
      ["Extra Length", "+$5"],
    ],
  },
  {
    title: "Gel-X",
    note: "Lightweight full-cover gel extensions.",
    items: [
      ["Full Set", "$60+"],
      ["Extra Length", "+$5"],
    ],
  },
  {
    title: "Dipping Powder",
    note: "Powder color sets, pink & white, and shaped finishes.",
    items: [
      ["Full Set Color", "$45"],
      ["Full Set Pink & White", "$52"],
      ["Coffin / Almond / Stiletto / Specialty Shape", "+$7"],
      ["Extra Length", "+$5"],
    ],
  },
  {
    title: "Manicure",
    note: "Classic grooming, shaping, massage, and polish options.",
    items: [
      ["Regular Manicure", "$25"],
      ["Gel Color Polish", "$25"],
      ["Gel Removal", "+$5"],
      ["Gel Color & Manicure", "$35"],
    ],
  },
  {
    title: "Polish Change",
    note: "Quick polish refreshes for hands or feet.",
    items: [
      ["Feet — Regular Polish", "$15"],
      ["Feet — Gel Polish", "$25"],
      ["Feet — Gel Removal + New Gel Polish", "$30"],
      ["Hands — Regular Polish", "$15"],
      ["Hands — Gel Polish", "$20"],
      ["Hands — Gel Removal + New Gel Polish", "$25"],
      ["French Add-On", "+$5"],
    ],
  },
  {
    title: "Little Ones",
    note: "For children 10 years old or younger.",
    items: [
      ["Manicure", "$17"],
      ["Pedicure", "$27"],
      ["Polish Change — Hands", "$12"],
      ["Polish Change — Feet", "$15"],
      ["Gel Manicure", "$27"],
      ["Gel Pedicure", "$37"],
      ["Gel Polish — Hands", "$15"],
      ["Gel Polish — Feet", "$18"],
    ],
  },
  {
    title: "Removal & Repair",
    note: "Safe removal and simple nail repair services.",
    items: [
      ["Acrylic Soak-Off Only", "$15"],
      ["Acrylic or Gel Removal with New Service", "+$10"],
      ["Nail Repair", "$5+"],
    ],
  },
  {
    title: "Nail Design",
    note: "Custom nail art and design pricing varies by request.",
    items: [["Custom Nail Design", "Price Varies", "Please ask your nail technician for pricing."]],
  },
  {
    title: "Waxing",
    note: "Hair removal with soothing honey wax.",
    items: [
      ["Eyebrows", "$12"],
      ["Lips", "$10"],
      ["Chin", "$10+"],
      ["Full Face", "$35"],
      ["Underarms", "$20+"],
      ["Full Arms", "$35"],
      ["Half Arms", "$25"],
      ["Full Legs", "$50+"],
      ["Half Legs", "$30"],
      ["Back", "$50+"],
    ],
  },
];

export const servicePages = [
  { slug: "pedicures", title: "Pedicures", sections: ["Pedicures"], intro: "Choose a pedicure in Winter Garden at Lovely Nail & Spa, from classic foot care to spa treatments with paraffin and hot stones. Compare the included steps and prices below before booking.", tips: "Our pedicure menu lists the care included in each treatment. Ask your technician about polish choices, removal, and any requested additions before your service starts." },
  { slug: "gel-x", title: "Gel-X Nails", sections: ["Gel-X", "Removal & Repair"], intro: "Explore lightweight, full-cover gel extensions at Lovely Nail & Spa on Daniels Road in Winter Garden. Bring a photo of your preferred shape or design and discuss length and finish with your technician.", tips: "Gel-X pricing starts at the amount shown below. Extra length and custom art may change the final price. If you already have extensions, mention removal when booking." },
  { slug: "acrylic-nails", title: "Acrylic Nails", sections: ["Acrylic", "Removal & Repair"], intro: "Book acrylic full sets and fill-ins in Winter Garden with regular or gel polish. Compare our current menu, shape options, and additions before choosing your next look.", tips: "Tell your technician whether you need a new set or fill-in. Specialty shapes, extra length, and designs may cost extra; confirm your choices and total before starting." },
  { slug: "manicures", title: "Manicures", sections: ["Manicure", "Polish Change"], intro: "Visit Lovely Nail & Spa in Winter Garden for classic manicures, gel color, and polish changes. Choose grooming and polish together or a quick color refresh from the menu below.", tips: "A polish change and a full manicure are different services. Check the menu and tell us if you have existing gel that needs removal so we can help you choose." },
];
