import { RemodelCategory, AdditionalService, AISuggestionResult } from "../types";

export const REMODEL_CATEGORIES: RemodelCategory[] = [
  {
    id: "cabinets",
    name: "Cabinets",
    description: "The primary visual and storage backbone of your kitchen.",
    iconName: "FolderHeart",
    options: [
      {
        id: "keep-existing",
        name: "Keep Existing",
        description: "Retain your current cabinets in their present condition. Best for minor updates or if they are already in excellent shape.",
        materialCost: 0,
        laborCost: 0,
        overhead: 0,
        durationDays: 0,
      },
      {
        id: "repaint",
        name: "Repaint / Reface",
        description: "Professionally sand, prime, and repaint existing cabinet boxes and doors, or replace doors while keeping structure. Offers a brand new look on a budget.",
        materialCost: 650,
        laborCost: 1800,
        overhead: 350,
        durationDays: 4,
      },
      {
        id: "stock",
        name: "Stock Cabinets",
        description: "Pre-fabricated, mass-produced cabinets in standard sizes and styles. Highly affordable with quick lead times, though options are limited.",
        materialCost: 3800,
        laborCost: 2200,
        overhead: 800,
        durationDays: 6,
      },
      {
        id: "semi-custom",
        name: "Semi-Custom Cabinets",
        description: "Built to order using standard sizes, but with adjustments for depth, door style, and custom storage inserts. Balance of flexibility and value.",
        materialCost: 7800,
        laborCost: 3500,
        overhead: 1600,
        durationDays: 9,
      },
      {
        id: "custom",
        name: "Custom Cabinets",
        description: "Tailor-made from scratch to your kitchen's exact footprint. Premium solid hardwoods, soft-close hardware, and bespoke organization. High-end selection.",
        materialCost: 15500,
        laborCost: 6500,
        overhead: 3200,
        durationDays: 14,
        isPremium: true,
      },
    ],
  },
  {
    id: "countertops",
    name: "Countertops",
    description: "Your primary work surface. Combines beauty with high durability.",
    iconName: "Grid",
    options: [
      {
        id: "keep-existing",
        name: "Keep Existing",
        description: "Retain your current countertops in their present condition. Best for minor updates or if they are already in excellent shape.",
        materialCost: 0,
        laborCost: 0,
        overhead: 0,
        durationDays: 0,
      },
      {
        id: "laminate",
        name: "Laminate",
        description: "Layered plastic bonded to a particleboard core. Affordable, lightweight, available in thousands of colors, but susceptible to heat and scratches.",
        materialCost: 600,
        laborCost: 550,
        overhead: 150,
        durationDays: 2,
      },
      {
        id: "butcher-block",
        name: "Butcher Block (Wood)",
        description: "Warm, natural wood strips bonded together. Requires periodic oiling to prevent water damage, but can be sanded down if scratched or stained.",
        materialCost: 1600,
        laborCost: 1100,
        overhead: 400,
        durationDays: 3,
      },
      {
        id: "quartz",
        name: "Engineered Quartz",
        description: "Crushed stone mixed with resin. Extremely non-porous, highly resistant to staining, scratching, and heat. Virtually maintenance-free.",
        materialCost: 4600,
        laborCost: 1600,
        overhead: 800,
        durationDays: 3,
      },
      {
        id: "granite",
        name: "Natural Granite",
        description: "Stunning natural stone slabs, sliced straight from quarries. Unique natural veining, highly durable, but requires periodic sealing to stay waterproof.",
        materialCost: 5400,
        laborCost: 1900,
        overhead: 950,
        durationDays: 4,
      },
      {
        id: "marble",
        name: "Premium Marble",
        description: "The ultimate luxury statement. Exquisite veining, ultra-premium look. Highly porous and prone to etching from acids, requiring careful maintenance.",
        materialCost: 8800,
        laborCost: 2600,
        overhead: 1600,
        durationDays: 5,
        isPremium: true,
      },
    ],
  },
  {
    id: "flooring",
    name: "Flooring",
    description: "Heavy traffic requires resilient materials that set the tone.",
    iconName: "Layers",
    options: [
      {
        id: "keep-existing",
        name: "Keep Existing",
        description: "Retain your current flooring in its present condition. Best for minor updates or if it is already in excellent shape.",
        materialCost: 0,
        laborCost: 0,
        overhead: 0,
        durationDays: 0,
      },
      {
        id: "vinyl",
        name: "Luxury Vinyl Plank (LVP)",
        description: "100% waterproof synthetic flooring that realistically mimics hardwood. Soft underfoot, scratch-resistant, and perfect for active families.",
        materialCost: 950,
        laborCost: 1100,
        overhead: 250,
        durationDays: 2,
      },
      {
        id: "laminate-floor",
        name: "Laminate Flooring",
        description: "Wood-look compressed fiberboard with a hard wear layer. Extremely durable and scratch-resistant, but should avoid pooling water.",
        materialCost: 1300,
        laborCost: 1300,
        overhead: 350,
        durationDays: 2,
      },
      {
        id: "tile",
        name: "Ceramic / Porcelain Tile",
        description: "Kiln-fired clay tiles. Absolutely waterproof, highly scratch-resistant, and can last a lifetime, but hard on joints and grouts must be sealed.",
        materialCost: 2400,
        laborCost: 2600,
        overhead: 700,
        durationDays: 4,
      },
      {
        id: "hardwood",
        name: "Engineered / Solid Hardwood",
        description: "Warm, authentic timber flooring. Enhances home resale value dramatically. Prone to moisture damage but can be refinished to look brand new.",
        materialCost: 4800,
        laborCost: 3200,
        overhead: 1200,
        durationDays: 4,
        isPremium: true,
      },
    ],
  },
  {
    id: "paint",
    name: "Paint",
    description: "The quickest way to refresh boundaries and define lighting.",
    iconName: "Paintbrush",
    options: [
      {
        id: "keep-existing",
        name: "Keep Existing",
        description: "Retain your current paint and wall finishes in their present condition.",
        materialCost: 0,
        laborCost: 0,
        overhead: 0,
        durationDays: 0,
      },
      {
        id: "standard-paint",
        name: "Standard Paint",
        description: "Durable latex paint in high-use semi-gloss or satin finishes. Basic sanding, priming, and two coats of quality mid-grade paint.",
        materialCost: 180,
        laborCost: 480,
        overhead: 100,
        durationDays: 2,
      },
      {
        id: "premium-paint",
        name: "Premium Paint",
        description: "Scuff-resistant, washable premium paint (e.g., Benjamin Moore Regal or Sherwin Williams Emerald). Excellent hiding power and low-odor VOCs.",
        materialCost: 320,
        laborCost: 650,
        overhead: 150,
        durationDays: 2,
      },
      {
        id: "designer-paint",
        name: "Designer Finish",
        description: "Custom textured treatments, Venetian plaster, custom accent walls, or ultra-premium designer imports (e.g., Farrow & Ball) for supreme depth.",
        materialCost: 650,
        laborCost: 1100,
        overhead: 350,
        durationDays: 3,
        isPremium: true,
      },
    ],
  },
  {
    id: "backsplash",
    name: "Backsplash",
    description: "Protects walls from cooking splatters and anchors countertops.",
    iconName: "Wallpaper",
    options: [
      {
        id: "keep-existing",
        name: "Keep Existing",
        description: "Retain your current backsplash or wall surface in its present condition.",
        materialCost: 0,
        laborCost: 0,
        overhead: 0,
        durationDays: 0,
      },
      {
        id: "none",
        name: "None (Painted Wall)",
        description: "Simple painted wall with standard baseboard trim. Most economical but requires scrubbing paint.",
        materialCost: 0,
        laborCost: 0,
        overhead: 0,
        durationDays: 0,
      },
      {
        id: "ceramic-tile",
        name: "Ceramic Tile",
        description: "Standard glazed tiles in patterns. Highly customizable, waterproof, and very cost-effective.",
        materialCost: 450,
        laborCost: 850,
        overhead: 200,
        durationDays: 2,
      },
      {
        id: "subway-tile",
        name: "Classic Subway Tile",
        description: "Elegant, timeless rectangular white or colored running tiles. Complements almost any kitchen aesthetic seamlessly.",
        materialCost: 650,
        laborCost: 1050,
        overhead: 250,
        durationDays: 2,
      },
      {
        id: "glass-tile",
        name: "Modern Glass Tile",
        description: "Translucent glass mosaics that capture and bounce light beautifully. Adds depth, modern flare, and is very easy to wipe clean.",
        materialCost: 1300,
        laborCost: 1450,
        overhead: 450,
        durationDays: 3,
      },
      {
        id: "natural-stone",
        name: "Natural Stone / Full Slab",
        description: "Premium mosaic travertine, marble tile, or extending the countertop quartz slab all the way up the wall for an ultra-clean high-end visual.",
        materialCost: 2400,
        laborCost: 1900,
        overhead: 700,
        durationDays: 3,
        isPremium: true,
      },
    ],
  },
  {
    id: "sink",
    name: "Sink",
    description: "The mechanical workhorse of cleaning and prep.",
    iconName: "Droplets",
    options: [
      {
        id: "keep-existing",
        name: "Keep Existing",
        description: "Retain your current sink in its present condition.",
        materialCost: 0,
        laborCost: 0,
        overhead: 0,
        durationDays: 0,
      },
      {
        id: "standard-sink",
        name: "Standard Drop-In",
        description: "Classic top-mounted double-bowl steel or acrylic sink. Fits standard cutouts, highly utilitarian.",
        materialCost: 220,
        laborCost: 280,
        overhead: 80,
        durationDays: 1,
      },
      {
        id: "undermount-stainless",
        name: "Undermount Stainless",
        description: "Mounted underneath solid countertops for an unbroken transition. Sleek look, allows sweeping crumbs directly into the sink.",
        materialCost: 450,
        laborCost: 350,
        overhead: 120,
        durationDays: 1,
      },
      {
        id: "farmhouse",
        name: "Farmhouse Apron-Front",
        description: "Stunning ceramic, fireclay, or copper deep-basin sink with an exposed front panel. Timeless luxury statement.",
        materialCost: 850,
        laborCost: 550,
        overhead: 220,
        durationDays: 2,
      },
      {
        id: "workstation",
        name: "Workstation Sink",
        description: "Extra-wide professional undermount with built-in ledges for sliding cutting boards, drying racks, and colanders. Chef's favorite.",
        materialCost: 1300,
        laborCost: 650,
        overhead: 350,
        durationDays: 2,
        isPremium: true,
      },
    ],
  },
  {
    id: "faucet",
    name: "Faucet",
    description: "Bridges water delivery with hands-free convenience.",
    iconName: "Dribbble", // Representing flow/nozzle or we can use another icon like Sparkles/Pipette
    options: [
      {
        id: "keep-existing",
        name: "Keep Existing",
        description: "Retain your current faucet in its present condition.",
        materialCost: 0,
        laborCost: 0,
        overhead: 0,
        durationDays: 0,
      },
      {
        id: "basic-faucet",
        name: "Basic Chrome Faucet",
        description: "Standard dual-handle or simple single-lever faucet. Highly reliable but limited reach.",
        materialCost: 80,
        laborCost: 130,
        overhead: 30,
        durationDays: 1,
      },
      {
        id: "pulldown",
        name: "Pull-Down Spray Faucet",
        description: "Flexible high-arch spray wand with magnetic retraction. Matte black, brushed nickel, or brass finishes. Highly ergonomic.",
        materialCost: 280,
        laborCost: 190,
        overhead: 60,
        durationDays: 1,
      },
      {
        id: "touchless",
        name: "Smart Touchless Faucet",
        description: "Motion-sensor activated water flow. Perfect when hands are full or messy. High-tech and saves water.",
        materialCost: 550,
        laborCost: 260,
        overhead: 120,
        durationDays: 1,
        isPremium: true,
      },
    ],
  },
  {
    id: "appliances",
    name: "Appliances",
    description: "The core culinary electronics including range, fridge, and dishwasher.",
    iconName: "Tv",
    options: [
      {
        id: "keep-existing",
        name: "Keep Existing",
        description: "Use your current refrigerator, stove, oven, and dishwasher. Save thousands on equipment costs.",
        materialCost: 0,
        laborCost: 0,
        overhead: 0,
        durationDays: 0,
      },
      {
        id: "basic-package",
        name: "Basic Appliance Package",
        description: "Standard, reliable stainless steel appliances from entry-level brands (refrigerator, gas/electric range, dishwasher, over-the-range microwave).",
        materialCost: 2200,
        laborCost: 350,
        overhead: 150,
        durationDays: 1,
      },
      {
        id: "mid-range-package",
        name: "Mid-Range Appliance Package",
        description: "High-grade counter-depth refrigerator, slide-in convection range, and quiet, fully-integrated dishwasher with smart sensors.",
        materialCost: 4800,
        laborCost: 600,
        overhead: 400,
        durationDays: 2,
      },
      {
        id: "premium-package",
        name: "Premium Luxury Package",
        description: "Professional-tier chef appliances (e.g., Wolf, Sub-Zero, JennAir, Thermador) with custom panels, commercial BTUs, and smart multi-zone climate control.",
        materialCost: 12500,
        laborCost: 1200,
        overhead: 1100,
        durationDays: 3,
        isPremium: true,
      },
    ],
  },
  {
    id: "lighting",
    name: "Lighting",
    description: "Task and ambient illumination that shapes the perception of space.",
    iconName: "Sun",
    options: [
      {
        id: "keep-existing",
        name: "Keep Existing",
        description: "Retain your current lighting fixtures and configuration in their present condition.",
        materialCost: 0,
        laborCost: 0,
        overhead: 0,
        durationDays: 0,
      },
      {
        id: "standard-lighting",
        name: "Standard Fixtures",
        description: "Replace existing ceiling light dome fixtures with updated semi-flush mounts. Simple but fresh.",
        materialCost: 160,
        laborCost: 260,
        overhead: 60,
        durationDays: 1,
      },
      {
        id: "recessed",
        name: "Recessed Can Lights",
        description: "Install 4 to 8 flush-mounted ceiling LED pot lights with dimmers. Opens up headroom and provides bright, balanced lighting.",
        materialCost: 550,
        laborCost: 750,
        overhead: 220,
        durationDays: 2,
      },
      {
        id: "pendant",
        name: "Designer Pendants & Sconces",
        description: "Focal pendant fixtures over the island/sink paired with sleek accent sconces. Highly stylish.",
        materialCost: 850,
        laborCost: 550,
        overhead: 250,
        durationDays: 2,
      },
      {
        id: "smart-lighting",
        name: "Smart Ambience System",
        description: "Smart color-changing ceiling lights, architectural under-cabinet LED tracks, and toe-kick wash lighting controlled via voice or smartphone.",
        materialCost: 1750,
        laborCost: 950,
        overhead: 450,
        durationDays: 3,
        isPremium: true,
      },
    ],
  },
];

