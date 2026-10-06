export interface Product {
  id: string;
  name: string;
  category: 'Tea' | 'Spices' | 'Papad';
  brand: 'Mr. SWADFUL' | 'Mr. CUP';
  image: string;
  short: string;
  description: string;
  highlights: string[];
  specs: {
    packagingSizes: string[];
    shelfLife: string;
    origin: string;
    ingredients: string;
  };
  flavorProfile: {
    aroma: number; // 1-10
    strength: number; // 1-10
    color: number; // 1-10
    flavor: number; // 1-10
  };
  wholesalePriceTier: {
    moq: string; // e.g. "50 kg"
    basePricePerKg: number;
    bulkDiscount50: number; // percentage
    bulkDiscount200: number; // percentage
  };
  rating: number;
  reviewCount: number;
  isBestseller?: boolean;
}

export const PRODUCTS: Product[] = [
  {
    id: "premium-family-mix-tea",
    name: "Premium Family Mix Tea",
    category: "Tea",
    brand: "Mr. SWADFUL",
    image: "/assets/premium-family-mix-tea.png",
    short: "Rich family blend, highly aromatic and full-bodied classic chai.",
    description: "A meticulously crafted blend of hand-picked upper Assam CTC leaf and fragrant Nilgiri tea leaves. Specially developed for Indian households who demand a rich, aromatic morning cup with the perfect deep reddish-amber hue when brewed with fresh milk and traditional spices.",
    highlights: [
      "100% Hand-picked Assam & Nilgiri blend",
      "Rich malty aroma with strong body",
      "Performs exceptionally with milk & cardamom",
      "Vacuum-sealed freshness protection"
    ],
    specs: {
      packagingSizes: ["250g", "500g", "1kg", "5kg Bulk Pouch"],
      shelfLife: "12 Months from packaging",
      origin: "Assam & Nilgiri Tea Estates, India",
      ingredients: "100% Pure Black CTC Tea Leaves & Orthodox Dust Blend"
    },
    flavorProfile: {
      aroma: 9,
      strength: 9,
      color: 10,
      flavor: 9
    },
    wholesalePriceTier: {
      moq: "25 kg",
      basePricePerKg: 380,
      bulkDiscount50: 8,
      bulkDiscount200: 15
    },
    rating: 4.9,
    reviewCount: 142,
    isBestseller: true
  },
  {
    id: "perfect-family-mix-tea",
    name: "Perfect Family Mix Tea",
    category: "Tea",
    brand: "Mr. SWADFUL",
    image: "/assets/perfect-family-mix-tea.png",
    short: "Everyday comforting chai — smooth taste, rich warm color.",
    description: "Our signature daily blend crafted for smooth taste, consistent strength, and comforting warmth. Designed for daily morning and evening tea sessions with family or workplace tea breaks.",
    highlights: [
      "Smooth & balanced flavor note",
      "Deep golden-brown brew color",
      "Ideal for daily family consumption",
      "Great value for money premium quality"
    ],
    specs: {
      packagingSizes: ["250g", "500g", "1kg"],
      shelfLife: "12 Months",
      origin: "Assam Estates",
      ingredients: "Pure Select CTC Tea Granules"
    },
    flavorProfile: {
      aroma: 8,
      strength: 8,
      color: 9,
      flavor: 8
    },
    wholesalePriceTier: {
      moq: "25 kg",
      basePricePerKg: 340,
      bulkDiscount50: 7,
      bulkDiscount200: 12
    },
    rating: 4.8,
    reviewCount: 98,
    isBestseller: true
  },
  {
    id: "strong-dust-tea",
    name: "Strong Dust Tea",
    category: "Tea",
    brand: "Mr. SWADFUL",
    image: "/assets/strong-dust-tea.png",
    short: "Bold, kadak dust tea for instant strong cutting chai.",
    description: "Fine-grade dust tea brewed for maximum strength in minimum time. Essential for roadside cutting-chai vendors, dhabas, and lovers of thick, energetic, highly refreshing kadak chai.",
    highlights: [
      "Instant quick infusion & intense color",
      "Maximum kadak punch for morning energy",
      "High yield per kilogram",
      "Popular choice for canteens & tea stalls"
    ],
    specs: {
      packagingSizes: ["500g", "1kg", "10kg Bag"],
      shelfLife: "12 Months",
      origin: "Dooars & Assam Estates",
      ingredients: "100% Fine CTC Dust Tea"
    },
    flavorProfile: {
      aroma: 7,
      strength: 10,
      color: 10,
      flavor: 8
    },
    wholesalePriceTier: {
      moq: "50 kg",
      basePricePerKg: 290,
      bulkDiscount50: 10,
      bulkDiscount200: 18
    },
    rating: 4.9,
    reviewCount: 210,
    isBestseller: true
  },
  {
    id: "premium-ctc-tea",
    name: "Premium CTC Tea",
    category: "Tea",
    brand: "Mr. SWADFUL",
    image: "/assets/premium-ctc-tea.png",
    short: "High-grade CTC granules — brisk, strong & vibrant.",
    description: "Selected uniform CTC granules cut with precision to release intense flavor, brisk body, and a vibrant reddish brew. Perfect for gifting and premium hotel tea services.",
    highlights: [
      "Uniform grain size & zero dust ratio",
      "Brisk, energetic tea liquor",
      "Premium foil packaging",
      "Consistent flavor profile year-round"
    ],
    specs: {
      packagingSizes: ["250g", "500g", "1kg"],
      shelfLife: "12 Months",
      origin: "Upper Assam Gardens",
      ingredients: "100% Grade BP/BOPSM CTC Tea"
    },
    flavorProfile: {
      aroma: 9,
      strength: 9,
      color: 9,
      flavor: 9
    },
    wholesalePriceTier: {
      moq: "25 kg",
      basePricePerKg: 410,
      bulkDiscount50: 8,
      bulkDiscount200: 15
    },
    rating: 4.7,
    reviewCount: 76
  },
  {
    id: "mr-cup-bag",
    name: "Mr. Cup Bag",
    category: "Tea",
    brand: "Mr. CUP",
    image: "/assets/mr-cup-bag.png",
    short: "Commercial bulk bag for tea shops, canteens & catering.",
    description: "High-mileage bulk packaging specifically engineered for commercial tea stalls, hotel kitchens, corporate canteens, and large-scale caterers.",
    highlights: [
      "Commercial heavy-duty bulk bag",
      "Maximum cups per kg yield",
      "Cost-effective commercial rate",
      "Consistent taste profile across batches"
    ],
    specs: {
      packagingSizes: ["5kg Bag", "15kg Commercial Sack"],
      shelfLife: "12 Months",
      origin: "Assam Commercial Blends",
      ingredients: "Commercial CTC Tea Granules & Dust Blend"
    },
    flavorProfile: {
      aroma: 7,
      strength: 9,
      color: 9,
      flavor: 8
    },
    wholesalePriceTier: {
      moq: "50 kg",
      basePricePerKg: 260,
      bulkDiscount50: 10,
      bulkDiscount200: 20
    },
    rating: 4.8,
    reviewCount: 165
  },
  {
    id: "mr-cup-pack",
    name: "Mr. Cup Pack",
    category: "Tea",
    brand: "Mr. CUP",
    image: "/assets/mr-cup-pack.png",
    short: "Retail-ready household pack under the trusted Mr. CUP brand.",
    description: "Affordable, high-quality household chai pack brought to you under the popular Mr. CUP line. Delivers rich taste and pleasant aroma at budget-friendly consumer pricing.",
    highlights: [
      "Popular retail price point",
      "Triple moisture-proof barrier",
      "Rich color with standard milk ratio",
      "Family favorite across Maharashtra"
    ],
    specs: {
      packagingSizes: ["100g", "250g", "500g"],
      shelfLife: "12 Months",
      origin: "Assam Blend",
      ingredients: "Pure CTC Tea"
    },
    flavorProfile: {
      aroma: 8,
      strength: 8,
      color: 8,
      flavor: 8
    },
    wholesalePriceTier: {
      moq: "25 kg",
      basePricePerKg: 280,
      bulkDiscount50: 7,
      bulkDiscount200: 14
    },
    rating: 4.6,
    reviewCount: 88
  },
  {
    id: "red-chilli-powder",
    name: "Red Chilli Powder",
    category: "Spices",
    brand: "Mr. SWADFUL",
    image: "/assets/red-chilli-powder.png",
    short: "Vibrant natural red, freshly ground sun-dried chillies.",
    description: "Sourced from top sun-dried red chilli farms, stemless cleaned, and cold-ground in traditional mills to preserve natural capsaicin oils and brilliant crimson color without artificial dyes.",
    highlights: [
      "Zero added color, 100% natural red",
      "Cold-ground to retain essential spice oils",
      "Balanced heat & rich pungency",
      "Stemless clean processing"
    ],
    specs: {
      packagingSizes: ["100g", "200g", "500g", "1kg", "5kg Wholesale"],
      shelfLife: "9 Months from packing",
      origin: "Guntur & Byadgi Farms",
      ingredients: "100% Ground Red Chillies"
    },
    flavorProfile: {
      aroma: 9,
      strength: 9,
      color: 10,
      flavor: 10
    },
    wholesalePriceTier: {
      moq: "20 kg",
      basePricePerKg: 320,
      bulkDiscount50: 8,
      bulkDiscount200: 16
    },
    rating: 4.9,
    reviewCount: 184,
    isBestseller: true
  },
  {
    id: "turmeric-powder",
    name: "Turmeric Powder",
    category: "Spices",
    brand: "Mr. SWADFUL",
    image: "/assets/turmeric-powder.png",
    short: "High-curcumin golden turmeric, earthy & highly aromatic.",
    description: "Prime quality turmeric fingers polished, cleaned, and ground into fine golden powder. High curcumin content ensures vibrant immunity-boosting wellness and authentic Indian yellow curry depth.",
    highlights: [
      "High natural Curcumin content (>3.5%)",
      "Rich golden yellow color & warm aroma",
      "Hygienically stone-milled",
      "Ideal for cooking & golden milk"
    ],
    specs: {
      packagingSizes: ["100g", "250g", "500g", "1kg", "5kg Wholesale"],
      shelfLife: "12 Months",
      origin: "Sangli & Nizamabad Turmeric Belts",
      ingredients: "100% Pure Turmeric Root Powder"
    },
    flavorProfile: {
      aroma: 9,
      strength: 8,
      color: 10,
      flavor: 9
    },
    wholesalePriceTier: {
      moq: "20 kg",
      basePricePerKg: 240,
      bulkDiscount50: 8,
      bulkDiscount200: 15
    },
    rating: 4.9,
    reviewCount: 150
  },
  {
    id: "coriander-powder",
    name: "Coriander Powder",
    category: "Spices",
    brand: "Mr. SWADFUL",
    image: "/assets/coriander-powder.png",
    short: "Fragrant roasted coriander (Dhaniya), freshly ground.",
    description: "Whole green coriander seeds lightly roasted and freshly ground to capture citrusy, sweet floral notes that enhance gravy textures and curry aroma.",
    highlights: [
      "Lightly roasted before milling for rich aroma",
      "Citrus-forward fresh taste profile",
      "Coarse texture for thick rich gravies",
      "100% pure with zero husk filling"
    ],
    specs: {
      packagingSizes: ["100g", "250g", "500g", "1kg"],
      shelfLife: "9 Months",
      origin: "Rajasthan Coriander Fields",
      ingredients: "100% Ground Roasted Coriander Seeds"
    },
    flavorProfile: {
      aroma: 10,
      strength: 7,
      color: 8,
      flavor: 9
    },
    wholesalePriceTier: {
      moq: "20 kg",
      basePricePerKg: 210,
      bulkDiscount50: 7,
      bulkDiscount200: 14
    },
    rating: 4.8,
    reviewCount: 112
  },
  {
    id: "elaichi-cardamom",
    name: "Elaichi (Cardamom)",
    category: "Spices",
    brand: "Mr. SWADFUL",
    image: "/assets/elaichi-cardamom.png",
    short: "Whole green cardamom pods — Queen of Spices for chai & sweets.",
    description: "Handpicked 8mm+ jumbo green cardamom pods sourced from Idukki, Kerala. Packed with sweet volatile oils, intense floral aroma, and pristine green pods for luxury tea and authentic mithai.",
    highlights: [
      "Jumbo 8mm green pod grade",
      "Rich essential oil content & intense aroma",
      "Handpicked & sun-dried in Kerala hills",
      "Resealable freshness lock pouch"
    ],
    specs: {
      packagingSizes: ["50g", "100g", "250g", "1kg Wholesale Box"],
      shelfLife: "18 Months",
      origin: "Idukki, Kerala",
      ingredients: "100% Whole Green Elaichi (Cardamom Pods)"
    },
    flavorProfile: {
      aroma: 10,
      strength: 9,
      color: 8,
      flavor: 10
    },
    wholesalePriceTier: {
      moq: "5 kg",
      basePricePerKg: 3200,
      bulkDiscount50: 5,
      bulkDiscount200: 12
    },
    rating: 5.0,
    reviewCount: 95
  },
  {
    id: "special-udad-papad",
    name: "Special Urad Papad",
    category: "Papad",
    brand: "Mr. SWADFUL",
    image: "/assets/special-urad-papad.png",
    short: "Crisp traditional urad papad with asafoetida & black pepper hint.",
    description: "Handcrafted in small batches using premium Urad dal flour, pure Sajji khar, hing (asafoetida), and crushed black pepper. Puffs up ultra-light, delightfully crunchy, and melts in the mouth with authentic Maharashtrian taste.",
    highlights: [
      "Traditional handmade small-batch recipe",
      "Crisp light bite with zero oiliness",
      "Subtle black pepper & hing flavor",
      "Perfect meal companion or roasted starter"
    ],
    specs: {
      packagingSizes: ["200g", "400g", "1kg Bulk Pack"],
      shelfLife: "6 Months",
      origin: "Dhule Manufacturing Unit, Maharashtra",
      ingredients: "Urad Dal Flour, Black Pepper, Asafoetida (Hing), Salt, Edible Vegetable Oil, Sajji Khar"
    },
    flavorProfile: {
      aroma: 9,
      strength: 8,
      color: 8,
      flavor: 10
    },
    wholesalePriceTier: {
      moq: "25 kg",
      basePricePerKg: 220,
      bulkDiscount50: 8,
      bulkDiscount200: 15
    },
    rating: 4.9,
    reviewCount: 204,
    isBestseller: true
  }
];

