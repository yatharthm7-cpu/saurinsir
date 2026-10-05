# Prompt audit and delivery notes

Already present: navy/ivory/gold identity, editorial typography, alternating sections, native scroll video, contact links and map.

Completed in this pass: book-panel opening integrated with existing video; visible hero actions and proper H1; shorter mobile sequence; course filters and context-specific WhatsApp links; lightweight 3D course illustrations and pointer tilt; connected learning roadmap; native accessible FAQ accordions; persistent WhatsApp action; central contact data; mobile-menu Escape/focus handling; fixed-header anchor offsets; reduced-motion static opening; content visible without JavaScript; event-driven hero animation rather than a permanent animation loop.

Removed from the rendered page: unverified statistics, academic-year attribution, named testimonials, fixed batch-size promise, late-night support promise, assumed timetable, and free-demo offer. Original results component is retained but not rendered, pending approved evidence.

Owner material still needed before publication: real teacher portrait and classroom photographs with permission; confirmation of teacher identity, qualifications, address, phone, exact course/subject mappings (especially foundation syllabi), teaching process, fees, timetable and demo availability; approved testimonials and supported result figures. Existing project contact and broad course details are retained provisionally. The learning roadmap is framed as a study guide rather than an unverified service promise.

No public deployment requested. No enquiry backend is required: actions use phone and WhatsApp, without pretending to submit a form.

Verification: production build and TypeScript passed; full lint passed after excluding existing local screenshot-analysis utilities. Browser checked at 390x844 and 1440x900: menu open/Escape/focus return, course filtering, contextual enquiry hrefs, FAQ expansion, native scroll opening forward/backward, proper H1, no broken anchors and no horizontal overflow. Browser console showed no warnings/errors during the checked interactions. Reduced-motion and no-JavaScript paths were reviewed in code; not emulated live. Real-device Safari and slow-network/media-error scenarios remain untested.
