import { RemodelCategory } from "../types";
import { REMODEL_CATEGORIES } from "./data";
import materialsData from "./materials.json";
import laborData from "./labor.json";

export interface RoomDefinition {
  name: string;
  description: string;
  iconName: string;
  categories: RemodelCategory[];
  defaultSelections: Record<string, string>;
}

const BASE_ROOM_DATA: Record<string, RoomDefinition> = {
  "Kitchen": {
    name: "Kitchen",
    description: "The visual and social heart of your New Orleans residence.",
    iconName: "FolderHeart",
    categories: REMODEL_CATEGORIES,
    defaultSelections: {
      cabinets: "keep-existing",
      countertops: "keep-existing",
      flooring: "keep-existing",
      paint: "keep-existing",
      backsplash: "keep-existing",
      sink: "keep-existing",
      faucet: "keep-existing",
      appliances: "keep-existing",
      lighting: "keep-existing",
    }
  },
  "Bathroom": {
    name: "Bathroom",
    description: "Transform your bathroom into a luxury spa or functional powder room.",
    iconName: "Droplets",
    categories: [
      {
        id: "shower_tub",
        name: "Shower & Tub",
        description: "The core bathing enclosure and tilework.",
        iconName: "Droplets",
        options: [
          { id: "keep-existing", name: "Keep Existing", description: "Keep existing layout and plumbing.", materialCost: 0, laborCost: 0, overhead: 0, durationDays: 0 },
          { id: "acrylic-surround", name: "Prefab Acrylic Surround", description: "Standard, clean prefabricated tub and wall surround.", materialCost: 1200, laborCost: 1500, overhead: 400, durationDays: 3 },
          { id: "subway-shower", name: "Classic Subway Tiled Shower", description: "Waterproof backer boards with hand-laid classic white subway tile.", materialCost: 2800, laborCost: 3200, overhead: 900, durationDays: 5 },
          { id: "luxury-walkin", name: "Walk-In Custom Stone Spa", description: "Curbless entry, frameless heavy glass, custom niches, and premium marble/quartz slabs.", materialCost: 7500, laborCost: 6200, overhead: 2200, durationDays: 8, isPremium: true }
        ]
      },
      {
        id: "vanity",
        name: "Vanity & Cabinets",
        description: "Primary sink storage, mirrors, and cabinetry.",
        iconName: "FolderHeart",
        options: [
          { id: "keep-existing", name: "Keep Existing", description: "Keep existing vanity/cabinets in current condition.", materialCost: 0, laborCost: 0, overhead: 0, durationDays: 0 },
          { id: "refinish-vanity", name: "Refinish Existing Vanity", description: "Freshen up with new paint and premium knobs.", materialCost: 150, laborCost: 450, overhead: 100, durationDays: 1 },
          { id: "pre-assembled-vanity", name: "Pre-Assembled Single Vanity", description: "Standard off-the-shelf single vanity with integrated ceramic top.", materialCost: 650, laborCost: 550, overhead: 150, durationDays: 2 },
          { id: "double-vanity-quartz", name: "Double Vanity with Quartz Top", description: "Sleek double-sink pre-fabricated cabinet with engineered quartz countertop.", materialCost: 1800, laborCost: 950, overhead: 350, durationDays: 3 },
          { id: "custom-hardwood-vanity", name: "Bespoke Hardwood Double Vanity", description: "Custom-made floating cypress or white oak vanity, premium quartz or marble counters, and luxury mirrors.", materialCost: 4200, laborCost: 1800, overhead: 850, durationDays: 5, isPremium: true }
        ]
      },
      {
        id: "flooring",
        name: "Flooring",
        description: "Waterproof surfaces that define the foundation.",
        iconName: "Layers",
        options: [
          { id: "keep-existing", name: "Keep Existing", description: "Retain your current bathroom flooring in its present condition.", materialCost: 0, laborCost: 0, overhead: 0, durationDays: 0 },
          { id: "bath-lvp", name: "Luxury Vinyl Plank (LVP)", description: "100% waterproof synthetic flooring, warm underfoot.", materialCost: 350, laborCost: 550, overhead: 120, durationDays: 1 },
          { id: "ceramic-bath-tile", name: "Ceramic Bathroom Tile", description: "Sturdy non-slip ceramic tiles in traditional patterns.", materialCost: 750, laborCost: 1200, overhead: 300, durationDays: 3 },
          { id: "porcelain-mosaic", name: "Porcelain Hex/Herringbone Mosaic", description: "Timeless intricate mosaics, extremely water-resistant and highly slip-resistant.", materialCost: 1400, laborCost: 2100, overhead: 600, durationDays: 4 },
          { id: "heated-marble-flooring", name: "Heated Natural Marble Tiles", description: "Schluter Ditra-Heat floor warming system topped with beautiful Carrara marble.", materialCost: 3200, laborCost: 3500, overhead: 1200, durationDays: 5, isPremium: true }
        ]
      },
      {
        id: "fixtures",
        name: "Plumbing Fixtures & Toilet",
        description: "Faucets, valves, showerheads, and toilets.",
        iconName: "Wrench",
        options: [
          { id: "keep-existing", name: "Keep Existing", description: "Retain your current plumbing fixtures and toilet in their present condition.", materialCost: 0, laborCost: 0, overhead: 0, durationDays: 0 },
          { id: "standard-plumbing", name: "Basic Faucet & Toilet Package", description: "Functional chrome single-handle faucet and dual-flush round toilet.", materialCost: 320, laborCost: 380, overhead: 100, durationDays: 1 },
          { id: "designer-shower-faucet", name: "Matte Black Multi-Function Set", description: "Premium anti-scald rain showerhead, hand sprayer, matching sink faucet, and comfort-height elongated toilet.", materialCost: 850, laborCost: 650, overhead: 250, durationDays: 2 },
          { id: "spa-body-jets-toilet", name: "Luxury Body-Sprays & Smart Toilet", description: "Multi-jet thermostatic shower valve, hand shower, luxury faucet, and smart bidet toilet with heated seat.", materialCost: 3500, laborCost: 1600, overhead: 750, durationDays: 3, isPremium: true }
        ]
      },
      {
        id: "paint",
        name: "Moisture-Resistant Paint",
        description: "Specialized bathroom wall paint.",
        iconName: "Paintbrush",
        options: [
          { id: "keep-existing", name: "Keep Existing", description: "Retain your current paint in its present condition.", materialCost: 0, laborCost: 0, overhead: 0, durationDays: 0 },
          { id: "mold-resistant-paint", name: "Standard Anti-Mildew Coating", description: "Two coats of moisture-resistant eggshell bathroom paint.", materialCost: 120, laborCost: 380, overhead: 80, durationDays: 1 },
          { id: "aura-bath-paint", name: "Premium Benjamin Moore Aura Waterborne", description: "Exceptional resistance to moisture, color-locking tech, matte finish.", materialCost: 220, laborCost: 550, overhead: 140, durationDays: 1.5 },
          { id: "lime-wash-shiplap", name: "Designer Accent / Shiplap Wall", description: "Moisture-sealed cedar shiplap detailing or waterproof Venetian lime wash plaster.", materialCost: 650, laborCost: 1100, overhead: 350, durationDays: 3, isPremium: true }
        ]
      },
      {
        id: "lighting",
        name: "Vanity & Ambient Lighting",
        description: "Sconces, recessed cans, and decorative mirrors.",
        iconName: "Sun",
        options: [
          { id: "keep-existing", name: "Keep Existing", description: "Retain your current lighting in its present condition.", materialCost: 0, laborCost: 0, overhead: 0, durationDays: 0 },
          { id: "standard-bath-lighting", name: "Simple Over-Mirror Bar Light", description: "Update existing light box with modern 3-bulb LED fixture.", materialCost: 120, laborCost: 150, overhead: 40, durationDays: 1 },
          { id: "led-mirror-cans", name: "LED Backlit Mirror & Recessed Pots", description: "Anti-fog smart LED vanity mirror paired with ultra-thin ceiling LED downlights.", materialCost: 450, laborCost: 450, overhead: 150, durationDays: 1.5 },
          { id: "designer-pendant-recessed", name: "Sconces, Wet-Rated Shower Can & Dimmers", description: "Visual Comfort designer wall sconces, integrated waterproof shower light, and smart dimmers.", materialCost: 1100, laborCost: 750, overhead: 300, durationDays: 2, isPremium: true }
        ]
      }
    ],
    defaultSelections: {
      shower_tub: "keep-existing",
      vanity: "keep-existing",
      flooring: "keep-existing",
      fixtures: "keep-existing",
      paint: "keep-existing",
      lighting: "keep-existing"
    }
  },
  "Living Space": {
    name: "Living Space",
    description: "Great rooms, formal living rooms, and historical parlors customized for leisure.",
    iconName: "Layers",
    categories: [
      {
        id: "flooring",
        name: "Flooring",
        description: "Comfort and aesthetics for lounging and traffic.",
        iconName: "Layers",
        options: [
          { id: "keep-existing", name: "Keep Existing", description: "Retain your current living room flooring in its present condition.", materialCost: 0, laborCost: 0, overhead: 0, durationDays: 0 },
          { id: "living-lvp", name: "Luxury Vinyl Plank (LVP)", description: "Extremely durable, waterproof wood mimic. Family & pet friendly.", materialCost: 800, laborCost: 950, overhead: 200, durationDays: 2 },
          { id: "carpet-premium", name: "Premium Plush Carpet", description: "Thick pile stain-resistant carpet with plush 8lb pad underneath.", materialCost: 1200, laborCost: 800, overhead: 200, durationDays: 2 },
          { id: "hardwood-engineered", name: "Engineered European Oak", description: "Timeless wide-plank wood flooring with beautiful matte oil sealer.", materialCost: 3500, laborCost: 2400, overhead: 800, durationDays: 4 },
          { id: "reclaimed-heart-pine", name: "Historic Reclaimed Heart Pine", description: "Authentic, antique Louisiana river-reclaimed heart pine planks, hand-sanded and sealed.", materialCost: 7800, laborCost: 4500, overhead: 1800, durationDays: 6, isPremium: true }
        ]
      },
      {
        id: "drywall_trim",
        name: "Drywall, Trim & Moulding",
        description: "Crown moulding, baseboards, and wall texture.",
        iconName: "Grid",
        options: [
          { id: "keep-existing", name: "Keep Existing", description: "Retain your current drywall and trim in their present condition.", materialCost: 0, laborCost: 0, overhead: 0, durationDays: 0 },
          { id: "trim-standard", name: "Standard Baseboards & Paint Prep", description: "Clean 3.5\" baseboards with professional caulk and prep.", materialCost: 200, laborCost: 450, overhead: 100, durationDays: 1.5 },
          { id: "crown-moulding-craftsman", name: "Craftsman Crown & Window Casings", description: "Add substantial crown moulding and full window frames.", materialCost: 650, laborCost: 1200, overhead: 300, durationDays: 3 },
          { id: "historic-restoration-plaster", name: "Historic Plaster & Picture Rails", description: "Authentic custom plaster repair, double-member plaster medallions, and classical picture hanging rails.", materialCost: 2800, laborCost: 4200, overhead: 1100, durationDays: 6, isPremium: true }
        ]
      },
      {
        id: "builtins",
        name: "Built-ins & Fireplace",
        description: "Bookshelves, entertainment centers, and fireplace surrounds.",
        iconName: "FolderHeart",
        options: [
          { id: "keep-existing", name: "Keep Existing", description: "Retain your current layout with no added built-ins.", materialCost: 0, laborCost: 0, overhead: 0, durationDays: 0 },
          { id: "no-builtins", name: "No Built-ins / Flat Wall", description: "Standard flat wall ready for hanging TV/console.", materialCost: 0, laborCost: 0, overhead: 0, durationDays: 0 },
          { id: "shiplap-fireplace", name: "Shiplap Accent & Wood Mantel", description: "Tile-clad electric fireplace surround with rustic cypress mantel.", materialCost: 1500, laborCost: 1200, overhead: 400, durationDays: 3 },
          { id: "custom-media-bookshelves", name: "Custom Media Center & Bookshelves", description: "Hand-crafted built-in cabinetry flanking fireplace with adjustable shelving and cable channels.", materialCost: 4500, laborCost: 3500, overhead: 1100, durationDays: 5 },
          { id: "architectural-library-hearth", name: "Grand Architectural Library & Hearth", description: "Floor-to-ceiling walnut library bookcases, sliding rolling ladder, and natural soapstone gas fireplace hearth.", materialCost: 12500, laborCost: 6800, overhead: 2800, durationDays: 9, isPremium: true }
        ]
      },
      {
        id: "paint",
        name: "Wall & Ceiling Paint",
        description: "Interior wall and trim painting.",
        iconName: "Paintbrush",
        options: [
          { id: "keep-existing", name: "Keep Existing", description: "Retain your current paint in its present condition.", materialCost: 0, laborCost: 0, overhead: 0, durationDays: 0 },
          { id: "paint-standard-living", name: "Standard Two-Coat Paint", description: "Mid-grade professional paint, uniform eggshell wall finish.", materialCost: 200, laborCost: 550, overhead: 120, durationDays: 2 },
          { id: "paint-premium-living", name: "Sherwin Williams Duration", description: "High-hide premium paint, matte walls with satin moldings and ceiling.", materialCost: 380, laborCost: 850, overhead: 200, durationDays: 2 },
          { id: "designer-plaster-treatment", name: "Venetian Plaster or Custom Wallpaper", description: "Authentic custom texture coatings or designer metallic/textured wallpaper.", materialCost: 1500, laborCost: 2200, overhead: 700, durationDays: 4, isPremium: true }
        ]
      },
      {
        id: "lighting",
        name: "Lighting & Electrical",
        description: "Ceiling fans, cans, and accent fixtures.",
        iconName: "Sun",
        options: [
          { id: "keep-existing", name: "Keep Existing", description: "Retain your current lighting and ceiling fixtures in their present condition.", materialCost: 0, laborCost: 0, overhead: 0, durationDays: 0 },
          { id: "fan-standard", name: "Replacement Ceiling Fan/Light", description: "Simple installation of high-efficiency 52\" ceiling fan.", materialCost: 180, laborCost: 150, overhead: 40, durationDays: 1 },
          { id: "recessed-can-package", name: "Recessed Can Lights & Fan", description: "Six slim LED can lights on dimmers paired with a modern DC-motor fan.", materialCost: 650, laborCost: 750, overhead: 220, durationDays: 2 },
          { id: "custom-coffered-accent", name: "Smart Cove Lights & Coffered Outlets", description: "Concealed LED strip glow detailing, designer brass chandelier, and floor outlets.", materialCost: 2100, laborCost: 1600, overhead: 600, durationDays: 3, isPremium: true }
        ]
      }
    ],
    defaultSelections: {
      flooring: "keep-existing",
      drywall_trim: "keep-existing",
      builtins: "keep-existing",
      paint: "keep-existing",
      lighting: "keep-existing"
    }
  },
  "Outdoor Deck": {
    name: "Outdoor Deck",
    description: "Expand your living outdoors with a custom deck built for swamp humidity and crawfish boils.",
    iconName: "Grid",
    categories: [
      {
        id: "framing",
        name: "Foundation & Framing",
        description: "Support structure, concrete footings, and structural framing.",
        iconName: "Layers",
        options: [
          { id: "keep-existing", name: "Keep Existing", description: "Retain your current deck foundation/framing in its present condition.", materialCost: 0, laborCost: 0, overhead: 0, durationDays: 0 },
          { id: "ground-framing-standard", name: "Standard Ground Deck Framing", description: "Direct-to-ground level pressure-treated pine framing.", materialCost: 800, laborCost: 1100, overhead: 300, durationDays: 2 },
          { id: "elevated-pt-framing", name: "Elevated Structural PT Framing", description: "Concrete piers, heavy-duty posts, and heavy-gauge joist brackets.", materialCost: 1800, laborCost: 2200, overhead: 600, durationDays: 4 },
          { id: "heavy-timber-marine-joists", name: "Marine-Grade Premium Timber Base", description: "Hurricane-rated Simpson steel strapping, concrete pillars, and copper-azole treated framing built to withstand standing water.", materialCost: 3800, laborCost: 4500, overhead: 1200, durationDays: 6, isPremium: true }
        ]
      },
      {
        id: "decking_material",
        name: "Decking Material",
        description: "The primary walking surface boards.",
        iconName: "Grid",
        options: [
          { id: "keep-existing", name: "Keep Existing", description: "Retain your current deck boards/material in its present condition.", materialCost: 0, laborCost: 0, overhead: 0, durationDays: 0 },
          { id: "pt-pine-boards", name: "Pressure-Treated Pine", description: "Economic wood boards. Budget-friendly, but requires annual sealing to prevent warping.", materialCost: 600, laborCost: 950, overhead: 200, durationDays: 2 },
          { id: "premium-cedar", name: "Premium Red Cedar Boards", description: "Beautiful natural wood grain, rot-resistant, stays cool in hot summers.", materialCost: 1800, laborCost: 1400, overhead: 450, durationDays: 3 },
          { id: "trex-composite-hidden", name: "Trex Enhance Composite (Hidden Clips)", description: "Ultra low-maintenance composite boards with blind clip fasteners for an unbroken surface.", materialCost: 3500, laborCost: 1800, overhead: 650, durationDays: 3 },
          { id: "exotic-ipe-hardwood", name: "Exotic Brazilian Ipe Hardwood", description: "Ironwood decking boards. Unmatched strength, firesafe, and gorgeous deep mahogany tones that last 40+ years.", materialCost: 7500, laborCost: 4200, overhead: 1800, durationDays: 6, isPremium: true }
        ]
      },
      {
        id: "railing",
        name: "Railing & Steps",
        description: "Safety rails, balusters, and steps.",
        iconName: "Grid",
        options: [
          { id: "keep-existing", name: "Keep Existing", description: "Retain your current deck railing/steps in their present condition.", materialCost: 0, laborCost: 0, overhead: 0, durationDays: 0 },
          { id: "no-railing-ground", name: "No Railing (Low Deck Ground Level)", description: "Open-profile ground level deck, single wide wrap-around step.", materialCost: 150, laborCost: 250, overhead: 50, durationDays: 1 },
          { id: "pt-wood-railing", name: "Standard Wood Balusters & Rails", description: "Pressure-treated guard rails with square wooden spindles.", materialCost: 450, laborCost: 650, overhead: 150, durationDays: 2 },
          { id: "aluminum-slim-railing", name: "Powder-Coated Aluminum Railing", description: "Sleek matte black aluminum frames, durable, modern, and does not block yard views.", materialCost: 1100, laborCost: 950, overhead: 300, durationDays: 2.5 },
          { id: "stainless-cable-ipe-handrail", name: "Stainless Steel Tension Cable & Ipe Rail", description: "Marine-grade stainless steel cables stretched between posts, topped with premium exotic Ipe timber handrail.", materialCost: 3200, laborCost: 2200, overhead: 800, durationDays: 4, isPremium: true }
        ]
      },
      {
        id: "stain_seal",
        name: "Staining & Sealing",
        description: "Finishing protective layer against UV rays and humidity.",
        iconName: "Paintbrush",
        options: [
          { id: "keep-existing", name: "Keep Existing", description: "Retain your current staining/sealing in its present condition.", materialCost: 0, laborCost: 0, overhead: 0, durationDays: 0 },
          { id: "no-stain-weather", name: "None (Natural Weathering)", description: "Let wood weather to natural grey or composite boards require no sealer.", materialCost: 0, laborCost: 0, overhead: 0, durationDays: 0 },
          { id: "standard-stain-water", name: "Standard Semi-Transparent Stain", description: "Clean, protective wood pigment water-sealant.", materialCost: 150, laborCost: 450, overhead: 100, durationDays: 1.5 },
          { id: "premium-oil-stain", name: "Premium Penofin Oil Treatment", description: "Deep penetrating oil sealant that showcases wood grain and locks in moisture barriers.", materialCost: 350, laborCost: 750, overhead: 200, durationDays: 2 },
          { id: "double-coat-epoxy-ipe-oil", name: "Hand-Rubbed Exotic Ipe Oil Finish", description: "Two coats of specialty wax-end sealer and premium UV Ipe oil protectant.", materialCost: 750, laborCost: 1350, overhead: 450, durationDays: 3, isPremium: true }
        ]
      },
      {
        id: "amenities",
        name: "Built-In Shade & Seating",
        description: "Pergolas, privacy walls, and custom wood seating.",
        iconName: "Wallpaper",
        options: [
          { id: "keep-existing", name: "Keep Existing", description: "Retain your current configuration with no added custom seating/pergolas.", materialCost: 0, laborCost: 0, overhead: 0, durationDays: 0 },
          { id: "no-amenities", name: "Basic Open Deck", description: "No built-in benches, roofs, or walls.", materialCost: 0, laborCost: 0, overhead: 0, durationDays: 0 },
          { id: "privacy-slat-wall", name: "Cypress Privacy Slat Wall", description: "Modern horizontal slat cedar or cypress screen to shield neighbors.", materialCost: 550, laborCost: 650, overhead: 180, durationDays: 1.5 },
          { id: "built-in-cypress-benches", name: "L-Shaped Cypress Storage Benches", description: "Custom integrated timber benches with lift-top storage bins.", materialCost: 1200, laborCost: 1100, overhead: 350, durationDays: 2.5 },
          { id: "custom-cedar-pergola", name: "Grand Timber Cedar Pergola (12x12)", description: "Heavy-duty 6x6 post cedar pergola to filter New Orleans midday sun beautifully.", materialCost: 3800, laborCost: 2800, overhead: 950, durationDays: 4, isPremium: true }
        ]
      }
    ],
    defaultSelections: {
      framing: "keep-existing",
      decking_material: "keep-existing",
      railing: "keep-existing",
      stain_seal: "keep-existing",
      amenities: "keep-existing"
    }
  }
};

