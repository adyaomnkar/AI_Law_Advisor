"""
Action Engine — detects relevant government portals and action buttons
based on user query and extracted entities.
"""
import re


# Each rule has:
#   keywords: list of keyword patterns (any match triggers)
#   age_check: None | 'above_18' | 'below_18' (if None, always shown)
#   portals: list of portal dicts
PORTAL_RULES = [
    # SIM / Aadhaar / KYC fraud → TAFCOP
    {
        "keywords": ["sim", "mobile connection", "kyc", "aadhar", "aadhaar", "sim card", "registered sim",
                     "number registered", "my number", "kyc fraud", "duplicate sim", "sim swap"],
        "portals": [
            {
                "id": "tafcop",
                "label": "Check My SIM Cards (TAFCOP)",
                "desc": "See all mobile numbers linked to your Aadhaar & block unauthorized SIMs",
                "url": "https://tafcop.sanchaarsaathi.gov.in",
                "icon": "shield",
                "color": "blue",
                "category": "SIM / KYC Fraud"
            },
            {
                "id": "cybercrime",
                "label": "Report Cyber Crime",
                "desc": "File online complaint for cyber fraud and identity theft",
                "url": "https://cybercrime.gov.in",
                "icon": "flag",
                "color": "red",
                "category": "Cyber Crime"
            }
        ]
    },
    # Non-consensual intimate images (NCII) — above 18
    {
        "keywords": ["nude", "naked", "intimate image", "private video", "intimate video", "non consensual",
                     "blackmail photo", "blackmail video", "morphed image", "deepfake", "obscene content",
                     "viral photo", "viral video", "sexual video", "sextortion", "revenge porn",
                     "without consent photo", "explicit image", "private photo"],
        "age_gate": "above_18",
        "portals": [
            {
                "id": "stopncii",
                "label": "Stop NCII (Adults 18+)",
                "desc": "Hash & block non-consensual intimate images across platforms — for victims 18 and above",
                "url": "https://stopncii.org",
                "icon": "eye-off",
                "color": "purple",
                "category": "Image / Video Removal"
            },
            {
                "id": "takeitdown_adult",
                "label": "Take It Down (Under 18)",
                "desc": "Remove intimate images of minors from the internet — for victims under 18",
                "url": "https://takeitdown.ncmec.org",
                "icon": "shield",
                "color": "orange",
                "category": "Child Protection"
            },
            {
                "id": "cybercrime",
                "label": "Report Cyber Crime",
                "desc": "File FIR for sextortion, non-consensual pornography under IT Act 66E, 67A",
                "url": "https://cybercrime.gov.in",
                "icon": "flag",
                "color": "red",
                "category": "Cyber Crime"
            }
        ]
    },
    # Child sexual abuse / CSAM
    {
        "keywords": ["child abuse", "child sexual", "csam", "child porn", "minor abuse", "pocso",
                     "child exploitation", "sexual abuse of minor", "juvenile abuse"],
        "portals": [
            {
                "id": "takeitdown",
                "label": "Take It Down (NCMEC)",
                "desc": "Remove sexual images of minors from internet — official NCMEC tool",
                "url": "https://takeitdown.ncmec.org",
                "icon": "shield",
                "color": "orange",
                "category": "Child Protection"
            },
            {
                "id": "ncpcr",
                "label": "NCPCR Child Rights Portal",
                "desc": "National Commission for Protection of Child Rights — file complaint",
                "url": "https://www.ncpcr.gov.in",
                "icon": "heart",
                "color": "blue",
                "category": "Child Protection"
            },
            {
                "id": "childline",
                "label": "CHILDLINE 1098",
                "desc": "24x7 emergency helpline for children in distress — call 1098",
                "url": "https://www.childlineindia.org",
                "icon": "phone",
                "color": "green",
                "category": "Child Protection"
            }
        ]
    },
    # Online financial fraud / UPI / banking
    {
        "keywords": ["fraud", "upi", "online fraud", "money fraud", "bank fraud", "otp fraud",
                     "payment fraud", "financial fraud", "lost money", "account hacked", "debit card fraud",
                     "credit card fraud", "net banking fraud", "1930", "scam", "phishing",
                     "vishing", "fake call bank", "kyc fraud", "transaction fraud"],
        "portals": [
            {
                "id": "cybercrime_1930",
                "label": "Call 1930 — Cyber Crime Helpline",
                "desc": "Call immediately to freeze fraudulent transactions — National Cyber Crime Helpline",
                "url": "https://cybercrime.gov.in",
                "icon": "phone",
                "color": "red",
                "category": "Financial Fraud"
            },
            {
                "id": "cybercrime",
                "label": "File Complaint — cybercrime.gov.in",
                "desc": "File online complaint for UPI fraud, banking fraud, online scams",
                "url": "https://cybercrime.gov.in",
                "icon": "flag",
                "color": "red",
                "category": "Financial Fraud"
            },
            {
                "id": "rbi_ombudsman",
                "label": "RBI Banking Ombudsman",
                "desc": "File complaint against bank for unauthorized transactions",
                "url": "https://cms.rbi.org.in",
                "icon": "building",
                "color": "blue",
                "category": "Banking Fraud"
            }
        ]
    },
    # General cyber crime
    {
        "keywords": ["hacking", "hack", "cyber crime", "cybercrime", "ransomware", "malware",
                     "data breach", "identity theft", "account hacked", "password stolen",
                     "dark web", "it act", "information technology"],
        "portals": [
            {
                "id": "cybercrime",
                "label": "Report at cybercrime.gov.in",
                "desc": "National portal for reporting all types of cyber crimes",
                "url": "https://cybercrime.gov.in",
                "icon": "flag",
                "color": "red",
                "category": "Cyber Crime"
            },
            {
                "id": "cert_in",
                "label": "CERT-In (Incident Reporting)",
                "desc": "Report cybersecurity incidents including ransomware, data breaches",
                "url": "https://www.cert-in.org.in",
                "icon": "shield",
                "color": "blue",
                "category": "Cyber Security"
            }
        ]
    },
    # Women safety / harassment / domestic violence
    {
        "keywords": ["women", "woman", "domestic violence", "harassment", "molestation", "rape",
                     "sexual assault", "dowry", "acid attack", "stalking", "eve teasing",
                     "gender violence", "marital abuse", "wife", "gender discrimination",
                     "sexual harassment workplace", "posh", "maternity"],
        "portals": [
            {
                "id": "ncw",
                "label": "NCW — National Commission for Women",
                "desc": "File complaint with National Commission for Women online",
                "url": "https://ncwapps.nic.in",
                "icon": "heart",
                "color": "pink",
                "category": "Women Safety"
            },
            {
                "id": "women_helpline",
                "label": "Women Helpline — 181",
                "desc": "24x7 emergency helpline for women in distress — call 181",
                "url": "https://wcd.nic.in/schemes/universalisation-womens-helpline",
                "icon": "phone",
                "color": "purple",
                "category": "Women Safety"
            },
            {
                "id": "one_stop_centre",
                "label": "One Stop Centre (Sakhi)",
                "desc": "Integrated support services — medical, police, legal, psychological help for women",
                "url": "https://wcd.nic.in/schemes/one-stop-centre-scheme-sakhi",
                "icon": "home",
                "color": "green",
                "category": "Women Safety"
            }
        ]
    },
    # Consumer complaint
    {
        "keywords": ["consumer", "product defect", "refund", "defective", "ecommerce", "online shopping",
                     "seller fraud", "fake product", "misleading advertisement", "overpricing",
                     "service deficiency", "insurance claim"],
        "portals": [
            {
                "id": "edaakhil",
                "label": "e-Daakhil — Consumer Complaint",
                "desc": "File consumer complaint online — free for claims under ₹5 lakhs",
                "url": "https://edaakhil.nic.in",
                "icon": "file",
                "color": "green",
                "category": "Consumer Rights"
            },
            {
                "id": "national_consumer_helpline",
                "label": "National Consumer Helpline — 1915",
                "desc": "Government helpline for consumer grievances — call 1800-11-4000 or 1915",
                "url": "https://consumerhelpline.gov.in",
                "icon": "phone",
                "color": "blue",
                "category": "Consumer Rights"
            }
        ]
    },
    # Legal aid
    {
        "keywords": ["legal aid", "free lawyer", "legal help", "can't afford lawyer", "poor", "free legal",
                     "nalsa", "dlsa", "lok adalat", "tele law"],
        "portals": [
            {
                "id": "nalsa",
                "label": "NALSA — Free Legal Aid",
                "desc": "National Legal Services Authority — free legal aid for eligible citizens",
                "url": "https://nalsa.gov.in",
                "icon": "balance",
                "color": "amber",
                "category": "Legal Aid"
            },
            {
                "id": "tele_law",
                "label": "Tele-Law — Free Legal Consultation",
                "desc": "Free legal consultation via video call at CSC centres — call 1800-11-0031",
                "url": "https://www.tele-law.in",
                "icon": "video",
                "color": "blue",
                "category": "Legal Aid"
            }
        ]
    },
    # RTI
    {
        "keywords": ["rti", "right to information", "government information", "public records",
                     "transparency", "information request"],
        "portals": [
            {
                "id": "rti",
                "label": "File RTI Online",
                "desc": "Submit Right to Information request to Central Government departments",
                "url": "https://rtionline.gov.in",
                "icon": "file",
                "color": "blue",
                "category": "RTI"
            }
        ]
    },
    # Human trafficking / missing persons
    {
        "keywords": ["missing", "trafficking", "human trafficking", "kidnapped", "missing child",
                     "abducted", "missing person", "slave labour", "bonded labour"],
        "portals": [
            {
                "id": "track_missing",
                "label": "Track the Missing Child",
                "desc": "National portal for missing and found children — trackthemissingchild.gov.in",
                "url": "https://trackthemissingchild.gov.in",
                "icon": "search",
                "color": "blue",
                "category": "Missing Persons"
            },
            {
                "id": "nhrc",
                "label": "NHRC Human Rights Complaint",
                "desc": "National Human Rights Commission — file complaint for trafficking",
                "url": "https://nhrc.nic.in",
                "icon": "flag",
                "color": "red",
                "category": "Human Rights"
            },
            {
                "id": "childline",
                "label": "CHILDLINE 1098",
                "desc": "24x7 helpline for missing children and child trafficking",
                "url": "https://www.childlineindia.org",
                "icon": "phone",
                "color": "green",
                "category": "Child Protection"
            }
        ]
    },
    # Drug crimes
    {
        "keywords": ["drugs", "narcotic", "ndps", "drug trafficking", "ganja", "cannabis",
                     "cocaine", "heroin", "mdma", "psychotropic", "controlled substance"],
        "portals": [
            {
                "id": "narcotics",
                "label": "Narcotics Control Bureau",
                "desc": "Report drug trafficking and narcotic offences",
                "url": "https://www.narcoticsindia.nic.in",
                "icon": "alert",
                "color": "red",
                "category": "Drug Crimes"
            },
            {
                "id": "drug_helpline",
                "label": "Drug De-addiction Helpline — 1800-11-0031",
                "desc": "NIMHANS drug de-addiction and counselling helpline",
                "url": "https://nimhans.ac.in",
                "icon": "phone",
                "color": "green",
                "category": "Drug Crimes"
            }
        ]
    },
    # Aadhaar related
    {
        "keywords": ["aadhaar", "aadhar", "uid", "biometric", "aadhaar fraud", "aadhaar misuse",
                     "aadhaar locked", "aadhaar update", "uidai"],
        "portals": [
            {
                "id": "uidai",
                "label": "Lock Aadhaar Biometrics (UIDAI)",
                "desc": "Lock your Aadhaar biometrics to prevent unauthorized use",
                "url": "https://myaadhaar.uidai.gov.in",
                "icon": "lock",
                "color": "orange",
                "category": "Aadhaar Security"
            },
            {
                "id": "uidai_helpline",
                "label": "UIDAI Helpline — 1947",
                "desc": "Report Aadhaar misuse and get assistance — call 1947",
                "url": "https://uidai.gov.in",
                "icon": "phone",
                "color": "blue",
                "category": "Aadhaar Security"
            }
        ]
    },
    # RERA / Property fraud
    {
        "keywords": ["property", "real estate", "builder", "flat", "apartment", "rera", "possession delay",
                     "builder fraud", "developer fraud", "housing project"],
        "portals": [
            {
                "id": "rera",
                "label": "RERA Portal",
                "desc": "File complaint against builder delay or fraud at state RERA portal",
                "url": "https://rera.gov.in",
                "icon": "building",
                "color": "blue",
                "category": "Property / RERA"
            }
        ]
    },
    # Social media fake accounts / impersonation
    {
        "keywords": ["fake account", "fake profile", "impersonation", "fake id", "morphed",
                     "someone using my photo", "misusing my identity", "fake social media"],
        "portals": [
            {
                "id": "cybercrime",
                "label": "Report at cybercrime.gov.in",
                "desc": "File complaint for online impersonation and fake accounts",
                "url": "https://cybercrime.gov.in",
                "icon": "flag",
                "color": "red",
                "category": "Cyber Crime"
            }
        ]
    },
    # FIR related
    {
        "keywords": ["fir", "police complaint", "first information report", "register case",
                     "police not helping", "police refused", "zero fir", "file case against"],
        "portals": [
            {
                "id": "cybercrime",
                "label": "File Online FIR/Complaint",
                "desc": "File cyber crime complaint online if police refuses or for online offences",
                "url": "https://cybercrime.gov.in",
                "icon": "file",
                "color": "blue",
                "category": "Legal Action"
            },
            {
                "id": "police_helpline",
                "label": "Police Helpline — 100",
                "desc": "Call police emergency helpline — 100",
                "url": "https://www.india.gov.in/contact-centre/police",
                "icon": "phone",
                "color": "blue",
                "category": "Emergency"
            }
        ]
    },
    # Tenant / landlord
    {
        "keywords": ["tenant", "landlord", "rent", "deposit", "eviction", "rent control"],
        "portals": [
            {
                "id": "nalsa",
                "label": "Legal Aid (NALSA)",
                "desc": "Free legal aid for tenant disputes — National Legal Services Authority",
                "url": "https://nalsa.gov.in",
                "icon": "balance",
                "color": "amber",
                "category": "Legal Aid"
            },
            {
                "id": "consumer",
                "label": "Consumer Helpline — 1915",
                "desc": "Get advice on tenant rights and rental disputes",
                "url": "https://consumerhelpline.gov.in",
                "icon": "phone",
                "color": "green",
                "category": "Legal Aid"
            }
        ]
    },
]


def get_action_buttons(query: str, entities: dict, response_text: str) -> list:
    """
    Analyse query + entities + response to determine which action portals to show.
    Returns deduplicated list of portal dicts.
    """
    combined = (query + " " + response_text).lower()
    seen_ids = set()
    buttons = []

    for rule in PORTAL_RULES:
        matched = any(kw.lower() in combined for kw in rule["keywords"])
        if not matched:
            continue

        for portal in rule["portals"]:
            pid = portal["id"]
            # skip duplicates
            if pid in seen_ids:
                continue
            seen_ids.add(pid)
            buttons.append(portal)

    return buttons[:8]  # cap at 8 buttons max
