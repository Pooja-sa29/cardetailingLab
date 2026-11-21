// Simple in-memory data store for The Detailing Lab.
// Replace with real API calls / a backend (Firebase, Supabase, custom REST) later.

export let customers = [
  {
    id: "c1",
    name: "Rohan Deshmukh",
    phone: "+91 98230 11223",
    email: "rohan.d@example.com",
    address: "Civil Lines, Nagpur",
    vehicleIds: ["v1", "v2"],
  },
  {
    id: "c2",
    name: "Ayesha Khan",
    phone: "+91 90211 44556",
    email: "ayesha.k@example.com",
    address: "Dharampeth, Nagpur",
    vehicleIds: ["v3"],
  },
  {
    id: "c3",
    name: "Vikram Solanki",
    phone: "+91 88888 12121",
    email: "vikram.s@example.com",
    address: "Sadar, Nagpur",
    vehicleIds: [],
  },
];

export let vehicles = [
  {
    id: "v1",
    customerId: "c1",
    make: "Hyundai",
    model: "Creta",
    year: "2022",
    plate: "MH 31 AB 1234",
    color: "Pearl White",
    service: "Full Detail + Ceramic Coat",
    status: "In Progress",
  },
  {
    id: "v2",
    customerId: "c1",
    make: "Royal Enfield",
    model: "Classic 350",
    year: "2021",
    plate: "MH 31 CD 5678",
    color: "Stealth Black",
    service: "Bike Wash + Polish",
    status: "Completed",
  },
  {
    id: "v3",
    customerId: "c2",
    make: "Maruti Suzuki",
    model: "Baleno",
    year: "2023",
    plate: "MH 40 EF 9012",
    color: "Nexa Blue",
    service: "Interior Deep Clean",
    status: "Scheduled",
  },
];

export function addCustomer(customer) {
  customers = [customer, ...customers];
  return customer;
}

export function addVehicle(vehicle) {
  vehicles = [vehicle, ...vehicles];
  if (vehicle.customerId) {
    customers = customers.map((c) =>
      c.id === vehicle.customerId
        ? { ...c, vehicleIds: [...c.vehicleIds, vehicle.id] }
        : c
    );
  }
  return vehicle;
}

export function getVehiclesForCustomer(customerId) {
  return vehicles.filter((v) => v.customerId === customerId);
}

export function getCustomerById(id) {
  return customers.find((c) => c.id === id);
}

export function getVehicleById(id) {
  return vehicles.find((v) => v.id === id);
}

export function dashboardStats() {
  return {
    totalCustomers: customers.length,
    totalVehicles: vehicles.length,
    inProgress: vehicles.filter((v) => v.status === "In Progress").length,
    completedToday: vehicles.filter((v) => v.status === "Completed").length,
  };
}
