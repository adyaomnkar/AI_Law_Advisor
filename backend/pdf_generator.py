import os
import uuid
from datetime import datetime
from jinja2 import Environment, FileSystemLoader
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import inch
from reportlab.lib.colors import HexColor
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, HRFlowable, Table, TableStyle

TEMPLATE_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'templates')
jinja_env = Environment(loader=FileSystemLoader(TEMPLATE_DIR))


TEMPLATES = {
    'eviction_notice': {
        'title': 'LEGAL NOTICE - Eviction Dispute',
        'subject': 'Unlawful Eviction / Eviction Without Notice',
        'act': 'Model Tenancy Act / State Rent Control Act',
    },
    'deposit_demand': {
        'title': 'LEGAL NOTICE - Security Deposit Demand',
        'subject': 'Non-Return of Security Deposit',
        'act': 'Model Tenancy Act, Section 103',
    },
    'rent_dispute': {
        'title': 'LEGAL NOTICE - Rent Dispute',
        'subject': 'Unlawful Rent Increase',
        'act': 'Model Tenancy Act, Section 104',
    },
    'consumer_grievance': {
        'title': 'CONSUMER GRIEVANCE NOTICE',
        'subject': 'Consumer Rights Violation',
        'act': 'Consumer Protection Act, 2019',
    },
    'defective_product': {
        'title': 'LEGAL NOTICE - Defective Product',
        'subject': 'Supply of Defective Goods',
        'act': 'Consumer Protection Act, 2019, Section 2',
    },
    'refund_request': {
        'title': 'LEGAL NOTICE - Refund Request',
        'subject': 'Non-Refund of Payment',
        'act': 'Consumer Protection Act, 2019',
    },
}

OUTPUT_DIR = os.path.join(os.path.dirname(__file__), 'generated_pdfs')


def generate_legal_notice(template_type, details, entities=None):
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    template = TEMPLATES.get(template_type, TEMPLATES['consumer_grievance'])

    filename = f"{template_type}_{uuid.uuid4().hex[:8]}.pdf"
    filepath = os.path.join(OUTPUT_DIR, filename)

    doc = SimpleDocTemplate(filepath, pagesize=A4,
                            topMargin=0.75*inch, bottomMargin=0.75*inch,
                            leftMargin=0.75*inch, rightMargin=0.75*inch)

    styles = getSampleStyleSheet()
    styles.add(ParagraphStyle('NoticeTitle', parent=styles['Title'],
                              fontSize=16, textColor=HexColor('#1a1a1a'),
                              spaceAfter=6))
    styles.add(ParagraphStyle('NoticeBody', parent=styles['Normal'],
                              fontSize=11, leading=16,
                              textColor=HexColor('#333333')))
    styles.add(ParagraphStyle('NoticeLabel', parent=styles['Normal'],
                              fontSize=10, textColor=HexColor('#666666'),
                              spaceAfter=2))
    styles.add(ParagraphStyle('NoticeDisclaimer', parent=styles['Normal'],
                              fontSize=8, textColor=HexColor('#999999'),
                              alignment=1))

    story = []
    today = datetime.now().strftime('%d %B %Y')

    # Header
    story.append(Paragraph(template['title'], styles['NoticeTitle']))
    story.append(HRFlowable(width="100%", thickness=2, color=HexColor('#F59E0B')))
    story.append(Spacer(1, 12))

    # Date
    story.append(Paragraph(f"<b>Date:</b> {today}", styles['NoticeBody']))
    story.append(Spacer(1, 8))

    # From
    name = details.get('name', '[Your Name]')
    address = details.get('address', '[Your Address]')
    story.append(Paragraph(f"<b>From:</b><br/>{name}<br/>{address}", styles['NoticeBody']))
    story.append(Spacer(1, 8))

    # To
    recipient = details.get('recipientName', '[Recipient Name]')
    story.append(Paragraph(f"<b>To:</b><br/>{recipient}", styles['NoticeBody']))
    story.append(Spacer(1, 12))

    # Subject
    story.append(Paragraph(f"<b>Subject:</b> {template['subject']}", styles['NoticeBody']))
    story.append(Spacer(1, 8))

    # Reference Act
    story.append(Paragraph(f"<b>Under:</b> {template['act']}", styles['NoticeBody']))
    story.append(Spacer(1, 16))
    story.append(HRFlowable(width="100%", thickness=0.5, color=HexColor('#cccccc')))
    story.append(Spacer(1, 12))

    # Body
    amount = details.get('amount', '')
    issue_details = details.get('details', 'The above-mentioned issue requires your immediate attention.')

    body_text = f"""Dear Sir/Madam,

I am writing to formally notify you regarding the matter of <b>{template['subject']}</b>.

{issue_details}

{'The amount in question is <b>' + amount + '</b>.' if amount else ''}

Under the provisions of <b>{template['act']}</b>, you are hereby requested to resolve this matter within <b>15 days</b> of receiving this notice. Failure to comply may result in legal proceedings being initiated against you.

This notice is being issued without prejudice to any other rights and remedies available to me under the law."""

    for para in body_text.strip().split('\n\n'):
        if para.strip():
            story.append(Paragraph(para.strip(), styles['NoticeBody']))
            story.append(Spacer(1, 8))

    # Entities section
    if entities:
        story.append(Spacer(1, 8))
        story.append(Paragraph("<b>Referenced Legal Provisions:</b>", styles['NoticeBody']))
        for etype, values in entities.items():
            if values:
                vals = ', '.join(values) if isinstance(values, list) else str(values)
                story.append(Paragraph(f"&bull; {etype}: {vals}", styles['NoticeBody']))

    story.append(Spacer(1, 24))

    # Signature
    story.append(Paragraph(f"Yours faithfully,<br/><br/><br/><b>{name}</b>", styles['NoticeBody']))

    story.append(Spacer(1, 30))
    story.append(HRFlowable(width="100%", thickness=0.5, color=HexColor('#cccccc')))
    story.append(Spacer(1, 6))

    # Disclaimer
    story.append(Paragraph(
        "This document was generated by AI Law Advisor for informational purposes only. "
        "It does not constitute legal advice. Please consult a qualified lawyer before sending.",
        styles['NoticeDisclaimer']
    ))

    doc.build(story)

    # Also render Jinja2 HTML version (for preview/print)
    try:
        jinja_template = jinja_env.get_template('legal_notice.html')
        html_content = jinja_template.render(
            title=template['title'],
            act=template['act'],
            subject=template['subject'],
            date=today,
            ref_no=f"LN/{uuid.uuid4().hex[:6].upper()}/{datetime.now().year}",
            name=name,
            address=address,
            recipient_name=recipient,
            details=details.get('details', ''),
            amount=amount,
            entities=entities or {},
        )
        html_path = filepath.replace('.pdf', '.html')
        with open(html_path, 'w', encoding='utf-8') as f:
            f.write(html_content)
    except Exception:
        pass  # HTML preview is optional, PDF is primary

    return filepath, filename
