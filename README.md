# CampusCompass AI

> **"Know your next step."**  
> An AI-assisted planning and pedagogical coach that turns disparate course syllabi and volatile shift schedules into workable weekly execution routines for community college students.

Developed for the **AI for Community Impact Challenge** (November 2026) in collaboration with **Wake Technical Community College**.

## 👥 Team 6
- **Austin Mirando** – Systems Architecture & Workflow Implementation
- **Brianna Camacho** – Student Experience & Care Team Alignment
- **Tarek Mohamed** – AI Verification Pipeline & Policy Design
- **Kashish Ramnani** – Empirical Data Evaluation & Pilot Metrics
- **Academic Advisor:** Tyerice Armwood – Wake Technical Community College

---

## 🧭 Key Project Pillars

1. **Empirical Need Grounding**
   - **66%** of community college credit students attend part-time ([AACC Fast Facts 2025](https://www.aacc.nche.edu)).
   - **59%** of part-time students work full-time jobs alongside their studies.
   - Grounded in Oreopoulos et al. ([NBER #25036](https://doi.org/10.3386/w25036)) showing generic nudges and planning modules fail unless anchored to verified course deadlines and dynamic life adaptation.

2. **Two Connected Workflows**
   - **Syllabus Verification & Calendar Assembly**: Extracts assignments with document and page coordinates (`p. 3`, `p. 4`), requiring student sign-off before scheduling.
   - **Dynamic Conflict Adaptation**: Automatically re-allocates study sessions when employers reschedule job shifts.
   - **Guardrailed Learning Coach**: Delivers Socratic guidance adhering to instructor course policies (no answers on graded work) with direct referral routing to human Wake Tech Care Team tutors and coaches.

3. **Responsible AI & FERPA Alignment**
   - Zero integration with Student Information Systems (SIS).
   - Minimal data input; semester-long retention limits with student deletion controls.
   - Unilateral institutional pause/kill switch for Care Team administrators.

---

## 📁 Repository Structure

```text
├── index.html          # Showcase presentation website
├── styles.css          # Editorial research design system (responsive, dark/light)
├── script.js           # Interactive sandbox, review timer, chapter scrubbing
├── server.py           # Local HTTP server with RFC 7233 Range support for video
├── assets/             # System diagrams and slide media
└── Public/             # Official competition deliverables
    ├── CampusCompass AI Proposal.docx
    ├── CampusCompass-AI-Showcase-Presentation_updated.pptx
    ├── CampusCompass-AI-Poster-36x24.pdf
    └── CampusCompass-AI-Pitch-Video-v3.mp4
```

## 🚀 Running Locally

```bash
# Start local streaming server on port 8085
python server.py 8085
```
Open [http://localhost:8085](http://localhost:8085) in any modern browser.
