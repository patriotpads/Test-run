export interface Property {
  id: number;
  title: string;
  location: {
    city: string;
    state: "California" | "Florida" | "Oklahoma";
  };
  price: number;
  bedrooms: number;
  bathrooms: number;
  maxGuests: number;
  amenities: string[];
  rating: number;
  reviewCount: number;
  description: string;
  images: string[];
  featured?: boolean;
}

export const properties: Property[] = [
  {
    id: 1,
    title: "Luxury Beach House",
    location: {
      city: "Malibu",
      state: "California",
    },
    price: 350,
    bedrooms: 4,
    bathrooms: 3,
    maxGuests: 8,
    amenities: ["Ocean View", "Private Pool", "Hot Tub", "WiFi", "Kitchen", "Free Parking"],
    rating: 4.9,
    reviewCount: 128,
    description: "Experience the ultimate luxury beachfront retreat with stunning ocean views. This spacious Malibu beach house features modern architecture, floor-to-ceiling windows, and direct beach access. Enjoy breathtaking sunsets from your private deck or take a dip in the infinity pool overlooking the Pacific Ocean.",
    images: [
      "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=800&auto=format&fit=crop",
    ],
    featured: true
  },
  {
    id: 2,
    title: "Mountain Cabin Retreat",
    location: {
      city: "Big Bear",
      state: "California",
    },
    price: 230,
    bedrooms: 3,
    bathrooms: 2,
    maxGuests: 6,
    amenities: ["Mountain View", "Fireplace", "Hot Tub", "WiFi", "Kitchen", "Free Parking"],
    rating: 4.8,
    reviewCount: 95,
    description: "Escape to this charming mountain cabin surrounded by towering pine trees and fresh mountain air. Perfect for family getaways or a romantic retreat, this cabin offers modern amenities while keeping its rustic charm intact. Enjoy hiking nearby trails or simply relax on the deck with panoramic forest views.",
    images: [
      "https://images.unsplash.com/photo-1472396961693-142e6e269027?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=800&auto=format&fit=crop",
    ]
  },
  {
    id: 3,
    title: "Lakefront Cottage",
    location: {
      city: "Orlando",
      state: "Florida",
    },
    price: 195,
    bedrooms: 2,
    bathrooms: 1,
    maxGuests: 4,
    amenities: ["Lake View", "Dock", "Canoe", "WiFi", "Kitchen", "Free Parking"],
    rating: 4.7,
    reviewCount: 73,
    description: "Unwind in this peaceful lakefront cottage just minutes from Orlando's attractions. Start your mornings with coffee on the private dock and spend your days fishing or exploring the lake with the provided canoe. Perfect for families seeking both relaxation and adventure.",
    images: [
      "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1500673922987-e212871fec22?w=800&auto=format&fit=crop",
    ],
    featured: true
  },
  {
    id: 4,
    title: "Historic Ranch House",
    location: {
      city: "Tulsa",
      state: "Oklahoma",
    },
    price: 175,
    bedrooms: 3,
    bathrooms: 2,
    maxGuests: 6,
    amenities: ["Horse Riding", "BBQ", "Fire Pit", "WiFi", "Kitchen", "Free Parking"],
    rating: 4.8,
    reviewCount: 62,
    description: "Experience authentic Western charm in this restored historic ranch house. Situated on 15 acres of private land, this property offers the perfect blend of modern comfort and country living. Enjoy horseback riding, stargazing by the fire pit, or simply relaxing on the wrap-around porch.",
    images: [
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=800&auto=format&fit=crop",
    ]
  },
  {
    id: 5,
    title: "Miami Beach Condo",
    location: {
      city: "Miami",
      state: "Florida",
    },
    price: 280,
    bedrooms: 2,
    bathrooms: 2,
    maxGuests: 4,
    amenities: ["Ocean View", "Pool", "Gym", "WiFi", "Kitchen", "Free Parking"],
    rating: 4.6,
    reviewCount: 104,
    description: "Sleek and modern high-rise condo with spectacular views of Miami Beach. This stylish property features contemporary design, top-notch amenities, and an ideal location just steps from the beach and Miami's vibrant nightlife. The building offers a luxury pool, fitness center, and 24-hour security.",
    images: [
      "https://images.unsplash.com/photo-1492321936769-b49830bc1d1e?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=800&auto=format&fit=crop",
    ],
    featured: true
  },
  {
    id: 6,
    title: "Desert Oasis",
    location: {
      city: "Palm Springs",
      state: "California",
    },
    price: 290,
    bedrooms: 3,
    bathrooms: 2,
    maxGuests: 6,
    amenities: ["Private Pool", "Mountain View", "Hot Tub", "WiFi", "Kitchen", "Free Parking"],
    rating: 4.9,
    reviewCount: 89,
    description: "Escape to this mid-century modern desert retreat featuring stunning mountain views and a private pool. This Palm Springs gem combines retro charm with modern luxury, creating the perfect setting for a memorable vacation. Enjoy the year-round sunshine and outdoor living that makes Palm Springs famous.",
    images: [
      "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1500673922987-e212871fec22?w=800&auto=format&fit=crop",
    ]
  },
  {
    id: 7,
    title: "Seaside Villa",
    location: {
      city: "Santa Barbara",
      state: "California",
    },
    price: 420,
    bedrooms: 5,
    bathrooms: 4,
    maxGuests: 10,
    amenities: ["Beach Access", "Private Pool", "Hot Tub", "WiFi", "Kitchen", "Free Parking", "Ocean View", "Gym"],
    rating: 4.9,
    reviewCount: 156,
    description: "Luxury beachfront villa with panoramic ocean views. This stunning property features Mediterranean architecture, a private infinity pool, and direct beach access. Perfect for large families or group retreats.",
    images: [
      "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1500673922987-e212871fec22?w=800&auto=format&fit=crop",
    ],
    featured: true
  },
  {
    id: 8,
    title: "Downtown Loft",
    location: {
      city: "San Francisco",
      state: "California",
    },
    price: 275,
    bedrooms: 2,
    bathrooms: 2,
    maxGuests: 4,
    amenities: ["City View", "WiFi", "Kitchen", "Free Parking", "Gym", "Concierge"],
    rating: 4.7,
    reviewCount: 92,
    description: "Modern loft in the heart of San Francisco with stunning city views. Walking distance to major attractions, restaurants, and shopping areas.",
    images: [
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=800&auto=format&fit=crop",
    ]
  },
  {
    id: 9,
    title: "Wine Country Cottage",
    location: {
      city: "Napa",
      state: "California",
    },
    price: 310,
    bedrooms: 3,
    bathrooms: 2,
    maxGuests: 6,
    amenities: ["Vineyard View", "WiFi", "Kitchen", "Free Parking", "Wine Cellar", "Garden"],
    rating: 4.8,
    reviewCount: 75,
    description: "Charming cottage surrounded by vineyards. Features a private wine cellar and outdoor entertainment area perfect for wine tasting evenings.",
    images: [
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=800&auto=format&fit=crop",
    ]
  },
  {
    id: 10,
    title: "Beachfront Condo",
    location: {
      city: "Naples",
      state: "Florida",
    },
    price: 245,
    bedrooms: 2,
    bathrooms: 2,
    maxGuests: 4,
    amenities: ["Beach Access", "Pool", "WiFi", "Kitchen", "Free Parking", "Beach View"],
    rating: 4.6,
    reviewCount: 88,
    description: "Modern beachfront condo with stunning Gulf views. Enjoy beautiful sunsets from your private balcony or take a stroll on the white sandy beach.",
    images: [
      "https://images.unsplash.com/photo-1492321936769-b49830bc1d1e?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=800&auto=format&fit=crop",
    ]
  },
  {
    id: 11,
    title: "Lake House Retreat",
    location: {
      city: "Winter Park",
      state: "Florida",
    },
    price: 195,
    bedrooms: 3,
    bathrooms: 2,
    maxGuests: 6,
    amenities: ["Lake View", "Dock", "Kayaks", "WiFi", "Kitchen", "Free Parking", "BBQ"],
    rating: 4.7,
    reviewCount: 64,
    description: "Peaceful lakefront property with private dock and complimentary kayaks. Perfect for outdoor enthusiasts and families.",
    images: [
      "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1500673922987-e212871fec22?w=800&auto=format&fit=crop",
    ]
  },
  {
    id: 12,
    title: "Theme Park Villa",
    location: {
      city: "Kissimmee",
      state: "Florida",
    },
    price: 330,
    bedrooms: 6,
    bathrooms: 4,
    maxGuests: 12,
    amenities: ["Pool", "Game Room", "WiFi", "Kitchen", "Free Parking", "Theater Room"],
    rating: 4.8,
    reviewCount: 142,
    description: "Spacious villa minutes from major theme parks. Features a private pool, game room, and home theater perfect for family entertainment.",
    images: [
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=800&auto=format&fit=crop",
    ],
    featured: true
  },
  {
    id: 13,
    title: "Rustic Ranch House",
    location: {
      city: "Broken Arrow",
      state: "Oklahoma",
    },
    price: 165,
    bedrooms: 3,
    bathrooms: 2,
    maxGuests: 6,
    amenities: ["Horse Stables", "Hiking Trails", "WiFi", "Kitchen", "Free Parking", "Fire Pit"],
    rating: 4.7,
    reviewCount: 58,
    description: "Authentic ranch experience with horse riding facilities and hiking trails. Perfect for nature lovers and families.",
    images: [
      "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1500673922987-e212871fec22?w=800&auto=format&fit=crop",
    ]
  },
  {
    id: 14,
    title: "Lakeside Cabin",
    location: {
      city: "Broken Bow",
      state: "Oklahoma",
    },
    price: 185,
    bedrooms: 2,
    bathrooms: 1,
    maxGuests: 4,
    amenities: ["Lake View", "Fishing Dock", "WiFi", "Kitchen", "Free Parking", "BBQ"],
    rating: 4.6,
    reviewCount: 45,
    description: "Cozy cabin by the lake perfect for fishing and outdoor activities. Includes a private dock and outdoor BBQ area.",
    images: [
      "https://images.unsplash.com/photo-1492321936769-b49830bc1d1e?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=800&auto=format&fit=crop",
    ]
  },
  {
    id: 15,
    title: "Modern Downtown Loft",
    location: {
      city: "Oklahoma City",
      state: "Oklahoma",
    },
    price: 145,
    bedrooms: 1,
    bathrooms: 1,
    maxGuests: 2,
    amenities: ["City View", "WiFi", "Kitchen", "Free Parking", "Gym", "Rooftop Access"],
    rating: 4.8,
    reviewCount: 73,
    description: "Stylish loft in downtown OKC with amazing city views. Walking distance to Bricktown entertainment district.",
    images: [
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=800&auto=format&fit=crop",
    ]
  },
  {
    id: 16,
    title: "Hollywood Hills Villa",
    location: {
      city: "Los Angeles",
      state: "California",
    },
    price: 495,
    bedrooms: 4,
    bathrooms: 3.5,
    maxGuests: 8,
    amenities: ["City View", "Pool", "Hot Tub", "WiFi", "Kitchen", "Free Parking", "Home Theater"],
    rating: 4.9,
    reviewCount: 112,
    description: "Luxurious villa in the Hollywood Hills with stunning city views. Features a infinity pool and professional home theater system.",
    images: [
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=800&auto=format&fit=crop",
    ],
    featured: true
  },
  {
    id: 17,
    title: "Coastal Retreat",
    location: {
      city: "Fort Lauderdale",
      state: "Florida",
    },
    price: 285,
    bedrooms: 3,
    bathrooms: 2,
    maxGuests: 6,
    amenities: ["Beach Access", "Pool", "WiFi", "Kitchen", "Free Parking", "Beach Equipment"],
    rating: 4.7,
    reviewCount: 94,
    description: "Beautiful coastal home minutes from the beach. Includes pool and complimentary beach equipment.",
    images: [
      "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1500673922987-e212871fec22?w=800&auto=format&fit=crop",
    ]
  },
  {
    id: 18,
    title: "Mountain View Cabin",
    location: {
      city: "Lake Arrowhead",
      state: "California",
    },
    price: 225,
    bedrooms: 2,
    bathrooms: 2,
    maxGuests: 4,
    amenities: ["Mountain View", "Hot Tub", "WiFi", "Kitchen", "Free Parking", "Fireplace"],
    rating: 4.8,
    reviewCount: 86,
    description: "Cozy cabin with stunning mountain views. Perfect for a romantic getaway or small family vacation.",
    images: [
      "https://images.unsplash.com/photo-1492321936769-b49830bc1d1e?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=800&auto=format&fit=crop",
    ]
  },
  {
    id: 19,
    title: "Country Estate",
    location: {
      city: "Edmond",
      state: "Oklahoma",
    },
    price: 275,
    bedrooms: 4,
    bathrooms: 3,
    maxGuests: 8,
    amenities: ["Pool", "Tennis Court", "WiFi", "Kitchen", "Free Parking", "Game Room"],
    rating: 4.9,
    reviewCount: 67,
    description: "Spacious country estate on 5 acres with pool and tennis court. Perfect for family gatherings.",
    images: [
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=800&auto=format&fit=crop",
    ]
  },
  {
    id: 20,
    title: "Luxury Beach House",
    location: {
      city: "Clearwater",
      state: "Florida",
    },
    price: 450,
    bedrooms: 5,
    bathrooms: 4,
    maxGuests: 10,
    amenities: ["Beach Access", "Private Pool", "Hot Tub", "WiFi", "Kitchen", "Free Parking", "Game Room"],
    rating: 4.9,
    reviewCount: 134,
    description: "Spectacular beachfront property with private pool and game room. Perfect for large groups or family reunions.",
    images: [
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=800&auto=format&fit=crop",
    ],
    featured: true
  }
];

export const getPropertyById = (id: number): Property | undefined => {
  return properties.find(property => property.id === id);
};

export const getFeaturedProperties = (): Property[] => {
  return properties.filter(property => property.featured);
};

export const getPropertiesByState = (state: "California" | "Florida" | "Oklahoma"): Property[] => {
  return properties.filter(property => property.location.state === state);
};