interface MaterialItem {
  name: string;
  description: string;
  category: string;
  room: string;
  price: number;
}

interface LaborItem {
  job: string;
  tradeType: string;
  costBasis: string;
  recommendedPrice: number;
  description: string;
}

function normalizeString(str: string): string {
  return str.toLowerCase().replace(/[^a-z0-9]/g, "");
}

function updateOptionCosts(roomName: string, categoryName: string, option: any) {
  if (
    option.id === "keep-existing" ||
    option.id === "none" ||
    option.id.startsWith("no-") ||
    option.id === "keep-bath" ||
    option.id === "refinish-vanity" ||
    option.id === "keep-cabinets" ||
    (option.materialCost === 0 && option.laborCost === 0)
  ) {
    return;
  }

  const materials = materialsData as MaterialItem[];
  const labors = laborData as LaborItem[];

  const normRoom = normalizeString(roomName);
  const normCat = normalizeString(categoryName);
  const normOptName = normalizeString(option.name);

  // 1. Find matching Material
  let matchedMaterial = materials.find((m) => {
    const normMRoom = normalizeString(m.room);
    const normMCat = normalizeString(m.category);
    const normMName = normalizeString(m.name);
    return (
      normMRoom === normRoom &&
      normMCat === normCat &&
      (normMName.includes(normOptName) || normOptName.includes(normMName))
    );
  });

  if (!matchedMaterial) {
    matchedMaterial = materials.find(
      (m) =>
        normalizeString(m.room) === normRoom &&
        normalizeString(m.category) === normCat &&
        m.price === option.materialCost
    );
  }

  if (!matchedMaterial) {
    matchedMaterial = materials.find((m) => m.price === option.materialCost);
  }

  if (matchedMaterial) {
    option.materialCost = matchedMaterial.price;
    option.name = matchedMaterial.name;
    option.description = matchedMaterial.description;
  }

  // 2. Find matching Labor
  let matchedLabor = labors.find((l) => {
    const normJob = normalizeString(l.job);
    return normJob.includes(normOptName) || normOptName.includes(normJob);
  });

  if (!matchedLabor) {
    matchedLabor = labors.find((l) => l.recommendedPrice === option.laborCost);
  }

  if (matchedLabor) {
    option.laborCost = matchedLabor.recommendedPrice;
  }
}

