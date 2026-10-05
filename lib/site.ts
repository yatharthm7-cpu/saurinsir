// Existing project details; confirm with the owner before publishing.
export const CONTACT = {
  phone: "+919825030708", displayPhone: "98250 30708",
  // Full address exactly as the owner supplied it — keep every landmark.
  // He asked specifically for the complete form, including "opp.
  // Sanskritik" and the colony name; do not shorten it.
  address: "306, Swapneel Complex, Near Sardar Patel Statue Cir, opp. Sanskritik, Sardar Patel Colony, Sundar Nagar, Naranpura, Ahmedabad, Gujarat 380013",
  mapQuery: "Swapneel Complex, Sardar Patel Statue Circle, Naranpura, Ahmedabad, Gujarat 380013",
};
export function enquiryUrl(course?: string) {
  return `https://wa.me/${CONTACT.phone.replace("+", "")}?text=${encodeURIComponent(`Hello Saurin Sir, I would like to enquire about ${course || "commerce tuition"}. Please share the available batches and timings.`)}`;
}
