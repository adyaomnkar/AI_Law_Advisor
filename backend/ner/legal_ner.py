import re


def extract_entities(text):
    """Extract legal entities from text using regex patterns.
    Falls back to regex if spaCy is not installed."""
    entities = {
        'STATUTE': [],
        'SECTION': [],
        'AMOUNT': [],
        'PENALTY': [],
        'COURT': [],
        'PERSON': [],
    }

    # Section numbers
    sections = re.findall(r'Section\s+\d+(?:\([a-z0-9]+\))?', text, re.IGNORECASE)
    entities['SECTION'] = list(set(sections))

    # Statutes / Acts
    acts = re.findall(
        r'(?:Consumer Protection Act(?:,?\s*\d{4})?|Rent Control Act|'
        r'Model Tenancy Act|Indian Penal Code|IT Act|'
        r'Motor Vehicles Act|Right to Information Act|'
        r'Domestic Violence (?:Protection )?(?:Act|Law)s?|'
        r'Maternity Benefit Act|Minimum Wages Act)',
        text, re.IGNORECASE
    )
    entities['STATUTE'] = list(set(acts))

    # Money amounts
    amounts = re.findall(r'₹[\d,]+(?:\.\d+)?|Rs\.?\s*[\d,]+|[\d,]+\s*(?:rupees?|lakhs?|crores?)', text, re.IGNORECASE)
    entities['AMOUNT'] = list(set(amounts))

    # Penalties
    penalties = re.findall(
        r'(?:fine|penalty|imprisonment|jail|compensation|damages|punishable)[^.]*',
        text, re.IGNORECASE
    )
    entities['PENALTY'] = list(set([p.strip()[:80] for p in penalties[:3]]))

    # Courts
    courts = re.findall(
        r'(?:District Consumer (?:Dispute Redressal )?(?:Commission|Forum)|'
        r'High Court|Supreme Court|Rent Control Tribunal|'
        r'Cyber Crime Cell|Labor Court|Family Court|'
        r'National Consumer Disputes Redressal Commission)',
        text, re.IGNORECASE
    )
    entities['COURT'] = list(set(courts))

    # Clean empty lists
    return {k: v for k, v in entities.items() if v}


def extract_entities_spacy(text):
    """Enhanced NER using spaCy (if installed)."""
    try:
        import spacy
        nlp = spacy.load('en_core_web_sm')
    except (ImportError, OSError):
        return extract_entities(text)

    doc = nlp(text)
    entities = extract_entities(text)  # Start with regex results

    for ent in doc.ents:
        if ent.label_ == 'MONEY' and ent.text not in entities.get('AMOUNT', []):
            entities.setdefault('AMOUNT', []).append(ent.text)
        elif ent.label_ == 'PERSON' and ent.text not in entities.get('PERSON', []):
            entities.setdefault('PERSON', []).append(ent.text)
        elif ent.label_ == 'ORG' and ent.text not in entities.get('COURT', []):
            if any(w in ent.text.lower() for w in ['court', 'commission', 'tribunal', 'authority']):
                entities.setdefault('COURT', []).append(ent.text)

    return {k: v for k, v in entities.items() if v}
