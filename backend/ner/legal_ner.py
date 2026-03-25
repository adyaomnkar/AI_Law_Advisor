import re

# load spaCy model once at import time
try:
    import spacy
    nlp = spacy.load('en_core_web_sm')
    SPACY_AVAILABLE = True
except (ImportError, OSError):
    nlp = None
    SPACY_AVAILABLE = False


def _regex_extract(text):
    """domain-specific regex patterns for Indian legal entities"""
    entities = {}

    # Section numbers
    sections = re.findall(r'Section\s+\d+(?:\([a-z0-9]+\))?', text, re.IGNORECASE)
    if sections:
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
    if acts:
        entities['STATUTE'] = list(set(acts))

    # Money amounts
    amounts = re.findall(r'₹[\d,]+(?:\.\d+)?|Rs\.?\s*[\d,]+|[\d,]+\s*(?:rupees?|lakhs?|crores?)', text, re.IGNORECASE)
    if amounts:
        entities['AMOUNT'] = list(set(amounts))

    # Penalties
    penalties = re.findall(
        r'(?:fine|penalty|imprisonment|jail|compensation|damages|punishable)[^.]*',
        text, re.IGNORECASE
    )
    if penalties:
        entities['PENALTY'] = list(set([p.strip()[:80] for p in penalties[:3]]))

    # Courts
    courts = re.findall(
        r'(?:District Consumer (?:Dispute Redressal )?(?:Commission|Forum)|'
        r'High Court|Supreme Court|Rent Control Tribunal|'
        r'Cyber Crime Cell|Labor Court|Family Court|'
        r'National Consumer Disputes Redressal Commission)',
        text, re.IGNORECASE
    )
    if courts:
        entities['COURT'] = list(set(courts))

    return entities


def extract_entities(text):
    """regex-only extraction (fallback)"""
    return _regex_extract(text)


def extract_entities_spacy(text):
    """hybrid NER: spaCy NLP pipeline + domain-specific regex patterns.
    spaCy handles PERSON, MONEY, ORG detection while regex catches
    Indian legal entities like specific Acts and Section numbers."""

    # start with domain-specific regex
    entities = _regex_extract(text)

    if not SPACY_AVAILABLE or not nlp:
        return entities

    # run spaCy NLP pipeline
    doc = nlp(text)

    for ent in doc.ents:
        if ent.label_ == 'MONEY':
            entities.setdefault('AMOUNT', [])
            if ent.text not in entities['AMOUNT']:
                entities['AMOUNT'].append(ent.text)

        elif ent.label_ == 'PERSON':
            entities.setdefault('PERSON', [])
            if ent.text not in entities['PERSON']:
                entities['PERSON'].append(ent.text)

        elif ent.label_ == 'ORG':
            if any(w in ent.text.lower() for w in ['court', 'commission', 'tribunal', 'authority']):
                entities.setdefault('COURT', [])
                if ent.text not in entities['COURT']:
                    entities['COURT'].append(ent.text)

        elif ent.label_ == 'DATE':
            entities.setdefault('DATE', [])
            if ent.text not in entities['DATE']:
                entities['DATE'].append(ent.text)

    return entities