export const COMPANY_INFO = {
  name: "Mr. Swadful Foods",
  tagline: "Premium Tea, Spices & Papad from Dhule, Maharashtra since 2011",
  foundedYear: 2011,
  address: {
    line1: "Plot no. 76, Vadjai Rd",
    line2: "Millat Nagar, Vaibhav Nagar",
    city: "Dhule",
    state: "Maharashtra",
    pincode: "424001",
    country: "India"
  },
  contact: {
    phonePrimary: "+91 99756 09708",
    phoneSecondary: "+91 95187 05722",
    whatsapp: "+919975609708",
    email: "info@swadfulfoods.com",
    salesEmail: "wholesale@swadfulfoods.com"
  },
  businessHours: [
    { days: "Monday – Saturday", time: "9:00 AM – 7:00 PM" },
    { days: "Sunday", time: "11:00 AM – 4:00 PM" }
  ],
  stats: [
    { label: "Years of Culinary Excellence", value: 15, suffix: "+" },
    { label: "Satisfied Wholesale Partners", value: 2500, suffix: "+" },
    { label: "Kilograms Processed Daily", value: 10, suffix: " T+" },
    { label: "Quality Checks Per Batch", value: 18, suffix: " Points" }
  ],
  certifications: [
    "FSSAI Certified (Lic No: 11521019000452)",
    "ISO 22000 Food Safety Standards",
    "100% Pure & Untouched Packaging",
    "Zero Artificial Color Guarantee"
  ]
};