export const ADDITIONAL_SERVICES: AdditionalService[] = [
  {
    id: "demolition",
    name: "Demolition & Haul-Away",
    description: "Safe extraction of existing counters, backsplash, cabinets, and flooring. Includes disposal fee.",
    materialCost: 120,
    laborCost: 1350,
    overhead: 350,
    durationDays: 3,
  },
  {
    id: "wall-removal",
    name: "Structural Wall Removal",
    description: "Remove load-bearing or partition wall to create an open-concept flow. Includes headers and support beams.",
    materialCost: 900,
    laborCost: 3800,
    overhead: 1400,
    durationDays: 5,
  },
  {
    id: "design-layout",
    name: "Professional 3D Interior Design",
    description: "Photorealistic 3D rendering plan, spatial architecture consultation, and formal finish selection catalog.",
    materialCost: 500,
    laborCost: 900,
    overhead: 200,
    durationDays: 4,
  },
  {
    id: "electrical-panel",
    name: "Electrical Service Upgrade (200A)",
    description: "Upgrade older panel to support multi-oven, induction ranges, and high-amp designer appliances safely.",
    materialCost: 1300,
    laborCost: 1900,
    overhead: 600,
    durationDays: 2,
  },
  {
    id: "plumbing-relocate",
    name: "Plumbing & Gas Line Relocation",
    description: "Move sink water/drain lines or gas range coordinates more than 3 feet from original location.",
    materialCost: 1600,
    laborCost: 2700,
    overhead: 900,
    durationDays: 4,
  },
];

