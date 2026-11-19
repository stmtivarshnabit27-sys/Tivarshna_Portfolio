TIVARSHNA M — RECRUITER-READY REACT PORTFOLIO
================================================

RUN LOCALLY
1. Extract this ZIP.
2. Open the extracted folder named "Tivarshna_3D_Portfolio" in VS Code.
3. Open Terminal > New Terminal. Confirm the terminal is in this folder
   (the same folder that contains package.json).
4. Run these commands once dependencies are installed:
      npm install
      npm run dev
5. Keep the terminal open while viewing the website.
6. Open the Local URL printed by Vite (normally http://localhost:5173).

WINDOWS QUICK START
- You can also double-click START_PORTFOLIO.bat. It installs dependencies
  if node_modules is missing, then starts the Vite development server.

PRODUCTION BUILD
   npm run build
The production website is created in the dist/ folder.
To preview the production build:
   npm run preview

DESIGN UPDATE
- Light, recruiter-friendly theme is enabled by default.
- The theme toggle in the header switches between light and dark modes.
- Typography, navigation, buttons, cards and project previews have been enlarged.
- Responsive layouts support desktop, tablet and mobile screens.
- The hero heading is connected directly to profile.role in
  src/data/portfolio.js, so changing that value updates the displayed role.
- 3D depth, layered glass surfaces, floating hero elements, animated ambient
  lighting, hover tilt and scroll entrance effects add visual movement.
- Project category filters, certificate previews, achievement galleries and
  project detail modals remain interactive.

CURRENT RESUME
- The previous resume file has been replaced with:
  public/assets/resume/Tivarshna_M_AI_Resume.pdf
- The View Resume and Download CV buttons use this new file.

CONTENT EDITING
Open src/data/portfolio.js to edit:
- Profile and social links
- Education and skills
- Internships
- Projects and repository links
- Certificates and company logos
- Achievements and photo galleries

PROJECT MEDIA
- AI YouTube Summariser:
  public/assets/projects/AI-Youtube Summarizer/
  Includes six screenshots and Cloud Report-merged.pdf.
  GitHub: https://github.com/stmtivarshnabit27-sys/AI-YouTube-Summariser
- Hybrid Quantum QFDNN:
  public/assets/projects/Hybrid Quantum/
  Includes experiment/result screenshots and Final Report - QFDNN.pdf.
  GitHub: https://github.com/stmtivarshnabit27-sys/Hybrid-Quantum

Other projects, screenshots, videos and reports are mapped in
src/data/portfolio.js. To add a new image, place it under public/assets and
reference it from the browser path beginning with /assets/ (do not include
"public" in the browser URL).

CERTIFICATES AND ACHIEVEMENTS
Certificate cards open the actual uploaded image/document in a preview with a
download link. Achievement thumbnails open a photo gallery. If a file has not
been supplied, the entry is marked pending rather than displaying a broken file.

CONTACT FORM — EMAILJS SETUP
The contact form requires EmailJS credentials before it can send messages:
1. Create an account at https://www.emailjs.com/
2. Connect an email service that delivers to stmtivarshna@gmail.com.
3. Create a template using:
   {{from_name}}, {{reply_to}}, {{subject}}, {{message}}, {{to_email}}
4. Copy .env.example to .env.local in the project root.
5. Add the values from EmailJS:
   VITE_EMAILJS_SERVICE_ID=your_service_id
   VITE_EMAILJS_TEMPLATE_ID=your_template_id
   VITE_EMAILJS_PUBLIC_KEY=your_public_key
6. Restart Vite after editing .env.local (Ctrl+C, then npm run dev).
7. Test the form before publishing.

Do not put email passwords or private API secrets in frontend code.

PUBLISH
Run npm run build, then publish the project using Vercel or another static
hosting provider. Add .env.local values in the hosting provider's environment
settings. Do not upload .env.local to a public GitHub repository.