function applyRoomJsonCosts(roomName: string, roomDef: RoomDefinition) {
  roomDef.categories.forEach((category) => {
    category.options.forEach((option) => {
      updateOptionCosts(roomName, category.name, option);
    });
  });
}

function applyAllJsonCosts() {
  Object.keys(BASE_ROOM_DATA).forEach((roomKey) => {
    applyRoomJsonCosts(roomKey, BASE_ROOM_DATA[roomKey]);
  });
  
  REMODEL_CATEGORIES.forEach((category) => {
    category.options.forEach((option) => {
      updateOptionCosts("Kitchen", category.name, option);
    });
  });
}

// Trigger initial override
applyAllJsonCosts();

// Dynamic room generator for rooms not predefined in BASE_ROOM_DATA
function generateDynamicRoom(name: string): RoomDefinition {
  const isOutdoor = ["deck", "roofs", "landscaping", "driveway", "outdoor"].some(o => name.toLowerCase().includes(o));
  
  let roomDef: RoomDefinition;
  if (isOutdoor) {
    roomDef = {
      name: name,
      description: `Premium exterior remodel plan for your customized ${name}.`,
      iconName: "Grid",
      categories: [
        {
          id: "base_foundation",
          name: "Base Prep & Foundation",
          description: "Excavation, base leveling, structural frames, or foundational materials.",
          iconName: "Layers",
          options: [
            { id: "keep-existing", name: "Keep Existing", description: "Retain your current foundation and structural framing in their present condition.", materialCost: 0, laborCost: 0, overhead: 0, durationDays: 0 },
            { id: "base-standard", name: "Standard Grade Material", description: "Economic and standard local trade grade materials.", materialCost: 1500, laborCost: 2000, overhead: 500, durationDays: 3 },
            { id: "base-premium", name: "High-Performance Reinforced", description: "Heavy-duty or reinforced materials built for New Orleans climate.", materialCost: 3500, laborCost: 3800, overhead: 1100, durationDays: 5 },
            { id: "base-luxury", name: "Artisanal / Marine Grade", description: "The gold standard of structural base and high-durability timber or stone.", materialCost: 8200, laborCost: 5500, overhead: 2200, durationDays: 8, isPremium: true }
          ]
        },
        {
          id: "surface_finishing",
          name: "Surface & Finishing",
          description: "Primary tiles, decking, paving, or protective surface elements.",
          iconName: "Grid",
          options: [
            { id: "keep-existing", name: "Keep Existing", description: "Retain your current surfaces in their present condition.", materialCost: 0, laborCost: 0, overhead: 0, durationDays: 0 },
            { id: "surface-basic", name: "Economic Solid Finish", description: "Clean, functional standard-finish material.", materialCost: 1200, laborCost: 1800, overhead: 400, durationDays: 3 },
            { id: "surface-mid", name: "Premium Architectural Finish", description: "Highly textured, beautiful matching visual lines, low-maintenance finish.", materialCost: 4500, laborCost: 3200, overhead: 1100, durationDays: 5 },
            { id: "surface-luxury", name: "Signature Historic Stone / Hardwood", description: "Bespoke natural stone, hand-rubbed cedar/ipe, or elite interlocking pavers.", materialCost: 11500, laborCost: 6500, overhead: 2900, durationDays: 9, isPremium: true }
          ]
        },
        {
          id: "accents_features",
          name: "Custom Amenities & Accents",
          description: "Accent walls, privacy screens, borders, drainage, or visual accents.",
          iconName: "Wrench",
          options: [
            { id: "keep-existing", name: "Keep Existing", description: "Retain your current accents or keep options in their present condition.", materialCost: 0, laborCost: 0, overhead: 0, durationDays: 0 },
            { id: "accent-none", name: "No Accents / Basic Layout", description: "Clean boundary line with no extra custom accessories.", materialCost: 0, laborCost: 0, overhead: 0, durationDays: 0 },
            { id: "accent-standard", name: "Standard Ambient Upgrade", description: "Integrated smart accents or weatherproofing protections.", materialCost: 950, laborCost: 850, overhead: 250, durationDays: 2 },
            { id: "accent-luxury", name: "Custom Signature Pergola / Focal Accents", description: "Bespoke design architectural additions or heavy timber integrations.", materialCost: 4800, laborCost: 3200, overhead: 1200, durationDays: 5, isPremium: true }
          ]
        },
        {
          id: "lighting_electrical",
          name: "Landscape & Safety Lighting",
          description: "Low-voltage LED paths, security spots, or decorative lighting.",
          iconName: "Sun",
          options: [
            { id: "keep-existing", name: "Keep Existing", description: "Retain your current lighting and electrical setups in their present condition.", materialCost: 0, laborCost: 0, overhead: 0, durationDays: 0 },
            { id: "light-basic", name: "Simple Light Package", description: "Basic solar path markers or replacement fixture.", materialCost: 250, laborCost: 350, overhead: 90, durationDays: 1 },
            { id: "light-premium", name: "Smart Low-Voltage LED System", description: "Zoned control smart architectural spots and path lighting.", materialCost: 1200, laborCost: 950, overhead: 350, durationDays: 2 },
            { id: "light-luxury", name: "Elite Solid Brass Ambient Luminescence", description: "Custom architectural grade solid brass fixtures, dimmable transformers, and smart app integration.", materialCost: 3400, laborCost: 1800, overhead: 850, durationDays: 3, isPremium: true }
          ]
        }
      ],
      defaultSelections: {
        base_foundation: "keep-existing",
        surface_finishing: "keep-existing",
        accents_features: "keep-existing",
        lighting_electrical: "keep-existing"
      }
    };
  } else {
    // Indoor dynamic room
    roomDef = {
      name: name,
      description: `Complete customized indoor remodel of your ${name}.`,
      iconName: "FolderHeart",
      categories: [
        {
          id: "flooring",
          name: "Flooring & Subflooring",
          description: "High-quality flooring options matching the functionality of the space.",
          iconName: "Layers",
          options: [
            { id: "keep-existing", name: "Keep Existing", description: "Retain your current flooring in its present condition.", materialCost: 0, laborCost: 0, overhead: 0, durationDays: 0 },
            { id: "floor-standard", name: "Luxury Vinyl Plank (LVP)", description: "Scratch-resistant, 100% waterproof high-grade modern flooring.", materialCost: 900, laborCost: 1100, overhead: 250, durationDays: 2 },
            { id: "floor-premium", name: "Engineered Hardwood or Tile", description: "Premium wide-plank oak or thick non-slip porcelain tiling.", materialCost: 3200, laborCost: 2400, overhead: 750, durationDays: 4 },
            { id: "floor-luxury", name: "Historical Reclaimed Heart Pine / Natural Marble", description: "Exquisite historical materials, hand-finished for unmatched luxury.", materialCost: 7500, laborCost: 4200, overhead: 1800, durationDays: 6, isPremium: true }
          ]
        },
        {
          id: "walls_trim",
          name: "Walls, Paint & Moulding",
          description: "Crown mouldings, baseboards, sanding, and designer paint finishes.",
          iconName: "Grid",
          options: [
            { id: "keep-existing", name: "Keep Existing", description: "Retain your current walls, trim, and mouldings in their present condition.", materialCost: 0, laborCost: 0, overhead: 0, durationDays: 0 },
            { id: "walls-basic", name: "Standard Trim & Two-Coat Paint", description: "Professional grade trim board repair and Benjamin Moore paint coats.", materialCost: 350, laborCost: 750, overhead: 155, durationDays: 2 },
            { id: "walls-premium", name: "Craftsman Crown & SW Duration Paint", description: "Upscale historical trim profiling and washable premium satin paint.", materialCost: 1100, laborCost: 1600, overhead: 450, durationDays: 3 },
            { id: "walls-luxury", name: "Venetian Plaster / Customized Wall Panels", description: "High-end hand-troweled authentic plaster coatings or custom wainscoting.", materialCost: 3400, laborCost: 3200, overhead: 1100, durationDays: 5, isPremium: true }
          ]
        },
        {
          id: "builtins_cabinetry",
          name: "Bespoke Cabinetry & Closets",
          description: "Custom built-in closets, media shelving, or space-saving storage.",
          iconName: "FolderHeart",
          options: [
            { id: "keep-existing", name: "Keep Existing", description: "Retain your current cabinetry/closets in their present condition.", materialCost: 0, laborCost: 0, overhead: 0, durationDays: 0 },
            { id: "builtins-none", name: "Clean Flat Wall (No Built-ins)", description: "Standard drywall layout ready for your individual furniture.", materialCost: 0, laborCost: 0, overhead: 0, durationDays: 0 },
            { id: "builtins-standard", name: "Custom Shaker Modular Wardrobe / Shelf", description: "Beautiful modular storage compartments painted to match the walls.", materialCost: 1600, laborCost: 1200, overhead: 450, durationDays: 3 },
            { id: "builtins-luxury", name: "Grand Solid-Hardwood Architectural Joinery", description: "Bespoke built-in library cabinets or luxury walk-in wardrobes with LED vanity lights.", materialCost: 6800, laborCost: 3800, overhead: 1600, durationDays: 7, isPremium: true }
          ]
        },
        {
          id: "electrical_lighting",
          name: "Electrical & Smart Lighting",
          description: "Recessed dimmable LED lights, signature chandeliers, and smart dimmers.",
          iconName: "Sun",
          options: [
            { id: "keep-existing", name: "Keep Existing", description: "Retain your current electrical and smart lighting fixtures in their present condition.", materialCost: 0, laborCost: 0, overhead: 0, durationDays: 0 },
            { id: "elec-standard", name: "Flush LED Potlights & Fan", description: "Standard update of fixtures and addition of modern ceiling fan.", materialCost: 350, laborCost: 450, overhead: 150, durationDays: 1.5 },
            { id: "elec-premium", name: "Recessed Lighting & Smart Dimmers", description: "Zone dimmers, slim LEDs, and premium designer central chandelier.", materialCost: 1400, laborCost: 1200, overhead: 400, durationDays: 2.5 },
            { id: "elec-luxury", name: "Bespoke Architectural Cove Lighting System", description: "Ambient hidden LED tracks, custom brass sconces, and automated smart home switches.", materialCost: 3800, laborCost: 2200, overhead: 950, durationDays: 4, isPremium: true }
          ]
        }
      ],
      defaultSelections: {
        flooring: "keep-existing",
        walls_trim: "keep-existing",
        builtins_cabinetry: "keep-existing",
        electrical_lighting: "keep-existing"
      }
    };
  }

  applyRoomJsonCosts(name, roomDef);
  return roomDef;
}