// Preconfigured template setups
export const TEMPLATES = [
  {
    id: "budget-template",
    name: "Smart Budget Refresher",
    description: "Focuses on high-impact, economical choices like repainting existing cabinets and luxury vinyl tile.",
    budgetTier: "$",
    iconName: "TrendingUp",
    totalEstimatedCost: 12690, // Sample base
    selections: {
      cabinets: "repaint",
      countertops: "laminate",
      flooring: "vinyl",
      paint: "standard-paint",
      backsplash: "none",
      sink: "standard-sink",
      faucet: "basic-faucet",
      appliances: "keep-existing",
      lighting: "standard-lighting",
    },
    additionalServices: ["demolition"]
  },
  {
    id: "midrange-template",
    name: "Modern Family Balance",
    description: "Our most popular setup. Features robust stock cabinets, resilient quartz counters, and smart appliances.",
    budgetTier: "$$$",
    iconName: "CheckCircle",
    totalEstimatedCost: 31220, // Sample base
    selections: {
      cabinets: "stock",
      countertops: "quartz",
      flooring: "tile",
      paint: "premium-paint",
      backsplash: "subway-tile",
      sink: "undermount-stainless",
      faucet: "pulldown",
      appliances: "mid-range-package",
      lighting: "recessed",
    },
    additionalServices: ["demolition", "design-layout"]
  },
  {
    id: "luxury-template",
    name: "Grand Chef's Dream",
    description: "Uncompromising premium standard. Solid custom cabinetry, exquisite marble countertops, professional appliances, and smart controls.",
    budgetTier: "$$$$",
    iconName: "Sparkles",
    totalEstimatedCost: 74900, // Sample base
    selections: {
      cabinets: "custom",
      countertops: "marble",
      flooring: "hardwood",
      paint: "designer-paint",
      backsplash: "natural-stone",
      sink: "workstation",
      faucet: "touchless",
      appliances: "premium-package",
      lighting: "smart-lighting",
    },
    additionalServices: ["demolition", "design-layout", "wall-removal", "electrical-panel"]
  }
];

