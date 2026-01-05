export interface Complaint {
  id: string;
  title: string;
  description: string;
  originalText: string;
  department: string;
  area: string;
  urgency: "high" | "medium" | "low";
  status: "pending" | "in-progress" | "resolved";
  submittedAt: string;
  hasImage: boolean;
  hasDocument: boolean;
  location?: {
    lat: number;
    lng: number;
    address: string;
  };
}

export const mockComplaints: Complaint[] = [
  {
    id: "INT-M7K2X-AB12",
    title: "Sewage overflow on Main Street",
    description: "Raw sewage is overflowing from the manhole near the intersection of Main Street and Oak Avenue. The situation has been ongoing for two days and poses a health hazard to residents.",
    originalText: "There is raw sewage coming out of the manhole near my house on Main Street. It started two days ago and smells terrible. My children cannot play outside anymore. Please fix this urgently.",
    department: "Public Works",
    area: "Downtown",
    urgency: "high",
    status: "pending",
    submittedAt: "2026-01-05T08:30:00Z",
    hasImage: true,
    hasDocument: false,
    location: {
      lat: 28.6139,
      lng: 77.2090,
      address: "Main Street & Oak Avenue, Downtown"
    }
  },
  {
    id: "INT-N8L3Y-CD34",
    title: "Broken streetlight on Elm Road",
    description: "A streetlight has been non-functional for over a week on Elm Road near the community park. The area becomes very dark at night, creating safety concerns.",
    originalText: "The streetlight outside the park on Elm Road has been broken for a week. It's very dark at night and I feel unsafe walking home from work.",
    department: "Electrical",
    area: "Residential North",
    urgency: "medium",
    status: "in-progress",
    submittedAt: "2026-01-04T14:15:00Z",
    hasImage: false,
    hasDocument: false,
  },
  {
    id: "INT-P9M4Z-EF56",
    title: "Pothole on Highway 12",
    description: "Large pothole approximately 2 feet wide on Highway 12 near kilometer marker 45. Multiple vehicles have been damaged.",
    originalText: "Big pothole on Highway 12 near km 45. My car tire got damaged yesterday. Other cars also stopping there.",
    department: "Roads",
    area: "Highway Zone",
    urgency: "high",
    status: "pending",
    submittedAt: "2026-01-05T06:45:00Z",
    hasImage: true,
    hasDocument: true,
    location: {
      lat: 28.6280,
      lng: 77.2175,
      address: "Highway 12, KM 45"
    }
  },
  {
    id: "INT-Q0N5A-GH78",
    title: "Garbage not collected for 3 days",
    description: "Garbage has not been collected from Sector 15 for the past 3 days. Bins are overflowing and stray animals are scattering waste.",
    originalText: "No garbage collection in Sector 15 since Monday. Bins are full and dogs are making a mess everywhere.",
    department: "Sanitation",
    area: "Sector 15",
    urgency: "medium",
    status: "pending",
    submittedAt: "2026-01-04T09:20:00Z",
    hasImage: true,
    hasDocument: false,
  },
  {
    id: "INT-R1O6B-IJ90",
    title: "Water supply disruption",
    description: "No water supply in Block C apartments since early morning. Residents are facing difficulties with daily activities.",
    originalText: "We have had no water since 5 AM today in Block C. Can't cook or clean. Please restore water supply.",
    department: "Water",
    area: "Block C Apartments",
    urgency: "high",
    status: "in-progress",
    submittedAt: "2026-01-05T05:30:00Z",
    hasImage: false,
    hasDocument: false,
  },
  {
    id: "INT-S2P7C-KL12",
    title: "Tree blocking road after storm",
    description: "A large tree fell during last night's storm and is partially blocking the road on Green Lane. Traffic is moving slowly in one lane.",
    originalText: "Tree fell on Green Lane after the storm. Cars can barely pass. Someone might get hurt.",
    department: "Public Works",
    area: "Green Lane",
    urgency: "medium",
    status: "pending",
    submittedAt: "2026-01-05T07:00:00Z",
    hasImage: true,
    hasDocument: false,
  },
  {
    id: "INT-T3Q8D-MN34",
    title: "Park bench vandalized",
    description: "Several benches in Central Park have been vandalized with graffiti. Some benches have broken slats.",
    originalText: "The benches in Central Park have graffiti and some are broken. It looks bad for our community.",
    department: "Parks",
    area: "Central Park",
    urgency: "low",
    status: "pending",
    submittedAt: "2026-01-03T16:40:00Z",
    hasImage: true,
    hasDocument: false,
  },
];

export const departments = [
  "All Departments",
  "Public Works",
  "Electrical",
  "Roads",
  "Sanitation",
  "Water",
  "Parks",
];

export const areas = [
  "All Areas",
  "Downtown",
  "Residential North",
  "Highway Zone",
  "Sector 15",
  "Block C Apartments",
  "Green Lane",
  "Central Park",
];
