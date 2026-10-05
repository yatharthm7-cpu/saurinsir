// Existing project details; confirm with the owner before publishing.
export const CONTACT = {
  phone: "+919825030708", displayPhone: "98250 30708",
  // Full address exactly as the owner supplied it — keep every landmark.
  // He asked specifically for the complete form, including "opp.
  // Sanskritik" and the colony name; do not shorten it.
  address: "306, Swapneel Complex, Near Sardar Patel Statue Cir, opp. Sanskritik, Sardar Patel Colony, Sundar Nagar, Naranpura, Ahmedabad, Gujarat 380013",
  mapQuery: "Swapneel Complex, Sardar Patel Statue Circle, Naranpura, Ahmedabad, Gujarat 380013",
};

// The deployed domain, as supplied by the owner. Used for the canonical URL
// and absolute social-share image paths. Update only if the domain changes.
export const SITE_URL = "https://saurinsir.vercel.app";

/** WhatsApp click-to-chat link carrying an exact pre-filled message. */
export function whatsappUrl(message: string) {
  return `https://wa.me/${CONTACT.phone.replace("+", "")}?text=${encodeURIComponent(message)}`;
}

export function enquiryUrl(course?: string) {
  return whatsappUrl(
    `Hello Saurin Sir, I would like to enquire about ${course || "commerce tuition"}. Please share the available batches and timings.`,
  );
}

/** Course-finder enquiry: carries the selected level and subject. */
export function subjectEnquiryUrl(level: string, subject: string) {
  return whatsappUrl(
    `Hello Saurin Sir, I am studying ${level} and I need help with ${subject}. Please share the available batches, timings and syllabus coverage for this subject.`,
  );
}