// Helper to calculate total costs for a set of selections and additional services
export function calculateRemodelCosts(
  selections: Record<string, string>,
  selectedServices: string[]
) {
  let materials = 0;
  let labor = 0;
  let overhead = 0;
  let duration = 0;

  // 1. Process standard category options
  REMODEL_CATEGORIES.forEach((category) => {
    const selectedOptionId = selections[category.id];
    const option = category.options.find((opt) => opt.id === selectedOptionId);
    if (option) {
      materials += option.materialCost;
      labor += option.laborCost;
      overhead += option.overhead;
      duration += option.durationDays;
    }
  });

  // 2. Process additional services
  ADDITIONAL_SERVICES.forEach((service) => {
    if (selectedServices.includes(service.id)) {
      materials += service.materialCost;
      labor += service.laborCost;
      overhead += service.overhead;
      // Additive duration but capped or with a compression factor for overlap
      // Let's use standard additive, but demolition can happen concurrently 
      // with other prep. We can just add them for a comprehensive planner.
      duration += service.durationDays;
    }
  });

  const total = materials + labor + overhead;
  const minCost = Math.round(total * 0.9);
  const maxCost = Math.round(total * 1.1);

  // Determine budget tier based on total cost thresholds
  // $: under 15k, $$: 15k-30k, $$$: 30k-55k, $$$$: 55k+
  let budgetTier: "$" | "$$" | "$$$" | "$$$$" = "$";
  if (total >= 55000) {
    budgetTier = "$$$$";
  } else if (total >= 30000) {
    budgetTier = "$$$";
  } else if (total >= 15000) {
    budgetTier = "$$";
  }

  // Calculate percentage of categories customized
  const totalCategories = REMODEL_CATEGORIES.length;
  let customizedCount = 0;
  REMODEL_CATEGORIES.forEach((cat) => {
    const selectedOptionId = selections[cat.id];
    // Consider customized if it's not "keep-existing" or "none", or if any option is picked
    if (selectedOptionId) {
      customizedCount++;
    }
  });
  const progressPercent = Math.round((customizedCount / totalCategories) * 100);

  return {
    materials,
    labor,
    overhead,
    total,
    minCost,
    maxCost,
    duration,
    budgetTier,
    progressPercent,
  };
}