export const ROOM_DATA = new Proxy<Record<string, RoomDefinition>>(BASE_ROOM_DATA, {
  get(target, prop: string) {
    if (typeof prop !== "string") {
      return Reflect.get(target, prop);
    }
    const propLower = prop.toLowerCase();
    if (propLower === "living room" || propLower === "living space") {
      return target["Living Space"];
    }
    if (propLower === "deck" || propLower === "outdoor deck") {
      return target["Outdoor Deck"];
    }
    if (prop in target) {
      return target[prop];
    }
    // Attempt standard casing match
    const foundKey = Object.keys(target).find(k => k.toLowerCase() === propLower);
    if (foundKey) {
      return target[foundKey];
    }
    return generateDynamicRoom(prop);
  }
});

// Dynamic helper to calculate remodel costs for ANY room definition
export function calculateRoomCosts(
  roomType: string,
  selections: Record<string, string>,
  selectedServices: string[]
) {
  const room = ROOM_DATA[roomType] || ROOM_DATA["Kitchen"];
  
  // Custom Spatial Calibration calculations based on physical dimensions
  let width = 12;
  let length = 10;
  try {
    const stored = localStorage.getItem("nola_builts_new_project_details");
    if (stored) {
      const details = JSON.parse(stored);
      if (details && details.width && details.length && details.spaceType === roomType) {
        width = details.width;
        length = details.length;
      }
    }
  } catch (e) {
    console.error(e);
  }

  const standardAreas: Record<string, number> = {
    Kitchen: 120,
    Bathroom: 60,
    Bedroom: 150,
    "Living Room": 200,
    Basement: 300,
    Attic: 180,
    Garage: 240,
    Sunroom: 120,
    "Laundry Room": 50,
    Mudroom: 40,
    Deck: 160,
    Roofs: 1500,
    Landscaping: 800,
    Driveway: 600
  };
  const standardArea = standardAreas[roomType] || 120;
  const sqft = width * length;
  const scaleFactor = Math.sqrt(sqft / standardArea);

  let materials = 0;
  let labor = 0;
  let overhead = 0;
  let duration = 0;

  // 1. Process room categories
  room.categories.forEach((category) => {
    const selectedOptionId = selections[category.id];
    const option = category.options.find((opt) => opt.id === selectedOptionId);
    if (option) {
      materials += Math.round(option.materialCost * scaleFactor);
      labor += Math.round(option.laborCost * scaleFactor);
      overhead += Math.round(option.overhead * scaleFactor);
      duration += Math.round(option.durationDays * Math.sqrt(scaleFactor));
    }
  });

  // 2. Process additional services (only demolition can apply broadly, but we keep services simple or scale them)
  // Let's import the standard ADDITIONAL_SERVICES or use them
  const demolitionAndDesign = [
    { id: "demolition", name: "Demolition & Haul-Away", materialCost: 150, laborCost: 1100, overhead: 300, durationDays: 2 },
    { id: "permit_fees", name: "Local Permitting & Engineering", materialCost: 400, laborCost: 600, overhead: 150, durationDays: 5 },
    { id: "architect_design", name: "3D Architect Visualization", materialCost: 300, laborCost: 900, overhead: 200, durationDays: 3 }
  ];

  demolitionAndDesign.forEach((service) => {
    if (selectedServices.includes(service.id)) {
      materials += Math.round(service.materialCost * scaleFactor);
      labor += Math.round(service.laborCost * scaleFactor);
      overhead += Math.round(service.overhead * scaleFactor);
      duration += Math.round(service.durationDays * Math.sqrt(scaleFactor));
    }
  });

  const total = materials + labor + overhead;
  const minCost = Math.round(total * 0.9);
  const maxCost = Math.round(total * 1.1);

  let budgetTier: "$" | "$$" | "$$$" | "$$$$" = "$";
  if (total >= 45000) {
    budgetTier = "$$$$";
  } else if (total >= 25000) {
    budgetTier = "$$$";
  } else if (total >= 12000) {
    budgetTier = "$$";
  }

  // Progress Percent
  const totalCategories = room.categories.length;
  let customizedCount = 0;
  room.categories.forEach((cat) => {
    if (selections[cat.id]) customizedCount++;
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