// Highly reliable client-side simulated AI classifier
export function simulateAIClassification(prompt: string): AISuggestionResult {
  const p = prompt.toLowerCase();
  
  let style = "Transitional";
  let budgetTier = "$$";
  let explanation = "";
  
  // Custom suggestion matches
  const selections: Record<string, string> = {};
  const suggestedMaterials: Record<string, string> = {};

  // Default selections if we can't find anything
  selections["cabinets"] = "repaint";
  selections["countertops"] = "laminate";
  selections["flooring"] = "vinyl";
  selections["paint"] = "standard-paint";
  selections["backsplash"] = "none";
  selections["sink"] = "standard-sink";
  selections["faucet"] = "basic-faucet";
  selections["appliances"] = "keep-existing";
  selections["lighting"] = "standard-lighting";

  // Match Style
  if (p.includes("modern") || p.includes("sleek") || p.includes("minimalist") || p.includes("contemporary") || p.includes("black")) {
    style = "Modern / Contemporary";
    explanation += "Detected modern preferences. ";
    selections["paint"] = "premium-paint";
    selections["lighting"] = "recessed";
    selections["faucet"] = "pulldown";
  } else if (p.includes("rustic") || p.includes("farmhouse") || p.includes("cozy") || p.includes("country") || p.includes("wood")) {
    style = "Modern Farmhouse";
    explanation += "Detected rustic farmhouse preferences. ";
    selections["sink"] = "farmhouse";
    selections["countertops"] = "butcher-block";
    selections["flooring"] = "tile";
  } else if (p.includes("luxury") || p.includes("grand") || p.includes("high-end") || p.includes("expensive") || p.includes("rich") || p.includes("exclusive")) {
    style = "Premium Editorial / Luxury";
    explanation += "High luxury preferences noted. ";
  } else if (p.includes("traditional") || p.includes("classic") || p.includes("vintage") || p.includes("antique")) {
    style = "Classic Traditional";
    explanation += "Classic architectural details noted. ";
  }

  // Match Budget indicators
  if (p.includes("budget") || p.includes("cheap") || p.includes("economical") || p.includes("low cost") || p.includes("save money") || p.includes("diy")) {
    budgetTier = "$";
    explanation += "Designed with maximum value and cost saving in mind.";
    selections["cabinets"] = "repaint";
    selections["countertops"] = "laminate";
    selections["flooring"] = "vinyl";
    selections["paint"] = "standard-paint";
    selections["backsplash"] = "none";
    selections["sink"] = "standard-sink";
    selections["faucet"] = "basic-faucet";
    selections["appliances"] = "keep-existing";
    selections["lighting"] = "standard-lighting";
  } else if (p.includes("luxury") || p.includes("expensive") || p.includes("premium") || p.includes("best") || p.includes("no limit") || p.includes("million")) {
    budgetTier = "$$$$";
    explanation += "Allocated the absolute highest grade custom components.";
    selections["cabinets"] = "custom";
    selections["countertops"] = "marble";
    selections["flooring"] = "hardwood";
    selections["paint"] = "designer-paint";
    selections["backsplash"] = "natural-stone";
    selections["sink"] = "workstation";
    selections["faucet"] = "touchless";
    selections["appliances"] = "premium-package";
    selections["lighting"] = "smart-lighting";
  } else if (p.includes("moderate") || p.includes("reasonable") || p.includes("middle") || p.includes("quality") || p.includes("family") || p.includes("quartz") || p.includes("stainless")) {
    budgetTier = "$$$";
    explanation += "Perfect balance of durable premium materials and commercial value.";
    selections["cabinets"] = "stock";
    selections["countertops"] = "quartz";
    selections["flooring"] = "tile";
    selections["paint"] = "premium-paint";
    selections["backsplash"] = "subway-tile";
    selections["sink"] = "undermount-stainless";
    selections["faucet"] = "pulldown";
    selections["appliances"] = "mid-range-package";
    selections["lighting"] = "recessed";
  } else {
    // Default to dynamic intermediate scale ($$)
    budgetTier = "$$";
    explanation += "Customized selection optimizing middle-tier high-value upgrades.";
    selections["cabinets"] = "repaint";
    selections["countertops"] = "butcher-block";
    selections["flooring"] = "laminate-floor";
    selections["paint"] = "premium-paint";
    selections["backsplash"] = "ceramic-tile";
    selections["sink"] = "undermount-stainless";
    selections["faucet"] = "pulldown";
    selections["appliances"] = "basic-package";
    selections["lighting"] = "recessed";
  }

  // Material keyword checks
  if (p.includes("quartz")) {
    selections["countertops"] = "quartz";
    suggestedMaterials.countertops = "Engineered Quartz";
  } else if (p.includes("granite")) {
    selections["countertops"] = "granite";
    suggestedMaterials.countertops = "Natural Granite";
  } else if (p.includes("marble")) {
    selections["countertops"] = "marble";
    suggestedMaterials.countertops = "Premium Marble";
  } else if (p.includes("butcher") || p.includes("wood counter")) {
    selections["countertops"] = "butcher-block";
    suggestedMaterials.countertops = "Butcher Block";
  }

  if (p.includes("hardwood") || p.includes("wood floor") || p.includes("oak") || p.includes("maple")) {
    selections["flooring"] = "hardwood";
    suggestedMaterials.flooring = "Engineered Hardwood";
  } else if (p.includes("tile") || p.includes("porcelain") || p.includes("slate")) {
    selections["flooring"] = "tile";
    suggestedMaterials.flooring = "Ceramic / Porcelain Tile";
  } else if (p.includes("vinyl") || p.includes("lvp")) {
    selections["flooring"] = "vinyl";
    suggestedMaterials.flooring = "Luxury Vinyl Plank";
  }

  if (p.includes("custom cabinet") || p.includes("bespoke")) {
    selections["cabinets"] = "custom";
    suggestedMaterials.cabinets = "Hardwood Custom Cabinets";
  } else if (p.includes("stock cabinet") || p.includes("ikea") || p.includes("pre-fab")) {
    selections["cabinets"] = "stock";
    suggestedMaterials.cabinets = "Stock Cabinets";
  } else if (p.includes("repaint") || p.includes("paint cabinet") || p.includes("reface")) {
    selections["cabinets"] = "repaint";
    suggestedMaterials.cabinets = "Repainted Existing Cabinets";
  }

  if (p.includes("subway")) {
    selections["backsplash"] = "subway-tile";
    suggestedMaterials.backsplash = "Classic Subway Tile";
  } else if (p.includes("stone backsplash")) {
    selections["backsplash"] = "natural-stone";
    suggestedMaterials.backsplash = "Natural Stone Slab";
  } else if (p.includes("glass")) {
    selections["backsplash"] = "glass-tile";
    suggestedMaterials.backsplash = "Modern Glass Tile";
  }

  if (p.includes("farmhouse") || p.includes("apron")) {
    selections["sink"] = "farmhouse";
    selections["cabinets"] = p.includes("custom") ? "custom" : "stock"; // Farmhouse sink needs sturdy cabinets!
  } else if (p.includes("workstation") || p.includes("chef sink")) {
    selections["sink"] = "workstation";
  }

  if (p.includes("touchless") || p.includes("motion faucet") || p.includes("smart faucet")) {
    selections["faucet"] = "touchless";
  }

  if (p.includes("smart light") || p.includes("led") || p.includes("app controlled")) {
    selections["lighting"] = "smart-lighting";
    suggestedMaterials.lighting = "Smart Ambience System";
  } else if (p.includes("recessed") || p.includes("can lights") || p.includes("pots")) {
    selections["lighting"] = "recessed";
    suggestedMaterials.lighting = "Recessed Can Lights";
  } else if (p.includes("pendant") || p.includes("hanging")) {
    selections["lighting"] = "pendant";
    suggestedMaterials.lighting = "Designer Pendants";
  }

  // Populate suggestion list descriptions
  if (!suggestedMaterials.countertops) {
    suggestedMaterials.countertops = selections["countertops"] === "marble" ? "Premium Marble" : selections["countertops"] === "quartz" ? "Engineered Quartz" : selections["countertops"] === "laminate" ? "Modern Laminate" : "Butcher Block";
  }
  if (!suggestedMaterials.cabinets) {
    suggestedMaterials.cabinets = selections["cabinets"] === "custom" ? "Custom Solid Wood" : selections["cabinets"] === "stock" ? "Ready-To-Assemble Stock" : "Professional Resurface / Paint";
  }

  return {
    style,
    budgetTier,
    suggestedMaterials,
    explanation,
    matchedOptionIds: selections,
  };
}
